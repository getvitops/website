/**
 * A/B layer 3 — structural (whole-page) B variants.
 *
 * A B page is a self-contained full page (own PineLayout, title, description)
 * at `src/_b/pages/<route>.astro`, mirroring the public route:
 *
 *   src/_b/pages/index.astro    → /
 *   src/_b/pages/pricing.astro  → /pricing
 *   src/_b/pages/x/index.astro  → /x   (equivalent to x.astro — don't create
 *                                       both; collision warns in dev and the
 *                                       last one wins)
 *
 * When a request's variant is "b" and a B page exists for the pathname,
 * `src/middleware.ts` internally rewrites (via `next(payload)` — never
 * `context.rewrite()`, which would re-run the EmDash middleware chain) to the
 * dispatcher route `src/pages/b-variant/[...path].astro`. The public URL
 * never changes; direct external hits to /b-variant/* are 404'd by the
 * middleware guard.
 *
 * One lazy `import.meta.glob` drives both sides: the middleware reads only
 * the key set (no page chunks are loaded), the dispatcher calls the loader.
 */

/** URL prefix of the internal dispatcher route. Never linked, never indexed. */
export const B_PREFIX = "/b-variant";

type PageModule = { default: unknown };
type Loader = () => Promise<PageModule>;

// Keys look like "../_b/pages/pricing.astro"; values are lazy import fns.
const modules = import.meta.glob<PageModule>("../_b/pages/**/*.astro");

/** Collapse duplicate slashes, strip the trailing slash (except root). */
export function normalizePathname(pathname: string): string {
  let p = pathname.replace(/\/{2,}/g, "/");
  if (p.length > 1 && p.endsWith("/")) p = p.replace(/\/+$/, "");
  return p || "/";
}

/** "../_b/pages/services/index.astro" → "/services"; ".../index.astro" → "/" */
function routeFromKey(key: string): string {
  let p = key.replace(/^.*_b\/pages\//, "").replace(/\.astro$/, "");
  if (p === "index") return "/";
  if (p.endsWith("/index")) p = p.slice(0, -"/index".length);
  return `/${p}`;
}

const bPages = new Map<string, Loader>();
for (const [key, loader] of Object.entries(modules)) {
  const route = routeFromKey(key);
  if (bPages.has(route) && import.meta.env.DEV) {
    console.warn(`[ab-pages] duplicate B page for ${route} (${key}); using last`);
  }
  bPages.set(route, loader);
}

export function hasBPage(pathname: string): boolean {
  return bPages.has(normalizePathname(pathname));
}

export function getBPageLoader(pathname: string): Loader | undefined {
  return bPages.get(normalizePathname(pathname));
}

/** Public pathname → internal dispatcher path ("/" → "/b-variant"). */
export function toBVariantPath(pathname: string): string {
  const p = normalizePathname(pathname);
  return p === "/" ? B_PREFIX : `${B_PREFIX}${p}`;
}
