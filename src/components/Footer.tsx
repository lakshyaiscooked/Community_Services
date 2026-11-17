import Link from "next/link";
import { site } from "@/lib/site";
import { ContentRequired } from "./ContentRequired";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="on-dark mt-16 bg-navy text-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Wordmark light />
          <p className="mt-4 max-w-xs text-sm text-white/80">
            Product catalogue and enquiry website. Please send an enquiry for product and packaging requirements.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-brass-light">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}><Link href={item.href} className="underline-offset-4 hover:underline">{item.label}</Link></li>
            ))}
            <li><Link href="/enquiry" className="underline-offset-4 hover:underline">Send Enquiry</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-brass-light">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/90">
            <li>Phone: {site.contact.phone ?? <ContentRequired />}</li>
            <li>Email: {site.contact.email ?? <ContentRequired />}</li>
            <li>Address: {site.contact.address ?? <ContentRequired />}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-page py-4 text-xs text-white/70">
          © {new Date().getFullYear()} Shree Jee Enterprises. Privacy Policy and Terms of Use pages to be added before launch.
        </div>
      </div>
    </footer>
  );
}
