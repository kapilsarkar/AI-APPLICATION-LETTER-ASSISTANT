import { supabase } from "./supabaseClient.js";

export const createApplication = async ({
  userId,
  title,
  category,
  documentType,
  language,
  tone,
  formData,
}) => {
  const { data, error } = await supabase
    .from("applications")
    .insert({
      user_id: userId,
      title,
      category,
      document_type: documentType,
      content: JSON.stringify(formData),
      language,
      tone,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getApplications = async (userId) => {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const updateApplication = async (applicationId, updates) => {
  const { data, error } = await supabase
    .from("applications")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteApplication = async (applicationId) => {
  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", applicationId);

  if (error) {
    throw error;
  }
};

export const getApplicationById = async (applicationId) => {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", applicationId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const generateDocument = async ({
  category,
  documentType,
  language,
  tone,
  formData,
}) => {
  // 1. Get the current active session
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("You must be logged in to generate a document.");
  }

  // 2. Pass the Authorization header explicitly
  const { data, error } = await supabase.functions.invoke("generate-document", {
    body: {
      category,
      documentType,
      language,
      tone,
      formData,
    },
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) {
    throw error;
  }

  if (!data?.success) {
    throw new Error(data?.error || "Failed to generate document.");
  }

  return data.document;
};