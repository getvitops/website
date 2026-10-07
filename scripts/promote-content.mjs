// Promotes published content and menus from one EmDash site to another
// (staging dev.vitops.ca → prod vitops.ca). Dry-run unless --apply.
//
//   EMDASH_TOKEN_FROM=... EMDASH_TOKEN_TO=... \
//   node scripts/promote-content.mjs --from https://dev.vitops.ca --to https://vitops.ca \
//        [--apply] [--force] [scope ...]
//
// scope: `menus`, a collection (`pages`), or `collection:slug`; none = every
// page-building collection and every menu. Only what is *published* on the
// source moves (a pending draft on staging stays there), and only the collections
// listed in lib/emdash-rest.mjs — never `posts` or anything else, so prod-edited
// content such as blog posts is untouched.
//
// Order of operations for a release is code/schema first, then this (docs/RUNBOOK.md):
// the target must already have the collection fields and block types.
//
// Drift guard: an entry that was edited on the target *after* it was last edited
// on the source is skipped, not overwritten, unless --force. Staging is meant to
// be the only place these pages change, so that situation means someone edited
// prod directly and their change would be lost.
//
// Writes go through the REST API, which purges the edge cache tags of whatever it
// touches, so promoted pages go live without a manual purge.
import {
  COLLECTIONS,
  MENUS,
  connect,
  mediaReference,
  menuShape,
  stable,
} from "./lib/emdash-rest.mjs";

const args = process.argv.slice(2);
const flag = (name) => (args.includes(name) ? (args.splice(args.indexOf(name), 1), true) : false);
const value = (name) => (args.includes(name) ? args.splice(args.indexOf(name), 2)[1] : undefined);
const from = value("--from");
const to = value("--to");
const apply = flag("--apply");
const force = flag("--force");
if (!from || !to)
  throw new Error(
    "usage: promote-content.mjs --from <url> --to <url> [--apply] [--force] [scope ...]",
  );
if (from === to) throw new Error("--from and --to are the same site");

const scopes = args.length ? args : [...COLLECTIONS, "menus"];
const wantsMenus = scopes.includes("menus");
const collectionScopes = new Map();
for (const s of scopes.filter((s) => s !== "menus")) {
  const [collection, slug] = s.split(":");
  if (!COLLECTIONS.includes(collection))
    throw new Error(`unknown scope "${s}" (collections: ${COLLECTIONS.join(", ")}, menus)`);
  collectionScopes.set(
    collection,
    slug ? [...(collectionScopes.get(collection) ?? []), slug] : "all",
  );
}

const src = await connect(from, process.env.EMDASH_TOKEN_FROM);
const dst = await connect(to, process.env.EMDASH_TOKEN_TO);
console.log(`${apply ? "PROMOTING" : "DRY RUN"}: ${from} -> ${to}\n`);

const counts = { created: 0, updated: 0, same: 0, skipped: 0, failed: 0 };
const seoOf = (seo) =>
  seo
    ? Object.fromEntries(Object.entries(seo).filter(([, v]) => v !== null && v !== false))
    : undefined;

for (const [collection, which] of collectionScopes) {
  const targetFields = new Set(await dst.fieldSlugs(collection));
  for (const item of await src.listPublished(collection)) {
    if (which !== "all" && !which.includes(item.slug)) continue;
    const label = `${collection}/${item.slug}`;
    try {
      const full = await src.getEntry(collection, item.id);
      if (mediaReference(full.data))
        throw new Error("references uploaded media, which promote-content cannot copy yet");

      const data = Object.fromEntries(
        Object.entries(full.data).filter(([k]) => targetFields.has(k)),
      );
      const dropped = Object.keys(full.data).filter((k) => !targetFields.has(k));
      if (dropped.length)
        console.log(
          `  ${label}: target has no field(s) ${dropped.join(", ")} — run promote-schema first if they matter`,
        );
      const seo = seoOf(full.seo);

      const existing = await dst.getEntry(collection, item.slug);
      if (
        existing &&
        stable({ data: pick(existing.data, data), seo: seoOf(existing.seo) }) ===
          stable({ data, seo })
      ) {
        counts.same++;
        continue;
      }
      if (existing && !force && new Date(existing.updatedAt) > new Date(full.updatedAt)) {
        console.log(
          `SKIP    ${label}: edited on the target (${existing.updatedAt}) after the source (${full.updatedAt}); --force to overwrite`,
        );
        counts.skipped++;
        continue;
      }
      console.log(`${existing ? "UPDATE" : "CREATE"}  ${label}`);
      existing ? counts.updated++ : counts.created++;
      if (!apply) continue;

      let id = existing?.id;
      if (existing) {
        await dst.api("PUT", `content/${collection}/${id}`, { data, seo, _rev: existing._rev });
      } else {
        const made = await dst.api("POST", `content/${collection}`, { data, slug: item.slug, seo });
        id = made.data.item?.id ?? made.data.id;
      }
      await dst.api("POST", `content/${collection}/${id}/publish`);
    } catch (error) {
      counts.failed++;
      console.error(`FAIL    ${label}: ${error.message}`);
    }
  }
}

/** The target entry's values for just the keys being compared. */
function pick(data, like) {
  return Object.fromEntries(Object.keys(like).map((k) => [k, data[k]]));
}

if (wantsMenus) {
  for (const name of MENUS) {
    try {
      const menu = await src.getMenu(name);
      if (!menu) continue;
      const want = menuShape(menu);
      const have = await dst.getMenu(name);
      if (have && stable(menuShape(have)) === stable(want)) {
        counts.same++;
        continue;
      }
      console.log(`${have ? "UPDATE" : "CREATE"}  menu ${name}`);
      have ? counts.updated++ : counts.created++;
      if (!apply) continue;

      await dst.api("POST", "menus", { name, label: want.label }, [409]);
      await dst.api("PUT", `menus/${name}`, { label: want.label });
      const current = await dst.getMenu(name);
      // Children first so no parent is deleted out from under one.
      for (const item of [...(current?.items ?? [])].sort(
        (a, b) => Number(!!b.parentId) - Number(!!a.parentId),
      )) {
        await dst.api("DELETE", `menus/${name}/items/${item.id}`, undefined, [404]);
      }
      let order = 0;
      const create = async (item, parentId) => {
        const made = await dst.api("POST", `menus/${name}/items`, {
          type: "custom",
          label: item.label,
          customUrl: item.url,
          ...(item.target && { target: item.target }),
          ...(item.cssClasses && { cssClasses: item.cssClasses }),
          ...(parentId && { parentId }),
          sortOrder: order++,
        });
        const id = made.data.id ?? made.data.item?.id;
        for (const child of item.children ?? []) await create(child, id);
      };
      for (const item of want.items) await create(item, undefined);
    } catch (error) {
      counts.failed++;
      console.error(`FAIL    menu ${name}: ${error.message}`);
    }
  }
}

console.log(
  `\n${apply ? "Done" : "Dry run"}: ${counts.created} to create, ${counts.updated} to update, ${counts.same} unchanged, ${counts.skipped} skipped, ${counts.failed} failed`,
);
if (!apply && counts.created + counts.updated)
  console.log("Re-run with --apply to write these changes.");
process.exit(counts.failed ? 1 : 0);
