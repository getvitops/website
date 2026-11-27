# /managed-it: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-26. Volumes are monthly searches in Canada.
Revised after the positioning facts in `00-positioning.md` (SaaS only, no hardware, no on-site).

## Role and verdict

Pillar for the software services and hub for the seven service pages. The first draft aimed at
"managed IT services Ottawa", which is mostly searched by people who want hardware, network and
on-site help. Vitops does not offer that, so those terms are the wrong target. The page should
be about **managing the cloud software a small business runs on**, and say so.

vitops.ca ranks for none of the terms below today, so every target is a fresh opportunity.

## Keyword targets

| Keyword                                 | Volume  | KD  | CPC          | Role                                           |
| --------------------------------------- | ------- | --- | ------------ | ---------------------------------------------- |
| microsoft 365 consultant                | 90      | 17  | $16.24       | **Primary**: matches the offer, low difficulty |
| microsoft 365 management                | 50      | n/a | $10.47       | Secondary                                      |
| managed saas / saas management services | 20 / 20 | 0   | $46.02 / n/a | Secondary: tiny but the exact description      |
| zoho consultant                         | 110     | 32  | $5.50        | Shared with `/software-selection-setup`        |
| crm consultant ottawa                   | 70      | 21  | n/a          | Shared with `/software-selection-setup`        |

Dropped as targets because of what they mean: `managed it services ottawa` (590), `it services
ottawa` (480), `outsourced it services` (390), `it company ottawa` (210), `msp ottawa` (50).
People searching these want hardware, network and on-site help.

The earlier SERP for `managed it services ottawa` shows why: every result is a managed service
provider that runs networks and devices, plus directories. Our page would be a mismatch.

## Current state

- Title: `Managed IT | Vitops`. H1: "Software that works for your team, not against it." (good).
- Kicker: "Managed IT for Ontario businesses". The words "managed IT" attract the wrong searches.
- About 1,250 words, 7 service cards and 7 software cards. The page already describes software
  selection, setup, connection, AI and licences, which is exactly the offer.
- Only 2 internal links detected in the page data.

## Recommended changes, highest impact first

1. **Title and meta (high).**
   - Title (47): `Business Software Management in Ottawa | Vitops`
   - Meta (153): `We choose, set up, connect and manage the cloud software your business runs on: Microsoft 365, Google Workspace, Zoho and QuickBooks. Ottawa and Ontario.`
2. **State the scope above the fold (high).** Kicker:
   `Cloud software management for small businesses in Ottawa and Ontario`. Add one plain
   sentence: "We work with cloud software only. We don't do hardware, networks or on-site
   visits." It filters out the wrong leads and sets Vitops apart.
3. **Name the vendors (high).** The lead should name the tools you implement, for example
   Microsoft 365, Google Workspace, Zoho, QuickBooks. Tool names are what buyers search.
4. **Link the cards (medium).** All 7 service cards and 7 software cards link to their pages
   with descriptive anchors, and each page links back using "Business software management".
5. **Add a price pointer (medium).** "Plans start at ... See pricing" linking to `/pricing`.
   `microsoft 365 consultant` buyers compare cost, and a solo owner needs to see they fit.
6. **Structured data (medium).** `Service` (service type: cloud software management, area served:
   Ontario) and `BreadcrumbList`. No `FAQPage` markup (no rich result since Google limited it
   to government and health sites).
7. **Source the statistics (low).** The licence-usage and software-regret figures need a cited
   source with a link.

## Copy rewrites (proposed, not applied)

| Where           | Now                                                                                                                                                                | Proposed                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kicker          | Managed IT for Ontario businesses                                                                                                                                  | Cloud software management for small businesses in Ottawa and Ontario                                                                                                  |
| Lead            | We help you choose the right software, set it up, and manage it with cost savings in mind. Your team works more efficiently, and your systems keep up as you grow. | We choose your software, set it up, connect it and keep it running, from Microsoft 365 and Google Workspace to Zoho and QuickBooks. We keep the bill low as you grow. |
| Section heading | Four steps, in the right order.                                                                                                                                    | How we work, one step at a time.                                                                                                                                      |
| Section heading | Seven services. One team.                                                                                                                                          | What we manage for you.                                                                                                                                               |

## Cannibalization

- `/managed-it` owns: microsoft 365 consultant and management, SaaS management.
- `/software-selection-setup` owns: the consultant and migration terms for Zoho, CRM, Microsoft
  365 and Google Workspace setup.
- `/support-vendor-management` owns: Microsoft 365 support and Google Workspace support.
- None of them should target "IT support" or "managed IT services".

## Open questions for you

- Should the visible name change from "Managed IT"? See `00-positioning.md`.
- Is there a starting price for the software management plan that can sit next to "See
  pricing"? The pricing page shows $15 a user with a $100 minimum, and $79 for the solo plan.
