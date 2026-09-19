import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-slate-950 px-5 py-12 text-slate-300 sm:px-7 sm:py-14">
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col justify-between gap-8 border-b border-slate-800 pb-10 sm:flex-row sm:items-end">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-700 text-sm font-extrabold text-white shadow-sm"
              aria-hidden="true"
            >
              A
            </span>
            AI WriteAssist
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 font-bold text-slate-300">
            A practical writing assistant for professional applications,
            letters, emails, and formal documents.
          </p>
        </div>

        <Link
          to="/create"
          className="inline-flex w-fit items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Create an Application
        </Link>
      </div>

      <div className="flex flex-col gap-3 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-bold text-slate-300">© 2026 AI WriteAssist. All rights reserved.</p>

        <a
          href="#top"
          className="w-fit font-bold text-slate-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
        >
          Back to top
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;