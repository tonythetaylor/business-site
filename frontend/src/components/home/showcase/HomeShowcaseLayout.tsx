// src/components/home/showcase/HomeShowcaseLayout.tsx
import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "../../../api/content";

import HeroShowcaseSection from "./HeroShowcaseSection";
import AboutShowcaseSection from "./AboutShowcaseSection";
import ServicesShowcaseSection from "./ServicesShowcaseSection";
import CareersShowcaseSection from "./CareersShowcaseSection";
import ContactShowcaseSection from "./ContactShowcaseSection";

import { sections, type SectionId } from "./sectionsConfig";

type Props = {
  content: SiteContent;
};

export default function HomeShowcaseLayout({ content }: Props) {
  const { hero, about, services, contact } = content;

  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [scrollY, setScrollY] = useState(0);

  // Refs per section
  const sectionRefs: Record<SectionId, React.RefObject<HTMLElement | null>> = {
    hero: useRef<HTMLElement | null>(null),
    about: useRef<HTMLElement | null>(null),
    services: useRef<HTMLElement | null>(null),
    careers: useRef<HTMLElement | null>(null),
    contact: useRef<HTMLElement | null>(null),
  };

  // Intersection observer to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop
          );

        if (visible[0]) {
          const id = visible[0].target.getAttribute(
            "data-section-id"
          ) as SectionId | null;
          if (id) setActiveSection(id);
        }
      },
      {
        root: null,
        threshold: 0.4,
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll listener for subtle parallax
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || window.pageYOffset || 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: SectionId) => {
    const el = sectionRefs[id].current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Shared base classes (no bg)
  const sectionBaseClasses =
    "flex min-h-screen snap-start items-center px-4 py-10 sm:px-6 lg:px-10 transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]";

  const sectionBorderClasses = "";

  const showBackToTop = activeSection !== "hero";

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-50">
      <main className="scroll-smooth snap-y snap-mandatory">
        <HeroShowcaseSection
          hero={hero}
          scrollY={scrollY}
          sectionRef={sectionRefs.hero}
          isActive={activeSection === "hero"}
          scrollTo={scrollTo}
          sectionBaseClasses={sectionBaseClasses}
          sectionBorderClasses={sectionBorderClasses}
        />

        <AboutShowcaseSection
          about={about}
          scrollY={scrollY}
          sectionRef={sectionRefs.about}
          isActive={activeSection === "about"}
          scrollTo={scrollTo}
          sectionBaseClasses={sectionBaseClasses}
          sectionBorderClasses={sectionBorderClasses}
        />

        <ServicesShowcaseSection
          services={services}
          sectionRef={sectionRefs.services}
          isActive={activeSection === "services"}
          scrollTo={scrollTo}
          sectionBaseClasses={sectionBaseClasses}
          sectionBorderClasses={sectionBorderClasses}
        />

        <CareersShowcaseSection
          sectionRef={sectionRefs.careers}
          isActive={activeSection === "careers"}
          scrollTo={scrollTo}
          sectionBaseClasses={sectionBaseClasses}
          sectionBorderClasses={sectionBorderClasses}
        />

        <ContactShowcaseSection
          contact={contact}
          sectionRef={sectionRefs.contact}
          isActive={activeSection === "contact"}
          sectionBaseClasses={sectionBaseClasses}
        />
      </main>

      {/* Side page indicators (desktop) + back-to-top */}
      <div className="pointer-events-none fixed inset-y-0 right-4 z-20 hidden flex-col items-center justify-center gap-3 md:flex">
        {showBackToTop && (
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="pointer-events-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full border border-slate-500 bg-slate-900/80 text-xs text-slate-100 shadow-md hover:border-sky-500 hover:text-sky-300"
            aria-label="Back to top"
          >
            ↑
          </button>
        )}

        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollTo(s.id)}
            className={[
              "pointer-events-auto h-2.5 w-2.5 rounded-full border transition",
              activeSection === s.id
                ? "scale-110 border-sky-500 bg-sky-500 shadow-[0_0_0_4px_rgba(56,189,248,0.35)]"
                : "border-slate-300 bg-slate-300 hover:bg-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-600",
            ].join(" ")}
            aria-label={s.label}
          />
        ))}
      </div>
    </div>
  );
}