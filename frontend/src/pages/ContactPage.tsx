import { useState } from "react";
import type { FormEvent } from "react";
import { useContent } from "../contexts/ContentContext";
import { submitContactForm } from "../api/contact";

export default function ContactPage() {
  const { content, loading, error } = useContent();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);

  // Honeypot anti-bot field
  const [websiteField, setWebsiteField] = useState("");

  if (loading && !content) {
    return (
      <p className="text-center text-slate-500 dark:text-slate-400">
        Loading contact page…
      </p>
    );
  }

  if (error && !content) {
    return (
      <p className="text-center text-red-600 dark:text-red-400">
        Failed to load contact content.
      </p>
    );
  }

  if (!content) return null;

  const contact = content.contact;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot – if this is filled, treat as "success" but ignore
    if (websiteField.trim().length > 0) {
      setStatusType("success");
      setStatus("Message sent. We will be in touch soon.");
      return;
    }

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatusType("error");
      setStatus("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      setStatus(null);
      setStatusType(null);

      await submitContactForm({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

      setStatusType("success");
      setStatus("Message sent. We will be in touch soon.");

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setWebsiteField("");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to send message.";
      setStatusType("error");
      setStatus(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          Contact
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Get in touch securely
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          {contact.intro ||
            "Use this form to reach our team. We intentionally keep direct email and phone details off the public site to reduce spam and security risk. Every message is reviewed by a human."}
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr),minmax(0,1.6fr)]">
        {/* Left: expectations / security note */}
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            How we handle inquiries
          </h2>
          <ul className="space-y-2 text-xs">
            <li>
              <span className="font-semibold">Reviewed, not ignored.</span> Your
              message is routed to a monitored inbox, not a catch-all alias.
            </li>
            <li>
              <span className="font-semibold">No public emails.</span> We don’t
              list direct email, phone, or address details here to limit
              harvesting, spoofing, and automated attacks.
            </li>
            <li>
              <span className="font-semibold">Security-minded by default.</span>{" "}
              Please avoid sharing sensitive identifiers (SSNs, government ID
              numbers, passwords, etc.) in this form.
            </li>
          </ul>
          <p className="pt-1 text-[0.7rem] text-slate-500 dark:text-slate-400">
            If we need additional information or a live conversation, we’ll
            reply from an official channel after reviewing your message.
          </p>
        </section>

        {/* Right: contact form */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Send a message
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Share a brief overview of your question, project, or concern, and
            we&apos;ll follow up with next steps.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Honeypot field – hidden from real users */}
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
              {submitting ? "Sending…" : "Send message"}
            </button>
          </form>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-[0.7rem] text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              What you can expect
            </p>
            <p className="mt-1">
              We aim to respond to legitimate inquiries within a reasonable
              timeframe. If your request is time-sensitive, please note that in
              the subject line so we can triage appropriately.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}