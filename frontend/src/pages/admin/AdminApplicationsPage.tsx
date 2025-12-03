// src/pages/admin/AdminApplicationsPage.tsx
import { useEffect, useState } from "react";
import type { AdminApplication } from "../../api/adminApplications";
import {
  fetchAdminApplications,
  downloadResume,
} from "../../api/adminApplications";

export default function AdminApplicationsPage() {
  const [data, setData] = useState<AdminApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState("");

  const load = () => {
    setLoading(true);
    setError(null);

    fetchAdminApplications(roleFilter)
      .then(setData)
      .catch((err: any) => {
        const msg =
          err?.response?.data?.detail ||
          err?.message ||
          "Failed to load applications";
        setError(msg);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initial load

  const handleDownload = async (resumeFileId: number) => {
    try {
      await downloadResume(resumeFileId);
    } catch (err: any) {
      const msg =
        err?.response?.data?.detail ||
        err?.message ||
        "Failed to download resume";
      alert(msg); // or set a local toast
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pt-10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Career applications
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Filter by role and download resumes securely (audited on the
            backend).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            placeholder="Filter by role…"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          />
          <button
            onClick={load}
            className="rounded-md bg-slate-900 px-3 py-1 text-xs font-medium text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            Apply
          </button>
        </div>
      </div>

      {loading && (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Loading applications…
        </p>
      )}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">Error: {error}</p>
      )}

      {!loading && !error && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/60">
          <table className="min-w-full text-left text-xs text-slate-900 dark:text-slate-200">
            <thead className="bg-slate-50 text-[0.7rem] uppercase tracking-wide text-slate-500 dark:bg-slate-900/70 dark:text-slate-400">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Submitted</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((app) => (
                <tr
                  key={app.id}
                  className="border-t border-slate-100 dark:border-slate-800"
                >
                  <td className="px-3 py-2">{app.full_name}</td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-300">
                    {app.email}
                  </td>
                  <td className="px-3 py-2 text-slate-700 dark:text-slate-300">
                    {app.position}
                  </td>
                  <td className="px-3 py-2 text-slate-500 dark:text-slate-400">
                    {new Date(app.created_at).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={() => handleDownload(app.resume_file_id)}
                      className="rounded-full bg-indigo-600 px-3 py-1 text-[0.7rem] font-semibold text-white hover:bg-indigo-500"
                    >
                      Download resume
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-3 text-center text-slate-500 dark:text-slate-400"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}