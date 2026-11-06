# Prompt: upgrade this site to the new @getvitops toolchain

Run this in an agent session in this directory, after the new `@getvitops/*` packages are published on the `alpha` dist-tag (they are: `8.3.0-alpha.0`, `@getvitops/emdash@2.0.0-alpha.0`, `@getvitops/create@0.9.0-alpha.0`; `latest` is untouched).

---

You are upgrading this EmDash site (vitops.ca, scaffolded from `@getvitops/create`'s emdash template) to the newly published `@getvitops/*` toolchain. The site is not deployed: all content is in `seed/seed.json`, and the local D1 is disposable. Use `vp`/`vpr`/`vpx`, never `pnpm`.

1. Commit the current working tree as-is (`chore: snapshot before toolchain upgrade`) so the upgrade is a reviewable diff.
2. Move this site onto the `alpha` channel. It pins `@getvitops/*` to `latest`, which does not resolve to the alpha. In `package.json` set `@getvitops/astro`, `@getvitops/core` and `@getvitops/emdash` (dependencies) and `@getvitops/cli` (devDependencies) to `"alpha"`, then run `vp install` so the lockfile resolves them (later `vp update` runs follow the channel). Keep `emdash` and `@emdash-cms/cloudflare` on their current ranges unless a changelog says otherwise. Leave a comment in the commit message, not in `package.json`, saying these are on `alpha` until the toolchain is released to `latest`, at which point the four specifiers go back to `"latest"` (the template's rule). Then read the new entries in `node_modules/@getvitops/{cli,create,emdash,astro}/CHANGELOG.md` and apply every migration they name.
3. Compare this site against the current template (`@getvitops/create`'s `templates/emdash/`, from the package tarball). Bring over the `package.json` script changes:
   - `"prepare-local-db": "vitops emdash prepare-db"`;
   - `"build": "astro build && vitops emdash check-prerender"`;
   - the `deploy` and `deploy:dev` chains.

   Bring over the new `AGENTS.md` guidance where this site hasn't diverged. Do not overwrite site-specific content. The template no longer ships `scripts/prepare-local-db.mjs` or `scripts/check-prerender.mjs`; the logic is in the CLI.

4. Seed menus: add `primary` (Contact only; the logo is the home link), `footer-sitemap` and `footer-legal` (Privacy `/privacy`, Terms `/terms`, Cookies `/cookies`). Keep any existing menu items that point at real pages.
5. Replace site-local blocks in `src/components/blocks/` with upstream ones wherever an equivalent now exists:
   - `Section`/`vt_section` → `vitops_section`;
   - `Stats` → `vitops.stats`, `Steps` → `vitops.steps`, `Logos` → `vitops.logos`, `Hero` → `vitops.hero`;
   - `Contact` → `vitops.form` (Turnstile);
   - `SiteHeader`/`SiteFooter` → `vitops.nav` + the menus.

   Check the upstream block list (`@getvitops/emdash` `BLOCKS` and `vitopsBlockTypes()`) for `Badges`, `Band`, `Compare`, `Dashboard` and `Pillars`. Rewrite the seed content to the upstream block shapes, preserving every piece of copy, then delete the replaced components and their registrations. Anything with no upstream match stays local; add an entry for it in `UPSTREAM.md` (what's missing, suggested fix).

6. Verify, and fix until green: `vpx emdash seed --validate seed/seed.json`, `vpr prepare-local-db`, `vpr build` (the prerender guard must pass), `vpr typecheck`, `vpr lint:design`. Then serve `dist/client` and run `vitops audit --url <served url>`. Report the audit results; don't hide failures.
7. Commit in logical steps (deps and template sync / menus / block migration). Do not deploy, do not push, do not touch any Cloudflare resource.

Finish with a summary of what changed, which blocks stayed local and why, the audit results, and anything from the changelogs you could not apply.
