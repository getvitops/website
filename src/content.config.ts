/**
 * Build-time content collections.
 *
 * Separate from `src/live.config.ts`, which registers EmDash's database-backed
 * live collection — the two mechanisms coexist.
 *
 * `legal` is generated, not authored: `@getvitops/astro`'s `legal` option
 * renders src/content/legal/*.md from `site.json`'s `legal` block on every dev
 * start and build. Edit site.json, never the markdown — your changes there are
 * overwritten on the next build.
 *
 * The documents carry no frontmatter (each opens with its own `# H1`), so this
 * collection declares no schema; the pages supply their own title/description.
 */

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const legal = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/legal" }),
});

export const collections = { legal };
