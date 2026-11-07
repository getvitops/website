# UPSTREAM-2.md

Recommendations for the `@getvitops` maintainers, written after migrating vitops.ca
to `8.3.0-alpha.0` / `@getvitops/emdash@2.0.0-alpha.0`. It follows [UPSTREAM.md](UPSTREAM.md)
(the first round of findings, plus the "Alpha upgrade results" with gaps A–N). This file does
not repeat the findings; it ranks what to do next and says what "done" looks like.

**Where things stand.** Re-rated against the same six criteria: **7.5 / 10**, up from 6.5.

| Criterion                        | Before | Now |
| -------------------------------- | ------ | --- |
| Design-system schema and theming | 8      | 8.5 |
| Fast and easy to start           | 6      | 7.5 |
| Performance                      | 7      | 9   |
| Usable and accessible            | 7      | 8   |
| Secure                           | 6      | 7   |
| Maintainable                     | 6      | 7.5 |

Of the site's 11 local blocks, five moved to upstream blocks and six stayed local.
Mobile audit on `/`, `/privacy`, `/terms` and `/about`: Lighthouse performance 98, SEO 100,
best practices 100, LCP 1.8–2.0 s, CLS 0, TBT 0, no serious axe violations. This is one site and
one author, and no security audit was run.

**Target: 8 / 10.** Items 1–6 below are what it takes. Items 7–12 are polish and hardening.

> **alpha.1 update.** Items 2 (anchors), 4 (badges), 5 (Tailwind scanning) and 6 (audit hygiene) shipped and were verified on this site. Remaining: 1, 3 and everything below. New: the sitemap lists `/pages/<slug>` URLs that 404 (see UPSTREAM.md, "alpha.1 follow-up").

## Priority 1: close the gaps that kept blocks local

Each of these has a concrete consequence on vitops.ca. Doing 1–4 lets `vt_hero`, `vt_pillars`,
`vt_logos` and `vt_badges` be deleted and brings the migrated count from 5 of 11 to 9 of 11.

### 1. Per-item `tone`/`color` and `eyebrow` (gaps B, C)

- **Problem.** Colour is one `tone` per block. Hero cards have no eyebrow, per-card tone or
  button label; panel `vitops.cards` have no per-card tone. The site's two pillars, two hero
  doors and two stats are deliberately pine and amber, so `vt_hero` and `vt_pillars` stay local
  and the stats lost the split.
- **Recommendation.** Add optional `tone` and `color` to the repeater rows of `hero.cards`,
  `cards`, `stats` and `steps`, falling back to the block's value. Add `eyebrow` and `cta` (label
  plus url) to hero cards. If per-row colour is rejected on purpose, say so in the block docs and
  state that mixed colours mean one block per colour.
- **Done when.** `vt_hero` and `vt_pillars` can be rewritten as `vitops.hero` and `vitops.cards`
  with no copy or colour lost.

### 2. (Done in alpha.1) Anchor ids on sections and forms (gap E)

- **Problem.** `vitops_section` and `vitops.form` have no id. `#contact` (from content) and
  `/#services` (from the menu) land nowhere, and the contact CTA is dead.
- **Recommendation.** Add an `anchor` field (slug, validated unique per page) to `vitops_section`
  and `vitops.form`, rendered as `id` with `scroll-margin-top` that accounts for the sticky
  header. `vitops.form` already uses `#form-sent` and `#form-error`, so document how `anchor`
  interacts with them.
- **Done when.** `/#contact` scrolls to the form under the sticky header.

### 3. Text fallback in `vitops.logos` (gap D)

- **Problem.** Entries without an image are dropped, so a site whose partners are names, not
  wordmarks renders nothing. This is why `vt_logos` is still local.
- **Recommendation.** Render the name as the mark when no image is set, in the same list,
  with the same sizing and link behaviour. Keep `alt` rules as they are for images.
- **Done when.** `vt_logos` is replaced with no copy lost.

### 4. (Done in alpha.1) A `vitops.badges` block (or a documented route to one)

- **Problem.** `badge` and `tag` are patterns in the design system but no block exposes them, so
  the label row on the home page is site-local.
