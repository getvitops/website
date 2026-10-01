// Time-to-first-byte comparison for the CMS-backed (on-demand) pages against the
// prerendered ones, with the edge-cache outcome per request. Run it against a
// deployed host — dev-server numbers say nothing about the edge.
//
//   node scripts/perf-compare.mjs [--host https://dev.vitops.ca] [--n 20] [path ...]
//
// Default paths: a few of each kind. A cold edge shows up as the first request
// of each path (`MISS`) and is reported separately, so one cold start does not
// distort the median.
const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args.splice(i, 2)[1] : fallback;
};
const host = flag("--host", "https://dev.vitops.ca");
const n = Number(flag("--n", "20"));
const paths = args.length
  ? args
  : [
      "/about",
      "/managed-it-services/crm-software",
      "/industries/trades",
      "/funding/dmap",
      "/industries", // hand-written, on-demand, collection-driven grid
      "/pricing", // hand-written, prerendered
      "/managed-it-services", // hand-written, prerendered
    ];

const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const pct = (xs, p) =>
  [...xs].sort((a, b) => a - b)[Math.min(xs.length - 1, Math.floor(xs.length * p))];

async function ttfb(url) {
  const start = performance.now();
  const res = await fetch(url, { redirect: "manual" });
  const first = performance.now() - start; // headers received
  await res.arrayBuffer();
  return { ms: first, status: res.status, cache: res.headers.get("cf-cache-status") ?? "-" };
}

console.log(`${host}  n=${n}\n`);
console.log(
  "path".padEnd(38),
  "cold".padStart(7),
  "median".padStart(8),
  "p95".padStart(7),
  "  cache",
);
for (const path of paths) {
  const url = host + path;
  const cold = await ttfb(url);
  const warm = [];
  const cache = new Map();
  for (let i = 0; i < n; i++) {
    const r = await ttfb(url);
    warm.push(r.ms);
    cache.set(r.cache, (cache.get(r.cache) ?? 0) + 1);
  }
  const mix = [...cache].map(([k, v]) => `${k}×${v}`).join(" ");
  console.log(
    path.padEnd(38),
    `${cold.ms.toFixed(0)}ms`.padStart(7),
    `${median(warm).toFixed(0)}ms`.padStart(8),
    `${pct(warm, 0.95).toFixed(0)}ms`.padStart(7),
    ` ${mix}${cold.status === 200 ? "" : `  (HTTP ${cold.status})`}`,
  );
}
