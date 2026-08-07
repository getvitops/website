import {
  getPrimaryClickId,
  identifyPlatform,
  parseTrackingCookie,
} from "@getvitops/utils/tracking";
import type { APIRoute } from "astro";

export const prerender = false;

/**
 * Resolve the Worker env at request time. API routes in this Astro v7 setup
 * can't read `locals.runtime.env` (removed upstream); `cloudflare:workers`
 * exposes the same bindings and is dynamically imported so it never breaks a
 * non-workerd build. Mirrors @emdash-cms/cloudflare's cloudflare-email plugin.
 */
async function workerEnv(): Promise<Record<string, any>> {
  try {
    return (await import("cloudflare:workers")).env as Record<string, any>;
  } catch {
    return {};
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Where enquiries land, and the sender label. `FROM.email` must be on the
// domain onboarded for Cloudflare Email Sending — send.vitops.ca (the apex
// vitops.ca is not enabled), so DKIM signs and mail doesn't bounce. Any
// @send.vitops.ca address works. `TO` is the destination inbox and is
// unconstrained by the onboarded sender domain. `replyTo` (set per request)
// carries the submitter's real address so replies reach them, not the domain.
const TO = "hi@vitops.ca";
const FROM = { email: "forms@send.vitops.ca", name: "Vitops website" };

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

/**
 * Where this enquiry came from, as a line for the notification, or null.
 *
 * Read from the first-party `_ac` cookie that `<Tracking />` writes on a landing
 * URL carrying an ad click ID or UTMs. Most enquiries have none — a visitor who
 * arrived organically, or who declined `marketing` consent — and that is the
 * normal case, not a fault: an unattributed enquiry is reported as such rather
 * than guessed at.
 */
function attributionLine(request: Request): string | null {
  const data = parseTrackingCookie(request.headers.get("cookie"));
  if (!data) return null;

  const platform = identifyPlatform(data);
  const clickId = getPrimaryClickId(data);
  const parts = [
    platform,
    clickId && `${clickId.param}=${clickId.value}`,
    data.utm_campaign && `campaign ${data.utm_campaign}`,
  ].filter(Boolean);

  return parts.length ? parts.join(" · ") : null;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Contact-form intake. Accepts JSON or urlencoded/multipart bodies, validates
 * the required fields, and emails the enquiry to TO via the Cloudflare Email
 * Sending binding (env.EMAIL), with Reply-To set to the submitter.
 */
export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, unknown> = {};

  try {
    const ctype = request.headers.get("content-type") || "";
    if (ctype.includes("application/json")) {
      data = (await request.json()) as Record<string, unknown>;
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form.entries());
    }
  } catch {
    return json({ ok: false, error: "Could not read the submission." }, 400);
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const company = String(data.company ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!name || !email || !message) {
    return json({ ok: false, error: "Name, work email, and a short message are required." }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: "That email address looks off." }, 400);
  }

  // Cloudflare Email Sending binding (declared as `send_email` in wrangler.jsonc).
  // Absent under some local/dev runtimes — degrade gracefully rather than 500.
  const EMAIL = (await workerEnv()).EMAIL;
  if (!EMAIL || typeof EMAIL.send !== "function") {
    console.warn("[contact] EMAIL binding unavailable; enquiry not sent", {
      name,
      email,
      company,
    });
    return json(
      {
        ok: false,
        error: "Could not send right now. Please email hi@vitops.ca directly.",
      },
      502,
    );
  }

  // Never fail the submission over attribution: the visitor has already sent
  // the enquiry, and losing it because we couldn't read a cookie would turn a
  // missing marketing datum into a missing lead.
  let source: string | null = null;
  try {
    source = attributionLine(request);
  } catch (err) {
    console.warn("[contact] could not read attribution", err);
  }

  const subject = `New enquiry — ${name}${company ? ` (${company})` : ""}`;
  const lines = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Company: ${company || "—"}`,
    `Source:  ${source || "organic / unattributed"}`,
    "",
    message,
  ];
  const text = lines.join("\n");
  const html = `<table style="font:14px/1.5 system-ui,sans-serif;color:#141a23">
  <tr><td style="padding:2px 12px 2px 0;color:#6c7689">Name</td><td>${escapeHtml(name)}</td></tr>
  <tr><td style="padding:2px 12px 2px 0;color:#6c7689">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
  <tr><td style="padding:2px 12px 2px 0;color:#6c7689">Company</td><td>${escapeHtml(company || "—")}</td></tr>
  <tr><td style="padding:2px 12px 2px 0;color:#6c7689">Source</td><td>${escapeHtml(source || "organic / unattributed")}</td></tr>
</table>
<p style="font:14px/1.55 system-ui,sans-serif;color:#141a23;white-space:pre-wrap;margin-top:16px">${escapeHtml(message)}</p>`;

  try {
    const res = await EMAIL.send({
      to: TO,
      from: FROM,
      replyTo: email,
      subject,
      text,
      html,
    });
    console.log("[contact] enquiry emailed", {
      to: TO,
      from: email,
      messageId: res?.messageId,
    });
    return json({ ok: true, message: "Thanks. A partner will be in touch shortly." }, 200);
  } catch (err) {
    console.error("[contact] send failed", err);
    return json(
      {
        ok: false,
        error: "Could not send right now. Please email hi@vitops.ca directly.",
      },
      502,
    );
  }
};
