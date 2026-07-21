import { defineMiddleware } from "astro:middleware";
import { B_PREFIX, hasBPage, toBVariantPath } from "./lib/ab-pages";
import { DEFAULT_SPLIT_B, resolveVariant, VARIANT_COOKIE } from "./lib/variant";

/**
 * A/B variant middleware.
 *
 * Runs alongside EmDash's injected middleware — Astro composes project
 * middleware with integration middleware, so this does not replace it.
 *
 * Responsibilities:
 *   - Assign every public visitor a sticky `a`/`b` variant and expose it on
 *     `Astro.locals.variant` for the render path (the resolver reads it).
 *   - Pin all `/_emdash/*` routes (admin, API, auth, MCP) to variant `a` and
 *     set no cookie — the CMS surface is not part of the experiment.
 *   - Emit `x-ab-variant` for analytics/Logpush attribution.
 *   - Keep variant-dependent HTML out of a URL-only shared cache.
 */

const ONE_YEAR = 60 * 60 * 24 * 365;

/** The only host that should be indexed. Everything else (dev.vitops.ca,
 *  *.workers.dev, previews) gets X-Robots-Tag: noindex. */
const PROD_HOST = "vitops.ca";

export const onRequest = defineMiddleware(async (context, next) => {
	const url = new URL(context.request.url);

	// CMS surface: never A/B.
	if (url.pathname.startsWith("/_emdash/")) {
		context.locals.variant = "a";
		return next();
	}

	// Guard: /b-variant/* is an internal rewrite target only (see
	// src/lib/ab-pages.ts). Direct external hits get the styled 404. Internal
	// next(payload) rewrites dispatch the page directly without re-entering
	// this middleware, so they never hit this branch. Runs BEFORE variant
	// resolution: no A/B cookie, no x-ab-variant header. NOTE: Astro resets
	// the status to 200 on mid-request rewrites, so 404 is forced here.
	if (url.pathname === B_PREFIX || url.pathname.startsWith(`${B_PREFIX}/`)) {
		context.locals.variant = "a"; // satisfy the locals contract; not an experiment
		const res = await next("/404");
		return new Response(res.body, {
			status: 404,
			statusText: "Not Found",
			headers: res.headers,
		});
	}

	const { variant, assigned, forced } = resolveVariant(
		context.request,
		DEFAULT_SPLIT_B,
	);
	context.locals.variant = variant;

	// A/B layer 3: when a structural B page exists for this route, rewrite
	// internally to the /b-variant dispatcher. next(payload) re-routes and
	// dispatches directly (no middleware re-runs — this project middleware is
	// last in the chain after EmDash's `pre` middlewares); the cookie/header
	// logic below still applies to the returned response. The query string is
	// carried explicitly because string rewrite payloads drop it.
	const response =
		variant === "b" && hasBPage(url.pathname)
			? await next(toBVariantPath(url.pathname) + url.search)
			: await next();

	// Persist a fresh assignment (stickiness) or a review override (?variant=).
	if (assigned || forced) {
		const secure = url.protocol === "https:" ? "; Secure" : "";
		response.headers.append(
			"set-cookie",
			`${VARIANT_COOKIE}=${variant}; Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax${secure}`,
		);
	}

	// Attribution for analytics / Logpush.
	response.headers.set("x-ab-variant", variant);

	// Keep every non-prod host out of search indexes (dev-site auth is a TODO).
	if (url.hostname !== PROD_HOST) {
		response.headers.set("x-robots-tag", "noindex, nofollow");
	}

	// Correctness: variant-dependent HTML must not be served from a cache keyed
	// only on URL. POC-safe default is `private`; the production move is to add
	// `ab_variant` to the Cloudflare cache key instead (see plan).
	const contentType = response.headers.get("content-type") ?? "";
	if (
		contentType.includes("text/html") &&
		!response.headers.has("cache-control")
	) {
		response.headers.set("cache-control", "private, no-store");
	}

	return response;
});
