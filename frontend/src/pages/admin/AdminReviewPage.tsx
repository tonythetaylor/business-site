// src/pages/admin/AdminReviewPage.tsx
import { useState } from "react";
import Layout from "../../components/Layout";

import HomePage from "../HomePage";
import AboutPage from "../AboutPage";
import ServicesPage from "../services/ServicesPage";
import CareersPage from "../careers/CareersPage";
import ContactPage from "../ContactPage";

import { useAdminDraft } from "../../contexts/AdminDraftContext";
import {
  ContentContext,
  type ContentContextValue,
} from "../../contexts/ContentContext";
import { updateContent, type HomeLayoutVariant } from "../../api/content";
import HomeLayoutSelector from "./components/HomeLayoutSelector";

type PreviewTab = "home" | "about" | "services" | "careers" | "contact";

const TABS: { id: PreviewTab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact" },
];

const DEFAULT_LAYOUT: HomeLayoutVariant = "classic";

export default function AdminReviewPage() {
  const { draft, loading, error, updateDraftField } = useAdminDraft();
  const [activeTab, setActiveTab] = useState<PreviewTab>("home");

  const [publishing, setPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);

  if (loading && !draft) {
    return (
      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        Loading draft for preview…
      </p>
    );
  }

  if (error && !draft) {
    return (
      <p className="text-center text-sm text-red-600 dark:text-red-400">
        Failed to load draft for preview: {error}
      </p>
    );
  }

  if (!draft) {
    return (
      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        No draft available. Try refreshing or reloading content.
      </p>
    );
  }

  const previewContextValue: ContentContextValue = {
    content: draft,
    loading: false,
    error: null,
    reload: () => {
      /* no-op in preview */
    },
  };

  const renderCurrentPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "about":
        return <AboutPage />;
      case "services":
        return <ServicesPage />;
      case "careers":
        return <CareersPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  const handlePublish = async () => {
    if (!draft) return;

    const confirmed = window.confirm(
      "Are you sure you want to publish these changes to the live site?"
    );
    if (!confirmed) return;

    const apiKey = localStorage.getItem("adminApiKey");
    if (!apiKey) {
      setPublishError("Missing admin API key. Please log in again.");
      setPublishStatus(null);
      return;
    }

    try {
      setPublishing(true);
      setPublishError(null);
      setPublishStatus(null);

      await updateContent(draft, apiKey);

      setPublishStatus("Changes published successfully.");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to publish changes.";
      setPublishError(msg);
      setPublishStatus(null);
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Review & preview
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            This is how the public site will look once you publish the current
            draft.
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          <p className="text-[0.7rem] text-slate-600 dark:text-slate-400">
            Tip: click through each tab to verify copy, layout, and links before
            publishing.
          </p>
          <button
            type="button"
            onClick={handlePublish}
            disabled={publishing}
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            {publishing ? "Publishing…" : "Publish changes"}
          </button>
        </div>
      </header>

      {publishStatus && (
        <p className="text-xs text-emerald-600 dark:text-emerald-400">
          {publishStatus}
        </p>
      )}
      {publishError && (
        <p className="text-xs text-red-600 dark:text-red-400">{publishError}</p>
      )}

      <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1 text-xs dark:border-slate-700 dark:bg-slate-900/70">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={[
              "rounded-full px-3 py-1.5 transition",
              activeTab === tab.id
                ? "bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900"
                : "text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-[0.7rem] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Previewing:{" "}
          <span className="font-semibold capitalize">{activeTab}</span> page
        </div>

        <ContentContext.Provider value={previewContextValue}>
          <div className="min-h-[400px]">
            <Layout>{renderCurrentPage()}</Layout>
          </div>
        </ContentContext.Provider>
      </div>

      {/* Home layout selector wired to draft.hero via updateDraftField */}
      <HomeLayoutSelector
        value={draft.hero.layoutVariant ?? DEFAULT_LAYOUT}
        onChange={(next: string) =>
          updateDraftField("hero", {
            ...draft.hero,
            layoutVariant: next as HomeLayoutVariant,
          })
        }
      />
    </div>
  );
}