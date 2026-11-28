# TODO

## Cutover to dev (PR getvitops/website#15, `cutover-v2` into `dev`)

CI passes. Merging triggers Deploy dev, which will probably fail before deploying anything. Nothing live changes either way.

- [ ] **Set the `DEV_D1_ID` repo secret** to a fresh D1 (`wrangler d1 create vitops-ca-v2-dev`). The repo only has the old
      `VITOPS_DEV_D1_ID`. Do not point it at the old dev D1: the migrations would run on old data and the seed would not apply.
- [ ] **Dev deploy runs the same `prepare-db` step that timed out in CI**
      ([design-system#25](https://github.com/getvitops/design-system/issues/25)). `ci.yml` works around it with a retry;
      `deploy-dev.yml` and `deploy-prod.yml` still use the reusable workflows. Apply the same workaround there, or wait for the fix.
- [ ] **The reusable deploy reads `site.json`**, which this repo does not have
      ([design-system#26](https://github.com/getvitops/design-system/issues/26)). Expect the image-transform step to fail until fixed.
- [ ] **`vitops report` over-redacts the toolchain name**
      ([design-system#27](https://github.com/getvitops/design-system/issues/27)); restore the name by hand when filing.
- [ ] Review what the cutover dropped from the old `dev`: `promote-content.yml`, `promote-schema.yml`, `refresh-dev.yml`, the old
      `scripts/`, and `content-plan/` (still in history).
- [ ] Before promoting to `main`: the new `wrangler.jsonc` has no `vitops.ca` custom domain route and different D1/R2 names from
      the live site. Review that deploy separately.

## Open (no admin access needed)

- [x] **`/dashboard` axe `color-contrast`: an audit artifact, not a real failure** (checked 2026-11-27).
      The dashboard mock is a `fade-in slide-up animate-view` element below the fold, so at audit time its opacity is
      near 0 and axe reads foreground `#161d28` on background `#141b26` (ratio 1.02). Evidence: with
      `reducedMotion: reduce` or animations forced to their end state axe passes; with the element scrolled into view
      it passes (opacity 1); only a load-time scan fails. A visitor sees it settled. Not rebuilt on 17c35d7 to compare
      (too heavy), but the mechanism is not alpha.15-specific. **UPSTREAM candidate:** `vitops audit` should scan after
      animations settle (emulate reduced motion, or scroll each `.animate-view` into view) so a fade-in does not fail the
      run; until then `/dashboard` and any page with a late fade-in can fail the audit spuriously.
- [ ] **Live content edit:** the "Learn more" links on `/business-profiles` and `/reviews-email` now have
      descriptive labels in `seed/seed.json` (Lighthouse `link-text`, SEO 92); apply the same in the admin on
      dev and prod, since a seed only applies to an empty database.
- [ ] Optional: adopt `fade-slide-journey` (emitted by the Tailwind format since alpha.15) in place of
      `fade-in slide-up animate-view`; a visual change, see UPSTREAM.md Motion.

## Needs a person (admin access)

- [ ] **Set the `pages` collection URL pattern to `/{slug}`** on the local, dev and prod databases
      (admin, Content types, Pages). `seed/seed.json` already has `urlPattern: "/{slug}"`, but a seed
      only applies to an empty database. Until it is set, `/sitemap-pages.xml` lists `/pages/<slug>`
      (including a `/pages/home` that does not exist), which would submit dead URLs to search engines.
      Check afterwards: `curl <site>/sitemap-pages.xml` lists `/<slug>` and `/` for home.
      The build cannot warn about this, because the sitemap is served on demand, not prerendered.

- [ ] **Google call tracking (website call conversions).** Not configured: `vitops.json` has no `site.ads` or
      `site.tracking` yet. When the Google Ads account exists: 1. In Google Ads create a conversion action of type _Calls from a phone number on your website_ (separate
      from the tap action) and note its label. 2. Set `site.tracking.enabled: true` and
      `site.ads.google: { pixelId: "AW-…", callTracking: { label: "…", number: "613-518-7984" } }`.
      The number must match the `tel:` links on the site (any formatting of the same digits works). 3. If `conversionLabel.call` is also set, make one of the two actions secondary in Google Ads, or a call
      counts twice. 4. Link Search Console for verification; a swapped number blocks page-scan verification. 5. Add the call-tracking provider (if any) to `site.legal.privacyPolicy.processors`, then run
      `vp exec vitops ads lint`.
      For other platforms (Meta, Microsoft, LinkedIn) use `site.tracking.phoneNumbers` with numbers from a
      provider such as CallRail. Details: `vitops-ads` skill, `call-tracking.md`.
