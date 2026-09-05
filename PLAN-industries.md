---
page: /industries
status: draft-v1
priority: 18
depends_on: [PLAN-managed-it-services, PLAN-digital-marketing, four industry-vertical PLAN files]
blocks:
  [four industry-vertical PLAN files — the hub's un-parking and this page's changes land together]
target_geography: Ontario (primary)
primary_keywords:
  - no single high-volume head term for the hub itself — this page's job is routing
    (pillar × industry matrix) and is described in ia.md as earning its keep on
    signalling ("they specialise") more than search volume
forbidden_terms: []
title_prop: "Who we work with — Ontario businesses by industry"
title_char_count: 47
rendered_title: "Who we work with — Ontario businesses by industry — Vitops"
rendered_char_count: 56
meta_description: "Vitops works with Ontario businesses at the size where administration turns into a real cost — trades, real estate, professional firms and clinics most often."
meta_description_char_count: 158
schema_types: [ItemList, BreadcrumbList]
links_out:
  [
    "/industries/trades",
    "/industries/real-estate",
    "/industries/professional-services",
    "/industries/clinics",
    "/managed-it-services",
    "/digital-marketing",
    "/pricing",
    "/funding",
  ]
links_in_needing_repoint:
  [
    "IndustryPage.astro's shared nav+CTA (see below — fixing this one file fixes all 4 verticals at once)",
  ]
open_questions: []
---

# PLAN — `/industries` (hub) — largest effort, longest payback, done last on purpose

**Step 18**, opening the largest single piece of remaining work: un-parking the four
`_`-prefixed vertical pages. `industries/index.astro`'s own header comment explains why
they're parked ("copy commits us to sector-specific delivery we can't stand behind
yet") — that decision isn't being revisited here; un-parking assumes it's been resolved
separately. This file (fully read, 188 lines) plus `IndustryPage.astro` (the shared
shell all four verticals render through, also fully read) are the only two files that
need touching to un-park all four — the shell centralizes the pillar nav and CTA links.

---

## Sections

### 1 — Hero

**H1 unchanged** — "Past a certain size, the back office starts eating the work that
pays." is, per the original audit, the sharpest line on the site. No edit.

### 2 — Subheadline (currently filler under a strong headline, per the audit)

```
was:  "Industries that benefit most from what we do."
new:  "Four kinds of business where administration has become a measurable cost, not a
       rounding error."
```

Keeps the existing "measurable cost" language already in this file's `Prose` block
rather than introducing new vocabulary — and deliberately does **not** promise a
specific tracked number (the audit's own draft suggested "and the number each one
should be watching," which reads as a reporting deliverable; that's out of scope per
the session's decision to keep reporting language out of copy for now).

### 3 — Un-park the four cards

```diff
- <li class="card subgrid-card industry-card" id={i.slug}>
-   <h3 class="font-heading">{i.name}</h3>
+ <li class="card subgrid-card industry-card" id={i.slug}>
+   <a class="industry-card-link" href={`/industries/${i.slug}`}>
+     <h3 class="font-heading">{i.name}</h3>
```

Restore hover affordance (the CSS comment "Not a link while parked... no hover lift" is
removed along with whatever rule it describes).

**Schema fix, the actual reason `url` was a same-page anchor:** `listSchema`'s
`item.url` changes from `` `${SITE_URL}/industries#${i.slug}` `` to
`` `${SITE_URL}/industries/${i.slug}` `` — now a real, dereferenceable URL per Google's
carousel spec, which the file's own comment already flagged as the thing to fix "when a
page is unparked."

### 4 — `profile` cards (the fit section)

**Unchanged** — none of the four "what our clients have in common" cards reference
pillar count or names.

### 5 — CTA link row

```diff
links={[
- { label: "Business software", href: "/business-software" },
- { label: "Back office", href: "/back-office" },
- { label: "Digital presence", href: "/digital-presence" },
+ { label: "Managed IT services", href: "/managed-it-services" },
+ { label: "Digital marketing", href: "/digital-marketing" },
  { label: "Pricing", href: "/pricing" },
  { label: "Funding", href: "/funding" },
]}
```

---

## `IndustryPage.astro` — the shared shell, fixes all four verticals at once

Two hard-coded blocks, both currently 3-pillar:

**`pillar-links` nav (lines 102–107):**

```diff
<nav class="pillar-links" aria-label="Services">
- <a class="link" href="/business-software">Business software</a>
- <a class="link" href="/back-office">Back office</a>
- <a class="link" href="/digital-presence">Digital presence</a>
+ <a class="link" href="/managed-it-services">Managed IT services</a>
+ <a class="link" href="/digital-marketing">Digital marketing</a>
  <a class="link" href="/pricing">Pricing</a>
</nav>
```

**`PageCta` links (lines 117–122):** identical change.

Both edits are made **once, here** — every one of the four vertical `.astro` files
passes its own `pillars` prop array (rendered by this same component) but none of them
own this nav/CTA markup directly, so this is the only place it needs fixing.

---

## Files

`src/pages/industries/index.astro`, `src/components/page/IndustryPage.astro`. Plus,
per vertical: drop the leading `_` from the filename (`_trades.astro` →
`trades.astro`, etc.) — see each vertical's own PLAN file for its `pillars` prop content
changes (3 pillars → 2).

## Verification

Standard checklist, plus: all four vertical routes resolve (currently 404 while
underscore-prefixed); `ItemList` schema validates with real, dereferenceable URLs, not
same-page anchors; the industry-card `<a>` wrapper doesn't break the existing
`id={i.slug}` anchor (still needed if anything external links to `#slug` — check before
removing the `id`).
