// src/pages/admin/AdminServicesPage.tsx
import { useAdminDraft } from "../../contexts/AdminDraftContext";
import type { ServiceItem } from "../../api/content";

export default function AdminServicesPage() {
  const { draft, updateDraftField } = useAdminDraft();

  if (!draft) return <p>Loading…</p>;

  const services = draft.services;

  const updateService = (index: number, field: keyof ServiceItem, value: string) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    updateDraftField("services", updated);
  };

  const addService = () => {
    updateDraftField("services", [
      ...services,
      { title: "New Service", description: "Service description…" },
    ]);
  };

  const removeService = (index: number) => {
    const updated = services.filter((_, i) => i !== index);
    updateDraftField("services", updated);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Edit Services</h1>

      <button
        onClick={addService}
        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400"
      >
        + Add Service
      </button>

      <div className="space-y-4">
        {services.map((service, index) => (
          <section
            key={index}
            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 space-y-3"
          >
            <div className="flex justify-between items-start">
              <p className="text-xs font-semibold">Service #{index + 1}</p>
              <button
                onClick={() => removeService(index)}
                className="text-[0.7rem] text-red-500"
              >
                Remove
              </button>
            </div>

            <input
              className="w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
              value={service.title}
              onChange={e => updateService(index, "title", e.target.value)}
            />

            <textarea
              rows={3}
              className="w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
              value={service.description}
              onChange={e =>
                updateService(index, "description", e.target.value)
              }
            />
          </section>
        ))}
      </div>
    </div>
  );
}