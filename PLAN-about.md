---
page: /about
status: draft-v1
priority: 23
depends_on: [PLAN-managed-it-services, PLAN-digital-marketing]
blocks: []
target_geography: Ottawa (the entity's own location statement), Ontario
primary_keywords:
  - none — this is the E-E-A-T/entity page, not a ranking target. "Ottawa-based operations partner for Ontario small businesses" (about.astro's existing lead line) is the phrase worth mirroring into the home title, not the reverse.
forbidden_terms: []
title_prop: "About Vitops — our mission, values and how we work"
title_char_count: 46
rendered_title: "About Vitops — our mission, values and how we work — Vitops"
rendered_char_count: 55
note: "already within budget, no change needed"
schema_types: [Organization/ProfessionalService via organizationGraph, Person x2, BreadcrumbList]
links_out: ["/managed-it-services", "/digital-marketing", "/pricing"]
links_in_needing_repoint: []
open_questions:
  - "Shared with the master plan's Open decisions: ViAbilityHR, Monad Media, and now DoyoBooks are three related-entity disclosure questions this page has left unresolved (content-plan/copy/about.md:11 already flags the first two). Worth resolving all three in one sentence in the Scope section once DoyoBooks's positioning is decided — not blocking this pass, since nothing here currently names DoyoBooks."
already_done_this_session:
  - "Claim-strip already applied: the warranty/device-enrolment line under 'Not a good fit' now reads as a hardware-vs-software boundary statement instead."
---

# PLAN — `/about` — mostly pillar-name consistency, one open disclosure question

**Step 23.** Genuinely minor — this page's substance (mission/vision/values, founder
bios, the "we run it, we don't advise on it" boundary) is unaffected by the pillar
rename. Three link updates and one prose mention need to change.

---

## Changes

### 1 — CTA link row (lines 240–242)

```diff
links={[
- { label: "Business software", href: "/business-software" },
- { label: "Digital presence", href: "/digital-presence" },
- { label: "Back office", href: "/back-office" },
+ { label: "Managed IT services", href: "/managed-it-services" },
+ { label: "Digital marketing", href: "/digital-marketing" },
  { label: "Pricing", href: "/pricing" },
]}
```

### 2 — Prose mentions (lines 58, 66, 75)

Description, hero lead, and mission-section body all say some variant of "the digital
presence... and the software and back-office operations behind it." These are
narrative sentences, not pillar labels, so they don't need a mechanical find-replace —
but "back-office operations" as a separate clause now overstates what's performed
(bookkeeping/payroll are software-administered, not run). Suggested tightening,
applied consistently across all three:

```
was:  "...running the digital presence a business is seen through and the software
       and back-office operations behind it."
new:  "...running the digital presence a business is seen through and the software
       operations behind it — including the accounts, HR systems and vendor
       relationships most owners would rather not think about."
```

### 3 — Everything else

**Unchanged.** Mission, vision, values, founder bios, the fit section ("who this works
for, who it doesn't" — already claim-stripped this session), the boundaries section,
and the CTA title/lead all stand as written.

---

## Files

`src/pages/about.astro`.

## Verification

Standard checklist. Confirm the prose tightening in §2 doesn't contradict whatever
`PLAN-pricing.md`'s bookkeeping/payroll blocking decision resolves to.
