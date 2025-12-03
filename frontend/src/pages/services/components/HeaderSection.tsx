import type { FC } from "react";

interface HeaderSectionProps {
  introOverride?: string;
}

const HeaderSection: FC<HeaderSectionProps> = ({ introOverride }) => {
  return (
    <header className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
        Services
      </p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        How we support your mission
      </h1>
      <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
        {introOverride ??
          "From secure architecture and cloud migrations to advisory and assessments, our services are designed to reduce risk, increase clarity, and keep teams focused on the work that matters."}
      </p>
    </header>
  );
};

export default HeaderSection;