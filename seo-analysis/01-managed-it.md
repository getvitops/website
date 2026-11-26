# /managed-it: SEO analysis

Status: proposal for review. Nothing here is applied to `seed/seed.json`.
Data: Semrush, Canada database, pulled 2026-11-26. Volumes are monthly searches in Canada.

## Role and verdict

Pillar for IT and hub for the seven IT service pages. It is the best commercial page on the site:
the Ottawa and small-business terms below are low difficulty and carry high ad prices, which is a
sign that people searching them are ready to buy.

vitops.ca ranks for none of these terms today (Semrush shows only two stray keywords from the old
site), so every target is a fresh opportunity, not a defence.

## Keyword targets

One primary intent per page. The pillar takes the broad and local terms; the service pages take
the narrower ones (see "Cannibalization").

| Keyword                                | Volume | KD  | CPC    | Role                                                                      |
| -------------------------------------- | ------ | --- | ------ | ------------------------------------------------------------------------- |
| managed it services ottawa             | 590    | 24  | $21.87 | **Primary**                                                               |
| it services ottawa                     | 480    | 30  | $5.16  | Secondary                                                                 |
| managed it services for small business | 480    | 15  | $8.72  | Secondary                                                                 |
| outsourced it services                 | 390    | 19  | n/a    | Secondary                                                                 |
| it company ottawa                      | 210    | 27  | $3.12  | Supporting                                                                |
| msp ottawa                             | 50     | 16  | $3.56  | Supporting                                                                |
| managed it services (no geo)           | 4,400  | 50  | $16.28 | Stretch: not winnable first, but the page's wording should not exclude it |

Moved to service pages: `it support ottawa` (480, KD 22), `it support for small business` (480,
KD 11), `small business it support` (320, KD 11), `computer support ottawa` (140, KD 15).

## What ranks now (managed it services ottawa)

Positions 1 to 10 are mostly **dedicated Ottawa location pages** from managed service providers
(Convergence Networks, Neolore, F12, Crestline, Cypher, Revnet), plus directories (CloudTango,
Clutch) and one Reddit thread. Three things follow:

- Google wants a page that is plainly "managed IT in Ottawa", not a general services page.
- A directory (Clutch, CloudTango) holds the top spots; we can't outrank those, but we can take
  the provider slots below them.
- The competing pages are about helpdesk, network and security. Ours leads with software choice
  and setup, which is a real difference but reads as a different intent. The page needs a clear
  "what's included" block (support, security, backup) high up so it matches what searchers expect.

## Current state

- Title: `Managed IT | Vitops`. No target term.
- H1: "Software that works for your team, not against it." Good brand voice; nothing names the
  service, the customer or the place.
- Kicker: "Managed IT for Ontario businesses". "Ottawa" appears nowhere above the fold.
- About 1,250 words, 7 service cards and 7 software cards.
- Only 2 internal links detected in the page data (the service cards need real hrefs).
- No pricing mention beyond the services list; searchers for this term compare cost.

## Recommended changes, highest impact first

1. **Title and meta (high).**
   - Title (57): `Managed IT Services in Ottawa for Small Business | Vitops`
   - Meta (136): `Managed IT for small businesses in Ottawa and across Ontario: software, setup, security, backup and support for one fixed monthly price.`
2. **Say it above the fold (high).** Keep the H1. Change the kicker to a plain statement:
   `Managed IT services for small businesses in Ottawa and Ontario`. The first sentence of the
   lead should name what is included: "software, setup, security, backup and support".
3. **Add a "what's included" block and a price pointer (high).** A short section (three or four
   lines) listing support, security, backup and software management, ending with
   "Plans start at ... a month. See pricing" linking to `/pricing`. Cost questions are a real
   query family (`how much do managed it services cost`, 20+20/month).
4. **Link the cards (medium).** All 7 service cards and 7 software cards should link to their
   pages with descriptive anchors ("Backup and security", "Licences and cost control"). Add one
   link back from each service page using the anchor "Managed IT services".
5. **Add a short "What is managed IT?" explainer (medium).** `what is managed it services` gets
   110 searches. Two or three plain sentences near the top serve readers and AI answers.
6. **Structured data (medium).** `Service` (provider Vitops, areaServed Ottawa and Ontario) and
   `BreadcrumbList` (Home > Managed IT). The toolkit has both in `@getvitops/astro/schemas/`.
   Skip `FAQPage` markup: Google limits FAQ rich results to well-known government and health
   sites, so it adds nothing here. Keep the questions as visible page copy.
7. **Source the statistics (low).** The licence-usage and software-regret figures should cite their
   source in the text, with a link.

## Copy rewrites (proposed, not applied)

| Where           | Now                                                                                                                                                                | Proposed                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kicker          | Managed IT for Ontario businesses                                                                                                                                  | Managed IT services for small businesses in Ottawa and Ontario                                                                                                               |
| Lead            | We help you choose the right software, set it up, and manage it with cost savings in mind. Your team works more efficiently, and your systems keep up as you grow. | We choose your software, set it up, secure and back it up, and answer the phone when something breaks. You pay one fixed monthly price and your systems keep up as you grow. |
| Section heading | Four steps, in the right order.                                                                                                                                    | How we work, one step at a time.                                                                                                                                             |
| Section heading | Seven services. One team.                                                                                                                                          | What we manage for you.                                                                                                                                                      |

Why: the count-announcing headings ("Four steps", "Seven services") are a pattern to drop, and
the proposed lead names the service and the buyer in the first sentence. Canadian spelling
("licences") is already right.

## Cannibalization

- `/managed-it` owns: managed it services ottawa, it services ottawa, managed it services for
  small business, outsourced it services.
- `/support-vendor-management` owns: it support ottawa, it support for small business, small
  business it support.
- `/backup-security`, `/licences-cost-control`, `/joining-and-leaving` own their own long-tail
  terms; none of them should use "managed IT services" as a target.

## Open questions for you

- Is "one fixed monthly price" accurate for the IT service as a whole, or only for some plans?
  The proposed meta and lead say it; the pricing page should back it up.
- Is there a starting price for IT that can sit next to "See pricing"?
