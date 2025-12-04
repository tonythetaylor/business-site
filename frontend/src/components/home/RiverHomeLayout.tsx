// src/components/home/RiverHomeLayout.tsx

import { Link } from "react-router-dom";
import type { HeroContent, ServiceItem } from "../../types/content";
import { RevealSection } from "./RevealSection";

type HomeLayoutProps = {
  hero: HeroContent;
  services: ServiceItem[];
};

export default function RiverHomeLayout({ hero, services }: HomeLayoutProps) {
  const primaryCtaHref = hero.primaryCtaHref || "/contact";
  const primaryCtaLabel =
    hero.primaryCtaLabel || "Schedule a discovery call";
  const secondaryCtaHref = hero.secondaryCtaHref || "/services";
  const secondaryCtaLabel =
    hero.secondaryCtaLabel || "View services and capabilities";

  const visibleServices = services.length
    ? services.slice(0, 3)
    : [
        {
          title: "Platform strategy",
          description:
            "Clarify the architecture, ownership, and operating model for the platforms your teams build on every day.",
        },
        {
          title: "Secure delivery",
          description:
            "Embed security, compliance, and governance into the way you ship – not as last-minute gate checks.",
        },
        {
          title: "Operational resilience",
          description:
            "Reduce incident noise, shorten time-to-restore, and give leaders a clear view of risk and health.",
        },
      ];

  return (
    <div className="space-y-16 sm:space-y-20">
      <RevealSection>
        <RiverHero
          hero={hero}
          primaryCtaHref={primaryCtaHref}
          primaryCtaLabel={primaryCtaLabel}
          secondaryCtaHref={secondaryCtaHref}
          secondaryCtaLabel={secondaryCtaLabel}
        />
      </RevealSection>

      <RevealSection delay={120}>
        <RiverCurrents services={visibleServices} />
      </RevealSection>

      <RevealSection delay={220}>
        <RiverJourney />
      </RevealSection>

      <RevealSection delay={320}>
        <RiverFinalCta primaryCtaHref={primaryCtaHref} />
      </RevealSection>
    </div>
  );
}

type RiverHeroProps = {
  hero: HeroContent;
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref: string;
  secondaryCtaLabel: string;
};

function RiverHero({
  hero,
  primaryCtaHref,
  primaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaLabel,
}: RiverHeroProps) {
  return (
    <section
      className={[
        // bleed slightly outside container for more "full" feel
        "relative mx-[-1rem] overflow-hidden rounded-[2.5rem] border",
        "border-sky-100 bg-gradient-to-b from-sky-50 via-slate-50 to-slate-100",
        "shadow-sm dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
        "sm:mx-[-1.5rem] lg:mx-[-2rem]",
      ].join(" ")}
    >
      {/* Background river flow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.4),transparent_60%)] blur-2xl" />
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.4),transparent_60%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-[-30%] h-[60%] bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.05),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.6),transparent_60%)]" />
        {/* subtle “river lines” */}
        <div className="absolute inset-0 opacity-40 mix-blend-soft-light dark:opacity-50">
          <div className="absolute inset-x-0 top-1/3 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.8),transparent)]" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.8),transparent)]" />
          <div className="absolute inset-x-0 top-2/3 h-px bg-[linear-gradient(90deg,transparent,rgba(45,212,191,0.7),transparent)]" />
        </div>
      </div>

      <div className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr),minmax(0,1.1fr)] lg:items-center">
          {/* Left: main story */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/70 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-sky-700 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 dark:text-sky-300">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Brand Name · Mission-aligned engineering
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.8rem] lg:leading-tight dark:text-slate-50">
                {hero.headline ||
                  "Mission-critical platforms that flow the way your work does."}
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-700 sm:text-[0.95rem] dark:text-slate-300">
                {hero.subheadline ||
                  "We partner with technology, security, and operations leaders to turn fragmented systems into a coherent platform – so teams ship faster, risk is visible, and the mission stays front and center."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={primaryCtaHref}
                className="inline-flex items-center rounded-full bg-sky-600 px-6 py-2.5 text-sm font-semibold text-slate-50 shadow-sm hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400"
              >
                {primaryCtaLabel}
              </Link>
              <Link
                to={secondaryCtaHref}
                className="inline-flex items-center text-sm font-medium text-slate-800 hover:text-sky-700 dark:text-slate-100 dark:hover:text-sky-300"
              >
                <span className="mr-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white/70 text-[0.7rem] leading-[1.35rem] text-slate-700 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-100">
                  →
                </span>
                {secondaryCtaLabel}
              </Link>
            </div>

            {/* Micro “mission / values / results” */}
            <dl className="mt-5 grid gap-4 text-xs text-slate-600 sm:grid-cols-3 dark:text-slate-300">
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Mission
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Federal, regulated, high-stakes
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  How we work
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Calm, candid, security-first
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Outcomes
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Faster change, clearer risk
                </dd>
              </div>
            </dl>
          </div>

          {/* Right: river system “map” */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[2.25rem] bg-gradient-to-tr from-sky-200/60 via-slate-50 to-emerald-100/60 blur-2xl dark:from-sky-900/50 dark:via-slate-900 dark:to-emerald-900/40" />
            <div className="relative overflow-hidden rounded-[1.9rem] border border-sky-100/70 bg-white/90 text-xs shadow-xl backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-950/90">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-[0.7rem] text-slate-500 dark:border-slate-800 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="font-medium text-slate-800 dark:text-slate-100">
                    System river map
                  </span>
                </div>
                <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[0.65rem] text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
                  In sync
                </span>
              </div>

              <div className="px-4 py-4">
                {/* stylized “river” path */}
                <div className="relative mb-4 h-32 rounded-2xl bg-gradient-to-br from-sky-50 via-slate-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
                  {/* main river line */}
                  <div className="pointer-events-none absolute inset-4">
                    <svg
                      viewBox="0 0 400 140"
                      className="h-full w-full text-sky-400/80 dark:text-sky-300/90"
                      aria-hidden="true"
                    >
                      <path
                        d="M 0 80 C 60 40, 120 120, 200 70 C 260 40, 320 110, 400 70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="7"
                        strokeLinecap="round"
                        className="opacity-90"
                      />
                    </svg>
                  </div>

                  {/* nodes along the river */}
                  <div className="absolute inset-4 flex items-center justify-between text-[0.65rem] text-slate-700 dark:text-slate-200">
                    <div className="flex flex-col items-start gap-1">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 shadow-sm dark:bg-slate-900/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                        Strategy
                      </span>
                      <span className="text-[0.6rem] text-slate-500 dark:text-slate-400">
                        Mission, architecture, risk
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 shadow-sm dark:bg-slate-900/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Execution
                      </span>
                      <span className="text-[0.6rem] text-slate-500 dark:text-slate-400">
                        Delivery & security
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 shadow-sm dark:bg-slate-900/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-700" />
                        Impact
                      </span>
                      <span className="text-[0.6rem] text-slate-500 dark:text-slate-400">
                        Outcomes you can measure
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mb-3 text-[0.7rem] text-slate-600 dark:text-slate-300">
                  We do not just fix isolated issues. We look at how work,
                  risk, and information move end-to-end – then reshape the
                  system so it can support the mission over time.
                </p>

                <div className="grid gap-3 border-t border-slate-200 pt-3 text-[0.7rem] text-slate-600 dark:border-slate-800 dark:text-slate-300 sm:grid-cols-3">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Change lead time
                    </p>
                    <p className="mt-1 text-base font-semibold text-sky-600 dark:text-sky-300">
                      -30%
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Incident noise
                    </p>
                    <p className="mt-1 text-base font-semibold text-emerald-600 dark:text-emerald-300">
                      -37%
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Shared visibility
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">
                      90%+
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </section>
  );
}

