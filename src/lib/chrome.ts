import { getMenuWithCacheHint, type Menu, type MenuItem } from "emdash";

/**
 * Site chrome (header nav, header button, footer columns) read from EmDash
 * menus, so editors change navigation in the admin (Menus) without a deploy.
 *
 * What an item *looks like* is decided here by which menu it sits in, not by a
 * per-item class — the admin's menu editor has no class field. `primary` items
 * render as nav links (children as the dropdown), `header_cta` items as the
 * `.cta` button, and each `footer_*` menu is one footer column headed by the
 * menu's label. `cssClasses` / `target` are still passed through when present
 * (set via the API or seed), as a developer escape hatch.
 *
 * Each menu has a code default, used only when the menu does not exist yet (a
 * fresh or not-yet-migrated database), so the site never renders without
 * navigation.
 */
export interface NavItem {
  label: string;
  href: string;
  classes?: string;
  target?: string;
  children: NavItem[];
}
export interface FooterColumn {
  name: string;
  heading: string;
  items: NavItem[];
}

const link = (label: string, href: string, children: NavItem[] = []): NavItem => ({
  label,
  href,
  children,
});

const DEFAULTS: Record<string, { label: string; items: NavItem[] }> = {
  primary: {
    label: "Primary",
    items: [
      link("Services", "/managed-it-services", [
        link("Managed IT services", "/managed-it-services"),
        link("Digital marketing", "/digital-marketing"),
      ]),
      link("Industries", "/industries"),
      link("Pricing", "/pricing"),
      link("About", "/about"),
    ],
  },
  header_cta: { label: "Header button", items: [link("Talk to us", "/#contact")] },
  footer_services: {
    label: "Services",
    items: [
      link("Managed IT services", "/managed-it-services"),
      link("Digital marketing", "/digital-marketing"),
      link("Industries", "/industries"),
      link("Pricing", "/pricing"),
    ],
  },
  footer_funding: {
    label: "Funding",
    items: [
      link("All programs", "/funding"),
      link("DMAP", "/funding/dmap"),
      link("RMPG", "/funding/rmpg"),
      link("BDC LIFT", "/funding/bdc-lift"),
    ],
  },
  footer_company: {
    label: "Company",
    items: [
      link("About", "/about"),
      link("Contact", "/contact"),
      link("hi@vitops.ca", "mailto:hi@vitops.ca"),
      link("Privacy policy", "/privacy"),
      link("Cookie notice", "/cookies"),
      link("Terms of service", "/terms"),
    ],
  },
};

const toItem = (item: MenuItem): NavItem => ({
  label: item.label,
  href: item.url,
  classes: item.cssClasses || undefined,
  target: item.target || undefined,
  children: (item.children ?? []).map(toItem),
});

/**
 * Carried by every page that renders through PineLayout, so one invalidation
 * purges the whole site. `POST /api/purge` (called after each deploy) uses it:
 * a deploy changes templates and hand-written copy, which a content publish
 * never purges.
 */
export const SITE_TAG = "vitops:site";

export async function getChrome() {
  const names = Object.keys(DEFAULTS);
  const results = await Promise.all(names.map((name) => getMenuWithCacheHint(name)));
  const tags = new Set<string>([SITE_TAG]);
  const menus = new Map<string, { label: string; items: NavItem[] }>();
  names.forEach((name, i) => {
    const { data, cacheHint } = results[i] as { data: Menu | null; cacheHint: { tags?: string[] } };
    for (const tag of cacheHint.tags ?? []) tags.add(tag);
    menus.set(
      name,
      data && data.items.length
        ? { label: data.label, items: data.items.map(toItem) }
        : DEFAULTS[name]!,
    );
  });

  const get = (name: string) => menus.get(name)!;
  const footer: FooterColumn[] = names
    .filter((n) => n.startsWith("footer_"))
    .map((name) => ({ name, heading: get(name).label, items: get(name).items }));

  return {
    primary: get("primary").items,
    cta: get("header_cta").items,
    footer,
    /** Pass to `Astro.cache.set()` so editing a menu purges the page. */
    cacheHint: { tags: [...tags] },
  };
}
