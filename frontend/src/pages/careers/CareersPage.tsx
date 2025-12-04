// src/pages/careers/CareersPage.tsx
import { useContent } from "../../contexts/ContentContext";
import type { CareerPosition } from "../../api/content";
import HeaderSection from "./components/HeaderSection";
import RolesSection from "./components/RolesSection";
import ProcessCard from "./components/ProcessCard";
import ApplicationForm from "./components/ApplicationForm";
import { useCareersForm } from "./useCareersForm";

export default function CareersPage() {
  const { content, loading, error } = useContent();

console.log(
  "unique workModes from backend:",
  Array.from(
    new Set((content?.careers.positions ?? []).map((p: any) => p.workMode))
  )
);
  // We may not have content yet on the first render
  const careers = content?.careers;

  const rawPositions = careers?.positions ?? [];

  const positions: CareerPosition[] = rawPositions.map((p: any, index) => {
    const slug = (p.title || "role")
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/(^-|-$)/g, "");

    return {
      // id: existing or generated
      id: p.id ?? `role-${index}-${slug}`,

      // base fields
      title: p.title,
      summary: p.summary,
      tags: p.tags ?? [],

      // metadata – pass through if present, fall back to safe defaults
      team: p.team ?? "General",
      location: p.location ?? "Remote (US)",
      workMode: p.workMode ?? "remote",

      level: p.level,
      tagline: p.tagline,
      salaryRange: p.salaryRange,
    };
  });

  const form = useCareersForm(positions);

  if (loading && !content) {
    return (
      <p className="text-center text-slate-500 dark:text-slate-400">
        Loading careers…
      </p>
    );
  }

  if (error && !content) {
    return (
      <p className="text-center text-red-600">
        Failed to load careers content.
      </p>
    );
  }

  if (!content || !careers) return null;

  return (
    <div className="w-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <HeaderSection intro={careers.intro} />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 space-y-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr),minmax(0,0.9fr)]">
          <section className="space-y-6">
            <RolesSection positions={positions} form={form} />
            <ProcessCard />
          </section>

          <ApplicationForm form={form} />
        </div>
      </section>
    </div>
  );
}