import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useContent } from "../contexts/ContentContext";
import type { HomeLayoutVariant } from "../types/content";

interface LayoutProps {
  children: ReactNode;
  noContainer?: boolean;
}

export default function Layout({ children, noContainer }: LayoutProps) {
  const { content } = useContent();

  // Safely read the homepage layout variant from published content
  const layoutVariant = (content?.hero as any)
    ?.layoutVariant as HomeLayoutVariant | undefined;

  // Variants that should be full-width
  const isFullWidth =
    layoutVariant === "blockchain" ||
    layoutVariant === "studio";

  // Final container class
  const containerClass = noContainer
    ? "w-full"
    : isFullWidth
    ? "w-full px-4 py-10 sm:px-6 lg:px-8"
    : "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-50">
      <Navbar />
      <main className="flex-1">
        <div className={containerClass}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}