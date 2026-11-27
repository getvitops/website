# TODO

## Open (no admin access needed)

- [ ] **`/dashboard` axe `color-contrast` (25 nodes)** in `vitops audit` on alpha.15. Computed colours of the flagged
      elements are high contrast (`rgb(180,188,200)` on `rgb(26,34,48)`), so this looks like a mid-animation
      reading (`animate-view` opacity) rather than a real miss; confirm with a reduced-motion run before fixing.
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
