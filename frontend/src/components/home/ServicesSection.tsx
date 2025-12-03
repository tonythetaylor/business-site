import { Link } from "react-router-dom";
import type { ServiceItem } from "../../types/content";

export default function ServicesSection({
  services,
  variant,
}: {
  services: ServiceItem[];
  variant: "sleek" | "classic";
}) {
  const isSleek = variant === "sleek";

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {isSleek ? "What we help you ship" : "Services at a glance"}
          </h2>
          <p className="max-w-xl text-sm text-slate-600 dark:text-slate-300">
            {isSleek
              ? "Focused service lines that plug directly into your roadmap, from first architecture review to full platform modernization."
              : "A focused set of services across zero-trust, cloud, and resilience so leaders can move forward without guessing."}
          </p>
        </div>
        <Link
          to="/services"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {isSleek ? "Browse all services →" : "View all services →"}
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {services.slice(0, 3).map((service, idx) => (
          <article
            key={idx}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            {isSleek && (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
                {service.tagline || "Service"}
              </p>
            )}
            <h3
              className={`${
                isSleek ? "mt-2 text-base" : "text-sm"
              } font-semibold text-slate-900 dark:text-slate-50`}
            >
              {service.title}
            </h3>
            <p className="mt-2 flex-1 text-sm text-slate-700 dark:text-slate-300">
              {service.description}
            </p>
            <span className="mt-3 text-[0.75rem] font-medium text-indigo-600 dark:text-indigo-400">
              {isSleek
                ? "Learn how this works in practice →"
                : "Learn more →"}
            </span>
          </article>
        ))}

        {services.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
            Services will appear here once they are configured in the admin panel.
          </div>
        )}
      </div>
    </section>
  );
}