// src/components/home/showcase/ServicesShowcaseSection.tsx
import type { RefObject } from "react";
import type { SiteContent, ServiceItem } from "../../../api/content";
import type { SectionId } from "./HomeShowcaseLayout";

type Props = {
  services: SiteContent["services"];
  sectionRef: RefObject<HTMLElement | null>;
  isActive: boolean;
  scrollTo: (id: SectionId) => void;
  sectionBaseClasses: string;
  sectionBorderClasses: string;
};

export default function ServicesShowcaseSection({
  services,
  sectionRef,
  isActive,
  scrollTo,
  sectionBaseClasses,
  sectionBorderClasses,
}: Props) {
  const typedServices = (services as ServiceItem[]) || [];

  return (
    <section
      ref={sectionRef}
      data-section-id="services"
      id="services"
      className={[
        sectionBaseClasses,
        sectionBorderClasses,
        // Let this breathe vertically
        "flex-col justify-center",
        isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-3",
      ].join(" ")}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-16">
        {/* HEADER */}
        <header className="space-y-5 max-w-3xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
            Services
          </p>
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-[2.25rem] sm:leading-[1.05] dark:text-slate-50">
              The services we use to keep your platforms calm, secure, and fast.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              These are the lanes we actually run in – from first architecture
              conversations through to repeatable delivery and reliability.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[0.75rem] text-slate-500 dark:text-slate-400">
            <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 dark:border-slate-700 dark:bg-slate-900/80">
              Cloud &amp; platform foundations
            </span>
            <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 dark:border-slate-700 dark:bg-slate-900/80">
              DevSecOps &amp; delivery
            </span>
            <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 dark:border-slate-700 dark:bg-slate-900/80">
              Reliability &amp; observability
            </span>

            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="mt-1 inline-flex items-center rounded-full border border-slate-300 px-4 py-1.5 text-[0.75rem] font-medium text-slate-800 hover:border-sky-500 hover:text-sky-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-300"
            >
              Talk about a project
            </button>
          </div>
        </header>

        {/* SERVICES GRID – fewer elements, more space */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {typedServices.map((svc: ServiceItem, idx: number) => (
            <article
              key={`${svc.title}-${idx}`}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white/90 p-6 text-sm transition-transform transition-shadow hover:-translate-y-1 hover:border-sky-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div className="space-y-3">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400">
                  Service
                </p>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  {svc.title}
                </h3>
                {svc.description && (
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {svc.description}
                  </p>
                )}
              </div>

              <div className="mt-5 flex flex-1 flex-col justify-end gap-2 text-[0.75rem] text-slate-500 dark:text-slate-400">
                <p>
                  Great fit when you know{" "}
                  <span className="font-medium">
                    what needs to change, but not how to get there
                  </span>{" "}
                  without breaking what already works.
                </p>
                <span className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400">
                  Learn more
                  <span aria-hidden="true">↗</span>
                </span>
              </div>
            </article>
          ))}

          {typedServices.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
              No services have been published yet. Add services in your content
              settings to showcase the core ways this studio helps clients.
            </div>
          )}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <button
          type="button"
          onClick={() => scrollTo("careers")}
          className="flex flex-col items-center text-[0.7rem] text-slate-500 hover:text-sky-500 dark:text-slate-500 dark:hover:text-sky-300"
        >
          Scroll to see how we work
          <span className="mt-1 flex h-7 w-4 items-center justify-center rounded-full border border-slate-300 dark:border-slate-600">
            <span className="h-2 w-0.5 animate-bounce bg-sky-500 dark:bg-sky-400" />
          </span>
        </button>
      </div>
    </section>
  );
}