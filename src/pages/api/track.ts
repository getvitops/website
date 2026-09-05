// The tel:-click conversion route. `<Tracking />`'s capture script beacons
// TRACKING_ENDPOINT ("/api/track") whenever a visitor taps a `tel:` link; with
// no route answering it, the integration warns at build time and every one of
// those conversions is silently lost.
//
// createConversionRoute() (from @getvitops/astro/routes) is the shared factory
// for this — it reads the attribution cookie, builds the event, and calls
// notify() against site.json's notifications config. It deliberately does no
// validation of its own; that's for a form's route (src/pages/api/contact.ts),
// which owns its own required fields and does not use this factory (see
// CLAUDE.md's "Ad-click attribution" section for why the split is intentional).
//
// env.EMAIL is read via a dynamically-imported `cloudflare:workers`, matching
// contact.ts's workerEnv() convention: a static `import { env } from
// "cloudflare:workers"` would tie this module to workerd even where Astro only
// type-checks or bundles it, and this file otherwise has no such dependency.
// The binding is looked up fresh per request (not once at module load) so a
// runtime where it isn't available yet degrades to "printed, not sent" rather
// than throwing at import time.
import { createConversionRoute } from "@getvitops/astro/routes";
import type { NotifyContext } from "@getvitops/utils/notify";
import type { APIRoute } from "astro";
import config from "../../../site.json" with { type: "json" };

export const prerender = false;

async function workerEnv(): Promise<Record<string, any>> {
  try {
    return (await import("cloudflare:workers")).env as Record<string, any>;
  } catch {
    return {};
  }
}

// `config.site.notifications.email.provider` comes back as a plain `string`
// from the JSON import (JSON has no way to express a literal type), so it
// needs an explicit cast to the `"cloudflare"` union `NotifyContext` expects.
const NOTIFY_CONTEXT: NotifyContext = {
  notifications: config.site.notifications as NotifyContext["notifications"],
  canonical: config.site.domains.canonical,
  organizationName: config.organization.name,
  locationEmails: [config.organization.email],
};

export const POST: APIRoute = async (ctx) => {
  const EMAIL = (await workerEnv()).EMAIL;
  return createConversionRoute({
    context: NOTIFY_CONTEXT,
    binding: () => EMAIL,
  })(ctx);
};
