/**
 * Microsoft Clarity gating (session recordings + heatmaps).
 *
 * Pure helpers only. The tag itself is emitted by `<Analytics />` from
 * `@getvitops/astro`, configured in `astro.config.mjs` from `site.json`'s
 * `site.analytics.clarityId` — one project id, read by both the tag and the
 * generated privacy policy. This module owns only the *when*.
 */

import { PROD_HOST } from "./site";

/**
 * Whether to load Clarity for this request, passed to `<Analytics enabled>`.
 *
 * Production host only. dev.vitops.ca, *.workers.dev and localhost all render
 * the identical bundle, and their traffic is us — letting it into the same
 * project would pollute the heatmaps and burn the recording quota on our own
 * sessions. The `/_emdash/` guard covers CMS preview renders, which go through
 * PineLayout like any public page.
 *
 * This is the runtime half of `site.json`'s `site.environments.<env>.analytics`,
 * which records the same fact for the legal disclosure. It has to be a host
 * check rather than a build-time env var because one bundle serves both
 * stages — see `./site.ts`.
 *
 * PineLayout gates the consent banner on this too: with opt-in consent and no
 * analytics off-production, a banner would ask permission for nothing.
 */
export function clarityEnabled(hostname: string, pathname: string): boolean {
  if (hostname !== PROD_HOST) return false;
  if (pathname.startsWith("/_emdash/")) return false;
  return true;
}