- **Recommendation.** Add `vitops.badges`: a repeater of `label`, optional `tone`/`color` and
  optional `icon`, with a `variant` of `badge` (static) or `tag` (static or dynamic). Use the
  vocabulary from AGENTS.md; do not introduce "chip" or "pill".
- **Done when.** `vt_badges` is replaced.

### 5. (Done in alpha.1) Tailwind must scan the packages it renders (gap I)

- **Problem.** Tailwind v4 does not scan `node_modules`, so utilities used only by package
  renderers are never emitted. `font-display` (used by `vitops.stats`), `font-caption` and
  `font-footnote` and `sr-only` were missing. The failure is silent: the stats figures rendered at body size
  with no error or warning.
- **Recommendation.** Have the `vitops()` integration add an `@source` for the packages it
  renders in the generated CSS, so no site needs a `package-classes.txt` workaround. As a
  backstop, `vitops emdash check-prerender` (or `lint:design`) should report a class used by a
  package renderer that has no rule in the built CSS.
- **Done when.** A fresh scaffold with `vitops.stats` renders display-size figures and
  `src/package-classes.txt` is not needed.

### 6. (Done in alpha.1) `vitops audit` hygiene (gap K)

- **Problem.** When Chromium fails to launch, the preview server on port 4398 is left running, so
  the next run aborts with "port 4398 is already in use". Chromium also had to be installed by
  hand, and 21 of 25 candidate pages were skipped as 404 with no explanation of why.
- **Recommendation.** Stop the preview in a `finally` and on `SIGINT`/`SIGTERM`. Detect a missing
  browser and print the exact `vp exec playwright install chromium` command, or run it behind a
  flag. List which pages were skipped and why (404 vs unreachable), and take the page list from
  the sitemap or the menus instead of guessing candidates. Document the three optional peers
  (`playwright`, `@axe-core/playwright`, `lighthouse`) in the template.
- **Done when.** Two consecutive failed runs behave the same, and the report names skipped pages.

## Priority 2: correctness and readability bugs

### 7. Callout `solid` and dark-theme tint (gap F)

- **Problem.** `solid` puts white text on amber (the same cause as finding 2 in UPSTREAM.md:
  solid steps pinned with a light foreground). The tinted default is light-on-dark and washed out
  on a dark-only site. Neither is readable at the contrast the design system otherwise enforces.
- **Recommendation.** Pick the foreground from the fill (`--tone-on`) instead of a fixed colour,
  and derive the tint from the theme so it holds contrast in both light and dark. Add a
  contrast check for every `tone × solid` combination to the block tests.
- **Done when.** Every tone passes the APCA contract in both variants.

### 8. Missing `sr-only` doubled the stats figure (gap J, corrected)

- **Problem.** `<wc-counter>` hides the real value with `.sr-only` while it counts, but nothing
  emits that utility (see item 5). The figure showed twice, and I wrongly blamed the unit and
  turned the animation off, so the stats weren't using `wc-counter` at all. This is a
  correction to my earlier note.
- **Recommendation.** Fixed by item 5. In addition, ship a small `.counter__value` rule in
  `counter.css` that hides the value without depending on a utility. Add a browser test that
  samples a running counter and asserts only one figure is visible.
- **Done when.** A stat with a unit counts up once on a scaffold with no site workaround.

### 9. Type size hooks (gap G)

- **Problem.** `steps__title`, stats figures and card titles all use the `heading`/`display`
  roles at full size, so the site needed its own `.steps__title` rule.
- **Recommendation.** Each component should use the smallest role that suits it by default, and
  expose a CSS custom property (for example `--steps-title-size`) or a `size` option. This should
  not need site CSS.

## Priority 3: footer, forms and onboarding

### 10. Make `SiteFooter` structured (gap, footer)

