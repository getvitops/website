---
name: custom-blocks
description: Decide whether a page section should be a site-local block type (`vt_*`) or an upstream `vitops.*` proposal, and how to build and register it. Use when adding, changing, renaming or reviewing an EmDash block type or a block renderer, when a mockup section has no matching `vitops.*` block, or when asked whether something should be upstreamed.
---

# Custom blocks: site-local vs upstream

This site is built from **blocks**, so editors can compose and change pages without a developer. When the `@getvitops/emdash` library has no block for a section, we build a site-local one and record whether it should become a toolkit block. The decision is made **before** the type exists: EmDash block types can be retired but never deleted, and a breaking schema change needs a new version plus a content migration.

Registry of every site-local block, with its verdict and status: `UPSTREAM.md` ("Proposed blocks"). Read it first. Toolchain commands are `vp` / `vpr` / `vp exec` (see `AGENTS.md`).

## 1. Try these in order

1. **Compose.** Put existing `vitops.*` blocks (cards, accordion, hero, actionLink …) inside a `vt_section` body. Check `vp exec vitops docs blocks` and `vp exec vitops docs components` first.
2. **Extend.** Could an optional field or a variant on an existing block do it? Then propose that upstream (an entry in `UPSTREAM.md`), and use a site-local block only until it lands. Prefer a variant to a new block: the library should not sprawl.
3. **Build a site-local block** (`vt_<name>`) only if 1 and 2 don't fit.
4. **Propose it upstream** if it passes the test below.

Never fall back to a hand-written Astro page or the admin HTML block (sandboxed iframe: no site CSS, blocked by CSP, weak for SEO and accessibility).

## 2. Local or upstream? Ask these before creating the type

Propose **upstream** when all of these are true:

- **Universal.** A different small-business site would use it with different copy (section, logos, steps, stats, CTA band, form).
- **Data in fields.** The content is in fields an editor can change, not in the renderer. A code-owned widget with sample numbers is site-specific.
- **No site vocabulary.** Field names and option values mean nothing site-specific (`tone: brand-primary`, not `it`/`mk`).
- **Not an extension.** Adding a field or variant to an existing block would not do.

Keep it **site-local** when the content or argument is specific to this client (an illustration of their product, their comparison), or when it is a one-off layout. Where you are unsure, keep it local and mark it `local (watch)` in the registry; upstream it when a second site wants it. You may not have seen a second site, so say so rather than guessing "generic".

## 3. Build it right the first time

- **Name:** `vt_<name>`, so it is never mistaken for a toolkit block. Use the framework's words: **badge** is a static label, **tag** is a static or dynamic (selectable, dismissable, editable) label. Never "chip", "pill" or "label". Check `vp exec vitops docs components` for an existing pattern name before coining one.
- **Colour fields:** one `tone` select of role names plus an optional `color` string. The renderer resolves, in order, a **role** name (preferred), a **semantic** fallback (`primary`, `secondary`, `success` …), then a **palette colour** (`pine-400`, the escape hatch). Use `resolveTone()` in `src/components/blocks/tone.ts`; it returns CSS custom properties for the `.vt-tone-*` classes. Don't build class names from field values (Tailwind only emits classes it can read in source).
- **Links:** use `url` fields (EmDash accepts site-relative paths such as `/about` and fragments).
- **Layout:** framework classes (`centered`, `region`, `rhythm`, `subgrid`, `cluster`, `spotlight`) and patterns (`card`, `btn`, `badge`, `tag`). A set of cards is a `subgrid`. Write site CSS only for what has no class, in `src/styles/site.css`, and run `vpr lint:design`.
- **Types:** renderers declare their value shape with `BV<T>` (`src/components/blocks/types.ts`); `emdash types` does not generate block unions.

## 4. How to add one

1. Create the type (EmDash MCP `schema_create_block_type`, or the admin) and add it to `pages.layout`'s `allowedTypes` (`schema_update_field`).
2. Write the renderer in `src/components/blocks/<Name>.astro` and register it in `src/components/PageBlocks.astro`.
3. Add content through the admin, `vp exec emdash content …`, or the REST API.
4. Regenerate the seed so a fresh install matches: `vp exec emdash export-seed -d <sqlite> --with-content=pages`, merge it into `seed/seed.json`, and check it with `vp exec emdash seed --validate`.
5. Add a row to the `UPSTREAM.md` registry: block, verdict, generic upstream name, fields, patterns used, which mockup section, status.
6. Verify: `vpr typecheck`, `vpr lint:design`, `vpr build`, and look at the page at 1440px and 390px.

## 5. Changing or renaming a block type

- A compatible change (a new optional field, looser validation) amends the active version in place.
- A breaking change (removing or retyping a field, new required field, narrower options) needs a new version: create it inactive (`schema_update_block_type` with `breaking: true`), make the renderer handle both versions, activate it (`schema_activate_block_type_version`; the expected fingerprint is the **currently active** version's), then migrate stored blocks with `migrateBlocks: true`. Block values go in as Portable Text arrays, not Markdown, when using the REST API.
- A slug cannot be renamed. Renaming means a new type, migrating content to it, then removing the old one from `allowedTypes` so it becomes `retired`. It stays in the database and seed for good, so name things correctly the first time.
- A content update to a published entry is staged as a draft; publish it (`vp exec emdash content publish pages <slug> --rev …`) or the live page won't change.

## 6. Lifecycle (recorded in `UPSTREAM.md`)

`local` → `proposed` (written up upstream) → `upstreamed` (a `vitops.*` block exists) → `migrated` (content switched to `vitops.x`, the `vt_x` type retired). When a block is upstreamed, expect to migrate the content and retire the local type.
