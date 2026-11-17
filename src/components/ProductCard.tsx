import Link from "next/link";
import type { Product } from "@/types/catalogue";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { ButtonLink } from "./Button";

export function ProductCard({ product, categoryName }: { product: Product; categoryName: string }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white">
      <ImagePlaceholder ratio="4/3" className="rounded-none border-0 border-b" />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass-dark">{categoryName}</p>
        <h3 className="mt-1 text-lg font-semibold text-navy">
          <Link href={`/products/${product.slug}`} className="hover:underline">{product.name}</Link>
        </h3>
        <p className="mt-1 text-sm text-muted">{product.subcategoryName}</p>
        <p className="mt-3 flex-1 text-sm text-muted">
          {product.shortDescription ?? "Approved product description to be added."}
        </p>
        {product.isSample && (
          <p className="mt-3 w-fit rounded border border-dashed border-brass-dark px-2 py-0.5 text-xs font-medium text-brass-dark">
            Demo placeholder - not a real listing
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <ButtonLink href={`/products/${product.slug}`} variant="secondary" size="sm">View Product</ButtonLink>
          <ButtonLink href={`/enquiry?product=${product.slug}`} size="sm">Send Enquiry</ButtonLink>
        </div>
      </div>
    </article>
  );
}
