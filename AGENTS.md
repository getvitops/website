This is an EmDash CMS website (Astro SSR on Cloudflare Workers, D1 + R2)
styled by the Vitops design system.

## Ground rules

- **The toolchain is Vite+: use `vp`, never `pnpm`, `npm` or `npx`.**
  `vp install` / `vp add <pkg>` / `vp update` (`-L` for latest); package scripts
  through `vpr <script>` (`vpr dev`, `vpr build`, `vpr typecheck`,
  `vpr lint:design`) — not `vp dev` / `vp build`, which run Vite directly and
  bypass Astro; local binaries through `vp exec <bin>` (`vp exec vitops …`,
  `vp exec emdash …` — a bare `vitops …` or `emdash …` in this file means that);
  one-off packages through `vp dlx <pkg>`; format + lint with `vp check [--fix]`
  (the pre-commit hook runs `vp staged`); package-manager passthroughs with
  `vp pm <cmd>` (`vp pm publish`, `vp pm version`). Run `vp` inside the project
  and it uses the project-local `vite-plus`.
- `site.json` is the single source of truth — organization + site facts, and
  the design system (colors, type, spacing, patterns, animations) under
  `designSystem.themes.default`. Never edit `src/styles/tailwind.css` — it is
  generated from `site.json` by the `vitops()` integration on every dev/build
  and is gitignored. (There is no separate `design-system.json`: a scaffolded
  config can't merely reference a sibling file, so the token set lives inside
  `site.json` — see `AGENTS.md`'s "Client onboarding" section in the toolchain
  repo for why.)
- `src/assets/placeholder/` holds neutral wireframe stand-ins (square,
  portrait, landscape; SVG + PNG) for layout work before real imagery
  exists. Delete the directory once real assets land — it's separate from
  `src/assets/logo.svg`, the actual brand asset.
- Content lives in the EmDash database, not in the repo. Query it with
  `getEmDashCollection` / `getEmDashEntry` from `emdash`; render Portable Text
  with `<PortableText />` from `emdash/ui` (the Vitops blocks from
  `@getvitops/emdash` are merged in automatically).
- **Building pages from patterns:** the editor's insert menu offers the `vitops.*` blocks —
  link/button, image compare, copy snippet, banner, disclosure, accordion, hero, carousel, gallery,
  cards, marquee (`vp exec vitops docs blocks` lists them with every field). Repeating content (cards, gallery images, accordion items, carousel slides) is
  a repeater field. A block cannot contain other blocks, and a `vitops.*` block inside EmDash's
  built-in `columns` does not render — for layout (a section, a split, a hero) use a `blocks`
  field, or hand-write the page template with `@getvitops/astro` components
  (`Subgrid`, `Cards`, `Carousel`, …). `vp exec vitops docs components` lists every pattern, which
  tiers provide it, and which block renders it. Override a block's rendering per site with
  `<PortableText components={{ type: { 'vitops.cards': MyCards } }} />`; hide one with
  `vitopsEmdash({ blocks: { exclude: [...] } })` in `astro.config.mjs`.
- **Custom blocks: compose first, then extend, then go site-local, and decide
  upstream-or-local _before_ creating the type** (block types can be retired but
  never deleted). The procedure, the upstream test and the field/naming
  conventions are in `.agents/skills/custom-blocks/SKILL.md`; every site-local
  `vt_*` block is registered, with its verdict and status, in `UPSTREAM.md`.
  Vocabulary: **badge** = a static label, **tag** = a static or dynamic
  (selectable, dismissable, editable) label — never "chip" or "pill".
- `seed/seed.json` only applies against an empty database: structure
  (collections, menus, settings) on first boot; the `content` entries only
  when the setup wizard's "include sample content" option is chosen. Changing
  the seed does not migrate an existing site — use the admin
  (`/_emdash/admin`) or the site's MCP server (`/_emdash/api/mcp`) to change
  the content model of a running site.
- Prefer framework CSS classes (utilities, patterns, type roles like
  `font-heading`) over bespoke CSS. Run `vp exec vitops agents` to append the
  full generated class-vocabulary reference to this file.
