# /software-bookkeeping-payroll: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-27. See `17-software-pages-overview.md` first.

## Role and verdict

Software category page. **Geo tier B.** The largest category searches in the cluster, and some of
the priciest: `payroll software canada` has 720 searches at a $38 click, and `payroll software
for small business canada` a $46 click. The competition is vendors and government (Wagepoint,
Sage, ADP, Workday, canada.ca), so the realistic goal is a trusted comparison for small Ontario
businesses and a clear answer for AI tools, not the top spot.

## Keyword targets

| Keyword                                            | Volume  | KD  | CPC    | Role                                  |
| -------------------------------------------------- | ------- | --- | ------ | ------------------------------------- |
| payroll software canada                            | 720     | 43  | $37.79 | **Primary** for payroll               |
| accounting software canada                         | 720     | 32  | $12.71 | **Primary** for the books             |
| bookkeeping software canada                        | 480     | 48  | $12.71 | Secondary                             |
| best accounting software for small business canada | 260     | 32  | $11.97 | Secondary                             |
| payroll software for small business canada         | 90      | 28  | $45.73 | Secondary: lower difficulty           |
| quickbooks online canada                           | 6,600   | 63  | $7.74  | Navigational: mention, do not target  |
| zoho books                                         | 8,100   | 59  | $5.36  | Transactional: mention, do not target |
| payworks                                           | 165,000 | 59  | $1.84  | Navigational: mention, do not target  |
| quickbooks vs zoho books                           | 30      | n/a | $8.10  | Supporting heading                    |

## What ranks now (payroll software canada)

Vendors (Wagepoint, Sage, ADP, Workday), the Canada Revenue Agency's payroll page, a Collage
blog guide, an equal-pay site and a directory (GetApp). A vendor-neutral page with Canadian
detail (CPP, EI, provincial rules, filing deadlines) is the gap.

## Current state

- Title: `Bookkeeping and payroll software | Vitops`. H1: "The books your accountant works from.
  The payroll you approve." (good).
- Names QuickBooks, Zoho Books, Payworks and ADP; covers bookkeeping, payroll, receipts and
  expenses, bills and supplier payments, and bank feeds.

## Recommended changes, highest impact first

1. **Title and meta (high).**
   - Title (51): `Bookkeeping and Payroll Software in Canada | Vitops`
   - Meta (144): `QuickBooks, Zoho Books, Payworks or ADP, set up, connected to your other software and kept running, so your books are ready for your accountant.`
2. **Split the two topics under clear headings (high).** "Accounting and bookkeeping software"
   and "Payroll software for Canadian businesses". The search terms differ and the page is long
   enough to carry both.
3. **Add Canadian detail (high).** Payroll in Canada has specifics (CPP, EI, provincial rules,
   remittance dates). A short, accurate paragraph is what separates this from a vendor page.
   Check every figure against the Canada Revenue Agency before it goes live.
4. **Add a "which fits" table (medium).** Four rows. Keep prices dated and checked.
5. **State the neutrality (medium).** Say the client owns the accounts and has accountant access, and disclose the QuickBooks referral payment (see `27-referral-disclosure.md`).
6. **Link across (medium).** To `/software-invoicing`, `/software-hr` and `/connected-software`.
7. **Structured data (low).** `Service` plus `BreadcrumbList`.

## Copy rewrites (proposed, not applied)

| Where           | Now                                  | Proposed                                                       |
| --------------- | ------------------------------------ | -------------------------------------------------------------- |
| Kicker          | Bookkeeping and payroll software     | Bookkeeping and payroll software for Canadian small businesses |
| Section kicker  | Four common choices                  | Common choices                                                 |
| Section heading | Two for your books. Two for payroll. | Software for your books and your payroll.                      |

## Cannibalization

Owns accounting, bookkeeping and payroll wording. `/software-invoicing` owns quote and invoice
terms; `/software-hr` should not use "payroll software" as a main term.
