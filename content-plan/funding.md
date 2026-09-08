# Funding brief

**Verified 2026-09-05** against each program's administering body. Aggregator and
grant-consultant sites were consistently wrong on amounts and status and were not used
as sources.

Everything published on the site carries an **as-of date and a source link**. These
programs open, close, and exhaust their funds without notice, and dated facts are also
what wins AI answer citations. `funding-watch.md` is the standing check.

---

## The programs

### DMAP — Digital Modernization and Adoption Plan

|                     |                                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| **Administered by** | Ontario Centre of Innovation (OCI), via the Digital Competence Centre                                |
| **Amount**          | Up to **$15,000**, matched                                                                           |
| **Eligibility**     | Ontario-based for-profit SME, **1–499 employees**                                                    |
| **What it funds**   | Assessing digital needs and producing a modernization plan — the plan itself, not the implementation |
| **Status**          | Open. **First-come, first-served, while funds last**                                                 |
| **Prerequisite**    | None. This is the entry point                                                                        |
| **Exclusion**       | **You may apply to DMAP _or_ RMPG — not both**                                                       |
| **Source**          | https://www.oc-innovation.ca/programs/digital-competence-centre/                                     |

This is the one that matters most to Vitops: DMAP funds exactly the work of the first
engagement — auditing the stack and producing a roadmap.

### RMPG — Retail Modernization Project Grant

|                     |                                                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Administered by** | OCI, via the Digital Competence Centre                                                                                                                                                                 |
| **Amount**          | Up to **$5,000**, matched                                                                                                                                                                              |
| **Eligibility**     | Ontario retailer open to the public; **physical commercial location** (not home-based); **1–50 full-time employees**; incorporated and operating **≥ 1 year**; **≥ $100K** annual revenue before taxes |
| **What it funds**   | POS, online payments, inventory management, CRM, cybersecurity, AI tools                                                                                                                               |
| **Status**          | Open, first-come, while funds last                                                                                                                                                                     |
| **Exclusion**       | **DMAP _or_ RMPG, not both**                                                                                                                                                                           |
| **Source**          | https://www.oc-innovation.ca/programs/digital-competence-centre/                                                                                                                                       |

Narrow fit for Vitops' four verticals — relevant mainly to retail-adjacent clients. Its
real importance is the exclusivity: **a client who takes RMPG has spent their DMAP
eligibility.** That has to be flagged before anyone applies, and it is absent from the
delivered copy.

### Ontario's May 2026 $5M expansion

Not a program. It is **additional funding into the Digital Competence Centre itself**,
announced May 2026, delivered through OCI, expected to support roughly **450 businesses**
across DMAP / TDP / RMPG.

The June homepage copy reads as though it were a separate opportunity sitting alongside
DMAP and TDP. Correct framing: _the pool the existing programs draw from just got bigger,
which is why applying now is worth doing._

Source: https://www.oc-innovation.ca/media-releases/ontario-investing-additional-5-million-to-help-small-businessesmodernize-and-grow/

### BDC LIFT

|                     |                                                                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Administered by** | Business Development Bank of Canada (federal)                                                                                                                  |
| **What it is**      | **Consulting + financing. A loan, not a grant.**                                                                                                               |
| **Two paths**       | _Digital Transformation & AI_ — mandatory BDC advisory planning plus financing. _Productivity & Equipment_ — digitally enabled equipment, robotics, automation |
| **Eligibility**     | Canadian-based. **Minimum $1M annual revenue** (AI path); **$5M** (equipment path)                                                                             |
| **Constraint**      | Technology/equipment must come from **Canadian suppliers**                                                                                                     |
| **Amount**          | Not published — depends on revenue, project scope, and financial strength                                                                                      |
| **Source**          | https://www.bdc.ca/en/solutions/lift                                                                                                                           |

**This is the most important correction in this document.** The June homepage groups LIFT
under _"Government grants may cover part of your project."_ It is debt. Publishing it as a
grant is a factual error, and it is the kind of error a prospect discovers at exactly the
wrong moment.

Correct framing: _LIFT is financing, not a grant — worth knowing about if you're funding a
larger AI or automation project and the numbers work, and the Canadian-supplier
requirement is one Vitops meets._

That last point is worth making explicitly. **Vitops is a Canadian supplier**, so a client
financing digital work through LIFT can spend it here.

### Programs to track, not publish

| Program                                    | Amount                                                         | Status (2026-07-30)                                                                                                                                                                                                                                             |
| ------------------------------------------ | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TDP** — Technology Demonstration Program | up to $50K                                                     | **Closed 2026-08-10.** No replacement announced. OCI's own page still reads "open to eligible applications until August 10, 2026" — the wording was never updated, so don't trust program pages' present-tense phrasing without checking the date against today |
| **Ontario Job Grant** (replaced COJG)      | up to $10K/trainee ($15K for a previously-unemployed new hire) | **Open, year-round intake**, live since 2026-05-01. Excludes training by a vendor on their own product and business consulting — narrow fit for our work, but a real fit for third-party software/AI training                                                   |
| **Digital Main Street DTG**                | $2,500                                                         | **Not accepting**; vendor directory under review                                                                                                                                                                                                                |
| **CDAP**                                   | —                                                              | **Dead.** Do not reference. LIFT is effectively its successor                                                                                                                                                                                                   |

CDAP still appears across the wider web as though live. If a prospect asks about it, the
answer is that it ended and here's what replaced it — that exchange is itself a
credibility win.

---

## What goes on the site

Three placements. No others. The June/July pattern of a full funding _section_ repeated on
every page is what makes a site read as though it sells grants rather than services.

**1 — Callout band, above the fold, on pillar and industry pages.**
One sentence and a link, in the existing eyebrow/badge register. Plants the idea before
the reader has decided anything.

> **Funding** · Government programs may cover part of this work — federal, and provincial
> depending on where you operate. [What's available →](/funding)

**2 — One line beside every CTA.**
The nudge arrives at the moment of decision, not as a section people scroll past.
Deliberately soft and non-technical: naming DMAP and TDP up front assumes the reader
already knows what they are, and quietly excludes anyone outside Ontario. The link carries
the detail. Both strings live in `src/lib/copy.ts` so a wording change is one edit.

> Ask us if [funding](/funding) might be available.

**3 — `/funding` and its four program pages.**
Where the depth lives, for search and for the sales conversation.

---

## Language rules

**Never imply Vitops decides anything.** Keep the June doc's line verbatim — it is the
best sentence in the delivered copy:

> Grant approval and amounts are decided by OCI, not Vitops.

**Never say "you will get $50,000."** Say what the cap is, what the prerequisite is, and
who decides.

**Never call LIFT a grant.** It is financing.

**Always date the figure.** "As of July 2026, DMAP covers up to $15,000." A dated fact
survives going stale; an undated one becomes a lie.

**Say the disqualifiers out loud.** The $750K TDP revenue floor, the DMAP/RMPG
exclusivity, the DMAP-before-TDP sequence. Publishing the exclusions is what separates
this from every grant-consultant page on the internet, and it pre-qualifies leads before
they take up a call.

**Don't promise application writing beyond what's offered.** The June phrasing is right:
_we review your situation before you apply, and deliver the scoped work if you hire us._
