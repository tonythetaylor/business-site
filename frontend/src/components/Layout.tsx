// src/components/Layout.tsx
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

  const layoutVariant = (content?.hero as any)?.layoutVariant as
    | HomeLayoutVariant
    | undefined;

  const isFullWidthVariant =
    layoutVariant === "blockchain" ||
    layoutVariant === "studio" ||
    layoutVariant === "showcase";

  const hideNavbar = layoutVariant === "showcase";

  let containerClass: string;

  if (noContainer) {
    containerClass = "w-full";
  } else if (layoutVariant === "showcase") {
    containerClass = "w-full";
  } else if (isFullWidthVariant) {
    containerClass = "w-full px-4 py-10 sm:px-6 lg:px-8";
  } else {
    containerClass =
      "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8";
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* global bg that DOES flip light/dark */}
      <div
        className="
          fixed inset-0 -z-20
          bg-gradient-to-b
          from-slate-100 via-slate-50 to-white
          dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]
          transition-colors duration-500
        "
      />

      <div className="relative z-10 flex min-h-screen flex-col text-slate-900 dark:text-slate-50">
        {!hideNavbar && <Navbar />}

        <main className="flex-1">
          <div className={`${containerClass} bg-transparent`}>
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}