import type { ReactNode } from "react";

export function ProvisionalNote({ children, title = "Provisional content" }: { children: ReactNode; title?: string }) {
  return (
    <div role="note" className="rounded-md border border-brass bg-white p-4 text-sm text-ink">
      <p className="font-semibold text-brass-dark">{title}</p>
      <div className="mt-1 text-muted">{children}</div>
    </div>
  );
}
