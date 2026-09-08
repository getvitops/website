---
page: /managed-it-services
replaces: /business-software
status: draft-v1
priority: 1
depends_on: []
blocks: [PLAN-home, PLAN-pricing, PLAN-seo-services-ottawa, PLAN-managed-it-services-ottawa, PLAN-digital-marketing-agency-ottawa, seven software-category subpages, four industry pages]
target_geography: Ontario (primary), Ottawa (local emphasis in support section), Canada-wide (secondary, remote)
primary_keywords:
  - "managed it services" (4400/mo CA)
  - "managed services" (1300/mo CA)
  - "it support" (2400/mo CA)
  - "it services company" (320/mo CA)
  - "small business it support" (320/mo CA)
  - "vendor management" (390/mo CA, 5400/mo US)
  - "managed it services ontario" (720/mo CA)
secondary_keywords:
  - "it support for small business" (480/mo CA)
  - "it helpdesk services" (320/mo CA)
forbidden_terms:
  - "MSP" (only inside one FAQ answer, never title/H1/H2/URL — 50/mo Ottawa, industry jargon not buyer language)
  - "bookkeeping services" / "payroll services" (parked/forfeited — see master plan)
title_prop: "Managed IT services & vendor management, Ontario"
title_char_count: 48
rendered_title: "Managed IT services & vendor management, Ontario — Vitops"
rendered_char_count: 57
meta_description: "Managed IT services for Ontario SMEs: software selection, licence and vendor management, identity and access, and one number to call when anything breaks."
meta_description_char_count: 156
schema_types: [Service, BreadcrumbList]
links_out: ["/pricing", "/digital-marketing", "/industries", "7 software-category subpages"]
links_in_needing_repoint: ["PineLayout.astro nav+footer", "sections/Services.astro", "digital-presence.astro CTA row", "industries pages' 4-link nav", "pricing.astro cross-links"]
open_questions:
  - "RESOLVED 2026-09-05 — see PLAN-pricing.md. Bookkeeping's priced line removed entirely (no clients yet, gated on DoyoBooks); payroll/benefits keep their existing prices, reframed to software administration. Already executed on pricing.astro."
---

# PLAN — `/managed-it-services`

Replaces `/business-software` (301 already wired in `astro.config.mjs`) and absorbs
`/back-office`'s identity/scope, though not its bookkeeping/payroll _service_ claims —
those become one subpage about software, per the session's product decision. This is
**step 1** of the master plan (`PLAN-managed-it-services.md` in the sequencing table) —
every other page links to it, so it goes first.

---

## Head

**Title prop:** `Managed IT services & vendor management, Ontario`
— 48 chars. Rendered (`PineLayout.astro:26` appends `" — Vitops"`, 9 chars):
`Managed IT services & vendor management, Ontario — Vitops` — **57/60**. ✅

**Description:**
`Managed IT services for Ontario SMEs: software selection, licence and vendor
management, identity and access, and one number to call when anything breaks.`
— 156 chars.

**Schema** (`src/lib/schema.ts`):

```ts
<Schema data={service(
  "Managed IT services",
  "Software selection, implementation, integration, licence and vendor management, identity and access, AI enablement and day-to-day IT support for Ontario small businesses.",
  "/managed-it-services",
)} />
<Schema data={breadcrumb(["Managed IT services", "/managed-it-services"])} />
```

`service()`'s `name` changes from `"Business software operations"` — this is the string
an answer engine sees as _what this page is a Service for_, so it should carry the
searched term, not the old internal pillar name.

**Primary keywords:** `managed it services` (4,400/mo CA) · `managed services` (1,300) ·
`it support` (2,400) · `it services company` (320) · `small business it support` (320) ·
`vendor management` (390) · `managed it services ontario` (720)

