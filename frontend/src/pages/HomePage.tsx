import { Link } from "react-router-dom";
import { useContent } from "../contexts/ContentContext";

export default function HomePage() {
  const { content, loading, error } = useContent();

  if (loading && !content) {
    return (
      <p className="text-center text-slate-500 dark:text-slate-400">
        Loading site content…
      </p>
    );
  }

  if (error && !content) {
    return (
      <p className="text-center text-red-600 dark:text-red-400">
        Failed to load site content. Please try again later.
      </p>
    );
  }

  if (!content) return null;

  const hero = content.hero ?? {};
  const services = Array.isArray(content.services) ? content.services : [];


  return (
    <>
      {/* Local keyframes for animations */}
      <style>{`
        @keyframes flow-dot {
          /* Discover */
          0%, 5% {
            top: 0%;
          }
          /* Design */
          20%, 25% {
            top: 22%;
          }
          /* Build */
          40%, 45% {
            top: 44%;
          }
          /* Secure */
          60%, 65% {
            top: 66%;
          }
          /* Operate (near bottom) */
          80%, 100% {
            top: 88%;
          }
        }

        @keyframes outcome-bar {
          0%   { width: 20%; }
          40%  { width: 55%; }
          80%  { width: 85%; }
          100% { width: 20%; }
        }

        .flow-dot {
          animation: flow-dot 16s ease-in-out infinite;
          transform: translateX(0%); /* only horizontal, vertical handled by top */
        }

        .outcome-bar {
          animation: outcome-bar 14s ease-in-out infinite;
        }
      `}</style>

      <div className="space-y-12">
        {/* Hero: headline + concept → delivery flow */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-slate-100 p-6 text-slate-900 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-50 sm:p-10">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr),minmax(0,1.2fr)] md:items-center">
            {/* Left: core message */}
            <div className="space-y-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-300">
                Zero-trust • Global operations • Resilience
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {hero.headline}
              </h1>

              <p className="max-w-xl text-sm text-slate-700 dark:text-slate-300 sm:text-base">
                {hero.subheadline ||
                  "We help organizations move from fragile, legacy systems to secure, zero-trust architectures that can withstand real-world incidents across regions and time zones."}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to={hero.primaryCtaHref || "/contact"}
                  className="inline-flex items-center rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                >
                  {hero.primaryCtaLabel || "Schedule a consultation"}
                </Link>
                <Link
                  to="/services"
                  className="text-sm font-medium text-slate-800 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-300"
                >
                  Explore services →
                </Link>
              </div>

              {/* Trust strip */}
              <div className="mt-4 flex flex-wrap gap-2 text-[0.7rem]">
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                  <span className="mr-1.5 text-[0.75rem]" aria-hidden="true">
                    ⭐
                  </span>
                  Veteran-owned consulting
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                  Zero-trust, not perimeter-only
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                  Built for global, 24/7 operations
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                  Resilience across cloud, hybrid, and on-prem
                </span>
              </div>
            </div>

            {/* Right: concept → delivery “animation” */}
            <div className="relative hidden h-full md:block">
              <div className="pointer-events-none absolute -inset-12 opacity-40">
                <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.45),transparent_60%)]" />
              </div>

              <div className="relative flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white/90 p-4 text-xs shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Engagement flow
                  </p>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.7rem] font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    From concept to resilient delivery
                  </span>
                </div>

                {/* Steps with moving dot + right visuals */}
                <div className="relative mt-3">
                  {/* Vertical rail + animated dot */}
                  <div className="pointer-events-none absolute left-2 top-1 bottom-3 flex flex-col items-center">
                    <div className="h-full w-px bg-linear-to-b from-indigo-400/70 via-indigo-500/30 to-indigo-500/5" />
                    <div className="flow-dot absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full border border-indigo-200 bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.9)]" />
                  </div>

                  <ol className="space-y-3 pl-7 text-[0.8rem]">
                    {/* Discover */}
                    <li className="flex items-stretch gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          Discover
                        </p>
                        <p className="text-[0.75rem] text-slate-600 dark:text-slate-300">
                          Map current systems, attack surface, and mission
                          constraints across environments.
                        </p>
                      </div>
                      <div className="hidden w-28 shrink-0 flex-col justify-between rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 md:flex">
                        <span className="text-[0.65rem] text-slate-500 dark:text-slate-400">
                          Systems
                        </span>
                        <div className="space-y-1">
                          <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
                            <div className="h-1.5 w-3/5 rounded-full bg-indigo-500" />
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
                            <div className="h-1.5 w-4/5 rounded-full bg-slate-500 dark:bg-slate-400" />
                          </div>
                        </div>
                      </div>
                    </li>

                    {/* Design */}
                    <li className="flex items-stretch gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          Design
                        </p>
                        <p className="text-[0.75rem] text-slate-600 dark:text-slate-300">
                          Shape zero-trust, globally resilient architectures
                          that fit how your teams actually work.
                        </p>
                      </div>
                      <div className="hidden w-28 shrink-0 flex-col rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 md:flex">
                        <span className="text-[0.65rem] text-slate-500 dark:text-slate-400">
                          Blueprint
                        </span>
                        <div className="mt-1 grid grid-cols-3 gap-0.5">
                          <div className="h-6 rounded-sm bg-slate-200 dark:bg-slate-800" />
                          <div className="h-6 rounded-sm bg-slate-100 dark:bg-slate-900" />
                          <div className="h-6 rounded-sm bg-slate-200 dark:bg-slate-800" />
                          <div className="col-span-3 h-2 rounded-sm bg-indigo-500/70" />
                        </div>
                      </div>
                    </li>

                    {/* Build */}
                    <li className="flex items-stretch gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          Build
                        </p>
                        <p className="text-[0.75rem] text-slate-600 dark:text-slate-300">
                          Implement secure-by-default patterns, automation, and
                          guardrails — not one-off fixes.
                        </p>
                      </div>
                      <div className="hidden w-28 shrink-0 flex-col rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 md:flex">
                        <span className="text-[0.65rem] text-slate-500 dark:text-slate-400">
                          Pipelines
                        </span>
                        <div className="mt-1 space-y-1">
                          <div className="flex h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
                            <div className="w-1/3 rounded-full bg-indigo-500" />
                            <div className="ml-0.5 w-1/4 rounded-full bg-emerald-500/70" />
                          </div>
                          <div className="flex h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
                            <div className="w-1/2 rounded-full bg-slate-500 dark:bg-slate-400" />
                          </div>
                        </div>
                      </div>
                    </li>

                    {/* Secure */}
                    <li className="flex items-stretch gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          Secure
                        </p>
                        <p className="text-[0.75rem] text-slate-600 dark:text-slate-300">
                          Harden identity, network, and data paths; validate
                          with testing and threat-informed scenarios.
                        </p>
                      </div>
                      <div className="hidden w-28 shrink-0 flex-col items-start rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 md:flex">
                        <span className="text-[0.65rem] text-slate-500 dark:text-slate-400">
                          Controls
                        </span>
                        <div className="mt-1 flex w-full items-center justify-between text-[0.65rem]">
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                            MFA
                          </span>
                          <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300">
                            TLS
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                          <div className="h-1.5 w-4/5 rounded-full bg-emerald-500" />
                        </div>
                      </div>
                    </li>

                    {/* Operate */}
                    <li className="flex items-stretch gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          Operate
                        </p>
                        <p className="text-[0.75rem] text-slate-600 dark:text-slate-300">
                          Run with observability, runbooks, and clear SLOs so
                          teams can respond instead of react.
                        </p>
                      </div>
                      <div className="hidden w-28 shrink-0 flex-col rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 md:flex">
                        <span className="text-[0.65rem] text-slate-500 dark:text-slate-400">
                          Signals
                        </span>
                        <div className="mt-1 h-10 min-h-10 w-full rounded-md bg-slate-100 dark:bg-slate-900">
                          <div className="flex h-full items-end gap-1 px-1 pb-1">
                            <div className="flex-1 h-2/3 rounded-sm bg-slate-400 dark:bg-slate-700" />
                            <div className="flex-1 h-3/4 rounded-sm bg-indigo-500" />
                            <div className="flex-1 h-1/2 rounded-sm bg-slate-500 dark:bg-slate-600" />
                            <div className="flex-1 h-[85%] rounded-sm bg-emerald-500/80" />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>

                {/* Animated outcome bar */}
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950/70">
                  <div className="flex items-center justify-between text-[0.7rem] text-slate-700 dark:text-slate-300">
                    <span>Example outcome: global risk posture</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      Improving
                    </span>
                  </div>
                  <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div className="outcome-bar rounded-full bg-indigo-500" />
                  </div>
                  <p className="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
                    Illustrative view of how zero-trust and resilience work
                    shift your posture from reactive to prepared.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services preview */}
        <section className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Services at a glance
              </h2>
              <p className="max-w-xl text-sm text-slate-600 dark:text-slate-300">
                A focused set of services across zero-trust, cloud, and
                resilience so leaders can move forward without guessing.
              </p>
            </div>
            <Link
              to="/services"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              View all services →
            </Link>
          </div>

          {/* ✅ Guard against missing services */}
          {services.length > 0 && (
            <div className="grid gap-5 md:grid-cols-3">
              {services.slice(0, 3).map((service, idx) => (
                <article
                  key={idx}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slate-700 dark:text-slate-300">
                    {service.description}
                  </p>
                  <span className="mt-3 text-[0.75rem] font-medium text-indigo-600 dark:text-indigo-400">
                    Learn more →
                  </span>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* How we work in practice */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr),minmax(0,1.2fr)]">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                How an engagement typically feels
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                No noisy jargon, no surprise scope creep. Just clear structure,
                realistic timelines, and work that holds up under global
                pressure and real incidents.
              </p>
              <ul className="mt-3 grid gap-3 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
                <li>
                  <span className="block font-semibold">
                    1. Listen, map, and prioritize
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Understand where things stand today across regions, teams,
                    and systems.
                  </span>
                </li>
                <li>
                  <span className="block font-semibold">
                    2. Co-design a practical path
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Align stakeholders around a zero-trust, resilient approach
                    that respects constraints.
                  </span>
                </li>
                <li>
                  <span className="block font-semibold">
                    3. Build, secure, and document
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Deliver improvements with automation, guardrails, and
                    documentation that teams can actually use.
                  </span>
                </li>
                <li>
                  <span className="block font-semibold">
                    4. Leave teams stronger
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Enable your teams to operate with confidence, not fear of
                    the next outage or incident.
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                A good starting point
              </p>
              <p>
                Many clients begin with a focused architecture and risk review
                to surface gaps in identity, access, and resilience — then
                extend into implementation where it makes sense.
              </p>
              <p className="pt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
                Not sure where to start? A short conversation is often enough to
                identify whether there&apos;s a meaningful way to help.
              </p>
              <Link
                to="/contact"
                className="mt-3 inline-flex items-center rounded-full bg-slate-900 px-4 py-1.5 text-[0.75rem] font-semibold text-slate-50 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                Start with a quick conversation →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
