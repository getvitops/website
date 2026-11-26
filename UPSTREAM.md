# UPSTREAM.md

Open gaps against `@getvitops/*` 9.0.0-alpha.14 (`@getvitops/emdash` 2.0.0-alpha.15, `emdash` 1.6.0), found building
vitops.ca from the Workdrive mockups. For the toolkit maintainers. One site and one author, so "universal" is a
judgement, not a second consumer. Closed items are deleted; git history has them.

Numbers are stable ids (code comments cite them), so gaps in the sequence are expected. Entry format: what we saw,
local workaround, suggested fix. Local rules in `src/site.css` that are upstream candidates say so.

Last round: the toolkit's `UPSTREAM_RESPONSE.md` closed items 5, 7, 9 (section part), 14, 15, 16, 17, 18, 36, 42 and the
carried-over items. Entries marked **Confirmed** below were acknowledged by the toolkit as real gaps.

## Disputed

30. **`colors.tint` is still rejected.** The response says it is accepted as `"tint": { "mix": "8%" }` at the colours
    root. On alpha.5, `vitops validate` still reports `designSystem.themes.default.colors: unknown key "tint"`, and
    `packages/generator/src/schema.ts` at toolkit HEAD has no `tint` key. `vitops docs authoring` still describes it.
    **Local fix:** `.tone { --tone-tint: color-mix(…) }` stays. **Fix:** accept the key, or drop it from the docs.
    Please re-check against a published build, not HEAD. On alpha.14 the generator's `.d.mts` declares
    `colors.tint: { mix }` but `vitops validate` still rejects the key: schema and validator disagree.

- **Tailwind `.rhythm` drift is relevant here.** The response calls it not relevant (css format); this site builds
  with `css: { format: 'tailwind' }`.
- **29 was seen in Chrome**, not only Firefox and Safari. A `@supports not (appearance: base-select)` rule would not
  cover that; recheck in Chrome after the local rule.

## Open

### Layout and blocks

6. **Nested wrappers.** `vitops_section` with a hero or cards in its body renders `section > .centered >
   .section__inner > .section__body > section > …`. **Confirmed.** **Local fix:** `vt_section`. **Fix:** a `flat`
   value on `layout` (no `.centered` or `.section__inner`) and an `inner_class` field.
7. **`vitops_hero` heading accents are one style.** The site needs two (pine for IT, amber for marketing).
   `--accent-color` covers one; two accents in one heading is unsupported. `vt_hero` and `vt_section` stay.
8. **No table, comparison, role-setup diagram or timeline block.** Product decision, not scheduled. Stay site-local.
9. **Link fields.** `vt_dashboard` (`caption_link_href`) is `string`. **Confirmed:** `url` hrefs arrive at the next
   `vitops_section` version. `vt_dashboard` moves to `url` at its next breaking version.
10. **No label-and-tags list.** Product decision, not scheduled. **Fix if taken:** `vitops_taglist` (label plus tags).
11. **No key/value comparison panel.** **Confirmed.** **Fix:** per-row tone and a panels variant on `vitops_entries`.
12. **No flow diagram.** Product decision, not scheduled. **Fix if taken:** a `flow` block of `from`, `to`, `tag`.

### Patterns and CSS

32. **`.section__body` track is `auto`.** Alpha.13 added `min-inline-size: 0` and `minmax(0, 1fr)` to `.subgrid`
    and `.pricing-grid`, but `.section__body` is still `display: grid` with no column template. **Local fix:**
    `grid-template-columns: minmax(0, 1fr)`. **Fix:** the same in `section.css`.
33. **`.sitefooter__inner.centered` has a 1rem column gap** (alpha.14). `.sitefooter__inner { gap: 1rem }` is not
    reset by `.centered`'s `row-gap`-only rule, so the gap lands between the zero-width named tracks and pushes the
    footer 80px past the page track (390px viewport scrolls to 454px). **Local fix:** `column-gap: 0`. **Fix:** set
    `column-gap: 0` on `.sitefooter__inner.centered`.
34. **`vitops_form` has no card look and no radio field.** **Confirmed.** **Local fix:** padding and border on
    `.form-block.tone`; the select stays. **Fix:** a `radio` field kind rendered as `.tag` options, plus card
    padding for a themed form.

### Tooling

`vitops emdash` help and completion lack `form-template`, `schema` and `db`. `skills experimental_sync` was dropped
from `prepare`; existing skill links survived, a fresh clone is untested. `vpr typecheck` needs `@astrojs/check`, which
is not a dependency.

Alpha.14 round: items 7b, 8, 29, 31, 33, 34, 37, 38, 43, 44, 45, 46 are met upstream and their local rules are
deleted (the footer keeps design-only rules; `a.btn` weight now comes from `patterns.items.btn` in `vitops.json`).
Not yet checked here: `vitops_band` + `<VitopsContent>` against `vt_section`.

## Local block registry

All site-local blocks are `local (watch)`: retire each when its upstream shape ships.

| Local block    | What it is                                         | Verdict                       | Upstream shape                                                                                                                     |
| -------------- | -------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `vt_section`   | Flat section / page opener (item 6)                | **Keep until `layout: flat`** | `flat` layout value and `inner_class` on `vitops_section`                                                                          |
| `vt_hero`      | Hero with two option cards, pine and amber accents | **Keep**                      | two-colour accents and a cards slot (item 9)                                                                                       |
| `vt_pillars`   | "Two services. One team." panels                   | **Retired**                   | now an adapter over `vitops_cards` `variant: panel`; home page seed uses `vt_section` + cards. Delete once no live content uses it |
| `vt_compare`   | Two companies versus one connected funnel          | **Site-specific**             | this site's argument; revisit only if a second site needs A-vs-B                                                                   |
| `vt_dashboard` | Sample dashboard with sample data in code          | **Site-specific**             | the product's portal mock; generic kernel is `vitops_stats` tiles                                                                  |
| `vt_estimate`  | Cost estimator (`src/components/blocks/Estimate`)  | **Not yet rated**             | uncommitted work; set a verdict before it ships                                                                                    |