- **Problem.** `SiteFooter` is a flat list with no columns, and its docs say so on purpose ("a
  footer that nests is a site map, and wants a page"). Most marketing sites, including this one,
  have grouped footer links, so the footer stays site-local.
- **Recommendation.** Support one level of grouping: a top-level item with children becomes a
  column with a heading, and a childless item stays in the flat list. Keep the legal row and
  copyright as they are. Keep the `nav` landmarks named.
- **Done when.** vitops.ca's local `SiteFooter.astro` is deleted and the footer reads the same
  `footer-sitemap` menu.

### 11. Form fields and delivery (gap H)

- **Problem.** The interests field was a multi-select tag group; `vitops.form` offers
  choose-one only. The route refuses posts until `site.notifications.email` is set and, when a
  Turnstile key is set, until `VITOPS_TURNSTILE_SECRET` exists. Neither is set on this site,
  and `vitops setup turnstile` creates a Cloudflare widget, so it was not run.
- **Recommendation.**
  1. Add a `checkbox-group` (multi-select) field type.
  2. Fail loudly in `vitops emdash check-prerender` or `vitops validate` when a page has a form
     and no delivery address is configured, instead of at the first visitor's submit.
  3. Add `vitops setup turnstile --dry-run`, which prints what it would create and the
     `site.json` change without touching Cloudflare.
  4. Mirror `vitops.form` fields into the `site.templates` form inventory automatically, so the
     generated privacy policy doesn't under-report. AGENTS.md currently asks the author to do
     this by hand.

### 12. Planned navigation links and header actions (gaps L, M)

- **Problem.** `primary` and `footer-sitemap` keep the mockup's planned links (`/pricing`,
  `/industries`, `/cookies`, …), which 404 until those pages exist. The mockup's "Client portal"
  and "Talk to us" header buttons have no place in `<SiteNav>`.
- **Recommendation.** Let menu items carry a `draft` or `hidden` state, so planned links can sit
  in the seed without rendering, and have `check-prerender` warn about links to pages that do not
  exist. Give `<SiteNav>` an `actions` slot, or let one `primary` item be styled as a button, so
  a header can have a call to action.

## Cross-cutting

- **A section backdrop (gap A).** The blueprint grid behind "What we do" is gone. Select options
  are static, so a site cannot register its own. Add a `backdrop` field on `vitops_section`
  whose options come from the site, the way `tones` do. This is the one place the first round of
  findings is still unresolved by design, so decide whether it is in scope.
- **Template instructions (gap N).** `UPGRADE-PROMPT.md` said `vpx emdash seed`. `vpx` is
  `vp dlx`, which fetches the package instead of using the pinned local binary. Use
  `vp exec emdash …` in every prompt and template doc.
- **Release channel.** The site pins four specifiers to `"alpha"`. Publishing a stable `8.3.0` and
  `2.0.0` is what lets sites go back to `"latest"`. A short migration note for sites that
  followed the first-round advice would help, in particular for menu renames and the retired
  `vt_*` type names.
- **Block types that cannot be deleted or renamed.** Unchanged from the first round: a site can
  only retire a type by leaving it in the database. The upgrade rebuilt a disposable local DB, but
  a production site would not be able to. A "retire" operation in EmDash or the toolkit would
  remove the permanent clutter.
- **A second-site test.** The re-rating test is still not run: a second site reusing the toolkit
  with only `site.json` changes and the upstream blocks. Do it before the next version bump; it
  is the most informative thing left, and the first site's block gaps are unlikely to be the same
  as the second site's.

## What not to change

- Keep `vitops.nav` in-content only; the header is `<SiteNav>`. Document the difference in the
  `vitops.nav` block description.
- Keep the Report-Only CSP hash approach and `vitops emdash check-prerender` as they are; both
  worked on the first try.
- Do not add site-specific decorations (the vitops.ca dashboard, compare) upstream. They stay
  local, and the general part of the dashboard is already covered by the `vitops.stats` `tiles`
  variant.

## Expected rating impact

| Change                                             | Criterion affected     | Estimated gain      |
| -------------------------------------------------- | ---------------------- | ------------------- |
| 1–4 (per-item colour, anchors, text logos, badges) | Fast and easy to start | +0.5 to +1          |
| 5, 6 (Tailwind scan, audit hygiene)                | Maintainable           | +0.5                |
| 7, 8 (callout contrast, stats with unit)           | Usable and accessible  | +0.5                |
| 10 (structured footer)                             | Fast and easy to start | +0.25               |
| 11 (form checks, dry-run Turnstile)                | Secure                 | +0.5                |
| Overall                                            |                        | **7.5 → about 8.5** |

These are estimates from one site, not measurements. The second-site test above is how to check
them.
