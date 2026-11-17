/** Visible marker for any fact the owner still has to supply. Nothing is invented. */
export function ContentRequired({ label, block = false }: { label?: string; block?: boolean }) {
  const text = `[CONTENT REQUIRED]${label ? ` ${label}` : ""}`;
  if (block) {
    return (
      <div className="rounded-md border border-dashed border-brass-dark bg-sand p-5 text-sm text-brass-dark">{text}</div>
    );
  }
  return (
    <span className="inline-block rounded border border-dashed border-brass-dark px-2 py-0.5 text-sm text-brass-dark">{text}</span>
  );
}
