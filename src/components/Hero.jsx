import { Link } from "react-router-dom";

const Hero = () => (
  <section
    id="top"
    className="border-b border-stone-200 bg-stone-50 px-5 py-16 sm:px-7 sm:py-20 lg:py-28"
  >
    <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
      {/* Left Content */}
      <div className="max-w-2xl">
        <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[.14em] text-emerald-800">
          Clear words. Confident next steps.
        </p>
        <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Create professional applications & letters.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
          Create thoughtful applications, letters, emails, and formal
          documents with a guided process that helps you say exactly what you
          mean.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            to="/create"
            className="rounded-xl bg-emerald-700 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
          >
            Create an Application
          </Link>
          <Link
            to="/how-it-works"
            className="text-sm font-bold text-slate-700 underline decoration-emerald-300 decoration-2 underline-offset-4 hover:text-emerald-800"
          >
            See how it works
          </Link>
        </div>
        <p className="mt-6 text-xs font-medium text-slate-500">
          Start with your ideas. Leave with a document you can use.
        </p>
      </div>

      {/* Document Preview Card */}
      <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_55px_rgba(15,23,42,.09)] sm:p-7">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Application letter
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900">
              Your guided draft
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">
            Ready to review
          </span>
        </div>

        <div className="mt-6 space-y-4">
          <div className="h-3 w-3/4 rounded-full bg-slate-800" />
          <div className="h-2.5 w-full rounded-full bg-slate-100" />
          <div className="h-2.5 w-11/12 rounded-full bg-slate-100" />
          <div className="h-2.5 w-4/5 rounded-full bg-slate-100" />
        </div>

        <div className="mt-7 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
          <p className="text-sm font-bold text-slate-900">
            A clear draft, in your own voice
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Answer a few simple questions, then review and improve your
            document.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;