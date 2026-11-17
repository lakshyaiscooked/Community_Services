import Link from "next/link";

/** TEMPORARY text wordmark. Replace with the approved logo when supplied. */
export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Shree Jee Enterprises - home" className="inline-flex flex-col leading-none">
      <span className={`font-serif text-2xl font-semibold ${light ? "text-white" : "text-navy"}`}>Shree Jee</span>
      <span className={`mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] ${light ? "text-brass-light" : "text-brass-dark"}`}>
        Enterprises
      </span>
    </Link>
  );
}
