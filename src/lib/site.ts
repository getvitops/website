/**
 * Host-level facts about the deployed site.
 *
 * The same bundle is deployed to production and to the dev worker — only the
 * wrangler config differs (see scripts/build-dev-wrangler.mjs) — so anything
 * that must behave differently per stage has to key off the request host at
 * runtime, not off a build-time env var.
 */

/** The only host that is production: indexed, and the only one that is tracked. */
export const PROD_HOST = "vitops.ca";
