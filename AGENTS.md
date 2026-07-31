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

## A/B testing — removed

There is no A/B system. It was built (sticky variant cookie, `Astro.locals.variant`,
a `/b-variant` dispatcher for whole-page challengers) and removed once it was clear
traffic was far too low for a test to reach significance. Only one version of each
page is served.

Deleted with it: `src/_b/`, `src/pages/b-variant/`, `src/lib/variant.ts`,
`src/lib/ab-pages.ts`, and the variant logic in `src/middleware.ts`. Restore the
deletion commit to bring it back rather than rebuilding it.

Two things it left behind on purpose:

- `src/middleware.ts` still sets `X-Robots-Tag: noindex` on non-prod hosts, and still
  sends `cache-control: private, no-store` on HTML. The cache header is no longer
  required for variant correctness, but EmDash pages can carry session-dependent
  content, so relaxing it is its own decision.
- `PineLayout.astro` builds the canonical from `Astro.originPathname` rather than
  `Astro.url.pathname`. That was needed during layer-3 rewrites; it is kept because
  it stays correct if any internal rewrite is ever reintroduced.

**If you reintroduce it:** page-level experiments were a full page fork, which meant
every copy edit had to be made twice and was easy to miss — check both paths before
claiming a change is live.
