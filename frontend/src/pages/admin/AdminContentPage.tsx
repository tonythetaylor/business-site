// src/pages/admin/AdminContentPage.tsx

import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "../../contexts/ContentContext";
import { updateContent } from "../../api/content";
import type {
  SiteContent,
  ServiceItem,
  CareerPosition,
  CareersIntro,
} from "../../api/content";

const ADMIN_STORAGE_KEY = "adminApiKey";

export default function AdminContentPage() {
  const { content, loading, error, reload } = useContent();
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  // Guard: require API key
  useEffect(() => {
    const key = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!key) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Initialize draft from content
  useEffect(() => {
    if (content && !draft) {
      setDraft(structuredClone(content));
    }
  }, [content, draft]);

  const handleHeroChange = (
    field: keyof SiteContent["hero"],
    value: string
  ) => {
    if (!draft) return;
    setDraft({
      ...draft,
      hero: {
        ...draft.hero,
        [field]: value,
      },
    });
  };

  const handleAboutChange = (bodyText: string) => {
    if (!draft) return;
    setDraft({
      ...draft,
      about: {
        ...draft.about,
        body: bodyText
          .split("\n")
          .map((p) => p.trim())
          .filter(Boolean),
      },
    });
  };

  const handleServiceChange = (
    index: number,
    field: keyof ServiceItem,
    value: string
  ) => {
    if (!draft) return;
    const services = draft.services.slice();
    services[index] = { ...services[index], [field]: value };
    setDraft({ ...draft, services });
  };

  const addService = () => {
    if (!draft) return;
    setDraft({
      ...draft,
      services: [
        ...draft.services,
        { title: "New Service", description: "Service description..." },
      ],
    });
  };

  const removeService = (index: number) => {
    if (!draft) return;
    const services = draft.services.slice();
    services.splice(index, 1);
    setDraft({ ...draft, services });
  };

  // Careers intro
  const handleCareersIntroChange = (intro: CareersIntro) => {
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            careers: {
              ...prev.careers,
              intro,
            },
          }
        : prev
    );
  };

  // Careers positions
  const handleCareerPositionChange = (
    index: number,
    field: keyof CareerPosition,
    value: string
  ) => {
    if (!draft) return;
    const positions = draft.careers.positions.slice();
    const position = { ...positions[index] };

    if (field === "tags") {
      // value is a comma-separated string -> convert to string[]
      position.tags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    } else {
      // title or summary
      (position as any)[field] = value;
    }

    positions[index] = position;

    setDraft({
      ...draft,
      careers: {
        ...draft.careers,
        positions,
      },
    });
  };

  const addCareerPosition = () => {
    if (!draft) return;
    const newPosition: CareerPosition = {
      id: `new-${Date.now()}`,
      title: "New Position",
      summary: "Short description of the role.",
      tags: [],
      team: "General",
      location: "Remote (US)",
      workMode: "remote",
      // level / tagline / salaryRange optional
    };
    setDraft({
      ...draft,
      careers: {
        ...draft.careers,
        positions: [...draft.careers.positions, newPosition],
      },
    });
  };

  const removeCareerPosition = (index: number) => {
    if (!draft) return;
    const positions = draft.careers.positions.slice();
    positions.splice(index, 1);
    setDraft({
      ...draft,
      careers: {
        ...draft.careers,
        positions,
      },
    });
  };

  const handleContactChange = (
    field: keyof SiteContent["contact"],
    value: string
  ) => {
    if (!draft) return;
    setDraft({
      ...draft,
      contact: {
        ...draft.contact,
        [field]: value,
      },
    });
  };

  const handleResetDraft = () => {
    if (content) {
      setDraft(structuredClone(content));
      setStatus("Reset changes to last saved content.");
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!draft) return;

    const apiKey = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!apiKey) {
      setStatus("Missing admin API key. Please log in again.");
      navigate("/admin/login");
      return;
    }

    try {
      setSaving(true);
      setStatus(null);
      await updateContent(draft, apiKey);
      setStatus("Content saved successfully.");
      reload();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to save content.";
      setStatus(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading && !draft) {
    return (
      <p className="text-center text-slate-500 dark:text-slate-400">
        Loading content…
      </p>
    );
  }

  if (error && !draft) {
    return (
      <p className="text-center text-red-600 dark:text-red-400">
        Failed to load site content: {error}
      </p>
    );
  }

  if (!draft) {
    return (
      <p className="text-center text-slate-500 dark:text-slate-400">
        No content available to edit.
      </p>
    );
  }

  const aboutBodyText = draft.about.body.join("\n");

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
      {/* Left: editor form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Admin – Content</h1>
          <div className="flex gap-2 text-xs">
            <button
              type="button"
              onClick={handleResetDraft}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-indigo-600 px-4 py-1.5 font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>

        {status && (
          <p
            className={`text-sm ${
              status.toLowerCase().includes("save") ||
              status.toLowerCase().includes("reset")
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-slate-700 dark:text-slate-200"
            }`}
          >
            {status}
          </p>
        )}

        {/* Hero */}
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Hero
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Headline
              </label>
              <input
                type="text"
                value={draft.hero.headline}
                onChange={(e) => handleHeroChange("headline", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Subheadline
              </label>
              <textarea
                rows={2}
                value={draft.hero.subheadline}
                onChange={(e) =>
                  handleHeroChange("subheadline", e.target.value)
                }
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
              />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  value={draft.hero.primaryCtaLabel}
                  onChange={(e) =>
                    handleHeroChange("primaryCtaLabel", e.target.value)
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Primary CTA Link
                </label>
                <input
                  type="text"
                  value={draft.hero.primaryCtaHref}
                  onChange={(e) =>
                    handleHeroChange("primaryCtaHref", e.target.value)
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            About
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Title
              </label>
              <input
                type="text"
                value={draft.about.title}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    about: { ...draft.about, title: e.target.value },
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Body (each line becomes a paragraph)
              </label>
              <textarea
                rows={4}
                value={aboutBodyText}
                onChange={(e) => handleAboutChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
              />
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Services
            </h2>
            <button
              type="button"
              onClick={addService}
              className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              + Add service
            </button>
          </div>
          <div className="space-y-3">
            {draft.services.map((service, index) => (
              <div
                key={index}
                className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/70"
              >
                <div className="flex items-start justify-between gap-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Title
                  </label>
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="text-[0.7rem] text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) =>
                    handleServiceChange(index, "title", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                />
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={service.description}
                  onChange={(e) =>
                    handleServiceChange(index, "description", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Careers */}
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Careers
            </h2>
            <button
              type="button"
              onClick={addCareerPosition}
              className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              + Add position
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Intro
              </label>
              <textarea
                rows={3}
                value={draft.careers.intro?.headline ?? ""}
                onChange={(e) =>
                  handleCareersIntroChange({
                    ...draft.careers.intro,
                    headline: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
              />
            </div>

            {draft.careers.positions.map((position, index) => {
              const tagsText = position.tags.join(", ");
              return (
                <div
                  key={index}
                  className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <div className="flex items-start justify-between gap-2">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                      Position title
                    </label>
                    <button
                      type="button"
                      onClick={() => removeCareerPosition(index)}
                      className="text-[0.7rem] text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    value={position.title}
                    onChange={(e) =>
                      handleCareerPositionChange(index, "title", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                  />

                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Summary
                  </label>
                  <textarea
                    rows={2}
                    value={position.summary}
                    onChange={(e) =>
                      handleCareerPositionChange(
                        index,
                        "summary",
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                  />

                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsText}
                    onChange={(e) =>
                      handleCareerPositionChange(index, "tags", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                    placeholder="e.g. remote, contract, part-time"
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact */}
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Contact
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Intro
              </label>
              <textarea
                rows={2}
                value={draft.contact.intro}
                onChange={(e) => handleContactChange("intro", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                type="email"
                value={draft.contact.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Phone
              </label>
              <input
                type="text"
                value={draft.contact.phone}
                onChange={(e) => handleContactChange("phone", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Address
              </label>
              <textarea
                rows={2}
                value={draft.contact.address}
                onChange={(e) => handleContactChange("address", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
              />
            </div>
          </div>
        </section>
      </form>

      {/* Right: live preview */}
      <aside className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Live Preview
        </h2>

        {/* Hero preview */}
        <section className="space-y-3 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Hero
          </p>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {draft.hero.headline}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {draft.hero.subheadline}
          </p>
          <button className="mt-3 inline-flex items-center rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm dark:bg-indigo-500">
            {draft.hero.primaryCtaLabel}
          </button>
        </section>

        {/* Services preview */}
        <section className="space-y-3 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Services
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {draft.services.slice(0, 4).map((service, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
              >
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-50">
                  {service.title}
                </p>
                <p className="mt-1 line-clamp-3 text-[0.7rem] text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact preview */}
        <section className="space-y-2 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Contact
          </p>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            {draft.contact.intro}
          </p>
          <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
            <p>
              <span className="font-medium">Email:</span> {draft.contact.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {draft.contact.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {draft.contact.address}
            </p>
          </div>
        </section>
      </aside>
    </div>
  );
}
