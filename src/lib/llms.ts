/**
 * llms.txt (llmstxt.org) rendering, site-agnostic: no site.json import, no
 * Vitops route pattern. Everything specific to the site (origin, name, blurb,
 * which section a route belongs in) arrives as options from the route that
 * calls it, src/pages/llms.txt.ts. It is shaped to move into `@getvitops/astro`
 * unchanged, and to be deleted outright if EmDash or Cloudflare's AI Index
 * ships this itself.
 *
 * It used to run at build over the prerendered HTML. Pages now render on demand
 * from EmDash, so there is no HTML at build time and the file is generated live
 * (and edge-cached, tagged so a publish refreshes it).
 */
export interface LlmsSection {
  heading: string;
  match: (route: string) => boolean;
}
export interface LlmsPage {
  route: string;
  title: string;
  description: string;
  url: string;
}
export interface LlmsOptions {
  siteName: string;
  summary: string;
  blurb?: string;
  /** Ordered; first match wins. Unmatched routes go under "Other". */
  sections: LlmsSection[];
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(value: string): string {
  return value
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, name: string) => ENTITIES[name] ?? "")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/\s+/g, " ")
    .trim();
}

/** Title and description of a served page, read from its own HTML head. */
export function pageMetaFromHtml(
  html: string,
  siteName: string,
): { title: string; description: string } | undefined {
  const end = html.indexOf("</head>");
  const head = end === -1 ? html : html.slice(0, end);
  const tags = new Map<string, string>();
  for (const match of head.matchAll(/<meta\b([^>]*)>/gi)) {
    const attrs = match[1] ?? "";
    const key =
      /\bname=["']([^"']+)["']/i.exec(attrs)?.[1] ??
      /\bproperty=["']([^"']+)["']/i.exec(attrs)?.[1];
    const content = /\bcontent=["']([^"']*)["']/i.exec(attrs)?.[1];
    if (key && content !== undefined) tags.set(key, decodeEntities(content));
  }
  const rawTitle = /<title>(.*?)<\/title>/is.exec(head)?.[1];
  const suffix = ` — ${siteName}`;
  const title =
    tags.get("og:title") ??
    (rawTitle && decodeEntities(rawTitle).endsWith(suffix)
      ? decodeEntities(rawTitle).slice(0, -suffix.length)
      : rawTitle && decodeEntities(rawTitle));
  const description = tags.get("description");
  if (!title || !description) return undefined;
  return { title: decodeEntities(title), description };
}

const escapeLinkText = (value: string) => value.replace(/\[/g, "\\[").replace(/\]/g, "\\]");

export function renderLlmsTxt(options: LlmsOptions, pages: LlmsPage[]): string {
  const { siteName, summary, blurb, sections } = options;
  const order = [...sections.map((s) => s.heading), "Other"];
  // "Optional" (the llmstxt.org convention for skippable content) renders last,
  // after "Other", so an unmatched route never looks deliberately skippable.
  const optional = order.indexOf("Optional");
  if (optional !== -1 && optional !== order.length - 1) order.push(order.splice(optional, 1)[0]!);

  const bySection = new Map<string, LlmsPage[]>();
  for (const page of pages) {
    const heading = sections.find((s) => s.match(page.route))?.heading ?? "Other";
    bySection.set(heading, [...(bySection.get(heading) ?? []), page]);
  }

  const lines = [`# ${siteName}`, "", `> ${summary}`];
  if (blurb) lines.push("", blurb);
  for (const heading of order) {
    const group = bySection.get(heading);
    if (!group?.length) continue;
    lines.push("", `## ${heading}`, "");
    for (const { title, url, description } of group) {
      lines.push(`- [${escapeLinkText(title)}](${url}): ${description}`);
    }
  }
  return lines.join("\n") + "\n";
}
