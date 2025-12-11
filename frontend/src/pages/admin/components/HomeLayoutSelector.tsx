// src/pages/admin/components/HomeLayoutSelector.tsx
import type { FC } from "react";

const variants = [
  { id: "classic", label: "Classic", description: "Consulting-style layout…" },
  { id: "sleek", label: "Sleek", description: "Tech / product-style layout…" },
  { id: "blockchain", label: "Blockchain-style", description: "Infra / network layout…" },
  { id: "studio", label: "Studio", description: "Minimal, Apple-style layout…" },
  { id: "river", label: "River", description: "Chattahoochee-inspired layout…" },
    {
    id: "showcase",
    label: "Showcase SPA",
    description:
      "Image-rich, single-page flow with section nav and smooth scrolling. Great for modern product sites.",
  },
];

type Props = {
  value: string;
  onChange: (v: string) => void;
};

const HomeLayoutSelector: FC<Props> = ({ value, onChange }) => {
  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/85">
      <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
        Site settings
      </h2>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Choose which homepage layout is active in this draft. Changes go live
        only after you publish.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {variants.map((v) => {
          const active = v.id === value;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onChange(v.id)}
              className={[
                "flex h-full flex-col items-start rounded-2xl border px-3 py-3 text-left text-xs transition",
                active
                  ? "border-sky-500 bg-sky-50/80 shadow-sm dark:border-sky-400 dark:bg-sky-900/20"
                  : "border-slate-200 bg-white hover:border-sky-400 hover:bg-sky-50/60 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-sky-400 dark:hover:bg-sky-900/10",
              ].join(" ")}
            >
              <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                {v.label}
              </span>
              <span className="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
                {v.description}
              </span>
              {active && (
                <span className="mt-2 inline-flex items-center rounded-full bg-sky-600 px-2 py-0.5 text-[0.65rem] font-medium text-slate-50 dark:bg-sky-400 dark:text-slate-950">
                  Active in draft
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default HomeLayoutSelector;