// src/components/home/StudioHomeLayout.tsx

import { Link } from "react-router-dom";
import type { HeroContent, ServiceItem } from "../../types/content";
import { RevealSection } from "./RevealSection";

type HomeLayoutProps = {
  hero: HeroContent;
  services: ServiceItem[];
};

export default function StudioHomeLayout({ hero, services }: HomeLayoutProps) {
  const primaryCtaHref = hero.primaryCtaHref || "/contact";
  const primaryCtaLabel = hero.primaryCtaLabel || "Schedule a conversation";
  const secondaryCtaHref = hero.secondaryCtaHref || "/services";
  const secondaryCtaLabel = hero.secondaryCtaLabel || "Explore capabilities";

  const visibleServices = services.length
    ? services.slice(0, 3)
    : [
        {
          title: "Platform clarity",
          description:
            "Unwind years of tech debt and create a platform your teams can actually understand and evolve.",
        },
        {
          title: "Secure delivery",
          description:
            "Bake security into the way you ship software instead of checking it at the very end.",
        },
        {
          title: "Confident change",
          description:
            "Ship faster with guardrails – observability, automation, and patterns that hold up under pressure.",
        },
      ];

  return (
    <div className="space-y-20 sm:space-y-24">
      <RevealSection>
        <StudioHero
          hero={hero}
          primaryCtaHref={primaryCtaHref}
          primaryCtaLabel={primaryCtaLabel}
          secondaryCtaHref={secondaryCtaHref}
          secondaryCtaLabel={secondaryCtaLabel}
        />
      </RevealSection>

      <RevealSection delay={120}>
        <StudioPanels services={visibleServices} />
      </RevealSection>

      <RevealSection delay={220}>
        <StudioFlowSection />
      </RevealSection>

      <RevealSection delay={320}>
        <StudioFinalCta primaryCtaHref={primaryCtaHref} />
      </RevealSection>
    </div>
  );
}

type StudioHeroProps = {
  hero: HeroContent;
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref: string;
  secondaryCtaLabel: string;
};

