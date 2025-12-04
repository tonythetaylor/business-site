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

// Careers intro is now an object, not a string
export interface CareersIntro {
  headline: string;
  subheadline?: string;
}

// This must match what your backend careers.positions returns
export interface CareerPosition {
  // Unique identifier
  id: string;

  // Core fields
  title: string;
  summary: string;
  tags: string[];

  // Metadata
  team: string; // e.g. "Engineering", "Security"
  location: string; // e.g. "Remote (US)"
  workMode: "remote" | "hybrid" | "onsite" | "other";

  level?: string;       // "Senior", "Mid–Senior", etc.
  tagline?: string;     // short pill under the title
  salaryRange?: string; // "$140k–$180k USD"
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