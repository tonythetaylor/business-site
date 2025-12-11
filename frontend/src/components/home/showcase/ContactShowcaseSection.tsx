// src/components/home/showcase/ContactShowcaseSection.tsx
import type { RefObject } from "react";
import type { SiteContent } from "../../../api/content";

type Props = {
  contact: SiteContent["contact"];
  sectionRef: RefObject<HTMLElement | null>;
  isActive: boolean;
  sectionBaseClasses: string;
};

export default function ContactShowcaseSection({
  contact,
  sectionRef,
  isActive,
  sectionBaseClasses,
}: Props) {
  return (
    <section
      ref={sectionRef}
      data-section-id="contact"
      id="contact"
      className={[
        sectionBaseClasses,
        "flex-col justify-center border-none",
        isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-3",
      ].join(" ")}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]">
        {/* LEFT: copy / trust */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
              Contact
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-slate-900 dark:text-slate-50">
              Bring us the hard problems.
            </h2>
            <p className="max-w-xl text-sm text-slate-600 dark:text-slate-300">
              {contact.intro ||
                "Tell us about your environment, constraints, and what you are trying to secure or ship. We respond with a concrete next step – not a generic sales script."}
            </p>
          </div>

          <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-200 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/80">
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Who this is for
              </p>
              <p className="mt-2">
                Engineering, security, and platform leaders who need senior
                help on cloud security, DevSecOps, reliability, or regulated
                workloads.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/80">
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                How we handle your data
              </p>
              <p className="mt-2">
                We treat inbound details as confidential, avoid sensitive
                production data in email, and can move to NDA + secure channels
                before deep dives.
              </p>
            </div>
          </div>

          <p className="max-w-md text-xs text-slate-500 dark:text-slate-400">
            Not sure how to describe the project yet? A paragraph on your stack,
            current risks, and what “good” would look like is more than enough
            to start.
          </p>
        </div>

        {/* RIGHT: cyber-grade contact form */}
        <form
          className="space-y-4 rounded-2xl border border-slate-200 bg-white/95 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">
                Name
              </label>
              <input
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">
                Work email
              </label>
              <input
                type="email"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">
                Organization
              </label>
              <input
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500"
                placeholder="Org name"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">
                Role
              </label>
              <input
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500"
                placeholder="e.g. Head of Platform, CISO"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">
                Primary focus
              </label>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose an area
                </option>
                <option>Cloud security / hardening</option>
                <option>DevSecOps & secure delivery</option>
                <option>Observability / SRE</option>
                <option>Compliance & audit readiness</option>
                <option>Incident response / recovery</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">
                Timeline
              </label>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                defaultValue=""
              >
                <option value="" disabled>
                  When do you need help?
                </option>
                <option>ASAP – active risk / incident</option>
                <option>0–3 months</option>
                <option>3–6 months</option>
                <option>Exploratory / scoping</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">
              Environment snapshot (optional)
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500"
              placeholder="e.g. AWS / Azure, Kubernetes, compliance frameworks in scope"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700 dark:text-slate-200">
              What should we know?
            </label>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500"
              placeholder="A brief on your stack, risks, and what success would look like."
            />
          </div>

          <div className="flex flex-col gap-2 text-xs text-slate-600 dark:text-slate-300">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-slate-300 text-sky-500 focus:ring-sky-500 dark:border-slate-600"
              />
              <span>Prefer to start under NDA and move to a secure channel.</span>
            </label>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-slate-50 hover:bg-sky-500 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
          >
            Submit secure inquiry
          </button>

          <p className="mt-1 flex items-center gap-2 text-[0.7rem] text-slate-500 dark:text-slate-400">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            We aim to respond within one business day. No mailing lists, no SDR
            spam – just a focused reply from a senior engineer.
          </p>
        </form>
      </div>
    </section>
  );
}