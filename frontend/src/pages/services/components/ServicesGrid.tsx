import type { FC } from "react";
import type { ServiceItem } from "../../../api/content";

interface ServicesGridProps {
  services: ServiceItem[];
}

const ServicesGrid: FC<ServicesGridProps> = ({ services }) => {
  if (!services || services.length === 0) {
    return (
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Service offerings will be published here soon. In the meantime, reach
        out through the contact page to discuss how we can help.
      </p>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {services.map((service, idx) => (
        <article
          key={idx}
          className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            {service.title}
          </h2>
          <p className="mt-2 flex-1 text-sm text-slate-700 dark:text-slate-300">
            {service.description}
          </p>
          <p className="mt-3 text-[0.7rem] text-slate-500 dark:text-slate-400">
            Every engagement starts with understanding your environment, risk
            profile, and constraints before we recommend tooling or change.
          </p>
        </article>
      ))}
    </div>
  );
};

export default ServicesGrid;