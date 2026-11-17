import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-page py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brass-dark">Error 404</p>
      <h1 className="mt-3 text-4xl font-semibold text-navy">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">The page you are looking for may have moved or may not exist.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Go to homepage</ButtonLink>
        <ButtonLink href="/products" variant="secondary">Browse products</ButtonLink>
      </div>
    </section>
  );
}
