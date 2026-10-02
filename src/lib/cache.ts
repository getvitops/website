/**
 * Edge-cache lifetime for the CMS-backed (on-demand) pages. Safe to be long
 * because publishing purges the response's collection/entry tags (see
 * AGENTS.md, "CMS-backed pages").
 *
 * Applied per route with `Astro.cache.set(CMS_PAGE_CACHE)`, NOT through
 * `routeRules` in astro.config.mjs: rules are matched against the request
 * pathname, so a catch-all rule such as `/[...slug]` also matches `/_emdash/*`
 * and `/api/*` and caches their responses — including the admin's 302 to the
 * login page, which then redirected every visitor back to /login.
 */
export const CMS_PAGE_CACHE = { maxAge: 604800, swr: 86400 } as const;
