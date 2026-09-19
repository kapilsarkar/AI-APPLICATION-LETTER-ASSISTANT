import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Helper: Call Gemini with exponential backoff for 503 / 429
async function callGeminiWithRetry(url: string, body: object, maxRetries = 2) {
  let delay = 1000;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 503 || res.status === 429) {
      console.warn(
        `Gemini ${res.status} on attempt ${attempt + 1}. Retrying in${delay}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
      continue;
    }

    return res;
  }

  // Final attempt
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Extract Authorization header
    const authHeader =
      req.headers.get("Authorization") || req.headers.get("authorization");

    if (!authHeader) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing Authorization header.",
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const token = authHeader.replace(/^Bearer\s+/i, "");

    // 2. Validate session with Supabase Auth
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User session expired or invalid. Please sign in again.",
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 3. Parse request payload
    const { category, documentType, language, tone, formData } =
      await req.json();

    // 4. Retrieve Gemini API key secret
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "GEMINI_API_KEY secret is not configured on the server.",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 5. Structure prompt
    const formattedFields = Object.entries(formData || {})
      .map(([key, value]) => `- ${key.replace(/_/g, " ")}: ${value}`)
      .join("\n");

    const systemPrompt = `You are an expert formal letter and official application drafter.

Draft a complete, professionally formatted document based strictly on the parameters and rules below.

Parameters:
- Category: ${category || "General"}
- Document Type: ${documentType}
- Language: ${language || "English"}
- Tone: ${tone || "Professional"}

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
6. Return only the final document text. Do not wrap the output in markdown codeblocks (\`\`\`) and do not add conversational preamble or concluding remarks.`;

    const requestPayload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemPrompt}\n\nUser details:\n${formattedFields}` },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    };

    // 6. Execute model call with retry and fallback
    const primaryUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
    let geminiRes = await callGeminiWithRetry(primaryUrl, requestPayload, 2);

    if (geminiRes.status === 429 || geminiRes.status === 503) {
      console.warn(
        `Primary model returned status ${geminiRes.status}. Falling back to alternate model...`
      );
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      geminiRes = await callGeminiWithRetry(fallbackUrl, requestPayload, 2);
    }

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini API execution error:", errText);
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "AI service is currently experiencing high demand. Please try again shortly.",
        }),
        {
          status: geminiRes.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const geminiData = await geminiRes.json();
    const generatedDocument =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return new Response(
      JSON.stringify({
        success: true,
        document: generatedDocument,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || "Internal server error.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});