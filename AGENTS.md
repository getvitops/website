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
| `site.json`              | Vitops site config: design system, locales, environments, analytics, legal facts   |
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

## Site config, analytics and legal

`site.json` is the Vitops site config **and** the design system — the design
system lives at `designSystem.themes.default`, which is why both `css.input` and
`site.input` in `astro.config.mjs` point at the same file. There is no
`design-system.json`; the toolchain tells the two shapes apart by structure, not
filename, and the `legal` renderer only reads a site config.

Since toolchain 3.0 it is a **three-section `Config`**: `designSystem` (the
tokens), `organization` (the company, including `contact`), and `site`
(`defaultLocale`, `locales`, `domains`, `environments`, `analytics`, `tracking`,
`notifications`, `searchConsole`, `seo`, `legal` — the deployment's facts). So a
site-level fact is at `site.<key>`, not the root, and `astro.config.mjs` reads
the Clarity id as `config.site.analytics.clarityId`. `npx vitops validate` names
every move if you meet a pre-3.0 flat file. The `$schema` is
`config.schema.json`, not the old `site.schema.json`.

Regenerate with
`npx vitops generate -i site.json -f tailwind -o src/styles` (note that this also
drops a duplicate HTML copy of the legal docs in `src/styles/legal/`, which is
gitignored) — though `astro dev` and `astro build` already do it.

- `defaultColorScheme` is **`"dark"`**. The site is dark-only
  (`data-brx-theme="dark"`). Setting `"system"` emits a `prefers-color-scheme`
  block and flips light-OS visitors to a light theme that was never designed.
- Lint with `--format tailwind`. The default is `bricks`, under which every
  `@md:` container-query class is reported as unresolvable.

**Legal documents are generated, never authored.** `src/content/legal/*.md` is
rewritten from `site.json`'s `site.legal` block on every build; edit `site.json`.
`src/pages/{privacy,cookies,terms}.astro` render them through
`src/components/page/LegalDoc.astro`, which also strips the generator's
"not legal advice, review before publishing" blockquote — that note addresses us,
not visitors. It throws if the note survives, so a reworded upstream fails loudly
instead of publishing a policy that disclaims itself.

**Analytics is opt-in behind the consent gate.** Clarity is configured on the
integration and emitted by `<Analytics enabled={...} />`; until a visitor accepts,
the tag ships as `type="text/plain"` and the page makes no third-party request at
all. Two gates, deliberately distinct:

- `clarityEnabled()` (`src/lib/analytics.ts`) — the production-host check. One
  bundle serves prod and dev, so the stage gate is a runtime hostname test.
  `site.environments.<env>.analytics` in `site.json` records the same fact for
  the legal disclosure only.
- The consent category — the visitor's choice, handled by `@getvitops/core/consent`.

**Consent is demand-driven** (toolchain 4.0): the banner appears when something
asks for a category, not on a visitor's first visit. Here the askers are the
gated Clarity tag (at its `idle` strategy) and `<Tracking />` (only on an arrival
carrying an ad click ID). `consent.categories` is pinned to
`["analytics", "marketing"]` in `astro.config.mjs` because the default includes
`preferences`, and this dark-only site never stores a display preference — an
offered row nothing uses would also make the generated cookie notice disclose it.

**Everything that can raise the banner, and the banner itself, share one gate.**
`<Analytics />`, `<Tracking />`, `<CookieConsent />` and the footer's "Cookie
preferences" button all render only where `analyticsEnabled` is true. A demand
raised on a page with no banner waits forever and never writes — silently. Keep
that invariant. Reopening needs no JS: the consent runtime delegates a document
click listener to `[data-consent-open]` itself.

Use `require(category)`, never `granted(category)`, when the point is to _ask_.
`granted()` is a passive read — correct in the `vitops:consent` listener in
`PineLayout`, and a permanent silent no-op anywhere it is meant to prompt.

**Ad-click attribution.** `<Tracking />` captures a click ID / UTMs off the
landing URL into the first-party `_ac` cookie; `src/pages/api/contact.ts` reads
it back with `parseTrackingCookie` and puts a `Source:` line in the enquiry
email. Attribution never fails a submission — the visitor has already sent it.
The `createConversionRoute()` factory is deliberately **not** used: `contact.ts`
owns validation and the `send.vitops.ca` sender constraints, which is exactly the
split the factory documents.

## Sitemap and search indexing

`scripts/sitemap.mjs` writes `public/sitemap-pages.xml` from `git log` on every
build, wired as an `astro:build:start` integration in `astro.config.mjs`. Three
things forced that shape, and all three are worth knowing before "simplifying" it:

- EmDash serves `/sitemap.xml`, but from **database collections** — every public
  route here is a `src/pages/*.astro` file, so none appear in it. Hence a second
  document under a different name.
- The toolchain's own `sitemap` option is skipped with a warning when `emdash()`
  is registered, and the `@astrojs/sitemap` behind it lists **prerendered** routes
  only. This site is `output: "server"`, so it would emit nothing.
- An endpoint would need `prerender = true` (`gitLastmod` shells out to git;
  workerd has none), and introducing the site's first prerendered route creates a
  second build target that fails to resolve Astro's markdown renderer to a wasm
  binding. Writing into `public/` sidesteps it.

The route list is derived from the filesystem, never written out — a hand-kept
list drifts silently and a new page is simply never submitted. `/404`,
`/b-variant/*` and `_`-prefixed partials are filtered.

**Both deploy workflows set `fetch-depth: 0`.** The default shallow clone has one
commit, so every `<lastmod>` would claim the deploy date — plausible and wrong,
and `vitops search notify` diffs on exactly that field.

`vitops search notify` runs after the prod deploy (`continue-on-error`, since the
deploy already succeeded) and keeps its snapshot in `.vitops/`, restored from
`actions/cache` so it resubmits only what moved. `vitops search setup` onboards
`site.searchConsole` domains and is run **by hand**, not in CI — it needs a user
OAuth credential, because verifying a property makes the caller an owner and that
should be a person. The old command name was `vitops indexing`; there is no alias.

> A `<script>` body in an `.astro` file is **raw text, not JSX**. Wrapping it in
> `{`...`}` emits the braces and backticks verbatim, producing a block that
> evaluates a string and silently does nothing. Write plain JS.

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
