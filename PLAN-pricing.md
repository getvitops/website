---
page: /pricing
status: draft-v1 — Blocking decision RESOLVED 2026-09-05, executed directly on pricing.astro (see §Blocking below)
priority: 4
depends_on: [PLAN-managed-it-services, PLAN-digital-marketing]
blocks: []
target_geography: Ontario (primary), Canada-wide (secondary — funding block already says "federal" separately)
primary_keywords:
  - "managed it services pricing" — unclaimed, nobody publishes real numbers, this site does
  - "how much does it support cost for a small business" — unclaimed
  - "msp pricing per user" — unclaimed
forbidden_terms:
  - "bookkeeping services" / "payroll services" as SOLD line items (see Blocking)
title_prop: "Pricing — managed IT services & digital marketing, Ontario"
title_char_count: 55
rendered_title: "Pricing — managed IT services & digital marketing, Ontario — Vitops"
rendered_char_count: 64
note: "64 > 60 budget. Title needs a shorter form — see §Head below; flagging the overage rather than silently fixing it because the two obvious shortenings trade off differently (see options)."
schema_types: [Offer, PriceSpecification — currently NONE on this page, technical prerequisite #5]
links_out: ["/managed-it-services", "/digital-marketing", "/funding", "#contact"]
links_in_needing_repoint: []
open_questions: []
resolution_2026_09_05: "No clients on any of these services yet, so the owner cleared this directly: bookkeeping's $300–800/mo band is REMOVED entirely (no replacement line) until the DoyoBooks ('DoYo') positioning question resolves. Managed payroll and benefits administration KEEP their existing $30/$20 per-user prices, reframed from full-service to software-administration — the client submits and approves every pay run; Vitops administers the software (schedule, remittance calendar, deduction sync) rather than running it. Already executed directly in src/pages/pricing.astro — see the diff notes below, kept for the record rather than as a still-open TODO."
---

# PLAN — `/pricing`

**Step 4.** The blocking decision below is **resolved and already executed** — this
file now documents what changed, for the record, rather than flagging an open question.

Full file read (1204 lines: header data arrays 1–283, business-software pricing
284–428, back-office pricing 429–478, website tiers 479–597, bundle section 598–667,
one-off callout 668–697, funding block 698–737, fine print + close 738+).

---

## ✅ Resolved and executed — the back-office pricing section (`id="back-office-pricing"`)

No clients on any of these services yet, which is what unblocked this — the owner
confirmed directly it's fine to update. **Already done in `src/pages/pricing.astro`**:

| Line                    | Before                                                                    | After                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bookkeeping             | $300–800/mo, banded — **removed entirely**                                | Gone. No replacement line. Revisit once DoyoBooks positioning resolves.                                                                                          |
| Managed payroll         | $30/user/mo — "pay runs prepared and submitted... from your account"      | **Same price**, reframed: "payroll software administered — pay schedule, remittance calendar and filing dates configured"; client submits and approves every run |
| Benefits administration | $20/user/mo — "enrolments, life events, terminations... handled directly" | **Same price**, reframed: software configured for enrolments/life events/deductions; broker keeps the plan, Vitops administers the software it runs on           |

Also fixed as direct consequences (would have been factually wrong to leave):

- The business-software section's `"Bookkeeping, payroll and benefits administration are
priced separately"` pointer sentence → `"Payroll and benefits software administration
are priced separately"`.
- The section's own lead paragraph, which explained bookkeeping's banding as "the
  exception" — rewritten now that there's no exception left to explain.
- The page's meta `description`, which advertised "bookkeeping banded by volume" —
  removed.
- The dev-facing comment block above the `backOfficeServices` array — rewritten to
  record the 2026-09-05 decision and point at `PLAN-mit-bookkeeping-payroll-software.md`
  for where bookkeeping _software_ administration (distinct from a priced bookkeeping
  service) still lives.

**Not touched, and still queued for whenever the fuller pillar-rename pass on this page
happens** (title tag, section eyebrow "Back office" → folded into "Managed IT services",
the Vitops Complete bundle card merge from 3 cards to 2) — those are cosmetic/structural,
not the pricing-model question, and were already scoped as a separate pass in this file's
"Everything else — ready" section below.

---

## Everything else — ready

### Head

Current: `title="Pricing"` (literally one word — the weakest title on the site).
`description` already updated (see §Resolved above — bookkeeping-by-volume removed).
Title itself is still queued — not yet touched, since it's part of the fuller
pillar-rename pass, not the pricing-model question:

```
title: "Managed IT and digital marketing pricing, Ontario"
```

50 chars → rendered 59 ✅.

### Business software section (lines 298–427)

- **Eyebrow**: "Business software" → "Managed IT services" (matches the pillar rename;
  not yet executed — queued with the fuller pass).
- **H2, `softwarePlan`, `softwareAddons`, the "we don't resell software" note, the
  licence pass-through note, the MDR/EDR honest-gap callout** — all **unchanged**,
  already correct. The MDR callout's heading/eyebrow were already claim-stripped this
  session ("What we don't run", not "...run yet").
- The "priced separately" sentence pointing at back-office — **done**, see §Resolved.

### Website plans section (lines 479–597)

**Unchanged entirely.** Three tiers, the Sovereign not-yet-built callout, the $80/hour
overage rate, `presenceServices` add-ons — none of this touches the renamed pillars or
the bookkeeping/payroll decision. Only the section eyebrow "Digital Presence" →
"Digital marketing".

### Bundle section — "Vitops Complete" (lines 598–667)

- Eyebrow-titled cards currently: "Software + Back office", "Software + Digital
  presence", "All three". With two pillars these become **two cards, not three**:
  - "Managed IT + Digital marketing" — merge the current "Software + Digital presence"
    card's lead-generation argument with whatever survives of "Software + Back office"'s
    onboarding argument (the JML sentence is fine to keep; the payroll/benefits-enrolment
    clause is the blocked part).
  - Drop the third "All three" card, or repurpose it as the single combined-value card
    now that two services _is_ all of them — "One operator, one bill, one number" reads
    fine either way.
- **"drops 15% from the second service on"** — unaffected by the pillar count, still
  accurate.
- The audit's own suggestion (documented in the master plan's Context) was to reframe
  this discount as a **reporting view** ("the three reports become one") rather than a
  price cut — that reporting language is explicitly out of scope this pass (the
  session's parallel-built deliverable), so **do not add it here**. Keep the discount
  framing as-is.

### One-off callout, funding block, fine print (lines 668–759)

**All unchanged — and the funding block is already current.** A concurrent session
already corrected the TDP reference here (removed the $50,000 TDP figure, re-dated to
"As of September 2026, DMAP covers up to $15,000") while this plan was in progress. No
edit needed; verify it survives whatever else touches this file.

---

## Files

`src/pages/pricing.astro`. `src/lib/schema.ts` — no changes needed for `service()`;
add `Offer`/`PriceSpecification` schema here (technical prerequisite #5, deferred from
`0a`) once the Blocking section resolves, since the schema should describe real,
current prices.

## Verification

Standard checklist, plus: **do not ship this page until the Blocking section has an
owner decision** — grep for `$300–800`, `$30` under a `payroll` context, and `$20` under
a `benefits` context before publishing, to confirm they were either intentionally kept
or deliberately replaced, never silently left contradicting the rest of the site.
