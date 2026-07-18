/**
 * A/B variant resolution.
 *
 * The "variant" axis is orthogonal to the dev/prod "stage" axis: both variant A
 * (`src/…`) and variant B (`src/_b/…`) ship in one bundle and read the same
 * content DB. Which one renders is decided per request from a sticky cookie.
 *
 * This module is pure helpers only — request/response side effects (setting the
 * cookie, cache headers) live in `src/middleware.ts`.
 */

export type Variant = "a" | "b";

export const VARIANTS: readonly Variant[] = ["a", "b"] as const;

/** Sticky cookie holding the visitor's assigned variant. */
export const VARIANT_COOKIE = "ab_variant";

/** Fraction of newly-assigned visitors sent to variant B (0..1). */
export const DEFAULT_SPLIT_B = 0.5;

export function isVariant(v: unknown): v is Variant {
	return v === "a" || v === "b";
}

/** Weighted coin flip for a fresh visitor. Runtime `Math.random` is fine here. */
export function assignVariant(splitB: number = DEFAULT_SPLIT_B): Variant {
	return Math.random() < splitB ? "b" : "a";
}

/** Choose the A or B implementation of something. */
export function pick<T>(a: T, b: T, variant: Variant): T {
	return variant === "b" ? b : a;
}

function readCookie(request: Request, name: string): string | null {
	const header = request.headers.get("cookie");
	if (!header) return null;
	for (const part of header.split(";")) {
		const eq = part.indexOf("=");
		if (eq === -1) continue;
		if (part.slice(0, eq).trim() === name) {
			return decodeURIComponent(part.slice(eq + 1).trim());
		}
	}
	return null;
}

export interface ResolvedVariant {
	variant: Variant;
	/** True when assigned fresh this request → middleware should set the cookie. */
	assigned: boolean;
	/** True when forced via `?variant=` or `x-ab-variant` (review override). */
	forced: boolean;
}

/**
 * Resolve the variant for a request. Precedence:
 *   1. `?variant=a|b` query param or `x-ab-variant` header (review override)
 *   2. existing `ab_variant` cookie (sticky)
 *   3. fresh weighted assignment
 */
export function resolveVariant(
	request: Request,
	splitB: number = DEFAULT_SPLIT_B,
): ResolvedVariant {
	const url = new URL(request.url);
	const override =
		url.searchParams.get("variant") ?? request.headers.get("x-ab-variant");
	if (isVariant(override)) {
		return { variant: override, assigned: false, forced: true };
	}

	const cookie = readCookie(request, VARIANT_COOKIE);
	if (isVariant(cookie)) {
		return { variant: cookie, assigned: false, forced: false };
	}

	return { variant: assignVariant(splitB), assigned: true, forced: false };
}
