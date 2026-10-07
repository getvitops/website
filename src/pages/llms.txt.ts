// Live /llms.txt (llmstxt.org). Generated per request from the CMS collections
// plus the hand-written routes, then edge-cached and tagged with the collections
// so a publish refreshes it.
//
// Hand-written pages have no title/description to read at build any more (they
// render on demand), so each is fetched from this same site and its own <head>
// is read — llms.txt then quotes whatever the page actually serves and cannot
// disagree with it. A page that fails to answer is left out rather than failing
// the whole file.
import type { APIRoute } from "astro";
import { getEmDashCollection, getEmDashEntry } from "emdash";

import config from "../../site.json" with { type: "json" };
import { CMS_PAGE_CACHE } from "../lib/cache";
import { pageMetaFromHtml, renderLlmsTxt, type LlmsPage } from "../lib/llms";

export const prerender = false;

const origin = config.site.domains.canonical;
const siteName = config.organization.name;

const START_HERE = new Set(["/", "/about", "/pricing", "/contact", "/business-health-check"]);
const LEGAL = new Set(["/privacy", "/cookies", "/terms"]);
const OTTAWA_PAGE = /^\/[a-z0-9-]+-ottawa$/;

/** collection → public path of an entry (mirrors each collection's urlPattern) */
const COLLECTIONS = {
  pages: (slug: string) => `/${slug}`,
  managed_it_services: (slug: string) => `/managed-it-services/${slug}`,
  industries: (slug: string) => `/industries/${slug}`,
  funding_programs: (slug: string) => `/funding/${slug}`,
} as const;

/** `src/pages/**.astro` files with a fixed route, as public paths. */
const handWritten = Object.keys(import.meta.glob("./**/*.astro"))
  .map((file) =>
    file
      .replace(/^\.\//, "")
      .replace(/\.astro$/, "")
      .replace(/(^|\/)index$/, ""),
  )
  .filter(
    (path) => path !== "404" && !path.split("/").some((s) => s.startsWith("_") || s.includes("[")),
  )
  .map((path) => `/${path}`);

export const GET: APIRoute = async ({ url, cache }) => {
  const tags = new Set<string>();
  const pages: LlmsPage[] = [];

  // The collection query omits SEO fields, so each entry is read individually
  // (same query the page itself makes; ~20 cheap D1 reads on a cached route).
  for (const [collection, toRoute] of Object.entries(COLLECTIONS)) {
    const name = collection as keyof typeof COLLECTIONS;
    const { entries, cacheHint } = await getEmDashCollection(name);
    for (const tag of cacheHint.tags ?? []) tags.add(tag);
    const full = await Promise.all(entries.map((e) => getEmDashEntry(name, e.id)));
    for (const { entry } of full) {
      const data = entry?.data as { title?: string; seo?: { description?: string } } | undefined;
      if (!entry || !data?.title || !data.seo?.description) continue;
      const route = toRoute(entry.id);
      pages.push({
        route,
        title: data.title,
        description: data.seo.description,
        url: new URL(route, origin).href,
      });
    }
  }

  const fetched = await Promise.all(
    handWritten.map(async (route) => {
      try {
        const res = await fetch(new URL(route, url));
        if (!res.ok) return undefined;
        const meta = pageMetaFromHtml(await res.text(), siteName);
        return meta && ({ route, ...meta, url: new URL(route, origin).href } satisfies LlmsPage);
      } catch {
        return undefined;
      }
    }),
  );
  for (const page of fetched) if (page) pages.push(page);

  // Stable order within a section.
  pages.sort((a, b) => a.route.localeCompare(b.route));

  const homepage = pages.find((p) => p.route === "/");
  const body = renderLlmsTxt(
    {
      siteName,
      summary: homepage?.description ?? config.organization.name,
      blurb:
        "Vitops is based in Ottawa, Ontario and works with businesses across Ontario " +
        "and Canada. Contact: hi@vitops.ca.",
      sections: [
        { heading: "Start here", match: (r) => START_HERE.has(r) },
        {
          heading: "Services",
          match: (r) => r === "/managed-it-services" || r === "/digital-marketing",
        },
        {
          heading: "Managed IT — software we run",
          match: (r) => r.startsWith("/managed-it-services/"),
        },
        {
          heading: "Industries",
          match: (r) => r === "/industries" || r.startsWith("/industries/"),
        },
        {
          heading: "Government funding",
          match: (r) => r === "/funding" || r.startsWith("/funding/"),
        },
        { heading: "Ottawa", match: (r) => OTTAWA_PAGE.test(r) },
        { heading: "Optional", match: (r) => LEGAL.has(r) },
      ],
    },
    pages,
  );

  cache.set({ tags: [...tags] });
  cache.set(CMS_PAGE_CACHE);
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
};
