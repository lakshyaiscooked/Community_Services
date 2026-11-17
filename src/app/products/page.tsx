import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogueBrowser } from "@/components/CatalogueBrowser";
import { PageHeader } from "@/components/PageHeader";
import { getCategories, getProducts } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Products" };

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return (
    <>
      <PageHeader
        compact
        title="Product Catalogue"
        intro="Search or filter by category, then send an enquiry."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <div className="container-page py-8">
        <Suspense fallback={<p role="status" className="text-muted">Loading catalogue…</p>}>
          <CatalogueBrowser categories={categories} products={products} />
        </Suspense>
      </div>
    </>
  );
}
