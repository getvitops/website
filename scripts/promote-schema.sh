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

# ── Add this release's schema steps here (they read EMDASH_TOKEN from env) ────
# Examples — uncomment/edit per release:
#   npx emdash schema add-field pages subtitle --type string --label "Subtitle" --url "$URL"
#   npx emdash schema create testimonials --label Testimonials --url "$URL"
#   npx emdash schema remove-field pages legacy_field --url "$URL"   # destructive
#
# After schema changes, regenerate + commit types:
#   npx emdash types --url "$URL"

echo "No schema migration steps defined for this release."
echo "Edit scripts/promote-schema.sh to add \`emdash schema\` calls, then re-run."
