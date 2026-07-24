import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import icon from "astro-iconset";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";
import { github } from "emdash/auth/providers/github";
import vitops from "@getvitops/astro";
import { vitopsEmdash } from "@getvitops/emdash";

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
      favicon: {
        source: "src/assets/vitops-mark.svg",
        name: "Vitops",
        themeColor: "#2f6f5e",
        backgroundColor: "#0c1116",
      },
      // inject: false — PineLayout imports the stylesheet, so EmDash's
      // /_emdash/admin routes don't inherit the design system.
      css: { format: "tailwind", inject: false },
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
