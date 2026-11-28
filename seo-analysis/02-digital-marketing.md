# /digital-marketing: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-26. Volumes are monthly searches in Canada.

## Role and verdict

Pillar for marketing and hub for the six marketing pages. The broad "digital marketing" terms are
competitive and mixed in intent, so this page should win on the small-business and Ottawa angle
and push the specific, higher-volume searches (SEO, web design, social media, local listings) to
the service pages that match them.

vitops.ca ranks for none of these terms today.

## Keyword targets

| Keyword                              | Volume | KD  | CPC   | Role                                                                |
| ------------------------------------ | ------ | --- | ----- | ------------------------------------------------------------------- |
| digital marketing ottawa             | 720    | 25  | $5.41 | **Primary**                                                         |
| digital marketing for small business | 320    | 7   | $5.83 | Secondary, the quickest win (very low difficulty)                   |
| digital marketing agency ottawa      | 480    | 50  | $5.26 | Stretch                                                             |
| marketing agency ottawa              | 390    | 61  | $3.03 | Not a target (hard, 0.84 competition, agencies with years of links) |

Moved to the service pages, where the volume is better:

| Keyword                                   | Volume        | KD      | Page                 |
| ----------------------------------------- | ------------- | ------- | -------------------- |
| seo ottawa / seo services ottawa          | 1,300 / 1,300 | 46 / 34 | `/seo-ai-search`     |
| web design ottawa / website design ottawa | 1,300 / 1,000 | 40 / 57 | `/websites`          |
| local seo ottawa                          | 590           | 16      | `/business-profiles` |
| google business profile optimization      | 260           | 60      | `/business-profiles` |
| social media management ottawa            | 260           | 17      | `/social-media`      |
| ppc ottawa / google ads management ottawa | 70 / 70       | 8 / 0   | `/ads`               |

## What ranks now (digital marketing ottawa)

The results page is mixed: a Reddit thread, an Algonquin College course, two job boards, a
directory (Clutch) and a handful of agencies (WebMarketers, MediaForce, MarketingMate,
MarketingBlendz). Because jobs, courses and forums fill half the page, Google is unsure whether
people want a provider, so the commercial results are a minority and the page that wins is the
one that is clearest about being a service for businesses. One agency page
(`marketingmate.ca/digital-marketing-ottawa-small-business/`) is built exactly around the small
business angle, which confirms the framing.

## Current state

- Title: `Digital Marketing | Vitops`. No target term.
- H1: "Help more customers find you and choose you." Good brand voice; no service name or place.
- Kicker: "Digital marketing for Ontario businesses". "Ottawa" is not on the page above the fold.
- About 1,190 words. The six service cards and the "price from $100 a month" line are strong
  conversion content.
- Only 3 internal links detected in the page data.

## Recommended changes, highest impact first

1. **Title and meta (high).**
   - Title (57): `Digital Marketing for Small Businesses in Ottawa | Vitops`
   - Meta (145): `Websites, ads, SEO, business profiles and social media for small businesses in Ottawa and Ontario, from one team. Services start at $100 a month.`
2. **Say it above the fold (high).** Keep the H1. Change the kicker to
   `Digital marketing for small businesses in Ottawa and Ontario`, and name the six services in
   the lead sentence.
3. **Link every service card and use the search wording as the anchor (high).** Each card links
   to its page: "Websites", "Ads", "SEO and AI search", "Business profiles", "Social media",
   "Reviews and email campaigns". Add a link back from each service page labelled
   "Digital marketing". This is what lets the service pages carry the bigger SEO and web design
   volumes without the pillar competing with them.
4. **Keep the price line (medium).** "Services start at $100 a month" is a differentiator that
   most agency pages hide. Keep it above the fold or near the cards and link it to `/pricing`.
5. **Add a short "what does a digital marketing agency do for a small business" answer
   (medium).** The related questions are small (10 to 30 searches each) but they are the
   questions buyers ask; one plain paragraph answers them and gives AI search something to quote.
6. **Structured data (medium).** `Service` (areaServed Ottawa and Ontario) and `BreadcrumbList`
   (Home > Digital Marketing). No `FAQPage` markup, as it earns no rich result.
7. **Source the statistics (low).** The "15 hours a week" and "not sure marketing is working"
   figures need a cited source and link.

## Copy rewrites (proposed, not applied)

| Where           | Now                                                                                                                                                            | Proposed                                                                                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kicker          | Digital marketing for Ontario businesses                                                                                                                       | Digital marketing for small businesses in Ottawa and Ontario                                                                                                   |
| Lead            | We manage your website, search, ads, Google listing and social media. One team keeps it all working together, so more of the people who find you get in touch. | We run your website, search, ads, Google listing and social media from one team, so the people who find you can reach you and the jobs come back to one place. |
| Section heading | Six services. One team.                                                                                                                                        | What we run for you.                                                                                                                                           |
| Section heading | Customers check you out in more than one place.                                                                                                                | Where customers look before they call.                                                                                                                         |

Note: the original "Ads are only the start." heading is fine as it is.

## Cannibalization

- `/digital-marketing` owns: digital marketing ottawa, digital marketing for small business.
- The six service pages own the specific terms in the second table. None of them should target
  "digital marketing" on its own.
- `/pricing` should not target any marketing keyword; it supports conversion only.

## Open questions for you

- Do you want to chase `digital marketing agency ottawa` (480, KD 50) later with a case study or
  a testimonial section? It needs proof (named clients, results) more than keywords.
- Is "services start at $100 a month" confirmed for every marketing service, or only the entry
  one? The meta repeats it.
