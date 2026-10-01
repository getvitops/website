# Toolchain upgrade, EmDash content migration, and portal-managed config — migration plan

Written 2026-09-30, from a direct read-only investigation of this repo's current state
(package versions, `astro.config.mjs`, `site.json`, `src/pages/**`, `seed/`, `data.db`,
`wrangler.jsonc`, `AGENTS.md`/`docs/RUNBOOK.md`) — not guessed. Companion to
`~/dev/vitops-portal/PLAN-vnext-feature-adoption.md`, which covers the portal side of goal
(c) below. Three goals, tackled roughly in this order because each has real dependencies on
the one before it:

- **(a)** Upgrade to the current `@getvitops/*` toolchain (this site is on `7.0.0`, current is
  `8.1.0` + three unreleased features).
- **(b)** Move most page content into EmDash instead of hand-written `.astro` source.
- **(c)** Have `site.json` managed through the vitops-portal product, once its publish
  pipeline can actually reach this repo.

## Prerequisite — same as the portal plan

The three vNext features (`site.plan`, `site.experiments`/`vitopsAbTesting()`, per-action
`conversionLabel`/`vitopsFormConversion()`/`site.notifications.actionUrl`) don't exist in any
published version yet. **Don't start (a) until `~/dev/vitops` has actually been released** —
see the portal plan's prerequisite section for the exact steps. This affects `@getvitops/emdash`
too (currently `0.3.7`, latest is `0.3.10` — independent versioning, but bump both together
while touching dependencies anyway).

## (a) Toolchain upgrade — 7.0.0 → current

Mechanically routine, but **one breaking change needs an accompanying config edit, not just a
version bump**: `site.json` already has `site.tracking.enabled: true`. §14's `validateConfig`
rule (shipped in the version this upgrades to) rejects that without a matching
`site.plan.addons` entry. Add, at minimum:

```json
"plan": { "key": "internal", "addons": ["server_side_tracking"] }
```

before running `vitops validate` / rebuilding, or the upgrade will hard-fail at build time with
no other symptom. (`"internal"` as the plan key is a placeholder — once goal (c) lands and this
site's config is portal-managed, `site.plan` will be written by the portal's own publish
pipeline instead; see that plan's item 2a. Don't invest in a "real" plan key here now.)

Beyond that: bump `@getvitops/{astro,utils,cli,generator}` to the new release,
`@getvitops/emdash` to `0.3.10`, `pnpm install`, `vitops generate`/`vitops validate`, run the
full existing test/build pipeline, fix whatever else the version bump surfaces. Also worth
doing in the same pass, since it's a one-line fix found while investigating this repo:
**`AGENTS.md` claims `src/pages/api/track.ts` doesn't exist** ("this site has no `tel:` link
anywhere") — it does now (added since that doc was last updated, and `contact.astro` does have
a `tel:` link). Correct that doc; a stale "this doesn't exist" claim is worse than no comment,
because the next person to read it will trust it over the code.

## Reconciling the existing bespoke A/B system with `vitopsAbTesting()`

This site already runs its own, fully independent A/B mechanism — `src/lib/variant.ts`,
`src/middleware.ts`, `src/_b/`, and `src/pages/b-variant/[...path].astro` — predating and
unrelated to the toolchain's `site.abTesting`/`site.experiments`. **This needs its own read
before deciding anything** — this investigation confirmed the bespoke system exists and named
its files, but didn't trace its exact mechanics (how a variant is chosen, what `b-variant`
rewrites, whether it's request-time or build-time). Before migrating:

1. Read `src/lib/variant.ts` + `src/middleware.ts` + `docs/RUNBOOK.md`'s "A/B testing" section
   in full, and confirm exactly what it does today.
2. Decide: replace it outright with `vitopsAbTesting()` + `site.experiments` (the toolchain-
   native, documented, tested mechanism this whole plan is otherwise adopting), or leave it
   running for any _currently live_ experiment and only use `site.experiments` for new ones
   going forward. A mid-flight live experiment is not something to silently migrate — check
   whether one is actually running before touching this.
3. If replacing: `b-variant/[...path].astro` and the bespoke middleware logic should be
   deletable once nothing references them — don't leave a second, dead A/B mechanism installed
   alongside the new one.

## (b) Moving content into EmDash

