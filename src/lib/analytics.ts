/**
 * Microsoft Clarity gating (session recordings + heatmaps).
 *
 * Pure helpers only. The tag itself is emitted by `<Analytics />` from
 * `@getvitops/astro`, configured in `astro.config.mjs` from `site.json`'s
 * `site.analytics.clarityId` — one project id, read by both the tag and the
 * generated privacy policy. This module owns only the *when*.
 */

/**
 * Whether this build targets production.
 *
 * Baked in as a literal by `vite.define` in `astro.config.mjs` from the
 * `VITOPS_STAGE` environment variable, which only `deploy-prod.yml` sets.
 *
 * A build-time flag rather than the runtime hostname check this replaced. Public
 * pages are prerendered, so there is no request to read a hostname from: the old
 * check would resolve once during the build and bake that single answer into
 * every page. Worse, `site:` makes the build-time hostname `vitops.ca`, so it
 * would have resolved to *true* and shipped Clarity to dev.vitops.ca. The two
 * stages already run separate `astro build`s, so a build-time flag is the honest
 * expression of the same fact.
 *
 * Fails closed: anything other than an explicit "production" is non-production.
 */
export const isProdStage: boolean = import.meta.env.VITOPS_STAGE === "production";

/**
 * Whether to load Clarity, passed to `<Analytics enabled>`.
 *
 * Production stage only. dev.vitops.ca, *.workers.dev and localhost are us —
 * letting that traffic into the same project would pollute the heatmaps and burn
 * the recording quota on our own sessions. The `/_emdash/` guard covers CMS
 * preview renders, which are server-rendered and go through PineLayout like any
 * public page.
 *
 * This is the build-time half of `site.json`'s
 * `site.environments.<env>.analytics`, which records the same fact for the legal
 * disclosure.
 *
 * PineLayout gates the consent banner on this too: with opt-in consent and no
 * analytics off-production, a banner would ask permission for nothing.
 */
export function clarityEnabled(pathname: string): boolean {
  if (!isProdStage) return false;
  if (pathname.startsWith("/_emdash/")) return false;
  return true;
}
