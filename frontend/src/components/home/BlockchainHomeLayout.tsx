import { Link } from "react-router-dom";
import type { HeroContent, ServiceItem } from "../../types/content";
import { RevealSection } from "./RevealSection";

type HomeLayoutProps = {
  hero: HeroContent;
  services: ServiceItem[];
};

export default function BlockchainHomeLayout({
  hero,
  services,
}: HomeLayoutProps) {
  const primaryCtaHref = hero.primaryCtaHref || "/contact";
  const primaryCtaLabel = hero.primaryCtaLabel || "Receive Email Updates";

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-b from-slate-50 via-white to-slate-100 text-slate-900 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-50">
        {/* Background glow / shapes */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.45),transparent_60%)]" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.3),transparent_65%)]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:280px_280px] opacity-15" />
        </div>

        <div className="relative px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-300">
            <span>Brand Name</span>
            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <span className="hidden sm:inline">How it works</span>
              <span className="hidden sm:inline">Roadmap</span>
              <span className="hidden md:inline">Advertising</span>
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1.2fr)] lg:items-center">
            {/* Left – main copy */}
            <RevealSection>
              <div className="space-y-7">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-sky-600 dark:text-sky-300">
                  The future is now
                </p>
                <div className="space-y-3">
                  <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl lg:text-5xl">
                    {hero.headline || "The World’s Fastest Secure Platform."}
                  </h1>
                  <p className="max-w-xl text-sm text-slate-700 dark:text-slate-200/80 sm:text-base">
                    {hero.subheadline ||
                      "A modern engineering partner for teams that need security, scale, and speed – without sacrificing reliability."}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to={primaryCtaHref}
                    className="inline-flex items-center rounded-full bg-sky-500 px-7 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400"
                  >
                    {primaryCtaLabel}
                  </Link>
                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-medium text-slate-800 hover:text-sky-600 dark:text-slate-100 dark:hover:text-sky-300"
                  >
                    <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white/80 text-[0.7rem] text-slate-800 dark:border-slate-600 dark:bg-slate-900/80 dark:text-slate-100">
                      ▶
                    </span>
                    Watch overview
                  </button>
                </div>

                {/* tiny trust strip */}
                <p className="mt-3 text-[0.7rem] text-slate-500 dark:text-slate-400">
                  Third-party verified. Designed for zero-trust, multi-cloud,
                  and high-assurance environments.
                </p>

                {/* stats row */}
                <dl className="mt-6 grid gap-4 text-xs text-slate-900 dark:text-slate-100 sm:grid-cols-3">
                  <div>
                    <dt className="text-slate-500 dark:text-slate-400">
                      Latency
                    </dt>
                    <dd className="mt-1 text-lg font-semibold text-sky-600 dark:text-sky-300">
                      &lt; 50 ms
                    </dd>
                    <p className="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
                      Measured end-to-end across global environments.
                    </p>
                  </div>
                  <div>
                    <dt className="text-slate-500 dark:text-slate-400">
                      Deploy frequency
                    </dt>
                    <dd className="mt-1 text-lg font-semibold text-sky-600 dark:text-sky-300">
                      Weekly+
                    </dd>
                    <p className="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
                      Hardened pipelines tuned for regulated workloads.
                    </p>
                  </div>
                  <div>
                    <dt className="text-slate-500 dark:text-slate-400">
                      Coverage
                    </dt>
                    <dd className="mt-1 text-lg font-semibold text-sky-600 dark:text-sky-300">
                      24/7
                    </dd>
                    <p className="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
                      Observability and runbooks ready for real incidents.
                    </p>
                  </div>
                </dl>
              </div>
            </RevealSection>

            {/* Right – “blockchain” visual card */}
            <RevealSection delay={120}>
              <div className="relative">
                <div className="pointer-events-none absolute -inset-8 rounded-3xl bg-linear-to-tr from-sky-500/20 via-indigo-500/10 to-slate-200 blur-3xl dark:from-sky-500/20 dark:via-indigo-500/10 dark:to-slate-900" />
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/95 p-5 text-xs text-slate-800 shadow-2xl backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Global execution graph
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-700 dark:text-emerald-300">
                      Live
                    </span>
                  </div>

                  {/* pseudo “chain” */}
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="space-y-3">
                      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        Regions
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-900/80">
                          <span className="text-[0.75rem]">US-East</span>
                          <span className="text-[0.7rem] text-emerald-600 dark:text-emerald-300">
                            Healthy
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-900/80">
                          <span className="text-[0.75rem]">GovCloud</span>
                          <span className="text-[0.7rem] text-emerald-600 dark:text-emerald-300">
                            Compliant
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-900/80">
                          <span className="text-[0.75rem]">EU-West</span>
                          <span className="text-[0.7rem] text-sky-600 dark:text-sky-300">
                            Scaling
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        Transaction throughput
                      </p>
                      <div className="mt-1 h-28 rounded-xl bg-slate-50 p-2 dark:bg-slate-900/80">
                        <div className="flex h-full items-end justify-between gap-1">
                          <div
                            className="flex-1 rounded-sm bg-sky-500/80"
                            style={{ height: "40%" }}
                          />
                          <div
                            className="flex-1 rounded-sm bg-sky-400"
                            style={{ height: "70%" }}
                          />
                          <div
                            className="flex-1 rounded-sm bg-sky-300"
                            style={{ height: "60%" }}
                          />
                          <div
                            className="flex-1 rounded-sm bg-emerald-400"
                            style={{ height: "85%" }}
                          />
                          <div
                            className="flex-1 rounded-sm bg-sky-500/70"
                            style={{ height: "55%" }}
                          />
                        </div>
                      </div>
                      <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                        Real-time view of how work moves through your pipelines
                        and platforms.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-[0.7rem] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <span>One secure platform, multiple mission areas.</span>
                    <span className="text-sky-600 dark:text-sky-300">
                      01 / 03
                    </span>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* FEATURES / VALUE PROPS */}
      <RevealSection delay={80}>
        <section className="space-y-8">
          <div className="text-center">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-sky-600 dark:text-sky-500">
              One platform, many missions
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
              One engineering backbone to meet your needs
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Decentralized teams. Regulated workloads. Hybrid and multi-cloud
              environments. We give you a single, secure way to build and ship
              software across all of it.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {(services.length
              ? services.slice(0, 3)
              : [
                  {
                    title: "Secure by default",
                    description:
                      "Zero-trust patterns, hardened pipelines, and continuous verification instead of bolt-on controls.",
                  },
                  {
                    title: "Observable from day one",
                    description:
                      "Metrics, traces, and logs wired in from the start so you can see how every change behaves.",
                  },
                  {
                    title: "Designed for change",
                    description:
                      "Architectures that support fast iteration, refactors, and new capabilities without constant rework.",
                  },
                ]
            ).map((svc, idx) => (
              <article
                key={idx}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 text-sm shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-500">
                  <span className="text-lg">⬢</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {svc.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-700 dark:text-slate-300">
                  {svc.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* HOW IT WORKS STRIP */}
      <RevealSection delay={120}>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.5fr),minmax(0,1.1fr)] md:items-center">
            <div className="space-y-3">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-sky-600 dark:text-sky-500">
                How it works
              </p>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                From first conversation to resilient platform
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                We bring structure to messy environments – from architecture and
                security reviews to hands-on implementation and knowledge
                transfer.
              </p>
              <ol className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>
                  <span className="font-semibold">
                    1. Discovery and mapping.
                  </span>{" "}
                  Understand current systems, constraints, and risk.
                </li>
                <li>
                  <span className="font-semibold">
                    2. Joint architecture and roadmap.
                  </span>{" "}
                  Define a practical path that your teams can execute.
                </li>
                <li>
                  <span className="font-semibold">
                    3. Implementation sprint.
                  </span>{" "}
                  Build core patterns, automation, and observability.
                </li>
                <li>
                  <span className="font-semibold">
                    4. Transition and ongoing support.
                  </span>{" "}
                  Keep your teams confident as the platform evolves.
                </li>
              </ol>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                Snapshot
              </p>
              <div className="grid grid-cols-3 gap-3 text-[0.7rem]">
                <div className="rounded-xl bg-white/80 p-3 dark:bg-slate-900/70">
                  <p className="text-slate-500 dark:text-slate-400">
                    Lead time
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">
                    -35%
                  </p>
                </div>
                <div className="rounded-xl bg-white/80 p-3 dark:bg-slate-900/70">
                  <p className="text-slate-500 dark:text-slate-400">
                    Incidents
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">
                    -40%
                  </p>
                </div>
                <div className="rounded-xl bg-white/80 p-3 dark:bg-slate-900/70">
                  <p className="text-slate-500 dark:text-slate-400">
                    Coverage
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">
                    90%+
                  </p>
                </div>
              </div>
              <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                Example results after modernizing a legacy platform in a
                regulated environment.
              </p>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* FINAL CTA */}
      <RevealSection delay={160}>
        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                Ready to see it in action?
              </p>
              <p className="mt-2 max-w-xl text-sm text-slate-700 dark:text-slate-300">
                Share a bit about your current platform and where you are trying
                to go. We will tell you quickly if there is a meaningful way to
                help.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-400"
              >
                Schedule a quick call
              </Link>
              <Link
                to="/services"
                className="text-sm font-medium text-slate-700 hover:text-sky-600 dark:text-slate-200 dark:hover:text-sky-300"
              >
                Explore what we offer →
              </Link>
            </div>
          </div>
        </section>
      </RevealSection>
    </div>
  );
}