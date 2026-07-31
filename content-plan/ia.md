# Information architecture

Settles the slug scheme, the nav, per-page targeting, and the phase 1 / phase 2 split.

None of the SEO plan's URLs were ever published — the live site is `/` and `/pricing`
only — so this costs nothing in redirects. It just has to be right from here.

---

## Sitemap

```
/                                    Home
/digital-presence                    Pillar
/business-software                   Pillar
/back-office                         Pillar
/industries                          Hub
  /industries/trades
  /industries/real-estate
  /industries/professional-services
  /industries/clinics
/funding                             Hub
  /funding/dmap
  /funding/tdp
  /funding/rmpg
  /funding/bdc-lift
/pricing                             exists
/about                               new
/contact                             still the homepage anchor — see below
/faq                                 not built — see below
/work                                phase 2 — no nav slot yet
```

### As built (31 July 2026)

Shipped: the three pillars, `/industries` + four verticals, `/funding` + four program
pages, `/about`. Nav and footer rewired. All 16 routes verified 200; build and typecheck
clean.

Two deliberate omissions:

- **`/faq` not built.** Aggregating every page's FAQ onto one page duplicates content
  across the site — the same pattern flagged as a problem in `teardown.md` §5. Google also
  restricts FAQ rich results to government and health sites, so there is no snippet upside.
  The per-page `FAQPage` schema still ships, which is what serves answer engines.
- **`/contact` still the homepage anchor.** Promoting it means relocating a working
  EmDash-wired form — a functional change, not a content one. All CTAs point at `/#contact`
  and work.

**Pillar slugs sit at the root, not under `/services`.** A `/services/` segment adds no
keyword value, lengthens every URL, and the live site's anchors are already `#it-hr` and
`#digital-presence`. The Services _dropdown_ does the grouping work a `/services` page
would have done.

### Phasing

**Phase 1 (12 pages)** — the three pillars, the four industry pages + hub, `/funding` hub,
`/about`, `/contact`, `/faq`. Plus `/pricing`, which exists.

**Phase 1.5** — the four `/funding/*` program pages. Separated only because they need the
verification pass in `funding.md` and a maintenance owner before they go live.

**Phase 2 — opened only where a pillar earns them.** Spokes:
`/business-software/{ai-enablement,support}`, `/back-office/{payroll,onboarding-offboarding,benefits,hr-software,safety-software,bookkeeping}`,
`/digital-presence/{websites,advertising,seo,social,email}`, plus `/work/*` case studies
and the `/vs/*` comparison pages.

The delivered plan called for 24 pages up front. Publishing 24 pages of unproven copy for
a small operator is the main thin-content risk in this whole exercise. A pillar earns its
spokes by ranking and converting first.

---

## Navigation

```
Services ▾    Industries    Pricing    Funding    About       [ Talk to us → ]
  Business software
  Back office
  Digital presence
```

**Industries is its own item, not a child of Services.** It was nested there in
the first draft and that was a category error: someone opening a menu labelled
Services expects a list of things we _do_, and Industries answers a different
question. Nesting it also collapses the two-axis distinction that justifies the
pages existing at all — pillars are service-shaped, buyers are industry-shaped.

The slot is earned on signalling more than navigation. Most industry traffic
arrives from search directly onto the vertical page, and the on-site version of
the question ("do they get my business?") comes up while reading a pillar page,
where the link row already sits. What top-level placement buys is telling a
first-time visitor _they specialise_ before reading a word.

Five items means the header must collapse to the drawer at **900px**, not 720px
— below that the links crowd the brand and the CTA.

**FAQ is not in the nav.** FAQs belong on the page, at the point of doubt — better for
conversion and better for answer engines than a destination. `/faq` exists, schema-marked,
linked from the footer.

**Funding is not in the nav either — reversed after review.** It's a price objection
handler, not a pillar. Search traffic lands on `/funding/*` directly, so the slot never
served it; on-site readers meet funding via the callout band and the CTA lines, already
mid-page. A "Funding" item in a services company's primary nav also reads like a grant
consultancy, which is the wrong first impression. It now lives on `/pricing` — where the
cost question actually arises — plus the footer.

Nav as built: **`Services ▾ | Industries | Pricing | About`** + CTA.

**Case studies stay out until 2–3 exist.** A nav item that leads to a thin page is worse
than no nav item.

**Footer:** the four industries, the four funding programs, `/faq`, `/about`, `/contact`,
service area, `hi@vitops.ca`.

