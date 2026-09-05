---
page: /industries/clinics
un-parks: src/pages/industries/_clinics.astro → src/pages/industries/clinics.astro
status: draft-v1
priority: 22
depends_on: [PLAN-industries (shell fix)]
blocks: []
target_geography: Ontario (primary)
primary_keywords:
  - per ia.md's original targeting: PHIPA-aware access, EMR-adjacent work, recall campaigns — no volumes pulled, differentiator-driven
forbidden_terms:
  - device/endpoint language — already claim-stripped this session (see below)
title_prop: "IT, HR and digital presence for Ontario medical and dental clinics"
title_char_count: 51
rendered_title: "IT, HR and digital presence for Ontario medical and dental clinics — Vitops"
rendered_char_count: 60
note: "same issue as professional-services — says 'digital presence'. Shortened replacement: 'IT & marketing for Ontario medical and dental clinics' (46 chars, rendered 55 ✅)."
schema_types: [Service, BreadcrumbList, FAQPage]
links_out: ["/managed-it-services", "/digital-marketing", "/pricing"]
links_in_needing_repoint: ["industries/index.astro card (via PLAN-industries.md)"]
open_questions:
  - "Same naming inconsistency as professional-services: this file's eyebrow is 'Clinics' while industries/index.astro's card name is 'Medical and dental clinics'. Recommend keeping 'Clinics' as the eyebrow (matches the FAQ title 'Questions clinics ask us.') and confirming index.astro's card name stays the fuller descriptive form — the hub needs the fuller phrase for scanability across 4 cards, the individual page can be terser. Flagging for a decision, not forcing one."
already_done_this_session:
  - "Claim-strip already applied: meta description 'endpoints that stay out of the way at the front desk' → 'front-desk software that stays out of the way'."
---

# PLAN — `/industries/clinics` (un-park `_clinics.astro`)

**Step 22.** Last of the four verticals. H1 unchanged: "Nothing at the front desk can
wait for IT." Already claim-stripped this session (meta description). Needs the same
title-tag fix as professional-services (still says "digital presence") plus the
`pillars` collapse.

---

## Title tag — needs fixing regardless of the pillar merge

Current: `IT, HR and digital presence for Ontario medical and dental clinics`.
Replacement: **`IT & marketing for Ontario medical and dental clinics`** (46 chars,
rendered 55).

## `pillars` prop — before → after

**Before** (3 entries):

- Business software: environment around the EMR — workstations, imaging, scheduling,
  payments, identity layer, individual logins, verified backups.
- Back office: staff onboarding ready before first shift (privacy training
  acknowledgement recorded), permission changes follow role changes, payroll and
  benefits for a mixed roster.
- Digital presence: site answering common patient questions, online booking, recall
  campaigns.

**After** (2 entries):

```ts
pillars={[
  {
    label: "Managed IT services",
    body: "The environment around the EMR: workstations, imaging, scheduling, payments, and the identity layer underneath. Individual logins that are fast enough that reception doesn't resent them. Backups that are actually verified — a backup nobody has restored from is a hope, not a backup. Staff onboarding ready before the first shift, including the privacy training acknowledgement, so it's recorded rather than assumed, with permission changes that follow role changes. Payroll and benefits software configured for a mixed roster of full-time, part-time and casual staff, which is more complicated than it looks and where most clinic payroll errors originate.",
  },
  {
    label: "Digital marketing",
    body: "A site that answers what a prospective patient actually asks — are you taking patients, where do I park, what does the first visit cost — with online booking that writes into your schedule. Recall campaigns that fill gaps without saying anything about anyone's treatment.",
  },
]}
```

`directAnswer`, `differences` (3 cards), `faq` (5 items), `ctaTitle`/`ctaLead` —
**unchanged**.

## Files

Rename `_clinics.astro` → `clinics.astro`, apply the title and `pillars` diffs above.

## Verification

Route resolves at `/industries/clinics` (currently 404). Rendered title ≤60. Standard
checklist otherwise.
