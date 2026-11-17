import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { ProvisionalNote } from "@/components/ProvisionalNote";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/catalogue";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  return { title: category?.name ?? "Category" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  const products = await getProductsByCategory(slug);

  return (
    <>
      <PageHeader
        title={category.name}
        crumbs={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: category.name }]}
      >
        {category.reviewRequired && (
          <ProvisionalNote title="Pending review">Products in this category need checking (regulatory or wording) before they are published.</ProvisionalNote>
        )}
      </PageHeader>
      <div className="container-page grid gap-10 py-10 lg:grid-cols-[16rem_1fr]">
        <aside aria-label="Subcategories">
          <h2 className="font-sans text-sm font-semibold text-navy">Subcategories</h2>
          <ul className="mt-3 space-y-1">
            {category.subcategories.map((s) => (
              <li key={s.slug} className="rounded-md px-3 py-2 text-sm text-muted">{s.name}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">Subcategory pages will be added when real products are loaded.</p>
        </aside>
        <div>
          {products.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => <li key={p.slug}><ProductCard product={p} categoryName={category.name} /></li>)}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center">
              <h2 className="font-sans text-lg font-semibold text-navy">Products in this category are being prepared</h2>
              <p className="mt-2 text-muted">Please send an enquiry and tell us what you are looking for.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/enquiry">Send Enquiry</ButtonLink>
                <ButtonLink href="/products" variant="secondary">Back to catalogue</ButtonLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
