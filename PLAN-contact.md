---
page: /contact
status: draft-v1
priority: 5
depends_on: []
blocks: [four Ottawa geo pages — all four link back to a real /contact for local pack signal]
target_geography: Ottawa (primary, NAP-anchored), Ontario, Canada-wide (remote)
primary_keywords:
  - none high-volume — this page's job is LocalBusiness/NAP consistency for local-pack
    ranking and branded "vitops contact/phone/address"-type queries, not a searched term
forbidden_terms: []
title_prop: "Contact us — Ottawa, Ontario"
title_char_count: 28
rendered_title: "Contact us — Ottawa, Ontario — Vitops"
rendered_char_count: 37
meta_description: "Reach Vitops by phone, email or the form below. Based in Ottawa, working across Ontario, and serving clients remotely across Canada."
meta_description_char_count: 134
schema_types: [ProfessionalService/LocalBusiness via organizationGraph, BreadcrumbList]
links_out: ["/managed-it-services", "/digital-marketing", "/pricing"]
links_in_needing_repoint:
  [
    "PineLayout.astro footer 'Contact' link (currently /#contact)",
    "PLAN-*-ottawa pages should link here directly, not to the homepage anchor",
  ]
open_questions:
  - "No business hours are stated anywhere in the current site. Not inventing openingHoursSpecification — schema stays phone+address only until hours are confirmed."
  - "Homepage keeps its #contact anchor and Contact.astro section — this is an ADDITION, not a replacement. ia.md's load-bearing-anchor rule (middleware, nav) stays intact."
---

# PLAN — `/contact` (new page)

**Step 5.** Promotes the homepage's `#contact` anchor to a real, indexable page carrying
the NAP block the four Ottawa geo pages (steps 7–10) need to link to for local-pack
credibility. The homepage anchor **stays** — `ia.md`'s own note that `#contact` is
load-bearing for `src/middleware.ts` and the nav means this is additive, not a migration.

`Contact.astro` (`src/components/sections/Contact.astro`, fully read) is already a
self-contained, reusable section — form, submit script, styles, all scoped. It's reused
here verbatim, not rebuilt.

---

## Sections, in order

### 1 — Hero

```
eyebrow: "Contact"
H1:      "Talk to the people who'd actually do the work."
lead:    "One partner, based in Ottawa, working across Ontario. Call, email, or send a
          note below — a partner answers, not a queue."
```

### 2 — NAP block

New, page-local markup (a simple two-column or stacked fact list, not a new component):

```
Phone:         +1 613-518-7984      (tel: link)
Email:         hi@vitops.ca         (mailto: link — already the site-wide address)
Service area:  Ottawa, Ontario — working throughout Ontario, and supporting
               businesses elsewhere in Canada remotely.
```

This is the same service-area sentence already live on `about.astro:218-221` — reused
verbatim, not reworded a third time.

**`tel:` link means `/api/track.ts` must exist before this ships** — it's already been
added this session (technical prerequisite #4).

### 3 — Contact form

`<Contact />` (the existing homepage section component), unchanged, imported directly.
Its `id="contact"` living on two different pages (home and here) is not a collision —
different documents, and only one is ever rendered per request.

### 4 — Short FAQ

Four questions, none needing sourced stats — this is a logistics FAQ, not a
direct-answer/GEO section:

> **What's your service area?**
> Ottawa first, then the rest of Ontario, then Canada-wide for anything that works
> remotely — most of what we do does.

> **How fast do you respond?**
> A partner replies personally, usually the same or next business day. There's no
> ticket queue at this stage of a relationship.

> **Do you work with businesses outside Ottawa?**
> Yes — most of our software and marketing work is fully remote. On-site visits are
> Ottawa and the surrounding region.

> **Can I just call instead of filling out the form?**
> Yes — the phone number above reaches a partner directly.

### 5 — CTA / links out

Short closing line + link row to `/managed-it-services`, `/digital-marketing`,
`/pricing` — so a visitor who came here first (rather than landing on a pillar) has
somewhere to go next.

---

## Schema

```ts
<Schema data={organizationGraph} />
<Schema data={breadcrumb(["Contact", "/contact"])} />
```

`organizationGraph` already carries `ProfessionalService`, `telephone`, and `address`
(Ottawa/ON/CA) as of this session's `schema.ts` update — no new schema code needed, just
the import.

---

## Files

New: `src/pages/contact.astro`. No existing file to diff against.

Update: `src/layouts/PineLayout.astro`'s footer "Contact" link (`href="/#contact"` →
`/contact`) — the anchor still works for anyone already on the homepage, but the
site's own footer should point at the real page now that one exists.

## Verification

Standard checklist, plus: `tel:` link fires the `/api/track.ts` beacon without a
console error (test in dev with the network tab open — the route returns 204 for a
beacon). LocalBusiness schema validates with `telephone` and `address` present.
