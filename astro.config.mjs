import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import icon from "astro-iconset";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";
import { github } from "emdash/auth/providers/github";
import vitops from "@getvitops/astro";
import { vitopsEmdash } from "@getvitops/emdash";
// The Clarity project id lives in site.json, where the generated privacy policy
// also reads it. Importing it here keeps the tag and the disclosure from drifting.
// Since toolchain 3.0 the file is a three-section `Config` — designSystem /
// organization / site — so the site-level facts are one level down.
import config from "./site.json" with { type: "json" };
import { writeSitemap } from "./scripts/sitemap.mjs";

/**
 * Writes public/sitemap-pages.xml before the build reads `public/`.
 *
 * An integration rather than a `package.json` step because there are three
 * entry points into a build (`build`, `deploy`, `deploy:dev`) and only one of
 * them goes through `pnpm run build` — a prepended script would be missing from
 * the other two, silently. See scripts/sitemap.mjs for why this is not a route.
 */
const sitemap = {
  name: "vitops-website:sitemap",
  hooks: {
    "astro:build:start": async ({ logger }) => {
      await writeSitemap({ log: (message) => logger.info(message) });
    },
  },
};

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
  vite: {
    ssr: {
      optimizeDeps: {
        // Pre-bundle so it isn't discovered mid-render, which would trigger
        // a Vite dep re-optimization and break in-flight worker imports
        // under the Cloudflare dev runner (workerd).
        include: ["astro-iconset/components"],
      },
    },
  },
  integrations: [
    sitemap,
    react(),
    icon({
      // Only ship the Phosphor icons actually referenced in templates,
      // not the full @iconify-json/ph set (which adds megabytes to the
      // deployed worker bundle).
      include: {
        ph: [
          "chart-bar",
          "check-circle",
          "clock",
          "cloud",
          "code",
          "currency-dollar",
          "envelope",
          "globe",
          "heart",
          "lifebuoy",
          "lightning",
          "lock",
          "shield-check",
          "sparkle",
          "star",
          "users-three",
        ],
        // Brand logos rendered by the homepage animations (StackAnimation,
        // PresenceAnimation). Build-time SVGs — no runtime iconify CDN.
        "simple-icons": [
          "adp",
          "anthropic",
          "apple",
          "asana",
          "astro",
          "claude",
          "cloudflare",
          "ionos",
          "facebook",
          "google",
          "hubspot",
          "instagram",
          "linkedin",
          "microsoft",
          "microsoftazure",
          "microsoftbing",
          "openai",
          "quickbooks",
          "tiktok",
          "wordpress",
          "x",
          "youtube",
          "zendesk",
          "zoho",
        ],
      },
    }),
    emdash({
      authProviders: [github()],
      database: d1({ binding: "DB", session: "auto" }),
      storage: r2({ binding: "MEDIA" }),
      plugins: [
        // Vitops design-system blocks (image compare, copy snippet, banner,
        // disclosure, carousel). Default 'integration' script delivery:
        // PineLayout renders <Head /> from @getvitops/astro, which emits the
        // web-component runtime tags — so the plugin must not also inject
        // them via page fragments.
        vitopsEmdash(),
        {
          id: "marketing-blocks",
          version: "0.1.0",
          // Absolute file:// URL so the virtual emdash/plugins module
          // can resolve this at build time (relative paths fail because
          // the virtual module has no on-disk location to anchor them).
          entrypoint: new URL("./src/plugins/marketing-blocks/index.ts", import.meta.url).href,
        },
      ],
    }),
    vitops({
      // site.json is a three-section Config: `designSystem` (the tokens, at
      // themes.default), `organization` (the company), and `site` (locales,
      // environments, analytics, legal — the deployment's facts).
      // Naming it here is what lets `legal` below default its own input to it.
      site: { input: "site.json" },
      favicon: {
        source: "src/assets/vitops-mark.svg",
        name: "Vitops",
        themeColor: "#2f6f5e",
        backgroundColor: "#0c1116",
      },
      // inject: false — PineLayout imports the stylesheet, so EmDash's
      // /_emdash/admin routes don't inherit the design system.
      css: { format: "tailwind", inject: false, input: "site.json" },
      // Clarity's tag is emitted by <Analytics /> in PineLayout, which gates it
      // on the `analytics` consent category. strategy defaults to 'idle', so
      // nothing touches the critical path.
      analytics: { clarity: config.site.analytics.clarityId },
      // Opt-in: gated tags render as <script type="text/plain">, so a visitor
      // who has not accepted issues no request to Microsoft at all.
      //
      // Since 4.0 the banner is demand-driven: it appears when something asks
      // for a category, not on first visit. Here the only thing that asks is
      // the gated Clarity tag, at its `idle` strategy.
      //
      // `categories` is pinned because the default is ['analytics',
      // 'preferences'] and this site is dark-only with no colour-scheme toggle
      // — nothing ever writes a display preference, so offering the row would
      // ask about nothing and make the generated cookie notice disclose a
      // stored preference that does not exist. `marketing` is here for the
      // ad-click attribution `<Tracking />` demands.
      consent: {
        policyUrl: "/cookies",
        categories: ["analytics", "marketing"],
      },
      // Ad-click attribution. <Tracking /> in PineLayout's <head> captures a
      // click ID / UTMs off the landing URL into the first-party `_ac` cookie,
      // which src/pages/api/contact.ts reads back so an enquiry can be traced to
      // the ad that produced it.
      //
      // The capture is what raises the consent banner for `marketing`, and only
      // on an arrival that actually carried a click ID — an organic visitor has
      // nothing to attribute and is never asked. Reading the query string is not
      // storage, so the script itself is ungated; only the write waits.
      tracking: true,
      // Renders the privacy policy, cookie notice and terms from site.json's
      // `site.legal` block into src/content/legal. Requires `css` — the same Vite
      // plugin re-renders them when site.json changes.
      legal: {},
    }),
  ],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-body",
      weights: [400, 500, 600, 700],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: [400, 500, 600],
      fallbacks: ["monospace"],
    },
  ],
  devToolbar: { enabled: false },
});
