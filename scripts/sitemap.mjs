import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { gitLastmod } from "@getvitops/astro";

import { CANONICAL_ORIGIN, publicRoutes } from "./routes.mjs";

/**
 * Writes `public/pages-sitemap.xml` — the sitemap for this site's hand-authored
 * pages — as a build step.
 *
 * **The name must not match `sitemap-*.xml`.** EmDash injects a dynamic route at
 * `/sitemap-[collection].xml`, so the obvious `sitemap-pages.xml` collides with
 * it — and `pages` is a real EmDash collection, so that URL resolved to the CMS's
 * own sitemap and won. It served a 200 with the wrong document, and
 * `vitops search notify` happily read it: three CMS URLs instead of the fifteen
 * routes here. Nothing errored. `/sitemap.xml` is taken by EmDash too.
 *
 * Why a build step rather than a route:
 *
 * - The integration's `sitemap` option is skipped with a warning when `emdash()`
 *   is registered, and the `@astrojs/sitemap` it wraps needs a route list at
 *   config time, which it cannot get from per-page `prerender` exports.
 * - EmDash serves its own `/sitemap.xml`, but that is built from database
 *   collections. Every public route here is a `src/pages/*.astro` file, so none
 *   of them appear in it. Hence a separate document, under a name its route
 *   patterns cannot claim.
 * - An Astro endpoint would have to be `prerender = true`, because `gitLastmod`
 *   shells out to `git log` and workerd has no git. That is now unremarkable —
 *   the public pages are all prerendered — but a route would still have to run
 *   during the build it is describing, and `public/` is written before the build
 *   reads it. Precedent, too: the toolchain generates the favicons there.
 *
 *   (This note previously claimed the first prerendered route fails to resolve
 *   Astro 7.1's markdown renderer to a wasm binding. That is no longer true —
 *   verified by prerendering the markdown-rendering legal pages — so it is not a
 *   reason to avoid prerendering anything.)
 *
 * Route derivation (the filesystem walk, the `/404`/`_`/`b-variant` filtering)
 * lives in `scripts/routes.mjs`, shared with `scripts/llms.mjs` so the two
 * documents can't silently list different URLs.
 */

const OUT = "public/pages-sitemap.xml";

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function writeSitemap({ root = process.cwd(), log = console.log } = {}) {
  // Resolves a URL to its source file's last commit date. Built once, because it
  // reads the whole history up front.
  const stamp = await gitLastmod({
    cwd: root,
    onWarn: (message) => log(`[sitemap] ${message}`),
  });

  const routes = await publicRoutes({ root });

  const entries = routes.map((route) => stamp({ url: new URL(route, CANONICAL_ORIGIN).href }));

  const undated = entries.filter((entry) => !entry.lastmod).length;
  if (undated > 0) {
    // Not fatal — a page committed for the first time in this very build has no
    // history yet. But it is worth saying, because the other cause is a shallow
    // CI clone, and that silently flattens every date instead of just this one.
    log(
      `[sitemap] ${undated}/${entries.length} routes have no <lastmod> (uncommitted, or a shallow clone)`,
    );
  }

  const urls = entries
    .map(({ url, lastmod }) => {
      const parts = [`    <loc>${escapeXml(url)}</loc>`];
      // Omit a missing lastmod rather than substituting "now": a wrong date is
      // worse than none, since `vitops search notify` diffs on it to decide what
      // actually changed.
      if (lastmod) parts.push(`    <lastmod>${escapeXml(lastmod)}</lastmod>`);
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");

  await writeFile(
    resolve(root, OUT),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    "utf8",
  );

  log(`[sitemap] ${OUT} — ${entries.length} routes`);
}
