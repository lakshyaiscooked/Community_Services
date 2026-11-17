// Shapes of catalogue data. In Phase 3+ the same shapes will be filled from the database.
export type Section = "products" | "packaging" | "printing";

export interface Subcategory { slug: string; name: string }

export interface Category {
  slug: string;
  name: string;
  section: Section;
  /** true = contains products that need legal/wording review before publishing */
  reviewRequired: boolean;
  subcategories: Subcategory[];
}

export interface Product {
  slug: string;
  name: string;
  categorySlug: string;
  subcategoryName: string;
  /** null = no approved description yet (the UI shows a clear placeholder) */
  shortDescription: string | null;
  /** true = demo-only card used to show the layout. Never real catalogue data. */
  isSample: boolean;
}