import Link from "next/link";
import type { Category } from "@/types/catalogue";
import { site } from "@/lib/site";

export function CategoryCard({ category }: { category: Category }) {
  const preview = category.subcategories.slice(0, 3).map((s) => s.name).join(", ");
  const more = category.subcategories.length - 3;
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 transition-colors hover:border-navy"
    >
      <span aria-hidden="true" className="mb-4 block h-1 w-10 bg-brass" />
      <h3 className="text-lg font-semibold text-navy group-hover:underline">{category.name}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{preview}{more > 0 ? `, +${more} more` : ""}</p>
      {/* Review chip is a template aid: it disappears when showTemplateBanner is set to false */}
      {site.showTemplateBanner && category.reviewRequired && (
        <p className="mt-3 w-fit rounded border border-dashed border-brass-dark px-2 py-0.5 text-xs font-medium text-brass-dark">Pending review</p>
      )}
      <span className="mt-4 text-sm font-semibold text-navy">View category <span aria-hidden="true">→</span></span>
    </Link>
  );
}
