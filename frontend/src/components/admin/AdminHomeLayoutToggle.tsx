// frontend/src/components/admin/AdminHomeLayoutToggle.tsx

import { useEffect, useState } from "react";
import { useAdminDraft } from "../../contexts/AdminDraftContext";
import type { HomeLayoutVariant } from "../../types/content"; // "classic" | "sleek" | "blockchain" | "studio" | "river"

type Status = "idle" | "loading" | "saving" | "error" | "success";

export default function AdminHomeLayoutToggle() {
  const { draft, setDraft } = useAdminDraft();
  const [currentLayout, setCurrentLayout] =
    useState<HomeLayoutVariant>("classic");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  // Sync local state with the draft when it changes
  useEffect(() => {
    if (!draft) return;

    const layout = (draft.hero as any)?.layoutVariant as
      | HomeLayoutVariant
      | undefined;

    const allowed: HomeLayoutVariant[] = [
      "classic",
      "sleek",
      "blockchain",
      "studio",
      "river",
    ];

    if (layout && allowed.includes(layout)) {
      setCurrentLayout(layout);
    } else {
      setCurrentLayout("classic");
    }

    setStatus("idle");
    setMessage(null);
  }, [draft]);

  const handleChange = (next: HomeLayoutVariant) => {
    if (!draft) return;
    if (next === currentLayout) return;

    setCurrentLayout(next);

    // Update the draft hero.layoutVariant only
    setDraft({
      ...draft,
      hero: {
        ...draft.hero,
        layoutVariant: next,
      },
    });

    setStatus("success");
    setMessage("Homepage layout updated in draft. Publish to make it live.");
    setTimeout(() => {
      setStatus("idle");
      setMessage(null);
    }, 2000);
  };

  const isBusy = status === "loading" || !draft;

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Site settings
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Choose which homepage layout is active in this draft. Changes go
            live only after you publish.
          </p>
        </div>
        {status === "loading" && (
          <span className="text-[0.7rem] text-slate-500 dark:text-slate-400">
            Loading…
          </span>
        )}
      </header>

      {/* 5 cards → 2x2 + wrap on md, 5 in a row on xl */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Classic card */}
        <button
          type="button"
          disabled={isBusy}
          onClick={() => handleChange("classic")}
          className={[
            "flex flex-col items-start rounded-xl border p-4 text-left transition",
            currentLayout === "classic"
              ? "border-indigo-500 bg-white shadow-sm dark:border-indigo-400 dark:bg-slate-900"
              : "border-slate-200 bg-white/70 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-slate-700",
            isBusy ? "cursor-not-allowed opacity-70" : "cursor-pointer",
          ].join(" ")}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Classic
          </span>
          <span className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
            Consulting-style layout
          </span>
          <span className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Hero + engagement flow and services overview. Good for
            general-purpose consulting and small businesses.
          </span>
          {currentLayout === "classic" && (
            <span className="mt-2 inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[0.7rem] font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
              Active in draft
            </span>
          )}
        </button>

        {/* Sleek card */}
        <button
          type="button"
          disabled={isBusy}
          onClick={() => handleChange("sleek")}
          className={[
            "flex flex-col items-start rounded-xl border p-4 text-left transition",
            currentLayout === "sleek"
              ? "border-indigo-500 bg-white shadow-sm dark:border-indigo-400 dark:bg-slate-900"
              : "border-slate-200 bg-white/70 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-slate-700",
            isBusy ? "cursor-not-allowed opacity-70" : "cursor-pointer",
          ].join(" ")}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Sleek
          </span>
          <span className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
            Tech / product-style layout
          </span>
          <span className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Dark hero, “live system snapshot,” and product-like sections tuned
            for engineering and platform teams.
          </span>
          {currentLayout === "sleek" && (
            <span className="mt-2 inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[0.7rem] font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
              Active in draft
            </span>
          )}
        </button>

        {/* Blockchain-style card */}
        <button
          type="button"
          disabled={isBusy}
          onClick={() => handleChange("blockchain")}
          className={[
            "flex flex-col items-start rounded-xl border p-4 text-left transition",
            currentLayout === "blockchain"
              ? "border-sky-500 bg-white shadow-sm dark:border-sky-400 dark:bg-slate-900"
              : "border-slate-200 bg-white/70 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-slate-700",
            isBusy ? "cursor-not-allowed opacity-70" : "cursor-pointer",
          ].join(" ")}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Blockchain-style
          </span>
          <span className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
            Infra / network layout
          </span>
          <span className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Gradient hero, stat strip, and “global execution graph” visual
            inspired by blockchain / infra landing pages.
          </span>
          {currentLayout === "blockchain" && (
            <span className="mt-2 inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-[0.7rem] font-medium text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
              Active in draft
            </span>
          )}
        </button>

        {/* Studio-style card – Apple-ish */}
        <button
          type="button"
          disabled={isBusy}
          onClick={() => handleChange("studio")}
          className={[
            "flex flex-col items-start rounded-xl border p-4 text-left transition",
            currentLayout === "studio"
              ? "border-slate-900 bg-white shadow-sm dark:border-slate-100 dark:bg-slate-900"
              : "border-slate-200 bg-white/80 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-slate-700",
            isBusy ? "cursor-not-allowed opacity-70" : "cursor-pointer",
          ].join(" ")}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Studio
          </span>
          <span className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
            Minimal, Apple-style layout
          </span>
          <span className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Big typography, soft gradients, calm panels, and smooth full-page
            sections – inspired by modern hardware marketing sites.
          </span>
          {currentLayout === "studio" && (
            <span className="mt-2 inline-flex items-center rounded-full bg-slate-900 px-2 py-0.5 text-[0.7rem] font-medium text-slate-50 dark:bg-slate-50 dark:text-slate-900">
              Active in draft
            </span>
          )}
        </button>

        {/* River-style card – Chattahoochee vibe */}
        <button
          type="button"
          disabled={isBusy}
          onClick={() => handleChange("river")}
          className={[
            "flex flex-col items-start rounded-xl border p-4 text-left transition",
            currentLayout === "river"
              ? "border-sky-500 bg-white shadow-sm dark:border-sky-400 dark:bg-slate-900"
              : "border-slate-200 bg-white/80 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-sky-500/40",
            isBusy ? "cursor-not-allowed opacity-70" : "cursor-pointer",
          ].join(" ")}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
            River
          </span>
          <span className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
            Chattahoochee-inspired layout
          </span>
          <span className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Flowing gradients, “system river map,” and calm scroll reveals
            inspired by the Chattahoochee River and platform flow.
          </span>
          {currentLayout === "river" && (
            <span className="mt-2 inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-[0.7rem] font-medium text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
              Active in draft
            </span>
          )}
        </button>
      </div>

      {message && (
        <p
          className={[
            "mt-3 text-xs",
            status === "error"
              ? "text-red-600 dark:text-red-400"
              : "text-slate-600 dark:text-slate-300",
          ].join(" ")}
        >
          {message}
        </p>
      )}
    </section>
  );
}