type Ratio = "4/3" | "1/1" | "16/9" | "3/2";
const ratios: Record<Ratio, string> = { "4/3": "aspect-[4/3]", "1/1": "aspect-square", "16/9": "aspect-video", "3/2": "aspect-[3/2]" };

/**
 * Understated, clearly temporary image tile. Replace with a real <Image> once approved photos exist.
 * compact = icon only (for small gallery thumbnails); the accessible label is still announced.
 */
export function ImagePlaceholder({
  label = "Photo to be supplied", ratio = "4/3", compact = false, className = "",
}: { label?: string; ratio?: Ratio; compact?: boolean; className?: string }) {
  const size = compact ? 20 : 28;
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`placeholder-tile flex w-full flex-col items-center justify-center gap-2 rounded-md border border-line text-center ${ratios[ratio]} ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
        strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="text-brass">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="m4 18 5-5 4 4 3-3 4 4" />
      </svg>
      {!compact && <span className="px-4 text-xs font-medium tracking-wide text-muted">{label}</span>}
    </div>
  );
}
