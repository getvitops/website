// Snapshots the published pages, industries, funding programs and menus of a
// running EmDash site into seed/ as reviewable JSON — the inverse of
// sync-pages.mjs / sync-menus.mjs. Once editors work in the admin, git is a
// backup and a diff of what changed, not the source: run this (the
// promote-content workflow does) and commit the result.
//
//   EMDASH_TOKEN=... node scripts/export-content.mjs <site-url>
//   (localhost with no token uses the dev bypass)
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

import { COLLECTIONS, MENUS, connect, menuShape } from "./lib/emdash-rest.mjs";

const base = process.argv[2];
if (!base) throw new Error("usage: export-content.mjs <site-url>");
const site = await connect(base, process.env.EMDASH_TOKEN);

const nonEmpty = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && v !== false),
  );
const write = (path, value) => writeFileSync(path, JSON.stringify(value, null, 2) + "\n");

for (const collection of COLLECTIONS) {
  const dir = `seed/${collection}`;
  mkdirSync(dir, { recursive: true });
  const slugs = new Set();
  for (const item of await site.listPublished(collection)) {
    const entry = await site.getEntry(collection, item.id);
    const { title, ...rest } = entry.data;
    const seo = entry.seo && nonEmpty(entry.seo);
    write(`${dir}/${entry.slug}.json`, {
      title,
      ...(seo && Object.keys(seo).length && { seo }),
      ...nonEmpty(rest),
    });
    slugs.add(`${entry.slug}.json`);
  }
  // An entry deleted on the site should disappear from the snapshot too.
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".json") && !slugs.has(f))) {
    rmSync(`${dir}/${f}`);
    console.log(`removed ${dir}/${f}`);
  }
  console.log(`${collection}: ${slugs.size} entr${slugs.size === 1 ? "y" : "ies"}`);
}

const menus = {};
for (const name of MENUS) {
  const menu = await site.getMenu(name);
  if (menu) menus[name] = menuShape(menu);
}
write("seed/menus.json", menus);
console.log(`menus: ${Object.keys(menus).length}`);
