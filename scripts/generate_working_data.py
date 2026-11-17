"""
Generates REVIEW files from the original workbook. The workbook is only READ, never modified.
Run from the project root:  python scripts/generate_working_data.py
Needs: pip install pandas openpyxl
Outputs (in data/):
  category_mapping_proposal.csv   - one row per original Main Category/Subcategory pair -> proposed new location
  catalogue_working_copy.csv      - all 98 products, original fields untouched + proposed category + review flags
"""
import pandas as pd

SRC = "data/source/Elegance_Asia_Master_Catalog_FINAL_ORIGINAL.xlsx"
products = pd.read_excel(SRC, sheet_name="Master Catalog", dtype=str)
cats = pd.read_excel(SRC, sheet_name="Categories", dtype=str)

HM, HW = "Healthcare & Medical", "Health, Hygiene & Wellness"
HA, KD = "Home & Kitchen Appliances", "Kitchen & Drinkware"
DL, EV = "Home Décor & Lighting", "Events & Entertainment"
FE, LG = "Festival Products", "Gifts, Fashion & Lifestyle"
FN, BI = "Food & Natural Products", "Business & Industrial Equipment"
PK, PR = "Packaging & Boxes", "Printing & Branding"

# (original main, original sub) -> (proposed main, proposed sub)
MAP = {
 ("Healthcare & Medical Equipment","Oxygen Concentrators"):(HM,"Oxygen Concentrators"),
 ("Healthcare & Medical Equipment","Respiratory Equipment"):(HM,"Respiratory Equipment"),
 ("Healthcare & Medical Equipment","Patient Monitoring"):(HM,"Patient Monitoring"),
 ("Healthcare & Medical Equipment","Thermometers"):(HM,"Thermometers"),
 ("Healthcare & Diagnostics","Diagnostic Test Kits"):(HM,"Diagnostic Test Kits"),
 ("Healthcare & Medical Supplies","Face Masks"):(HM,"Face Masks"),
 ("Healthcare & Medical Supplies","Medical Gloves"):(HM,"Medical Gloves"),
 ("Healthcare & Medical Supplies","Protective Equipment"):(HM,"Protective Equipment"),
 ("Healthcare & Hygiene","Dispensers"):(HW,"Dispensers"),
 ("Healthcare & Hygiene","Hand Wash & Sanitizing"):(HW,"Hand Wash & Sanitizing"),
 ("Healthcare & Wellness","Hot Water Bottles"):(HW,"Hot Water Bottles"),
 ("Healthcare & Wellness","Steam Vaporizers"):(HW,"Steam Vaporizers"),
 ("Home Appliances","Water Heating"):(HA,"Water Heating"),
 ("Home Appliances","Room Heating"):(HA,"Room Heating"),
 ("Home Appliances","Mosquito Control"):(HA,"Mosquito Control"),
 ("Kitchen Appliances","Electric Kettles"):(HA,"Electric Kettles"),
 ("Kitchen Appliances","Food Preparation Appliances"):(HA,"Food Preparation Appliances"),
 ("Kitchen Appliances","Weighing Scales"):(HA,"Weighing Scales"),
 ("Kitchen & Personal Appliances","Weighing Scales"):(HA,"Weighing Scales"),
 ("Personal Care Appliances","Hair Grooming"):(HA,"Hair Grooming"),
 ("Kitchen & Dining","Bottles & Drinkware"):(KD,"Bottles & Flasks"),
 ("Kitchen & Dining","Flasks & Drinkware"):(KD,"Bottles & Flasks"),
 ("Home & Decoration","Decorative Lighting"):(DL,"Decorative Lighting"),
 ("Home & Decoration","Diyas & Candle Decor"):(DL,"Diyas & Candle Decor"),
 ("Home & Decoration","Diyas & Decorative Lighting"):(DL,"Diyas & Candle Decor"),
 ("Home & Decoration","Pooja & Religious Decor"):(DL,"Pooja & Religious Decor"),
 ("Lighting & Electrical","Portable Lighting"):(DL,"Portable Lighting"),
 ("Events & Entertainment","Photo Booths"):(EV,"Photo Booths"),
 ("Events & Special Effects","Cold Pyro Equipment"):(EV,"Cold Pyro Equipment"),
 ("Events & Special Effects","Firework Machines"):(EV,"Firework Machines"),
 ("Events & Special Effects","Flame Effects"):(EV,"Flame Effects"),
 ("Events & Special Effects","Special Effects Machines"):(EV,"Special Effects Machines"),
 ("Festival Products","Fireworks"):(FE,"Fireworks"),
 ("Festivals & Events","Holi Products"):(FE,"Holi Products"),
 ("Fashion & Accessories","Hangers"):(LG,"Hangers"),
 ("Fashion & Bags","Handmade Bags"):(LG,"Handmade Bags"),
 ("Gifts, National & Promotional","Flags"):(LG,"Flags"),
 ("Lifestyle & Travel","Umbrellas"):(LG,"Umbrellas"),
 ("Personal Electronics","Smart Wearables"):(LG,"Smart Wearables"),
 ("Food & Confectionery","Chocolates"):(FN,"Chocolates"),
 ("Food & Natural Products","Organic Products"):(FN,"Organic Products"),
 ("Business Equipment","Cash Handling Equipment"):(BI,"Cash Handling Equipment"),
 ("Food & Beverage Equipment","Dispensing Equipment"):(BI,"Dispensing Equipment"),
 ("Industrial & Utility Equipment","Ventilation"):(BI,"Ventilation"),
 ("Industrial Safety","Safety Gloves"):(BI,"Safety Gloves"),
 ("Pest Control & Sanitation","Fogging Machines"):(BI,"Fogging Machines"),
 ("Packaging","Boxes"):(PK,"Boxes & Cartons"),
 ("Packaging","Corrugated Materials"):(PK,"Corrugated Materials"),
 ("Packaging","Paper Bags"):(PK,"Paper Bags"),
 ("Packaging","Paper Packaging Materials"):(PK,"Paper Packaging Materials"),
 ("Packaging","Adhesive Tapes"):(PK,"Packaging Tapes"),
 ("Packaging & Containers","Spray & Pump Bottles"):(PK,"Spray & Pump Bottles"),
 ("Packaging & Branding","Labels & Tags"):(PK,"Labels & Tags"),
 ("Packaging & Branding","Badges & Labels"):(PK,"Labels & Tags"),
 ("Printing & Branding","Printed Marketing Materials"):(PR,"Printed Marketing Materials"),
}

