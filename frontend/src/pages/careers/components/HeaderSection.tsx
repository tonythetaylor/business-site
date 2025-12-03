import type { FC } from "react";

interface HeaderSectionProps {
  intro?: string;
}

const HeaderSection: FC<HeaderSectionProps> = ({ intro }) => {
  return (
    <header className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
        Careers
      </p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        A focused careers experience, not a time sink
      </h1>
      <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
        {intro ||
          "Tell us where you do your best work and share your resume once. We’ll review you against multiple opportunities instead of asking you to reapply for each role."}
      </p>
    </header>
  );
};

export default HeaderSection;