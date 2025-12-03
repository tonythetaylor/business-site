import { Link } from "react-router-dom";
import type { HeroContent, ServiceItem } from "../../types/content";
import FinalCtaSection from "./FinalCtaSection";
import ServicesSection from "./ServicesSection";
import UseCasesSection from "./UseCasesSection";

type HomeLayoutProps = {
  hero: HeroContent;
  services: ServiceItem[];
};

export default function SleekHomeLayout({ hero, services }: HomeLayoutProps) {
  return (
    <div className="space-y-16">
      <SleekHero hero={hero} />
      <ServicesSection services={services} variant="sleek" />
      <UseCasesSection />
      <FinalCtaSection />
    </div>
  );
}

function SleekHero({ hero }: { hero: HeroContent }) {
  const primaryCtaHref = hero.primaryCtaHref || "/contact";
  const primaryCtaLabel = hero.primaryCtaLabel || "Talk to our team";
  const secondaryCtaHref = hero.secondaryCtaHref || "/services";
  const secondaryCtaLabel = hero.secondaryCtaLabel || "View capabilities";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-slate-100 text-slate-900 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-50">
      {/* Glow background */}
      <div className="pointer-events-none absolute -inset-x-40 -top-40 opacity-60 blur-3xl">
        <div className="h-72 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.6),transparent_60%)]" />
      </div>

      <div className="relative px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr),minmax(0,1.2fr)] lg:items-center">
          {/* Left: copy + CTAs */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-300/60 bg-slate-50/80 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-indigo-700 dark:border-indigo-400/40 dark:bg-slate-900/60 dark:text-indigo-100">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              Modern engineering partner for digital teams
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl">
                {hero.headline ||
                  "Design, build, and ship secure products faster."}
              </h1>
              <p className="max-w-xl text-sm text-slate-700 dark:text-slate-200/80 sm:text-base">
                {hero.subheadline ||
                  "We help product and platform teams move from fragile infrastructure to resilient, well-instrumented systems – without slowing down delivery."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={primaryCtaHref}
                className="inline-flex items-center rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                {primaryCtaLabel}
              </Link>
              <Link
                to={secondaryCtaHref}
                className="text-sm font-medium text-indigo-700 hover:text-indigo-900 dark:text-indigo-200 dark:hover:text-white"
              >
                {secondaryCtaLabel} →
              </Link>
            </div>

            {/* Quick stats */}
            <dl className="mt-4 grid gap-4 text-xs text-slate-700 dark:text-slate-200/80 sm:grid-cols-3">
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Focus areas
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Cloud, security, platform
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Typical engagement
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Architecture + build support
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Ideal partners
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Product &amp; platform teams
                </dd>
              </div>
            </dl>
          </div>

          {/* Right: “product” style panel */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 rounded-4xl bg-linear-to-tr from-indigo-500/10 via-sky-500/10 to-emerald-400/10 blur-2xl" />
            <div className="relative rounded-2xl border border-slate-200 bg-white/95 p-4 text-slate-800 shadow-xl backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-[0.7rem] text-slate-500 dark:border-slate-800 dark:text-slate-300">
                <span className="font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Live system snapshot
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-700 dark:text-emerald-300">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                  Stable
                </span>
              </div>

              <div className="mt-4 grid gap-4 text-[0.75rem] text-slate-700 dark:text-slate-200 md:grid-cols-2">
                <div className="space-y-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-900/70">
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Delivery lane
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Deploy pipeline</span>
                      <span className="text-[0.7rem] text-emerald-600 dark:text-emerald-300">
                        Healthy
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
                      <div className="h-1.5 w-3/4 rounded-full bg-indigo-500" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Security checks</span>
                      <span className="text-[0.7rem] text-sky-600 dark:text-sky-300">
                        Passing
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
                      <div className="h-1.5 w-4/5 rounded-full bg-sky-500" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 rounded-xl bg-slate-50 p-3 dark:bg-slate-900/70">
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Reliability lane
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <p className="text-[0.65rem] text-slate-500 dark:text-slate-400">
                        API
                      </p>
                      <div className="h-10 rounded-md bg-linear-to-t from-slate-200 to-indigo-500 dark:from-slate-800 dark:to-indigo-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[0.65rem] text-slate-500 dark:text-slate-400">
                        Worker
                      </p>
                      <div className="h-10 rounded-md bg-linear-to-t from-slate-200 to-emerald-500 dark:from-slate-800 dark:to-emerald-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[0.65rem] text-slate-500 dark:text-slate-400">
                        Jobs
                      </p>
                      <div className="h-10 rounded-md bg-linear-to-t from-slate-200 to-sky-500 dark:from-slate-800 dark:to-sky-500" />
                    </div>
                  </div>
                  <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                    We bring this kind of observability and control into your
                    stack, not just slide decks.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3 text-[0.7rem] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <span>Designed for teams shipping weekly or faster.</span>
                <Link
                  to="/services"
                  className="text-[0.7rem] font-medium text-indigo-700 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-200"
                >
                  See how we plug into your team →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}