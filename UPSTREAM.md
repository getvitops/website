# UPSTREAM.md

Findings from dogfooding `@getvitops/*` on the vitops.ca redesign (tokens from
the Workdrive mockups, home page built as EmDash blocks): things that didn't
work, were awkward, or are missing. Written for the toolkit maintainers.

**Guiding principle.** Sites should be composed from blocks, so that
non-technical editors can rearrange and edit pages in the CMS. Where the toolkit
forced us into site-local code instead (`src/components/blocks/*`,
`SiteHeader.astro`, `site.css`), that is logged here as a gap in the block
library, not as the recommended answer.

Entry format: **what we tried / expected / actual / workaround / suggested fix.**

Versions: `@getvitops/astro` 8.2.0, `@getvitops/emdash` 1.0.0, `emdash` 1.4.0.

## What worked well

- **`vitops.*` blocks resolve inside a block type's `portableText` field.**
  `vitops.cards` and `vitops.actionLink` placed in a `vt_section` body render
  with their web components. This is what makes the "section + vitops blocks"
  composition possible at all.
- `emdash export-seed` + `emdash seed --validate` round-trips a hand-built
  database (block types, blocks field, menus, content) into a valid seed.
- The `centered` / `region` / `rhythm` / `subgrid` / `cluster` vocabulary covered
  nearly all layout; `lint:design` caught real mistakes (see 14).

## Design tokens (`site.json`)

### 1. No dark-only mode

- **Tried:** the mockups are dark-only. Looked for `defaultColorScheme: "dark"`.
- **Actual:** `defaultColorScheme` accepts `light` (default) or `system`. Dark is
  only reachable through `data-theme="dark"`. Light tokens are the base; dark is
  a delta.
- **Workaround:** `<html data-theme="dark">` hard-coded in `Layout.astro`.
- **Fix:** add `"dark"` to `defaultColorScheme`, and let a dark-only site opt out
  of the light-mode contrast checks (see 2).

### 2. A light-on-dark brand can't have its solid fill equal the brand colour

This one cost the most time. The mockups use bright pine `#81b9a1` and amber
`#f5b94a` as button and badge fills with **dark** text.

- **Actual:** the role "solid" family is pinned to **step 600** (mode-stable) and
  its `text-on-*` is computed light; every ramp must darken 50→950. So:
  - anchoring `#81b9a1` at step 600 fails the ramp check (step 500 is darker);
  - pinning the whole ramp lighter fixes that, but then the build fails the
    contrast contract in **light** mode (`warning/light: text Lc 34 < 60`...),
    which a dark-only site never renders.
- **Workaround:** keep roles on the natural ramps (brand-primary → `pine`), and
  use raw steps (`bg-pine-400 text-ink-950`, `text-amber-300`) in the blocks,
  plus `--bg-button` / two color overrides for `.btn` in `site.css`. Raw steps
  are documented as a "latent bug" on switchable sites, which ours is not.
- **Cost today:** the block `tone` field resolves a role first, as it should, but
  the home page content sets the `color` escape hatch (`pine-400`, `amber-300`)
  on every toned item to keep the mockup's fills, and `site.css` forces the
  default `.btn` to pine. The escape hatch is the common case on this site.
- **Fix:** let a role name its solid step (`{ hue, solid: 400 }`) and the
  foreground polarity, and skip the light-mode checks when the site is dark-only.

### 3. Shadows can't express spread or inset

- **Tried:** `0 24px 48px -12px #000c`, `0 40px 80px -30px #000a`, a 1px inset
  ring and a 4px halo.
- **Actual:** one layer, no spread, no inset (the same token feeds `drop-shadow`).
- **Workaround:** plain offset/blur/alpha shadows; ring/halo as border/outline.
- **Fix:** `shadows.<name>: { box, drop }` so `box-shadow` can use the full
  grammar.

### 4. Mockup colours trip the contrast contract

- Muted text `#a7b0bd` on `#141b26` is Lc 57.6 (< 60), so `generate` fails.
  Lightened the anchor to `#b4bcc8`. The check is reasonable; docs should say
  muted text needs ≈Lc 60 against the page plane.

### 5. Anchor warnings are noisy when matching an existing palette

- Every off-ladder anchor logs a "Legal, but..." line (5 per build here).
  Suggest `--quiet` or a per-hue acknowledgement.

