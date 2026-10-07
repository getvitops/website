// Applies the page-builder block types and the collection fields that use them
// (scripts/lib/block-types.mjs) to a running EmDash site over REST. Idempotent:
// an existing block type or field is updated in place when its definition
// differs, and left alone when it matches. Called from promote-schema.sh.
//
//   EMDASH_TOKEN=... node scripts/promote-blocks.mjs <site-url>
//   (localhost with no token uses the dev bypass)
import { BLOCK_TYPES, COLLECTION_FIELDS } from "./lib/block-types.mjs";

const base = process.argv[2];
if (!base) throw new Error("usage: promote-blocks.mjs <site-url>");

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

async function api(method, path, body) {
  const res = await fetch(new URL(`/_emdash/api/${path}`, base), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const raw = await res.text();
  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    json = undefined;
  }
  return { status: res.status, ok: res.ok, data: json?.data ?? json, raw };
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
let failed = 0;
const fail = (msg) => {
  failed++;
  console.error(`  ${msg}`);
};

// ── Block types ──────────────────────────────────────────────────────────────
for (const def of BLOCK_TYPES) {
  const created = await api("POST", "schema/block-types", def);
  if (created.ok) {
    console.log(`block type ${def.slug}: created`);
    continue;
  }
  if (created.status !== 409) {
    fail(`block type ${def.slug}: POST -> ${created.status} ${created.raw.slice(0, 300)}`);
    continue;
  }
  const current = await api("GET", `schema/block-types/${def.slug}`);
  const item = current.data?.item ?? current.data;
  const active = item?.versions?.find((v) => v.version === item.currentVersion);
  if (!active) {
    fail(`block type ${def.slug}: exists but could not be read (${current.status})`);
    continue;
  }
  if (
    same(stripBlockFields(active.fields), stripBlockFields(def.fields)) &&
    item.label === def.label
  ) {
    console.log(`block type ${def.slug}: up to date`);
    continue;
  }
  const updated = await api("PUT", `schema/block-types/${def.slug}`, {
    expectedFingerprint: active.fingerprint,
    label: def.label,
    description: def.description,
    icon: def.icon,
    category: def.category,
    fields: def.fields,
  });
  if (updated.ok) console.log(`block type ${def.slug}: updated`);
  else fail(`block type ${def.slug}: PUT -> ${updated.status} ${updated.raw.slice(0, 300)}`);
}

// The server fills defaults (required: false, ...) so compare on what we author.
function stripBlockFields(fields) {
  return fields.map(({ slug, label, type, required, validation, defaultValue }) => ({
    slug,
    label,
    type,
    required: required || undefined,
    validation: validation && Object.keys(validation).length ? validation : undefined,
    defaultValue: defaultValue ?? undefined,
  }));
}

// ── Collection fields ────────────────────────────────────────────────────────
for (const [collection, fields] of Object.entries(COLLECTION_FIELDS)) {
  const col = await api("GET", `schema/collections/${collection}?includeFields=true`);
  if (!col.ok) {
    fail(`${collection}: collection not found (${col.status}) — run promote-schema.sh first`);
    continue;
  }
  const existing = new Map((col.data?.item?.fields ?? []).map((f) => [f.slug, f]));
  for (const def of fields) {
    const have = existing.get(def.slug);
    if (!have) {
      const r = await api("POST", `schema/collections/${collection}/fields`, def);
      if (r.ok) console.log(`${collection}.${def.slug}: added`);
      else fail(`${collection}.${def.slug}: POST -> ${r.status} ${r.raw.slice(0, 300)}`);
      continue;
    }
    if (have.type === def.type && same(have.validation ?? null, def.validation ?? null)) {
      console.log(`${collection}.${def.slug}: up to date`);
      continue;
    }
    const r = await api("PUT", `schema/collections/${collection}/fields/${def.slug}`, {
      label: def.label,
      type: def.type,
      validation: def.validation ?? null,
    });
    if (r.ok) console.log(`${collection}.${def.slug}: updated (${have.type} -> ${def.type})`);
    else fail(`${collection}.${def.slug}: PUT -> ${r.status} ${r.raw.slice(0, 300)}`);
  }
}

if (failed) {
  console.error(`${failed} step(s) failed`);
  process.exit(1);
}
