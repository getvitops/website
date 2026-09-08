---
page: /managed-it-services-ottawa
status: draft-v1
priority: 9
depends_on: [PLAN-managed-it-services, PLAN-contact]
blocks: []
target_geography: Ottawa
primary_keywords:
  - "managed it services ottawa" (480/mo CA)
  - "it support ottawa" (480/mo CA)
  - "it managed services ottawa" (70/mo CA)
forbidden_terms:
  - "MSP" in title/H1/H2/URL (50/mo Ottawa — see managed-it-services' forbidden-terms rule)
title_prop: "Managed IT services & IT support, Ottawa"
title_char_count: 39
rendered_title: "Managed IT services & IT support, Ottawa — Vitops"
rendered_char_count: 48
meta_description: "Managed IT services and IT support for Ottawa businesses: software, licences, identity and vendor management — one local partner, one number to call."
meta_description_char_count: 154
schema_types: [Service, FAQPage, BreadcrumbList]
links_out: ["/managed-it-services (full explanation)", "/contact", "/pricing"]
links_in_needing_repoint: []
open_questions: []
anti_doorway_note: "Only Ottawa page under the managed-IT pillar (the other three geo pages sit under digital-marketing), so no sibling-overlap risk the way the SEO/web-design/agency trio has. Genuine local differentiator: response-time and on-site framing specific to being Ottawa-based, not a template swap of the pillar."
---

# PLAN — `/managed-it-services-ottawa` (new page)

**Step 9.** The only Ottawa geo page under the managed-IT pillar — no sibling-overlap
risk to design around, unlike the three digital-marketing Ottawa pages. Local
differentiator is genuine: being based in Ottawa means faster on-site response when
something needs a physical presence, and a shorter list of vendors who already know
the local telecom/ISP landscape.

---

## Sections

### 1 — Hero

```
eyebrow: "Managed IT services, Ottawa"
H1:      "IT support that already knows Ottawa."
lead:    "Software chosen, wired together, and run — with a partner close enough to
          show up when something needs a physical presence, not just a ticket number."
```

### 2 — Direct answer

> Managed IT services in Ottawa means the same core work as anywhere — software
> selection, identity and access, vendor management, one number to call — plus what
> proximity actually buys: faster on-site response when a physical presence is what's
> needed, and a partner who already knows which local ISPs and telecom providers are
> reliable in this market, because we use them too.

### 3 — What proximity actually changes (`SectionIntro` + 3 short items)

```
eyebrow: "What being local changes"
H2:      "Most of this is remote either way — some of it isn't."
```

- "On-site when it matters." — Most software and identity work is remote regardless of
  where a provider sits. The exceptions — a new office network, a hardware refresh, an
  in-person walkthrough — are where an Ottawa-based partner actually matters.
- "We know the local vendor landscape." — Which ISPs hold up, which don't, which
  telecom providers are worth the switch — we've already made these calls for other
  Ottawa clients.
- "Same partner, same number, whether it's remote or on-site." — No handoff between a
  remote helpdesk and a local dispatch team; it's the same person either way.

### 4 — What we run (link-forward)

Short paragraph + link: "The full breakdown of what's included — software selection,
identity and access, vendor management, the seven software categories we administer —
lives on [managed IT services](/managed-it-services). This page is the Ottawa entry
point, not a separate service tier."

### 5 — FAQ

> **Do you offer on-site support in Ottawa?**
> Yes, for the things that genuinely need it — network setup, hardware refresh
> walkthroughs, in-person onboarding. Most day-to-day work is remote, same as any
> managed IT relationship; being Ottawa-based just means on-site isn't a special trip.

> **Do you work with businesses in Kanata, Barrhaven, or Orleans specifically?**
> Yes — the whole city and the surrounding region. Nearly all the work is remote-first
> regardless of neighbourhood.

> **How is this different from a national MSP with an Ottawa office?**
> Most people call this an MSP. The difference is who answers: a named partner, not a
> regional branch of a larger ticketing system. See the fuller answer on
> [managed IT services](/managed-it-services).

### 6 — CTA

```
title: "Tell us what you're running in Ottawa."
lead:  "Software, vendors, whatever's currently somebody's evenings-and-weekends job.
        We'll tell you what we'd take on and what it would cost."
links: [
  { label: "Managed IT services", href: "/managed-it-services" },
  { label: "See pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
]
```

---

## Schema

```ts
<Schema data={service("Managed IT services, Ottawa", "Software selection, identity and access, and vendor management for Ottawa small businesses, with local on-site support.", "/managed-it-services-ottawa")} />
<Schema data={breadcrumb(["Managed IT services Ottawa", "/managed-it-services-ottawa"])} />
```

## Files

New: `src/pages/managed-it-services-ottawa.astro`.

## Verification

Standard checklist.
