# UPSTREAM.md

What is still open against `@getvitops/*` (8.3.0-alpha.5, `@getvitops/emdash` 2.0.0-alpha.5,
`emdash` 1.4.0), found while building vitops.ca from the Workdrive mockups. Written for the toolkit
maintainers. One site and one author, so "universal" is a judgement, not a second consumer.

**Guiding principle.** Pages are composed from blocks so editors can rearrange them. Where the toolkit
pushed this site into local code (`src/components/blocks/*`, `src/site.css`), that is logged here as a gap,
not as the recommended answer. Each local rule in `site.css` that is an upstream candidate says so.

Entry format: what we saw, why, the local workaround, the suggested fix.

**Rating.** Last rated 7.5 / 10 on alpha.1, with 8 as the target. alpha.2 and alpha.3 closed the items that
held it back (below). Not re-rated this round. The two things that would move it most are items 1 and 2.

## Open items, ranked

**alpha.4 and alpha.5 closed items 1 to 4, 6, 8 to 13, 15, 17 to 19, 21 and 25 to 26** (see "Resolved"). The
entries below are kept for the history; the new open ones are 30 and 31 and are listed first.

### New in alpha.5

30. **`colors.tint` is documented but rejected.** `vitops docs authoring` describes `colors.tint: { mix: "8%" }`,
    but `vitops validate` reports `designSystem.themes.default.colors: unknown key "tint"`. **Local fix:** the
    `.tone { --tone-tint: color-mix(…) }` rule in `src/site.css`. **Fix:** accept the key in the config schema, or
    drop it from the docs.
31. **`<Masthead width="content">` is not on the page track.** `.masthead__row { display: block }` has the same
    specificity as `.centered { display: grid }` and wins, so the row has no tracks and the brand sits on the
    viewport edge. Even with `display: grid`, the `.navbar` lands in the measure track while blocks use the
    spotlight track. **Local fix:** `.masthead__row.centered { display: grid }` and
    `> .navbar { grid-column: spotlight }` in `src/site.css`. **Fix:** make the row a grid in the pattern and
    place `.navbar` in `spotlight`.

### Priority 1: patterns that blocks emit but the generated CSS does not have

