import { Link } from "react-router-dom";

export default function FinalCtaSection() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm shadow-sm dark:border-slate-8
00 dark:bg-slate-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Ready when you are
          </p>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
            Share where your platform is today and what you&apos;re trying to
            ship. We&apos;ll let you know within a short conversation if we can
            meaningfully help.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Schedule an intro call
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-300"
          >
            Learn more about the team →
          </Link>
        </div>
      </div>
    </section>
  );
}