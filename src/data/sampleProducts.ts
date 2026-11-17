// DEMO-ONLY placeholder products so the layouts can be judged.
// These are NOT catalogue data and must never be imported or published as real products.
import { slugify } from "@/lib/slug";
import type { Product } from "@/types/catalogue";

const demo = (n: number, category: string, sub: string): Product => ({
  slug: `sample-product-${String(n).padStart(2, "0")}`,
  name: `Sample Product ${String(n).padStart(2, "0")}`,
  categorySlug: slugify(category),
  subcategoryName: sub,
  shortDescription: null,
  isSample: true,
});

export const sampleProducts: Product[] = [
  demo(1, "Home & Kitchen Appliances", "Electric Kettles"),
  demo(2, "Home & Kitchen Appliances", "Room Heating"),
  demo(3, "Home Décor & Lighting", "Decorative Lighting"),
  demo(4, "Kitchen & Drinkware", "Bottles & Flasks"),
  demo(5, "Business & Industrial Equipment", "Cash Handling Equipment"),
  demo(6, "Gifts, Fashion & Lifestyle", "Hangers"),
  demo(7, "Packaging & Boxes", "Boxes & Cartons"),
  demo(8, "Packaging & Boxes", "Corrugated Materials"),
  demo(9, "Packaging & Boxes", "Packaging Tapes"),
  demo(10, "Packaging & Boxes", "Labels & Tags"),
  demo(11, "Printing & Branding", "Printed Marketing Materials"),
  demo(12, "Events & Entertainment", "Photo Booths"),
];
