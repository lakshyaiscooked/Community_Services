import type { ReactNode } from "react";

export function SectionHeading({ id, eyebrow, title, intro, action }: { id?: string; eyebrow?: string; title: string; intro?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass-dark">{eyebrow}</p>}
        <h2 id={id} className="text-2xl font-semibold text-navy sm:text-3xl">{title}</h2>
        {intro && <p className="mt-2 text-muted">{intro}</p>}
      </div>
      {action}
    </div>
  );
}
