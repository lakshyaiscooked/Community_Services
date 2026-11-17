import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { ContentRequired } from "@/components/ContentRequired";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getCategories, getProduct, getProducts, getRelatedProducts } from "@/lib/catalogue";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === product.categorySlug);
  const categoryName = category?.name ?? "Category";
  const related = await getRelatedProducts(product);

  return (
    <>
      <PageHeader
        title={product.name}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: categoryName, href: `/categories/${product.categorySlug}` },
          { label: product.name },
        ]}
      />
      <div className="container-page grid gap-10 py-10 lg:grid-cols-2">
        <div>
          <ImagePlaceholder ratio="1/1" label="Main product photo to be supplied" />
          <ul className="mt-3 grid grid-cols-4 gap-3" aria-label="Gallery placeholders">
            {[1, 2, 3, 4].map((n) => <li key={n}><ImagePlaceholder ratio="1/1" label={`Image ${n}`} compact /></li>)}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brass-dark">{categoryName} · {product.subcategoryName}</p>
          {product.isSample && (
            <p className="mt-3 w-fit rounded border border-dashed border-brass-dark px-2 py-0.5 text-xs font-medium text-brass-dark">
              Demo placeholder - not a real listing
            </p>
          )}
          <h2 className="mt-4 text-2xl font-semibold text-navy">Description</h2>
          <div className="mt-2">
            {product.shortDescription ? <p className="text-muted">{product.shortDescription}</p> : <ContentRequired block label="Approved product description" />}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={`/enquiry?product=${product.slug}`}>Send Enquiry</ButtonLink>
            {category?.section === "packaging" && (
              <ButtonLink href="/enquiry?type=packaging" variant="secondary">Request a Custom Packaging Quote</ButtonLink>
            )}
          </div>
          <div className="mt-8 rounded-md border border-dashed border-line p-4 text-sm text-muted">
            Template note: optional sections (features, specifications, applications, materials, variants) will appear here only when verified data exists. Empty sections stay hidden.
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="container-page pb-6">
          <SectionHeading title="Related products" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <li key={p.slug}><ProductCard product={p} categoryName={categoryName} /></li>)}
          </ul>
        </section>
      )}
    </>
  );
}
