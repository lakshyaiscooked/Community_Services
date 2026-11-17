import type { Metadata } from "next";
import { ContentRequired } from "@/components/ContentRequired";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "About Us" };

const blocks = [
  ["Company introduction", "Short factual introduction to Shree Jee Enterprises"],
  ["What we offer", "Verified summary of product ranges and services"],
  ["Our partners", "Approved wording about partners such as MR Print"],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Us" crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      <div className="container-page grid gap-8 py-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          {blocks.map(([title, label]) => (
            <section key={title}>
              <h2 className="text-2xl font-semibold text-navy">{title}</h2>
              <div className="mt-3"><ContentRequired block label={label} /></div>
            </section>
          ))}
        </div>
        <aside className="h-fit rounded-lg border border-line bg-white p-5 text-sm text-muted">
          <h2 className="font-sans text-base font-semibold text-navy">Template note</h2>
          <p className="mt-2">No company history, certifications, client names, locations or capabilities are shown. Each block is filled only with facts supplied and approved by the owner.</p>
        </aside>
      </div>
    </>
  );
}
