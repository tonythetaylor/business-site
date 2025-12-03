// src/pages/admin/AdminHeroPage.tsx
import { useAdminDraft } from "../../contexts/AdminDraftContext";

export default function AdminHeroPage() {
  const { draft, updateDraftField } = useAdminDraft();

  if (!draft) return <p>Loading…</p>;

  const hero = draft.hero;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Edit Hero</h1>

      <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 space-y-4">
        <div>
          <label className="text-xs font-semibold">Headline</label>
          <input
            className="mt-1 w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
            value={hero.headline}
            onChange={e =>
              updateDraftField("hero", { ...hero, headline: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-xs font-semibold">Subheadline</label>
          <textarea
            className="mt-1 w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
            rows={3}
            value={hero.subheadline}
            onChange={e =>
              updateDraftField("hero", { ...hero, subheadline: e.target.value })
            }
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold">CTA Label</label>
            <input
              className="mt-1 w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
              value={hero.primaryCtaLabel}
              onChange={e =>
                updateDraftField("hero", {
                  ...hero,
                  primaryCtaLabel: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="text-xs font-semibold">CTA Link</label>
            <input
              className="mt-1 w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
              value={hero.primaryCtaHref}
              onChange={e =>
                updateDraftField("hero", {
                  ...hero,
                  primaryCtaHref: e.target.value,
                })
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}