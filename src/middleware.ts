import { defineMiddleware } from "astro:middleware";
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

export const onRequest = defineMiddleware(async (context, next) => {
	const url = new URL(context.request.url);

	// CMS surface: never A/B.
	if (url.pathname.startsWith("/_emdash/")) {
		context.locals.variant = "a";
		return next();
	}

	const { variant, assigned, forced } = resolveVariant(
		context.request,
		DEFAULT_SPLIT_B,
	);
	context.locals.variant = variant;

	const response = await next();

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
