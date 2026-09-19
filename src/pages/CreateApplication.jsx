import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../constants/categories.js";
import { useApplication } from "../hooks/useApplicationForm.js";
import { supabase } from "../services/supabaseClient.js";

const CreateApplication = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isEditingDocument, setIsEditingDocument] = useState(false);

  useEffect(() => {
    const testSupabase = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Supabase session error:", error);
      } else {
        console.log("Supabase session verified:", data);
      }
    };

    testSupabase();
  }, []);

  const {
    currentStep,
    showModal,
    setShowModal,
    submittedPayload,
    language,
    tone,
    selectedCategory,
    selectedDocumentType,
    errors,
    register,
    handleSubmit,
    handleCategorySelect,
    handleDocumentTypeSelect,
    goToStep,
    updateLanguage,
    updateTone,
    generatedDocument,
    setGeneratedDocument,
    isGenerating,
    generationError,
    handleGenerateDocument,
  } = useApplication();

  const handleCopyText = async () => {
    if (!generatedDocument) return;

    try {
      await navigator.clipboard.writeText(generatedDocument);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative mx-auto min-h-screen max-w-3xl bg-white p-6">
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-slate-950">
          Application Generator
        </h1>

        <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
          <div
            onClick={() => goToStep(1)}
            className={`cursor-pointer border-b-2 pb-2 transition ${
              currentStep === 1
                ? "border-emerald-700 font-bold text-emerald-800"
                : currentStep > 1
                  ? "border-emerald-700 text-slate-700"
                  : "border-slate-200 text-slate-400"
            }`}
          >
            1. Select Category
          </div>

          <div
            onClick={() => selectedCategory && goToStep(2)}
            className={`border-b-2 pb-2 transition ${
              currentStep === 2
                ? "border-emerald-700 font-bold text-emerald-800"
                : currentStep > 2
                  ? "cursor-pointer border-emerald-700 text-slate-700"
                  : "cursor-not-allowed border-slate-200 text-slate-400"
            }`}
          >
            2. Choose Document
          </div>

          <div
            className={`border-b-2 pb-2 transition ${
              currentStep === 3
                ? "border-emerald-700 font-bold text-emerald-800"
                : "border-slate-200 text-slate-400"
            }`}
          >
            3. Fill Questions
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <span
            className={
              currentStep > 1
                ? "cursor-pointer font-medium text-emerald-700 hover:underline"
                : ""
            }
            onClick={() => goToStep(1)}
          >
            Categories
          </span>

          {selectedCategory && (
            <>
              <span>/</span>
              <span
                className={
                  currentStep > 2
                    ? "cursor-pointer font-medium text-emerald-700 hover:underline"
                    : "font-semibold text-slate-800"
                }
                onClick={() => goToStep(2)}
              >
                {selectedCategory.name}
              </span>
            </>
          )}

          {selectedDocumentType && (
            <>
              <span>/</span>
              <span className="font-semibold text-slate-800">
                {selectedDocumentType.name}
              </span>
            </>
          )}
        </div>
      </div>

      {currentStep === 1 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
              Choose a category
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Select the sector or authority for your application.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm shadow-slate-200/40 transition duration-200 hover:border-emerald-300 hover:bg-emerald-50/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                <div className="font-bold text-slate-900 transition-colors group-hover:text-emerald-900">
                  {cat.name}
                </div>
                <div className="mt-1 text-sm leading-5 text-slate-600">
                  {cat.description}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {currentStep === 2 && selectedCategory && (
        <section className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
                Choose a document type
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Available options for{" "}
                <span className="font-semibold text-slate-800">
                  {selectedCategory.name}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => goToStep(1)}
              className="inline-flex w-fit items-center rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              ← Back to Categories
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-1">
            {selectedCategory.documentTypes.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => handleDocumentTypeSelect(doc)}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm shadow-slate-200/40 transition duration-200 hover:border-emerald-300 hover:bg-emerald-50/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                <div>
                  <div className="font-bold text-slate-900 transition-colors group-hover:text-emerald-900">
                    {doc.name}
                  </div>
                  <div className="mt-1 text-sm leading-5 text-slate-600">
                    {doc.description}
                  </div>
                </div>

                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-base font-bold text-slate-500 transition-colors group-hover:bg-emerald-700 group-hover:text-white">
                  →
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {currentStep === 3 && selectedDocumentType && (
        <section className="space-y-6">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-700">
                Add document details
              </p>

              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">
                {selectedDocumentType.name}
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Category:{" "}
                <span className="font-medium text-slate-800">
                  {selectedCategory?.name}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => goToStep(2)}
              className="inline-flex w-fit items-center rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              ← Change Document
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 gap-5 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 sm:grid-cols-2 sm:p-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-800">
                  Language
                </label>

                <select
                  value={language}
                  onChange={(e) => updateLanguage(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Bengali">Bengali</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-800">Tone</label>

                <select
                  value={tone}
                  onChange={(e) => updateTone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                >
                  <option value="Professional">Professional</option>
                  <option value="Formal">Formal</option>
                  <option value="Polite">Polite</option>
                </select>
              </div>
            </div>

            {selectedDocumentType.fields.map((field) => {
              const fieldError = errors[field.id];
              const placeholderText =
                field.placeholder || `Enter ${field.label.toLowerCase()}`;

              return (
                <div key={field.id} className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-800">
                    {field.label}{" "}
                    {!field.optional ? (
                      <span className="text-rose-600">*</span>
                    ) : (
                      <span className="text-xs font-medium text-slate-400">
                        (Optional)
                      </span>
                    )}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      rows={3}
                      placeholder={placeholderText}
                      {...register(field.id)}
                      className={`min-h-28 w-full resize-y rounded-xl border bg-white px-3.5 py-3 text-sm leading-6 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                        fieldError
                          ? "border-rose-500 focus:border-rose-600 focus:ring-rose-100"
                          : "border-slate-300 focus:border-emerald-600 focus:ring-emerald-100"
                      }`}
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      placeholder={placeholderText}
                      {...register(field.id)}
                      className={`w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                        fieldError
                          ? "border-rose-500 focus:border-rose-600 focus:ring-rose-100"
                          : "border-slate-300 focus:border-emerald-600 focus:ring-emerald-100"
                      }`}
                    />
                  )}

                  {fieldError && (
                    <p className="mt-1 text-xs font-semibold text-rose-600">
                      {fieldError.message}
                    </p>
                  )}
                </div>
              );
            })}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                Back
              </button>

              <button
                type="submit"
                className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                Review & Generate
              </button>
            </div>
          </form>
        </section>
      )}

      {showModal && submittedPayload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-all">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-800">
                ✓
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-950">
                  Application Ready
                </h3>
                <p className="text-xs text-slate-500">
                  Draft saved to database. Ready for AI synthesis.
                </p>
              </div>
            </div>

            {generationError && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
                ⚠️ {generationError}
              </div>
            )}

            <div className="my-4 max-h-72 space-y-3 overflow-y-auto pr-1 text-sm">
              <div className="space-y-2 rounded-xl border border-slate-200/60 bg-slate-50 p-3.5">
                <div className="flex justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Category:
                  </span>
                  <span className="font-bold text-slate-800">
                    {submittedPayload.category || submittedPayload.categoryName}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Document:
                  </span>
                  <span className="font-bold text-slate-800">
                    {submittedPayload.document_type ||
                      submittedPayload.documentTypeName}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Language / Tone:
                  </span>
                  <span className="font-medium text-slate-800">
                    {submittedPayload.language} ({submittedPayload.tone})
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Entered Values
                </p>

                {selectedDocumentType?.fields.map((f) => (
                  <div
                    key={f.id}
                    className="flex flex-col rounded-lg border border-slate-100 bg-slate-50/50 p-2.5"
                  >
                    <span className="text-xs font-semibold text-slate-500">
                      {f.label}
                    </span>
                    <span className="mt-0.5 break-words text-sm font-medium text-slate-800">
                      {submittedPayload.fields?.[f.id] || "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isGenerating}
                onClick={() => setShowModal(false)}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Close & Edit
              </button>

              <button
                type="button"
                disabled={isGenerating}
                onClick={handleGenerateDocument}
                className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-800 disabled:opacity-60"
              >
                {isGenerating ? (
                  <>
                    <span className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Generating with Gemini...
                  </>
                ) : (
                  "Proceed to Generate →"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {generatedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="inline-flex items-center rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  AI Generated
                </span>
                <h3 className="mt-1 text-xl font-bold text-slate-950">
                  Your Document is Ready
                </h3>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() =>
                    setIsEditingDocument((isEditing) => !isEditing)
                  }
                  className="mr-4 rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-bold text-emerald-800 transition hover:bg-emerald-50"
                >
                  {isEditingDocument ? "View Document" : "Edit Document"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="text-sm font-semibold text-slate-400 transition hover:text-slate-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="my-4 flex-1 overflow-y-auto">
              {isEditingDocument ? (
                <textarea
                  value={generatedDocument}
                  onChange={(event) => setGeneratedDocument(event.target.value)}
                  aria-label="Edit generated document"
                  className="min-h-80 w-full resize-y rounded-xl border border-emerald-300 bg-white p-5 font-serif text-sm leading-relaxed text-slate-800 shadow-inner outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                />
              ) : (
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 font-serif text-sm leading-relaxed whitespace-pre-wrap text-slate-800 shadow-inner">
                  {generatedDocument}
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleCopyText}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                {copied ? "✓ Copied to Clipboard" : "📋 Copy Text"}
              </button>

              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
              >
                Go to Dashboard →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateApplication;