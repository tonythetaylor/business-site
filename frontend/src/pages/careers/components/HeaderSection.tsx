// src/pages/careers/components/HeaderSection.tsx
import type { CareersIntro } from "../../../api/content"; // adjust to your real type

type HeaderSectionProps = {
  intro: CareersIntro | undefined;
};

export default function HeaderSection({ intro }: HeaderSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-linear-to-b from-slate-50 via-slate-100 to-slate-50 dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* background “current” */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-32 -top-40 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),transparent_60%)] blur-3xl" />
        <div className="absolute right-[-10%] top-10 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),transparent_60%)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-[-30%] h-[60%] bg-[radial-gradient(circle_at_top,rgba(226,232,240,0.7),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.7),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/50 bg-sky-50/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-700 dark:bg-sky-500/10 dark:text-sky-200">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Careers at Brand Title
            </span>

            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.8rem] lg:leading-tight text-slate-900 dark:text-slate-50">
                {intro?.headline ||
                  "Build calmer, higher-trust systems for missions that matter."}
              </h1>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-[0.95rem] dark:text-slate-300">
                {intro?.subheadline ||
                  "We are a security-focused engineering studio working where architecture, delivery, and risk meet. If you care about disciplined engineering, real-world outcomes, and treating people like adults, you will fit in here."}
              </p>
            </div>

            <dl className="mt-4 grid gap-4 text-xs text-slate-600 sm:grid-cols-3 dark:text-slate-300">
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  What we optimize for
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Outcomes, not hours
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  How we work
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Calm, clear, collaborative
                </dd>
              </div>
              <div>
                <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Where we show up
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Gov, regulated, and mission-critical
                </dd>
              </div>
            </dl>
          </div>

          {/* “How we hire” card */}
          <div className="max-w-md rounded-3xl border border-slate-200/80 bg-white/90 p-5 text-xs shadow-xl backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/80">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              How we hire
            </p>
            <ol className="mt-3 space-y-2 text-[0.8rem] text-slate-700 dark:text-slate-300">
              <li>
                <span className="font-semibold text-slate-900 dark:text-slate-50">
                  1. Lightweight intro.
                </span>{" "}
                Share your resume, a link, and a short note. No long forms.
              </li>
              <li>
                <span className="font-semibold text-slate-900 dark:text-slate-50">
                  2. Conversation, not an interrogation.
                </span>{" "}
                We look for signal on how you think, build, and collaborate.
              </li>
              <li>
                <span className="font-semibold text-slate-900 dark:text-slate-50">
                  3. Values & mission fit.
                </span>{" "}
                We care about how you handle ambiguity, risk, and ownership.
              </li>
            </ol>
            <p className="mt-4 text-[0.7rem] text-slate-500 dark:text-slate-400">
              We only collect demographic information (veteran status, race,
              disability, etc.) if you are selected for an interview and move
              into the scheduling step. Even then, providing that information is
              optional and used only for compliance and inclusion efforts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}