### Load-bearing anchors — do not break

`src/middleware.ts`, the A/B variant dispatcher, and the current nav all depend on these
existing on `/`: `#it-hr`, `#digital-presence`, `#services`, `#contact`. Keep them on the
homepage even after the pillar pages exist; the nav dropdown links to the pages, the
homepage sections keep the anchors.

---

## Per-page targeting

Volume figures are from the delivered keyword sheet. Treat them as directional — they
appear to be national, not Ontario.

### `/` — Home

- **Title:** `IT, HR and digital presence, run by one partner | Vitops`
- **Description:** `Vitops runs your digital presence and the IT, software and back-office operations behind it. One partner on file, priced per seat, Ontario-wide.`
- **H1:** unchanged — _The work that keeps your business running, handled by one partner._
- **Owns:** brand + the category sentence. No keyword target.
- **Job:** route to three pillars, state the "systems first, then demand" spine, one
  funding callout, one CTA.

### `/digital-presence` — Pillar

- **Title:** `Websites, ads, SEO and social for Ontario businesses | Vitops`
- **Description:** `A fast, findable website plus the ad campaigns, social and listings around it — built and steered monthly by the same partner that runs your systems.`
- **H1:** _Everywhere your buyers look, handled._
- **Primary:** `seo services for small business` (260) · `technical SEO services` (320)
- **Secondary:** `google ads management services` (320) · `conversion rate optimization services` (260) · `social media advertising campaigns` (140) · `web design for small business` (50)
- **New, uncovered by the research:** email campaigns, GEO / answer-engine optimization
- **Links out:** `/business-software` (the "fix the destination first" argument),
  `/industries/*`, `/pricing`

### `/business-software` — Pillar

- **Title:** `Business software selection, integration and support | Vitops`
- **Description:** `We choose your software, wire it together, add AI where it earns its place, and become the one number you call when any of it breaks.`
- **H1:** _The software stack, selected, wired, and run._
- **Primary:** `software subscription management` (10) · `SaaS management small business` (10) · `software license management` (90)
- **Secondary, in the support section only:** `it support for small business` (480) · `IT helpdesk services` (320) · `small business IT support` (320)
- **Owns as a written category:** business software selection, software implementation,
  systems integration, AI enablement, vendor triage
- **Note:** the primary cluster is all at floor volume **because the category is
  under-named**, not because demand is absent. This page is a bet on writing the category.
  The support section is where measured volume enters.

### `/back-office` — Pillar

- **Title:** `Payroll, HR operations and back-office support | Vitops`
- **Description:** `Managed payroll, benefits administration, onboarding and offboarding, and the licence and permission tuning that goes with them. Ontario SMEs, one operator.`
- **H1:** _The admin that never stops, taken off your desk._
- **Primary:** no researched cluster — the delivered sheet skipped HR entirely
- **To research before launch:** `managed payroll services`, `payroll services for small
business ontario`, `HR outsourcing small business`, `benefits administration services`,
  `employee onboarding software`, `bookkeeping services ontario`
- **Note:** the June doc's HR content is the strongest asset in the whole delivery and it
  has **zero keyword support**. Commission a small keyword pass for this pillar
  specifically; do not launch it blind.
- **Bookkeeping makes that pass more urgent, not less.** It's confirmed as a lead driver,
  it now has a dedicated block at `#bookkeeping`, and it's the one term in this pillar
  with obvious commercial search volume (`bookkeeping services ontario`,
  `small business bookkeeping`, `bookkeeping for contractors`). Research it first.

### `/industries` + four verticals

- **Hub title:** `IT, HR and digital presence by industry | Vitops`
- **Hub H1:** _You need a partner who knows your field._ (from the June doc — good line)
- **`/industries/trades`** — field tablets, offline capability, dispatch, WSIB/COR
  readiness, seasonal ad cycles
- **`/industries/real-estate`** — agent onboarding and offboarding at roster speed, board
  tools, commission admin, farm-area campaigns
- **`/industries/professional-services`** — matter-based permissions, conflict checks,
  retention rules, document hygiene (law, notary, paralegal, accounting)
- **`/industries/clinics`** — PHIPA-aware access, EMR-adjacent work, recall campaigns,
  clean endpoints
- **Each page:** the vertical's specific operational reality → how the three pillars land
  in it → one funding callout → FAQ → CTA. **Cross-links to all three pillars** — this is
  the second axis of the matrix, and its whole job is routing.

