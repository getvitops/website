# UPSTREAM.md

Open gaps against `@getvitops/*` 9.0.0-alpha.15 (`@getvitops/emdash` 2.0.0-alpha.16, `emdash` 1.6.0), found building
vitops.ca from the Workdrive mockups. For the toolkit maintainers. One site and one author, so "universal" is a
judgement, not a second consumer. Closed items are deleted; git history has them.

Numbers are stable ids (code comments cite them), so gaps in the sequence are expected. Entry format: what we saw,
local workaround, suggested fix. Local rules in `src/site.css` that are upstream candidates say so.

Alpha.15 round (2026-11-27): the disputed items are met. `colors.tint` is accepted (item 30; `vitops.json` sets
`tint: { mix: "8%" }` and the local `.tone` rule is gone), the tailwind `.rhythm` gap now includes `.form-block`,
`.callout` and `.logos-block`, and items 32 and 33 (`.section__body` track, footer column gap) are fixed (their
local rules are deleted; 390px viewport has no sideways scroll on `/`). Entries marked **Confirmed** below were
acknowledged by the toolkit as real gaps.

## Open

### Layout and blocks

6. **Nested wrappers.** `vitops_section` with a hero or cards in its body renders `section > .centered >
   .section__inner > .section__body > section > …`. **Confirmed.** **Local fix:** `vt_section` (retired 2026-11-26: all 210 uses migrated to `vitops_section` with `stack: rhythm`; the extra wrappers are accepted). **Fix:** a `flat`
   value on `layout` (no `.centered` or `.section__inner`) and an `inner_class` field.
7. **`vitops_hero` heading accents are one style.** The site needs two (pine for IT, amber for marketing).
   `--accent-color` covers one; two accents in one heading is unsupported. `vt_hero` stays.
8. **No table, comparison, role-setup diagram or timeline block.** Product decision, not scheduled. Stay site-local.
9. **Link fields.** `vt_dashboard` (`caption_link_href`) is `string`. **Confirmed:** `url` hrefs arrive at the next
   `vitops_section` version. `vt_dashboard` moves to `url` at its next breaking version.
10. **No label-and-tags list.** Product decision, not scheduled. **Fix if taken:** `vitops_taglist` (label plus tags).
11. **No key/value comparison panel.** **Confirmed.** **Fix:** per-row tone and a panels variant on `vitops_entries`.
12. **No flow diagram.** Product decision, not scheduled. **Fix if taken:** a `flow` block of `from`, `to`, `tag`.

### Patterns and CSS

34. **`vitops_form` has no card look and no radio field.** **Confirmed.** Alpha.15 gives `.form-block` a card look,
    but only under `.tone--tint` or `.tone--solid`; our forms use `tone: neutral`, which paints neither, so the
    computed padding is still 0. **Local fix:** padding and border on `.form-block.tone` (site.css 35); the select stays. **Fix:** a `radio` field kind rendered as `.tag` options, plus card
    padding for a themed form.

### Tooling

`vitops emdash` help and completion lack `form-template`, `schema` and `db`. `skills experimental_sync` was dropped
from `prepare`; existing skill links survived, a fresh clone is untested.

Alpha.14 round: items 7b, 8, 29, 31, 33, 34, 37, 38, 43, 44, 45, 46 are met upstream and their local rules are
deleted (the footer keeps design-only rules; `a.btn` weight now comes from `patterns.items.btn` in `vitops.json`).
Not yet checked here: `vitops_band` + `<VitopsContent>` as a replacement for stacked sections.

### Motion (2026-11-26)

Item 47 is closed: alpha.15 emits `fade-slide-journey` in the Tailwind format. Content still uses
`fade-in slide-up animate-view` (174 seed uses, listed in `src/motion-classes.ts`); journeys animate over the whole
scroll range rather than the entry window, so switching is a visual change, not done here.

48. **Staggered cards need item classes.** `.stagger > *` only sets `--_stagger-index`; the children still need
    `fade-in slide-up animate-view`, and `vitops_cards`, `vitops_stats` and `vitops_steps` put no class on their items.
    **Fix:** an `animation` select (`none | fade | stagger`) on those blocks that adds the classes to the items.

## Local block registry

All site-local blocks are `local (watch)`: retire each when its upstream shape ships.

| Local block    | What it is                                         | Verdict           | Upstream shape                                                                                       |
| -------------- | -------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------- |
| `vt_hero`      | Hero with two option cards, pine and amber accents | **Keep**          | two-colour accents and a cards slot (item 9)                                                         |
| `vt_pillars`   | "Two services. One team." panels                   | **Deleted**       | renderer, block type and CSS removed; home uses `vt_section` + `vitops_cards`                        |
| `vt_compare`   | Two companies versus one connected funnel          | **Site-specific** | this site's argument; revisit only if a second site needs A-vs-B                                     |
| `vt_dashboard` | Sample dashboard with sample data in code          | **Site-specific** | the product's portal mock; generic kernel is `vitops_stats` tiles                                    |
| `vt_estimate`  | Cost estimator (`src/components/blocks/Estimate`)  | **Site-specific** | this site's pricing logic; `Range`/`Stepper`/`Format` not yet adopted (see `vitops docs components`) |
