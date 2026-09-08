---
page: /funding (+ /funding/dmap, /funding/rmpg, /funding/bdc-lift — /funding/tdp already retired by the concurrent session)
status: DEFERRED — do not act on this file this pass
priority: 24
depends_on: []
blocks: []
target_geography: n/a — deferred
open_questions:
  - "Per explicit instruction: ignore /funding this pass. A concurrent session is already actively correcting it (TDP retired 2026-09, /funding/index.astro re-verified 5 September 2026, public/_redirects handles the old /funding/tdp URL) — see the master plan's note under 'Technical prerequisites — status' item 2."
---

# PLAN — `/funding` — deferred, not a working plan this pass

Per instruction: this page is being actively worked by a concurrent session and is out
of scope here. This file records the **gaps I'd otherwise have wanted filled**, so they
aren't lost — not a plan to execute.

## Gaps noticed, for whenever the funding work settles

1. **`funding/index.astro`'s CTA link row (lines 204–206) still points at the old pillar
   slugs** — `/business-software`, `/back-office`, `/digital-presence`. This isn't
   something the funding-focused session would necessarily think to fix (it's a
   consequence of the pillar rename, not a funding-content issue), so it'll need a pass
   once both pieces of work land: swap in `/managed-it-services` and `/digital-marketing`,
   drop the back-office link.
2. **`funding/rmpg.astro:50`** describes the typical client profile as "reached the size
   where back-office administration has become a real cost" — purely descriptive prose,
   not a link, so lower priority than #1, but worth a naming-consistency pass at the
   same time (still an accurate concept, "back-office" just isn't a pillar name anymore).
3. **Not a gap, already fine**: `/funding/rmpg` — checked, it IS in the
   `PineLayout.astro` footer (line 306) despite the earlier structural-exploration
   report claiming it was missing. No action needed there.

Nothing else checked in depth — this file is deliberately shallow per instruction.
