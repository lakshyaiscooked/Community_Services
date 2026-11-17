"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Category, Product } from "@/types/catalogue";
import { ProductCard } from "./ProductCard";
import { ButtonLink, buttonClasses } from "./Button";

/** Search + category filter. State lives in the URL (?q=...&category=...) so results can be shared. */
export function CatalogueBrowser({ categories, products }: { categories: Category[]; products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [query, setQuery] = useState(params.get("q") ?? "");
  const requested = params.get("category") ?? "";
  const category = categories.some((c) => c.slug === requested) ? requested : "";

  const nameBySlug = useMemo(() => new Map(categories.map((c) => [c.slug, c.name])), [categories]);
  const countBySlug = useMemo(() => {
    const m = new Map<string, number>();
    products.forEach((p) => m.set(p.categorySlug, (m.get(p.categorySlug) ?? 0) + 1));
    return m;
  }, [products]);

  function syncUrl(nextQuery: string, nextCategory: string) {
    const p = new URLSearchParams();
    if (nextQuery.trim()) p.set("q", nextQuery.trim());
    if (nextCategory) p.set("category", nextCategory);
    const s = p.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  }

  const filtered = useMemo(() => {
    const t = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.categorySlug !== category) return false;
      if (!t) return true;
      const haystack = [p.name, p.subcategoryName, nameBySlug.get(p.categorySlug) ?? "", p.shortDescription ?? ""].join(" ").toLowerCase();
      return haystack.includes(t);
    });
  }, [products, query, category, nameBySlug]);

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <aside aria-label="Catalogue filters" className="space-y-5 lg:sticky lg:top-28 lg:self-start">
        <div>
          <label htmlFor="catalogue-search" className="mb-1 block text-sm font-semibold text-navy">Search the catalogue</label>
          <input
            id="catalogue-search"
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); syncUrl(e.target.value, category); }}
            placeholder="Product, category or type"
            className="min-h-11 w-full rounded-md border border-muted bg-white px-3 text-base"
          />
        </div>

        {/* Small screens: simple dropdown */}
        <div className="lg:hidden">
          <label htmlFor="catalogue-category" className="mb-1 block text-sm font-semibold text-navy">Category</label>
          <select
            id="catalogue-category"
            value={category}
            onChange={(e) => syncUrl(query, e.target.value)}
            className="min-h-11 w-full rounded-md border border-muted bg-white px-3 text-base"
          >
            <option value="">All categories</option>
            {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>

        {/* Large screens: category list */}
        <div className="hidden lg:block">
          <h2 className="mb-2 font-sans text-sm font-semibold text-navy">Category</h2>
          <ul className="space-y-1">
            <li>
              <button type="button" aria-pressed={category === ""} onClick={() => syncUrl(query, "")}
                className={`w-full rounded-md px-3 py-2 text-left text-sm ${category === "" ? "bg-navy text-white" : "hover:bg-sand"}`}>
                All categories
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <button type="button" aria-pressed={category === c.slug} onClick={() => syncUrl(query, c.slug)}
                  className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm ${category === c.slug ? "bg-navy text-white" : "hover:bg-sand"}`}>
                  <span>{c.name}</span>
                  <span className="text-xs opacity-80">({countBySlug.get(c.slug) ?? 0})</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p role="status" aria-live="polite" className="text-sm text-muted">
            Showing {filtered.length} of {products.length} demo placeholder cards
          </p>
          {(query.trim() || category) && (
            <button type="button" className={buttonClasses("secondary", "sm")} onClick={() => { setQuery(""); syncUrl("", ""); }}>Clear filters</button>
          )}
        </div>
        {filtered.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <li key={p.slug}><ProductCard product={p} categoryName={nameBySlug.get(p.categorySlug) ?? ""} /></li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center">
            <h2 className="font-sans text-lg font-semibold text-navy">No products match your search</h2>
            <p className="mt-2 text-muted">Try a different word or clear the filters. You can also tell us what you need.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button type="button" className={buttonClasses("secondary", "sm")} onClick={() => { setQuery(""); syncUrl("", ""); }}>Clear filters</button>
              <ButtonLink href="/enquiry" size="sm">Send Enquiry</ButtonLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
