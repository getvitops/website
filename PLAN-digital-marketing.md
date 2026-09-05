---
page: /digital-marketing
replaces: /digital-presence
status: draft-v1
priority: 2
depends_on: []
blocks: [PLAN-home, PLAN-seo-services-ottawa, PLAN-web-design-ottawa, PLAN-digital-marketing-agency-ottawa]
target_geography: Ontario (primary), Ottawa (local emphasis — geo pages carry the city terms), Canada-wide (secondary)
primary_keywords:
  - "digital marketing agency" (8100/mo CA)
  - "marketing agency" (4400/mo CA)
  - "website management" (260/mo CA)
  - "digital marketing agency ontario" (390/mo CA)
  - "website design ontario" (260/mo CA)
secondary_keywords_AEO_cluster:
  - "answer engine optimization" (480/mo CA, 4400/mo US — rising, near-zero local competition)
  - "ai visibility" (140/mo CA, 2900/mo US)
  - "geo optimization" (140/mo CA)
  - "share of voice" (170/mo CA, 4400/mo US)
  - "brand visibility" (70/mo CA, 590/mo US)
  - "marketing roi" (170/mo CA, 1600/mo US)
forbidden_terms:
  - "reporting deliverable promises" — the monthly "one view" report is being built in parallel; describe the AEO *work*, never a report as a shipped feature
title_prop: "Digital marketing agency for Ontario businesses"
title_char_count: 47
rendered_title: "Digital marketing agency for Ontario businesses — Vitops"
rendered_char_count: 56
meta_description: "Digital marketing for Ontario businesses: websites, SEO, answer-engine optimization, paid ads and social — steered monthly by the partner that runs your systems."
meta_description_char_count: 160
schema_types: [Service, BreadcrumbList, FAQPage]
links_out: ["/pricing", "/managed-it-services", "/industries", "/business-health-check (AEO section)"]
links_in_needing_repoint: ["PineLayout.astro nav+footer", "sections/Services.astro", "managed-it-services.astro CTA row", "industries pages' 4-link nav"]
open_questions: []
---

# PLAN — `/digital-marketing`

Replaces `/digital-presence` (301 already wired). **Step 2** — the AEO section is the
cheapest win identified in the whole audit: the page already explains GEO well (in one
FAQ answer), but no heading, title or URL carries any of those words, so none of that
search demand can reach it.

Diff against the current 221-line file (fully read) — most of it survives unchanged.

---

## Head

Title was `Websites, ads, SEO and social for Ontario businesses` (54 chars, no single
high-volume anchor). New prop leads with the 8,100/mo term. Description keeps the
existing "steered monthly by the same partner" framing (verbatim clause reused —
already good voice) and adds "answer-engine optimization" so the AEO cluster shows up
in the SERP snippet too, not just on-page.

---

## Sections, in order

### 1 — Funding callout, Hero

**Keep as-is**, eyebrow only changes: `"Digital presence"` → `"Digital marketing"`.
H1 **unchanged** — "Everywhere your buyers look, handled." is strong, voice-correct, and
doesn't need a keyword (the eyebrow and title tag already carry it). Lead paragraph
unchanged.

### 2 — Direct answer (`Prose lead`)

**Unchanged.** Already a correct direct-answer paragraph per `geo.md` §1 — quotable,
no backward pronoun, states the four things kept in step. No edit needed.

### 3 — What goes wrong

**Keep `problems` and `presenceStats` as-is.** Both still accurate.

### 4 — What we do (`PresenceAnimation`)

**Keep unchanged.** The four-surface animation already covers website / search+answer
engines / paid / social+listings. This is the visual overview; the new AEO section below
is where the answer-engine half of surface 2 gets its own keyword-bearing heading instead
of sharing one line with "Search."

### 5 — NEW: Answer engine optimization

Insert directly after section 4, before "The order we'd do it in." This is the section
the master plan calls the cheapest win in the audit — carries `answer engine
optimization`, `ai visibility`, `geo optimization` explicitly, none of which appear
anywhere on the live page today.

```
eyebrow: "Answer engines"
H2:      "Answer engine optimization: being the source the AI quotes."
lead:    "When someone asks an assistant which business to use for something in Ottawa,
          it names one. We optimise for that the way we optimise for search — structured
          facts, dated claims, direct answers, clean schema — so the source it quotes is
          you."
```

Body (two short paragraphs, `Prose`, not a stat band — no reporting promise here, that
deliverable is being built separately and stays out of this copy):

> This is different work from ranking, not the same work with a new name. A search
> engine returns a list a person scans; an answer engine picks one and states it. Getting
> picked means the page has to answer the question in a sentence that can stand on its
> own — which is also, not coincidentally, what makes a page fast to read and easy to
> trust.
>
> We build this in as part of the same work that gets a site found in search, rather than
> selling it as a separate line: schema markup that says who you are consistently across
> every page, FAQ content in the phrasing people actually ask, and a site structure an
> answer engine can parse without guessing.

This absorbs and supersedes the FAQ's current "What is GEO, and does it matter yet?"
answer — **keep that FAQ question too** (people will still ask it in exactly that
phrasing), but shorten its answer now that the section above carries the full
explanation; the FAQ answer becomes a one-line pointer plus the practical "does it
matter yet" verdict.

### 6 — The order we'd do it in

**Unchanged** — "We'd rather fix the destination first," both body paragraphs, and the
honest-limit paragraph ("not built for enterprise budgets or brand campaigns") all stay.
Industry link row unchanged (`/industries/*`).

### 7 — FAQ

**Keep all 6 existing questions.** Shorten the GEO answer per above. No other changes —
the "how is this different from an agency" and "do you lock us into a contract" answers
are unaffected by the rename.

### 8 — CTA (`PageCta`)

```
links: [
  { label: "Managed IT services", href: "/managed-it-services" },  // was "Business software"
  { label: "Pricing", href: "/pricing" },
  { label: "Industries", href: "/industries" },
]
```

`{ label: "Back office", href: "/back-office" }` removed — folded into the other pillar,
same reasoning as `PLAN-managed-it-services.md`.

---

## File

`src/pages/digital-presence.astro` → `src/pages/digital-marketing.astro`.
`src/lib/schema.ts`'s `service()` call: `name` from `"Digital presence"` →
`"Digital marketing"`; `description` gains "answer-engine optimization"; `url` →
`/digital-marketing`. Breadcrumb label → `"Digital marketing"`.

## Verification

Same checklist as `PLAN-managed-it-services.md` §Verification, plus: confirm the AEO
section's copy makes no reporting-deliverable promise (grep for "report" in the new
section — should describe _work_, not a shipped report).
