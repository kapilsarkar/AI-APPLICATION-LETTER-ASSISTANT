import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const sampleTemplates = {
  leave: {
    label: "Leave Application",
    description: "A polite request for a short absence.",
    fields: {
      name: "Ananya Sharma",
      recipient: "The Principal\nGreenfield Public School\nNew Delhi",
      subject: "Request for leave from 18–20 September 2026",
      details:
        "I need to be away due to a family medical appointment. I will catch up on any missed classwork promptly.",
      language: "English",
      tone: "Respectful",
    },
  },
  bank: {
    label: "Bank Request",
    description: "A clear request to update account details.",
    fields: {
      name: "Rahul Mehta",
      recipient: "The Branch Manager\nState Bank of India, Civil Lines Branch\nJaipur",
      subject: "Request to update registered mobile number",
      details:
        "Please update the mobile number linked to my savings account ending in 4821 to +91 98765 43210. I have enclosed the required identity proof for verification.",
      language: "English",
      tone: "Formal",
    },
  },
  complaint: {
    label: "Formal Complaint",
    description: "A professional request for an issue to be addressed.",
    fields: {
      name: "Priya Nair",
      recipient: "The Customer Support Manager\nBrightHome Appliances\nBengaluru",
      subject: "Complaint regarding defective mixer grinder – Order BH-10482",
      details:
        "The mixer grinder delivered on 12 September has stopped working after two uses. I request a replacement or a full refund under the product warranty.",
      language: "English",
      tone: "Firm and professional",
    },
  },
};

const fieldLabels = {
  name: "Your name",
  recipient: "Recipient",
  subject: "Subject / reason",
  details: "Relevant details",
};

function formatDate() {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function buildDocument({ name, recipient, subject, details, tone }) {
  const closing = tone === "Firm and professional" ? "I look forward to a prompt resolution." : "I would be grateful for your consideration.";

  return `${formatDate()}\n\n${recipient}\n\nSubject: ${subject}\n\nRespected Sir/Madam,\n\nI am ${name}. ${details}\n\n${closing}\n\nThank you for your time and assistance.\n\nYours sincerely,\n${name}`;
}

function DemoPreview() {
  const [selectedTemplate, setSelectedTemplate] = useState("leave");
  const [formValues, setFormValues] = useState(sampleTemplates.leave.fields);
  const [copyStatus, setCopyStatus] = useState("Copy");

  const documentText = useMemo(() => buildDocument(formValues), [formValues]);

  function chooseTemplate(templateId) {
    setSelectedTemplate(templateId);
    setFormValues(sampleTemplates[templateId].fields);
    setCopyStatus("Copy");
  }

  function updateField(field, value) {
    setFormValues((currentValues) => ({ ...currentValues, [field]: value }));
  }

  async function copyDocument() {
    try {
      await navigator.clipboard.writeText(documentText);
      setCopyStatus("Copied!");
      window.setTimeout(() => setCopyStatus("Copy"), 1800);
    } catch {
      setCopyStatus("Select text to copy");
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 text-slate-800 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-amber-50/70 px-5 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.07)] sm:px-8 sm:py-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Interactive product demo</p>
          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">See How AI WriteAssist Works</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">Try the workflow with sample information before creating an account. Edit a few details and watch a polished document take shape instantly.</p>
            </div>
            <div className="flex w-full max-w-md items-center gap-2 text-xs font-bold sm:text-sm" aria-label="Demo steps">
              {["Choose", "Personalize", "Preview"].map((step, index) => (
                <div className="flex flex-1 items-center gap-2" key={step}>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-700 text-white">{index + 1}</span>
                  <span className="hidden text-slate-700 sm:inline">{step}</span>
                  {index < 2 && <span className="h-px flex-1 bg-emerald-200" aria-hidden="true" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-7" aria-labelledby="template-heading">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="template-heading" className="text-lg font-extrabold text-slate-900">1. Choose a sample</h2>
            <p className="text-xs text-slate-500">No account needed</p>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {Object.entries(sampleTemplates).map(([id, template]) => {
              const active = selectedTemplate === id;
              return (
                <button key={id} type="button" onClick={() => chooseTemplate(id)} className={`rounded-2xl border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${active ? "border-emerald-600 bg-emerald-50 shadow-sm" : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40"}`}>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${active ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-600"}`}>{active ? "Selected" : "Sample"}</span>
                  <h3 className="mt-3 font-bold text-slate-900">{template.label}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-600">{template.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" aria-label="Document builder demo">
          <form className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" onSubmit={(event) => event.preventDefault()}>
            <div className="border-b border-slate-100 pb-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">2. Personalize</p>
              <h2 className="mt-2 text-xl font-extrabold text-slate-950">Edit the sample details</h2>
              <p className="mt-1 text-sm text-slate-600">These are only demo fields—nothing is saved.</p>
            </div>
            <div className="mt-5 space-y-4">
              {Object.keys(fieldLabels).map((field) => (
                <label key={field} className="block text-sm font-bold text-slate-700">
                  {fieldLabels[field]}
                  {field === "recipient" || field === "details" ? (
                    <textarea rows={field === "details" ? 4 : 3} value={formValues[field]} onChange={(event) => updateField(field, event.target.value)} className="mt-1.5 block w-full resize-y rounded-xl border border-slate-300 px-3 py-2.5 font-normal leading-6 text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100" />
                  ) : (
                    <input value={formValues[field]} onChange={(event) => updateField(field, event.target.value)} className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100" />
                  )}
                </label>
              ))}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-bold text-slate-700">Language
                  <select value={formValues.language} onChange={(event) => updateField("language", event.target.value)} className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal text-slate-800 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100">
                    <option>English</option><option>Hindi</option><option>Bengali</option>
                  </select>
                </label>
                <label className="text-sm font-bold text-slate-700">Tone
                  <select value={formValues.tone} onChange={(event) => updateField("tone", event.target.value)} className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal text-slate-800 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100">
                    <option>Respectful</option><option>Formal</option><option>Firm and professional</option>
                  </select>
                </label>
              </div>
            </div>
          </form>

          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">3. Live preview</p>
                <h2 className="mt-1 font-extrabold text-slate-950">Your generated document</h2>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={copyDocument} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-800">{copyStatus}</button>
                <button type="button" onClick={() => window.print()} className="rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-950">Print / Preview</button>
              </div>
            </div>
            <div className="bg-slate-100 p-3 sm:p-6">
              <div className="min-h-[580px] rounded-sm bg-white px-6 py-8 font-serif text-sm leading-7 text-slate-800 shadow-[0_2px_14px_rgba(15,23,42,0.12)] sm:px-10 sm:py-10">
                {documentText.split("\n").map((line, index) => <p key={`${line}-${index}`} className={line ? "min-h-7 whitespace-pre-wrap" : "h-4"}>{line || " "}</p>)}
              </div>
            </div>
          </article>
        </section>

        <section className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl bg-slate-900 px-6 py-7 text-center sm:flex-row sm:px-8 sm:text-left">
          <div><h2 className="text-xl font-extrabold text-white">Ready to write your own?</h2><p className="mt-1 text-sm text-slate-300">Create a personalized document with your real details.</p></div>
          <Link to="/create" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-sm transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300">Generate Your Own →</Link>
        </section>
      </div>
    </main>
  );
}

export default DemoPreview;