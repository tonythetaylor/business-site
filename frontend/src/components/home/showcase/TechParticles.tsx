// src/components/home/showcase/TechParticles.tsx
export default function TechParticles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* 1) Soft dot field */}
      <div
        className="
          absolute inset-0
          opacity-30 dark:opacity-45
          bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.55),transparent_0)]
          bg-size-[42px_42px]
        "
      />

      {/* 2) Very light moving grid */}
      <div
        className="
          absolute inset-0
          opacity-20 dark:opacity-35
          [background-image:
            linear-gradient(to_right,rgba(148,163,184,0.30)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(148,163,184,0.30)_1px,transparent_1px)
          ]
          bg-size-[120px_120px]
          animate-tech-grid
        "
      />

      {/* 3) Radial “node” glows */}
      <div
        className="
          absolute inset-0
          mix-blend-screen
          bg-[radial-gradient(circle_at_12%_18%,rgba(56,189,248,0.30),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(129,140,248,0.38),transparent_55%)]
          dark:bg-[radial-gradient(circle_at_12%_18%,rgba(56,189,248,0.55),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(129,140,248,0.65),transparent_55%)]
        "
      />
    </div>
  );
}