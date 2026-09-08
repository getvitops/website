import { readdir } from "node:fs/promises";
import { relative, resolve } from "node:path";

import { routeFromPage } from "@getvitops/astro";

import config from "../site.json" with { type: "json" };

/**
 * Shared route derivation for `scripts/sitemap.mjs` and `scripts/llms.mjs`.
 *
 * Split out so both documents list the same 29 URLs by construction — two
 * independent walks of `src/pages` would eventually disagree, silently.
 *
 * `isPublicRoute` and `publicRoutes` are generic (they're the same
 * filesystem-walk primitive `routeFromPage` already serves) and are meant to
 * follow `scripts/llms.mjs` into `@getvitops/astro` once that generator is
 * promoted. `CANONICAL_ORIGIN` is the one site-specific value here and stays
 * behind in this file.
 */

/**
 * Read from the config rather than restated, because `site.seo.indexing.sitemapUrl`
 * — the URL `vitops search notify` fetches — is built on the same origin. A second
 * copy here could disagree with it, and the symptom would be a sitemap full of
 * URLs the notifier never looks at.
 */
export const CANONICAL_ORIGIN = config.site.domains.canonical;

const PAGES_DIR = "src/pages";

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
export function isPublicRoute(route) {
  if (route === "/404") return false;
  return !route.split("/").some((segment) => segment.startsWith("_") || segment === "b-variant");
}

/**
 * The route list is derived from the filesystem rather than written out, because
 * a hand-maintained list drifts silently — a new page is simply never submitted
 * and nothing fails.
 */
export async function publicRoutes({ root = process.cwd() } = {}) {
  return (await pageFiles(root))
    .map(routeFromPage)
    .filter((route) => route !== undefined)
    .filter(isPublicRoute)
    .sort();
}
