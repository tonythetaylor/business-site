// src/pages/admin/AdminLayout.tsx
import type { FC } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AdminDraftProvider } from "../../contexts/AdminDraftContext";

const navSections = [
  {
    label: "Site content",
    items: [
      { label: "Hero", path: "/admin/hero" },
      { label: "About", path: "/admin/about" },
      { label: "Services", path: "/admin/services" },
      { label: "Careers", path: "/admin/careers" },
      { label: "Contact", path: "/admin/contact" },
      { label: "Review & preview", path: "/admin/review" },
      { label: "Applications", path: "/admin/applications" },
    ],
  },
];

const AdminLayout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleBrandClick = () => {
    navigate("/admin/review");
    setMobileNavOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminApiKey");
    setMobileNavOpen(false);
    navigate("/admin/login");
  };

  const renderNavItems = () => (
    <nav className="mt-4 space-y-6">
      {navSections.map((section) => (
        <div key={section.label} className="space-y-2">
          <p className="px-2 text-[0.7rem] font-semibold uppercase tracking-wide text-slate-400">
            {section.label}
          </p>
          <div className="space-y-1">
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive: routeActive }) => {
                  const active = routeActive || isActive(item.path);
                  return [
                    "flex items-center rounded-xl px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
                  ].join(" ");
                }}
              >
                <span className="truncate">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <AdminDraftProvider>
      {/* Make entire admin shell a column flex so content area can stretch */}
      <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 lg:hidden">
          <button
            type="button"
            onClick={handleBrandClick}
            className="flex flex-col text-left"
          >
            <span className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
              ADMIN
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Site content
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMobileNavOpen((open) => !open)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-800"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="space-y-1">
              <span className="block h-0.5 w-4 rounded bg-current" />
              <span className="block h-0.5 w-4 rounded bg-current" />
              <span className="block h-0.5 w-4 rounded bg-current" />
            </div>
          </button>
        </header>

        {/* Body: sidebar + main, stretched to full height */}
        <div className="flex flex-1">
          {/* Mobile backdrop */}
          {mobileNavOpen && (
            <div
              className="fixed inset-0 z-50 bg-slate-900/40 lg:hidden"
              onClick={() => setMobileNavOpen(false)}
            />
          )}

          {/* Mobile drawer nav */}
          <div
            className={`fixed inset-y-0 left-0 z-60 w-72 transform border-r border-slate-200 bg-white/95 p-4 text-sm shadow-xl transition-transform duration-200 ease-out dark:border-slate-800 dark:bg-slate-900/95 lg:hidden ${
              mobileNavOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleBrandClick}
                className="flex flex-col text-left"
              >
                <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-400">
                  Admin
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Site content
                </span>
              </button>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex h-[calc(100vh-4rem)] flex-col">
              <div className="flex-1 overflow-y-auto">{renderNavItems()}</div>

              <div className="mt-4 border-t border-slate-200 pt-4 text-[0.7rem] text-slate-400 dark:border-slate-800 dark:text-slate-500">
                <p>
                  Edit each section, then use{" "}
                  <span className="font-semibold">Review &amp; preview</span>{" "}
                  before publishing.
                </p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-300 px-3 py-1.5 text-[0.75rem] font-medium text-slate-700 hover:border-red-500 hover:text-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-red-500 dark:hover:text-red-400"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>

          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white/95 px-4 py-6 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/95 lg:flex lg:flex-col">
            <button
              type="button"
              onClick={handleBrandClick}
              className="flex flex-col items-start gap-1 rounded-xl px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-400">
                Admin
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Site content
              </span>
            </button>

            <div className="mt-6 flex-1 overflow-y-auto">{renderNavItems()}</div>

            <div className="mt-4 border-t border-slate-200 pt-4 text-[0.7rem] text-slate-400 dark:border-slate-800 dark:text-slate-500">
              <p>
                Edit each section, then use{" "}
                <span className="font-semibold">Review &amp; preview</span>{" "}
                before publishing.
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-300 px-3 py-1.5 text-[0.75rem] font-medium text-slate-700 hover:border-red-500 hover:text-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-red-500 dark:hover:text-red-400"
              >
                Log out
              </button>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 px-4 py-4 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminDraftProvider>
  );
};

export default AdminLayout;