**Secondary (support section only, per `ia.md`'s original disposition):**
`it support for small business` (480) · `it helpdesk services` (320)

**Never:** `MSP` in title/H1/H2/URL (50/mo Ottawa — industry jargon, not buyer language).
One FAQ question may say it, framed as a translation (see FAQ below, unchanged from the
live page — it already does this correctly).

---

## File

`src/pages/business-software.astro` → **move to** `src/pages/managed-it-services.astro`.
Everything below is a diff against the current file's content (271 lines, fully read),
not a rewrite from nothing — most of it survives.

---

## Sections, in order

### 1 — Funding callout

Unchanged: `<FundingCallout text={FUNDING_CALLOUT} />`.

### 2 — Hero

```
eyebrow: "Managed IT services"          (was "Business software" — this IS the primary
                                          keyword, and an eyebrow is real visible page
                                          text, cheapest placement available)
H1:      "The software stack, selected, wired, and run."     (KEEP — strongest line on
                                                                the page, no change)
lead:    "Most companies don't have a software problem so much as a software sprawl
          problem. Tools bought for one reason, kept for another, half-integrated, and
          nobody quite sure who owns which login. We pick what you actually need,
          connect the pieces, and take responsibility for the whole thing working —
          including the accounts, the licences, and who gets in when someone joins or
          leaves."
          (Appends one clause naming the identity/lifecycle scope absorbed from
          back-office, so the lead itself signals the wider pillar without a rewrite.)
secondaryLabel: "See pricing"   secondaryHref: "/pricing"     (unchanged)
note: {FUNDING_NOTE}                                          (unchanged)
```

### 3 — Direct answer (`<Prose lead>`)

Replace the current paragraph. This is the quotable, standalone paragraph an answer
engine lifts — must state what "managed IT services" means and land the coherence
sentence from the master plan:

> Managed IT services means one partner who chooses your software, wires it together,
> keeps every account and licence under control, and is the first call when any of it
> breaks. We don't build the software and we don't do the specialist work — we pick who
> does, wire it into everything else, own the relationship, and stay the one number you
> call. For a fifty-person company that usually means reclaiming somewhere between a
> tenth and a third of the software budget in the first year, and cutting the time a new
> hire waits for access from days to under an hour.

(First two sentences are new — they define the term and state the coherence sentence
verbatim. Third sentence is the existing page's, kept — it's already a strong
quotable stat-bearing claim per `geo.md`.)

### 4 — What goes wrong (`SectionIntro` + `Stats`)

**Keep `problems` and `softwareStats` arrays as-is** — all four problems and both sourced
stats are still accurate and untouched by the rename or the bookkeeping/payroll decision.
No edit needed here.

### 5 — What we do (`SectionIntro` + `Cards`)

**Keep the `work` array's four cards as-is** (Choose / Implement & integrate / AI where
it earns its place / Run it) — already claim-stripped this session (card 04's heading is
now "Identity, licences, access, support."). SectionIntro title "Four things, in the
order they matter." stays.

**Add two named sub-heads directly under this section**, in a `Prose` block, giving the
work already described in "Nobody owns the list" (problem card 1) and card 04 ("Run it")
the exact nouns people search for — currently described but never named:

> **Vendor management, named.** Choosing, licensing, and staying the point of contact for
> every vendor in the stack — this is what "vendor management" means in practice, and
> it's the part most sprawl audits skip because nobody's job is to look at all the
> vendors together.
>
> **Licence right-sizing.** The seat count almost never matches the login count. Cutting
> the difference is usually the fastest way this pays for itself.

/ carries `vendor management` (390/mo CA, 5,400 US) — currently the single largest
keyword gap identified in the CSV pull ("Underused; you already do this").

### 6 — NEW: The software we run (link row to the 7 subpages)

New section, placed after "What we do" and before "How it works." Page-local markup —
no new shared component (`Cards.astro` has no `href` field; this follows the same
"inline nav of links" pattern `IndustryPage.astro` already uses for its 3-pillar
cross-link row).

```
eyebrow: "What we run it on"
H2:      "Seven categories, one point of contact."
lead:    "Whatever you're already paying for, if it's sound — we work with what's
          there before we suggest replacing it."
```

Seven links, each a category name (exact match to its own future page title) + one line:

| Link text                         | Href                                                | One-liner                                                                                           |
| --------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Productivity software             | `/managed-it-services/productivity-software`        | Microsoft 365, Google Workspace, Zoho Workplace — the tenant your team lives in every day.          |
| Communication software            | `/managed-it-services/communication-software`       | Teams, Slack, Zoho Cliq — calls, chat and meetings on one identity.                                 |
| CRM software                      | `/managed-it-services/crm-software`                 | Zoho Bigin, HubSpot, Jobber — the record of who you talk to and what they bought.                   |
| HRIS software                     | `/managed-it-services/hris-software`                | The employee record that drives every other account — the joiner/mover/leaver trigger.              |
| Invoicing software                | `/managed-it-services/invoicing-software`           | Zoho Invoice, Jobber — what goes out gets paid, and lands coded correctly when it does.             |
| Bookkeeping and payroll software  | `/managed-it-services/bookkeeping-payroll-software` | QuickBooks, Zoho Books, Payworks, ADP — the books your accountant works from, the runs you approve. |
| Job and project tracking software | `/managed-it-services/job-tracking-software`        | Jobber, Zoho Projects — what's promised and what's actually done.                                   |

