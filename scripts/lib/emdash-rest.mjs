// Small REST client for a running EmDash site, shared by promote-content.mjs and
// export-content.mjs. Auth: a bearer token when given, else the dev bypass (only
// answers on localhost).

export const COLLECTIONS = ["pages", "managed_it_services", "industries", "funding_programs"];
export const MENUS = [
  "primary",
  "header_cta",
  "footer_services",
  "footer_funding",
  "footer_company",
];

export async function connect(base, token) {
  let auth;
  if (token) auth = { authorization: `Bearer ${token}` };
  else {
    const res = await fetch(new URL("/_emdash/api/auth/dev-bypass", base), { redirect: "manual" });
    const cookie = res.headers
      .getSetCookie()
      .map((c) => c.split(";")[0])
      .join("; ");
    if (!cookie) throw new Error(`${base}: no token given and the dev bypass issued no session`);
    auth = { cookie };
  }
  const headers = { "content-type": "application/json", "x-emdash-request": "1", ...auth };

  async function api(method, path, body, okStatuses = []) {
    const res = await fetch(new URL(`/_emdash/api/${path}`, base), {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const raw = await res.text();
    if (!res.ok && !okStatuses.includes(res.status)) {
      throw new Error(`${base} ${method} ${path} -> ${res.status} ${raw.slice(0, 300)}`);
    }
    try {
      const json = JSON.parse(raw);
      return { status: res.status, data: json.data ?? json };
    } catch {
      return { status: res.status, data: undefined };
    }
  }

  return {
    base,
    api,
    /** Published entries of a collection (published data, not any pending draft). */
    async listPublished(collection) {
      const items = [];
      let cursor;
      do {
        const qs = new URLSearchParams({ limit: "100", status: "published" });
        if (cursor) qs.set("cursor", cursor);
        const { data } = await api("GET", `content/${collection}?${qs}`);
        items.push(...(data.items ?? []));
        cursor = data.nextCursor;
      } while (cursor);
      return items;
    },
    /** One entry with seo and _rev, or undefined. */
    async getEntry(collection, idOrSlug) {
      const { status, data } = await api(
        "GET",
        `content/${collection}/${encodeURIComponent(idOrSlug)}`,
        undefined,
        [404],
      );
      if (status === 404) return undefined;
      return { ...data.item, _rev: data._rev };
    },
    async fieldSlugs(collection) {
      const { data } = await api("GET", `schema/collections/${collection}?includeFields=true`);
      return (data.item?.fields ?? []).map((f) => f.slug);
    },
    async getMenu(name) {
      const { status, data } = await api("GET", `menus/${name}`, undefined, [404]);
      return status === 404 ? undefined : data;
    },
  };
}

/** JSON.stringify with sorted keys, so two equal objects compare equal. */
export function stable(value) {
  return JSON.stringify(value, (_k, v) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => a.localeCompare(b)))
      : v,
  );
}

/** A menu as `{label, items:[{label,url,children?}]}` — what seed/menus.json holds. */
export function menuShape(menu) {
  const byParent = new Map();
  for (const item of menu.items ?? []) {
    const key = item.parentId ?? null;
    byParent.set(key, [...(byParent.get(key) ?? []), item]);
  }
  const build = (parentId) =>
    (byParent.get(parentId) ?? [])
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((i) => {
        const children = build(i.id);
        return {
          label: i.label,
          url: i.customUrl,
          ...(i.target && { target: i.target }),
          ...(i.cssClasses && { cssClasses: i.cssClasses }),
          ...(children.length && { children }),
        };
      });
  return { label: menu.label, items: build(null) };
}

/** Media references can't be promoted by copying JSON: the file lives in the source's storage. */
export function mediaReference(value) {
  return JSON.stringify(value).includes("/_emdash/api/media/");
}
