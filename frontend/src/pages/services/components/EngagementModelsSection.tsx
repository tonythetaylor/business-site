import type { FC } from "react";

const EngagementModelsSection: FC = () => {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Typical engagement shapes
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
            Architecture &amp; security review
          </p>
          <p className="text-xs">
            Time-boxed reviews of existing systems with concrete findings,
            recommendations, and a prioritized remediation roadmap.
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
            Cloud &amp; DevSecOps acceleration
          </p>
          <p className="text-xs">
            Hands-on help standing up pipelines, infrastructure as code, and
            guardrails that match your governance model.
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
            Fractional advisory
          </p>
          <p className="text-xs">
            Ongoing advisory support for leadership teams who need a sounding
            board on roadmap, trade-offs, and technical risk.
          </p>
        </div>
      </div>
      <p className="pt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
        These are examples, not limits. We&apos;ll shape the engagement around
        your constraints and the outcomes you need.
      </p>
    </section>
  );
};

export default EngagementModelsSection;