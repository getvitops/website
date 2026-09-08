---
page: /industries/real-estate
un-parks: src/pages/industries/_real-estate.astro → src/pages/industries/real-estate.astro
status: draft-v1
priority: 20
depends_on: [PLAN-industries (shell fix)]
blocks: []
target_geography: Ontario (primary)
primary_keywords:
  - per ia.md's original targeting: agent onboarding/offboarding at roster speed, board tools, commission admin, farm-area campaigns
  - Semrush pass 2026-09-05 (CA): "real estate brokerage software" 40/mo, no volume/intent data (thin); "it support for real estate ontario" returns 0. Neither clears a real threshold — differentiator-driven copy stays correct, no head-term rewrite warranted. The stronger cross-sell is the existing `/managed-it-services/crm-software` link (CRM implementation itself has real CA/US volume — see that PLAN file).
forbidden_terms: []
title_prop: "IT, HR and marketing for Ontario real estate brokerages"
title_char_count: 48
rendered_title: "IT, HR and marketing for Ontario real estate brokerages — Vitops"
rendered_char_count: 57
schema_types: [Service, BreadcrumbList]
links_out:
  [
    "/managed-it-services",
    "/digital-marketing",
    "/pricing",
    "/managed-it-services/crm-software (cross-link, CRM is a named pain point here)",
  ]
links_in_needing_repoint: ["industries/index.astro card (via PLAN-industries.md)"]
open_questions: []
already_done_this_session:
  - "Claim-strip already applied: 'one place data crosses, monitored' → '...logged' (the word 'monitored' implied a monitoring service not offered)."
---

# PLAN — `/industries/real-estate` (un-park `_real-estate.astro`)

**Step 20.** No FAQ on the live file today (the Explore pass found 3 differences, 0
FAQ items listed in the original per-page table, though the file itself does carry 4
FAQ items on inspection — carrying forward as-is). H1 unchanged: "A roster that moves
faster than your systems do." Only structural change is the `pillars` collapse.

**New cross-link opportunity**: this vertical already names CRM configuration as a
specific pain point ("CRM chosen and configured around how your agents actually
work") — once `/managed-it-services/crm-software` exists (step 13), link to it directly
from this pillar's body rather than only from the hub.

---

## `pillars` prop — before → after

**Before** (3 entries):

- Business software: CRM chosen/configured around actual agent workflow, board-tool
  boundary documented and watched, one number to call.
- Back office: agent onboarding/offboarding as same-day processes, commission
  administration and payout records reconciled, licensing/registration documentation
  kept current.
- Digital presence: farm-area campaigns, agent-profile pages, recruitment campaigns.

**After** (2 entries):

```ts
pillars={[
  {
    label: "Managed IT services",
    body: "CRM chosen and configured around how your agents actually work rather than how the demo video does, connected to your listing and marketing tools — see the fuller version of this on our CRM software page. The board-tool boundary documented and watched. Agent onboarding and offboarding run as same-day processes, with commission administration and payout records kept reconciled and licensing documentation kept current rather than reconstructed annually. One number to call when an agent can't get into something on a Saturday, which is when it will happen.",
  },
  {
    label: "Digital marketing",
    body: "Farm-area campaigns and agent-profile pages that route enquiries to the right person automatically, so a lead doesn't sit in a general inbox while three agents assume someone else has it. Recruitment campaigns too, since for most brokerages agent acquisition is the harder of the two markets.",
  },
]}
```

`directAnswer`, `differences` (3 cards, already claim-stripped), `faq` (4 items),
`ctaTitle`/`ctaLead` — **unchanged**.

## Files

Rename `_real-estate.astro` → `real-estate.astro`, apply the `pillars` diff above.

## Verification

Route resolves at `/industries/real-estate` (currently 404). Standard checklist.
