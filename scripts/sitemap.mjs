import { readdir, writeFile } from "node:fs/promises";
import { relative, resolve } from "node:path";

import { gitLastmod, routeFromPage } from "@getvitops/astro";

import config from "../site.json" with { type: "json" };

/**
 * Writes `public/sitemap-pages.xml` — the sitemap for this site's hand-authored
 * pages — as a build step.
 *
 * Why a build step rather than a route:
 *
 * - The integration's `sitemap` option is skipped with a warning when `emdash()`
 *   is registered, and the `@astrojs/sitemap` it wraps enumerates *prerendered*
 *   routes only. This site is `output: "server"`, so it would list nothing.
 * - EmDash serves its own `/sitemap.xml`, but that is built from database
 *   collections. Every public route here is a `src/pages/*.astro` file, so none
 *   of them appear in it. Hence the separate name — `/sitemap.xml` is taken.
 * - An Astro endpoint would have to be `prerender = true`, because `gitLastmod`
 *   shells out to `git log` and workerd has no git. But introducing the site's
 *   first prerendered route creates a second build target, and that target fails
 *   to resolve Astro 7.1's markdown renderer (`satteri`) to a wasm binding.
 *   Writing the file into `public/` sidesteps the whole question, and has
 *   precedent: the toolchain already generates the favicons there.
 *
 * The route list is derived from the filesystem rather than written out, because
 * a hand-maintained list drifts silently — a new page is simply never submitted
 * and nothing fails.
 */

/**
 * Read from the config rather than restated, because `site.seo.indexing.sitemapUrl`
 * — the URL `vitops search notify` fetches — is built on the same origin. A second
 * copy here could disagree with it, and the symptom would be a sitemap full of
 * URLs the notifier never looks at.
 */
const CANONICAL_ORIGIN = config.site.domains.canonical;

const PAGES_DIR = "src/pages";
const OUT = "public/sitemap-pages.xml";

async function pageFiles(root) {
  const dir = resolve(root, PAGES_DIR);
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".astro"))
    .map((entry) => `/${relative(root, resolve(entry.parentPath, entry.name))}`);
}

/**
 * Routes that exist but must not be indexed.
 *
 * `/404` is an error page. `/b-variant/*` is the A/B layer-3 dispatcher, which
 * 404s on a direct hit and must never be linked (see CLAUDE.md). A leading
 * underscore on any segment means Astro does not route the file at all — the
 * `src/pages/industries/_*.astro` partials — but a filesystem walk still finds
 * them, so they are filtered here rather than assumed away.
 */
function isPublicRoute(route) {
  if (route === "/404") return false;
  return !route.split("/").some((segment) => segment.startsWith("_") || segment === "b-variant");
}

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

  const routes = (await pageFiles(root))
    .map(routeFromPage)
    .filter((route) => route !== undefined)
    .filter(isPublicRoute)
    .sort();

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
