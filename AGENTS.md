This is an EmDash site -- a CMS built on Astro with a full admin UI.

## Commands

```bash
npx emdash dev        # Start dev server (runs migrations, seeds, generates types)
npx emdash types      # Regenerate TypeScript types from schema
```

The admin UI is at `http://localhost:4321/_emdash/admin`.

## Key Files

| File                     | Purpose                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `astro.config.mjs`       | Astro config with `emdash()` integration, database, and storage                    |
| `src/live.config.ts`     | EmDash loader registration (boilerplate -- don't modify)                           |
| `seed/seed.json`         | Schema definition + demo content (collections, fields, taxonomies, menus, widgets) |
| `emdash-env.d.ts`        | Generated types for collections (auto-regenerated on dev server start)             |
| `src/layouts/Base.astro` | Base layout with EmDash wiring (menus, search, page contributions)                 |
| `src/pages/`             | Astro pages -- all server-rendered                                                 |

## Skills

Agent skills are in `.agents/skills/`. Load them when working on specific tasks:

- **building-emdash-site** -- Querying content, rendering Portable Text, schema design, seed files, site features (menus, widgets, search, SEO, comments, bylines). Start here.
- **creating-plugins** -- Building EmDash plugins with hooks, storage, admin UI, API routes, and Portable Text block types.
- **emdash-cli** -- CLI commands for content management, seeding, type generation, and visual editing flow.

## Documentation

The EmDash docs are available as an MCP server at `https://docs.emdashcms.com/mcp`. When you need to verify an API, hook, config option, field type, or pattern, call `search_docs` against the live documentation rather than relying on training-data recall. The docs reflect current behaviour; assumptions may not.

This template ships with `.mcp.json`, `.cursor/mcp.json`, and `.vscode/mcp.json` so Claude Code, Cursor, and VS Code auto-discover the docs server. Other tools (OpenCode, Windsurf, etc.) need a manual one-time setup -- see [docs.emdashcms.com/docs-mcp](https://docs.emdashcms.com/docs-mcp).

## Rules

- All content pages must be server-rendered (`output: "server"`). No `getStaticPaths()` for CMS content.
- Image fields are objects (`{ src, alt }`), not strings. Use `<Image image={...} />` from `"emdash/ui"`.
- `entry.id` is the slug (for URLs). `entry.data.id` is the database ULID (for API calls like `getEntryTerms`).
- Always call `Astro.cache.set(cacheHint)` on pages that query content.
- Taxonomy names in queries must match the seed's `"name"` field exactly (e.g., `"category"` not `"categories"`).

## A/B testing (3 layers) — retained, currently dormant

The system is intact; there is **no B content** right now. `DEFAULT_SPLIT_B` is `0`
(`src/lib/variant.ts`), so every visitor gets A. `?variant=b` still forces B for
review at any time, independent of the split.

Variant is resolved per request in `src/middleware.ts` (`?variant=a|b` override >
sticky `ab_variant` cookie > split) and exposed as `Astro.locals.variant`.
`/_emdash/*` is pinned to `a`. Responses carry `x-ab-variant` for analytics.

- **Layer 1 — values.** Copy/numbers/images: `pick(aValue, bValue, Astro.locals.variant)`
  from `src/lib/variant.ts`, inline where the value is used. **Cheapest layer — prefer it.**
- **Layer 2 — one component.** The B override mirrors the A path under `src/_b/`
  (e.g. `src/components/sections/Hero.astro` → `src/_b/sections/Hero.astro`);
  the page imports both and `pick()`s. Use when the page structure is shared.
- **Layer 3 — whole page.** Self-contained full page at `src/_b/pages/<route>.astro`
  (`/` → `index.astro`, `/pricing` → `pricing.astro`). When it exists and the
  visitor is variant `b`, `src/middleware.ts` internally rewrites — via
  `next(payload)`, NEVER `context.rewrite()`, which would re-run the EmDash
  middleware chain — to the `src/pages/b-variant/[...path].astro` dispatcher.
  The public URL never changes; direct hits to `/b-variant/*` 404.

**To launch a test:** add the B content under `src/_b/`, then set `DEFAULT_SPLIT_B`
above 0. Nothing else needs wiring.

Rules: never link to `/b-variant/*`; in shared layouts/components use
`Astro.originPathname`, not `Astro.url.pathname` (`Astro.url` is the internal
path during a layer-3 render); B pages set their own title/description; home
sections live in `src/components/sections/` so a structural B home is a
recomposition, not a fork.

**Layer 3 costs more than it looks.** A whole-page fork means every copy edit has
to be made twice, and the miss is silent. Both previous B pages drifted from A
that way — a pricing block existed in one and not the other, and a CTA still said
"See both services" after A moved to three. Prefer layer 1, and diff both paths
before calling a change live.
