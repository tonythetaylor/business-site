import { useContent } from "../contexts/ContentContext";

// 🔹 Generic business branding that can be customized
const BUSINESS_NAME = "Brand Name";
const BUSINESS_TAGLINE =
  "Helping businesses modernize, streamline, and grow with clarity.";
const BUSINESS_ORIGIN = `${BUSINESS_NAME} was founded on the belief that great outcomes come from a blend of expertise, integrity, and hands-on service.`;

export default function AboutPage() {
  const { content, loading, error } = useContent();

  if (loading && !content) {
    return (
      <p className="text-center text-slate-500 dark:text-slate-400">
        Loading about page…
      </p>
    );
  }

  if (error && !content) {
    return (
      <p className="text-center text-red-600 dark:text-red-400">
        Failed to load about content.
      </p>
    );
  }

  if (!content) return null;

  const { about } = content;

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          About
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {about.title}
        </h1>

        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          {BUSINESS_TAGLINE}
        </p>
      </header>

      {/* Main layout: narrative + sidebar */}
      <div className="grid gap-10 md:grid-cols-[minmax(0,2fr),minmax(0,1.35fr)]">
        {/* Left: narrative body from CMS + extra story */}
        <section className="space-y-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {about.body.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}

          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Our story & philosophy
            </h2>
            <p>{BUSINESS_ORIGIN}</p>
            <p>
              Over the years, the team has worked across a range of industries,
              helping organizations navigate change, adopt modern practices, and
              solve problems that matter. We believe in clear communication,
              realistic planning, and long-lasting solutions.
            </p>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              How we work
            </p>
            <ul className="mt-3 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li>• We focus on clarity, collaboration, and measurable progress.</li>
              <li>• Every project begins with understanding your goals and constraints.</li>
              <li>• We provide honest, practical guidance — no jargon, no fluff.</li>
              <li>• We value long-term sustainability over quick fixes.</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              What you can expect
            </p>
            <ul className="mt-3 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li>• Clear communication throughout the engagement.</li>
              <li>• Solutions tailored to your team, not generic templates.</li>
              <li>• A reliable partner committed to your success.</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Company values callout */}
      <section className="rounded-2xl border border-indigo-200 bg-indigo-50/80 p-5 text-sm shadow-sm dark:border-indigo-400/40 dark:bg-indigo-950/30 dark:text-indigo-50">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-700 dark:text-indigo-300">
              Our values
            </p>
            <p className="mt-1 max-w-3xl text-sm">
              We believe the best partnerships are built on trust, transparency,
              and a shared commitment to quality. These principles guide every
              engagement we take on.
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2 sm:mt-0">
            <div className="inline-flex items-center justify-center rounded-full border border-indigo-300 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-800 shadow-sm dark:border-indigo-400/50 dark:bg-indigo-900/60 dark:text-indigo-100">
              Excellence in delivery
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Core capabilities
          </h2>
          <p className="max-w-xl text-xs text-slate-500 dark:text-slate-400">
            We support clients at different stages of growth, transformation,
            and operational improvement.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Business strategy & planning",
              body:
                "Guidance on aligning operations, resources, and technology to your long-term goals.",
            },
            {
              title: "Process optimization",
              body:
                "Streamline workflows, reduce inefficiencies, and build repeatable, scalable systems.",
            },
            {
              title: "Technology consulting",
              body:
                "Support around modern tools, automation, integrations, and digital transformation.",
            },
            {
              title: "Project & program leadership",
              body:
                "Structured oversight to ensure initiatives stay on track, on budget, and aligned.",
            },
            {
              title: "Change management",
              body:
                "Help teams adopt new tools, processes, and practices with minimal disruption.",
            },
            {
              title: "Training & enablement",
              body:
                "Empower your team with the knowledge and frameworks they need to excel.",
            },
          ].map((item, i) => (
            <article
              key={i}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {item.title}
              </h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Experience section */}
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Experience behind our practice
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Our team brings together backgrounds in management, technology,
          operations, and business strategy — giving us the ability to see
          challenges from multiple angles and design solutions that work in
          real-world conditions.
        </p>

        <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-300 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Perspective
            </p>
            <p className="mt-1">Client-first, collaborative, and outcome-driven.</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Breadth
            </p>
            <p className="mt-1">
              Experience across industries, from small businesses to enterprise-scale
              organizations.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Depth
            </p>
            <p className="mt-1">
              Hands-on execution combined with strategic thinking and structured delivery.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}