// PROPOSED category structure (for owner review). Built from the original workbook's categories.
// See docs/CATEGORY_PROPOSAL.md and data/category_mapping_proposal.csv.
import { slugify } from "@/lib/slug";
import type { Category, Section } from "@/types/catalogue";

function make(name: string, section: Section, subs: string[], reviewRequired = false): Category {
  return {
    slug: slugify(name),
    name,
    section,
    reviewRequired,
    subcategories: subs.map((s) => ({ slug: slugify(s), name: s })),
  };
}

export const categories: Category[] = [
  make("Healthcare & Medical", "products",
    ["Oxygen Concentrators", "Respiratory Equipment", "Patient Monitoring", "Thermometers",
     "Diagnostic Test Kits", "Face Masks", "Medical Gloves", "Protective Equipment"], true),
  make("Health, Hygiene & Wellness", "products",
    ["Dispensers", "Hand Wash & Sanitizing", "Hot Water Bottles", "Steam Vaporizers"]),
  make("Home & Kitchen Appliances", "products",
    ["Water Heating", "Room Heating", "Mosquito Control", "Electric Kettles",
     "Food Preparation Appliances", "Weighing Scales", "Hair Grooming"]),
  make("Kitchen & Drinkware", "products", ["Bottles & Flasks"]),
  make("Home Décor & Lighting", "products",
    ["Decorative Lighting", "Diyas & Candle Decor", "Pooja & Religious Decor", "Portable Lighting"]),
  make("Events & Entertainment", "products",
    ["Photo Booths", "Cold Pyro Equipment", "Firework Machines", "Flame Effects", "Special Effects Machines"], true),
  make("Festival Products", "products", ["Fireworks", "Holi Products"], true),
  make("Gifts, Fashion & Lifestyle", "products",
    ["Hangers", "Handmade Bags", "Flags", "Umbrellas", "Smart Wearables"]),
  make("Food & Natural Products", "products", ["Chocolates", "Organic Products"], true),
  make("Business & Industrial Equipment", "products",
    ["Cash Handling Equipment", "Dispensing Equipment", "Ventilation", "Safety Gloves", "Fogging Machines"]),
  make("Packaging & Boxes", "packaging",
    ["Boxes & Cartons", "Corrugated Materials", "Paper Bags", "Paper Packaging Materials",
     "Packaging Tapes", "Spray & Pump Bottles", "Labels & Tags"]),
  make("Printing & Branding", "printing", ["Printed Marketing Materials"]),
];
