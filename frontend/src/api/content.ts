// src/api/content.ts

import { apiClient } from "./client";

export interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
}

export interface AboutContent {
  title: string;
  body: string[];
}

export interface ServiceItem {
  title: string;
  description: string;
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