import type { FC } from "react";

const ProcessCard: FC = () => {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        How we review your application
      </h2>
      <ol className="list-decimal space-y-2 pl-4">
        <li>
          <span className="font-medium">You choose your scope.</span> Pick
          one or more roles and describe your focus areas if you&apos;re
          multi-disciplinary.
        </li>
        <li>
          <span className="font-medium">We match, not you.</span> Our team
          reviews your resume across those roles instead of asking you to
          submit separate applications.
        </li>
        <li>
          <span className="font-medium">
            We follow up when there&apos;s a fit.
          </span>{" "}
          If your experience aligns with current or upcoming needs,
          we&apos;ll reach out to schedule a conversation.
        </li>
      </ol>
      <p className="pt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
        Please do <span className="font-semibold">not</span> include
        sensitive personal data (SSNs, government ID numbers, dates of
        birth, etc.) in your resume or attachments.
      </p>
    </div>
  );
};

export default ProcessCard;