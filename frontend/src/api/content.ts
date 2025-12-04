// frontend/src/api/content.ts
import { apiClient } from "./client";

export type HomeLayoutVariant =
  | "classic"
  | "sleek"
  | "blockchain"
  | "studio"
  | "river";

export interface HeroContent {
  headline: string;
  subheadline?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;

  // New optional fields
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;

  // Controls which homepage layout is active
  layoutVariant?: HomeLayoutVariant;
}

export interface ServiceItem {
  title: string;
  description: string;
  // optional, used in the sleek layout card
  tagline?: string;
}

export interface AboutContent {
  title: string;
  body: string[];
}

// Matches what HeaderSection expects: intro.headline / intro.subheadline
export type CareersIntro = {
  headline: string;
  subheadline?: string;
};

// ⚠️ This must match what your backend returns and what
// useCareersForm / RolesSection are using.
export interface CareerPosition {
  // Unique id for selection, routing, etc.
  id: string;

  // Existing fields
  title: string;
  summary: string;
  tags: string[];

  // New metadata used by the careers UI
  team: string; // e.g. "Engineering", "Security", "Advisory"
  location: string; // e.g. "Remote (US)", "Hybrid – DC / Baltimore"
  workMode: "remote" | "hybrid" | "onsite" | "other";

  level?: string;      // e.g. "Senior", "Mid–Senior"
  tagline?: string;    // short pill like "Mission-critical platforms"
  salaryRange?: string; // e.g. "$140k–$180k USD"
}

export interface CareersContent {
  intro: CareersIntro;
  positions: CareerPosition[];
}

export interface ContactContent {
  intro: string;
  email: string;
  phone: string;
  address: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  services: ServiceItem[];
  careers: CareersContent;
  contact: ContactContent;
}

// If you already had these, keep them; adding here for completeness:
export async function fetchContent(): Promise<SiteContent> {
  const res = await apiClient.get<SiteContent>("/api/content");
  return res.data;
}

export async function updateContent(
  newContent: SiteContent,
  apiKey: string
): Promise<{ detail: string }> {
  const res = await apiClient.put<{ detail: string }>(
    "/api/content",
    newContent,
    {
      headers: {
        "X-API-Key": apiKey,
      },
    }
  );
  return res.data;
}