**This is a from-scratch content-modeling project, not "finishing" a half-done migration.**
EmDash's content layer is installed but functionally inert here: `seed/seed.json` is still the
generic, uncustomized "Marketing Starter" template seed (demo hero copy, a nav pointing at
routes that don't exist on this site); the local `data.db` is schema-only with zero content
rows; `src/components/MarketingBlocks.astro` (a Portable Text renderer) is orphaned — no page
imports it. All 31 public routes are hand-written `.astro` files with real, sourced,
production copy, not placeholders.

**Update 2026-09-30: the in-flight SEO/copy rewrite is done** — the 24 root-level `PLAN-*.md`
working documents have been deleted from this repo. Nothing left to sequence around; the copy
in each live `.astro` file is the real, current source of truth for what migrates.

**Confirmed order: About Us first, then the managed-IT software subpages.** About Us is a
single, one-off page — the smallest real surface to prove the whole chain (EmDash page entry
→ block rendering → route → SEO → JSON-LD) end to end without also having to get a collection
schema right on the first try. Managed-IT (7 pages under `managed-it-services/*`, same
structure per product) comes second, once that chain is proven, because it's the first place a
real _collection_ (not a one-off page) actually pays for itself.

### 0. Extract `@getvitops/core`/`@getvitops/astro` into EmDash blocks first

**This has to happen before either page migrates, not after.** Both packages carry real,
reusable UI — CSS patterns, `<wc-*>` web components (cards, carousel, gallery, tree, review
card, marquee, …), and the Astro tier-3 wrappers built on top of them
(`Subgrid`/`Cards`/`Carousel`/`Gallery`/`NodeRenderer`/`Tree`/`ReviewCard`/`Marquee`, per
`@getvitops/astro`'s `package.json` exports) — none of which an EmDash editor can reach today.
Without this step, "moving content into EmDash" means every migrated page degrades to plain
Portable Text paragraphs, losing whatever cards/carousels/galleries the current hand-written
`.astro` versions use — a real regression, not just a lateral move.

- The design-system-editor plugin work already shipped in `@getvitops/emdash` (§12 of the
  toolchain's vNext plan — `admin.portableTextBlocks`, `componentsEntry`/`blockComponents`) is
  the existing mechanism for registering a component as an EmDash Portable Text block. **Read
  that plugin's current source and its own docs before designing new blocks** — confirm exactly
  what it already registers (this repo's `astro.config.mjs` wires `vitopsEmdash()` as a plugin
  already, but per the earlier investigation, only for admin-side design-system editing, not
  for content-authoring blocks) rather than assuming it's empty.
- For each tier-3 component you plan to use on About Us or a managed-IT page, register a
  matching EmDash block: the block's editor-facing shape (which props an author fills in) maps
  to the Astro component's own `Props` interface, and `blockComponents` wires the block type to
  the component that renders it. Start with whatever About Us and one managed-IT page actually
  need (re-read those two live `.astro` files first — don't pre-build blocks for components
  nothing here uses yet), not a from every component in the design system.
- This is toolchain-level work (`@getvitops/emdash`), not `vitops-website`-specific — if a block
  registration is generically useful (e.g. a `Cards`/`Subgrid` block, useful to any EmDash site
  using this design system), it belongs upstream in `@getvitops/emdash` itself, following the
  same "don't fork the toolchain per-client" principle the rest of this plan already assumes.
  A `vitops-website`-only block (something specific to this site's own layout) stays local, in
  this repo's own `src/plugins/marketing-blocks/` (already present, currently generic/unused
  per the earlier investigation).

### 1. About Us — the proof case

1. Re-read the live `about.astro` in full — confirm its actual sections (team? credentials?
   plain prose?) rather than assuming from the route name.
2. Model it as a single EmDash **page** entry (not a collection — there's only one), with
   typed fields for whatever's structured (e.g. a team-member repeater, if there is one) and a
   Portable Text body for prose, using the blocks built in step 0 for anything that isn't plain
   text.
3. Carry over per-page SEO metadata deliberately — `about.astro` presumably sets its own
   title/meta description inline today; the EmDash entry needs an equivalent SEO field set, and
   the route needs to actually read and render it via `<Seo />`, or this migration silently
   regresses SEO on the first page it touches.
4. Build the real route (`src/pages/about.astro` rewritten to query EmDash, or a
   `getEntry()`-backed replacement) rendering the entry via `NodeRenderer`/`MarketingBlocks.astro`
   (both already present, currently unused per the earlier investigation).
5. Once it renders correctly end to end, delete the old hand-written version of that page's
   logic — don't leave a dead second implementation behind.

### 2. Managed-IT software subpages — the first real collection

1. Design the collection schema against the real shared structure of the 7 live
   `managed-it-services/*` pages (re-read them; don't assume from the file list) — typed fields
   for whatever's structured (product name, feature list, pricing tier, integrations), Portable
   Text + the step-0 blocks for the rest.
2. Same SEO-metadata and JSON-LD carry-over discipline as About Us — per-entry SEO fields, and
   check whether these pages already commit to a schema.org type (`Service` is the likely
   candidate) worth wiring through the existing `packages/utils/src/schema/*` builders rather
   than re-deciding from scratch.
3. Build one real route (e.g. `src/pages/managed-it-services/[slug].astro`) rendering from the
   collection.
4. Once real content lives in EmDash for this family, delete the 7 corresponding `.astro`
   files — don't leave both a static page and an EmDash entry answering the same route.

### Beyond these two

Industries (4 pages), funding (4 pages), and the two Ottawa SEO landing pages are the
remaining families, in whatever order makes sense once the pattern above is proven — not
scoped in detail here.

**Don't migrate `organization.locations`/`organization.services` into EmDash** — those are
`site.json` fields (JSON-LD source data), not EmDash content, and `site.json` currently has
neither populated. That's the now-standing, decision-complete "location and service page
generation" backlog item in the main toolchain's `TODO.md` — a separate, later effort, not
part of this content migration. Don't conflate the two.

`content-plan/` (the older, pre-rename source documents) and `Vitops_Pricing_Sheet_4.pdf` are
reference material, not build inputs — don't try to import them programmatically; the real
source of truth for migrated copy is each currently-live `.astro` file.

## Adopting the conversion-tracking features

Smaller, independent of (b), safe to do right after (a):

- **`vitopsFormConversion()`**: check whether `contact.astro`'s form submission is fetch-based
  or a no-JS `<form method="post">` — if fetch-based, call
  `window.vitopsFormConversion(formEl)` from its success handler once `api/contact.ts` (the
  bespoke handler, not `createConversionRoute()`) confirms success. If genuinely no-JS today,
  there's nothing to hook — leave it, per the toolchain's own stated gap for that path.
- **`site.ads`**: currently entirely unset. Populate it only if Vitops actually runs paid ad
  campaigns for itself (Google/Meta/etc.) — check before adding speculative config. If it does,
  set `conversionLabel` as the new per-action map (`{call, email, form}`) directly; there's no
  existing bare-string config here to migrate.
- **`site.notifications.actionUrl`**: optional, low-effort once there's something worth linking
  to (a CRM record, an ads-platform view) — add only when that destination exists.
- **`<Ads />`** isn't rendered anywhere in the layout today (matches `site.ads` being unset) —
  add it to `PineLayout.astro` alongside the existing `<Analytics />`/`<Tracking />` once
  `site.ads` has real entries, gated the same way those two already are (`analyticsEnabled`).

## (c) Portal-managed `site.json`

**Blocked on the portal's `site.publish` provider**, which doesn't exist yet (see the portal
plan). Nothing to do here until that lands. When it does:

- This repo becomes the portal's first real "client" (its own dogfood tenant) — decide whether
  that means importing this site's _current_ `site.json` into the portal's `site_configs`
  table as the initial draft/published row (preserving `organization`/`site` as they stand
  today), or starting the portal-managed config fresh and reconciling by hand. Recommend
  importing — this config already has real, correct `organization.contact`/`sameAs`/
  `domains.canonical`/`legal.privacyPolicy.processors` etc.; re-authoring it from an empty
  portal form would be pure rework.
- `designSystem` stays hand-managed in this repo regardless (portal's Phase 3 explicitly
  doesn't cover it yet) — only `organization` and the `site.*` fields the portal grows editors
  for (per the portal plan's 2a–2d) would move to portal management. Expect a period where
  `site.json` is partially portal-sourced and partially still hand-edited here; don't assume
  a single cutover moment.
- The D1 database itself is mid-migration between Cloudflare accounts
  (`wrangler.jsonc`'s comment: new DB under `admin@monad.media`, old one still live under
  `alex@vitops.ca` pending decommission) — sequence the portal cutover after that account
  migration settles, not concurrently with it.

## Sequencing summary

1. Release the monorepo (shared prerequisite with the portal plan).
2. Upgrade this repo's toolchain deps + add `site.plan.addons: ['server_side_tracking']` +
   fix the stale `AGENTS.md` claim.
3. Read and decide on the bespoke A/B system before touching anything A/B-related.
4. Adopt the conversion-tracking features (small, independent).
5. Extract the design-system components About Us and managed-IT actually use into EmDash
   blocks (§0 of the content-migration section) — before either page migrates, not after.
6. Migrate About Us (the proof case), then the managed-IT software subpages (the first real
   collection). Industries/funding/SEO-landing-page families follow once that pattern holds.
7. Once the portal's publish provider exists: import this site's config into the portal and
   begin portal-managed `site.json`, in whatever order its own editors ship.
