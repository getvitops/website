// Upserts the entries in seed/<collection>/*.json (collections: pages,
// managed_it_services, industries, funding_programs) into a running EmDash
// instance. Content lives in the database, not git — these files are the
// reviewable source the page migrations were authored from, so a fresh or
// rebuilt database can be refilled with one command:
//
//   node scripts/sync-pages.mjs [--url http://localhost:4321] [collection:slug ...]
//   (a bare slug means a `pages` entry; no arguments means everything)
//
// The entry slug is the file name. `seo` is a top-level key in the file but not
// a collection field, so it goes through the REST API; everything else goes
// through the `emdash` CLI, which owns auth and revision handling. Remote
// instances authenticate with EMDASH_TOKEN (for the CLI and for the SEO call);
// localhost uses the dev bypass.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const urlFlag = args.indexOf("--url");
const base = urlFlag >= 0 ? args.splice(urlFlag, 2)[1] : "http://localhost:4321";
const COLLECTIONS = ["pages", "managed_it_services", "industries", "funding_programs"];
const entries = args.length
  ? args.map((a) => (a.includes(":") ? a.split(":") : ["pages", a]))
  : COLLECTIONS.flatMap((collection) =>
      (existsSync(`seed/${collection}`) ? readdirSync(`seed/${collection}`) : [])
        .filter((f) => f.endsWith(".json"))
        .map((f) => [collection, f.replace(/\.json$/, "")]),
    );

const cli = (...a) =>
  execFileSync("npx", ["emdash", ...a, "--url", base, "--json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

async function authHeaders() {
  if (process.env.EMDASH_TOKEN) return { authorization: `Bearer ${process.env.EMDASH_TOKEN}` };
  const res = await fetch(new URL("/_emdash/api/auth/dev-bypass", base), { redirect: "manual" });
  const cookie = res.headers.getSetCookie().map((c) => c.split(";")[0]).join("; ");
  if (!cookie) throw new Error("no EMDASH_TOKEN and the dev bypass issued no session");
  return { cookie };
}

const headers = { "content-type": "application/json", "x-emdash-request": "1", ...(await authHeaders()) };

for (const [collection, slug] of entries) {
  const name = slug;
  const { seo, ...data } = JSON.parse(readFileSync(join("seed", collection, `${name}.json`), "utf8"));
  const file = join(tmpdir(), `sync-${collection}-${name}.json`);
  writeFileSync(file, JSON.stringify(data));

  let entry;
  try {
    const current = JSON.parse(cli("content", "get", collection, slug));
    entry = JSON.parse(cli("content", "update", collection, current.id, "--rev", current._rev, "--file", file));
    console.log(`updated  ${collection}/${slug}`);
  } catch {
    entry = JSON.parse(cli("content", "create", collection, "--slug", slug, "--file", file));
    console.log(`created  ${collection}/${slug}`);
  }

  if (seo) {
    const res = await fetch(new URL(`/_emdash/api/content/${collection}/${entry.id}`, base), {
      method: "PUT",
      headers,
      body: JSON.stringify({ seo }),
    });
    if (!res.ok) throw new Error(`seo update for ${collection}/${slug}: ${res.status} ${await res.text()}`);
    console.log(`  seo set`);
  }
}
