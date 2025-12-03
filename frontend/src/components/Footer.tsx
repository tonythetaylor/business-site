export default function Footer() {

  return (
    <footer className="border-t border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:gap-4 sm:px-6 lg:px-8 dark:text-slate-400">
        
        {/* Left side */}
        <p>
          © {new Date().getFullYear()} Chattahoochee River Consulting LLC. All
          rights reserved.
        </p>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">
            Engineered with discipline. Delivered with precision.
          </span>

        </div>
      </div>
    </footer>
  );
}