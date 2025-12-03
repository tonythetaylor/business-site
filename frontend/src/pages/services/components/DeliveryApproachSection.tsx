import type { FC } from "react";

const DeliveryApproachSection: FC = () => {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        How we work with you
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            1. Discover
          </p>
          <p className="mt-1 text-xs">
            We start with a short discovery phase to align on goals, technical
            constraints, compliance requirements, and success criteria.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            2. Design
          </p>
          <p className="mt-1 text-xs">
            We propose a pragmatic architecture and delivery plan that balances
            risk reduction, modernization, and budget realities.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            3. Deliver &amp; handoff
          </p>
          <p className="mt-1 text-xs">
            We implement alongside your teams, document decisions, and leave you
            with artifacts that are maintainable long after the engagement ends.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeliveryApproachSection;