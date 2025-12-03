import ClassicHomeLayout from "../components/home/ClassicHomeLayout";
import SleekHomeLayout from "../components/home/SleekHomeLayout";
import { useContent } from "../contexts/ContentContext";
import type { HeroContent, ServiceItem } from "../types/content";


export default function HomePage() {
  const { content, loading, error } = useContent();

  if (loading && !content) {
    return (
      <p className="text-center text-slate-500 dark:text-slate-400">
        Loading site content…
      </p>
    );
  }

  if (error && !content) {
    return (
      <p className="text-center text-red-600 dark:text-red-400">
        Failed to load site content. Please try again later.
      </p>
    );
  }

  if (!content) return null;

  const hero: HeroContent = content.hero ?? {};
  const services: ServiceItem[] = Array.isArray(content.services)
    ? content.services
    : [];

  const layoutVariant = hero.layoutVariant ?? "classic";

  return layoutVariant === "sleek" ? (
    <SleekHomeLayout hero={hero} services={services} />
  ) : (
    <ClassicHomeLayout hero={hero} services={services} />
  );
}