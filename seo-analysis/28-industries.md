# /industries: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-27. Volumes are monthly searches in Canada. Terms
not listed returned no volume. Written with the positioning facts in `00-positioning.md` in mind
(cloud software only, no hardware, no on-site).

## Role and verdict

Hub page for "who we work with". **Geo tier A:** Ontario and Ottawa belong in the title or lead,
because the page's job is to say who Vitops serves and where.

The page will not rank for industry software terms. Those searches ("dental practice management
software", "gym management software") are product-category searches that vertical vendors and
review sites own. Its value is different:

1. A conversion and trust page for people who arrive already knowing Vitops, and who want to see
   "do they understand my kind of business".
2. An internal-link hub from industry to the software and marketing pages that serve it.
3. A source of honest, quotable answers (the FAQ), which AI answers can cite.

Do not write extra copy hoping to rank. Spend effort on the title, the links out to the software
pages and on proof (see below).

## Keyword data

| Industry card      | Keyword                                                                                                                                  | Volume    | KD      | CPC             | Note                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- | --------------- | ----------------------------------------------------------------- |
| Dental and health  | dental practice management software                                                                                                      | 320       | 32      | $6.82           | Vendor and review-site territory                                  |
| Dental and health  | dental software canada                                                                                                                   | 210       | 17      | $4.74           |                                                                   |
| Dental and health  | clinic management software                                                                                                               | 170       | 13      | $7.95           |                                                                   |
| Dental and health  | software for dental offices                                                                                                              | 90        | 23      | $4.27           |                                                                   |
| Dental and health  | it support for dental offices                                                                                                            | 90        | 5       | $13.76          | Hardware and on-site intent: do not target                        |
| Trades             | software for contractors, software for trades                                                                                            | 30 / 30   | 0       | $23.44 / $4.95  | Tiny, but a high click price on the first                         |
| Trades             | field service management software                                                                                                        | 880       | 39      | $31.48          | Already owned by `/software-job-tracking`                         |
| Professional firms | legal practice management software                                                                                                       | 210       | 24      | $39.16          | Highest click price in the set                                    |
| Professional firms | law firm software                                                                                                                        | 140       | 27      | $28.43          |                                                                   |
| Professional firms | software for accountants                                                                                                                 | 70        | 60      | $20.65          | Hard                                                              |
| Professional firms | it support for law firms                                                                                                                 | 320       | 8       | $25.94          | Largest number in the table, but managed-IT intent: do not target |
| Brokerages         | crm for mortgage brokers, mortgage broker crm                                                                                            | 50 / 30   | 0       | $9.41           |                                                                   |
| Brokerages         | insurance broker software                                                                                                                | 20        | n/a     | n/a             |                                                                   |
| Real estate        | property management software canada                                                                                                      | 390       | 11      | $17.63          | Best volume for this card; a different buyer from agents          |
| Real estate        | real estate crm canada                                                                                                                   | 50        | 14      | $9.86           |                                                                   |
| Real estate        | real estate brokerage software                                                                                                           | 40        | 0       | $14.24          |                                                                   |
| Non-profit         | techsoup canada                                                                                                                          | 1,000     | 21      | $1.39           | Navigational: people looking for the discount programme           |
| Non-profit         | software for nonprofits                                                                                                                  | 170       | 41      | $48.91          | Very high click price                                             |
| Non-profit         | nonprofit it support                                                                                                                     | 50        | 0       | $6.47           | Managed-IT intent: do not target                                  |
| Non-profit         | nonprofit software discounts                                                                                                             | 30        | 0       | $18.84          | Fits the card's "pricing you may not be using" line               |
| Wellness, fitness  | gym management software                                                                                                                  | 260       | 37      | $27.67          |                                                                   |
| Wellness, fitness  | fitness studio software, yoga studio software                                                                                            | 140 / 140 | 22 / 22 | $31.53 / $19.63 |                                                                   |
| Automotive         | auto repair shop software                                                                                                                | 140       | 27      | $9.88           |                                                                   |
| Automotive         | auto shop management software                                                                                                            | 140       | 70      | $17.03          | Very hard                                                         |
| Generic            | software for small business ontario, industry specific software, `<industry>` it support for contractors / real estate / medical clinics | 0 to 10   | n/a     | n/a             | No volume recorded                                                |

A difficulty of 0 on a term this small means Semrush has too little data to score it, not that it
is easy.

What the data says:

- **Every "it support for ..." term is managed-IT intent** (devices, networks, a person on call).
  It is where the numbers are largest (`it support for law firms` at 320), and exactly the visitor
  Vitops cannot serve. Keep "IT support" out of the page, as the rest of the site does.
- **The industry software terms are real but small and owned by vertical vendors.** Property
  management (390), dental (320 and 210), legal (210 and 140) and fitness (260 and 140) are the
  largest. None is reachable from a hub page.
- **Non-profit is the odd one out.** `techsoup canada` (1,000) is a navigational search for a
  discount programme. A line about non-profit software discounts speaks to that buyer, with no
  claim to be TechSoup.

## Current state

- Title: `Industries | Vitops`. Says nothing about what or where.
- Kicker "Who we work with". H1 "We know your industry's tools, rules and busy seasons." Good,
  though "know" is a promise the page backs with no named client or example yet.
- About 650 words in eight industry cards, four traits ("What our clients have in common"), a
  fit section, a "Not on the list?" line and a six-question FAQ.
- The FAQ answers the questions that matter (not on the list, size, compliance, location,
  references, DMAP funding). That block is the page's best content.
- No link from any card to a service page. The page is a dead end for internal linking.

## Recommended changes, highest impact first

1. **Title and meta (high).**
   - Title (60): `Software for Clinics, Trades and Professional Firms | Vitops`
   - Meta (152): `We set up and manage the cloud software for Ontario clinics, trades, professional firms, brokerages, non-profits, studios and auto shops. Based in Ottawa.`
   - Set these in the page's SEO fields, not the layout.
2. **Link every card to the pages that serve it (high).** The cards are the page's only chance
   to pass links. Suggested targets, to check against what you do for each:
   - Dental and health: `/backup-security` (patient records), `/connected-software`.
   - Trades: `/software-job-tracking` (Jobber), `/software-invoicing`.
   - Professional services: `/backup-security`, `/software-bookkeeping-payroll`.
   - Brokerages: `/software-crm`, `/backup-security`.
   - Real estate: `/software-crm`, `/joining-and-leaving` (the "agents who join and leave often"
     line).
   - Non-profits: `/licences-cost-control` (the discounts line).
   - Wellness: `/software-productivity` (bookings), `/reviews-email`.
   - Automotive: `/software-job-tracking`, `/reviews-email` (the "choose a shop by its reviews"
     line).
3. **Add proof (high).** The H1 and the FAQ both promise "examples from businesses like yours" and
   case studies "coming soon". One real, named example per industry you have worked in would
   change the page more than any keyword. Do not add invented ones. Until you have them, drop
   "Case studies are coming to this page soon" in favour of what you can show, or leave the FAQ
   line honest as it is.
4. **Say which tools you know per industry (medium).** One short line per card naming the
   software you actually set up (for example Jobber for trades; a clinic or booking tool you
   have used). Only list tools you implement. This is what a visitor means by "tools" in the
   H1, and it supports the vendor-disclosure approach in `27-referral-disclosure.md`.
5. **Keep the FAQ and mark it up (medium).** Add `FAQPage` structured data. The answers are short
   and honest, a good fit for AI answers.
6. **Say once what you do and do not do (medium).** A line that the work is cloud software only,
   no hardware or on-site, keeps "IT support for dental offices" searchers from arriving and
   bouncing. The same statement is proposed for the home page (`25-home.md`).
7. **Structured data (low).** `CollectionPage` or `ItemList` for the eight industries, plus
   `BreadcrumbList` (Home > Industries). Add the `areaServed` that is already in the
   organization data.
8. **Compliance wording stays careful (check).** The page names PHIPA (clinics), FSRA (brokers,
   mortgage and insurance) and RECO (real estate). Keep the existing "We're not lawyers" line,
   and confirm each regulator applies as described to the clients you serve before launch.

## Should any industry get its own page?

Not yet. The pattern that works, if you want one later: **a page per industry only where you have
real client work and a quotable result**, built around the software you implement, not around
the industry's name. The terms with enough volume to justify it:

| Candidate                       | Volume        | Why it might work                                           | Condition                           |
| ------------------------------- | ------------- | ----------------------------------------------------------- | ----------------------------------- |
| Property management             | 390           | Largest volume of the set, middling difficulty (11)         | Only if you serve property managers |
| Clinics and dental              | 320, 210, 170 | Several related terms, three at difficulty 13 to 32         | Only with a clinic client to cite   |
| Legal and professional services | 210, 140      | Highest click prices ($28 to $39): buyers exist             | Software-only; avoid "IT support"   |
| Fitness and wellness studios    | 260, 140, 140 | Three close terms; bookings tie to `/software-productivity` | Only with a studio client           |

Each would need real content (what is set up, for whom, what it cost or saved) and would compete
with vertical vendors. Treat as a later, evidence-led step. Until then the hub with links to the
service pages is the right size.

## Copy rewrites (proposed, not applied)

| Where                   | Now                                                      | Proposed                                                       |
| ----------------------- | -------------------------------------------------------- | -------------------------------------------------------------- |
| Kicker                  | Who we work with                                         | Industries we work with in Ontario                             |
| Section heading         | Where we help most.                                      | (keep)                                                         |
| Section kicker          | Eight industries                                         | (keep)                                                         |
| Section heading         | What our clients have in common.                         | (keep)                                                         |
| Card body (non-profits) | ...non-profit software pricing you may not be using yet. | ...non-profit software discounts you may not be using yet.     |
| FAQ                     | Yes. Ask us, and we'll share examples... coming soon.    | Keep only if true at launch; otherwise state what you can show |

Why the non-profit change: "software discounts" is the searched phrase (30 a month, and the
programme behind the 1,000 searches for TechSoup Canada), and the page does not use it today.

## Cannibalization

Owns the industry list and "who we work with" wording. It must not target any software category
term (`crm`, `field service`, `bookkeeping`), which belong to `/software-*`, and must not use
"IT support" in any form. The industry sentences link out to those pages instead of repeating
their keywords.

## Open questions for you

- Which of the eight industries have you actually served, and which are aspirational? The page
  should lead with the real ones.
- Is there a named result or quote from any of them you can use?
- Are you willing to name the tools you implement per industry (and disclose any referral
  payment, per `27-referral-disclosure.md`)?
- Do you want any industry to get its own page, and which one?
