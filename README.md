# Shree Jee Enterprises - website (Phase 1: visual template)

Enquiry-only B2B catalogue website. **No prices, checkout or payments.**
Phase 1 is a front-end design template: no database, no login, no email. All sample products are demo placeholders.

## Run it on Windows (first time)
1. Install **Node.js LTS** from https://nodejs.org (accept the defaults). Restart your computer if asked.
2. Install **VS Code** (https://code.visualstudio.com) if you have not.
3. Unzip this project, then in VS Code choose **File > Open Folder** and pick the `shree-jee-enterprises-site` folder.
4. Open the terminal inside VS Code: **Terminal > New Terminal**.
5. Check Node works: `node -v` (should show v20 or higher).
6. Install the project's parts (needs internet, takes a few minutes): `npm install`
7. Start the preview: `npm run dev`
8. Open **http://localhost:3000** in your browser. Stop the preview any time with **Ctrl + C**.
9. Optional check before sharing: `npm run build` (builds the production version and checks the code for errors).

**If PowerShell says "running scripts is disabled":** in the VS Code terminal dropdown choose **Command Prompt** instead, and repeat the commands.

## Where things are
| Path | What it is |
|---|---|
| `src/app/` | The pages (home, products, packaging, printing, about, contact, enquiry) |
| `src/components/` | Reusable parts: header, footer, buttons, cards, form |
| `src/data/` | Proposed categories + demo sample products |
| `src/lib/catalogue.ts` | The only file pages use to get data. Later it will read from the database |
| `src/lib/site.ts` | Site name, menu, contact details (empty until you supply them) |
| `src/app/globals.css` | Colours and fonts |
| `data/source/` | Your original workbook, untouched |
| `data/category_mapping_proposal.csv` | Old category -> proposed category (for your review) |
| `data/catalogue_working_copy.csv` | All 98 products with original IDs, names and descriptions + review flags |
| `docs/CATEGORY_PROPOSAL.md` | Plain-English category proposal |

## Rules in this template
Anything not supplied by the owner shows **[CONTENT REQUIRED]**. Demo cards are labelled "Demo placeholder". The site is set to **noindex** (hidden from Google) until launch.
