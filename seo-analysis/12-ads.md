# /ads: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-26. Volumes are monthly searches in Canada.

## Role and verdict

Marketing sub-service. **Geo tier B:** the local searches have almost no volume, so the title is
geo-neutral and Ontario and Canada appear in the body. The terms that do have volume are among
the most expensive on Google (a $111 click for `google ads management`), which tells you buyers
exist but also that agencies and software companies compete hard. This page's real asset is
the argument: "we don't work for Google or Facebook" and a flat monthly fee, with ad spend
billed without markup. That should lead.

## Keyword data

| Keyword                       | Volume | KD  | CPC     | Role                                                       |
| ----------------------------- | ------ | --- | ------- | ---------------------------------------------------------- |
| google ads management         | 1,300  | 63  | $111.06 | Secondary: very hard                                       |
| google ads for small business | 70     | 45  | $193.16 | **Primary**: matches the audience, the highest-value click |
| meta ads management           | 70     | 58  | $17.54  | Secondary                                                  |
| google ads agency ottawa      | 40     | 0   | n/a     | Supporting; too small to score                             |
| facebook ads ottawa           | 30     | 0   | n/a     | Supporting                                                 |
| google ads ottawa             | 20     | 0   | $26.07  | Supporting                                                 |
| ppc management small business | 10     | 0   | n/a     | Skip                                                       |

The existing tracking shows 0 volume for `ppc management ottawa` and `google ads management
ottawa`, which agrees: local searches here are not worth a geo title.

## Current state

- Title: `Ads | Vitops`. H1: "Ads that bring in jobs, not just clicks." (good).
- The flat-fee argument is the strongest section ("Some agencies earn more when you spend more.
  We don't."), which is also a differentiator for the whole site.

## Recommended changes, highest impact first

1. **Title and meta (high).**
   - Title (58): `Google and Meta Ads Management for Small Business | Vitops`
   - Meta (132): `Google and Meta ads managed for a flat monthly fee, so we earn from results, not your ad spend. For small businesses across Ontario.`
2. **Lead with the flat-fee point (medium).** It answers the question buyers ask first and is
   rare in this market. Keep the claim exactly as true as the pricing page: $500 a month plus ad
   spend with no markup.
3. **Use "Google Ads" and "Meta ads" in headings (medium).** The page says "Google and Facebook";
   searchers type both "facebook ads" and "meta ads", so mention Meta once beside Facebook and
   Instagram.
4. **Show what is reported (medium).** One or two lines on the monthly review and what the
   client sees (spend, leads, jobs), linking to `/dashboard`.
5. **Link up (medium).** From `/digital-marketing`; link to `/seo-ai-search` ("ads and SEO
   together") and to `/pricing`.
6. **Structured data (low).** `Service` plus `BreadcrumbList`.

## Copy rewrites (proposed, not applied)

| Where           | Now                                   | Proposed                                 |
| --------------- | ------------------------------------- | ---------------------------------------- |
| Kicker          | Google and Facebook ads               | Google and Meta ads for small businesses |
| Section heading | We don't work for Google or Facebook. | We work for you, not for Google or Meta. |

## Cannibalization

Owns Google Ads and Meta ads wording. Must not target SEO or "digital marketing".
