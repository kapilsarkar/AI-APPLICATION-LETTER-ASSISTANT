import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  getApplicationById,
  updateApplication,
} from "../services/applicationService.js";
import { categories } from "../constants/categories.js";
import { createApplicationSchema } from "../validation/applicationSchema.js";

const EditApplication = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingForm, setSavingForm] = useState(false);
  const [savingDocument, setSavingDocument] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Document Editing States
  const [generatedDocument, setGeneratedDocument] = useState("");
  const [isEditingDoc, setIsEditingDoc] = useState(false);
  const [hasDocChanges, setHasDocChanges] = useState(false);
  const [copied, setCopied] = useState(false);
  const [docSaveSuccess, setDocSaveSuccess] = useState(false);

  // 1. Resolve Category & Document Type from constants
  const selectedCategory = useMemo(() => {
    return categories.find((cat) => cat.name === application?.category);
  }, [application?.category]);

  const selectedDocumentType = useMemo(() => {
    return selectedCategory?.documentTypes?.find(
      (doc) => doc.name === application?.document_type
    );
  }, [selectedCategory, application?.document_type]);

  // 2. Dynamic Zod Schema based on fields
  const schema = useMemo(() => {
    return selectedDocumentType?.fields
      ? createApplicationSchema(selectedDocumentType.fields)
      : null;
  }, [selectedDocumentType]);

  // 3. React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
  });

  // 4. Load application & prefill form
  useEffect(() => {
    const loadApplication = async () => {
      try {
        setLoading(true);
        const data = await getApplicationById(applicationId);

        let parsed = {};
        const rawContent = data.form_data || data.content;

        if (rawContent && typeof rawContent === "object") {
          parsed = rawContent;
        } else if (typeof rawContent === "string") {
          try {
            parsed = JSON.parse(rawContent);
          } catch {
            parsed = {};
          }
        }

        // Detect saved document text
        const docText =
          data.generated_document ||
          data.generated_text ||
          (typeof data.content === "string" && !data.content.trim().startsWith("{")
            ? data.content
            : "");

        setApplication(data);
        setGeneratedDocument(docText);
        reset(parsed);
      } catch (err) {
        console.error("Error fetching application:", err);
        setError("Unable to load application.");
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [applicationId, reset]);

  // 5. Submit updated form fields
  const onFormSubmit = async (data) => {
    setSavingForm(true);
    setError("");

    try {
      await updateApplication(applicationId, {
        content: JSON.stringify(data),
      });

      setShowSuccessModal(true);
    } catch (err) {
      console.error("Error updating form data:", err);
      setError("Failed to save form fields. Please try again.");
    } finally {
      setSavingForm(false);
    }
  };

  // 6. Save document edits directly (NO GEMINI CALL)
  const handleSaveDocument = async () => {
    if (!applicationId) return;

    try {
      setSavingDocument(true);
      setError("");

      await updateApplication(applicationId, {
        generated_document: generatedDocument,
        //content: generatedDocument, // Keep backward compatibility if content column is used
      });

      setHasDocChanges(false);
      setIsEditingDoc(false);
      setDocSaveSuccess(true);
      setTimeout(() => setDocSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Error saving document changes:", err);
      setError("Failed to save document edits.");
    } finally {
      setSavingDocument(false);
    }
  };

  const handleCopyText = async () => {
    if (!generatedDocument) return;
    try {
      await navigator.clipboard.writeText(generatedDocument);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handlePrint = () => {
  if (!generatedDocument) return;

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Please allow pop-ups to print the document.");
    return;
  }

  printWindow.document.open();

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${application?.title || "Application"}</title>
        <style>
          body {
            font-family: "Times New Roman", Times, serif;
            font-size: 12pt;
            line-height: 1.6;
            margin: 1in;
            color: #111;
            white-space: pre-wrap;
          }

          @media print {
            body {
              margin: 1in;
            }
          }
        </style>
      </head>
      <body></body>
    </html>
  `);

  printWindow.document.close();

  // Insert document as plain text
  // instead of treating it as HTML.
  printWindow.document.body.textContent = generatedDocument;

  printWindow.focus();

  printWindow.onload = () => {
    printWindow.print();
    printWindow.close();
  };
};

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
          <p className="text-sm font-medium text-slate-600">
            Loading application details...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-lg font-bold text-rose-600">
            !
          </div>
          <h1 className="text-lg font-semibold text-slate-900">{error}</h1>
          <p className="mt-2 text-sm text-slate-600">
            Please return to your dashboard or verify the application link.
          </p>
          <Link
            to="/dashboard"
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Banner */}
        <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  Edit Mode
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {application?.category || "Application"}
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {application?.title || selectedDocumentType?.name || "Edit Application"}
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Update form inputs or modify the generated document text below without regenerating.
              </p>
            </div>

            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
            >
              Back to Dashboard
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 text-xs">
            <span className="font-semibold text-slate-600">Document Type:</span>
            <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-800">
              {application?.document_type || "Standard Form"}
            </span>

            <span className="ml-2 font-semibold text-slate-600">Language:</span>
            <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-800">
              {application?.language || "English"}
            </span>

            <span className="ml-2 font-semibold text-slate-600">Tone:</span>
            <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-800">
              {application?.tone || "Formal"}
            </span>
          </div>
        </section>

        {/* SECTION 1: EDITABLE GENERATED DOCUMENT */}
        <section className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  Document Content
                </span>
                {hasDocChanges && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                    Unsaved Edits
                  </span>
                )}
                {docSaveSuccess && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    ✓ Document Saved
                  </span>
                )}
              </div>
              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Generated Document
              </h2>
            </div>

            {/* Quick Document Actions */}
            <div className="flex flex-wrap items-center gap-2">
              {isEditingDoc ? (
                <button
                  type="button"
                  onClick={() => setIsEditingDoc(false)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Preview Formatted
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingDoc(true)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  ✏️ Edit Text
                </button>
              )}

              <button
                type="button"
                onClick={handleCopyText}
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                {copied ? "✓ Copied" : "📋 Copy"}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                🖨️ Print
              </button>
            </div>
          </div>

          <div className="mt-4">
            {isEditingDoc ? (
              <div className="space-y-3">
                <textarea
                  value={generatedDocument}
                  onChange={(e) => {
                    setGeneratedDocument(e.target.value);
                    setHasDocChanges(true);
                  }}
                  rows={14}
                  placeholder="Paste or write your application text here..."
                  className="w-full resize-y rounded-xl border border-emerald-400 bg-white p-5 font-serif text-sm leading-relaxed text-slate-800 shadow-inner outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                />
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Characters: {generatedDocument.length}</span>
                  <button
                    type="button"
                    disabled={savingDocument || !hasDocChanges}
                    onClick={handleSaveDocument}
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {savingDocument ? "Saving to Database..." : "Save Document Edits"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl border border-slate-200 bg-slate-50/60 p-6 font-serif text-sm leading-relaxed whitespace-pre-wrap text-slate-800 shadow-inner">
                {generatedDocument || (
                  <p className="font-sans italic text-slate-400">
                    No document has been generated yet for this record.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: EDITABLE FORM INPUT VALUES */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="border-b border-slate-100 pb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Form Input Parameters
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Update stored values in case you need to regenerate or archive updated parameters.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onFormSubmit)}
            noValidate
            className="mt-6 space-y-5"
          >
            {!selectedDocumentType?.fields || selectedDocumentType.fields.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <p className="text-sm font-medium text-slate-600">
                  No editable form fields found for this document configuration.
                </p>
              </div>
            ) : (
              selectedDocumentType.fields.map((field) => (
                <div key={field.id} className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {field.label}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      rows={field.id.toLowerCase().includes("detail") ? 5 : 3}
                      {...register(field.id)}
                      className={`block w-full resize-y rounded-xl border px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:ring-4 ${
                        errors[field.id]
                          ? "border-rose-400 bg-rose-50/20 focus:border-rose-600 focus:ring-rose-100"
                          : "border-slate-300 focus:border-emerald-600 focus:ring-emerald-100"
                      }`}
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      {...register(field.id)}
                      className={`block w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:ring-4 ${
                        errors[field.id]
                          ? "border-rose-400 bg-rose-50/20 focus:border-rose-600 focus:ring-rose-100"
                          : "border-slate-300 focus:border-emerald-600 focus:ring-emerald-100"
                      }`}
                    />
                  )}

                  {errors[field.id] && (
                    <p className="text-xs font-semibold text-rose-600">
                      {errors[field.id].message}
                    </p>
                  )}
                </div>
              ))
            )}

            <div className="flex flex-col-reverse items-center justify-end gap-3 border-t border-slate-100 pt-6 sm:flex-row">
              <Link
                to="/dashboard"
                className="w-full rounded-xl border border-slate-300 py-2.5 text-center text-xs font-bold text-slate-700 hover:bg-slate-50 transition sm:w-auto sm:px-5"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={savingForm}
                className="inline-flex w-full items-center justify-center rounded-xl bg-amber-400 px-6 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {savingForm ? "Saving Fields..." : "Update Form Values →"}
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* Success Modal Popup for Form Fields */}
      {showSuccessModal && (
        <div
          onClick={() => setShowSuccessModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-2xl sm:p-8"
          >
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700">
              ✓
            </div>

            <h2 className="text-xl font-extrabold text-slate-900">
              Form Parameters Saved!
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Your field values for{" "}
              <strong className="text-slate-900">
                &quot;{application?.title || "Untitled Application"}&quot;
              </strong>{" "}
              have been updated in your database.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full rounded-xl bg-emerald-700 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800"
              >
                Stay on Edit Page
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="w-full rounded-xl border border-slate-300 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Go to Dashboard →
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default EditApplication;