pairs = set(map(tuple, cats[["Main Category","Subcategory"]].values))
assert pairs == set(MAP), f"Mapping mismatch: {pairs ^ set(MAP)}"

counts = products.groupby(["Main Category","Subcategory"]).size()
rows = [{"original_main_category":a,"original_subcategory":b,
         "product_count":int(counts[(a,b)]),
         "proposed_main_category":MAP[(a,b)][0],"proposed_subcategory":MAP[(a,b)][1],
         "owner_decision":"PENDING"} for (a,b) in sorted(MAP)]
pd.DataFrame(rows).to_csv("data/category_mapping_proposal.csv", index=False, encoding="utf-8-sig")

REVIEW_SUB = {"Fireworks":"Fireworks: legal/safety review before publishing",
              "Firework Machines":"Fireworks/pyro: legal/safety review before publishing",
              "Cold Pyro Equipment":"Pyro effects: safety review before publishing",
              "Flame Effects":"Flame effects: safety review before publishing",
              "Organic Products":"Organic claim: certification not stated in source"}
out = []
for _, r in products.iterrows():
    pm, ps = MAP[(r["Main Category"], r["Subcategory"])]
    flags = []
    if pm == HM: flags.append("Medical product: regulatory/wording review before publishing")
    if ps in REVIEW_SUB: flags.append(REVIEW_SUB[ps])
    if r["Product ID"] == "EA-058": flags.append("Third-party brand name (Philips Respironics): permission needed")
    out.append({**r.to_dict(), "proposed_main_category":pm, "proposed_subcategory":ps,
                "review_flags":" | ".join(flags), "publish_status":"NOT_REVIEWED"})
pd.DataFrame(out).to_csv("data/catalogue_working_copy.csv", index=False, encoding="utf-8-sig")
print("OK:", len(products), "products;", len(MAP), "category pairs mapped")
