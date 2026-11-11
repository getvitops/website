# TODO

## Needs a person (admin access)

- [ ] **Set the `pages` collection URL pattern to `/{slug}`** on the local, dev and prod databases
      (admin, Content types, Pages). `seed/seed.json` already has `urlPattern: "/{slug}"`, but a seed
      only applies to an empty database. Until it is set, `/sitemap-pages.xml` lists `/pages/<slug>`
      (including a `/pages/home` that does not exist), which would submit dead URLs to search engines.
      Check afterwards: `curl <site>/sitemap-pages.xml` lists `/<slug>` and `/` for home.
      The build cannot warn about this, because the sitemap is served on demand, not prerendered.
