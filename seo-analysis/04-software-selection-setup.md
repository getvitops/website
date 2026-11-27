# /software-selection-setup: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-26. Terms not listed returned no volume.

## Role and verdict

Managed software sub-service; supports `/managed-software`. **Geo tier B:** geo-neutral title, Ontario and
Ottawa in the body. Search demand for this topic is close to zero, so the page is a conversion
and internal-link page, not a traffic page. Spend effort on the title, the links to and from the
pillar, and clear copy; do not write extra content hoping to rank.

## Keyword data

| Keyword                                                                                                                | Volume | KD  | CPC    | Note                                |
| ---------------------------------------------------------------------------------------------------------------------- | ------ | --- | ------ | ----------------------------------- |
| business software consulting                                                                                           | 20     | 0   | $17.51 | High CPC for the size: buyers exist |
| software implementation services                                                                                       | 20     | 0   | n/a    |                                     |
| microsoft 365 setup (tracked, Ottawa)                                                                                  | 10     | n/a | n/a    | From the existing tracking          |
| software selection for small business, crm implementation ottawa, business software ottawa, software consulting ottawa | none   | n/a | n/a    | No volume recorded in Semrush       |

Added after the positioning facts (see `00-positioning.md`): the consultant and migration terms
fit this page better than anything above, for example `zoho crm consultant` (90, difficulty 18),
`zoho consultant` (110), `microsoft 365 consultant` (90, difficulty 17), `crm consultant ottawa`
(70), `microsoft 365 migration` (90) and `google workspace setup` (70). Retitle around those
tools once you confirm which ones you implement.

## Current state

- Title: `Software selection and setup | Vitops`. Close; no audience.
- Kicker "Software selection and setup" repeats the title. H1 "Pick software that fits from day
  one" is good.
- About 340 words, with a "doing it yourself vs with Vitops" comparison and four approach cards.

## Recommended changes, highest impact first

1. **Title and meta (medium).**
   - Title (46): `Business Software Selection and Setup | Vitops`
   - Meta (148): `We choose the right business software for how your team works, then move your data and set it up. For small businesses in Ottawa and across Ontario.`
2. **Link both ways with the pillar (high).** Add a link from `/managed-software` using the anchor
   "Software selection and setup", and one back from this page using "Managed software services".
3. **Link to the connected-software page (medium).** The step "We check it connects" should link
   to `/connected-software`.
4. **Name the setups people search (medium).** One sentence naming Microsoft 365 and Google
   Workspace setup and migration (the tracked terms) and the CRM and accounting tools you
   work with. Tracked volume is 10, so this is for the reader, not for traffic.
5. **Structured data (low).** `Service` plus `BreadcrumbList` (Home > Managed software > this page).

## Copy rewrites (proposed, not applied)

| Where           | Now                              | Proposed                       |
| --------------- | -------------------------------- | ------------------------------ |
| Kicker          | Software selection and setup     | Managed software: software selection |
| Section heading | We've already done the research. | (keep)                         |

## Cannibalization

Owns "software selection" and "setup" wording only. Must not target "managed IT services" or
"IT support".
