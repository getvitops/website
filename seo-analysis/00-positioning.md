# Positioning facts and what they change in the SEO plan

Status: proposal for review. Added after the pillar and IT service analyses were first written;
`01`, `08` and `09` are revised to match. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-26.

## Facts (from you)

- Vitops works with cloud software (SaaS) only: selecting, implementing, configuring,
  integrating and enhancing it with AI.
- No hardware: no networking, no device or endpoint management.
- No on-site visits. Support is remote.
- The Business Health Dashboard is included when the monthly plan is large enough (the pricing
  page says over $400 a month), or bought as an add-on.

## Why this changes the keywords

The searches the first draft targeted mean something different from what Vitops sells:

- **"managed it services", "it support", "it helpdesk", "remote it support", "it company"** are
  searched by people who want their computers, network and office devices looked after, often on
  site. A visitor who lands on a SaaS-only service from those searches either leaves, or
  worse, books a call and is told no. That wastes the ranking and the lead.
- **"cybersecurity services ottawa"** is mostly network and endpoint security. Vitops covers
  account security (2-step login, access, backup) for cloud tools only.
- Ranking for these terms is also a promise on the page. The honest fix is to say plainly what
  Vitops does and does not do, and aim at searches from people who run their business on
  cloud software.

## The searches that match the offer

All volumes are monthly searches in Canada.

| Keyword                                 | Volume  | KD  | CPC          | Best page                                             |
| --------------------------------------- | ------- | --- | ------------ | ----------------------------------------------------- |
| zoho crm consultant                     | 90      | 18  | $26.63       | `/software-selection-setup` or a Zoho page            |
| zoho consultant                         | 110     | 32  | $5.50        | same                                                  |
| microsoft 365 consultant                | 90      | 17  | $16.24       | `/managed-software` or `/software-selection-setup`    |
| crm consultant ottawa                   | 70      | 21  | n/a          | `/software-selection-setup`                           |
| microsoft 365 migration                 | 90      | 33  | n/a          | `/software-selection-setup`                           |
| microsoft 365 support                   | 210     | 61  | $3.29        | `/support-vendor-management` (hard)                   |
| google workspace support                | 210     | 49  | $5.47        | `/support-vendor-management`                          |
| google workspace setup                  | 70      | 60  | $7.76        | `/software-selection-setup`                           |
| zoho partner                            | 70      | 40  | $5.93        | same (partner status would help)                      |
| microsoft 365 management                | 50      | n/a | $10.47       | `/managed-software`                                   |
| google workspace migration              | 50      | n/a | $8.14        | `/software-selection-setup`                           |
| managed saas / saas management services | 20 / 20 | 0   | $46.02 / n/a | `/managed-software` (tiny, but the exact description) |

Reading the table:

- The SaaS terms are smaller than "managed IT services" (4,400 nationally) but the people
  searching them are the buyers Vitops wants, and the difficulty is lower (17 to 33 for the
  consultant and migration terms).
- `zoho crm consultant` has a $26.63 click price on 90 searches: vendors value that buyer.
- Terms with brand names (Zoho, Microsoft 365, Google Workspace, QuickBooks) are where the
  page can say something specific, which also helps AI answers quote it.
- Ottawa works for `crm consultant`; for the others the volume is national, so the title can be
  geo-neutral and the body can name Ontario.

## What to change

1. **Retitle the pillar around software, not "IT".** See `01-managed-software.md`.
2. **Say what is out of scope, once and plainly,** on the pillar and the support page: "We work
   with cloud software only. We don't do hardware, networks or on-site visits." It filters the
   wrong leads, and it is a claim competitors won't make.
3. **Avoid these words in titles, headings and meta text:** IT support, helpdesk, managed IT
   services, network, device, endpoint, on-site. The old menu label "Managed IT" had the same
   problem; it is now "Managed software" (see the decision below).
4. **Name the vendors you work with** (Zoho, Microsoft 365, Google Workspace, QuickBooks, HubSpot,
   Jobber) in the lead and headings of the relevant pages.
5. **Service schema:** set the service type to cloud software management and the area served to
   Ontario, remote. Do not describe it as on-site or local-office IT.

## Questions for you

- **Decided (2026-11-27): the visible name is now "Managed software".** The nav label, plan name,
  kickers, page slug (`/managed-software`) and form options use it, and `/managed-it` redirects
  with a 301. "Managed software" has no search volume of its own (Semrush shows 0, though
  advertisers pay $13 to $24 a click for it), so it works as a label, and the SEO targets stay on
  the consultant, management and tool-specific terms in this note. Running copy still says "IT"
  in a few places; see the review list in the commit notes.
- **Is "Zoho partner" status something you hold or want?** The partner searches (70/month) are
  only worth targeting if the page can say it truthfully.
- **Which vendors do you actively implement?** The consultant pages should name only those.
