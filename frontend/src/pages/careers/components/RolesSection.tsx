import type { FC } from "react";
import type { CareerPosition } from "../../../api/content";

interface RolesSectionProps {
  positions: CareerPosition[];
  selectedRoles: string[];
  toggleRole: (roleTitle: string) => void;
}

const RolesSection: FC<RolesSectionProps> = ({
  positions,
  selectedRoles,
  toggleRole,
}) => {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Current opportunities
      </h2>

      {positions.length === 0 ? (
        <p className="text-sm text-slate-700 dark:text-slate-300">
          We’re not listing specific roles at this time, but we&apos;re
          always open to connecting with experienced professionals. Use
          the form to tell us where you’d add the most value.
        </p>
      ) : (
        <>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select one or more roles you&apos;d like to be considered for.
          </p>
          <div className="space-y-3">
            {positions.map((role, idx) => {
              const selected = selectedRoles.includes(role.title);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleRole(role.title)}
                  className={`flex w-full flex-col items-start rounded-xl border px-3 py-3 text-left text-sm transition ${
                    selected
                      ? "border-indigo-500 bg-indigo-50 text-indigo-800 dark:border-indigo-400 dark:bg-indigo-500/10 dark:text-indigo-100"
                      : "border-slate-200 bg-slate-50 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/70 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-500/10"
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="font-semibold">{role.title}</span>
                    {selected && (
                      <span className="rounded-full bg-indigo-600/90 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-white dark:bg-indigo-400">
                        Selected
                      </span>
                    )}
                  </div>
                  {role.summary && (
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                      {role.summary}
                    </p>
                  )}
                  {role.tags?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.65rem] text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {selectedRoles.length > 0 && (
            <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
              Selected: {selectedRoles.join(", ")}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default RolesSection;