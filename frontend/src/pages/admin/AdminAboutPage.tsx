// src/pages/admin/AdminAboutPage.tsx
import { useAdminDraft } from "../../contexts/AdminDraftContext";

export default function AdminAboutPage() {
  const { draft, updateDraftField } = useAdminDraft();

  if (!draft) return <p>Loading…</p>;

  const about = draft.about;
  const bodyText = about.body.join("\n");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Edit About</h1>

      <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 space-y-4">
        <div>
          <label className="text-xs font-semibold">Title</label>
          <input
            className="mt-1 w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
            value={about.title}
            onChange={e =>
              updateDraftField("about", { ...about, title: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-xs font-semibold">Body (each line → paragraph)</label>
          <textarea
            rows={6}
            className="mt-1 w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
            value={bodyText}
            onChange={e =>
              updateDraftField("about", {
                ...about,
                body: e.target.value
                  .split("\n")
                  .map(t => t.trim())
                  .filter(Boolean),
              })
            }
          />
        </div>
      </section>
    </div>
  );
}