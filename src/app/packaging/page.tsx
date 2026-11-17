import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { ProvisionalNote } from "@/components/ProvisionalNote";
import { SectionHeading } from "@/components/SectionHeading";
import { getCategory, getProductsByCategory } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Packaging & Boxes" };

export default async function PackagingPage() {
  const category = await getCategory("packaging-and-boxes");
  const products = await getProductsByCategory("packaging-and-boxes");
  const subs = category?.subcategories ?? [];

  return (
    <>
      <PageHeader
        title="Packaging & Boxes"
        intro="Packaging for your products. Send your requirement to request a custom packaging quote."
        crumbs={[{ label: "Home", href: "/" }, { label: "Packaging & Boxes" }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/enquiry?type=packaging">Request a Custom Packaging Quote</ButtonLink>
        </div>
      </PageHeader>
      <div className="container-page space-y-14 py-10">
        <ProvisionalNote>
          The packaging types below come from the supplied catalogue and are shown for layout review. Offerings, materials, sizes and options will be published only after the owner confirms them.
        </ProvisionalNote>
        <section aria-labelledby="pk-types">
          <SectionHeading id="pk-types" title="Packaging types" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subs.map((s) => (
              <li key={s.slug} className="flex flex-col rounded-lg border border-line bg-white p-5">
                <span aria-hidden="true" className="mb-3 block h-1 w-10 bg-brass" />
                <h3 className="text-lg font-semibold text-navy">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">Details to be confirmed.</p>
                <div className="mt-4"><ButtonLink href={`/enquiry?type=packaging&topic=${encodeURIComponent(s.name)}`} variant="secondary" size="sm">Enquire</ButtonLink></div>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="pk-samples">
          <SectionHeading id="pk-samples" title="Sample layout: packaging product cards" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => <li key={p.slug}><ProductCard product={p} categoryName="Packaging & Boxes" /></li>)}
          </ul>
        </section>
        <section className="on-dark rounded-lg bg-navy px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-semibold">Need something specific?</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/85">Describe the packaging you need and send it as an enquiry.</p>
          <div className="mt-5 flex justify-center"><ButtonLink href="/enquiry?type=packaging" variant="accent">Request a Custom Packaging Quote</ButtonLink></div>
        </section>
      </div>
    </>
  );
}
