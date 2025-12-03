import { useContent } from "../../contexts/ContentContext";
import type { CareerPosition } from "../../api/content";
import HeaderSection from "./components/HeaderSection";
import RolesSection from "./components/RolesSection";
import ProcessCard from "./components/ProcessCard";
import ApplicationForm from "./components/ApplicationForm";
import { useCareersForm } from "./useCareersForm";

export default function CareersPage() {
  const { content, loading, error } = useContent();
  const form = useCareersForm();

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

  if (!content) return null;

  const careers = content.careers;
  const positions: CareerPosition[] = careers.positions || [];

  return (
    <div className="space-y-8">
      <HeaderSection intro={careers.intro} />

      <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr),minmax(0,1.6fr)]">
        {/* Left: roles + process */}
        <section className="space-y-6">
          <RolesSection
            positions={positions}
            selectedRoles={form.selectedRoles}
            toggleRole={form.toggleRole}
          />
          <ProcessCard />
        </section>

        {/* Right: application form */}
        <ApplicationForm form={form} />
      </div>
    </div>
  );
}