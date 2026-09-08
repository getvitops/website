import { readFile, writeFile } from "node:fs/promises";

/**
 * Generates `llms.txt` (llmstxt.org) from a site's already-built, prerendered
 * HTML — an index of every public route with its real title and description,
 * grouped into sections.
 *
 * PROTOTYPE FOR `@getvitops/astro`. This file is deliberately site-agnostic —
 * it imports nothing from `site.json`, knows no Vitops URL, string, or route
 * pattern — because it is staged to move into the `@getvitops/astro` package
 * (which already hosts the sibling sitemap primitives `routeFromPage` and
 * `gitLastmod`) so every site on the toolchain gets it. Everything specific to
 * a given site — origin, name, blurb, section rules — arrives as options from
 * the caller (see `astro.config.mjs`). Do not import config here; do not add
 * a Vitops-specific fallback "for convenience." When EmDash ships llms.txt
 * support, or Cloudflare's AI Index reaches GA, this file is meant to be
 * deleted outright, not extended.
 *
 * Why read the *built HTML* rather than page source at `astro:build:start`,
 * the way `scripts/sitemap.mjs` does: titles and descriptions are not
 * reliably readable from a page's own source. Some pages pass them as props
 * through wrapper components (several routes in this codebase do), and a
 * layout may append a site name read from a database at render time. The
 * built HTML is what the site actually serves — llms.txt cannot then disagree
 * with it.
 *
 * @typedef {object} GetvitopsLlmsSection
 * @property {string} heading
 * @property {(route: string) => boolean} match
 *
 * @typedef {object} GetvitopsLlmsOptions
 * @property {string} origin - Canonical origin, e.g. "https://example.com".
 * @property {string} siteName - The H1, and the suffix stripped from a page's
 *   `<title>` when no `og:title` is present (`"${title} — ${siteName}"`).
 * @property {string} [summary] - The blockquote under the H1. Defaults to the
 *   homepage's own meta description.
 * @property {string} [blurb] - Free prose rendered after the summary.
 * @property {GetvitopsLlmsSection[]} sections - Ordered; first match wins.
 *   Routes matching none are filed under a trailing "Other" section, which is
 *   still rendered before a section literally named "Optional" (the
 *   llmstxt.org convention for content a context-limited reader may skip) so
 *   an unmatched route is never silently marked skippable.
 * @property {string[]} [routes] - Defaults to every route `getRoutes()` finds.
 */

const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(value) {
  return value
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, name) => ENTITIES[name])
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/\s+/g, " ")
    .trim();
}

function headOf(html) {
  const end = html.indexOf("</head>");
  return end === -1 ? html : html.slice(0, end);
}

/** Maps a meta tag's `name` or `property` attribute to its `content`. */
function metaTags(head) {
  const tags = new Map();
  for (const match of head.matchAll(/<meta\b([^>]*)>/gi)) {
    const attrs = match[1];
    const name = /\bname=["']([^"']+)["']/i.exec(attrs)?.[1];
    const property = /\bproperty=["']([^"']+)["']/i.exec(attrs)?.[1];
    const content = /\bcontent=["']([^"']*)["']/i.exec(attrs)?.[1];
    if (content === undefined) continue;
    if (name) tags.set(name, decodeEntities(content));
    if (property) tags.set(property, decodeEntities(content));
  }
  return tags;
}

function titleOf(head) {
  return /<title>(.*?)<\/title>/is.exec(head)?.[1];
}

/**
 * Resolves the built HTML file for a route, honouring Astro's "directory"
 * build format (`/x/y` → `x/y/index.html`, `/` → `index.html`).
 */
