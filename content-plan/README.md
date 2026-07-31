# content-plan

Analysis of the 2026 SEO deliverables, the replacement information architecture, and
publishable copy for the three-pillar site. Not build artifacts — these are source
documents for the site's content.

Verified 2026-07-30.

## Read in this order

| File                                   | What it is                                                                                                                                  |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`teardown.md`](teardown.md)           | What the SEO strategist delivered, what's usable, what isn't, and why. Keyword reality check. Keep/cut/rewrite call on all 24 planned pages |
| [`ia.md`](ia.md)                       | The sitemap, nav, per-page targeting, keyword disposition, phase 1 / phase 2 split                                                          |
| [`voice.md`](voice.md)                 | House style extracted from the live site, banned-word list, before/after pairs                                                              |
| [`funding.md`](funding.md)             | Verified brief on DMAP, TDP, RMPG, LIFT + the corrections the delivered copy needs                                                          |
| [`geo.md`](geo.md)                     | Answer-engine layer — schema, `llms.txt`, direct-answer structure, comparison pages                                                         |
| [`funding-watch.md`](funding-watch.md) | Standing Claude Cowork prompt keeping the funding figures true                                                                              |
| [`copy/`](copy/)                       | Publishable page copy, in the site's voice                                                                                                  |

## Copy inventory

**Phase 1** — `copy/{business-software,digital-presence,back-office,about}.md`,
`copy/industries/{index,trades,real-estate,professional-services,clinics}.md`,
`copy/funding/index.md`

**Phase 1.5** — `copy/funding/{dmap,tdp,rmpg,bdc-lift}.md`

**Phase 2** — spokes, `/work/*` case studies, `/vs/*` comparison pages. Not written;
opened only where a pillar earns them (see `ia.md`).

## Two things blocking a launch

1. **`/back-office` has no keyword research.** The delivered sheet skipped HR entirely.
   Commission a pass before publishing that pillar — the copy is written on the merits,
   but the targeting is unconfirmed.
2. **`/about` has one open decision** and one asset gap: how to describe ViAbilityHR and
   Monad Media relative to Vitops (the copy is written to be accurate either way), and
   headshots for both founders. Certifications are resolved — see `credentials.md`.

## Conventions in the copy files

Each page carries its meta title/description, schema types, keyword targets, then the
sections in order: eyebrow → H2 → lead → cards. Funding appears in exactly two places per
page — one callout band above the fold and one line beside each CTA. Never as a section.

`copy/industries/index.md` deliberately carries no funding callout; it's a routing page
with nothing to sell.
