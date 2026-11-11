This is an EmDash CMS website (Astro on Cloudflare Workers, D1 + R2) styled by the Vitops
design system. Public pages are prerendered; the Worker serves the admin and API.

## Ground rules

- `site.json` is the single source of truth: organization and site facts, plus the design
  system (colors, type, spacing, patterns) under `designSystem.themes.default`. Never edit
  `src/styles/tailwind.css`; it is generated from `site.json` and gitignored.
- Content lives in the EmDash database, not the repo. Query it with `getEmDashCollection` /
  `getEmDashEntry` from `emdash`; render Portable Text with `<PortableText />` from `emdash/ui`
  (the `vitops_*` blocks from `@getvitops/emdash` are merged in).
- `seed/seed.json` applies only to an empty database. Changing it does not migrate a running
  site; use the admin or the site's MCP server (`/_emdash/api/mcp`) for that.
- Prefer framework classes (`centered`, `region`, `rhythm`, `subgrid`, `cluster`, `font-*`)
  over bespoke CSS. `vpr lint:design` enforces it. Details: `vitops-design-system` skill.
- Every public page is prerendered, so a publish goes live only after a rebuild. The contact
  form (`src/pages/api/track.ts`) is the one on-demand route. Don't remove the Worker cron
  trigger in `wrangler.jsonc`. Hosting comes from `vitopsHosting()`; never hard-code an adapter.
- `SETUP.html` is the onboarding checklist: tick a box only for a step you completed, never a
  human-only one.
- `src/assets/placeholder/` is wireframe stand-in imagery; delete it once real assets land.

## Branch model

Work on `dev` (every push deploys the `-dev` worker). `main` is production and protected:
never push or merge to it. Ship only through the `promote` skill, and only when asked.
The seeded `/terms` and `/privacy` pages are deliberate placeholders; don't polish them into
something that reads as finished. Replace them with `vp exec vitops legal` output.

## EmDash 1.x behaviours

- Passkeys are bound to the hostname; after a domain cutover use Settings, General, Change domain.
- Admin HTML blocks run JavaScript in a sandboxed iframe; don't enforce CSP without allowing for it.
- Link entries by `entry.data.slug`, never `entry.id`.
- Submit `/sitemap.xml`, not a per-collection sitemap.
- A stuck D1 migration lock: `vp exec emdash migrate --take-over-lock <id>`.
- Prefer the Astro and EmDash docs MCP servers (`.mcp.json`) over memory.

## Labels

`badge` is a static label; `tag` is static or dynamic. Never `chip` or `pill`. Buttons use `btn`.

## Commands

Vite+ project: use `vp` / `vpr` / `vp exec` / `vp dlx`, never pnpm/npm/npx. Astro scripts go
through `vpr` (`vpr dev`, `vpr build`, `vpr preview`); `vpr dev` returns immediately (check with
`vp exec astro dev status`, site at <http://localhost:4321>).

| To...                     | Run                                              |
| ------------------------- | ------------------------------------------------ |
| format, lint, typecheck   | `vp check` · `vpr typecheck` (Astro files)       |
| migrate and seed local DB | `vpr prepare-local-db` (before a first build)    |
| build                     | `vpr build` (`vitops emdash build`)              |
| deploy                    | `vpr deploy` / `vpr deploy:dev`, only when asked |
| validate config           | `vp exec vitops validate site.json`              |

EmDash skills are installed per project: `vp dlx skills add emdash-cms/skills --skill '*' -y`.

## This site (vitops.ca)

Lessons from building it that the generic rules above don't state:

- **Diff your markup against the component list before writing any renderer.** Run `vp exec vitops docs components` and `vp exec vitops docs blocks`. A hand-rolled stats figure was built next to an existing `Counter`, and an upstream block (`vitops_stats`) arrived later; check first, every time.
- **`tone` select options are static** in EmDash, so they cannot follow `site.json` at runtime; the toolkit's `tones/list` route fills them for the admin. A site-local block must not hard-code a site's palette names into a seed option list.
- **Site-specific decorations stay site-local.** A decoration such as the blueprint grid backdrop is not an option to propose upstream.
- **Registry:** every `vt_*` block still in use, with verdict and status, is in `UPSTREAM.md` ("Local block registry").

<!-- vitops:start -->

Built with the Vitops design system (`@getvitops/*`); tokens and site facts live in `site.json`.
Prefer its classes and patterns over hand-written CSS. Load the skill that matches the task:

- [emdash-building-pages](.agents/skills/emdash-building-pages/SKILL.md) — Use when authoring or changing a page's layout or content on this EmDash site — composing `vitops_*` blocks
- [emdash-contact-form](.agents/skills/emdash-contact-form/SKILL.md) — Use when adding or changing a form, fixing submissions that don't arrive, setting up notifications, CRM or Turnstile
- [emdash-content-and-deploys](.agents/skills/emdash-content-and-deploys/SKILL.md) — Use for any deploy or build problem, stale or missing content, "my publish isn't live", scheduled posts, previews
- [emdash-custom-blocks](.agents/skills/emdash-custom-blocks/SKILL.md) — Use before creating, renaming or deleting any block type, any `src/components/blocks/*` renderer
- [vitops-ads](.agents/skills/vitops-ads/SKILL.md) — Use when adding or changing a Google/Meta/LinkedIn/TikTok/Microsoft/Reddit/Pinterest/Snapchat pixel
- [vitops-consent](.agents/skills/vitops-consent/SKILL.md) — Use before gating, adding or changing any non-essential third-party tag, cookie, embed
- [vitops-csp](.agents/skills/vitops-csp/SKILL.md) — Use when changing `public/_headers`, adding an embed, tracking snippet or third-party script, turning the CSP on
- [vitops-design-system](.agents/skills/vitops-design-system/SKILL.md) — Use when styling or authoring pages or components (choosing utility/pattern classes, colours, spacing, typography)
- [vitops-see-the-page](.agents/skills/vitops-see-the-page/SKILL.md) — How to look at a rendered page of this site

Reference, rendered from this project: `vp exec vitops docs [topic]` (no topic lists them).
<!-- vitops:end -->