- **Layout foundations — these are the answer, not a starting point.** Six
  substitutions carry the structure of nearly every page:

  | About to write…                                         | Write instead   |
  | ------------------------------------------------------- | --------------- |
  | a `wrap`/`wrapper`/`container`/`inner` class            | **`centered`**  |
  | `max-width` + `margin-inline: auto`                     | **`centered`**  |
  | `padding-block` on a section                            | **`region`**    |
  | margins between headings/paragraphs/lists               | **`rhythm`**    |
  | `display: grid` + `grid-template-columns: repeat(n, …)` | **`subgrid`**   |
  | `repeat(auto-fit, minmax(…))`                           | **`grid-auto`** |
  | `display: flex` + `gap` for a row of controls           | **`cluster`**   |

  `centered` is a grid of _named tracks_, not a max-width box — a child widens
  itself with `breakout`/`spotlight`/`fullbleed` without the parent knowing, which
  is the thing a bespoke `.wrap` can never do. **More than one card means
  `subgrid`**: a plain grid aligns the outer boxes but not the tranches inside
  them, so headings and CTAs land at different heights across the set. Write
  `<ul class="subgrid subgrid-cols-3" role="list">` with
  `<li class="card subgrid-card">` items, or `<Subgrid />` (which renders the slot
  verbatim — author the `<li>`s yourself; it adds `role="list"` for you, and a
  hand-written one needs it because a marker-less `<ul>` stops being announced as a
  list in Safari).

  **When the whole card is a link the card is still the item**, and pick by whether
  the card's text must stay selectable: `stretched-link` on a link inside it is
  zero-JS but kills text selection, while `<Cards>` (which wraps the list in
  `<wc-cards>`) keeps selection and falls back to that same link with no JS. Never
  both — the overlay wins and the JS never runs. Never `<li><a class="card">`: the
  `li` is the grid item, so the anchor's tranches never align and it does not fill
  the cell; it renders fine, which is why it keeps getting written.

  `npm run lint:design` reports all of these, and the pre-commit hook fails on them
  — the fix is the class, not a justification for the CSS.

- **Prerender by default.** `output: 'server'` is required (the admin, media/API
  routes, preview and scheduled publishing need a server), so prerendering is
  opt-in per route: put `export const prerender = true` on every page that
  doesn't need per-request data, and give dynamic routes a `getStaticPaths()`
  that queries the collection at build time. A route with no `prerender` export
  is re-rendered for every visitor on every request. The cost is that a
  prerendered page reflects the database as of the last build, so an admin
  publish needs a redeploy — leave a route server-rendered only where that is
  unacceptable (preview, personalised content, must-be-live-in-seconds).
- The Worker cron trigger in `wrangler.jsonc` drives scheduled publishing —
  don't remove it.
- Hosting (adapter + EmDash database/storage) comes from `vitopsHosting()`
  (`@getvitops/emdash`) in astro.config.mjs — never hard-code an adapter or
  d1/r2/sqlite there. Switch targets via `vitopsHosting({ target })` or the
  `HOSTING` env var (see README "Hosting"); the `node` target needs
  `@astrojs/node` + `better-sqlite3` installed first.
- **`SETUP.html` is the client-onboarding checklist.** When working it via the
  `.agents/skills/setup/` skill, tick a box only for a step you actually
  completed — never on the operator's behalf for a step marked human-only
  (the Cloudflare API token, the domain cutover, publishing legal documents).

## Branch model

- Work on **`dev`** (the integration branch). Every push auto-deploys the
  isolated `-dev` worker (own D1/R2; `dev.<domain>` with a custom domain).
- **`main`** is production and branch-protected — never push or merge to it
  directly. Production ships only via the manual **promote** flow: the
  `promote` skill (`.agents/skills/promote/SKILL.md`) dispatches
  `.github/workflows/promote.yml`, which opens a `dev → main` PR with
  auto-merge; merging deploys prod. Only run it when the user explicitly asks
  to promote/ship to production.
- Sample legal pages (`/terms`, `/privacy`) ship as seeded placeholder content
  — remind the user to replace them before launch. They are deliberately short
  and obviously unfinished; do not "improve" them into something that reads as
  a finished policy, because the risk here is a plausible-looking document
  getting shipped unread.
  To replace them properly, fill in `site.json`'s `organization`/`site.legal`
  fields and run `vp exec vitops legal --format portable-text --out ./legal`, then
  paste each document's blocks into the page in the admin. That renders a real
  policy from what the site actually does — the analytics provider it uses,
  the fields its forms collect, where it deploys — rather than from guesses.
  It still needs review before launch.

## EmDash 1.x behaviours worth knowing

- **Passkeys are bound to the hostname they were created on.** After the
  workers.dev → custom-domain cutover, use **Settings → General → Change
  domain**, then **Continue on** to add a passkey at the new address.
- **HTML blocks created in the admin run JavaScript** in a sandboxed iframe
  (Contributor and up can add it). Astro's `security.csp` blocks their styles
  and scripts, so don't turn CSP on without allowing for that.
- **Link entries by `entry.data.slug`, never `entry.id`** — on multilingual
  sites `id` carries a locale prefix.
