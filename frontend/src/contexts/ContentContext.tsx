// src/contexts/ContentContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { fetchContent, type SiteContent, type CareerPosition } from "../api/content";

export interface ContentContextValue {
  content: SiteContent | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export const ContentContext = createContext<ContentContextValue | undefined>(
  undefined
);

// Fallback content that satisfies the strict SiteContent type
const FALLBACK_POSITIONS: CareerPosition[] = [
  {
    id: "fallback-software-engineer",
    title: "Software Engineer",
    summary:
      "Build modern cloud-native applications using Python, React, and DevSecOps best practices.",
    tags: ["Cloud", "DevSecOps", "Backend", "Full-Stack"],
    team: "Engineering",
    location: "Remote (US)",
    workMode: "remote",
    level: "Mid–Senior",
    tagline: "Modern full-stack delivery",
    salaryRange: "$120k–$150k USD",
  },
  {
    id: "fallback-general-application",
    title: "General Application",
    summary:
      "If your skillset doesn’t fit a listed role, submit a general application.",
    tags: ["General"],
    team: "General",
    location: "Remote (US)",
    workMode: "remote",
    level: "All levels",
    tagline: "Tell us how you fit",
    salaryRange: undefined,
  },
];

const FALLBACK_CONTENT: SiteContent = {
  hero: {
    headline: "Helping clients build modern solutions.",
    subheadline:
      "We help organizations move from fragile, legacy systems to secure, zero-trust architectures.",
    primaryCtaLabel: "Get in touch",
    primaryCtaHref: "/contact",
    layoutVariant: "classic",
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
    intro: {
      headline:
        "We hire smart, self-directed people who thrive in modern cloud, security, and consulting environments.",
      subheadline: undefined,
    },
    positions: FALLBACK_POSITIONS,
  },
  contact: {
    intro: "Have questions or want to discuss a project? Send us a message.",
    email: "info@example.com",
    phone: "+1 (555) 555-5555",
    address: "123 Business Street, City, State",
  },
};

// Normalize anything the backend sends into a full SiteContent object
function normalizeContent(raw: any): SiteContent {
  const src = raw ?? {};
  const rawHero = src.hero ?? {};
  const rawCareers = src.careers ?? {};

  // Handle intro being either a string (old) or an object (new)
  let careersIntro = FALLBACK_CONTENT.careers.intro;
  if (typeof rawCareers.intro === "string") {
    careersIntro = {
      headline: rawCareers.intro,
      subheadline: undefined,
    };
  } else if (rawCareers.intro && typeof rawCareers.intro === "object") {
    careersIntro = {
      headline:
        rawCareers.intro.headline ??
        FALLBACK_CONTENT.careers.intro.headline,
      subheadline:
        rawCareers.intro.subheadline ??
        FALLBACK_CONTENT.careers.intro.subheadline,
    };
  }

  const normalizedPositions: CareerPosition[] = Array.isArray(
    rawCareers.positions
  )
    ? rawCareers.positions.map((p: any, index: number): CareerPosition => {
        const title = p.title ?? "Untitled role";

        // generate an id if missing
        const id =
          p.id ||
          `role-${index}-${String(title)
            .toLowerCase()
            .replace(/[^a-z0-9]+/gi, "-")}`;

        return {
          id,
          title,
          summary: p.summary ?? "",
          tags: Array.isArray(p.tags) ? p.tags : [],
          team: p.team ?? "General",
          location: p.location ?? "Remote (US)",
          workMode: p.workMode ?? "remote",
          level: p.level,
          tagline: p.tagline,
          salaryRange: p.salaryRange,
        };
      })
    : FALLBACK_CONTENT.careers.positions;

  return {
    hero: {
      ...rawHero,
      headline: rawHero.headline ?? FALLBACK_CONTENT.hero.headline,
      subheadline: rawHero.subheadline ?? FALLBACK_CONTENT.hero.subheadline,
      primaryCtaLabel:
        rawHero.primaryCtaLabel ?? FALLBACK_CONTENT.hero.primaryCtaLabel,
      primaryCtaHref:
        rawHero.primaryCtaHref ?? FALLBACK_CONTENT.hero.primaryCtaHref,
      layoutVariant:
        rawHero.layoutVariant ?? FALLBACK_CONTENT.hero.layoutVariant,
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
      intro: careersIntro,
      positions: normalizedPositions,
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
        setError(err?.message || "Failed to load content");
        setContent(FALLBACK_CONTENT);
      })
      .finally(() => {
        setLoading(false);
      });
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