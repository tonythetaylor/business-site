import { Outlet, Navigate, NavLink, useNavigate } from "react-router-dom";
import { AdminDraftProvider } from "../../contexts/AdminDraftContext";

const navItems = [
  { to: "/admin/hero", label: "Hero" },
  { to: "/admin/about", label: "About" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/careers", label: "Careers" },
  { to: "/admin/contact", label: "Contact" },
  { to: "/admin/review", label: "Review & preview" },
  { to: "/admin/applications", label: "Applications" },
];

export default function AdminLayout() {
  const apiKey = localStorage.getItem("adminApiKey");
  const navigate = useNavigate();

  if (!apiKey) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminApiKey");
    navigate("/admin/login", { replace: true });
  };

  return (
    <AdminDraftProvider>
      <div className="min-h-screen w-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 flex">
        {/* Sidebar */}
        <aside
          className="w-64 shrink-0 border-r border-slate-200 bg-slate-50/90 px-5 py-6
                     dark:border-slate-800 dark:bg-slate-950/80 flex flex-col"
        >
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Admin
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              Site content
            </p>
          </div>

          <nav className="space-y-1 text-sm flex-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                className={({ isActive }) =>
                  [
                    "flex items-center justify-between rounded-lg px-3 py-2 transition",
                    isActive
                      ? "bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900"
                      : "text-slate-700 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50",
                  ].join(" ")
                }
              >
                <span>{item.label}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 opacity-70 dark:bg-indigo-400" />
              </NavLink>
            ))}
          </nav>

          <p className="mt-8 text-[0.7rem] text-slate-600 dark:text-slate-500">
            Edit each section, then use{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              Review & preview
            </span>{" "}
            before publishing.
          </p>
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="mt-6 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm 
                       text-slate-900 shadow-sm hover:bg-slate-100
                       dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Log out
          </button>
        </aside>

        {/* Main Admin Editor */}
        <main className="flex-1 px-8 py-10 overflow-y-auto bg-slate-50 dark:bg-slate-950">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </AdminDraftProvider>
  );
}
