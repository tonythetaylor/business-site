// src/components/home/showcase/HeroShowcaseSection.tsx
import type { RefObject } from "react";
import type { SiteContent } from "../../../api/content";
import { sections, type SectionId } from "./sectionsConfig";

type Props = {
  hero: SiteContent["hero"];
  scrollY: number;
  sectionRef: RefObject<HTMLElement | null>;
  isActive: boolean;
  scrollTo: (id: SectionId) => void;
  sectionBaseClasses: string;
  sectionBorderClasses: string;
};

const STATS = [
  { label: "Platforms launched", value: "60+" },
  { label: "High-risk incidents reduced", value: "40%+" },
  { label: "Projects delivered on-time", value: "95%" },
];

export default function HeroShowcaseSection({
  hero,
  scrollY,
  sectionRef,
  isActive,
  scrollTo,
  sectionBaseClasses,
  sectionBorderClasses,
}: Props) {
  const heroImage =
    hero.imageUrl ||
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80";

  const heroParallax = -(scrollY * 0.04);

  return (
    <section
      ref={sectionRef}
      data-section-id="hero"
      id="hero"
      className={[
        sectionBaseClasses,
        sectionBorderClasses,
        "relative flex flex-col items-stretch justify-between gap-10 px-0 overflow-hidden lg:flex-row lg:gap-14",
        isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-3",
      ].join(" ")}
    >
      {/* === LEFT COLUMN – brand story & invite === */}
      <div className="relative z-10 flex flex-1 flex-col justify-center space-y-8 px-6 pt-12 lg:px-16 lg:pt-0">
        {/* Strapline */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-100/70 px-3 py-1 text-[0.7rem] text-sky-700 dark:bg-sky-500/10 dark:text-sky-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            Cloud, security &amp; DevSecOps partner
          </span>
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            For teams running critical systems
          </span>
        </div>

        {/* Headline + clear value prop */}
        <div className="space-y-4">
          <h1 className="text-[2.6rem] font-semibold leading-[1.05] text-slate-900 md:text-[3rem] dark:text-slate-50">
            {hero.headline || (
              <>
                We build and secure{" "}
                <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                  the platforms your business runs on.
                </span>
              </>
            )}
          </h1>
          <p className="max-w-xl text-sm text-slate-700 dark:text-slate-300">
            {hero.subheadline ||
              "We help regulated and fast-moving teams move off fragile legacy systems and into secure, observable cloud platforms – without burning out your engineers."}
          </p>

          <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">
            In one sentence: we design, build, and harden the infrastructure
            behind your products so you can ship faster, sleep better, and pass
            audits with confidence.
          </p>
        </div>

        {/* Tag reel */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-[0.7rem]">
          <span className="whitespace-nowrap rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-800 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-200">
            Platform engineering
          </span>
          <span className="whitespace-nowrap rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-800 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-200">
            DevSecOps &amp; compliance
          </span>
          <span className="whitespace-nowrap rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-800 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-200">
            Observability &amp; SRE
          </span>
          <span className="whitespace-nowrap rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-800 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-200">
            Migration &amp; modernization
          </span>
        </div>
        {/* SPA-style internal nav + dark mode toggle */}
        <div className="max-w-xl rounded-full border border-slate-200 bg-white/70 px-2 py-1 text-[0.7rem] shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Left: Section nav buttons */}
            <div className="flex flex-wrap gap-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollTo(s.id)}
                  className={[
                    "rounded-full px-3 py-1 transition",
                    s.id === "hero"
                      ? "bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                  ].join(" ")}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Dark mode toggle (icon only) */}
            <button
              type="button"
              onClick={() => {
                const root = document.documentElement;
                root.classList.toggle("dark");
              }}
              className="
    ml-auto rounded-full p-2 
    text-slate-500 hover:bg-slate-100 hover:text-slate-900
    dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100
    transition flex items-center justify-center
  "
              aria-label="Toggle dark mode"
            >
              {/* Moon icon (light mode) */}
              <svg
                className="h-4 w-4 dark:hidden"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 0021 12.79z" />
              </svg>

              {/* Sun icon (dark mode) */}
              <svg
                className="h-4 w-4 hidden dark:block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.414-1.414M5.464 5.464L4.05 4.05m0 15.9l1.414-1.414m12.02-12.02L19.95 4.05" />
              </svg>
            </button>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {hero.primaryCtaHref && hero.primaryCtaLabel ? (
            <a
              href={hero.primaryCtaHref}
              className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
            >
              {hero.primaryCtaLabel}
            </a>
          ) : (
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
              className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
            >
              Talk to the team
            </a>
          )}
          <button
            type="button"
            onClick={() => scrollTo("services")}
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-800 hover:border-sky-500 hover:text-sky-600 dark:border-slate-600 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-300"
          >
            View services &amp; examples
          </button>
        </div>

        {/* Scenarios */}
        <div className="mt-4 grid gap-3 text-[0.8rem] text-slate-800 dark:text-slate-200 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-[0.65rem] uppercase tracking-wide text-slate-500 dark:text-slate-400">
              If you&apos;re…
            </p>
            <p className="mt-2">
              Owning a fragile legacy stack that everyone is afraid to touch.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-[0.65rem] uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Or…
            </p>
            <p className="mt-2">
              Under pressure to prove security, uptime, and audit-readiness.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-[0.65rem] uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Or…
            </p>
            <p className="mt-2">
              Trying to ship new features without breaking what&apos;s already
              in production.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid gap-3 text-[0.8rem] text-slate-800 sm:grid-cols-3 dark:text-slate-200">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-950/90"
            >
              <p className="text-[0.65rem] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-[0.7rem] text-slate-500 dark:text-slate-400">
          <span className="text-slate-700 dark:text-slate-300">
            Teams we&apos;ve partnered with:
          </span>
          <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-800 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-200">
            Public sector &amp; government
          </span>
          <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-800 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-200">
            Healthcare &amp; life sciences
          </span>
          <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-slate-800 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-200">
            Financial services &amp; fintech
          </span>
        </div>
      </div>

      {/* === RIGHT COLUMN – visual === */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 pb-20 lg:px-10 lg:pb-0">
        <div
          className="flex w-full max-w-2xl flex-col gap-4"
          style={{ transform: `translateY(${heroParallax}px)` }}
        >
          {/* Large window */}
          <div className="relative rounded-[2.1rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] dark:border-slate-800 dark:bg-slate-950">
            <div className="overflow-hidden rounded-[2rem] border-t border-slate-200 bg-slate-900/95 dark:border-slate-800 dark:bg-slate-950/95">
              {/* Chrome bar */}
              <div className="flex items-center gap-1.5 border-b border-slate-200 px-4 py-2 text-[0.65rem] text-slate-500 dark:border-slate-800">
                <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                <span className="ml-3 text-slate-500 dark:text-slate-400">
                  client-platform-overview
                </span>
                <span className="ml-auto rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.6rem] text-emerald-500 dark:text-emerald-400">
                  live
                </span>
              </div>

              {/* Image + overlay */}
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Team working together"
                  className="h-[300px] w-full object-cover sm:h-[360px]"
                />

                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-slate-900/90 px-4 py-3 text-[0.75rem] text-slate-100 backdrop-blur dark:bg-slate-950/90">
                  <p className="text-[0.6rem] uppercase tracking-wide text-sky-400">
                    Outcome snapshot
                  </p>
                  <p className="mt-0.5 font-semibold">
                    One health system cut incident response time by 45% after we
                    rebuilt their platform around observability and automation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="grid gap-3 text-[0.75rem] text-slate-800 sm:grid-cols-3 dark:text-slate-200">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-950/90">
              <p className="text-[0.6rem] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                01 • Listen
              </p>
              <p className="mt-1">
                We start with your systems, constraints, and what&apos;s already
                working.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-950/90">
              <p className="text-[0.6rem] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                02 • Design &amp; build
              </p>
              <p className="mt-1">
                We co-design the target state and build it with your team, not
                around them.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-950/90">
              <p className="text-[0.6rem] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                03 • Handover
              </p>
              <p className="mt-1">
                We leave behind runbooks, dashboards, and ownership – not
                mystery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <button
          type="button"
          onClick={() => scrollTo("about")}
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