function StudioHero({
  hero,
  primaryCtaHref,
  primaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaLabel,
}: StudioHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-50">
      {/* soft backdrop */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 flex justify-center opacity-70 blur-3xl">
        <div className="h-56 w-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.45),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.6),transparent_60%)]" />
      </div>

      <div className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          {/* Left – main story */}
          <div className="max-w-xl space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Brand Name
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.85rem] lg:leading-tight dark:text-slate-50">
                {hero.headline ||
                  "Modern engineering for teams that want less noise and more signal."}
              </h1>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-[0.95rem] dark:text-slate-300">
                {hero.subheadline ||
                  "We work with product, platform, and security leaders to simplify complex stacks, ship faster, and keep the things that matter most protected."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={primaryCtaHref}
                className="inline-flex items-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-slate-50 shadow-sm hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {primaryCtaLabel}
              </Link>
              <Link
                to={secondaryCtaHref}
                className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
              >
                {secondaryCtaLabel} →
              </Link>
            </div>

            {/* Micro metrics */}
            <dl className="mt-4 grid gap-4 text-xs text-slate-600 sm:grid-cols-3 dark:text-slate-300">
              <div className="space-y-1">
                <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Engagements
                </dt>
                <dd className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Architecture → Run
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Where we shine
                </dt>
                <dd className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Cloud, security, delivery
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Way of working
                </dt>
                <dd className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Calm, deliberate, transparent
                </dd>
              </div>
            </dl>
          </div>

          {/* Right – calm product panel */}
          <div className="flex-1">
            <div className="relative mx-auto max-w-md">
              <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-slate-200/60 via-slate-50 to-slate-200/60 blur-2xl dark:from-slate-800/60 dark:via-slate-900 dark:to-slate-700/60" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/90 text-xs shadow-xl backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/90">
                {/* Top bar */}
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-[0.7rem] text-slate-500 dark:border-slate-800 dark:text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="font-medium text-slate-800 dark:text-slate-100">
                      Platform overview
                    </span>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.65rem] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                    Live
                  </span>
                </div>

                {/* Two-column story */}
                <div className="grid gap-4 border-b border-slate-200 px-4 py-4 text-[0.75rem] text-slate-700 dark:border-slate-800 dark:text-slate-200 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      Today
                    </p>
                    <p className="leading-relaxed">
                      Reduce noise around incidents, deploys, and risk by giving
                      your teams a single, shared view of what is happening.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      Tomorrow
                    </p>
                    <p className="leading-relaxed">
                      Use the same data to drive better architecture decisions,
                      investment choices, and roadmaps.
                    </p>
                  </div>
                </div>

                {/* Simple graph / timeline */}
                <div className="px-4 py-4 text-[0.7rem] text-slate-600 dark:text-slate-300">
                  <p className="mb-3 text-[0.65rem] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    Signal over time
                  </p>
                  <div className="h-24 rounded-xl bg-slate-50 p-3 dark:bg-slate-900/70">
                    <div className="flex h-full items-end justify-between gap-2">
                      <div className="flex-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <div className="flex-1 rounded-full bg-slate-400 dark:bg-slate-600" />
                      <div className="flex-1 rounded-full bg-slate-500 dark:bg-slate-500" />
                      <div className="flex-1 rounded-full bg-slate-700 dark:bg-slate-300" />
                      <div className="flex-1 rounded-full bg-slate-400 dark:bg-slate-600" />
                    </div>
                  </div>
                  <p className="mt-2 text-[0.65rem] text-slate-500 dark:text-slate-400">
                    Less noise, clearer signals, and decisions that feel less
                    reactive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StudioPanels({ services }: { services: ServiceItem[] }) {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          Where we plug in
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-50">
          Calm, deliberate help across the stack
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          We focus on a few critical leverage points – platform, delivery, and
          security – so the whole system feels simpler to change.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((svc, idx) => (
          <article
            key={idx}
            className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white/80 p-6 text-sm shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-slate-700"
          >
            <div className="mb-4 h-28 rounded-2xl bg-gradient-to-br from-slate-100 via-white to-slate-200 transition group-hover:from-slate-200 group-hover:via-white group-hover:to-slate-300 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
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

function StudioFlowSection() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr),minmax(0,1.1fr)] md:items-center">
        <div className="space-y-4">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            A calmer way to modernize
          </p>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            You do not have to fix everything at once to make real progress.
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            We focus on one or two meaningful shifts at a time – the ones that
            unlock better delivery, better reliability, or clearer risk
            decisions. The goal is a stack that feels lighter, not heavier.
          </p>
          <ol className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>
              <span className="font-semibold">1. Listen and map.</span>{" "}
              Capture the real constraints, not just the architecture diagram.
            </li>
            <li>
              <span className="font-semibold">2. Choose leverage.</span>{" "}
              Identify small changes that have outsized impact.
            </li>
            <li>
              <span className="font-semibold">3. Build the pattern.</span>{" "}
              Implement, observe, and refine with your teams.
            </li>
            <li>
              <span className="font-semibold">4. Repeat with confidence.</span>{" "}
              Apply the same pattern in other parts of the system.
            </li>
          </ol>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Example outcome
          </p>
          <div className="grid grid-cols-3 gap-3 text-[0.7rem]">
            <div className="rounded-2xl bg-white/80 p-3 dark:bg-slate-900/70">
              <p className="text-slate-500 dark:text-slate-400">
                Time-to-restore
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">
                -45%
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-3 dark:bg-slate-900/70">
              <p className="text-slate-500 dark:text-slate-400">
                Silent failures
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">
                ↓ sharply
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 p-3 dark:bg-slate-900/70">
              <p className="text-slate-500 dark:text-slate-400">
                Delivery pace
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">
                Weekly
              </p>
            </div>
          </div>
          <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
            A typical result after aligning platform, delivery, and security
            work around a shared roadmap.
          </p>
        </div>
      </div>
    </section>
  );
}

function StudioFinalCta({ primaryCtaHref }: { primaryCtaHref: string }) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            One quiet conversation to start
          </p>
          <p className="max-w-xl text-sm text-slate-700 dark:text-slate-300">
            Share where things feel noisy, fragile, or slow right now. If we are
            not the right partner, we will say that plainly and try to point you
            to something more useful.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={primaryCtaHref}
            className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-slate-50 shadow-sm hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Start the conversation
          </Link>
        </div>
      </div>
    </section>
  );
}