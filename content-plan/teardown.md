# SEO deliverables — teardown

Analysis of the three artifacts in WorkDrive (`Vitops Seo Structure.xlsx`,
`Vitops _ Pages Content (June Plan).docx`, `Vitops _ Optimized Pages Content (July Plan).docx`),
read end to end, against the live site and against the current three-pillar direction.

**Read this first:** the work was commissioned very early, when the offer was still being
found. That explains why June and July disagree with each other and why both disagree
with the site that shipped. Most of what follows is not "this is bad work" — it's "this
was aimed at a company that has since become more specific." The structural instincts are
sound. The surface and the targeting are not reusable as-is.

---

## Verdict per artifact

| Artifact                    | Verdict                                                                                                                                                                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Vitops Seo Structure.xlsx` | **Partially usable.** The hub-and-spoke shape is right. The keyword list needs to lose ~60% of its rows. The build calendar is obsolete (built around five pillars, two of which are gone).                                                  |
| June `.docx`                | **Most valuable of the three.** The HR pillar + 5 spokes maps almost 1:1 onto Back Office. The Industries copy is reusable. Homepage has buried comparison content that should be its own pages.                                             |
| July `.docx`                | **Structurally good, tonally unusable.** Section architecture (comparison table → service cards → feature grid → stack → process → FAQ → CTA) is a solid template. Every page opens with "Stop <verb>ing…" and the body is generic MSP copy. |

---

## 1. Voice is the biggest single problem

The live site and the delivered copy are not the same company talking.

Live:

> You didn't start your business to run IT and HR.
> Every growing business needs its software, devices, identity, and people operations
> handled well. Almost none of them need, or can afford, a full-time hire to do it.

Delivered:

> Stop paying for software your ex-employees used, tools your team abandoned, and
> "Shadow IT" apps you didn't even approve.

The delivered copy concedes nothing, opens four separate pages with the identical
"Stop <verb>ing…" construction, and reaches for `seamless`, `massive`, `dominate`,
`flawlessly`, `world-class` — none of which appear anywhere on the live site. Several
design-reference notes even leak the intent into the copy itself ("This builds massive
E-E-A-T by showing exactly what technical steps you take").

The substance underneath is often fine. **The surface has to be rewritten line by line.**
See `voice.md` for the extracted rules and before/after pairs.

---

## 2. The three files disagree about the URL structure

| Page          | Spreadsheet                     | June doc                                    | July doc                                     |
| ------------- | ------------------------------- | ------------------------------------------- | -------------------------------------------- |
| IT pillar     | `/it-services`                  | —                                           | `/services/managed-it-services`              |
| AI            | —                               | `/ai-enablement`                            | `/services/ai-enablement`                    |
| Software mgmt | `/software-management-services` | `/software-management-services`             | `/services/software-subscription-management` |
| Ads           | `/ads-marketing`                | `/ads-marketing`                            | `/services/ads-marketing`                    |
| Web           | `/web-development`              | `/web-development`                          | `/services/web-development`                  |
| HR            | —                               | `/services/hr-managed-services-and-support` | —                                            |

Three schemes, no reconciliation. The July doc also has two internal contradictions of
its own: a "Learn more" CTA pointing at
`/services/hr-managed-services-and-support/safety-management-software` while the page
that content belongs to declares its slug as
`/services/hr-managed-services-and-support/health-and-safety-management-software`; and
two spoke pages (`HR Software Implementation`, `Onboarding and Offboarding Support`) ship
with an **empty `Slug:` field**.

**This costs nothing to fix.** The live site is `/` and `/pricing` only — none of these
URLs were ever published, so there is no redirect debt. Pick the right scheme now. See
`ia.md`.

---

## 3. Keyword reality check

148 rows in the Keywords sheet. Measured:

|                                                                  | Count | Share    |
| ---------------------------------------------------------------- | ----- | -------- |
| Total rows                                                       | 148   | —        |
| Geo-modified (`…ontario` / `…toronto` / `…ottawa` / `…cornwall`) | 68    | **46%**  |
| …of which sit at volume 10                                       | 68    | **100%** |
| Rows at volume 10 overall                                        | 85    | **57%**  |
| Rows with KD `N/A`                                               | 97    | **66%**  |
| Cloud rows (pillar already cut)                                  | 26    | **18%**  |
| Rows at volume ≥ 200                                             | 13    | **9%**   |
| Duplicate keywords across pages                                  | 5     | —        |

**Every single geo-modified row is at volume 10 with KD `N/A`.** That is the tool's
floor — the value it returns when it has no data, not a measurement of ten searches.
Forty-six percent of the research is padding, and building a page per city off it is a
doorway-page pattern that Google has penalised for a decade.

**Real demand is 13 rows.**

| Vol | KD  | Keyword                               | Fate                                              |
| --- | --- | ------------------------------------- | ------------------------------------------------- |
| 880 | 27  | IT consulting services                | Cut — national, and not the product               |
| 720 | 48  | google ads management                 | Keep, secondary — Digital Presence                |
| 480 | 10  | it support for small business         | Keep, **secondary** — Business Software / support |
| 480 | 12  | it services for small business        | Cut — buys the MSP identity                       |
| 480 | 22  | cloud migration services              | Cut — pillar removed                              |
| 320 | 10  | technical SEO services                | Keep — Digital Presence                           |
| 320 | 20  | small business IT support             | Keep, secondary                                   |
| 320 | 14  | google ads management services        | Keep, secondary                                   |
| 320 | 12  | IT helpdesk services                  | Keep, **secondary** — reframed                    |
| 260 | 24  | seo services for small business       | Keep — Digital Presence                           |
| 260 | 13  | conversion rate optimization services | Keep — Digital Presence                           |
| 210 | 13  | it support for small businesses       | Keep, secondary                                   |
| 210 | 9   | it infrastructure management services | Cut — not the product                             |

Two further problems with these numbers. They are almost certainly **national or global
volumes**, not Ontario — so the effective addressable demand is a fraction of what's
shown. And the cluster that actually matches the new positioning (`software subscription
management` 10, `SaaS management small business` 10, `SaaS cost optimization` 10,
`business analytics growth strategy` 10) is entirely at the floor — **because the category
is under-named, not because nobody wants it.** That is a reason to write the category, not
a reason to abandon it.

**5 duplicate keywords are assigned to two pages each** (e.g. `affordable web design for
small business` to both `/web-development` and `/web-development/design`;
`cloud infrastructure management` to two cloud pages; `small business website development`
and `custom website development services` likewise). Self-competition baked into the plan.

---

## 4. It sells an identity Vitops has chosen not to have

Nine of the planned pages — IT Support & Helpdesk, IT Operations, IT Consulting, Cloud
Services, Cloud Migration, Cloud Solutions, plus the MDM/network content threaded through
Managed IT — describe a traditional MSP. The live site describes something else:
"Managed Software Operations", "software selection, implementation, and integration",
"AI enablement where it genuinely earns its place". The Website Map sheet even says
**"no cloud services"** while the Keywords sheet carries 26 cloud rows.

The actual product, confirmed: **Vitops is the single front door.** It abstracts away
which vendor is doing what, and performs tier-1 triage, escalating to the vendor behind
it. That is a different thing from a helpdesk, and it is genuinely easier to sell than
"we are an MSP too" — but only if it's named properly.

So: one page under Business Software, leading on single-point-of-contact and vendor
triage, picking up `it support for small business` / `IT helpdesk services` as
**secondary** targets. Not a Managed IT pillar.

---

## 5. Cross-page duplication

Every July pillar page carries its own four-industry grid — Trades, Real Estate, Legal,
Clinics — making near-identical claims:

- Managed IT: "Ruggedized MDM for field tablets…" / "Secure remote access for agents…"
- Marketing: "Google LSAs, Map Pack dominance…" / "Hyper-local farm area targeting…"
- Web Dev: "Job-focused layouts with instant quote requests…" / "Agent profile pages…"

Five pages repeating the same four blurbs with the noun swapped is exactly the pattern
that gets a site classified as templated. **Fix:** the substance lives once, on
`/industries/*`; pillar pages carry a one-line link row instead of a grid.

---

## 6. What's missing entirely

| Gap                      | Why it matters                                                                                                                                                                                                          |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Case studies**         | Zero. Biggest E-E-A-T gap for a small operator. Nav slot held, pages phase 2.                                                                                                                                           |
| **`/pricing`**           | The site publishes real per-seat pricing — a genuine differentiator almost no MSP offers — and the SEO plan doesn't mention it once. Also unclaimed intent: "managed IT services pricing", "how much does an MSP cost". |
| **About / entity page**  | The whole pitch is "one named operator" and there is no page about the operator. Answer engines need an entity to resolve.                                                                                              |
| **Comparison pages**     | The June homepage already contains "vs a traditional MSP" and "vs hiring in-house" copy — well-written, and buried in section 8 of a long page. Each wants to be its own page.                                          |
| **GEO / answer engines** | No schema plan, no `llms.txt`, no direct-answer openers, no dated facts. Conspicuous, since the site _sells_ "SEO and GEO optimization for search and answer engines". See `geo.md`.                                    |
| **Funding as an asset**  | Treated as a repeating on-page band. It's the highest-intent, lowest-competition topic Vitops owns. See `funding.md`.                                                                                                   |
| **Publishing cadence**   | Nothing to earn a link with.                                                                                                                                                                                            |
| **Email + social**       | Both are in the new Digital Presence pillar; neither appears anywhere in the research.                                                                                                                                  |
| **Bookkeeping**          | In the new Back Office pillar; not covered.                                                                                                                                                                             |

---

## 7. Funding claims that are wrong or stale

Full detail and sources in `funding.md`. The three that matter:

1. **BDC LIFT is a loan, not a grant.** The June homepage groups it under "Government
   grants may cover part of your project." Publishing that is a factual error and a trust
   problem the first time a prospect checks.
2. **RMPG and DMAP are mutually exclusive** — apply to one or the other, not both. Absent
   from the docs, and it will burn a client.
3. **Ontario's May 2026 $5M is not a new program** — it's additional money into the DCC
   itself. The June copy reads as though it were a separate opportunity alongside DMAP/TDP.

Also: **TDP requires a completed DMAP first** and a **$750K minimum revenue** — neither
qualifier appears in the copy, which repeatedly advertises "up to $50K" as though it were
directly available. And there's a live deadline (TDP listed open until **August 10, 2026**)
that appears nowhere, despite being the single strongest urgency hook in the entire plan.

The docs do get one thing right and it should survive: _"Grant approval and amounts are
decided by OCI, not Vitops."_

---

## 8. Keep / cut / rewrite, page by page

| Planned page                                             | Call                   | Where it goes                                                     |
| -------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------- |
| Homepage (June)                                          | **Rewrite**            | Stays one page; sections recut to three pillars                   |
| Services (June)                                          | **Cut as a page**      | Nav dropdown replaces it                                          |
| Industries (June)                                        | **Keep, rewrite**      | `/industries` hub                                                 |
| Contact (June)                                           | **Keep**               | Service-area copy is good; promote anchor to a page               |
| HR Managed Services (June)                               | **Keep, rewrite**      | Becomes `/back-office`                                            |
| HR Software Impl. (June)                                 | **Keep**               | Phase 2 spoke                                                     |
| Health & Safety Software (June)                          | **Keep**               | Phase 2 spoke; strong trades/COR angle                            |
| Benefits Administration (June)                           | **Keep**               | Phase 2 spoke                                                     |
| Managed Payroll (June)                                   | **Keep**               | Phase 2 spoke                                                     |
| Onboarding/Offboarding (June)                            | **Keep, promote**      | Core to Back Office pillar — JML is the flagship                  |
| Managed IT Services (July)                               | **Cut as a pillar**    | Salvage: MDM/endpoint bullets → Business Software                 |
| AI Enablement (July)                                     | **Keep, rewrite hard** | Folds into `/business-software`; spoke in phase 2                 |
| Software Subscription Mgmt (July)                        | **Keep, rewrite**      | Core of `/business-software`                                      |
| Marketing & Ads (July)                                   | **Keep, rewrite**      | Merges into `/digital-presence`                                   |
| Website Development (July)                               | **Keep, rewrite**      | Merges into `/digital-presence`                                   |
| IT Support & Helpdesk                                    | **Reframe**            | `/business-software` support-and-triage section, spoke in phase 2 |
| IT Operations / IT Consulting                            | **Cut**                | Absorbed                                                          |
| Cloud Services ×3                                        | **Cut**                | Already removed by the client                                     |
| SaaS Optimization, License Mgmt                          | **Merge**              | Into `/business-software`                                         |
| Google & Social Ads, Analytics, SEO, Web Design, Web Dev | **Merge**              | Into `/digital-presence`; spokes in phase 2                       |

Net: **24 planned pages → 12 in phase 1**, with spokes opened only where a pillar earns
them.

---

## 9. What the plan got right

Worth stating, because most of it survives:

- **Hub-and-spoke** is the correct shape.
- **An FAQ block on every page** — good for conversion, and now good for answer engines.
- **Industry playbooks** — right instinct, wrong placement (see §5).
- **"Stabilize the systems first, then run ads"** — the single most differentiated idea in
  the entire delivery. It should be the spine of the homepage and the reason Digital
  Presence sits downstream of Business Software.
- **Funding as a conversion lever** — right, needs correcting and re-placing.
- **The July section template** — comparison → cards → features → stack → process → FAQ →
  CTA is a good page skeleton. Keep the skeleton, replace the prose.
- **The June Contact page's service-area copy** — Ottawa-first, Ontario-wide, Canada
  remote. Better than a city-page farm and already written.
