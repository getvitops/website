---
page: /industries/professional-services
un-parks: src/pages/industries/_professional-services.astro → src/pages/industries/professional-services.astro
status: draft-v1
priority: 21
depends_on: [PLAN-industries (shell fix)]
blocks: []
target_geography: Ontario (primary)
primary_keywords:
  - per ia.md's original targeting: matter-based permissions, conflict checks, retention rules, document hygiene — no volumes pulled, differentiator-driven
forbidden_terms: []
title_prop: "IT, HR and digital presence for Ontario law and accounting firms"
title_char_count: 51
rendered_title: "IT, HR and digital presence for Ontario law and accounting firms — Vitops"
rendered_char_count: 60
note: "title still says 'digital presence' — update to 'digital marketing' to match the pillar rename: 'IT, HR and digital marketing for Ontario law and accounting firms' (54 chars, rendered 63 — 3 over. Trim: drop 'HR', already folded into managed IT — 'IT and digital marketing for Ontario law and accounting firms' (52 chars, rendered 61 — still 1 over. Final: 'IT & marketing for Ontario law and accounting firms' (44 chars, rendered 53 ✅)."
schema_types: [Service, BreadcrumbList]
links_out: ["/managed-it-services", "/digital-marketing", "/pricing"]
links_in_needing_repoint: ["industries/index.astro card (via PLAN-industries.md)"]
open_questions:
  - "Naming inconsistency flagged by the explore pass: this file's eyebrow is 'Professional firms' while industries/index.astro's card name is 'Legal, accounting and professional firms'. Pick one — recommend 'Professional firms' (shorter, already the eyebrow) and update index.astro's card `name` to match, since the eyebrow renders on THIS page repeatedly (H1 area, FAQ title, nav) while the hub only shows its name once."
---

# PLAN — `/industries/professional-services` (un-park `_professional-services.astro`)

**Step 21.** H1 unchanged: "Access control is a professional obligation here, not an
IT preference." Structural change is the `pillars` collapse, plus a title-tag fix (see
frontmatter `note` — the current title still says "digital presence") and a naming
inconsistency to resolve against the hub.

---

## Title tag — needs fixing regardless of the pillar merge

Current: `IT, HR and digital presence for Ontario law and accounting firms` — already
51 chars/60 rendered (at budget), but says "digital presence," which no longer exists
as a pillar name. See frontmatter for the trimmed replacement:
**`IT & marketing for Ontario law and accounting firms`** (44 chars, rendered 53).

## `pillars` prop — before → after

**Before** (3 entries):

- Business software: practice/matter management, permissions follow matters, AI
  constrained to what the user can already see.
- Back office: onboarding sequenced so conflict check precedes access, permission
  changes follow matter moves, offboarding closes access cleanly, payroll/benefits run
  to schedule.
- Digital presence: practice-area pages, conflict-safe intake routing.

**After** (2 entries):

```ts
pillars={[
  {
    label: "Managed IT services",
    body: "Practice or matter management chosen and configured so permissions follow matters, with document storage structured to match. Time and billing connected to accounting. Where AI is used, it's constrained to what the individual user is already entitled to see — which is the whole question in a firm, and the one most AI rollouts get wrong. Onboarding is sequenced so the conflict check precedes access, and permission changes follow people as they move between matters rather than accumulating over a career. Offboarding closes access cleanly and preserves the record; payroll and benefits software run to schedule alongside it.",
  },
  {
    label: "Digital marketing",
    body: "Practice-area pages that answer the question a prospective client is actually asking, with intake that routes to the right person and doesn't create a conflict problem before anyone has checked. Professional, quiet, and fast — the register your clients expect.",
  },
]}
```

`directAnswer`, `differences` (3 cards), `faq` (5 items), `ctaTitle`/`ctaLead` —
**unchanged**.

## Files

Rename `_professional-services.astro` → `professional-services.astro`, apply the title
and `pillars` diffs above. Cross-reference `industries/index.astro`'s card `name` for
the eyebrow-consistency fix (see Open questions).

## Verification

Route resolves at `/industries/professional-services` (currently 404). Rendered title
≤60. Standard checklist otherwise.
