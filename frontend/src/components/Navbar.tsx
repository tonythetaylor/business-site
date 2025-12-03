import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

// 🔹 Generic business branding (change these for a real client)
const BRAND_INITIALS = "BT"; // e.g. "AC" for "Acme Corp"
const BRAND_NAME = "Brand Title";
const BRAND_TAGLINE = "Brand Tagline";

const navLinkBase =
  "text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400";
const navLinkActive = "text-indigo-600 dark:text-indigo-400";
const navLinkInactive = "text-slate-700 dark:text-slate-200";

const DesktopNavLink = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
    }
  >
    {label}
  </NavLink>
);

const MobileNavLink = ({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block rounded-lg px-3 py-2 text-sm font-medium ${
        isActive
          ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
          : "text-slate-800 dark:text-slate-100"
      }`
    }
  >
    {label}
  </NavLink>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white dark:bg-indigo-500">
              {BRAND_INITIALS}
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-semibold tracking-tight">
                {BRAND_NAME}
              </span>
              <span className="text-[0.65rem] text-slate-500 dark:text-slate-400">
                {BRAND_TAGLINE}
              </span>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-5 sm:flex">
            {!isHome && <DesktopNavLink to="/" label="Home" />}

            <DesktopNavLink to="/about" label="About" />
            <DesktopNavLink to="/services" label="Services" />
            <DesktopNavLink to="/careers" label="Careers" />
            <DesktopNavLink to="/contact" label="Contact" />

            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile right side */}
          <div className="flex items-center gap-2 sm:hidden">
            <ThemeToggle />
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-over */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] sm:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-72 max-w-[80%] bg-white shadow-xl dark:bg-slate-900 sm:hidden">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight">
                  Menu
                </span>
                <span className="text-[0.7rem] text-slate-500 dark:text-slate-400">
                  {BRAND_NAME}
                </span>
              </div>
              <button
                className="rounded-md p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-3 py-4">
              {!isHome && (
                <MobileNavLink
                  to="/"
                  label="Home"
                  onClick={() => setOpen(false)}
                />
              )}

              <MobileNavLink
                to="/about"
                label="About"
                onClick={() => setOpen(false)}
              />
              <MobileNavLink
                to="/services"
                label="Services"
                onClick={() => setOpen(false)}
              />
              <MobileNavLink
                to="/careers"
                label="Careers"
                onClick={() => setOpen(false)}
              />
              <MobileNavLink
                to="/contact"
                label="Contact"
                onClick={() => setOpen(false)}
              />
            </nav>
          </div>
        </>
      )}
    </>
  );
}