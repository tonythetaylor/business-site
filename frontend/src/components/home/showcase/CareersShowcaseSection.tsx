// src/components/home/showcase/CareersShowcaseSection.tsx
import { useEffect, useState, type RefObject } from "react";
import { type SectionId } from "./sectionsConfig";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
  isActive: boolean;
  sectionBaseClasses: string;
  sectionBorderClasses: string;
    scrollTo: (id: SectionId) => void;
  
};

type Role = {
  title: string;
  location: string;
  type: string;
};

const ALL_ROLES: Role[] = [
  {
    title: "Senior Cloud / DevSecOps Engineer",
    location: "Remote · US time zones",
    type: "Full-time",
  },
  {
    title: "Senior Full-Stack Engineer",
    location: "Remote · US / Canada",
    type: "Full-time",
  },
  {
    title: "Security-minded SRE",
    location: "Hybrid · DC / Baltimore",
    type: "Full-time",
  },
  {
    title: "Platform Engineer (Kubernetes)",
    location: "Remote · US time zones",
    type: "Full-time",
  },
  {
    title: "Staff Software Engineer, Observability",
    location: "Remote · US / EU overlap",
    type: "Full-time",
  },
  {
    title: "Senior Automation Engineer",
    location: "Remote · US time zones",
    type: "Contract / FT track",
  },
  {
    title: "Engagement Lead (Technical)",
    location: "Remote · US time zones",
    type: "Full-time",
  },
];

function getRandomSubset<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items;
  const copy = [...items];
  // Fisher–Yates shuffle
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

export default function CareersShowcaseSection({
  sectionRef,
  isActive,
  sectionBaseClasses,
  sectionBorderClasses,
  scrollTo
}: Props) {
  const [visibleRoles, setVisibleRoles] = useState<Role[]>(() =>
    getRandomSubset(ALL_ROLES, 5)
  );

  // Rotate the list every 15–30 seconds
  useEffect(() => {
    let timeoutId: number | undefined;

    const scheduleNext = () => {
      const delay = 15000 + Math.random() * 15000; // 15–30s
      timeoutId = window.setTimeout(() => {
        setVisibleRoles(getRandomSubset(ALL_ROLES, 5));
        scheduleNext();
      }, delay);
    };

    if (typeof window !== "undefined") {
      scheduleNext();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section-id="careers"
      id="careers"
      className={[
        sectionBaseClasses,
        sectionBorderClasses,
        "flex-col justify-center",
        isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-3",
      ].join(" ")}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row lg:items-stretch">
        {/* LEFT: story / value prop */}
        <div className="flex flex-1 flex-col justify-center space-y-8">
          <div className="space-y-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-500 dark:text-emerald-400">
              Careers
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-[2.25rem] sm:leading-[1.05] dark:text-slate-50">
              Work with senior teams on hard, meaningful problems.
            </h2>
            <p className="max-w-xl text-sm text-slate-600 dark:text-slate-300">
              We keep teams small, collaborative, and deeply technical. You&apos;ll
              ship secure systems, own your work end-to-end, and still have time
              for a life outside the on-call rotation.
            </p>
          </div>

          {/* Pill cards: what it’s like to work here */}
          <div className="grid gap-4 text-[0.8rem] text-slate-700 sm:grid-cols-3 dark:text-slate-200">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/80">
              <p className="text-[0.65rem] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Real ownership
              </p>
              <p className="mt-2">
                Lead engagements end-to-end with direct access to decision
                makers – no layers of middle management.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/80">
              <p className="text-[0.65rem] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Modern stack
              </p>
              <p className="mt-2">
                Cloud-native, IaC, strong observability, and a focus on quality
                over quick hacks.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/80">
              <p className="text-[0.65rem] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Healthy pace
              </p>
              <p className="mt-2">
                No heroics culture. We plan, communicate, and execute together –
                sustainably.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Most people who thrive here love pairing on hard technical problems,
            mentoring others, and leaving systems better than they found them.
          </p>
        </div>

        {/* RIGHT: rotating roles panel */}
        <div className="flex flex-1 items-stretch">
          <div className="flex w-full flex-col rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900/90">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Sample roles
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  We hire across cloud, security, and full-stack delivery.
                  These are some of the roles you&apos;ll see open.
                </p>
              </div>
              <a
                href="/careers"
                className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-1.5 text-[0.75rem] font-semibold text-slate-950 shadow-sm hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300"
              >
                View open roles
              </a>
            </div>

            <div className="mt-5 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-sm dark:border-slate-700 dark:bg-slate-950/60">
              <ul className="space-y-2.5">
                {visibleRoles.map((role, idx) => (
                  <li
                    key={`${role.title}-${idx}`}
                    className="flex items-start justify-between gap-3 rounded-xl bg-white/90 px-3 py-2.5 text-xs text-slate-800 shadow-sm dark:bg-slate-900/90 dark:text-slate-100"
                  >
                    <div className="space-y-0.5">
                      <p className="font-semibold">{role.title}</p>
                      <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                        {role.location}
                      </p>
                    </div>
                    <span className="mt-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      {role.type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-3 text-[0.7rem] text-slate-500 dark:text-slate-400">
              Don&apos;t see your exact title? We&apos;re always happy to hear from
              senior engineers who care about security, reliability, and good
              engineering practice.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <button
          type="button"
          onClick={() => scrollTo("contact")}
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