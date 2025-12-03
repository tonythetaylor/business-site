// src/contexts/AdminDraftContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useContent } from "./ContentContext";
import type { SiteContent } from "../api/content";

interface AdminDraftContextValue {
  original: SiteContent | null;
  draft: SiteContent | null;
  loading: boolean;
  error: string | null;
  /**
   * Update a top-level section of the draft, e.g. "hero", "about", "services".
   */
  updateDraftField: <K extends keyof SiteContent>(
    section: K,
    value: SiteContent[K]
  ) => void;
  /**
   * Replace the entire draft (rarely needed, but handy for advanced flows).
   */
  setDraft: (draft: SiteContent) => void;
  /**
   * Reset draft back to the current live content.
   */
  resetDraft: () => void;
  /**
   * Reload live content from the backend (and let ContentContext handle it).
   */
  reloadContent: () => void;
}

const AdminDraftContext = createContext<AdminDraftContextValue | undefined>(
  undefined
);

// Simple deep clone that is safe for our SiteContent shape
function cloneContent(content: SiteContent): SiteContent {
  return JSON.parse(JSON.stringify(content));
}

export function AdminDraftProvider({ children }: { children: ReactNode }) {
  const { content, loading, error, reload } = useContent();
  const [original, setOriginal] = useState<SiteContent | null>(null);
  const [draft, setDraftState] = useState<SiteContent | null>(null);

  // Whenever live content changes (on first load or reload), seed original/draft.
  useEffect(() => {
    if (content) {
      setOriginal(content);
      setDraftState(prev => (prev ? prev : cloneContent(content)));
    }
  }, [content]);

  const updateDraftField = <K extends keyof SiteContent>(
    section: K,
    value: SiteContent[K]
  ) => {
    setDraftState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: value,
      };
    });
  };

  const resetDraft = () => {
    if (original) {
      setDraftState(cloneContent(original));
    }
  };

  const reloadContent = () => {
    // Triggers ContentContext to refetch from backend.
    // When new content arrives, the effect above will update original/draft.
    reload();
  };

  const value: AdminDraftContextValue = {
    original,
    draft,
    loading,
    error,
    updateDraftField,
    setDraft: (d: SiteContent) => setDraftState(cloneContent(d)),
    resetDraft,
    reloadContent,
  };

  return (
    <AdminDraftContext.Provider value={value}>
      {children}
    </AdminDraftContext.Provider>
  );
}

export function useAdminDraft(): AdminDraftContextValue {
  const ctx = useContext(AdminDraftContext);
  if (!ctx) {
    throw new Error("useAdminDraft must be used within an AdminDraftProvider");
  }
  return ctx;
}