### 6. Typography role key for case is `text-transform`; docs say "transform"

- `"transform": "uppercase"` warns `unknown key ... Did you mean
  "text-transform"?`. `text-transform` works. Use one name everywhere.

### 7. Type scale is too small for marketing headings by default

- With `names` 2xs..3xl, a ratio that gives a 76px h1 makes the small end
  unusably tiny. Had to add `4xl`, `5xl` and re-tune. Suggest a documented recipe
  or a scale that can anchor both ends (`min`/`max` for a named step).

### 8. Layout widths and region spacing aren't tokens

- `--width-measure/breakout/spotlight` and `--region-space-*` can only be changed
  by overriding CSS variables (`site.css`). Neither is in `site.json`, so the
  `/design-system` editor can't tune them.

### 9. Organization fields

- `organization.address` requires `streetAddress`; a business with no public
  street address can't state its region (the legal generator reads it).
- `organization` has no `description`; used `site.seo.defaultDescription`.

### 10. `favicon.themeColor` / `backgroundColor` duplicate site.json

- `astro.config.mjs` hard-codes both and they don't follow palette changes.
  Derive them from the `brand-primary` role and the page surface.

## Setup / scaffold

### 11. `site.fonts` is silently ignored unless `vitops({ fonts: true })`

- **Tried:** declared Geist in `site.fonts[]`, as the docs describe.
- **Actual:** no `@font-face`, no preload, no warning. Only passing `fonts` to the
  `vitops()` integration reads the families.
- **Fix:** default `fonts` to on when `site.fonts` is non-empty, or warn.

### 12. `Astro.rewrite('/404')` to a prerendered 404 returns 500

