/**
 * Microsoft Clarity configuration (session recordings + heatmaps).
 *
 * Pure helpers only — the actual tag is loaded by
 * `src/components/Analytics.astro`, which PineLayout renders in <head>.
 */

import { PROD_HOST } from "./site";

/**
 * Clarity project id.
 *
 * Deliberately a repo constant, not an env var: it is not a secret (it ships
 * in the tag URL in the HTML of every page), and neither deploy workflow
 * passes any `PUBLIC_*` var to `astro build` — so an env var would silently
 * resolve to "" in production, which is a worse failure than a visible string.
 *
 * Set to "" to turn Clarity off everywhere.
 */
export const CLARITY_PROJECT_ID = "xp2ujotyhg";

/**
 * Whether to load Clarity for this request.
 *
 * Production host only. dev.vitops.ca, *.workers.dev and localhost all render
 * the identical bundle, and their traffic is us — letting it into the same
 * project would pollute the heatmaps and burn the recording quota on our own
 * sessions. The `/_emdash/` guard covers CMS preview renders, which go through
 * PineLayout like any public page.
 */
export function clarityEnabled(hostname: string, pathname: string): boolean {
  if (!CLARITY_PROJECT_ID) return false;
  if (hostname !== PROD_HOST) return false;
  if (pathname.startsWith("/_emdash/")) return false;
  return true;
}
