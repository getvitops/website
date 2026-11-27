# Software pages: cluster overview

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-27. Volumes are monthly searches in Canada.
Covers `18` to `24`: CRM, quotes and invoices, HR, communication, productivity, bookkeeping and
payroll, and job tracking.

## What these pages are

Category pages for the tools Vitops chooses, sets up and connects. Each names three or four
vendors (for example Zoho Bigin, HubSpot and Jobber for CRM) and explains how to pick one. They
support `/managed-software` and `/software-selection-setup` and answer the "which one should I use"
question that comes before a purchase.

## What the search results look like

- **Brand names have large volume but are navigational.** Semrush marks most of them as people looking
  for the vendor's own site or login (the rest as informational or transactional), so a
  comparison page will not capture them and should not try:

  | Search                   | Volume  | Intent                       |
  | ------------------------ | ------- | ---------------------------- |
  | payworks                 | 165,000 | navigational                 |
  | jobber                   | 40,500  | informational                |
  | rippling                 | 27,100  | navigational                 |
  | zoho books               | 8,100   | transactional                |
  | quickbooks online canada | 6,600   | navigational                 |
  | zoho invoice             | 4,400   | informational                |
  | zoho people              | 1,600   | navigational / transactional |
  | zoho cliq                | 590     | navigational / transactional |

- **The category searches are where these pages can compete**, and they are modest: 50 to 900
  a month each, mostly commercial or informational, difficulty 18 to 50.
- **Who ranks for them:** vendor product pages (Zendesk, Wagepoint, Sage, ADP, Workday), vendor
  "best X" blog posts (Mailchimp, monday.com, Collage), directories (Capterra, GetApp) and
  government pages (canada.ca for payroll). A few Canadian consultancies appear (Gestisoft for
  CRM). Vendors write comparison pages that favour their own product.

## What that means

1. **Do not try to out-rank vendors on "best CRM" or "best payroll".** Compete on the angle
   vendors cannot take: **independent, Canadian, and set up for you**. Titles and openings say
   "for small business in Canada", and the page says how Vitops is paid
   (see `27-referral-disclosure.md`).
2. **The honest differentiator is independence, with the payments disclosed.** Vitops does
   receive referral payments from some of these vendors (Jobber and QuickBooks now, Zoho soon,
   Microsoft and Google when not delivered through Pax8). Say so next to the recommendation
   and link to a "How we get paid" page. The client owns every account. See
   `27-referral-disclosure.md` for the disclosure design and for site copy that is no longer
   accurate.
3. **Add a short comparison people can use.** Each page names three or four tools; a table of
   "best for", "starting price" and "where it is weak" beats a list of descriptions. Only state
   prices you have checked, and date them.
4. **Use `Service` structured data, not `SoftwareApplication`.** Vitops does not sell the
   software, so a software schema would be inaccurate.
5. **Link the cluster.** Every software page links up to `/managed-software` and `/software-selection-setup`
   and across to two related software pages (CRM to invoicing and job tracking; HR to
   bookkeeping and payroll; productivity to communication). The cards on the pillar should link
   to every page.
6. **Count-announcing labels** appear on every page ("Four common choices", "Three platforms",
   "Four platforms", "Two kinds of work", "Two for your books. Two for payroll."). Proposed
   replacements are in each page file.

## What these pages are for

Small search volume, high intent. The realistic win is a steady trickle of buyers who are
already choosing a tool, and a clear, citable answer for AI tools that field "which CRM should
a small business use" questions. Do not expect the traffic of the service pages.

## Questions for you

- Answered: referral payments exist for Jobber, QuickBooks, and soon Zoho; see
  `27-referral-disclosure.md` for the follow-up questions about how they are calculated.
- Which of the named tools do you actually implement today? Each page should name only those.
- Are any listed prices public and stable enough to show in the comparison tables?
