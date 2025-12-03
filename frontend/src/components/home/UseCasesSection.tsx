import { Link } from "react-router-dom";

export default function UseCasesSection() {
  return (
    <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1.1fr)]">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Built for teams who need both speed and reliability
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          We’re a good fit when you need a partner who can talk architecture,
          risk, and product velocity in the same conversation – and then help
          you actually ship.
        </p>
        <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li>
            • Product teams trying to level up security and reliability without
            stalling delivery.
          </li>
          <li>
            • Platform teams designing shared services that multiple applications
            depend on.
          </li>
          <li>
            • Organizations moving from ad-hoc cloud usage to a coherent,
            well-governed platform.
          </li>
          <li>
            • Leaders who want clear visibility into risk and progress, not just
            status reports.
          </li>
        </ul>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Example starting engagement
        </p>
        <ol className="space-y-2 text-sm">
          <li>
            <span className="font-semibold text-slate-900 dark:text-slate-50">
              1. Platform and architecture review
            </span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">
              Understand where you are today: environments, services, data
              flows, and pain points.
            </span>
          </li>
          <li>
            <span className="font-semibold text-slate-900 dark:text-slate-50">
              2. Joint roadmap + quick wins
            </span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">
              Identify changes that reduce risk and friction quickly, while
              setting direction for the next 3–6 months.
            </span>
          </li>
          <li>
            <span className="font-semibold text-slate-900 dark:text-slate-50">
              3. Implementation support
            </span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">
              Build out patterns, automation, and reference implementations
              alongside your team.
            </span>
          </li>
        </ol>
        <Link
          to="/contact"
          className="mt-2 inline-flex items-center rounded-full bg-slate-900 px-4 py-1.5 text-[0.75rem] font-semibold text-slate-50 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          See if we&apos;re a fit for your roadmap →
        </Link>
      </div>
    </section>
  );
}