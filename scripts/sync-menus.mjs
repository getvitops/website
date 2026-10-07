// Replaces the menus named in seed/menus.json on a running EmDash site:
// creates a missing menu, then rewrites its items to match. Menus are edited in
// the admin (Menus) — this is for bootstrapping a fresh site and for resetting
// one to the checked-in structure, so it overwrites what is there.
//
//   EMDASH_TOKEN=... node scripts/sync-menus.mjs <site-url> [menu ...]
//   (localhost with no token uses the dev bypass)
import { readFileSync } from "node:fs";

const [base, ...only] = process.argv.slice(2);
if (!base) throw new Error("usage: sync-menus.mjs <site-url> [menu ...]");
const menus = JSON.parse(readFileSync("seed/menus.json", "utf8"));

async function authHeaders() {
  if (process.env.EMDASH_TOKEN) return { authorization: `Bearer ${process.env.EMDASH_TOKEN}` };
  const res = await fetch(new URL("/_emdash/api/auth/dev-bypass", base), { redirect: "manual" });
  const cookie = res.headers
    .getSetCookie()
    .map((c) => c.split(";")[0])
    .join("; ");
  if (!cookie) throw new Error("no EMDASH_TOKEN and the dev bypass issued no session");
  return { cookie };
}
const headers = {
  "content-type": "application/json",
  "x-emdash-request": "1",
  ...(await authHeaders()),
};

async function api(method, path, body, okStatuses = []) {
  const res = await fetch(new URL(`/_emdash/api/${path}`, base), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const raw = await res.text();
  if (!res.ok && !okStatuses.includes(res.status))
    throw new Error(`${method} ${path} -> ${res.status} ${raw.slice(0, 300)}`);
  try {
    const json = JSON.parse(raw);
    return json.data ?? json;
  } catch {
    return undefined;
  }
}

for (const [name, def] of Object.entries(menus)) {
  if (only.length && !only.includes(name)) continue;
  await api("POST", "menus", { name, label: def.label }, [409]);
  await api("PUT", `menus/${name}`, { label: def.label });

  const current = await api("GET", `menus/${name}`);
  const existing = current?.items ?? current?.item?.items ?? [];
  // Children first, so a parent is never deleted out from under a child.
  for (const item of [...existing].sort((a, b) => Number(!!b.parentId) - Number(!!a.parentId))) {
    await api("DELETE", `menus/${name}/items/${item.id}`, undefined, [404]);
  }

  let order = 0;
  const create = async (item, parentId) => {
    const made = await api("POST", `menus/${name}/items`, {
      type: "custom",
      label: item.label,
      customUrl: item.url,
      ...(item.target && { target: item.target }),
      ...(item.cssClasses && { cssClasses: item.cssClasses }),
      ...(parentId && { parentId }),
      sortOrder: order++,
    });
    const id = made?.id ?? made?.item?.id;
    for (const child of item.children ?? []) await create(child, id);
  };
  for (const item of def.items) await create(item, undefined);
  console.log(`menu ${name}: ${def.items.length} top-level item(s)`);
}
