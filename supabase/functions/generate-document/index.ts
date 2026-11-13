import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GEMINI_TIMEOUT_MS = 30000;

function jsonResponse(
  data: Record<string, unknown>,
  status = 200
) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

// Fetch with a controlled timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = GEMINI_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();

  const timeoutId = setTimeout(
    () => controller.abort(),
    timeoutMs
  );

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return jsonResponse(
      {
        success: false,
        error: "Method not allowed.",
      },
      405
    );
  }

  const start = Date.now();

  console.log("[1] Document generation request received");

  try {
    // 1. Validate Authorization header
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return jsonResponse(
        {
          success: false,
          error: "Missing Authorization header.",
        },
        401
      );
    }

    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    if (!token) {
      return jsonResponse(
        {
          success: false,
          error: "Invalid authorization token.",
        },
        401
      );
    }

    // 2. Validate Supabase user session
    console.log("[2] Checking Supabase authentication");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase environment variables missing");

      return jsonResponse(
        {
          success: false,
          error: "Supabase configuration error.",
        },
        500
      );
    }

    const supabaseClient = createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(token);

    console.log(
      `[3] Authentication completed in ${Date.now() - start}ms`
    );

    if (userError || !user) {
      console.error("Authentication failed:", userError?.message);

      return jsonResponse(
        {
          success: false,
          error: "Session expired or invalid. Please sign in again.",
        },
        401
      );
    }

    // 3. Parse and validate request payload
    let payload: Record<string, unknown>;

    try {
      payload = await req.json();
    } catch {
      return jsonResponse(
        {
          success: false,
          error: "Invalid JSON request body.",
        },
        400
      );
    }

    const {
      category,
      documentType,
      language,
      tone,
      formData,
    } = payload;

    if (
      !formData ||
      typeof formData !== "object" ||
      Array.isArray(formData)
    ) {
      return jsonResponse(
        {
          success: false,
          error: "Invalid or missing form data.",
        },
        400
      );
    }

    // 4. Retrieve Gemini API key
    const apiKey = Deno.env.get("GEMINI_API_KEY");

    if (!apiKey) {
      console.error("GEMINI_API_KEY secret is missing");

      return jsonResponse(
        {
          success: false,
          error: "Gemini API key is not configured on the server.",
        },
        500
      );
    }

    // 5. Format application form fields
    const formattedFields = Object.entries(
      formData as Record<string, unknown>
    )
      .map(([key, value]) => {
        const formattedValue =
          typeof value === "object" && value !== null
            ? JSON.stringify(value)
            : String(value ?? "");

        return `- ${key.replace(/_/g, " ")}: ${formattedValue}`;
      })
      .join("\n");

    // 6. Construct document-generation prompt
    const systemPrompt = `
You are an expert formal letter and official application drafter.

Draft a complete, professionally formatted document based strictly on the parameters and rules below.

Parameters:
- Category: 
${category || "General"}
- Document Type: 
${documentType || "General Application"}
- Language: 
${language || "English"}
- Tone: 
${tone || "Professional"}

Accuracy & Factual Rules:

1. Never invent facts, claims, or personal information. Use only information explicitly provided by the user.
2. Do not claim that the user has attached certificates, documents, medical reports, or other evidence unless the user explicitly says so in the details.
3. If necessary information is missing, use an appropriate bracketed placeholder (e.g., [Department Name], [Institution Address], [Contact Number]) instead of inventing it.
4. Never invent a specific date. Use a placeholder when a required date has not been provided.

Structural Requirements:

1. Include appropriate placeholders for official recipient designations, addresses, and dates when they are not supplied by the user.
2. Provide a clear, concise "Subject:" line.
3. Use a respectful salutation.
4. Organize body paragraphs logically with clear, professional, and appropriate grammar matching the requested tone. Do not exaggerate or introduce unsupported claims.
5. Provide standard closing sign-offs (e.g., "Yours faithfully" or "Sincerely") with placeholder spaces for signature and applicant name.
6. Return only the final document text. Do not wrap the output in markdown codeblocks and do not add conversational preamble or concluding remarks.
`;

    // 7. Prepare Gemini request
    const requestPayload = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemPrompt}

User details:
${formattedFields}`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    };

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

    // 8. Make one Gemini API request
    console.log(
      `[4] Calling Gemini at ${Date.now() - start}ms`
    );

    let geminiRes: Response;

    try {
      geminiRes = await fetchWithTimeout(
        url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestPayload),
        }
      );
    } catch (err: unknown) {
      const duration = Date.now() - start;

      if (err instanceof Error && err.name === "AbortError") {
        console.error(
          `[TIMEOUT] Gemini did not respond within ${GEMINI_TIMEOUT_MS}ms`
        );

        return jsonResponse(
          {
            success: false,
            error: "Gemini request timed out. Please try again.",
            durationMs: duration,
          },
          504
        );
      }

      console.error("[GEMINI NETWORK ERROR]", err);

      return jsonResponse(
        {
          success: false,
          error: "Unable to connect to Gemini. Please try again.",
        },
        502
      );
    }

    console.log(
      `[5] Gemini responded with status ${geminiRes.status} after ${Date.now() - start}ms`
    );

    // 9. Handle Gemini API errors
    if (!geminiRes.ok) {
      const errText = await geminiRes.text();

      console.error(
        `[GEMINI API ERROR] Status: ${geminiRes.status}`,
        errText
      );

      return jsonResponse(
        {
          success: false,
          error: "Gemini API request failed.",
          geminiStatus: geminiRes.status,
          details: errText.slice(0, 1500),
        },
        geminiRes.status === 429 ? 429 : 502
      );
    }

    // 10. Parse Gemini response
    const geminiData = await geminiRes.json();

    const generatedDocument = (
      geminiData.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || "")
        .join("") || ""
    ).trim();

    if (!generatedDocument) {
      console.error(
        "[EMPTY RESPONSE] Gemini returned no document:",
        JSON.stringify(geminiData).slice(0, 2000)
      );

      return jsonResponse(
        {
          success: false,
          error: "Gemini did not return a document. Please try again.",
        },
        502
      );
    }

    // 11. Return generated document
    const duration = Date.now() - start;

    console.log(
      `[6] Document generated successfully in ${duration}ms`
    );

    return jsonResponse({
      success: true,
      document: generatedDocument,
    });

  } catch (err: unknown) {
    const duration = Date.now() - start;

    const message =
      err instanceof Error
        ? err.message
        : "Unknown internal error";

    console.error(
      `[EDGE FUNCTION ERROR after ${duration}ms]:`,
      message
    );

    return jsonResponse(
      {
        success: false,
        error: "An internal error occurred. Please try again.",
      },
      500
    );
  }
});