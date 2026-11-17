import type { Metadata } from "next";
import { EnquiryForm, type EnquiryType } from "@/components/EnquiryForm";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Send Enquiry" };

const TYPES: EnquiryType[] = ["product", "packaging", "printing", "general"];

export default async function EnquiryPage({ searchParams }: { searchParams: Promise<{ type?: string; product?: string; topic?: string }> }) {
  const sp = await searchParams;
  const type = TYPES.find((t) => t === sp.type) ?? (sp.product ? "product" : "general");
  const reference = (sp.product ?? sp.topic ?? "").slice(0, 120); // short, plain text only
  return (
    <>
      <PageHeader title="Send Enquiry" intro="Tell us what you need. Fields marked * are required." crumbs={[{ label: "Home", href: "/" }, { label: "Send Enquiry" }]} />
      <div className="container-page max-w-3xl py-10">
        <EnquiryForm defaultType={type} defaultReference={reference} />
      </div>
    </>
  );
}