- **Submit `/sitemap.xml`** to search engines, not a per-collection sitemap;
  collection sitemaps now split into pages of 2,000 entries.
- **A stuck D1 migration lock** is cleared with
  `vp exec emdash migrate --take-over-lock <id>` (confirms the target, or
  needs `--expected-target-fingerprint` non-interactively).

## Docs MCP servers

`.mcp.json` preconfigures the Astro docs and EmDash docs MCP servers — prefer
searching them over pre-trained knowledge for Astro/EmDash questions.

## EmDash agent skills

The EmDash skills (`building-emdash-site`, `creating-plugins`, `emdash-cli`,
`upgrading-emdash` and the two WordPress porting skills) are installed per
project, not globally, so they match the `emdash` version this repo pins. If
`.agents/skills/building-emdash-site/` is missing, install them (the setup guide
and `SETUP.html` have the full step):

```bash
vp dlx skills add emdash-cms/skills --skill '*' -y
```

Refresh them with `vp dlx skills update` after bumping `emdash` — the
`upgrading-emdash` skill covers the rest of the upgrade.

## Commands

All through `vp` / `vpr` (see the toolchain rule above).

- `vpr dev` — local dev with local D1/R2 emulation (no Cloudflare account).
  `astro dev` daemonises, so this returns at once; stop it with
  `vp exec astro dev stop`
- `vpr typecheck` — `astro check`
- `vpr build:css` — regenerate `src/styles/tailwind.css` from `site.json`
- `vpr lint:design` — design-system drift check (also run by the pre-commit hook)
- `vp check` / `vp check --fix` — format + lint
- `vpr build` — production build
- `vpr deploy` — build + `wrangler deploy` prod (provisions D1/R2 on first run)
- `vpr deploy:dev` — build + deploy the isolated dev worker (needs `DEV_D1_ID`)
- `vpr init:github` — one-time: create + push the GitHub repo (main + dev,
  dev default). Only run when the user asks to set up GitHub.
- `vpr init:hosting` — one-time: provision the hosting platform (dev
  D1/R2 + repo secrets on cloudflare). Only run when the user asks for it.
- `vp exec vitops validate site.json` — schema-check the site config
- `vp exec emdash export-seed -d <sqlite> --with-content=pages` — regenerate
  `seed/seed.json` from the local database; check it with
  `vp exec emdash seed --validate`

<!-- vitops:start -->

## Vitops design system

Styled with the Vitops design system (`@getvitops/*`); tokens live in `site.json`.
Generate output with the CLI:

- `vitops generate --input site.json --format tailwind --out src/styles` — Tailwind v4 / Astro
- `vitops generate --input site.json --format css --out dist` — standalone CSS
- `vitops generate --input site.json --format bricks --out <theme>/dist` — WordPress / Bricks
- `vitops generate --input site.json --format design --out .` — `DESIGN.md`, the agent-facing brief
- `vitops init` · `vitops validate --input site.json` · `vitops favicon`

Prefer the framework’s utility + component classes over hand-written CSS.
Full design-system context lives in the `vitops-design-system` skill (linked from
`.agents/skills/` and `.claude/skills/` into the installed `@getvitops/cli`;
re-link with `vitops agents` if the links are deleted — they survive version
bumps). Reference docs print live, from this project’s config, via:

- `vitops docs classes` — CSS framework class vocabulary (colour, type, space, layout, animation, patterns)
- `vitops docs authoring` — every design-system.json field, rendered from the JSON Schema
- `vitops docs config` — every field of the three-section config (designSystem / organization / site), rendered from the JSON Schema
- `vitops docs formats` — tailwind vs css vs bricks: what's emitted vs what the platform provides
- `vitops docs color` — seeded OKLCH scales, functional tokens, automatic dark mode
- `vitops docs scales` — fluid modular type & space scales
- `vitops docs icons` — semantic icon names across sets, bundle derivation, sprite delivery
- `vitops docs patterns` — pattern CSS: token cascade, override hooks, states, role variants
- `vitops docs components` — which of the four tiers provides each pattern, and the call to make
- `vitops docs consent` — the consent gate: inert gated tags, demand-driven prompting, three-valued choices
- `vitops docs tracking` — ad-click attribution, the `_ac` cookie, conversion notifications
- `vitops docs search` — what search engines accept, Search Console onboarding, deploy notification
- `vitops docs legal` — privacy policy / terms / cookie notice derived from config facts
- `vitops docs blocks` — EmDash Portable Text blocks and every field (needs @getvitops/emdash installed)
- `vitops docs elements` — Bricks Builder custom elements, controls, defaults

<!-- regenerate: vitops agents · @getvitops/cli@8.2.0 -->
<!-- vitops:end -->
