// Purges every cached page. A deploy does not purge Workers Cache, and every
// page is now on-demand and cached for a week, so a template or hand-written
// copy change would otherwise stay invisible until something is published. The
// deploy workflows call this after a successful deploy.
//
//   curl -X POST -H "authorization: Bearer $PURGE_TOKEN" https://<site>/api/purge
//
// Auth is a shared secret, `PURGE_TOKEN`, set as a Worker secret on each
// environment (`wrangler secret put PURGE_TOKEN`) and as a repo secret for the
// workflow. With it unset the route answers 404, as if it did not exist. Purging
// is safe to repeat; the cost of a stray call is a few cache misses.
import type { APIRoute } from "astro";

import { SITE_TAG } from "../../lib/chrome";

export const prerender = false;

async function workerEnv(): Promise<Record<string, any>> {
  try {
    return (await import("cloudflare:workers")).env as Record<string, any>;
  } catch {
    return {};
  }
}

/** Constant-time comparison, so response timing does not leak the token. */
function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

export const POST: APIRoute = async ({ request, cache }) => {
  const token = (await workerEnv())["PURGE_TOKEN"] as string | undefined;
  if (!token) return new Response(null, { status: 404 });

  const given = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!safeEqual(given, token)) return new Response(null, { status: 401 });

  if (!cache.enabled) return Response.json({ purged: false, reason: "cache not enabled" });
  await cache.invalidate({ tags: [SITE_TAG] });
  return Response.json({ purged: true, tag: SITE_TAG });
};
