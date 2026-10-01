import { getEmDashCollection } from "emdash";

/**
 * The industry verticals, read from the `industries` collection and shared
 * between `src/pages/industries/index.astro` (the routing/grid page) and
 * `IndustryPage.astro` (which links each vertical to its siblings).
 *
 * One query, one copy: a hand-kept second list would drift from the entries
 * silently. `card_title`/`card_body` are the grid-card copy; `sort_order`
 * fixes the order. `cacheHint` is returned so the calling page can tag its
 * cached response — publishing any industry then purges every page that lists
 * it.
 */
export interface Industry {
  slug: string;
  name: string;
  body: string;
}

export async function getIndustries() {
  const { entries, cacheHint } = await getEmDashCollection("industries", {
    orderBy: { sort_order: "asc" },
  });
  const industries: Industry[] = entries.map((entry) => ({
    slug: entry.id,
    name: entry.data.card_title ?? entry.data.eyebrow ?? entry.id,
    body: entry.data.card_body ?? "",
  }));
  return { industries, cacheHint };
}
