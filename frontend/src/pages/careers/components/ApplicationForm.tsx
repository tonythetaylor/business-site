import type { FC, ChangeEvent } from "react";
import type { CareersFormState } from "../useCareersForm";

interface ApplicationFormProps {
  form: CareersFormState;
}

const ApplicationForm: FC<ApplicationFormProps> = ({ form }) => {
  const {
    fullName,
    email,
    phone,
    positionOther,
    message,
    websiteField,
    status,
    statusType,
    submitting,
    MAX_FILE_SIZE_MB,
    setFullName,
    setEmail,
    setPhone,
    setPositionOther,
    setMessage,
    setWebsiteField,
    handleResumeChange,
    handleSubmit,
  } = form;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Submit your application
      </h2>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        One form, one resume, considered across multiple roles.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Phone (optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Other roles / areas of interest
            </label>
            <input
              type="text"
              value={positionOther}
              onChange={(e) => setPositionOther(e.target.value)}
              placeholder="e.g. Cloud, DevSecOps, SRE"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Short introduction (optional)
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share anything you want us to know that isn’t obvious from your resume."
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Resume (PDF, DOC, DOCX) <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleResumeChange(e)
            }
            className="mt-1 w-full text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-800 hover:file:bg-slate-200 dark:text-slate-300 dark:file:bg-slate-800 dark:file:text-slate-100 dark:hover:file:bg-slate-700"
          />
          <p className="mt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
            Max file size {MAX_FILE_SIZE_MB} MB. Please avoid including
            government ID numbers, SSNs, or other sensitive personal data.
          </p>
        </div>

        {/* Honeypot */}
        <div className="hidden">
          <label>
            Website (leave this field empty)
            <input
              type="text"
              value={websiteField}
              onChange={(e) => setWebsiteField(e.target.value)}
            />
          </label>
        </div>

        {status && (
          <p
            className={`text-xs ${
              statusType === "success"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {status}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          {submitting ? "Submitting…" : "Submit application"}
        </button>
      </form>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-[0.7rem] text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
        <p className="font-semibold text-slate-700 dark:text-slate-200">
          What happens after you submit
        </p>
        <p className="mt-1">
          Your application goes directly to our review team. We’ll consider
          you across the roles and areas you selected, and we’ll reach out
          if there’s a strong match with current or upcoming work.
        </p>
      </div>
    </section>
  );
};

export default ApplicationForm;