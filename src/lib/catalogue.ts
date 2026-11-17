// DATA ACCESS LAYER - the only place pages get catalogue data from.
// Today it reads sample files. In Phase 3/5 only THIS file changes to read from Supabase,
// so the pages and components do not need rebuilding.
import { categories } from "@/data/categories";
import { sampleProducts } from "@/data/sampleProducts";
import type { Category, Product } from "@/types/catalogue";

export async function getCategories(): Promise<Category[]> { return categories; }
export async function getCategory(slug: string): Promise<Category | null> {
  return categories.find((c) => c.slug === slug) ?? null;
}
export async function getProducts(): Promise<Product[]> { return sampleProducts; }
export async function getProduct(slug: string): Promise<Product | null> {
  return sampleProducts.find((p) => p.slug === slug) ?? null;
}
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return sampleProducts.filter((p) => p.categorySlug === categorySlug);
}
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return sampleProducts.filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, limit);
}
