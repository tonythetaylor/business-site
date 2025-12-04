// src/pages/careers/components/ProcessCard.tsx
export default function ProcessCard() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80 sm:p-6">
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
        Our process
      </p>
      <ol className="mt-3 space-y-3 text-[0.85rem] text-slate-700 dark:text-slate-300">
        <li>
          <span className="font-semibold text-slate-900 dark:text-slate-50">
            1. One application, multiple roles.
          </span>{" "}
          Pick the positions that speak to you. We will route your profile
          where it makes the most sense.
        </li>
        <li>
          <span className="font-semibold text-slate-900 dark:text-slate-50">
            2. Real conversation.
          </span>{" "}
          We care about how you think through tradeoffs, structure systems, and
          work with others – not trick questions.
        </li>
        <li>
          <span className="font-semibold text-slate-900 dark:text-slate-50">
            3. Mutual fit.
          </span>{" "}
          If it is not right on scope, timing, or mission, we will say that
          plainly and keep you in mind for future work.
        </li>
      </ol>
    </section>
  );
}