// src/components/home/showcase/AboutShowcaseSection.tsx
import type { RefObject } from "react";
import type { SiteContent } from "../../../api/content";
import { type SectionId } from "./sectionsConfig";

type Props = {
  about: SiteContent["about"];
  scrollY: number;
  sectionRef: RefObject<HTMLElement | null>;
  isActive: boolean;
  sectionBaseClasses: string;
  sectionBorderClasses: string;
  scrollTo: (id: SectionId) => void;
};

export default function AboutShowcaseSection({
  about,
  scrollY,
  sectionRef,
  isActive,
  sectionBaseClasses,
  sectionBorderClasses,
  scrollTo,
}: Props) {
  const aboutImage =
    about.imageUrl ||
    "https://media.istockphoto.com/id/2166573931/photo/reflection-of-people-on-glass-window.jpg?s=612x612&w=0&k=20&c=nsiUHRBwuWR0h_JBzeVbSEU_5MfJgODr08TbKBcyhwM=";

  const aboutParallax = -(scrollY * 0.02);

  return (
    <section
      ref={sectionRef}
      data-section-id="about"
      id="about"
      className={[
        sectionBaseClasses,
        sectionBorderClasses,
        "relative overflow-hidden",
        isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-3",
      ].join(" ")}
    >
      <div className="relative z-10 grid w-full gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-start">
        {/* === LEFT: LARGE IMAGE === */}
        <div className="relative">
          <div
            className="relative w-full max-w-3xl will-change-transform"
            style={{ transform: `translateY(${aboutParallax}px)` }}
          >
            <div className="absolute -inset-4 rounded-3xl bg-slate-300/60 blur-3xl dark:bg-slate-800/60 pointer-events-none" />
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl bg-white dark:border-slate-800 dark:bg-slate-900">
              <img
                src={aboutImage}
                alt="About visual"
                className="h-[420px] w-full object-cover sm:h-[520px] lg:h-[600px]"
              />
            </div>
          </div>
        </div>

        {/* === RIGHT: TEXT CONTENT (not height-locked) === */}
        <div className="flex flex-col space-y-8">
          {/* Section label */}
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
            About the company
          </p>

          {/* Large mission statement */}
          <h2 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-50 sm:text-[2.7rem]">
            {about.title ||
              "We help teams untangle complexity and build platforms that last."}
          </h2>

          {/* Supporting big text */}
          <p className="text-lg font-medium text-slate-700 max-w-2xl dark:text-slate-200">
            We believe critical systems should feel calm, secure, and easy to
            change. Our goal is to bring senior, thoughtful engineering to teams
            who cannot afford downtime, rework, or fire drills.
          </p>

          {/* Body paragraphs */}
          <div className="space-y-4 text-sm leading-relaxed text-slate-600 max-w-2xl dark:text-slate-300">
            {(about.body ?? []).map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}

            <button
              type="button"
              className="inline-flex items-center text-sm font-semibold text-sky-700 underline-offset-4 hover:underline dark:text-sky-300"
            >
              Read more about our story <span className="ml-1 text-xs">↗</span>
            </button>
          </div>

          {/* Roadmap narrative */}
          <div className="border-l border-slate-200 pl-5 space-y-6 max-w-xl dark:border-slate-700">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Where it started
              </p>
              <p className="mt-1 text-slate-700 dark:text-slate-200">
                Years inside regulated, high-pressure engineering teams taught
                us what actually breaks under load—and how to design systems
                that don’t.
              </p>
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                What we do now
              </p>
              <p className="mt-1 text-slate-700 dark:text-slate-200">
                We build and harden cloud platforms, security pipelines, and
                observability foundations that support real-world production
                needs.
              </p>
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                What’s next
              </p>
              <p className="mt-1 text-slate-700 dark:text-slate-200">
                Expanding repeatable patterns that help teams treat security and
                reliability as product features, not afterthoughts.
              </p>
            </div>
          </div>

          {/* Small “at a glance” chips */}
          <div className="flex flex-wrap gap-3 text-[0.75rem] text-slate-600 dark:text-slate-400">
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 dark:border-slate-700 dark:bg-slate-900/70">
              15+ years in critical environments
            </span>
            <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 dark:border-slate-700 dark:bg-slate-900/70">
              Cloud, security, and delivery combined
            </span>
          </div>
        </div>
      </div>
      {/* Scroll hint */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <button
          type="button"
          onClick={() => scrollTo("services")}
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
