import { vitopsAbTesting } from "@getvitops/astro/middleware";
import { defineMiddleware, sequence } from "astro:middleware";
import config from "../site.json" with { type: "json" };
import { PROD_HOST } from "./lib/site";

/**
 * Runs alongside EmDash's injected middleware — Astro composes project
 * middleware with integration middleware, so this does not replace it.
 *
 * A/B testing is the toolchain's `vitopsAbTesting()`, driven by
 * `site.experiments` in site.json. No experiment is defined right now, so it
 * assigns nothing. To run one, add an entry there and branch on its cookie in
 * the page (see CLAUDE.md, "A/B testing").
 */

const experiments = Object.fromEntries(
  Object.entries(config.site.experiments ?? {})
    .filter(([, experiment]) => experiment.enabled)
    .map(([key, experiment]) => [
      key,
      { ...experiment, cookieName: experiment.cookieName ?? `_ab_${key}` },
    ]),
);

const abTesting = vitopsAbTesting({ experiments });

// The CMS surface (admin, API, auth, MCP) is never part of an experiment.
const publicAbTesting = defineMiddleware((context, next) =>
  new URL(context.request.url).pathname.startsWith("/_emdash/")
    ? next()
    : abTesting(context, next),
);

// Keep every non-prod host out of search indexes. Only reaches on-demand
// routes — prerendered pages carry a build-time <meta> instead.
const noindexOffProd = defineMiddleware(async (context, next) => {
  const response = await next();
  if (new URL(context.request.url).hostname !== PROD_HOST) {
    response.headers.set("x-robots-tag", "noindex, nofollow");
  }
  return response;
});

export const onRequest = sequence(publicAbTesting, noindexOffProd);
