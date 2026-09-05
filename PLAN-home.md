---
page: /
status: draft-v1
priority: 3
depends_on: [PLAN-managed-it-services, PLAN-digital-marketing]
blocks: []
target_geography: Ontario (primary), Ottawa (named in H1/about-adjacent brand line)
primary_keywords:
  - "managed it services" (4400/mo CA) — title anchor only, page owns brand + category
  - "digital marketing" (12100/mo CA) — title anchor only
forbidden_terms: []
title_prop: "Managed IT services & digital marketing, Ontario"
title_char_count: 48
rendered_title: "Managed IT services & digital marketing, Ontario — Vitops"
rendered_char_count: 57
meta_description: "Vitops runs your managed IT — software, licences, vendor management — and the digital marketing that brings customers in. One Ottawa-based partner, working across Ontario."
meta_description_char_count: 172
schema_types: [Organization or ProfessionalService via organizationGraph, Service x2, BreadcrumbList]
links_out: ["/managed-it-services", "/digital-marketing", "#contact"]
links_in_needing_repoint: []
open_questions:
  - "StackAnimation.astro checked — its logo labels (ADP 'HRIS · payroll', 'Payroll run' step) already describe software, not a service Vitops performs. No change needed there."
---

# PLAN — `/` (Home)

**Step 3.** Blocked on the two pillars because the homepage's own pillar grid (currently
three cards) has to collapse to two, and every summary line on this page follows from
that. Diff against the current `index.astro` (65 lines) plus its four section
components, all fully read.

---

## Head

Current title (`Digital presence, back office, and business software, handled for you`,
78 chars — 18 over budget once the layout's own suffix was accounted for, and with no
searched term in it) spends its whole budget on internal names. New prop leads with the
two renamed pillars.

---

## Section-by-section

### `Hero.astro`

```
eyebrow: "Managed IT services · Digital marketing"     (was three pillar names)
H1:      unchanged — "The work that keeps your business running, handled by one
          partner." Strongest line on the site; no keyword needed here, the eyebrow
          and title tag carry it.
lead:    "Vitops runs the software your business operates on — including the accounts,
          HR system and vendor relationships behind it — and the digital marketing that
          brings customers to it. One team on file, so what wins the customer and what
          runs the business stay in step."
```

(Was: "...the bookkeeping, payroll and HR administration behind it, and the digital
presence in front of it. Three services, one team on file...". New version folds
bookkeeping/payroll into "software your business operates on" — consistent with the
software-only decision — and drops "Three services" → implicit two, stated below.)

CTAs unchanged (`#contact`, `#complete`).

### `Pain.astro`

```
H2:   "You didn't start your business to run IT and marketing."
      (was "...run software, payroll and a website" — three nouns for three old
      pillars. New version is two nouns for two pillars, and — worth noting —
      content-plan/voice.md:15 already quotes almost this exact sentence,
      "You didn't start your business to run IT and HR.", as a model example of the
      house heading style. This isn't a new construction, it's returning to one.)
lead: "Every growing business needs its software and vendor relationships handled
      well, and its presence in front of customers handled just as well. Almost none
      of them can justify a hire for either, let alone both."
      (was "...its books and payroll, and its presence... let alone three.")
```

The three `pain-tag` cards ("Hiring it," "Doing it yourself," "Ignoring it") and the
closing line ("There is another option...") are about the owner's _response_, not which
pillar — **unchanged**.

### `Services.astro` — the structural change

Three pillar cards collapse to two. `voice.md:14` already quotes "Two services. One
partner on file." as a model heading — using it here is, again, a return to established
voice rather than a new phrase.

```
header H2: "Two services. One partner on file."
header lead: "The software your business runs on and the marketing that brings
             customers to it. Take one or take both — they're run by the same people
             either way."
```

New `pillars` array (was 3 entries, now 2):

```ts
{
  tag: "01 · Managed IT services",
  href: "/managed-it-services",
  heading: "The software stack, selected, wired, and run.",
  features: [
    "Software selection, implementation, and integration — including bookkeeping, payroll and HR systems",
    "AI enablement where it genuinely earns its place",
    "HRIS configured and maintained: records, time off, policy acknowledgements",
    "Joiner, mover, leaver: onboarding and offboarding, licences and access",
    "Vendor management: one number, every vendor in the stack",
    "Backup you control, and access security enforced rather than assumed",
  ],
  signals: "Feeds your business's health: seats in use vs. seats paid for, systems up, requests closed.",
},
{
  tag: "02 · Digital marketing",
  href: "/digital-marketing",
  heading: "Everywhere your buyers look, handled.",
  features: [
    "Managed, high-performance websites",
    "SEO and answer-engine optimization for search and AI assistants",
    "Curated ad campaigns, tuned for conversions over time",
    "Social media, kept active and on brand",
    "Verified business profiles on Google, Bing, and Apple",
  ],
  signals: "Feeds your business's health: visits, search and social impressions, quotes given and won.",
},
```

**CSS — a real trap, per CLAUDE.md's own documented `.subgrid-card` gotcha.**
`.pillars-grid` currently sets `--subgrid-cols: 3`, `--subgrid-row-span: 5`,
`--subgrid-card-rows: 5` (3 columns, 5-row cards, matching the 3-pillar 5/4/5-feature
mix). With 2 cards of 6 and 5 features respectively:

- `--subgrid-cols: 2`
- `--subgrid-row-span` and `--subgrid-card-rows` must both become **6** (the longer
  card's row count) — **and must match each other**, or the card's own `.subgrid-card`
  grid-row silently wins over `.subgrid`'s and one card spans the wrong number of rows
  with no build error (exactly the failure mode CLAUDE.md's Rules section warns about).
- The `@media (max-width: 48rem)` single-column fallback stays; only the two-column
  value changes.

Old comment block at the top of the file ("THREE PILLARS. Was two... before Back Office
was split out") gets a follow-up line noting it's now two again, so a future reader
doesn't have to reconstruct this history from git blame.

### `StackSection.astro`

```
H2:   "Both, run by one team."                          (was "All three, run by one team.")
lead: "Take one service or take both. Taken together they stop being two vendors and
       become one operation: one team choosing and running the software, one workflow
       behind every joiner and leaver, one view of your business's health — what's
       coming in, what's going out, what's actually working — one bill, and one number
       to call. Here is what that looks like day to day."
```

(Was: "Take one service or take all three... one operation:...") `StackAnimation`
itself — checked, no pillar-specific labels need changing (see frontmatter).

### `KeyPartners.astro`, `Contact.astro`

**Unchanged.** Neither references pillar count or names.

---

## Structured data — new (technical prerequisite #5, folded in here)

Homepage currently emits **no schema at all**. Add:

```ts
<Schema data={organizationGraph} />
<Schema data={service("Managed IT services", "...", "/managed-it-services")} />
<Schema data={service("Digital marketing", "...", "/digital-marketing")} />
```

(`organizationGraph` and `service` both already exist in `src/lib/schema.ts`, updated
this session with `ProfessionalService`/address/telephone — see
`PLAN-managed-it-services.md`'s frontmatter.) No `BreadcrumbList` — home has no
breadcrumb trail above it.

---

## Files

`src/pages/index.astro`, `src/components/sections/{Hero,Pain,Services,StackSection}.astro`.

## Verification

Rendered title ≤60 (57 confirmed). Both pillar cards' subgrid row-span matches its
`--subgrid-card-rows` counterpart exactly. Homepage JSON-LD validates with one
`Organization`/`ProfessionalService` node sharing the site-wide `@id`. No leftover
"Three services" / "all three" / "let alone three" strings (grep before shipping).
