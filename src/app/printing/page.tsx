import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { ContentRequired } from "@/components/ContentRequired";
import { PageHeader } from "@/components/PageHeader";
import { ProvisionalNote } from "@/components/ProvisionalNote";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Printing & Branding" };

export default function PrintingPage() {
  return (
    <>
      <PageHeader title="Printing & Branding" crumbs={[{ label: "Home", href: "/" }, { label: "Printing & Branding" }]} />
      <div className="container-page space-y-12 py-10">
        <ProvisionalNote title="Provisional page - not for launch yet">
          MR Print is a confirmed printing partner. The exact services, finishes and capabilities have not been confirmed, so none are listed here. Nothing about MR Print is claimed beyond its name until the owner supplies approved wording.
        </ProvisionalNote>

        <section aria-labelledby="partner-h" className="rounded-lg border border-line bg-white p-6 sm:p-8">
          <h2 id="partner-h" className="text-2xl font-semibold text-navy">Printing partner</h2>
          <p className="mt-2 text-muted">Shree Jee Enterprises works with <strong className="text-ink">MR Print</strong> for printing.</p>
          <div className="mt-4"><ContentRequired block label="Approved description of MR Print and the relationship (wording to be confirmed by the owner)" /></div>
        </section>

        <section aria-labelledby="svc-h">
          <SectionHeading id="svc-h" title="Services" intro="Confirmed services will appear here as individual cards." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <li key={n} className="rounded-lg border border-dashed border-brass-dark bg-white p-5">
                <h3 className="text-lg font-semibold text-navy">Service {n}</h3>
                <p className="mt-2 text-sm text-brass-dark">[CONTENT REQUIRED] Service name, factual description and applications</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/enquiry?type=printing">Send a Printing Enquiry</ButtonLink>
        </div>
      </div>
    </>
  );
}
