# Sitewide SEO findings (vitops.ca)

Sources: this repo (seed/seed.json, src/layouts/Layout.astro, src/pages/*), Semrush (database `ca`, project 30789493, audit snapshot of 2026-11-12). Semrush crawled the **currently live site**, which uses different URLs from this build. Audit results describe the old site, not this code.

## Semrush snapshot

| Metric                                          | Value                                                                                                                                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Semrush Rank                                    | 8,252,726                                                                                                                                                                            |
| Organic keywords (Canada)                       | 2 (`dmap grant` at position 20 on `/funding/dmap`; `upzoids` at 54 on `/business-software`, irrelevant)                                                                              |
| Organic traffic                                 | 0                                                                                                                                                                                    |
| Backlinks / referring domains / Authority Score | 50 / 3 / 2                                                                                                                                                                           |
| Site Audit health                               | 97 on 37 pages: 1 error (https://www.vitops.ca/ returns 5xx), 10 warnings (low text to HTML ratio), 12 notices (no HSTS, 9 links with no anchor text, 1 page with one internal link) |
| Structured data found                           | Schema.org: 0 pages. Open Graph and Twitter cards: 29 pages                                                                                                                          |

Keyword demand (Canada): seo ottawa 1,300 (KD 46); seo services ottawa 1,300 (KD 34); web design ottawa 1,300 (KD 40); website design ottawa 1,000 (KD 57); managed it services ontario 720 (KD 15); digital marketing ottawa 720 (KD 25); managed it services ottawa 480 (KD 19); it support ottawa 480 (KD 22); it services for small business 480 (KD 7); it support for small business 480 (KD 11, CPC $13.65); digital marketing agency ottawa 480 (KD 50); social media management ottawa 260 (KD 17); google business profile optimization 260 (KD 60); dmap grant 70 (KD 18). Several of these have KD under 25, which is winnable for a new site with a good page.

## Sitewide changes, highest impact first

1. **Per-page title and meta description (every page).** [src/layouts/Layout.astro](../../src/layouts/Layout.astro) builds `title — Vitops` from the page title and falls back to one default description for all pages. [src/pages/index.astro](../../src/pages/index.astro) passes `description={title}`, so the homepage meta description is literally "Home" and its title is just "Vitops". The `pages` collection has no SEO fields in the seed. Add `seo_title` and `seo_description` (or enable EmDash per-entry SEO if the collection supports it), pass them through `[...slug].astro` and `index.astro`, and fill all 32 pages. Titles 50 to 60 characters, descriptions 140 to 155.
2. **301 redirects from old URLs.** No redirect file exists in `public/`. The old site's URLs (seen in Semrush) do not exist in this build: `/web-design-ottawa`, `/digital-marketing-agency-ottawa`, `/managed-it-services/{crm,invoicing,hris,communication,productivity,job-tracking}-software`, `/funding/dmap`, `/business-software`, `/cookies`. Add `public/_redirects` (or Worker redirects) mapping each to its new page. The only ranking keyword (`dmap grant`) lives on `/funding/dmap`.
3. **Fix `www.vitops.ca`.** Semrush got a 5xx on `https://www.vitops.ca/`. Add a 301 from www to the apex in Cloudflare; confirm canonical is always `https://vitops.ca/...`.
4. **Structured data.** None in the layout. Add JSON-LD: `Organization` + `LocalBusiness` (ProfessionalService) sitewide, `Service` on service pages, `BreadcrumbList` on every non-home page, `FAQPage` where an FAQ block exists. Ottawa-based service business: the local signals matter.
5. **Local entity signals.** Put the same name, address or service area, and phone in the footer, /contact and Google Business Profile. Link `sameAs` profiles. Add `LocalBusiness` hours (Mon to Fri 9 to 6 ET).
6. **Internal linking.** Most service and software pages link out to one URL (the hub). Add contextual links between siblings, to /pricing and to /estimate with descriptive anchors; add breadcrumbs.
7. **Off-page.** 3 referring domains, Authority Score 2. Build citations (Ottawa Board of Trade, Chamber, Digital Main Street, vendor partner directories for Zoho, Microsoft, HubSpot), claim and complete the Google Business Profile, and earn links from DMAP-related funding resources.
8. **Content gaps.** Heads-up: every page is a service or software page. Nothing targets informational queries (how much does managed IT cost, DMAP grant eligibility, Microsoft 365 backup). The nav shows a draft `/resources` item; ship 6 to 8 articles aimed at the KD under 25 terms.
9. **Technical hygiene.** Add HSTS (Semrush notice; set in `public/_headers`), give every link visible text or `aria-label`, set `llms.txt`, confirm the sitemap URL (`/sitemap-index.xml` in robots.txt returned "Collection not found or empty" when fetched from the live host), and confirm the dev worker keeps `noindex` (site.json already sets it).
10. **Images.** Replace `src/assets/placeholder/` with real imagery, with descriptive `alt` text and an OG image per page (only the default exists).

## Caveats

- Semrush data is for the old live site; re-run the Site Audit after launch.
- Keyword volumes come from Semrush's Canada database and are estimates. Pages marked "validate" had no volume pulled.
- Code review was of the seed and templates, not the built HTML. Check `<h1>` on the home and legal pages in the build.

## Revision: Ottawa-first geo policy and tracked keywords (supersedes keyword and title lines above)

Keyword source is now the vitops.ca Semrush Position Tracking campaign (83 keywords, Google, Ottawa, desktop), not my own list. Volumes are Ottawa-local and lower than the Canada-wide figures above. Non-brand rankings: none. Brand terms rank 1 to 2, except `vitops ontario` at 35.

Ottawa is the starting market, not the limit.

- **Tier A (Ottawa in title and H1 or subhead):** home, /managed-it, /digital-marketing, /websites, /seo-ai-search, /support-vendor-management, /social-media, /business-profiles, /about, /contact. These match tracked Ottawa terms.
- **Tier B (geo-neutral title; Ontario and Canada in body):** pricing, funding, ads, industries, dashboard, estimate, ai, reviews, connected, joining, licences, backup, and all 7 software pages. No Ottawa term in titles, so they can rank beyond Ottawa.
- **Schema:** `address` Ottawa; `areaServed` Ontario and Canada.
- **Expanding later:** add a city or region page (e.g. Toronto) only with real local content, once Ottawa pages rank. No near-duplicate city pages.
- **Campaign gaps:** add keywords for backup and security, AI for small business, GBP, review management, quote and invoice software, and non-geo `managed it services pricing`.
