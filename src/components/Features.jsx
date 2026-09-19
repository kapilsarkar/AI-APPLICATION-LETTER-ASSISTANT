const features = [
  ['01', 'Guided Forms', 'Answer simple questions instead of writing complicated prompts.'],
  ['02', 'AI Generation', 'Turn your answers into a clear, professional first draft.'],
  ['03', 'Edit & Improve', 'Refine tone, clarity, and structure before you send it.'],
  ['04', 'Multiple Languages', 'Write confidently in the language that works for you.'],
  ['05', 'Save & History', 'Keep your drafts organised and return whenever you need.'],
  ['06', 'Download & Print', 'Export a polished document that is ready to share.'],
];

const Features = () => (
  <section id="features" className="bg-white px-5 py-16 sm:px-7 sm:py-20 lg:py-28">
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-700">
          Designed for everyday writing
        </p>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          Everything you need to write with confidence.
        </h2>
        <p className="mt-5 text-sm leading-7 text-slate-600">
          Practical tools that help you move from a blank page to a finished document, without the guesswork.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(([number, title, text]) => (
          <article
            key={title}
            className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-slate-200/60"
          >
            <span className="inline-flex rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-extrabold tracking-wider text-emerald-700">
              {number}
            </span>
            <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Features;