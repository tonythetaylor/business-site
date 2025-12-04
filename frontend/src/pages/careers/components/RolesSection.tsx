// src/pages/careers/components/RolesSection.tsx
import { useState, type FC } from "react";
import type { CareerPosition } from "../../../api/content";
import type { CareersFormState, WorkMode } from "../useCareersForm";

type RolesSectionProps = {
  positions: CareerPosition[];
  form: CareersFormState;
};

const WORK_MODES: { label: string; value: WorkMode | "all" }[] = [
  { label: "Any mode", value: "all" },
  { label: "Remote", value: "remote" },
  { label: "Hybrid", value: "hybrid" },
  { label: "On-site", value: "onsite" },
  { label: "Other", value: "other" },
];

const RolesSection: FC<RolesSectionProps> = ({ positions, form }) => {
  console.log(positions)
  const {
    search,
    teamFilter,
    workModeFilter,
    setSearch,
    setTeamFilter,
    setWorkModeFilter,
    currentPage,
    totalPages,
    setCurrentPage,

    paginatedPositions,
    selectedRoleIds,
    activeApplyRoleId,
    toggleRole,
    openQuickApply,
    closeQuickApply,
  } = form;

  const [detailsRole, setDetailsRole] = useState<CareerPosition | null>(null);

  // Derive teams from positions so admin can change them over time
  const allTeams = Array.from(new Set(positions.map((p) => p.team))).sort(
    (a, b) => a.localeCompare(b)
  );
  const TEAMS: string[] = ["All teams", ...allTeams];

  return (
    <section className="space-y-6">
      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Open roles
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Filter by team, location, and way of working. Select one or more
              roles and apply in a single step.
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {/* Search */}
          <div className="md:col-span-1">
            <label className="mb-1 block text-[0.75rem] font-medium text-slate-700 dark:text-slate-300">
              Search roles
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, team, or location"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500"
            />
          </div>

          {/* Team */}
          <div>
            <label className="mb-1 block text-[0.75rem] font-medium text-slate-700 dark:text-slate-300">
              Team
            </label>
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
            >
              {TEAMS.map((team, index) => (
                <option key={`${team || "team"}-${index}`} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          {/* Work mode */}
          <div>
            <label className="mb-1 block text-[0.75rem] font-medium text-slate-700 dark:text-slate-300">
              Work mode
            </label>
            <select
              value={workModeFilter}
              onChange={(e) =>
                setWorkModeFilter(e.target.value as WorkMode | "all")
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
            >
              {WORK_MODES.map((mode) => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Roles list */}
      <div className="space-y-4">
        {paginatedPositions.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
            No roles match those filters yet. Try adjusting the search or team.
          </div>
        ) : (
          paginatedPositions.map((role) => {
            const isSelected = selectedRoleIds.includes(role.id);
            const isQuickApplyOpen = activeApplyRoleId === role.id;

            return (
              <article
                key={role.id}
                className={[
                  "rounded-2xl border p-5 text-sm shadow-sm transition",
                  "bg-white/95 text-slate-900 hover:border-slate-300",
                  "dark:bg-slate-900/85 dark:text-slate-50 dark:hover:border-slate-600",
                  isSelected
                    ? "border-sky-500 shadow-sky-500/15"
                    : "border-slate-200 dark:border-slate-800",
                ].join(" ")}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                        {role.title}
                      </h3>
                      {role.tagline && (
                        <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[0.7rem] font-medium text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
                          {role.tagline}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {role.team}{" "}
                      {role.level ? (
                        <>
                          · <span>{role.level}</span>
                        </>
                      ) : null}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {role.location} ·{" "}
                      {role.workMode === "remote"
                        ? "Remote"
                        : role.workMode === "hybrid"
                        ? "Hybrid"
                        : role.workMode === "onsite"
                        ? "On-site"
                        : "Flexible"}
                    </p>
                    {role.salaryRange && (
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {role.salaryRange}
                      </p>
                    )}
                    {role.summary && (
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                        {role.summary}
                      </p>
                    )}
                    {role.tags?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {role.tags.map((tag) => (
                          <span
                            key={`${role.id}-${tag}`}
                            className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.65rem] text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleRole(role.id)}
                      className={[
                        "inline-flex items-center rounded-full px-3 py-1 text-[0.75rem] font-medium transition",
                        isSelected
                          ? "bg-sky-600 text-slate-50 hover:bg-sky-500"
                          : "border border-slate-300 bg-white text-slate-900 hover:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50",
                      ].join(" ")}
                    >
                      {isSelected ? "Selected" : "Select"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        isQuickApplyOpen
                          ? closeQuickApply()
                          : openQuickApply(role.id)
                      }
                      className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-[0.75rem] font-medium text-slate-700 hover:border-sky-500 hover:text-sky-700 dark:border-slate-700 dark:text-slate-100 dark:hover:border-sky-500 dark:hover:text-sky-300"
                    >
                      {isQuickApplyOpen ? "Hide quick apply" : "Quick apply"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setDetailsRole(role)}
                      className="text-[0.75rem] text-slate-500 hover:text-sky-700 dark:text-slate-400 dark:hover:text-sky-300"
                    >
                      View details →
                    </button>
                  </div>
                </div>

                {/* Inline quick-apply ONLY for this role */}
                {isQuickApplyOpen && (
                  <div className="mt-4 border-t border-slate-200 pt-4 text-xs text-slate-700 dark:border-slate-800 dark:text-slate-200">
                    <p className="mb-2 text-[0.75rem] font-semibold text-slate-900 dark:text-slate-50">
                      Quick apply for {role.title}
                    </p>
                    <p className="mb-3 text-[0.7rem] text-slate-600 dark:text-slate-400">
                      This highlights the role in your selection list. Finish
                      your application in the panel on the right – one form
                      covers all selected roles. No demographic, vet status, or
                      disability questions at this stage.
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleRole(role.id)}
                      className="text-[0.75rem] font-medium text-sky-700 hover:text-sky-600 dark:text-sky-300 dark:hover:text-sky-200"
                    >
                      {isSelected
                        ? "Remove this role from your selection"
                        : "Add this role to your selection"}
                    </button>
                  </div>
                )}
              </article>
            );
          })
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="rounded-full border border-slate-300 px-3 py-1 text-[0.75rem] disabled:cursor-not-allowed disabled:opacity-40 hover:border-sky-500 hover:text-sky-700 dark:border-slate-700 dark:hover:border-sky-500 dark:hover:text-sky-300"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className="rounded-full border border-slate-300 px-3 py-1 text-[0.75rem] disabled:cursor-not-allowed disabled:opacity-40 hover:border-sky-500 hover:text-sky-700 dark:border-slate-700 dark:hover:border-sky-500 dark:hover:text-sky-300"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details modal */}
      {detailsRole && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/70 px-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-700 bg-slate-950 p-5 text-sm shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-50">
                  {detailsRole.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  {detailsRole.team}
                  {detailsRole.level ? ` · ${detailsRole.level}` : ""}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {detailsRole.location} ·{" "}
                  {detailsRole.workMode === "remote"
                    ? "Remote"
                    : detailsRole.workMode === "hybrid"
                    ? "Hybrid"
                    : detailsRole.workMode === "onsite"
                    ? "On-site"
                    : "Flexible"}
                </p>
                {detailsRole.salaryRange && (
                  <p className="mt-1 text-xs text-slate-300">
                    {detailsRole.salaryRange}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setDetailsRole(null)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                Close
              </button>
            </div>

            {detailsRole.summary && (
              <p className="mt-4 text-xs leading-relaxed text-slate-200">
                {detailsRole.summary}
              </p>
            )}

            {detailsRole.tags?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {detailsRole.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-800 px-2 py-0.5 text-[0.65rem] text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  toggleRole(detailsRole.id);
                  setDetailsRole(null);
                }}
                className="inline-flex items-center rounded-full bg-sky-500 px-3 py-1 text-[0.75rem] font-medium text-slate-950 hover:bg-sky-400"
              >
                {selectedRoleIds.includes(detailsRole.id)
                  ? "Remove from selected"
                  : "Add to selected"}
              </button>
              <button
                type="button"
                onClick={() => setDetailsRole(null)}
                className="text-[0.75rem] text-slate-400 hover:text-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RolesSection;
