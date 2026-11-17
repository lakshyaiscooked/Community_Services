import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

export function PageHeader({ title, intro, crumbs, children, compact = false }: { title: string; intro?: string; crumbs?: Crumb[]; children?: ReactNode; compact?: boolean }) {
  return (
    <section className="border-b border-line bg-sand">
      <div className={`container-page ${compact ? "py-6 sm:py-8" : "py-8 sm:py-12"}`}>
        {crumbs && <div className="mb-4"><Breadcrumbs crumbs={crumbs} /></div>}
        <h1 className="text-3xl font-semibold text-navy sm:text-4xl">{title}</h1>
        {intro && <p className="mt-3 max-w-2xl text-lg text-muted">{intro}</p>}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </section>
  );
}
