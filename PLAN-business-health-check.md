---
page: /business-health-check
status: draft-v1
priority: 6
depends_on: [PLAN-managed-it-services, PLAN-digital-marketing]
blocks: []
target_geography: Ontario (primary — DMAP eligibility is Ontario-specific), Canada-wide secondary
primary_keywords:
  - "seo audit" (1300/mo CA, 22200/mo US — highest-volume commercial term anywhere in the site's mix)
  - "website health check" (70/mo CA)
secondary_keywords_mentioned_not_owned:
  - "ai visibility" — owned by /digital-marketing's AEO section; this page names the
    check, doesn't compete for the bare term
  - "vendor management" — owned by /managed-it-services; this page links out rather
    than re-targeting
forbidden_terms:
  - "business health" as a ranking target — dead term (20/mo CA, 210/mo US); it's brand
    language and the name of this deliverable ONLY, never the keyword this page tries to rank on
  - any promise of an ongoing/monthly reporting deliverable — that's the parallel-built
    feature the session has kept out of copy; this page is a ONE-TIME assessment/audit,
    not the recurring "one view" report
title_prop: "Business health check — SEO, AI & software audit"
title_char_count: 47
rendered_title: "Business health check — SEO, AI & software audit — Vitops"
rendered_char_count: 56
meta_description: "A one-time read on where your operation stands: website and SEO audit, AI-visibility check, and software and licence spend review. DMAP can fund up to $15,000 of it."
meta_description_char_count: 173
note: "description is 13 over a loose ~160 guideline — trim 'A one-time read on' to 'A read on' if it needs to shrink; not a hard budget like the title tag."
schema_types: [Service, FAQPage, BreadcrumbList]
links_out: ["/managed-it-services", "/digital-marketing", "/funding/dmap", "/pricing"]
links_in_needing_repoint: []
open_questions: []
---

# PLAN — `/business-health-check` (new page)

**Step 6.** The acquisition asset the audit calls the highest-leverage single addition:
"business health" carries no search volume (20/mo CA), but the audit terms describing
its component parts are the highest-volume commercial cluster in the entire keyword pull.
Brand the H1, rank the H2s — same move as `/funding`, where DMAP/TDP own the searched
terms and "business health" is the wrapper narrative, never the target.

No existing file to diff against — built from the original audit brief plus this
session's product decisions (software-only bookkeeping/payroll, reporting deliverable
deferred).

---

## Sections, in order

### 1 — Hero

```
eyebrow: "Business health check"
H1:      "A read on where your operation actually stands."
lead:    "One engagement, three questions answered: how findable you are in search and
          in AI answers, what your software actually costs against what it's worth, and
          whether your books and pay runs are current. You keep the findings either
          way."
secondaryLabel: "See what funding covers"
secondaryHref: "/funding/dmap"
```

### 2 — Direct answer (`Prose lead`)

> A business health check is a one-time, written assessment of three things: how
> findable your business is in search and in AI-assistant answers, what your software
> and licences actually cost against what you use, and whether your bookkeeping and
> payroll systems are current or reconstructed after the fact. For most Ontario
> businesses under 150 people, DMAP covers up to $15,000 of it, matched — you keep the
> document whether or not you act on any of it.

### 3 — What it covers (`SectionIntro` + `Cards`, 3 cards — the audit's H2 list, reframed)

```
eyebrow: "What we check"
H2:      "Three questions, answered plainly."
```

| Card heading                         | Body                                                                                                                                                                                                                                                            | Keyword this section carries                                       |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| "Website and SEO audit."             | "Whether your site loads fast, whether it answers what people actually search, and where you rank against who's currently ahead of you locally."                                                                                                                | `seo audit` — the 1,300/22,200 term, stated as-is in the heading   |
| "AI visibility check."               | "Whether an AI assistant would name you when someone asks who to use for this in Ottawa — and if not, what's missing. Full explanation of what this means and why it's rising: [see digital marketing](/digital-marketing)."                                    | Names the check without re-targeting the bare term owned elsewhere |
| "Software and licence spend review." | "What you're paying for, what's actually used, and what a right-sized stack would cost — including your bookkeeping and payroll software, reviewed the same way as everything else in the stack. Full detail: [see managed IT services](/managed-it-services)." | Links out to `vendor management`'s home page rather than competing |

### 4 — Stats (`Stats`)

Reuse **existing, already-sourced** figures rather than inventing new ones — pulling
from `homeStats` (American Express SME Business Barometer 11 hours/week; Productiv
45%-of-licences) and `softwareStats` already live elsewhere on the site. No new sourcing
needed for a first pass; if a dedicated health-check-specific stat is wanted later, it
needs its own source per `Stats.astro`'s header-comment rule (every figure needs
`sourceLabel` + `sourceUrl`).

### 5 — What you get (`Prose`, not a stats/reporting promise)

> A written document: what's findable and what isn't, what your software costs per
> seat against what's used, and where your books and pay runs stand. Not a sales deck —
> a assessment you keep, whether or not you hire us to act on any of it.

(Deliberately stops at "a written document" — no "delivered monthly," no "ongoing
dashboard." That framing is reserved for whatever the parallel reporting work ships.)

### 6 — FAQ

> **Is this the same as your monthly reporting?**
> No — this is a one-time, written assessment. What ongoing reporting looks like for
> clients on a plan is a separate thing, not sold or described here.

> **Do I have to hire you afterwards?**
> No. You keep the document either way. Most of our clients who start here go on to
> take one or both services, but the assessment stands on its own.

> **Can DMAP actually fund this?**
> For eligible Ontario for-profit SMEs, yes — up to $15,000, matched, through the
> province's Digital Competence Centre. Approval and amounts are OCI's call, not ours;
> see [what DMAP covers](/funding/dmap).

> **How long does it take?**
> [TODO — not stated anywhere on the current site; needs an owner-confirmed figure
> before publishing rather than an invented one.]

### 7 — CTA (`PageCta`)

```
title: "Find out where you actually stand."
lead:  "Send us what you're running today. We'll come back with the read — findable or
        not, overpaying or not, current or not — and what DMAP would cover if you're
        eligible."
links: [
  { label: "Managed IT services", href: "/managed-it-services" },
  { label: "Digital marketing", href: "/digital-marketing" },
  { label: "DMAP funding", href: "/funding/dmap" },
]
```

---

## Schema

```ts
<Schema data={service(
  "Business health check",
  "A one-time assessment of search and AI visibility, software and licence spend, and bookkeeping and payroll system currency for Ontario small businesses.",
  "/business-health-check",
)} />
<Schema data={breadcrumb(["Business health check", "/business-health-check"])} />
```

Plus `FAQPage` via `<Faq items={faq} />` as on every other pillar-shaped page.

## Files

New: `src/pages/business-health-check.astro`.

## Verification

Standard checklist, plus: confirm this page's copy never asserts an ongoing reporting
deliverable (grep for "monthly" and "report" in the new file — every hit should describe
the one-time document, not a recurring feature). Confirm neither "vendor management" nor
"answer engine optimization"/"ai visibility" (bare) appear as this page's own H2/title —
both are owned elsewhere per the keyword map.
