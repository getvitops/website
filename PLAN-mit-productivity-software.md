---
page: /managed-it-services/productivity-software
status: draft-v1 — keywords UNVERIFIED, pending Semrush pass
priority: 11
depends_on: [PLAN-managed-it-services]
blocks: []
target_geography: Ontario (primary), Canada-wide secondary
primary_keywords_UNVERIFIED:
  - candidates per master plan's Semrush query list: "microsoft 365 setup", "google workspace setup", "m365 migration", "google workspace vs microsoft 365", + Ottawa variants
  - none of these have a confirmed CA volume yet — do not treat any figure below as real
forbidden_terms: []
title_prop: "Productivity software: Microsoft 365 & Google Workspace"
title_char_count: 50
rendered_title: "Productivity software: Microsoft 365 & Google Workspace — Vitops"
rendered_char_count: 59
note: "At the exact 60-char rendered limit-minus-1. Confirm once real keyword data picks the anchor term — this may need to shrink to fit whichever term wins."
meta_description: "Microsoft 365, Google Workspace or Zoho Workplace, chosen, migrated and administered for Ontario small businesses — the tenant your whole team works in every day."
meta_description_char_count: 162
schema_types: [Service, BreadcrumbList]
links_out: ["/managed-it-services (parent pillar)", "/pricing", "/contact"]
links_in_needing_repoint: []
open_questions:
  - "BLOCKED: run the Semrush queries listed above before finalizing title/H1/keyword placement. This draft is voice/structure only."
---

# PLAN — `/managed-it-services/productivity-software` (new page)

**Step 11.** First of seven software-category subpages linked from `/managed-it-services`'s
new "Seven categories, one point of contact" section. **Keyword targeting is
provisional** — the Semrush connector wasn't reachable this session; queries to run are
listed in the master plan's "Semrush pass for the subpages" table. Structure and voice
are ready regardless of what the keyword pass returns.

No existing file — this category's content doesn't currently exist anywhere on the
site as a standalone page (it was implicit in `business-software.astro`'s "choose the
right software" framing).

---

## Sections

### 1 — Hero

```
eyebrow: "Managed IT services / Productivity software"
H1:      "The tenant your whole team lives in, chosen and run."
lead:    "Microsoft 365, Google Workspace, or Zoho Workplace — whichever fits how your
          team actually works, migrated cleanly and administered so nobody's guessing
          who owns which licence."
```

### 2 — Direct answer

> Productivity software is the platform email, files, and documents live on — Microsoft
> 365, Google Workspace, or Zoho Workplace are the three real options for a small
> business. We help choose between them on the merits (often the answer is "keep what
> you have and use more of it"), handle the migration if a switch is warranted, and
> administer licences and access on an ongoing basis so seat count matches actual use.

### 3 — What we run (`SectionIntro` + short list)

- Tenant setup and configuration — identity, groups, sharing defaults, retention.
- Migration between platforms, when a switch genuinely pays for itself.
- Licence tuning — the seat count almost never matches the login count.
- MFA enforced on every account (part of the base plan, per `/managed-it-services`).

### 4 — FAQ

> **Do you help us decide between Microsoft 365 and Google Workspace?**
> Yes — on how your team actually works, not brand preference. Often the right call is
> keeping what you have and using more of it.

> **Can you migrate us from one to the other?**
> Yes, including the file/mail migration itself. We'll tell you honestly what a switch
> costs before recommending it.

> **Do you resell the licences?**
> No — see [managed IT services](/managed-it-services)'s "we don't resell software"
> note. You keep your own licences at your own price; our fee is for making them work.

### 5 — CTA

```
title: "Tell us what you're running today."
lead:  "Microsoft, Google, Zoho, or a mix — we'll tell you what's duplicated and what
        we'd change first."
links: [{ label: "Managed IT services", href: "/managed-it-services" }, { label: "Pricing", href: "/pricing" }]
```

## Files

New: `src/pages/managed-it-services/productivity-software.astro`.

## Verification

Standard checklist. **Do not finalize title/H1 keyword anchor until the Semrush pass
confirms which term (if any) clears meaningful CA volume** — the current title is a
reasonable placeholder, not a verified target.