### `/funding` + four program pages

- **Hub title:** `Ontario digital adoption funding for small businesses | Vitops`
- **Hub description:** `DMAP, TDP, RMPG and BDC LIFT explained plainly — what each covers, who qualifies, and what disqualifies you. Updated July 2026.`
- **H1:** _What Ontario will actually pay for, and what it won't._
- **Owns:** `DMAP Ontario`, `Digital Modernization and Adoption Plan`, `Technology
Demonstration Program`, `Ontario digital adoption grant`, `BDC LIFT`, and the long-tail
  question phrasings (`is CDAP still available`, `DMAP eligibility`, `how much is DMAP`)
- **Why this wins:** every competing page is a grant consultant selling application
  writing. A page that publishes the _disqualifiers_ — the $750K TDP floor, the DMAP/RMPG
  exclusivity, LIFT being debt — is more useful than all of them, and pre-qualifies leads.

### `/pricing` (exists)

- **Add:** the funding callout; links to the three pillar pages; an FAQ block
- **Unclaimed intent worth capturing:** `managed IT services pricing`, `how much does IT
support cost for a small business`, `MSP pricing per user` — nobody publishes real
  numbers, and this site does

### `/about`

- **Title:** `About Vitops — one named partner for Ontario SMEs | Vitops`
- **Job:** the entity page. The whole pitch is "one partner on file" and there is
  currently no page about who that is. Needed for E-E-A-T and so answer engines can
  resolve the entity. `Organization` + `Person` schema.

### `/contact`, `/faq`

- `/contact` — promote the homepage anchor to a real page; reuse the June doc's
  service-area copy (Ottawa-first → Ontario → Canada remote). `LocalBusiness` schema.
- `/faq` — aggregates the per-page FAQ blocks, `FAQPage` schema. Footer-linked only.

---

## Keyword disposition

Every cluster in the delivered sheet, assigned or cut with a reason. 148 rows in.

| Cluster                                           | Rows | Disposition                                                                                                                                        |
| ------------------------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Geo-modified (`…ontario/toronto/ottawa/cornwall`) | 68   | **Cut.** All at volume 10 / KD `N/A` — the tool's floor, i.e. no data. One service-area section + Google Business Profile instead of doorway pages |
| Cloud services (all three sub-clusters)           | 26   | **Cut.** Pillar removed by the client; the Website Map sheet says "no cloud services"                                                              |
| IT consulting / infrastructure management         | 8    | **Cut.** Not the product; `IT consulting services` (880) is national and buys the MSP identity                                                     |
| IT support / helpdesk                             | 7    | **Keep as secondary** on the `/business-software` support section only. Reframed as single-point-of-contact and tier-1 triage                      |
| IT services (pillar-level)                        | 4    | **Cut.** `it services for small business` (480) is the MSP identity in a phrase                                                                    |
| Software subscription / licence management / SaaS | 13   | **Keep — primary** for `/business-software`. All at floor volume; category needs writing                                                           |
| Marketing & ads / PPC / Google Ads                | 13   | **Keep** for `/digital-presence`                                                                                                                   |
| Analytics & CRO                                   | 5    | **Keep** for `/digital-presence`                                                                                                                   |
| SEO                                               | 5    | **Keep — primary** for `/digital-presence`                                                                                                         |
| Web design / web development                      | 17   | **Keep** for `/digital-presence`; 5 of these are duplicated across two planned pages — dedupe                                                      |
| Duplicates across pages                           | 5    | **Resolve.** One page per term                                                                                                                     |

**Not in the sheet and needed:** the entire Back Office / HR / payroll / bookkeeping
cluster, email marketing, social media management, GEO / answer-engine terms, pricing
intent, funding intent. Commission a second keyword pass for Back Office and funding
before those pages launch.

---

## Internal linking rules

1. **Every pillar page links to the other two.** The pitch is that they're one partner;
   the link graph should say so.
2. **Pillar → industries is a one-line link row, never a grid.** The four-industry grid
   currently repeats on five planned pages with near-identical copy — that's the
   templated-site pattern. Substance lives once, on `/industries/*`.
3. **Every industry page links to all three pillars.** That is its job.
4. **Funding is linked from the callout band and the CTA line only** — not from a
   full section on every page.
5. **`/pricing` is linked from every pillar and industry page.** Published pricing is a
   differentiator; make it easy to reach.
6. **No page targets a term another page owns.** Check against the disposition table above
   before adding anything.
