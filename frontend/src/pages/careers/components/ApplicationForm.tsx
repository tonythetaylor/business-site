// src/pages/careers/components/ApplicationForm.tsx
import type { FC } from "react";
import type { CareersFormState } from "../useCareersForm";

type ApplicationFormProps = {
  form: CareersFormState;
};

const ApplicationForm: FC<ApplicationFormProps> = ({ form }) => {
  const {
    selectedRoles,
    clearSelection,
    sidebarOpen,
    setSidebarOpen,

    fullName,
    email,
    link,
    note,
    setFullName,
    setEmail,
    setLink,
    setNote,
    setResumeFile,

    submitting,
    submitError,
    submitSuccess,
    handleSubmit,
  } = form;

  return (
    <aside className="lg:sticky lg:top-24">
      {/* mobile toggle */}
      <div className="mb-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-[0.75rem] text-slate-700 hover:border-sky-500 hover:text-sky-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-300"
        >
          {sidebarOpen ? "Hide" : "Show"} selected roles
        </button>
        {selectedRoles.length > 0 && (
          <span>{selectedRoles.length} selected</span>
        )}
      </div>

      {sidebarOpen && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/85">
          {/* Selected roles pills */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-[0.8rem] font-semibold text-slate-900 dark:text-slate-50">
                Selected roles
              </h3>
              <p className="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
                Apply once and we will consider you across these roles.
              </p>
            </div>
            {selectedRoles.length > 0 && (
              <button
                type="button"
                onClick={clearSelection}
                className="text-[0.7rem] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {selectedRoles.length === 0 ? (
              <span className="rounded-full border border-dashed border-slate-300 px-3 py-1 text-[0.7rem] text-slate-500 dark:border-slate-700 dark:text-slate-500">
                No roles selected yet.
              </span>
            ) : (
              selectedRoles.map((role) => (
                <span
                  key={role.id}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[0.7rem] text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                >
                  <span className="truncate max-w-40">{role.title}</span>
                </span>
              ))
            )}
          </div>

          {/* Main apply-once form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
              We only need enough signal to start a conversation: your resume,
              contact info, and a short note. Demographic questions (veteran
              status, race, disability, etc.) only appear later if you are
              selected for an interview, and they are always optional.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[0.7rem] font-medium text-slate-700 dark:text-slate-300">
                  Full name
                </label>
                <input
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[0.75rem] text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-[0.7rem] font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <input
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[0.75rem] text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-[0.7rem] font-medium text-slate-700 dark:text-slate-300">
                  Resume / CV
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    setResumeFile(e.target.files?.[0] ?? null)
                  }
                  className="w-full cursor-pointer rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 text-[0.7rem] text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-sky-600 file:px-2.5 file:py-1 file:text-[0.7rem] file:font-medium file:text-slate-950 hover:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-[0.7rem] font-medium text-slate-700 dark:text-slate-300">
                  Relevant link (GitHub, portfolio, LinkedIn)
                </label>
                <input
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[0.75rem] text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                  placeholder="https://"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[0.7rem] font-medium text-slate-700 dark:text-slate-300">
                Brief note about why these roles and why now
              </label>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[0.75rem] text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                placeholder="Keep it short and real – we read every one."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            {submitError && (
              <p className="text-[0.7rem] text-red-500 dark:text-red-400">
                {submitError}
              </p>
            )}
            {submitSuccess && (
              <p className="text-[0.7rem] text-emerald-600 dark:text-emerald-400">
                Application submitted. We will follow up if there is a strong
                match.
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || selectedRoles.length === 0}
              className="inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-[0.78rem] font-semibold text-slate-50 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-sky-500 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
            >
              {submitting ? "Submitting…" : "Submit application"}
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};

export default ApplicationForm;