- **Actual:** `[...slug].astro` rewrites unknown URLs to `/404`, which scaffolds
  `prerender = true`. Astro refuses ("rewrite the on-demand route with the
  static route '/404'") so **every unknown URL is a 500**, in dev and build.
  The scaffold comment claims the rewrite works.
- **Workaround:** `prerender = false` on `404.astro`.

### 13. The icon sprite isn't served in dev

- `icons.sprite: true` generates `src/styles/icons.svg`, but nothing writes or
  serves `/vitops/icons.svg`; the URL hit the catch-all (500, see 12). Sprite ids
  are `fa7-solid--*`, and the semantic list has no chevron/arrow names.
- **Workaround:** copy the file to `public/vitops/icons.svg` (gitignored). We did
  not verify whether `build` generates it on its own.

### 14. `lint:design` doesn't flag classes that don't exist in the format

- `md-split-1-2` / `md-split` are the CSS-format spellings. The Tailwind format
  wants `@md:split-1-2`. The unknown class compiled silently and the layout just
  stacked. The docs table shows both spellings; lint should flag a class that
  has no rule in the selected format.

### 15. `npx vitops docs ...` fails without `--input site.json`

- AGENTS.md says to run it bare; the default config path is the old
  `design-system.json` ("config not found").

### 16. Minor

- `pnpm dev` returns immediately (`astro dev` now daemonises). AGENTS.md assumes
  a foreground server.
- `package.json` `name` is still the scaffold slug (`jury-regarding`).
- `cloudflareEmail` sender is a placeholder domain.

## EmDash core (affects the block-type route)

### 17. `emdash types` doesn't type `blocks` fields

- `.emdash/types.ts` has `layout?: unknown[]`. The `PageLayoutBlock` union the
  blocks guide imports isn't generated. Workaround: hand-written `BV<T>` value
  types per renderer.

## Patterns

### 18. The `button` pattern styles bare `<button>` only

- Link-buttons need a class. Set `items.button.class: "btn"` in `site.json`
  (and `roles`). The scaffold doesn't, so `<a class="button">` renders unstyled.
- Its text colour is forced from the role's `text-on-*` and hover darkens to
  `-solid-bold`; both assume a light-text solid (see 2).

### 19. `vitops.cards` renders its title as `<p class="font-heading">`

- That is the section-heading size (45px here), far too big for a card. Not an
  `h3`, so heading outline is lost too. Overridden in `site.css`. Suggest a
  dedicated `font-title` role and a real heading element/level prop.
- Card body is plain text: the inline links in the mockup copy ("you pay for
  software you don't use", "connect your marketing to the tools...") were lost.

### 20. No header/nav component for Astro/EmDash

- `sitenav` (menu → drawer + dropdown) exists only for Bricks. `NavShell` is a
  sidebar. Hand-wrote `SiteHeader.astro` from the `primary` menu. EmDash menu
  items have no description field, so `titleAttr` carries the dropdown
  description and `cssClasses` the dot colour.
- **Proposed:** `<SiteNav menu="primary">` / `vitops.nav`: nested items,
  description, hover/focus dropdown, mobile drawer.

### 21. Block colour fields only offer a fixed semantic list

- **Wanted:** block fields that take (1) a **role** name (preferred), (2) a
  **semantic** name as fallback, (3) a **colour** name as an escape hatch.
- **Actual:** only the semantic tier exists. `vitops.banner.tone` is
  `info | success | warning | danger` (rendered as `bg-${tone}`), and
  `vitops.actionLink.role` is a select of `success | danger | warning | info`
  (rendered as `${variant}-${role}`, so a site role like `brand-secondary` works
  only if the pattern lists it in `roles`, and the admin never offers it). Site
  roles from `colors.roles` and palette hues are offered nowhere.
- **Workaround:** `src/components/blocks/tone.ts` `resolveTone(tone, color)`
  resolves role, then semantic fallback chain, then palette hue/step, and returns
  CSS custom properties (class names can't be built from field values: Tailwind
  only emits classes it can read in source).
- **Fix:** one shared `tone` convention for every block, resolved against
  `site.json`. A block select can't list a site's own roles (select options are
  static), so also add an `optionsFrom: "site.roles"` field option, or a string
  field with validation against the config.

### 22. The template teaches `pnpm` / `npx` on a Vite+ project

- **Actual:** the scaffold is `vp create @getvitops:emdash` (Vite+, `vite-plus`
  in the catalog), but its `AGENTS.md`, `README.md`, the `setup` skill, the
  `vitops-design-system` skill (in `@getvitops/cli`, line ~107:
  `pnpm exec vitops docs` / `npx vitops docs`) and the SessionStart hook all say
  `pnpm` / `npx`. Agents follow them.
- **Done here:** `AGENTS.md`, `README.md` and the `setup` skill rewritten
  vp-first, with one command table in `AGENTS.md` (install/add/update, `vpr` for
  scripts, `vp exec` for local bins, `vp dlx` for one-offs, `vp check`).
- **Note for every site:** `vp dev` / `vp build` run Vite directly, so scripts
  that wrap Astro must go through `vpr` (`vpr dev`, `vpr build`).
- **Not changed (can't verify `vp` exists there):** `scripts/refresh-dev.mjs`
  (`execFileSync('pnpm', ['exec', 'wrangler', …])`), `.claude/hooks/session-start.sh`
  (installs Node 24 and pnpm in the Claude web container), and the reusable CI
  workflow `getvitops/design-system/.github/workflows/site-ci.yml@v1`. They need a
  vp-aware pass.
- **Release commands:** `vp pm version` and `vp pm publish` exist in vp 1.4.0.
  `vp change` and `vp pm change` return "Command not found" (`vp pm change` says
  "Did you mean `vp pm stage`?"). Please confirm the name, or the version that
  ships it, and put the release flow in the template's guidance.
- `vp config --agent` printed nothing and changed no files, so it did not help
  here.

### 23. The scaffold omits the `badge` and `tag` patterns

- `patterns.items` ships only `button` and `card`, so `.badge` / `.tag` emit no
  CSS (`vitops docs components` lists them "absent from this config"). Blocks that
  show labels have to add them first. Add them to the scaffold, with the `label`
  group.
- Terminology: the docs define `badge` as a static label and `tag` as
  "editable/dismissable". The intended standard is **badge = static, tag = static
  or dynamic**. Align the docs, and keep "chip"/"pill" out of the vocabulary.

### 24. The custom-block rule belongs in the template

- The decision rule (compose, extend, site-local, upstream), the field/naming
  conventions and the lifecycle are in this repo's
  `.agents/skills/custom-blocks/SKILL.md`. Every site built on the toolkit needs
  the same rule, so the template should ship it (skill plus an `AGENTS.md`
  pointer).

### 25. EmDash tooling gaps hit while migrating blocks

- `emdash content update` has no `--migrate-blocks` flag, so a breaking block
  version can't be migrated from the CLI. Used the REST route
  (`PUT /_emdash/api/content/<collection>/<id>`, body `{ data, _rev,
  migrateBlocks: true }`) with a dev-bypass session. It takes Portable Text
  arrays; the CLI and MCP take Markdown.
- `schema_activate_block_type_version`'s `expectedFingerprint` is the
  **currently active** version's fingerprint, not the one being activated.
  Undocumented; the first attempt failed with `CONFLICT`.
- `schema_update_block_type` replaces the whole `fields` list.
- Updating a published entry stages a draft; a separate `content publish` is
  needed before the live page changes.

### 26. `counter` has an Astro component but no EmDash block

`@getvitops/astro/components/Counter.astro` (`<wc-counter>`) is listed as
`css · wc · astro`; `vitops docs blocks` has no `vitops.counter`, and no other
block can hold a count-up figure. Editors can't add an animated stat in the CMS.
Workaround: `vt_stats` now renders `<Counter value={…} />` inside its (site-local)
renderer, so its stat figures count up. The animation also covers the `82%`
case with no extra config. Suggested fix: `vitops.stats` (see the registry) should
render `Counter` for its figures, and a standalone `vitops.counter` (value, from,
duration, decimals) would cover a single figure in running text.

## Alpha upgrade results (`@getvitops` 8.3.0-alpha.0 / emdash 2.0.0-alpha.0)

The toolchain shipped most of the registry below, so the site moved onto the `alpha`
dist-tag and migrated what matched. Status per block:

| Local block                  | Result                                                                 | Why                                                                  |
| ---------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `vt_section`                 | **migrated** to `vitops_section`                                       | grid backdrop dropped (gap A)                                        |
| `vt_stats`                   | **migrated** to `vitops.stats`                                         | per-figure colour lost (gap B)                                       |
| `vt_band`                    | **migrated** to `vitops.callout`                                       | icon dropped; `solid` unreadable (gap F)                             |
| `vt_steps`                   | **migrated** to `vitops.steps`                                         | title size needed a site rule (gap G)                                |
| `vt_contact`                 | **migrated** to `vitops.form`                                          | multi-select became choose-one; no delivery address yet (gap H)      |
| `vt_hero`                    | **stays local**                                                        | `vitops.hero` cards have no eyebrow, per-card tone or button (gap C) |
| `vt_pillars`                 | **stays local**                                                        | `vitops.cards` panel tone is per block, not per card (gap C)         |
| `vt_logos`                   | **stays local**                                                        | `vitops.logos` renders images only; ours are names (gap D)           |
| `vt_badges`                  | **migrated** (alpha.1) to `vitops_section` (`split`) + `vitops.badges` | none; label order and copy kept                                      |
| `vt_compare`, `vt_dashboard` | **stay local**                                                         | site-specific, as predicted                                          |

Header and footer: header is `<SiteNav>` (menus `primary`). The framework's `<SiteFooter>` is a
flat list with no columns or brand, so the footer stays site-local and reads
`footer-sitemap` (parents = columns) and `footer-legal`.

### Gaps found while migrating

- **A. No section backdrop.** `vitops_section` has `tone`/`solid` but nothing like the blueprint
  grid, and select options are static, so a site can't register its own. Suggest a `backdrop`
  field whose options the site supplies like `tones`.
- **B. Colour is per block, not per item.** Stats, steps and panel cards take one `tone`. Our two
  stats are pine and amber, and our two pillars and hero doors are pine and amber. Either allow
  a `tone`/`color` per row, or document that a mixed-colour set means one block per colour.
- **C. `vitops.hero` cards** need an eyebrow, a per-card tone and a button label. **`vitops.cards`
  panel** needs per-card tone.
- **D. `vitops.logos` drops entries without an image**, so a site with wordmarks or text-only
  partners renders nothing. Offer a text fallback (the name as the mark).
- **E. (fixed in alpha.1: `anchor` field; `--header-offset` for the sticky header) `vitops_section` and `vitops.form` have no anchor id**, so `#contact` and `/#services`
  links from the menu and from content break. Add an `anchor` field.
- **F. Callout `solid` puts white text on amber** (same cause as finding 2: solid steps pinned
  with a light foreground). The tinted default is light-on-dark on a dark-only site. Neither
  looks right; the callout needs a dark-theme-aware tint.
- **G. Per-component type size.** `steps__title`, stats figures and card titles all use the
  `heading`/`display` roles at full size, so a site rule (`.steps__title`) was needed.
  Components should expose a size hook or use a smaller role by default.
- **H. `vitops.form`:** "interested in" was a multi-select tag group; the block offers choose-one
  only. The route refuses posts until `site.notifications.email` is set and, with a Turnstile
  key, until `VITOPS_TURNSTILE_SECRET` exists. Neither is set; `vitops setup turnstile` creates
  a Cloudflare widget and was deliberately not run.
- **I. (fixed in alpha.1: the integration adds `@source` lines; `src/package-classes.txt` deleted) Tailwind does not scan `node_modules`.** `font-display` is used by `vitops.stats` but was
  not emitted, so figures rendered body-size with no error. Worked around with
  `src/package-classes.txt`. The `vitops()` integration should add an `@source` for the packages
  it renders. The same check found `font-caption`/`font-footnote` used by package components with
  no matching utility, and `sr-only` (used by `wc-counter`), which showed up as a doubled figure (J).
- **J. Counter with a unit (was misdiagnosed; resolved).** `value: "11 hrs/week"` appeared to
  render twice ("11 hrs/week1 hrs/week") while counting, so the stats were first set to
  `animate: false`. The cause was gap I, not the counter: `<wc-counter>` hides the real value
  with the `.sr-only` utility while it runs, and Tailwind never emitted `.sr-only` because
  nothing in `src` mentions it (the generator leaves it to Tailwind, which doesn't scan
  `node_modules`). Adding `sr-only` to `src/package-classes.txt` fixes it, and `wc-counter`
  parses a unit suffix correctly. `animate` is back on.
- **K. (fixed in alpha.1: preflight before the server, cleanup on exit, page list from sitemap/menus) `vitops audit` leaks its preview server** when Chromium fails to launch: the next run
  aborts with "port 4398 is already in use". It also needed `playwright install chromium` by
  hand, and 25 candidate pages mostly 404 (menus link to planned pages).
- **L. Footer links to planned pages.** `primary` and `footer-sitemap` keep the mockup's planned
  links (`/pricing`, `/industries`, ...), which 404 until the pages exist.
- **M. Header actions.** The mockup's "Client portal" and "Talk to us" buttons have no place in
  `<SiteNav>`; "Contact" is the last `primary` item instead.
- **N. `UPGRADE-PROMPT.md` told `vpx emdash seed`;** `vpx` is `vp dlx`, which fetches the package
  instead of using the pinned binary. Used `vp exec emdash`.

### alpha.1 follow-up

`@getvitops/*` 8.3.0-alpha.1 fixed E, I, K and the badges gap (above), added the `caption` and
`footnote` type roles to the template (this site added them to its own `site.json`), and added
widget areas (`announcement`, `pre-footer`; the latter left empty here). New observations:

- **Sitemap lists unbuilt routes.** `vitops audit` now reads the built sitemap and found
  `/pages/home`, `/pages/about`, `/pages/terms` and `/pages/privacy`, all 404. The EmDash
  sitemap emits `/pages/<slug>` while this site serves `/<slug>`, so the sitemap submitted to
  search engines would point at dead URLs. Needs checking against the deployed build.
- **Build prints `PortableText [components.type] is missing "vitops.…"`** for every vitops block
  on every prerendered page, while the pages render correctly. Not confirmed whether this is new
  in alpha.1; it is noise that hides real warnings.
- **The template ignores all of `src/styles/`, but tells sites to keep CSS there.** `_gitignore`
  has `src/styles/` (for the generated `tailwind.css`), and this site's hand-written `site.css`
  lived in the same folder, so it was never committed: a clean clone would not build. Moved to
  `src/site.css`. The template should ignore only `src/styles/tailwind.css`, and say where
  site CSS goes.
- **`vp update` rewrites unrelated ranges** (astro, wrangler, tailwind, `devEngines.runtime.version`
  pinned to an exact Node) as well as moving the `alpha` specifiers.

Still open from before: per-item colour (B, C), `vt_logos` text fallback (D), callout contrast (F),
type-size hooks (G), form choose-one / delivery (H), planned-page links (L), header actions (M).

### Result

`seed --validate`, `vpr prepare-local-db`, `vpr build` (prerender guard), `vpr typecheck`,
`vpr lint:design` and `vp check` pass. `vitops audit` (mobile): `/`, `/privacy`, `/terms`, `/about`
pass the budgets and have no serious axe violations (LCP 1.8-2.0 s, CLS 0, TBT 0, Lighthouse
performance 98, SEO 100, best practices 100); 21 candidate pages skipped as 404. One axe failure
(`link-in-text-block`, two inline links) was found and fixed. A pass is not AODA certification.

## Proposed blocks (registry)

The home page needed 11 site-local block types (`vt_*`, in
`src/components/blocks`). Verdicts follow the test in
`.agents/skills/custom-blocks/SKILL.md`. Caveat: only one site has been seen, so
"universal" is a judgement from common website patterns, not a second consumer.
Blocks can't nest, so "section with stats inside" is a flat sequence of sibling
blocks, and per-section backdrops don't carry over.

| Local block    | Mockup section                           | Verdict                              | Upstream shape                                                                                                                                                                                                                                                                                                                      | Status                                         |
| -------------- | ---------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `vt_section`   | kicker + h2 + intro + body (all 5 pages) | **Upstream, new** (highest priority) | `vitops.section`: kicker, heading, sub, backdrop, PT body accepting vitops blocks. Ship only generic backdrops (`plain`, a token surface); the vitops.ca `grid` decoration is site-specific and must be site-registered, not a built-in option (select options are static, so the toolkit needs a way to generate them from config) | local                                          |
| `vt_logos`     | key partners                             | **Upstream, new**                    | `vitops.logos` (static grid; `vitops.marquee` covers only scrolling)                                                                                                                                                                                                                                                                | local                                          |
| `vt_steps`     | "Getting started is simple" (3 pages)    | **Upstream, new**                    | `vitops.steps` plus a framework `steps` pattern for the connector line                                                                                                                                                                                                                                                              | local                                          |
| `vt_stats`     | "11 hrs/week", "82%"                     | **Upstream, new**                    | `vitops.stats` (figures render the framework `Counter`, finding 26); absorb the generic part of `vt_dashboard` as a `tiles` variant (group, delta, state)                                                                                                                                                                           | local                                          |
| `vt_band`      | funding strip                            | **Upstream, new**                    | `vitops.callout` (CTA band). Not `vitops.banner`, which is a dismissible alert                                                                                                                                                                                                                                                      | local                                          |
| `vt_contact`   | enquiry form (4 pages)                   | **Upstream, new, redesign first**    | `vitops.form`: submission route, spam protection, destination. EmDash has no forms plugin. The current block is a prototype with **no submit handler**; upstream the design, not this markup                                                                                                                                        | local                                          |
| `vt_hero`      | hero + two option cards                  | **Upstream as an extension**         | add accent marks in the heading and an optional cards slot to `vitops.hero`                                                                                                                                                                                                                                                         | local                                          |
| `vt_pillars`   | "Two services. One team."                | **Upstream as an extension**         | a `panel` variant of `vitops.cards` (tone, checklist, CTA); the framework already has `pricing-card`                                                                                                                                                                                                                                | local                                          |
| `vt_badges`    | industries                               | **Marginal**                         | only `vitops.badges` (a static badge list) is generic; the heading-left layout belongs to `vitops.section` as a `split` layout                                                                                                                                                                                                      | local (watch)                                  |
| `vt_dashboard` | sample dashboard (4 pages)               | **Site-specific**                    | this product's portal mock with sample data in code; its generic kernel goes into the `vitops.stats` tiles variant                                                                                                                                                                                                                  | local                                          |
| `vt_compare`   | two companies vs one                     | **Site-specific**                    | this site's argument, copy and figures hard-coded; revisit only if a second site needs an A-vs-B                                                                                                                                                                                                                                    | local                                          |
| `vt_chips`     | (old name of `vt_badges`)                | **Retired**                          | renamed to follow the framework's `badge` / `tag` vocabulary                                                                                                                                                                                                                                                                        | retired (stays in the DB and seed permanently) |

Count: 6 new upstream blocks, 2 extensions of existing blocks, 1 marginal, 2
site-specific.

Conventions across the blocks:

- **`tone` + `color`** on every block that colours things: a role name, with a
  palette-hue escape hatch (finding 21). The v1 values `it` / `mk` were vitops.ca
  vocabulary; the four blocks that had them (`vt_hero`, `vt_stats`, `vt_pillars`,
  `vt_band`) are now at v2 with generic options, and the renderers still map
  `it` / `mk` for any old content.
- **Repeater sub-fields** allow only scalars (no `portableText`, no links inside
  text), which is why checklist items are one newline-separated `text` field.
  Rich item bodies need that limit lifted.
- **Code-owned widgets** (`vt_compare`, `vt_dashboard`) expose only a caption.
- **Lesson:** `vt_chips` used a word the framework doesn't use, and block types
  can't be renamed, so the fix cost a new type, a content migration and a
  permanently retired type. Check the framework's pattern names before naming.
- **Not yet done:** `vt_logos` (`link_href`) and `vt_dashboard` (`caption_link_href`) still use `string` for links; EmDash's `url` type accepts site-relative paths, so they should move to `url` the next time those types get a breaking version.

## Overall assessment and roadmap

Rating after one site: **6.5 / 10**. This is a single-site, single-author
judgement. Lighthouse and a security audit were not run, so the performance and
security scores are inferred from defaults and configuration.

| Criterion                        | Score          | Basis                                                                                                                                                                       |
| -------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Design-system schema and theming | 8              | `site.json` as the single source of truth, roles, and the APCA contrast contract re-themed the site from mockups with little hand-written CSS                               |
| Fast and easy to start           | 6              | Good layout vocabulary and `docs` CLI, but no section, steps, stats, logos, CTA band or form: 11 site-local blocks were needed for one page                                 |
| Performance                      | 7 (unmeasured) | Prerender-by-default guidance, Workers + D1/R2, generated CSS. Only build and typecheck were verified                                                                       |
| Usable and accessible            | 7              | Contrast enforced, list-role and subgrid guidance; no nav or header/footer component (finding 20)                                                                           |
| Secure                           | 6 (unaudited)  | Hosting abstraction and a protected promote flow; the contact block has no submission route, spam protection or destination; CSP must stay off because of admin HTML blocks |
| Maintainable                     | 6              | `lint:design` and agent skills help; block types can't be deleted or renamed, and the template contradicted the toolchain (finding 22)                                      |

The re-rating test: a second site reuses the toolkit with only `site.json`
changes and the upstreamed blocks.

### Recurring themes in the findings

1. **Silent failures:** 11 (`site.fonts`), 12 (500 on unknown URLs), 13 (sprite not
   served), 14 (`lint:design` accepts classes that don't exist in the format).
2. **Brand colour can't be expressed:** 2 (solid fill pinned to step 600), 4, 21
   (block colour fields offer only a fixed semantic list).
3. **Guidance contradicts the toolchain:** 22 (`pnpm`/`npx` on a Vite+ project).
4. **Missing pieces:** 20 (no nav), 23 (no `badge`/`tag` by default), 17 (blocks
   untyped), and the block registry below (no section, steps, stats, logos, CTA
   band, form; blocks can't nest).
5. **No custom-block rule in the template:** 24.

### Suggested improvements, in priority order

1. **Ship the missing blocks.** `vitops.section` first (it must accept other
   blocks), then logos, steps, stats, callout (CTA band) and the hero/cards
   extensions. A form block needs a submission design first: route, spam
   protection (e.g. Turnstile) and destination. See the registry below.
2. **Make theming honest.**
   - Allow a per-role solid-fill step, or a bright-fill role kind (finding 2).
   - Support role, semantic and palette names in block fields (finding 21).
   - Make dark-only a first-class option (finding 1).
3. **Fail loudly instead of silently.**
   - Warn on ignored config keys such as `site.fonts` (11).
   - Return a proper 404 for unknown URLs (12).
   - Serve the icon sprite with the build (13).
   - Have `lint:design` validate class names against the output format (14).
4. **Fix the template guidance.**
   - Generate one `vp`-first command table into every site's `AGENTS.md`, README,
     skills and hook (22).
   - Ship the custom-block rule and the badge/tag vocabulary with the template
     (23, 24).
   - Confirm whether `vp pm change` exists (it returns "Command not found" in
     vp 1.4.0).
5. **Add scaffold defaults.** Header and footer driven by menus (20), `badge` and
   `tag` patterns enabled (23), and `emdash types` covering blocks (17).
6. **Prove the claims.**
   - Add Lighthouse (performance, accessibility, SEO) and axe checks to the
     reusable CI workflow.
   - Add a security checklist for the form route: CSRF, rate limiting, spam
     protection, input validation, and where submissions go.
   - Document the CSP trade-off with admin HTML blocks.
