// src/components/home/showcase/sectionsConfig.ts
export type SectionId = "hero" | "about" | "services" | "careers" | "contact";

export const sections: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Overview" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact" },
];