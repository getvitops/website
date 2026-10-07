This is an EmDash site -- a CMS built on Astro with a full admin UI.

## Commands

```bash
npx emdash dev        # Start dev server (runs migrations, seeds, generates types)
npx emdash types      # Regenerate TypeScript types from schema
```

The admin UI is at `http://localhost:4321/_emdash/admin`.

## Key Files

| File                           | Purpose                                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `astro.config.mjs`             | Astro config with `emdash()` integration, database, and storage                                                                 |
| `site.json`                    | Vitops site config: design system, locales, environments, analytics, legal facts                                                |
| `src/live.config.ts`           | EmDash loader registration (boilerplate -- don't modify)                                                                        |
| `seed/seed.json`               | Schema bootstrap for a fresh DB (collections, block types, menus) — block types and menus are generated, see "CMS-backed pages" |
| `emdash-env.d.ts`              | Generated types for collections (auto-regenerated on dev server start)                                                          |
| `src/layouts/PineLayout.astro` | The one layout: head, nav/footer from EmDash menus (`src/lib/chrome.ts`)                                                        |
| `src/pages/`                   | Astro pages -- on-demand and edge-cached, see "Rendering model"                                                                 |

## Skills

Agent skills are in `.agents/skills/`. Load them when working on specific tasks:

- **building-emdash-site** -- Querying content, rendering Portable Text, schema design, seed files, site features (menus, widgets, search, SEO, comments, bylines). Start here.
- **creating-plugins** -- Building EmDash plugins with hooks, storage, admin UI, API routes, and Portable Text block types.
- **emdash-cli** -- CLI commands for content management, seeding, type generation, and visual editing flow.

## Documentation

The EmDash docs are available as an MCP server at `https://docs.emdashcms.com/mcp`. When you need to verify an API, hook, config option, field type, or pattern, call `search_docs` against the live documentation rather than relying on training-data recall. The docs reflect current behaviour; assumptions may not.

This template ships with `.mcp.json`, `.cursor/mcp.json`, and `.vscode/mcp.json` so Claude Code, Cursor, and VS Code auto-discover the docs server. Other tools (OpenCode, Windsurf, etc.) need a manual one-time setup -- see [docs.emdashcms.com/docs-mcp](https://docs.emdashcms.com/docs-mcp).

## Rules

- Pages are rendered on demand and edge-cached (`prerender = false` + `Astro.cache.set(CMS_PAGE_CACHE)`), because nav and footer come from EmDash menus; see "Rendering model". Only a page with nothing EmDash-driven in it may be `prerender = true`.
- Image fields are objects (`{ src, alt }`), not strings. Use `<Image image={...} />` from `"emdash/ui"`.
- `entry.id` is the slug (for URLs). `entry.data.id` is the database ULID (for API calls like `getEntryTerms`).
- Always call `Astro.cache.set(cacheHint)` on pages that query content.
- Taxonomy names in queries must match the seed's `"name"` field exactly (e.g., `"category"` not `"categories"`).
- When authoring a `<Subgrid>` card with `.subgrid-card` (`pricing.astro`, `sections/Pain.astro`, `sections/Services.astro`, `industries/index.astro`), set `--subgrid-card-rows` to the SAME value as `--subgrid-row-span` on the container. `.subgrid-card`'s own `grid-row` (same specificity, later in the stylesheet) wins the cascade over `.subgrid`'s, so `--subgrid-row-span` alone is silently ignored on any element that also carries `.subgrid-card` — the card spans the wrong number of row tracks with no build error.

## Rendering model

**Everything public renders on demand and is edge-cached until something
changes; the editors' content lives in EmDash.** The header nav, header button
and footer columns are EmDash menus (see "Menus"), read by `PineLayout`, so every
page that uses the layout is `prerender = false` — a prerendered page would bake
the menus at build and a menu edit would not reach it until the next deploy. Each
page calls `Astro.cache.set(CMS_PAGE_CACHE)` (1 week + 1 day SWR,
`src/lib/cache.ts`); the layout tags the response with the menus it read, so
editing a menu purges every page. A page that previously prerendered
(`/`, `/pricing`, `/digital-marketing`, `/managed-it-services`, the legal pages)
is now served by the Worker on a cache miss. `/404` is on-demand with **no**
lifetime — every unknown URL lands there and each would otherwise become its own
week-long edge entry. `src/pages/api/{contact,track}.ts` need the `EMAIL`
binding.

**`output` stays `"server"`. Do not change it to `"static"`.** It looks like the
tidier way to express this (flip the default, annotate the exceptions) and it
fails the build: `emdash()` injects dozens of _dynamic_ routes
(`/_emdash/admin/[...path]`, `/_emdash/api/admin/api-tokens/[id]`, ...), which
under `output: "static"` default to prerendered and each demand a
`getStaticPaths()`. So the per-page exports are the price of keeping EmDash. If
EmDash is ever removed, `output: "static"` becomes available and they collapse to
the two exceptions.

`getStaticPaths()` is how you'd prerender CMS content — one static file per entry
on a `[slug].astro` route. Nothing here does: prerendered content **does not
update until a rebuild**, and a publish (or menu edit) must be live immediately.

### CMS-backed pages (performance/feature experiment)

Most marketing pages live in EmDash as entries, rendered on demand — an
experiment to exercise EmDash and measure what it costs against the prerendered
pages. Routes (`prerender = false`, `Astro.cache.set(cacheHint)`, bodiless `404`
when the entry is missing — `Astro.rewrite("/404")` throws from an on-demand
route):

| Route                                                      | Collection            | Rendered by                           |
| ---------------------------------------------------------- | --------------------- | ------------------------------------- |
| `src/pages/[...slug].astro` → `/<slug>` (incl. `/funding`) | `pages`               | `CmsPage.astro`                       |
| `src/pages/managed-it-services/[slug].astro`               | `managed_it_services` | `CmsPage.astro`                       |
| `src/pages/industries/[slug].astro`                        | `industries`          | `IndustryPage.astro` (props = fields) |
| `src/pages/funding/[slug].astro`                           | `funding_programs`    | `ProgramPage.astro` (props = fields)  |

- **A static `src/pages/<route>.astro` beats these routes**, so a page is "in
  EmDash" only when its own file is deleted. Still hand-written (copy edited in
  git, deployed): `/`, `/pricing`, `/digital-marketing`, `/managed-it-services`,
  the legal pages (generated from `site.json`), and the `/industries` index (its
  grid is read from the collection).
- **Pages are a `layout` blocks field** (`pages`, `managed_it_services`): an
  ordered list of typed blocks that editors add, reorder and fill in as real
  forms in the admin — `hero`, `callout`, `lead`, `text`, `cards`, `columns`,
  `list`, `stats`, `faq`, `facts`, `contact_form`, `cta`. Beside it: `crumbs`
  (breadcrumb repeater), `schema_type` (none / organization / service) with
  `service_name` and `service_description`; the SEO description is the
  collection's SEO field. Copy fields take `[label](/href)` inline links and
  `**bold**` (`src/lib/inline.ts`; escaped, so editors can't inject HTML); a
  multi-paragraph `text` field splits on a blank line.
  - **To add a block type:** define it in `scripts/lib/block-types.mjs` (the one
    source: `node scripts/lib/block-types.mjs` regenerates `seed/seed.json`'s
    `blockTypes`, and `scripts/promote-blocks.mjs` — called by
    `promote-schema.sh` — applies it to a running site), add an adapter in
    `src/components/page/blocks/` mapping the stored snake_case value onto the
    page primitive, and add one line to `PageBlocks.astro`
    (`defineBlockComponents` fails the type-check if a type has no renderer).
    Run `npx emdash types` for the generated `PageLayoutBlock` union.
  - **Changing a block's fields:** adding an optional field is compatible
    (in place). Removing a field, changing its type or adding a required one is a
    breaking change — a new numbered version; read "Build pages with blocks" in
    the EmDash docs first. Ship the renderer before enabling a type.
  - EmDash will not change a field's type in place (`json` → `repeater` is
    refused), which is why `industries` and `funding_programs` gained new
    `*_items` repeaters next to their old json fields.
  - `CmsPage.astro` still renders the legacy `hero` / `sections` / `cta` fields
    when `layout` is empty, and the industry/funding routes still fall back to the
    old json fields. Remove those fallbacks, and the legacy fields, once every
    environment is migrated (docs/EMDASH-TOOLCHAIN-MIGRATION-PLAN.md).
- **Editing happens on dev.vitops.ca (staging), then is promoted.** Content lives
  in the database, not git. Editors change pages and menus in the dev admin;
  `Promote content` (`.github/workflows/promote-content.yml`,
  `scripts/promote-content.mjs`) copies what is _published_ on dev to prod —
  dry-run first — and a snapshot PR records it under `seed/`. Prod is written
  only by that workflow, apart from blog posts (not yet built), which are edited
  on prod and never touched by it. `seed/<collection>/*.json` and
  `seed/menus.json` are snapshots and the bootstrap for a fresh database
  (`node scripts/sync-pages.mjs`, `node scripts/sync-menus.mjs <url>` — both
  **overwrite** what is on the target), not the source of truth.
  `node scripts/export-content.mjs <url>` regenerates them from a live site.
  Schema is in `seed/seed.json` and, for an existing database, goes through
  `scripts/promote-schema.sh` (REST for block types and fields; the CLI cannot
  set `urlPattern` or SEO). Order for a release: code → schema → content
  (docs/RUNBOOK.md). Refreshing dev from prod replaces dev's database, so only do
  it when dev has no unpromoted work.
- **Menus.** `src/lib/chrome.ts` reads `primary`, `header_cta`, `footer_services`,
  `footer_funding` and `footer_company` with `getMenuWithCacheHint()` and returns
  their tags (`PineLayout` passes them to `Astro.cache.set`, so editing a menu
  purges every page). _Which menu an item is in decides how it looks_ — the admin's
  menu editor has no CSS-class field: `primary` items are nav links (an item's
  children are its dropdown), `header_cta` items render as the `.cta` button,
  each `footer_*` menu is a footer column headed by the menu's label.
  `cssClasses` / `target` are still passed through when set via the API or
  seed — a developer escape hatch. A missing or empty menu falls back to the
  defaults in `chrome.ts`, so a fresh database still renders navigation. A new
  footer column needs a menu name added there.
- **A nested path needs its own collection.** EmDash's sitemap percent-encodes a
  `/` in a slug (`a%2Fb`), so `managed-it-services/x` is a `managed_it_services`
  entry with `urlPattern: /managed-it-services/{slug}`, never a `pages` slug with
  a slash.
- **Edge caching (Workers Cache).** `astro.config.mjs` sets
  `cache: { provider: cacheCloudflare() }`; each CMS route then calls
  `Astro.cache.set(cacheHint)` (tags the response with its collection/entry, so a
  publish purges exactly the affected pages) and `Astro.cache.set(CMS_PAGE_CACHE)`
  (1 week + 1 day SWR, `src/lib/cache.ts`) — a page is served from the edge until
  it next changes. Rules:
  - **Never use `routeRules` for this.** They match the request _path_, so a
    catch-all like `/[...slug]` also matches `/_emdash/*` and `/api/*` and caches
    the admin's 302 to `/login` — every visitor, signed in or not, then loops back
    to the login screen.
  - Keep `Astro.cache.set(cacheHint)` on every CMS-backed route (without it a page
    never invalidates), and call `Astro.cache.set(CMS_PAGE_CACHE)` only _after_ the
    missing-entry 404 return; that 404 must be `private, no-store` (a cached 404
    has no tag to purge). Pages that only use the layout tag themselves with the
    menu tags and set `CMS_PAGE_CACHE` at the top of their frontmatter.
  - **A deploy does not purge the edge cache**, so changed templates keep serving
    old HTML until an entry is next published or the cache is purged (dashboard:
    Caching → Purge, or `cache.purge()` from Worker code).
  - A signed-in editor may be served the cached anonymous page.
  - Cloudflare's `Vary` support is not the mechanism — it caches alternate
    representations of one URL, not "until changed".
- **Sitemap / llms.txt:** `/sitemap.xml` (EmDash) indexes the CMS-backed pages;
  `pages-sitemap.xml` is derived from the filesystem and git history, so it lists
  the hand-written pages only (`robots.txt` names both;
  `site.seo.indexing.sitemapUrl` still points only at the filesystem one, so
  `vitops search notify` does not see CMS pages). `/llms.txt` is a live route —
  see "AI discovery".

Three things came with prerendering, all of which failed silently before being
fixed. Prerendering is no longer how pages are served, but the first and last
still bite anything that ever is prerendered again, and the middle one explains
why `noindex` is a `<meta>` tag as well as a header:

- **`site:` in `astro.config.mjs` is load-bearing.** A prerendered page has no
  request to derive an origin from, so without it every canonical and `og:url`
  reads `http://localhost:4321`.
- **Middleware does not run for prerendered pages.** Workers Assets serves them
  without invoking the Worker, so nothing in `src/middleware.ts` applies —
  no `cache-control`, no `x-ab-variant`, and critically no `x-robots-tag`. The
  `noindex` for non-production stages is therefore a build-time `<meta>` in
  PineLayout. Anything request-shaped belongs on an on-demand route, not here.
- **Stage gating is build-time.** See below.

`wrangler.jsonc` sets `assets.html_handling: "drop-trailing-slash"` so
`/pricing` serves 200 rather than 307-ing to `/pricing/`, which would contradict
the canonical URL and every `<loc>` in the sitemap.

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

- `clarityEnabled()` (`src/lib/analytics.ts`) — the production-**stage** check,
  decided at build time from `isProdStage`, which `vite.define` bakes in from
  `VITOPS_STAGE`. Only `deploy-prod.yml` sets it, and it fails closed: an unset
  variable means no analytics. `site.environments.<env>.analytics` in `site.json`
  records the same fact for the legal disclosure only.

  It was a runtime hostname test until the pages were prerendered, on the
  premise that one bundle served both stages. That premise was already wrong —
  `deploy` and `deploy:dev` each run their own `astro build` — and prerendering
  made it dangerous: with `site:` set, the build-time hostname is `vitops.ca`, so
  the check resolved to _true_ and would have shipped a live Clarity tag to
  dev.vitops.ca, feeding the production project with our own sessions. Do not
  reintroduce a hostname check here; a prerendered page has no hostname to read.

- The consent category — the visitor's choice, handled by `@getvitops/core/consent`.

**Consent is demand-driven** (toolchain 4.0): the banner appears when something
asks for a category, not on a visitor's first visit. Here the askers are the
gated Clarity tag (at its `idle` strategy) and `<Tracking />` (only on an arrival
carrying an ad click ID). `consent.categories` is pinned to
`["analytics", "marketing"]` in `astro.config.mjs` because the default includes
`preferences`, and this dark-only site never stores a display preference — an
offered row nothing uses would also make the generated cookie notice disclose it.
`site.json`'s `site.legal.cookieConsent.categories` carries the same two values,
for the generated privacy/cookie-notice text — a separate declaration from the
runtime banner's, since the build only cross-checks the two configs' `enabled`
flags against each other, never `categories`.

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

**`src/pages/api/track.ts` answers the `tel:`-click beacon.** The contact page (`seed/pages/contact.json`) links
a phone number, and `<Tracking />`'s capture script beacons `/api/track` on every
`tel:` tap; the route is a thin `createConversionRoute()` wrapper. Remove it and
the build warns that `tracking` is on with no route answering — and those
conversions are lost silently.

**`site.plan.addons` must list `server_side_tracking`.** `site.tracking.enabled`
is rejected at validate/build time without it (toolchain 8.2). `"internal"` is a
placeholder plan key; a portal-managed config will write the real one.

## Sitemap and search indexing

`scripts/sitemap.mjs` writes `public/pages-sitemap.xml` from `git log` on every
build, wired as an `astro:build:start` integration in `astro.config.mjs`. Three
things forced that shape, and all three are worth knowing before "simplifying" it:

- EmDash serves `/sitemap.xml`, but from **database collections** — every public
  route here is a `src/pages/*.astro` file, so none appear in it. Hence a second
  document under a different name.

  **That name must not match `sitemap-*.xml`.** EmDash also injects
  `/sitemap-[collection].xml`, so the obvious `sitemap-pages.xml` collided with a
  real collection named `pages`: the URL returned 200 serving the CMS's sitemap,
  and `vitops search notify` read three CMS URLs instead of the site's fifteen
  routes, with nothing to indicate a problem.

- The toolchain's own `sitemap` option is skipped with a warning when `emdash()`
  is registered, and the `@astrojs/sitemap` behind it lists **prerendered** routes
  only. This site is `output: "server"`, so it would emit nothing.
- An endpoint would need `prerender = true` (`gitLastmod` shells out to git;
  workerd has none), and introducing the site's first prerendered route creates a
  second build target that fails to resolve Astro's markdown renderer to a wasm
  binding. Writing into `public/` sidesteps it.

The route list is derived from the filesystem, never written out — a hand-kept
list drifts silently and a new page is simply never submitted. `/404`,
`_`-prefixed partials and `[param]` routes are filtered. That derivation
(`isPublicRoute`, `publicRoutes`) lives in `scripts/routes.mjs`;
`src/pages/llms.txt.ts` applies the same rule at runtime, so keep the two in step
or the sitemap and `llms.txt` will silently list different URLs.

**Both deploy workflows set `fetch-depth: 0`.** The default shallow clone has one
commit, so every `<lastmod>` would claim the deploy date — plausible and wrong,
and `vitops search notify` diffs on exactly that field.

`vitops search notify` runs after the prod deploy (`continue-on-error`, since the
deploy already succeeded) and keeps its snapshot in `.vitops/`, restored from
`actions/cache` so it resubmits only what moved. `vitops search setup` onboards
`site.searchConsole` domains and is run **by hand**, not in CI — it needs a user
OAuth credential, because verifying a property makes the caller an owner and that
should be a person. The old command name was `vitops indexing`; there is no alias.

By hand, `vitops search setup`/`search notify` can authenticate from a plain
`gcloud auth application-default login` instead of a self-issued OAuth client
(which sits in Google's _Testing_ publishing status and has its refresh token
expired after 7 days). `site.google.project` (`site.json`) names the Google
Cloud project ADC usage is attributed to — required for a user credential, and
deliberately **not** sent for CI's service-account credential, which already
belongs to a project. The login needs the Search Console scopes, not in ADC's
default set:

```
gcloud auth application-default login \
  --scopes=openid,https://www.googleapis.com/auth/siteverification,\
https://www.googleapis.com/auth/webmasters,https://www.googleapis.com/auth/cloud-platform
```

`.github/workflows/deploy-prod.yml`'s `VITOPS_GSC_SERVICE_ACCOUNT` is unaffected
by any of this — CI keeps using its own credential.

> A `<script>` body in an `.astro` file is **raw text, not JSX**. Wrapping it in
> `{`...`}` emits the braces and backticks verbatim, producing a block that
> evaluates a string and silently does nothing. Write plain JS.

## AI discovery (llms.txt)

`/llms.txt` (the [llmstxt.org](https://llmstxt.org) format) is a **live route**,
`src/pages/llms.txt.ts`, rendered by `src/lib/llms.ts`. No first-party support
exists for this: Astro core has none, EmDash has none, and Cloudflare's AI Crawl
Control auto-generates managed **robots.txt** only, not llms.txt.

It was a build-time file written from the prerendered HTML. With nothing
prerendered any more there is no HTML at build, so the route builds the list per
request, then is edge-cached for a week and tagged with the four collections, so
a publish refreshes it:

- **CMS entries** (`pages`, `managed_it_services`, `industries`,
  `funding_programs`): title and SEO description are read per entry with
  `getEmDashEntry` — the collection query omits SEO. An entry with no title or no
  SEO description is left out.
- **Hand-written pages**: found with `import.meta.glob("./**/*.astro")` (the same
  rule as `scripts/routes.mjs`: no `/404`, no `_` or `[param]` segments), each
  fetched from this same site and its own `<head>` read, so `llms.txt` quotes what
  the page actually serves and cannot disagree with it. A page that doesn't answer
  is left out rather than failing the file. These aren't tagged, so a deploy that
  changes one's title shows up after the cache expires or is purged.

Section rules (the seven predicates) live in `llms.txt.ts`; `src/lib/llms.ts` is
deliberately site-agnostic (no `site.json`, no route patterns) so it can move into
`@getvitops/astro` unchanged, and be deleted outright once EmDash ships llms.txt
support or Cloudflare's AI Index reaches GA.

`llms-full.txt` (full page bodies as markdown) is a deliberate non-goal — it
would mean maintaining a markdown rendition of every marketing page, none of
which has markdown source.

## A/B testing — toolchain-native, currently dormant

A/B is `vitopsAbTesting()` (`@getvitops/astro/middleware`), wired in
`src/middleware.ts` and driven by `site.experiments` in `site.json`. **No
experiment is defined**, so it assigns nothing. (The earlier bespoke system —
`src/_b/`, `b-variant`, `pick()` — was deleted; do not recreate it.)

An experiment is an entry under `site.experiments.<key>`: `enabled`, `category`
(consent category its cookie waits on), `splitRatio` (fraction sent to
`variants[1]`; `0` = nobody auto-assigned, but `?_ab_<key>=<variant>` still
forces it — a review link), `cookieName` (default `_ab_<key>`) and exactly two
`variants`. The middleware pins the visitor by cookie; **the page** reads
`Astro.cookies.get(cookieName)?.value` and renders the matching one of its two
hand-written blocks. The CMS surface (`/_emdash/*`) is excluded.

**A page under test must set `prerender = false`.** The cookie is read per
request, and a prerendered page bakes one variant at build time. Revert the line
when the test ends. Don't swap client-side instead — flicker and layout shift on
the very page being measured.

**Reporting is Plausible, not Clarity** — configured via `site.analytics`
(`plausibleDomain`) once Plausible is adopted; `<Analytics />` then attaches the
assignment to the pageview. Until then a launched test is not attributed in
analytics, so don't launch one before Plausible is wired.
