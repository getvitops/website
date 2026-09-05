---
page: /web-design-ottawa
status: draft-v1
priority: 8
depends_on: [PLAN-digital-marketing, PLAN-contact]
blocks: []
target_geography: Ottawa
primary_keywords:
  - "website design ottawa" (720/mo CA)
forbidden_terms:
  - "seo services" as this page's own anchor — owned by /seo-services-ottawa
  - "digital marketing agency" as this page's own anchor — owned by /digital-marketing-agency-ottawa
title_prop: "Website design for Ottawa businesses"
title_char_count: 34
rendered_title: "Website design for Ottawa businesses — Vitops"
rendered_char_count: 43
meta_description: "Website design and build for Ottawa businesses: fast, accessible sites on published monthly plans — hosting, edits and care included, from $39/mo."
meta_description_char_count: 152
schema_types: [Service, FAQPage, BreadcrumbList]
links_out: ["/digital-marketing (full explanation)", "/pricing (published tiers)", "/contact"]
links_in_needing_repoint: []
open_questions: []
anti_doorway_note: "See /seo-services-ottawa's frontmatter for the split rationale. This page = the build/design process and the published website plans specifically, not ranking or ads."
---

# PLAN — `/web-design-ottawa` (new page)

**Step 8.** The build/design angle specifically. Where `/seo-services-ottawa` is about
ranking and `/digital-marketing-agency-ottawa` is the full bundle, this page's job is
to catch the buyer who typed "website design ottawa" wanting to see a build process and
a price — so it leans harder on `/pricing`'s published website tiers than the other two
Ottawa pages do.

---

## Sections

### 1 — Hero

```
eyebrow: "Website design, Ottawa"
H1:      "A site built to load fast and answer the question."
lead:    "Not a portfolio piece — a site built for speed, clarity, and forms that go
          somewhere specific, on a published monthly plan with hosting, edits and care
          included."
```

### 2 — Direct answer

> Website design for a small business means a site that loads in under two seconds on a
> phone, states plainly what you do and where you are, and sends every enquiry
> somewhere a person actually watches. For an Ottawa business that usually means design
> decisions built around local search and a service area, not a national audience —
> and a build cost that's a fraction of what "custom design" implies once it's on a
> managed monthly plan instead of a one-off invoice.

### 3 — What a build actually includes (`SectionIntro` + short list, links to `/pricing`)

```
eyebrow: "What's included"
H2:      "Design and build, on a plan — not a one-off invoice you outgrow."
```

Three lines, each pointing at the real published tiers rather than restating them:

- "Design and build on Core Web Vitals from day one — the technical foundation ranking
  and answer-engine visibility both depend on."
- "Hosting, uptime monitoring, SSL, backups and a staging environment included in every
  tier — see the three published plans on [pricing](/pricing)."
- "A monthly edit allowance, so small changes don't wait on a quote — 2 to 6 edits a
  month depending on tier."

### 4 — Local build considerations (2 short items — the genuine Ottawa-specific angle)

- "Built for how Ottawa searches, not generic templates." — Local pack visibility,
  service-area pages if you cover more than one neighbourhood, and forms that route to
  a named person rather than a shared inbox.
- "We'll tell you when your current site is worth keeping." — Older page-builder sites
  are usually the ones where performance can't be recovered without pulling the theme
  out; newer or well-built sites often just need the technical layer fixed, not a
  rebuild. (Reused from `/digital-marketing`'s existing FAQ answer on this — same fact,
  not re-derived.)

### 5 — FAQ

> **Do I own the site, or is it locked to your hosting?**
> Managed on our infrastructure by default — that's what the monthly plan includes —
> or handed over on open standards if you'd rather own and host it yourself. We'll say
> which makes sense for you.

> **How long does a build take?**
> [TODO — not stated anywhere on the current site; needs an owner-confirmed timeframe
> before publishing rather than an invented one.]

> **Can you redesign our existing site instead of a full rebuild?**
> Often, yes — see "We'll tell you when your current site is worth keeping" above.
> We'll be specific about which is cheaper for your particular site.

### 6 — CTA

```
title: "Send us your current site."
lead:  "We'll tell you what's slow, what's missing, and whether a rebuild or a repair
        is the right call — whether or not you hire us."
links: [
  { label: "See pricing", href: "/pricing" },
  { label: "Digital marketing", href: "/digital-marketing" },
  { label: "Contact", href: "/contact" },
]
```

---

## Schema

```ts
<Schema data={service("Website design", "Website design and managed build for Ottawa businesses, on published monthly plans.", "/web-design-ottawa")} />
<Schema data={breadcrumb(["Website design Ottawa", "/web-design-ottawa"])} />
```

## Files

New: `src/pages/web-design-ottawa.astro`.

## Verification

Standard checklist, plus the anti-doorway check against the other two Ottawa pages
(see `/seo-services-ottawa`'s Verification note).
