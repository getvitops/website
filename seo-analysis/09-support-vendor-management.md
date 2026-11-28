# /support-vendor-management: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-26. Terms not listed returned no volume.
Revised after the positioning facts in `00-positioning.md` (SaaS only, no hardware, no on-site).

## Role and verdict

Managed software sub-service. **Geo tier A in the first draft; now geo-neutral.** The first draft
aimed at "IT support Ottawa", but that search is for on-site and device support, and half its
results are job boards. Vitops supports cloud software remotely, so the page should target the
software-specific support terms instead.

## Keyword targets

| Keyword                    | Volume | KD  | CPC    | Role                                                     |
| -------------------------- | ------ | --- | ------ | -------------------------------------------------------- |
| google workspace support   | 210    | 49  | $5.47  | **Primary**: matches the offer                           |
| microsoft 365 support      | 210    | 61  | $3.29  | Secondary: hard, vendor and documentation pages dominate |
| it vendor management       | 70     | 26  | $16.11 | Supporting: the page's second half                       |
| vendor management services | 40     | 0   | $9.36  | Supporting                                               |

Dropped as targets: `it support ottawa` (480), `it support for small business` (480), `small
business it support` (320), `it helpdesk services` (390), `remote it support` (260), `computer
support ottawa` (140). They are searched by people who want devices and networks looked after.

The earlier SERP for `it support ottawa` is five job boards, a City of Ottawa page and a few
managed service providers: not a market this page fits.

## Current state

- Title: `Support and vendor management | Vitops`. H1: "One number to call. We handle the rest."
  (good).
- About 340 words, a "Today vs With Vitops" comparison and four approach cards.

## Recommended changes, highest impact first

1. **Title and meta (high).**
   - Title (51): `Microsoft 365 and Google Workspace Support | Vitops`
   - Meta (151): `One number for help with Microsoft 365, Google Workspace, Zoho and your other cloud software. We fix what we can and deal with the vendor for the rest.`
2. **State how support works and what it covers (high).** Remote, by phone, email or the
   portal. Say plainly: "We support your cloud software. We don't do hardware, networks or
   on-site visits." The page should not hint at device support.
3. **Add a response commitment if there is one (medium).** The pricing page offers "a reply
   within one business hour" as a paid upgrade and "the next business day" as standard; state
   that here so the page and the pricing agree.
4. **Name the vendors you support (medium).** Microsoft 365, Google Workspace, Zoho,
   QuickBooks and the rest. Only list what you actually support.
5. **Link up and sideways (medium).** `/managed-software` ("Business software management"),
   `/backup-security` (restore requests) and `/dashboard` (open requests).
6. **Structured data (medium).** `Service` (remote, area served Ontario) plus `BreadcrumbList`.

## Copy rewrites (proposed, not applied)

| Where           | Now                                           | Proposed                             |
| --------------- | --------------------------------------------- | ------------------------------------ |
| Kicker          | Support and vendor management                 | Help with your cloud software        |
| Section heading | Ten vendors. None of them know your business. | (keep; check the count is accurate)  |
| Section heading | We take the call, and the follow-up.          | We take the call and see it through. |

## Cannibalization

Owns Google Workspace and Microsoft 365 support wording and vendor management. `/managed-software`
should not use "support" as a target term.

## Open questions for you

- Which tools do you support directly, and which do you only coordinate with the vendor on?
  The page should say which is which.
