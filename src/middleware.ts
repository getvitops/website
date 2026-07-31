import { defineMiddleware } from "astro:middleware";

/**
 * Project middleware.
 *
 * Runs alongside EmDash's injected middleware — Astro composes project
 * middleware with integration middleware, so this does not replace it.
 *
 * This used to host the A/B variant system (sticky a/b assignment, the
 * `/b-variant` layer-3 dispatcher, `x-ab-variant` attribution). That was
 * removed while traffic is too low for an experiment to resolve; only variant
 * A is served now. To bring it back, restore the deletion commit — it took
 * `src/_b/`, `src/pages/b-variant/`, `src/lib/variant.ts` and
 * `src/lib/ab-pages.ts` with it.
 */

/** The only host that should be indexed. Everything else (dev.vitops.ca,
 *  *.workers.dev, previews) gets X-Robots-Tag: noindex. */
const PROD_HOST = "vitops.ca";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const response = await next();

  // Keep every non-prod host out of search indexes (dev-site auth is a TODO).
  if (url.hostname !== PROD_HOST) {
    response.headers.set("x-robots-tag", "noindex, nofollow");
  }

  // Retained from the A/B era. No longer required for correctness now that
  // HTML is variant-independent, but EmDash pages can carry session-dependent
  // content, so relaxing this is a deliberate caching decision rather than a
  // side effect of removing the experiment.
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("text/html") && !response.headers.has("cache-control")) {
    response.headers.set("cache-control", "private, no-store");
  }

  return response;
});
