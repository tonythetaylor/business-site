// src/contexts/ContentContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { fetchContent, type SiteContent } from "../api/content";

export interface ContentContextValue {
  content: SiteContent | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

// ✅ Exported so AdminReviewPage (and others) can override it
export const ContentContext = createContext<ContentContextValue | undefined>(
  undefined
);

// ✅ Fallback content that satisfies the strict SiteContent type
const FALLBACK_CONTENT: SiteContent = {
  hero: {
    headline: "Helping clients build modern solutions.",
    subheadline:
      "We help organizations move from fragile, legacy systems to secure, zero-trust architectures.",
    primaryCtaLabel: "Get in touch",
    primaryCtaHref: "/contact",
  },
  about: {
    title: "About Us",
    body: [
      "Tell the story of the business, mission, vision, and what makes them different.",
      "Add timeline, credentials, certifications, or leadership bios here later.",
    ],
  },
  services: [
    {
      title: "Service One",
      description: "Short description of service one.",
    },
    {
      title: "Service Two",
      description: "Short description of service two.",
    },
    {
      title: "Service Three",
      description: "Short description of service three.",
    },
  ],
  careers: {
    intro:
      "We hire smart, self-directed people who thrive in modern cloud, security, and consulting environments.",
    positions: [
      {
        title: "Software Engineer",
        summary:
          "Build modern cloud-native applications using Python, React, and DevSecOps best practices.",
        tags: ["Cloud", "DevSecOps", "Backend", "Full-Stack"],
      },
      {
        title: "General Application",
        summary:
          "If your skillset doesn’t fit a listed role, submit a general application.",
        tags: ["General"],
      },
    ],
  },
  contact: {
    intro: "Have questions or want to discuss a project? Send us a message.",
    email: "info@example.com",
    phone: "+1 (555) 555-5555",
    address: "123 Business Street, City, State",
  },
};

// ✅ Normalize anything the backend sends into a full SiteContent object
function normalizeContent(raw: any): SiteContent {
  const src = raw ?? {};

  return {
    hero: {
      headline: src.hero?.headline ?? FALLBACK_CONTENT.hero.headline,
      subheadline: src.hero?.subheadline ?? FALLBACK_CONTENT.hero.subheadline,
      primaryCtaLabel:
        src.hero?.primaryCtaLabel ?? FALLBACK_CONTENT.hero.primaryCtaLabel,
      primaryCtaHref:
        src.hero?.primaryCtaHref ?? FALLBACK_CONTENT.hero.primaryCtaHref,
    },
    about: {
      title: src.about?.title ?? FALLBACK_CONTENT.about.title,
      body: Array.isArray(src.about?.body)
        ? src.about.body
        : FALLBACK_CONTENT.about.body,
    },
    services: Array.isArray(src.services)
      ? src.services
      : FALLBACK_CONTENT.services,
    careers: {
      intro: src.careers?.intro ?? FALLBACK_CONTENT.careers.intro,
      positions: Array.isArray(src.careers?.positions)
        ? src.careers.positions.map((p: any) => ({
            title: p.title ?? "Untitled role",
            summary: p.summary ?? "",
            tags: Array.isArray(p.tags) ? p.tags : [],
          }))
        : FALLBACK_CONTENT.careers.positions,
    },
    contact: {
      intro: src.contact?.intro ?? FALLBACK_CONTENT.contact.intro,
      email: src.contact?.email ?? FALLBACK_CONTENT.contact.email,
      phone: src.contact?.phone ?? FALLBACK_CONTENT.contact.phone,
      address: src.contact?.address ?? FALLBACK_CONTENT.contact.address,
    },
  };
}

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetchContent()
      .then((data) => {
        setContent(normalizeContent(data));
      })
      .catch((err: any) => {
        setError(err.message || "Failed to load content");
        // still give callers something to render
        setContent(FALLBACK_CONTENT);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ContentContext.Provider
      value={{ content, loading, error, reload: load }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return ctx;
};