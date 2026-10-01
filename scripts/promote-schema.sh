#!/usr/bin/env bash
#
# Promote a content-model (schema) change to a running EmDash site.
#
# Schema lives in the DB, not git, so `wrangler deploy` never changes it. Each
# release that alters collections/fields adds idempotent `emdash schema` calls
# below; CI (promote-schema.yml) runs this against dev to rehearse, then prod.
# Docs: https://docs.emdashcms.com/deployment/schema-evolution/
#
# Usage:  EMDASH_TOKEN=<admin-token> scripts/promote-schema.sh <site-url>
set -euo pipefail

URL="${1:?usage: promote-schema.sh <site-url>}"
: "${EMDASH_TOKEN:?EMDASH_TOKEN must be set (admin API token for ${URL})}"

echo "Promoting schema to ${URL}"

# ── Schema steps (idempotent: an existing collection/field is left alone) ─────
# CMS-backed pages (see AGENTS.md "CMS-backed pages"). Field lists mirror
# seed/seed.json — keep the two in step.
api() { # api <METHOD> <path> <json> — prints the response body on failure
  local out code
  out=$(mktemp)
  code=$(curl -sS -o "$out" -w '%{http_code}' -X "$1" "${URL}/_emdash/api/$2" \
    -H "authorization: Bearer ${EMDASH_TOKEN}" -H "content-type: application/json" \
    -H "x-emdash-request: 1" -d "$3") || code=000
  if [[ "$code" != 2* ]]; then
    echo "  $1 $2 -> HTTP $code: $(head -c 400 "$out")" >&2
    rm -f "$out"; return 1
  fi
  rm -f "$out"
}
ensure_collection() { # ensure_collection <slug> <label> <singular> <urlPattern>
  api POST schema/collections "{\"slug\":\"$1\",\"label\":\"$2\",\"labelSingular\":\"$3\",\"supports\":[\"drafts\",\"revisions\",\"seo\"],\"urlPattern\":\"$4\"}" || true
  api PUT "schema/collections/$1" "{\"urlPattern\":\"$4\"}"
}
field() { # field <collection> <slug>:<type>:<label> ...
  local c="$1"; shift
  for f in "$@"; do
    IFS=: read -r s t l <<<"$f"
    npx emdash schema add-field "$c" "$s" --type "$t" --label "$l" --url "$URL" >/dev/null 2>&1 || true
  done
}

# `pages` pre-exists (title, content); it gains the page-shaped fields.
api PUT schema/collections/pages '{"urlPattern":"/{slug}"}'
field pages hero:json:Hero sections:json:Sections cta:json:"Closing CTA" callout:text:"Funding callout" \
  schema:json:"Schema.org JSON-LD" breadcrumb:json:"Breadcrumb trail"

ensure_collection managed_it_services "Managed IT services" "Managed IT service" "/managed-it-services/{slug}"
field managed_it_services title:string:Title hero:json:Hero sections:json:Sections cta:json:"Closing CTA" \
  callout:text:"Funding callout" schema:json:"Schema.org JSON-LD" breadcrumb:json:"Breadcrumb trail"

ensure_collection industries Industries Industry "/industries/{slug}"
field industries title:string:Title eyebrow:string:Eyebrow h1:string:H1 hero_lead:text:"Hero lead" \
  funding_text:text:"Funding callout" direct_answer:text:"Direct answer" \
  differences_title:string:"Differences title" differences:json:Differences pillars:json:Pillars \
  faq:json:FAQ cta_title:string:"CTA title" cta_lead:text:"CTA lead" \
  card_title:string:"Card title" card_body:text:"Card body" sort_order:integer:"Sort order"

ensure_collection funding_programs "Funding programs" "Funding program" "/funding/{slug}"
field funding_programs title:string:Title eyebrow:string:Eyebrow h1:string:H1 direct_answer:text:"Direct answer" \
  verified:string:Verified source_url:string:"Source URL" source_label:string:"Source label" \
  facts:json:Facts sections:json:Sections faq:json:FAQ related_links:json:"Related links"

# Content is not schema: load it afterwards with
#   EMDASH_TOKEN=... node scripts/sync-pages.mjs --url "$URL"
echo "Schema promoted to ${URL}. Now run scripts/sync-pages.mjs against it."
