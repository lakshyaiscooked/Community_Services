import type { Metadata } from "next";
import { ContentRequired } from "@/components/ContentRequired";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const rows: [string, string | null][] = [
    ["Phone", site.contact.phone],
    ["Email", site.contact.email],
    ["Address", site.contact.address],
    ["Business hours", site.contact.hours],
  ];
  return (
    <>
      <PageHeader title="Contact" intro="Get in touch or send an enquiry using the form." crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <section aria-labelledby="details-h" className="rounded-lg border border-line bg-white p-6">
            <h2 id="details-h" className="text-xl font-semibold text-navy">Contact details</h2>
            <dl className="mt-4 space-y-4 text-sm">
              {rows.map(([label, value]) => (
                <div key={label}>
                  <dt className="font-semibold text-navy">{label}</dt>
                  <dd className="mt-1 text-muted">{value ?? <ContentRequired />}</dd>
                </div>
              ))}
            </dl>
          </section>
          <div className="rounded-lg border border-dashed border-line p-6 text-sm text-muted">
            Map: to be added only after the exact business location is supplied and approved.
          </div>
        </div>
        <section aria-labelledby="form-h">
          <h2 id="form-h" className="mb-4 text-xl font-semibold text-navy">Send an enquiry</h2>
          <EnquiryForm defaultType="general" />
        </section>
      </div>
    </>
  );
}
