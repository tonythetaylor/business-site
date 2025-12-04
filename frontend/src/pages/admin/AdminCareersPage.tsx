// src/pages/admin/AdminCareersPage.tsx
import { useAdminDraft } from "../../contexts/AdminDraftContext";
import type { CareerPosition } from "../../api/content";

export default function AdminCareersPage() {
  const { draft, updateDraftField } = useAdminDraft();

  if (!draft) return <p>Loading…</p>;

  const careers = draft.careers;

  const updatePosition = (
    index: number,
    field: keyof CareerPosition,
    value: string
  ) => {
    const updated = [...careers.positions];
    const position = { ...updated[index] };

    if (field === "tags") {
      position.tags = value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    } else {
      (position as any)[field] = value;
    }

    updated[index] = position;
    updateDraftField("careers", { ...careers, positions: updated });
  };

  const addPosition = () => {
    const newPosition: CareerPosition = {
      id: `new-${Date.now()}`,
      title: "New Position",
      summary: "Short description of the role.",
      tags: [],
      team: "General",
      location: "Remote (US)",
      workMode: "remote",
      // level / tagline / salaryRange are optional
    };

    updateDraftField("careers", {
      ...careers,
      positions: [...careers.positions, newPosition],
    });
  };

  const removePosition = (index: number) => {
    updateDraftField("careers", {
      ...careers,
      positions: careers.positions.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Edit Careers</h1>

      <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <label className="text-xs font-semibold">Intro</label>
        <textarea
          rows={3}
          value={careers.intro?.headline ?? ""}
          onChange={(e) =>
            updateDraftField("careers", {
              ...careers,
              intro: {
                ...careers.intro,
                headline: e.target.value,
              },
            })
          }
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
        />
      </section>

      <button
        onClick={addPosition}
        className="text-xs font-semibold text-indigo-600 dark:text-indigo-400"
      >
        + Add Position
      </button>

      <div className="space-y-4">
        {careers.positions.map((pos, index) => (
          <section
            key={index}
            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 space-y-3"
          >
            <div className="flex justify-between">
              <p className="text-xs font-semibold">Position #{index + 1}</p>
              <button
                onClick={() => removePosition(index)}
                className="text-[0.7rem] text-red-500"
              >
                Remove
              </button>
            </div>

            <input
              className="w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
              value={pos.title}
              onChange={(e) => updatePosition(index, "title", e.target.value)}
            />

            <textarea
              rows={2}
              className="w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
              value={pos.summary}
              onChange={(e) => updatePosition(index, "summary", e.target.value)}
            />

            <input
              className="w-full rounded-lg border p-2 bg-white dark:bg-slate-800"
              placeholder="comma separated tags"
              value={pos.tags.join(", ")}
              onChange={(e) => updatePosition(index, "tags", e.target.value)}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
