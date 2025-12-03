// frontend/src/api/content.ts

export type HomeLayoutVariant = "classic" | "sleek";

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

export interface CareerPosition {
  title: string;
  summary: string;
  tags: string[];
}

export interface CareersContent {
  intro: string;
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