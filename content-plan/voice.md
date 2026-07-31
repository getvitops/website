# Voice

Extracted from the live site — `src/components/sections/{Hero,Pain,Services,StackSection,PresenceSection}.astro`
and `src/pages/pricing.astro`. This is the house style. Every page in `copy/` follows it.

## The register in one line

Calm, concrete, and willing to say the unflattering thing. It sounds like a competent
person explaining their work to another adult, not a landing page selling to a lead.

## Rules

**Headings are sentence case and end in a period.**
Not title case, not headline-stripped. `Two services. One partner on file.` /
`You didn't start your business to run IT and HR.` / `Your presence, working while you work.`
The period is doing work — it makes the heading a statement rather than a banner.

**The section unit is eyebrow → H2 → lead.**
A short `.font-eyebrow` label (`The problem`, `What we do`, `Digital presence`), then the
H2, then one `.font-lead` paragraph of 2–3 sentences. Cards or a grid follow. Don't
break this shape; it's what makes the site read as one document.

**Numbered tags where things are enumerated.** `01 · IT and HR`, `02 · Digital presence`.
Middot separator, monospace, uppercase, two digits.

**Second person, plural first person.** "You didn't start your business…", "We pick the
right software…". Never "I", never "our team of experts", never the company name as
subject in body copy (the site says "we", not "Vitops does X" — except in the meta
description and the opening line of a page, where the entity name is load-bearing).

**Concrete nouns beat adjectives.** The live site says "identity and lifecycle, license
tuning, endpoint security on every device". It does not say "comprehensive, enterprise-grade
security solutions". If a sentence survives deleting every adjective, it was a good
sentence.

**Admit the limit.** The strongest line on the current site is _"Almost none of them need,
or can afford, a full-time hire to do it."_ — it concedes something before it sells.
Do this at least once per page. It is the single biggest voice differentiator from the
delivered SEO copy, which concedes nothing.

**Sentences run medium-long with comma-linked clauses, then break short.**
_"We pick the right software for how your team actually works, implement it, and integrate
the pieces, with AI enablement where it genuinely helps."_ then _"Two services. One partner
on file."_ The rhythm is the voice.

**Qualify honestly.** "where it genuinely helps", "where it earns its place", "if leads
are the bottleneck". The site repeatedly signals that a service might not be needed.
Keep that.

**No exclamation marks. No ALL CAPS. No rhetorical questions as headings.**

## Banned words

Every one of these appears in the delivered SEO copy and in none of the live site copy.
Grep for them before shipping.

```
seamless          massive           dominate          flawlessly
unlock            empower           leverage          cutting-edge
robust            world-class       game-changing     supercharge
best-in-class     hassle-free       peace of mind     take it to the next level
solutions (as a standalone noun — "IT solutions", "business solutions")
```

Also banned as an opening move: **"Stop <verb>ing…"** — the delivered copy opens four
pages this way (_"Stop paying for software your ex-employees used"_, _"Stop relying on
fragmented vendors"_, _"Stop letting HR administration…"_, _"Stop settling for slow,
pretty sites"_). It's a tell, and four in a row is a template.

Use `E-E-A-T`, `Map Pack`, `PPC` etc. in strategy docs, never in customer-facing copy.

## Before / after

**Business Software** — delivered (July, Software Subscription Management):

> Stop paying for software your ex-employees used, tools your team abandoned, and
> "Shadow IT" apps you didn't even approve. Vitops provides hands-on software
> subscription management for Ontario companies.

Rewritten:

> Most teams are paying for software nobody opens. Licences for people who left,
> tools that lost their champion, and a handful of apps someone expensed and never
> mentioned. We find them, cut them, and keep the list honest month to month.

**Back Office** — delivered (June, HR Managed Services):

> Stop letting HR administration, payroll, and compliance pull you away from running
> your business. Vitops provides end-to-end HR managed services for Ontario owner-led
> businesses, combining a dedicated operator with the right software to keep your team
> compliant, supported, and organized.

Rewritten:

> Payroll, benefits changes, and onboarding paperwork are not hard. They are just
> relentless, and they land on whoever is closest — usually you. We take the running of
> them, on a schedule, with the records kept in a state you could hand to an auditor.

**Digital Presence** — delivered (July, Marketing & Ads):

> Most agencies send ad traffic to broken websites, unmanaged inboxes, and unstaffed
> helpdesks. Vitops builds high-converting Google and social media ads on top of a
> stable, secure IT and CRM foundation so your ad spend turns into actual booked jobs,
> clients, and patients across Ontario.

Rewritten:

> Ads are the easy part. The hard part is what happens after the click — whether the
> site loads, whether the form goes anywhere, whether anyone answers. We run the whole
> path, which is why we'd rather fix the destination before we spend anything driving
> people to it.

## Spelling

**Use `licence` for the noun, `license` for the verb** (Canadian convention). The live
site is currently inconsistent — `StackSection.astro` has "software licences", while
`Services.astro` has "license tuning" and `pricing.astro` has "license maintenance".

Fix on next touch: "licence tuning", "licence maintenance", "reclaim unused licences".

Otherwise Canadian spelling throughout (`organization` and `optimization` keep the -z,
per Canadian Press style; `centre`, `defence`, `catalogue`).
