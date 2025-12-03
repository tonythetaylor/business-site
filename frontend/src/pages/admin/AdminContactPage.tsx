// src/pages/admin/AdminContactPage.tsx
import { useAdminDraft } from "../../contexts/AdminDraftContext";

export default function AdminContactPage() {
  const { draft, updateDraftField } = useAdminDraft();

  if (!draft) return <p>Loading…</p>;

  const contact = draft.contact;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Edit Contact</h1>

      <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 space-y-4">
        <div>
          <label className="text-xs font-semibold">Intro</label>
          <textarea
            rows={3}
            className="mt-1 w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
            value={contact.intro}
            onChange={e =>
              updateDraftField("contact", { ...contact, intro: e.target.value })
            }
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold">Email</label>
            <input
              className="mt-1 w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
              value={contact.email}
              onChange={e =>
                updateDraftField("contact", { ...contact, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-xs font-semibold">Phone</label>
            <input
              className="mt-1 w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
              value={contact.phone}
              onChange={e =>
                updateDraftField("contact", { ...contact, phone: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold">Address</label>
          <textarea
            rows={2}
            className="mt-1 w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
            value={contact.address}
            onChange={e =>
              updateDraftField("contact", { ...contact, address: e.target.value })
            }
          />
        </div>
      </section>
    </div>
  );
}