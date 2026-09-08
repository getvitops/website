---
page: /seo-services-ottawa
status: draft-v1
priority: 7
depends_on: [PLAN-digital-marketing, PLAN-contact]
blocks: []
target_geography: Ottawa (this page IS the geography — the pillar owns Ontario-wide)
primary_keywords:
  - "seo services ottawa" (1000/mo CA)
  - "seo agency ottawa" (720/mo CA)
forbidden_terms:
  - "website design" as this page's own H1/title anchor — that's /web-design-ottawa's term
  - "digital marketing agency" as this page's own anchor — that's /digital-marketing-agency-ottawa's term
title_prop: "SEO services & SEO agency in Ottawa"
title_char_count: 33
rendered_title: "SEO services & SEO agency in Ottawa — Vitops"
rendered_char_count: 42
meta_description: "SEO services for Ottawa businesses: technical audits, local search and Google Business Profile, and answer-engine visibility — steered monthly, published pricing."
meta_description_char_count: 165
schema_types: [Service, FAQPage, BreadcrumbList]
links_out: ["/digital-marketing (full explanation)", "/contact", "/pricing", "/business-health-check"]
links_in_needing_repoint: []
open_questions: []
anti_doorway_note: "This page, /web-design-ottawa and /digital-marketing-agency-ottawa all target Ottawa under the same pillar. Deliberately split by SERVICE angle, not city: this page = search ranking specifically (technical SEO, local pack, GBP); web-design-ottawa = the build/design process; digital-marketing-agency-ottawa = the full agency-replacement bundle. Each has its own direct-answer paragraph and FAQ — no shared boilerplate beyond the NAP/service-area line."
---

# PLAN — `/seo-services-ottawa` (new page)

**Step 7.** Narrowest of the three digital-marketing Ottawa pages — SEO/search ranking
specifically, not the whole marketing bundle. Cross-links to `/digital-marketing` for
the fuller explanation (`ia.md` rule: substance lives once) rather than re-explaining
what SEO or answer-engine optimization mean from scratch.

No existing file — built for this plan, drawing on `/digital-marketing`'s established
voice and its `presenceStats`/`problems` where they're genuinely reusable.

---

## Sections

### 1 — Hero

```
eyebrow: "SEO services, Ottawa"
H1:      "Findable in Ottawa, not just on the internet."
lead:    "Technical SEO, local search, and the answer-engine work that decides whether
          an AI assistant names you — for a business that actually wants Ottawa and
          the surrounding region to find it, not a national audience."
```

### 2 — Direct answer

> SEO services in Ottawa means the same technical work as anywhere — site speed,
> structure, schema, content that answers the question — plus the local layer that
> makes the difference here specifically: a Google Business Profile that's claimed,
> verified and consistent, citations that agree across Google, Bing and Apple, and
> content that answers "near me" and neighbourhood-level searches (Kanata, Barrhaven,
> Orleans, the Glebe) the same way it answers the city-wide ones.

### 3 — What's different about ranking locally (`SectionIntro` + `Cards`, 3 cards)

```
eyebrow: "What's different here"
H2:      "Local ranking is a different game from national ranking."
```

- "Google Business Profile is half the work." — For a service-area or storefront
  business, the local pack often outperforms the organic result below it. Most Ottawa
  sites we look at have a claimed-but-unmanaged listing.
- "Your competition is genuinely local." — You're not out-ranking a national brand;
  you're out-ranking three other Ottawa firms doing the same thing you do, which is a
  more winnable fight with the right technical foundation.
- "Bilingual search exists here and most sites ignore it." — Ottawa has real
  English/French search volume. Whether that's worth building for depends on your
  client base — we'll tell you honestly if it isn't, rather than sell a French site
  nobody searches for.

### 4 — What we run (brief — link-forward, not a re-explanation)

Short paragraph + link: "The technical and content work itself is the same discipline
described in full on [managed digital marketing](/digital-marketing), including the
answer-engine optimization section — this page is the Ottawa-specific entry point, not
a separate service."

### 5 — FAQ (Ottawa-specific — different questions from the pillar's FAQ)

> **Do you only work with Ottawa businesses?**
> No — Ottawa is where we're based and where local-pack work matters most, but the
> technical SEO and content work serves clients anywhere in Ontario.

> **How long before we rank in Ottawa specifically?**
> Local pack movement is often faster than organic ranking — weeks rather than months,
> once the Business Profile and citations are cleaned up. Organic content ranking still
> takes the usual several months.

> **Do you handle Google Business Profile suspensions or verification issues?**
> Yes — it's one of the more common things we untangle in a first month, particularly
> for service-area businesses without a public storefront.

### 6 — CTA

```
title: "Send us your Google Business Profile."
lead:  "We'll tell you what's inconsistent, what's missing, and what we'd fix first —
        whether or not you hire us."
links: [
  { label: "Digital marketing", href: "/digital-marketing" },
  { label: "Business health check", href: "/business-health-check" },
  { label: "Contact", href: "/contact" },
]
```

---

## Schema

```ts
<Schema data={service("SEO services", "Technical SEO, local search and Google Business Profile management for Ottawa businesses.", "/seo-services-ottawa")} />
<Schema data={breadcrumb(["SEO services Ottawa", "/seo-services-ottawa"])} />
```

## Files

New: `src/pages/seo-services-ottawa.astro`.

## Verification

Standard checklist, plus the anti-doorway check: confirm this page's direct-answer
paragraph and FAQ are NOT substitutable with `/web-design-ottawa`'s or
`/digital-marketing-agency-ottawa`'s — read all three back to back before shipping.
