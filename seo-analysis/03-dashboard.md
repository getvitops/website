# /dashboard: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-26. Volumes are monthly searches in Canada.

## Role and verdict

This is the differentiator page, not a search-traffic page. The searches around it are tiny, and
the pages that rank for the biggest one belong to software companies we cannot out-rank. Its job
is to turn visitors from the pillar pages into enquiries and to be quotable when someone asks
"what is a business health dashboard". So the analysis recommends a light touch: fix the title
and meta, make the page easy to understand, and put the effort into links from other pages.

## Keyword targets

| Keyword                         | Volume | KD  | CPC    | Role                                                                |
| ------------------------------- | ------ | --- | ------ | ------------------------------------------------------------------- |
| marketing dashboard             | 110    | 37  | $9.91  | Do not target. The top 10 is software vendors and example galleries |
| marketing roi                   | 170    | 40  | $3.29  | Better as a future article on `/resources`, not this page           |
| marketing reporting dashboard   | 20     | 0   | n/a    | Secondary, in the page body                                         |
| marketing analytics dashboard   | 20     | 0   | $9.83  | Secondary, in the page body                                         |
| marketing performance dashboard | 20     | 0   | $13.99 | Secondary, in the page body                                         |
| business health dashboard       | 10     | 0   | n/a    | **Brand term.** Own it; it is what the page is called               |
| what is a marketing dashboard   | 20     | n/a | n/a    | One-paragraph answer near the top                                   |

Everything past the first two rows is a 0 difficulty term with almost no volume, so it is
effectively free to rank for but will not bring meaningful traffic on its own.

## What ranks now (marketing dashboard)

Position 1 is `dashboardmarketing.ca`, then Geckoboard, Wrike, Improvado, Funnel, Klipfolio, Preset,
Dribbble, Zoho and Supermetrics. These are product pages and guides from analytics vendors with
large link profiles. Competing for that term would be a poor use of effort. The opportunity is
the angle they miss: **IT and software costs next to marketing results, for a small business that
has no analyst.** From their titles, none of the top ten appear to mix IT and marketing numbers (I did not open the pages).

## Current state

- Title: `Business Health Dashboard | Vitops`, so the brand term is already there.
- H1: "See your whole business in one place." Good, and it is the page's promise.
- About 1,010 words, a sample dashboard at the top, and a tool-logo row (QuickBooks, Zoho,
  HubSpot, Jobber, Google Analytics, Business Profile, Google Ads, Meta Ads).
- Only 3 internal links detected.

## Recommended changes, highest impact first

1. **Title and meta (medium).** Keep the brand term and add what it shows.
   - Title (53): `Business Health Dashboard for Small Business | Vitops`
   - Meta (132): `One dashboard for your marketing results, software costs and what needs attention. Updates on its own, in your Vitops client portal.`
   - A longer option, `Business Health Dashboard: IT and Marketing in One Place | Vitops`, is 65
     characters and would be cut off in results; avoid it.
2. **Link to it from both pillars and the pricing page (high).** The page converts; it needs
   visitors. Add a clear "See the dashboard" link from `/managed-it`, `/digital-marketing`,
   `/pricing` and the home page, using the anchor "Business Health Dashboard".
3. **Add one plain definition near the top (medium).** "A business health dashboard shows your
   marketing results, software costs and open IT requests in one place." Written once, it serves
   readers and AI answers for the `what is a marketing dashboard` family.
4. **Name the tools as text, not only logos (medium).** The tool row is a set of labels, but
   search engines and screen-reader users read text better than logos. Keep the labels, and add
   one sentence naming QuickBooks, Zoho, HubSpot, Jobber and Google tools in the paragraph.
5. **Structured data (low).** `BreadcrumbList` (Home > Business Health Dashboard). `SoftwareApplication`
   is not accurate for a service delivered through a portal, so skip it.
6. **Future content (low priority).** A blog post on `marketing roi` (170 searches, KD 40) written
   for small businesses would be the better target than this page. See `/resources`.

## Copy rewrites (proposed, not applied)

| Where           | Now                                                                                                                     | Proposed                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Lead            | Your sales, marketing and software numbers in one dashboard. It updates on its own, and it lives in your client portal. | A business health dashboard shows your marketing results, software costs and open IT requests in one place. It updates on its own and lives in your client portal. |
| Section heading | Three things, at a glance.                                                                                              | What the dashboard shows.                                                                                                                                          |
| Section heading | You shouldn't need five apps to know how business is going.                                                             | (keep, it is good)                                                                                                                                                 |

## Cannibalization

- `/dashboard` owns: business health dashboard, and the long tail around marketing reporting
  dashboards for small business.
- It should not target "managed IT" or "digital marketing" terms; those belong to the pillars.

## Open questions for you

- Answered: the dashboard is included when the plan is large enough (the pricing page says over
  $400 a month) or bought as an add-on. The dashboard page should say this in one sentence near
  the call to action, so a visitor knows whether they qualify. Suggested line: "Included with
  plans over $400 a month, or add it to any plan."
