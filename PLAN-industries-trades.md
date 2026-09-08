---
page: /industries/trades
un-parks: src/pages/industries/_trades.astro → src/pages/industries/trades.astro
status: draft-v1
priority: 19
depends_on: [PLAN-industries (shell fix)]
blocks: []
target_geography: Ontario (primary)
primary_keywords:
  - per ia.md's original targeting: field tablets, offline capability, dispatch, WSIB/COR readiness, seasonal ad cycles
  - Semrush pass 2026-09-05 (CA): "trades business software" and "it support for contractors" both return 0 volume — confirms this vertical has no head term to chase. Differentiator-driven copy (already shipped) is the correct call, not a placeholder waiting on data.
forbidden_terms:
  - device-management language — already claim-stripped this session (see below)
title_prop: "IT, HR and marketing for Ontario trades and contractors"
title_char_count: 51
rendered_title: "IT, HR and marketing for Ontario trades and contractors — Vitops"
rendered_char_count: 60
schema_types: [Service, BreadcrumbList, FAQPage]
links_out: ["/managed-it-services", "/digital-marketing", "/pricing"]
links_in_needing_repoint: ["industries/index.astro card (via PLAN-industries.md)"]
open_questions: []
already_done_this_session:
  - "Claim-strip already applied to this file: the 'device will be dropped' card and the tablet-loss FAQ answer no longer describe remote wipe/device enrolment (MDM) — reframed as account/login revocation, which is identity work Vitops actually does. See PLAN-managed-it-services.md's claim-strip list for the full before/after."
---

# PLAN — `/industries/trades` (un-park `_trades.astro`)

**Step 19.** Content is already strong (h1 unchanged: "The office should keep up with
the crew, not the other way round.") and already claim-stripped this session. The only
structural change needed is the `pillars` prop: 3 entries (Business software / Back
office / Digital presence) collapse to 2, merging the back-office body into managed IT.

---

## `pillars` prop — before → after

**Before** (3 entries, current file):

- Business software: field service/dispatch software, offline-first, accounts run
  centrally.
- Back office: seasonal hiring as a repeatable process, offboarding, payroll software
  configured with overtime/travel-time rules, WSIB reporting.
- Digital presence: Local Services Ads, map visibility, seasonal campaign weighting.

**After** (2 entries):

```ts
pillars={[
  {
    label: "Managed IT services",
    body: "Field service and dispatch software chosen for offline behaviour first, connected to accounting so job costs don't get retyped. Accounts and permissions run centrally, so a lost tablet is one login cut off, not a device to chase down. Seasonal hiring handled the same way: accounts, safety orientation, and payroll software configured with the overtime and travel-time rules set correctly before the first shift, with offboarding that actually revokes access when the season ends and WSIB reporting kept current. One number to call when any of it breaks.",
  },
  {
    label: "Digital marketing",
    body: "Emergency and same-day work is a search problem — Local Services Ads, map visibility, and a site that loads on a phone in a driveway. Campaigns weighted to your season rather than run flat all year, because nobody needs to be spending on furnace work in June.",
  },
]}
```

Everything else — `directAnswer`, `differences` (4 cards, already claim-stripped),
`faq` (4 items, already claim-stripped), `ctaTitle`/`ctaLead` — **unchanged**.

## Files

Rename `src/pages/industries/_trades.astro` → `src/pages/industries/trades.astro`,
apply the `pillars` diff above.

## Verification

Route resolves at `/industries/trades` (currently 404, underscore-prefixed). Standard
checklist otherwise.
