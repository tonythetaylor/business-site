import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_STORAGE_KEY = "adminApiKey";

export default function AdminLoginPage() {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!apiKey.trim()) {
      setError("Please enter your admin API key.");
      return;
    }

    localStorage.setItem(ADMIN_STORAGE_KEY, apiKey.trim());
    setError(null);
    navigate("/admin");
  };

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Enter your admin API key to manage site content.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Admin API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500 focus:ring-1 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
          />
        </div>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          Continue
        </button>
      </form>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        The API key is stored only in this browser&apos;s local storage and sent
        as an{" "}
        <code className="font-mono text-[0.7rem] text-slate-700 dark:text-slate-200">
          X-API-Key
        </code>{" "}
        header when saving content.
      </p>
    </div>
  );
}