function RiverCurrents({ services }: { services: ServiceItem[] }) {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-400">
          Where we plug in
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-50">
          Platform, security, and operations – aligned around outcomes
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          We focus on a few high-leverage currents in your organization –
          platform strategy, secure delivery, and operational resilience – and
          connect them into one coherent flow instead of disconnected projects.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((svc, idx) => (
          <article
            key={idx}
            className="group flex h-full flex-col rounded-3xl border border-sky-100 bg-white/90 p-6 text-sm shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-sky-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-sky-500/40"
          >
            <div className="mb-4 h-24 rounded-2xl bg-gradient-to-br from-sky-50 via-slate-50 to-emerald-50 opacity-80 transition group-hover:opacity-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {svc.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {svc.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RiverJourney() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)] md:items-center">
        <div className="space-y-4">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-400">
            How we work with you
          </p>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            A consulting rhythm built for teams that cannot afford chaos.
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            We are not here to drop a slide deck and disappear. We stay close
            enough to understand your reality, then help you make a sequence of
            practical, high-leverage moves that respect the mission and the
            people doing the work.
          </p>
          <ol className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>
              <span className="font-semibold">1. Listen and map.</span> We talk
              to teams, not just tools, and capture how work and risk really
              move today.
            </li>
            <li>
              <span className="font-semibold">2. Align on outcomes.</span>{" "}
              Define a small set of measurable changes that matter to the
              mission and to leadership.
            </li>
            <li>
              <span className="font-semibold">3. Build and prove.</span>{" "}
              Introduce new patterns, automation, and visibility – and prove
              they work in real scenarios.
            </li>
            <li>
              <span className="font-semibold">4. Hand off with care.</span>{" "}
              Document, pair, and coach so your teams own the new flow after we
              step back.
            </li>
          </ol>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Values in practice
          </p>
          <div className="grid grid-cols-3 gap-3 text-[0.7rem]">
            <div className="rounded-2xl bg-white/80 p-3 dark:bg-slate-900/70">
              <p className="text-slate-500 dark:text-slate-400">
                Transparency
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">
                Clear tradeoffs
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-3 dark:bg-slate-900/70">
              <p className="text-slate-500 dark:text-slate-400">Discipline</p>
              <p className="mt-1 text-base font-semibold text-sky-600 dark:text-sky-300">
                Repeatable patterns
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-3 dark:bg-slate-900/70">
              <p className="text-slate-500 dark:text-slate-400">Care</p>
              <p className="mt-1 text-base font-semibold text-emerald-600 dark:text-emerald-300">
                Teams set up to win
              </p>
            </div>
          </div>
          <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
            We measure our success by quieter incident channels, fewer surprises
            during change, and leaders who feel confident in the systems they
            own.
          </p>
        </div>
      </div>
    </section>
  );
}

function RiverFinalCta({ primaryCtaHref }: { primaryCtaHref: string }) {
  return (
    <section className="rounded-[2rem] border border-sky-100 bg-gradient-to-r from-sky-50 via-slate-50 to-emerald-50 p-6 text-sm shadow-sm dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-400">
            Ready for a clearer flow?
          </p>
          <p className="max-w-xl text-sm text-slate-700 dark:text-slate-300">
            Bring us one system, one program, or one problem area that feels
            noisy or fragile. We will share how we would approach it, what to
            measure, and whether we are the right partner – in plain language.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={primaryCtaHref}
            className="inline-flex items-center rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-slate-50 shadow-sm hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400"
          >
            Schedule a discovery call
          </Link>
        </div>
      </div>
    </section>
  );
}