Each of these seven rows is its own PLAN file (#11–17), gated on the Semrush pass. This
section can ship with the links live even before every subpage carries final SEO copy —
un-gated placeholder pages beat a 404 from this row.

### 7 — How it works (`StackAnimation`)

Unchanged.

### 8 — When something breaks → retitled for the IT-support keyword cluster

Current eyebrow "When something breaks" and H2 "One number, every vendor." **keep both**
— but the section is where `it support` / `it support for small business` /
`it helpdesk services` belong per the original disposition table, and none of those words
appear in it today. Add one clause to the lead:

> "This is the part most people underestimate until they've lived without it. You don't
> call the software vendor, and you don't work out which of your vendors owns the
> problem. You call us — this is the IT support most of our clients actually need:
> not a help desk that reroutes you, a single point of contact who already knows your
> stack."

Body paragraphs (the "We're your first line…" / "What that's worth…" / claim-stripped
hardware paragraph) — **unchanged**, already correct from this session's claim strip.

### 9 — NEW: Service area

Not on this page today. Add directly after section 8, matching `about.astro`'s existing
caption-style line verbatim (keeps the fact single-sourced in voice, not re-invented):

> Based in Ottawa, working throughout Ontario, and supporting businesses elsewhere in
> Canada remotely.

`font-caption text-neutral-x-muted`, same treatment as `about.astro:218-221`.

### 10 — Key partners

Unchanged (`<KeyPartners />`).

### 11 — FAQ

**Keep all 11 existing questions** — the MSP one, the "already have a provider" one, the
pricing-model one, MFA, MDR/EDR (already claim-stripped), onboarding/offboarding, response
time, "isn't M365 already backed up," "will you recommend less software," AI enablement,
funding. All still accurate.

**Add two new questions**, addressing what a reader will ask now that this page visibly
absorbs back-office's software categories:

> **Do you do our bookkeeping?**
> No — we select, set up and administer the software (QuickBooks, Zoho Books) your
> books run on. The books themselves stay with you or your accountant. It's the same
> relationship we have with Microsoft: we run the tenant, not the content that lives
> in it.

> **Do you run our payroll?**
> We administer the system — Payworks, ADP, or whatever you're already on — and keep it
> wired to your HRIS so a start date or a termination drives it correctly. You submit
> and approve every run yourself.

(Matches this session's decision exactly: software administration, not the work itself;
client approves every payroll run. Neither answer names DoyoBooks — see master plan's
Open decisions §1.)

### 12 — CTA (`PageCta`)

```
title: "Tell us what you're running."                         (unchanged)
lead:  (unchanged — the "seats in use vs. seats paid for" line still holds)
note:  {FUNDING_NOTE}
links: [
  { label: "Digital marketing", href: "/digital-marketing" },  // was "Digital presence" → /digital-presence
  { label: "Pricing", href: "/pricing" },
  { label: "Industries", href: "/industries" },                // new — the other pillar link this page never had
]
```

`{ label: "Back office", href: "/back-office" }` is **removed**, not redirected-through —
back office is folded into this pillar, so linking to it from its own CTA is circular.

---

## Internal links out (this page's job)

- → `/pricing` (hero secondary CTA, CTA link row)
- → `/digital-marketing` (CTA link row — the other pillar; `ia.md` rule 1: "every pillar
  links to the other")
- → `/industries` (CTA link row)
- → each of the 7 software-category subpages (new section 6)

## Internal links elsewhere that must be repointed here (not this file, but blocked on it)

Every one of these currently says `/business-software` and must become
`/managed-it-services` once this page ships — listed so nothing is missed when the home
page, digital-marketing page, and industry pages get their own passes:

- `src/layouts/PineLayout.astro:68-79` (nav dropdown) and `:290-320` (footer column)
- `src/components/sections/Services.astro` (homepage pillar card)
- `src/pages/digital-presence.astro`'s CTA link row (mirrors this page's back-link)
- `src/pages/industries/index.astro:78-93` (`ItemList` schema `url`s) and each
  `_trades.astro` / `_real-estate.astro` / `_professional-services.astro` /
  `_clinics.astro`'s 4-link `<nav>` inside `IndustryPage.astro`
- `src/pages/pricing.astro` (wherever it cross-links to the pillar)

These are the redirect's actual justification: leaving them pointed at `/business-software`
would work (301 catches it) but costs a hop on every internal click and dilutes the signal
the redirect exists to preserve.

---

## Verification for this page specifically

1. Route resolves at `/managed-it-services`; `/business-software` 301s to it (already
   configured; confirm post-move).
2. Rendered `<title>` is exactly `Managed IT services & vendor management, Ontario — Vitops`
   (57 chars).
3. `service()` schema validates (Rich Results Test) with the new name/description/url.
4. All 7 category links resolve to _something_ (even a stub) before this page ships —
   no 404 in the new section.
5. Grep this file for `warrant`, `MDM`, `EDR`, `enrol` — should return nothing (claim
   strip already applied to the source it's built from).
6. Grep for `bookkeeping services`, `payroll services`, `hr outsourcing`, `doyobooks` —
   should return nothing (forfeited/parked terms, per master plan).
