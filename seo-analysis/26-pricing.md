# /pricing: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-27. Volumes are monthly searches in Canada.
**The plan structure is still being decided** (`../pricing-model-pros-cons.md`). Titles and metas
below avoid specific prices so they stay true whatever you choose.

## Role and verdict

The highest-intent page on the site, and one that can actually rank. The top results for
"digital marketing packages" are real package and pricing pages, so a clear public price page
is the right format and difficulty is low (13).

## Keyword data

| Keyword                               | Volume | KD  | CPC    | Role                                                           |
| ------------------------------------- | ------ | --- | ------ | -------------------------------------------------------------- |
| seo packages                          | 880    | 32  | $4.78  | Informational: use "SEO" in the package wording                |
| seo pricing                           | 210    | 52  | $3.03  | Navigational/hard: supporting                                  |
| website design pricing                | 170    | 46  | $2.79  | Supporting                                                     |
| digital marketing packages            | 110    | 13  | n/a    | **Primary**: low difficulty, and the results are package pages |
| managed it services pricing           | 110    | 12  | n/a    | See note below                                                 |
| website maintenance cost              | 110    | 26  | $2.96  | Better as a blog post (see below)                              |
| social media management pricing       | 70     | 32  | $2.95  | Supporting                                                     |
| managed it services cost              | 50     | n/a | n/a    | See note below                                                 |
| marketing packages for small business | 50     | n/a | $3.67  | Supporting                                                     |
| digital marketing pricing             | 30     | n/a | $2.81  | Supporting                                                     |
| google ads management pricing         | 20     | n/a | $22.04 | Supporting                                                     |

**Note on "managed IT" pricing searches.** Those searches (`managed it services pricing`, `cost`)
come from people comparing providers that run devices and networks. Your software management
plan is a different thing. Use "software management" wording on the page, not "managed IT
services", so the page is not matched with searches it cannot satisfy.

## What ranks now

- **digital marketing packages:** package and pricing pages from agencies (MRKT360, SetSail,
  Rocket Volpe, Storyteller Media), a pricing guide, GoDaddy, a Facebook page and a Reddit
  thread. Real package pages occupy the top spots.
- **website maintenance cost:** guides and blog posts (GoDaddy, Wix, CanSpace, Fiverr, Network
  Solutions, Hostinger), plus a Reddit thread. That is blog content, not a pricing page.

## Current state

- Title: `Pricing | Vitops`. H1: "Simple pricing. No long contracts." (good).
- Meta: the site tagline.
- Covers: a per-user software plan, backup and faster-response add-ons, six marketing services
  with prices, three website plans, three packages (Launch, Small Team, Growing Team), funding
  and a quote form. Prices and the cost estimator must stay in step.

## Recommended changes, highest impact first

1. **Title and meta (high).**
   - Title (57): `Pricing: Digital Marketing Packages and Software | Vitops`
   - Meta (149): `Month-to-month pricing for software management, websites and digital marketing, with packages for solo owners and teams. Cancel with 30 days' notice.`
2. **Use "packages" in the package section (high).** It is already called "Packages for every
   stage"; add "digital marketing packages" and "SEO packages" to the wording around the
   Small Team and Growing Team packages so they match the searches.
3. **Keep prices public (high).** The ranking pages do the same. Show what is included, the
   setup fee next to each monthly price, and what is extra (ad spend, for example), so the
   total is clear before anyone gets in touch.
4. **Add a short cost FAQ as visible copy (medium).** "How much does it cost?", "Is there a
   contract?", "What does the setup fee cover?", "Is ad spend extra?". No `FAQPage` markup.
5. **Link to the service pages from each price (medium).** Every plan and service links to its
   page ("Websites", "SEO and AI search", "Social media").
6. **State the dashboard rule in the plan (medium).** The page says it is included over a
   threshold; put the same sentence on the dashboard page so they agree.
7. **Structured data (later).** Do not add `Offer` markup until the plan structure and prices are
   final, because wrong prices in structured data are worse than none.

## Content ideas that feed this page

The cost searches below suit short articles on `/resources`, each linking to `/pricing`:

| Idea                                              | Search it targets                   | Volume    |
| ------------------------------------------------- | ----------------------------------- | --------- |
| What website maintenance really costs in Canada   | website maintenance cost            | 110       |
| What digital marketing costs for a small business | digital marketing cost, packages    | 110       |
| How much SEO costs, and what is in a package      | seo packages / seo pricing          | 880 / 210 |
| What managed software costs, per person           | (no tracked volume; for AI answers) | n/a       |

These need to be accurate and use your real numbers.

## Copy rewrites (proposed, not applied)

| Where           | Now                        | Proposed                                                     |
| --------------- | -------------------------- | ------------------------------------------------------------ |
| Section kicker  | Managed IT                 | Software management                                          |
| Section heading | One plan, priced per user. | (decide after the pricing model; see the pros and cons file) |
| Section heading | Packages for every stage.  | (keep)                                                       |

## Cannibalization

Owns pricing and package wording. The service pages describe the service and link here; they
should not carry price tables of their own beyond a "from" line.

## Open questions for you

- Which pricing model are you choosing? The title and meta do not depend on it, but the
  headings, estimator and any structured data do.
- Should the cost articles go on the blog index once it exists?