function htmlFileFor(route, dir) {
  const path = route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`;
  return new URL(path, dir);
}

function pageMeta(html, route, siteName) {
  const head = headOf(html);
  const meta = metaTags(head);
  const rawTitle = titleOf(head);

  const title =
    meta.get("og:title") ??
    (rawTitle && rawTitle.endsWith(` — ${siteName}`)
      ? rawTitle.slice(0, -` — ${siteName}`.length)
      : rawTitle);

  if (!title) {
    throw new Error(`[llms] ${route}: no og:title and no usable <title> — refusing to publish`);
  }

  const description = meta.get("description");
  if (!description) {
    throw new Error(`[llms] ${route}: no <meta name="description"> — refusing to publish`);
  }

  return { title: decodeEntities(title), description };
}

function escapeLinkText(value) {
  return value.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
}

function sectionFor(route, sections) {
  return sections.find((section) => section.match(route))?.heading;
}

function render({ siteName, summary, blurb, sectionOrder, pagesBySection }) {
  const lines = [`# ${siteName}`, "", `> ${summary}`];
  if (blurb) lines.push("", blurb);

  for (const heading of sectionOrder) {
    const pages = pagesBySection.get(heading);
    if (!pages || pages.length === 0) continue;
    lines.push("", `## ${heading}`, "");
    for (const { title, url, description } of pages) {
      lines.push(`- [${escapeLinkText(title)}](${url}): ${description}`);
    }
  }

  return lines.join("\n") + "\n";
}

/**
 * @param {GetvitopsLlmsOptions} options
 * @param {{ dir: URL, root?: string, log?: (message: string) => void, publicRoutes: () => Promise<string[]> }} context
 */
export async function writeLlmsTxt(options, { dir, log = console.log, publicRoutes }) {
  const { origin, siteName, sections, routes: routesOption } = options;

  const routes = routesOption ?? (await publicRoutes());
  if (routes.length === 0) {
    throw new Error("[llms] zero public routes — refusing to publish an empty llms.txt");
  }

  const pages = await Promise.all(
    routes.map(async (route) => {
      const file = htmlFileFor(route, dir);
      let html;
      try {
        html = await readFile(file, "utf8");
      } catch (error) {
        throw new Error(
          `[llms] ${route}: expected prerendered HTML at ${file} — was \`export const prerender = true\` removed?`,
          { cause: error },
        );
      }
      const { title, description } = pageMeta(html, route, siteName);
      return { route, title, description, url: new URL(route, origin).href };
    }),
  );

  const homepage = pages.find((p) => p.route === "/");
  const summary = options.summary ?? homepage?.description;
  if (!summary) {
    throw new Error("[llms] no `summary` option and no homepage description to default to");
  }

  const sectionOrder = [...sections.map((s) => s.heading), "Other"];
  const pagesBySection = new Map();

  for (const page of pages) {
    const heading = sectionFor(page.route, sections) ?? "Other";
    if (heading === "Other") {
      log(`[llms] ${page.route} matched no section — filed under "Other"`);
    }
    if (!pagesBySection.has(heading)) pagesBySection.set(heading, []);
    pagesBySection.get(heading).push(page);
  }

  // "Optional" (the llmstxt.org convention for skippable content) must render
  // last, after "Other" — an unmatched route must never end up looking
  // deliberately marked skippable.
  const optionalIndex = sectionOrder.indexOf("Optional");
  if (optionalIndex !== -1 && optionalIndex !== sectionOrder.length - 1) {
    sectionOrder.push(sectionOrder.splice(optionalIndex, 1)[0]);
  }

  const text = render({ siteName, summary, blurb: options.blurb, sectionOrder, pagesBySection });
  await writeFile(new URL("./llms.txt", dir), text, "utf8");

  const sectionCount = sectionOrder.filter((h) => pagesBySection.has(h)).length;
  log(`[llms] llms.txt — ${pages.length} routes across ${sectionCount} sections`);
}

/**
 * Astro integration factory: writes llms.txt at `astro:build:done`, once the
 * prerendered HTML exists to read. `dir` there is the Workers Assets root
 * (`dist/client/`) — a static file there is served ahead of any Worker route,
 * the same way `public/robots.txt` already wins over EmDash's own injected
 * `/robots.txt` route.
 *
 * @param {GetvitopsLlmsOptions & { publicRoutes: () => Promise<string[]> }} options
 */
export function llmsTxt({ publicRoutes, ...options }) {
  return {
    name: "vitops-website:llms-txt",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        await writeLlmsTxt(options, {
          dir,
          log: (message) => logger.info(message),
          publicRoutes,
        });
      },
    },
  };
}