1. **`.cta` has no CSS.** The docs call `cta` "filled, with role variants", and `vitops_hero`,
   `vitops_cards` (panel) and `vitops_callout` all emit `<a class="cta">`, but the scaffold's
   `patterns.items` only defines `button`, `card`, `badge` and `tag`, so the generator never emits `.cta`.
   Every CTA renders as plain text. **Local fix:** a `cta` item in `site.json` (base from `button`, fill from
   `--tone-solid` so a CTA in a toned callout takes the callout's colour). **Fix:** ship `cta` in the template,
   or have the generator emit the patterns the blocks reference.
2. **`.accordion` has no CSS either.** `vitops_accordion` renders bare `<details>` under `.accordion`, so a
   FAQ reads as plain lines. **Local fix:** a small `.accordion` block in `site.css`.
3. **`ui-accent` role is not in the scaffold**, so `<em class="accent">` (heading accents) has no colour:
   `.accent` reads `--color-text-ui-accent`. **Local fix:** `"ui-accent": "pine"` in `colors.roles`. **Fix:**
   add it to the template, or document it next to `*stars*`.
4. **The tone tint comes from the `muted` step.** `resolveTone()` writes `--tone-bg` from
   `--color-bg-<role>-muted`, which is brown for amber on a dark page. The mockups use the role's solid at about
   8% alpha over the page. A class cannot override it (inline wins), but `.tone` consumes it through `--_bg`.
   **Local fix:** `.tone:not(.tone--solid) { --_bg: color-mix(… var(--tone-solid) 8%, transparent) }`.
   **Fix:** derive the tint from the solid, or add a `tint: "solid"` option to a role. Related: `.tone` is
   applied to blocks that are not surfaces (`vitops_form`, `vitops_steps`, `vitops_stats` always carry it), so
   any tint on `.tone` paints them as a padding-less, borderless band. Only surfaces (`.callout`, `.card`, a
   themed `.section`) should read the tint; the others should use `.tone` for colour variables only.
5. **Brand fills.** `roles.<r>.solid` and `foreground` now work (resolved from the first round), but
   `solid: 400` for pine fails the APCA contract by 0.5 (Lc 59.5 against 60) with dark text, so the mockup's pine
   (`#81b9a1`) has to be step 300. A way to acknowledge a near miss on a role, as `acknowledgeOffLadder` does
   for palette hues, would help.

### Priority 2: layout and spacing

6. **Nested wrappers.** `vitops_section` with `vitops_hero` or `vitops_cards` in its body renders
   `section > .centered > .section__inner > .section__body > section > .centered > .rhythm`. A page opener or a
   titled card row needs `section.region > .centered > .rhythm.spotlight`. **Local fix:** `vt_section`
   (`src/components/blocks/Section.astro`): eyebrow, heading with `*accent*` runs, lead, two CTAs, a body, width,
   theme, anchor, class, custom properties. Level 1 is the page opener, so there is no separate hero block.
   **Fix:** a flat variant of `vitops_section` (lead, CTAs, level 1) and retire the hero wrapper.
7. **`vitops_actionLink` has a bare `<a>` as its root.** In a `.rhythm` stack, an inline element ignores
   `margin-top`, so a link block sits flush under the paragraph above it. `.btn` (inline-flex) is unaffected.
   **Local fix:** `.rhythm > a.link { display: block; inline-size: fit-content }`. **Fix:** wrap the block in
   `<p>` (as the hero's `.cluster` does). Making every `a` inline-block is not the answer; it breaks prose links.
8. **Block spacing in `.rhythm`.** The stack is tuned for prose (heading to paragraph 0.4 rlh, paragraph to
   paragraph 0.9 rlh), so a card row, stats list or form under a lead sits flush. `vitops_cards` renders
   `<wc-cards><ul class="subgrid">`, so a rule on `.subgrid` never matches. The mockups use about 56px between a
   lead and its grid. **Local fix:** `.rhythm > :where(wc-cards, ul, ol, div, details, form, table, figure)` gets
   `--rhythm-block` (2 rlh). **Fix:** a `--rhythm-block` token, and a `rhythm` rule for block-level children. Also: in the default
   (non-split) layout `vitops_section` puts no gap between `.section__head` and `.section__body`, since only
   `--split` makes `.section__inner` a grid with a gap. The renderer cannot take extra classes on the inner
   element, so the local fix is a `.section__head + .section__body` rule; `rhythm` on `.section__inner` would do it.
   The local stack rules are scoped to `vt_section` (`rhythm-section`) because a form's own `.rhythm` must keep its
   tight field spacing.

   **Planned upstream change (owner: user):** `vitops_section` gains a way to put extra classes on the inner
   element (`.section__inner`), and/or a `rhythm` checkbox that adds `rhythm` to it. Once it ships and the site
   moves to that version: set it on the default (non-split) sections, drop the `.section__head + .section__body`
   rule and the `--section-body-gap` override from `src/site.css`, and migrate `/`, `/managed-it` and
   `/digital-marketing` (their sections are almost all plain stacks) so `vt_section` is only kept if it still adds
   something (lead, CTAs and level 1 in one flat block, item 6). The one `split` section on the home page stays on
   `vitops_section` either way.

9. **Opt-in second stack, `rhythm-flex`.** A flex column version of `.rhythm` (flex items are blockified, so
   margins apply to any child). Added locally as an escape hatch when the margin stack fails, applied only through
   a section's class field. Trial: on `/backup-security` the bare link, the steps and the paragraphs space
   correctly with it, and the margin approach with the link rule gives the same result on `/licences-cost-control`,
   so it is kept as an option, not a default. Earlier flex/grid-gap attempts had problems; this one uses no `gap`.
10. **Region spacing.** The default `clamp(3rem, 8vh, 8rem)` is cramped against the mockups' 112px. Set locally
    with `layout.regionSpace` (now a token, so this is a config note, not a gap).

### Priority 2: steps

11. **Steps markers are invisible with no tone.** The marker is `background: var(--tone-solid, currentColor)` with
    `Canvas` text, so a steps block with no tone shows black discs and no number. **Local fix:** outlined disc in
    the tone, as in the mockups, plus `tone` set in the seed.
12. **Row steps misalign.** Items stretch to the row height and their auto grid rows stretch with them, so markers
    in shorter columns sit lower. Also `.rhythm li + li` adds a top margin to every step after the first. **Local
    fix:** `align-content: start` and `margin-block-start: 0` on `.steps__item`.
13. **Two modifiers the mockups need, CSS only** (`src/site.css`, "Steps"): `steps--cards` (each step in a card,
    connector in the gap at marker height) and `steps--animated` (the connector draws and the marker fills as each
    step scrolls in: one `view()` timeline per item drives a registered `--steps-p`, with a `@supports` guard,
    reduced motion respected, static fallback). A web component adds nothing here, since the toolkit already
    ships scroll-driven CSS (`reveal`, `scroll-based`). Both drop into `patterns/steps.css`. Applied through the
    block's `className` field, so no new block. The title size hook (`--steps-title-size`) works, and the old
    local `.steps__title` rule is gone.

### Priority 3: blocks and content

14. **Form template friction, and the silent exit.** A `site.templates` entry has to be generated with
    `formTemplateFromBlock()`; hand-written entries (`type: "checkboxes"`) fail with only "Invalid input", and the
    dev server then dies without printing why, so `vpr prepare-local-db` waits out a five-minute timeout. This cost
    several runs: run `astro dev --ignore-lock` by hand to see the error. A colour-contract failure behaves the same
    way. **Fix:** a CLI command that writes the template into `site.json`, a readable error with the config path,
    and `prepare-db` failing fast on a dead dev server.
15. **`vitops_logos`** shows the name as text, but has no kicker, closing note or link, so `vt_logos` stays local.
16. **`vitops_hero` heading accents are one style.** The site needs two (pine for IT, amber for marketing). Now
    covered by `style` on `vt_section` (`--accent-color`), so only the hero is affected.
17. **`SiteFooter` has no brand or blurb column or slot.** The local footer reads `footer-sitemap` and
    `footer-legal` through `menuItems()`, which drops `draft` items.
18. **`vitops_stats` animates non-numeric figures** ("1 in 6" counts down from zero). Needs `animate: false`, or the
    counter should skip a value it cannot parse.
19. **Panel cards cannot be toned per card.** `tone` is block-level, and a per-card `color` only sets custom
    properties, so a "without us / with us" pair cannot have one tinted card. Needs a class per row.
20. **No table or comparison block, no role-setup diagram, no timeline.** The licence tracker, the ads
    comparison and the joining-and-leaving diagram became checklists in panel cards.
21. **Pricing:** no per-plan note line or yearly price. The period text carries it ("/month, $34 paid yearly").
22. **Link fields.** `vt_logos` (`link_href`) and `vt_dashboard` (`caption_link_href`) are `string`; EmDash's `url`
    type accepts site-relative paths, so they move to `url` at their next breaking version.

### Priority 3: tooling

23. **`check-prerender` warns about `dist/client/vitops/design-system-editor.html`** (0 h1), a toolkit asset. It
    should be skipped.
24. **`skills experimental_sync`** creates a duplicate `pnpm-@getvitops+skills-*` link per skill, and removed the
    `vitops-design-system` links once. The duplicates are gitignored here; watch the next `vpr prepare`.
25. **Sitemap lists `/pages/<slug>`** while the site serves `/<slug>`, so the submitted sitemap would point at
    dead URLs. Needs checking against a deployed build.
26. **`vp update` rewrites unrelated ranges** (astro, wrangler, tailwind, `devEngines.runtime.version` pinned to an
    exact Node) along with the `alpha` specifiers.
27. **`emdash types` does not type `blocks` fields** (`unknown[]`), so each renderer declares its own value type.
28. **Block types cannot be renamed or deleted.** A wrong name (`vt_chips`, retired in favour of `badges`) costs a
    new type and a permanent retired type. Check pattern names before naming.
29. **Duplicate chevron on `<select>`.** In `vitops_form`, a select field (the contact form's "I'm interested in")
    renders its own text arrow inside the control ("Choose one ▼", a narrow box) plus a second chevron at the far
    right edge of the full-width field. Seen in Chrome on `/contact`. Looks like the select pattern's custom arrow
    and the native or `appearance`-based one both showing, and the control not filling its row. No local workaround
    yet. Fix: one arrow, and a full-width control like the text inputs.

### Carried over, not re-checked this round

First-round findings that no later round addressed or verified: 9 and 10 (`organization.address` needs
`streetAddress`, no `organization.description`; `favicon.themeColor`/`backgroundColor` hard-coded and not
following palette changes), 12 (`Astro.rewrite('/404')` to a prerendered 404 returns 500), 13 (the icon sprite
is not served in dev; copy to `public/vitops/icons.svg`), 14 (`lint:design` accepts a class that has no rule in
the selected format) and the small items (scaffold `package.json` name, placeholder `cloudflareEmail` domain).
Re-check each on the next upgrade.

## Local block registry

All site-local blocks are `local (watch)`: retire them when the upstream shape ships.

| Local block    | What it is                                         | Verdict                 | Upstream shape                                                                        |
| -------------- | -------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------- |
| `vt_section`   | Flat section / page opener (item 6)                | **Upstream, new**       | flat variant of `vitops_section`: lead, CTAs, level 1, flat body                      |
| `vt_hero`      | Hero with two option cards, pine and amber accents | **Upstream, extension** | two-colour heading accents and a cards slot on `vitops_hero` (items 6 and 16)         |
| `vt_pillars`   | "Two services. One team." panels                   | **Upstream, extension** | per-card tone on `vitops_cards` `panel` (item 19)                                     |
| `vt_logos`     | Partner names with kicker, note and link           | **Retired** (alpha.4)   | replaced by `vitops_logos` with `kicker`, `note` and `linkLabel`/`linkHref`           |
| `vt_compare`   | Two companies versus one connected funnel          | **Site-specific**       | this site's argument, copy and figures; revisit only if a second site needs an A-vs-B |
| `vt_dashboard` | Sample dashboard with sample data in code          | **Site-specific**       | the product's portal mock; its generic kernel is `vitops_stats` tiles                 |

Conventions that held across the blocks: `tone` plus an optional `color` on anything that colours; repeater
sub-fields are scalar-only (a checklist is one newline-separated `text` field); code-owned widgets expose only a
caption. The home page's other nine local blocks all moved to upstream blocks.

## What worked well

- `vitops_*` blocks resolve inside a block type's `portableText` field, which is what makes "a section with cards
  in it" possible without a new type.
- `emdash export-seed` and `emdash seed --validate` round-trip a hand-built database into a valid seed.
- `centered`, `region`, `rhythm`, `subgrid` and `cluster` covered nearly all layout; `lint:design` caught real
  mistakes. `site.json` as the single source of truth re-themed the site from mockups with little hand-written CSS.
- The skills (`contact-form`, `content-and-deploys`, `csp`, `custom-blocks`, `vitops-design-system`) took
  `AGENTS.md` from 372 lines to about 80, and `vitops emdash build` with `check-prerender` caught dead links, a
  missing form recipient and h1 counts.

## Resolved (one line each)

- **alpha.4 and alpha.5:** `cta`, `link`, `details` and `steps` patterns and the `ui-accent` role ship in the
  scaffold; `.accordion` styled; tone paints only on surfaces (`tone--tint`/`tone--solid`); `vitops_section` is the
  page opener (CTAs, accent, `stack: rhythm`) and `.rhythm` spaces blocks; steps markers, `steps--cards` and
  `steps--animated`; `<wc-counter>` leaves non-numeric figures alone; `vitops_logos` kicker, note and link;
  pricing `yearly` and `note`; `<SiteFooter>` `brand` slot; `check-prerender` sitemap warning; dark-only works
  from `defaultColorScheme: "dark"` alone (no `data-theme` in the layout); the header is `<Masthead>` from
  `site.chrome`; skills are named by scope and `vitops agents sync` writes the AGENTS.md block; agents view pages
  with `playwright-cli`.

- **First round:** dark-only mode (`defaultColorScheme`); per-role `solid` and `foreground`; shadows with spread
  and inset (`box`/`drop`); `acknowledgeOffLadder` for off-ladder palette hues; type role key `text-transform`
  documented; a recipe for marketing heading sizes; `layout.widths` and `regionSpace` tokens; `site.fonts` turns
  webfonts on; `vitops docs` runs without `--input`; the `button` pattern carries to other tags with `.btn`;
  `vitops_cards` titles are real headings with a level; `<SiteNav>` header; block colour fields take roles;
  `badge` and `tag` in the scaffold; the `vp`-first command table and the custom-block rule ship as skills;
  `vitops_stats` uses the framework `Counter`.
- **alpha.1:** section and form anchors and `--header-offset`; Tailwind scans package renderers (`@source`);
  `vitops audit` cleanup and page list; `vitops_badges`; `caption` and `footnote` type roles; widget areas.
- **alpha.2 and alpha.3:** the circular import that emptied the plugin block map in the static build; `check-prerender`
  warns on a missing form recipient, template fields, dead links and h1 count; `vitops_hero` `h1`/`p` levels,
  eyebrow and per-card tone and CTA; per-item `tone`/`color`; `vitops_logos` text fallback; `draft` menu items;
  `vitops emdash build` runs `check-prerender`; every block type is `vitops_<name>` (the dotted names were the
  breaking rename, migrated here).
