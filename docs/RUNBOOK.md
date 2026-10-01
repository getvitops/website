# Vitops operations runbook

How this site is deployed, changed via Claude Code remote, and A/B tested. Full
design rationale: the approved plan in `~/.claude/plans/` (local) — this doc is
the operational reference.

## Mental model — two independent axes

- **Stage** = git branch → environment. `dev` → `dev.vitops.ca` (worker
  `vitops-dev`, isolated D1+R2). Protected `main` → `vitops.ca` (worker `vitops`,
  prod D1+R2). Claude works off `dev`; prod only advances via promotion.
- **Experiment (A/B)** = `site.experiments` in `site.json`, run by the toolchain's
  `vitopsAbTesting()` middleware (cookie-pinned, per visitor). None defined today.

**Critical:** content **and** schema live in the database, not git. A
`wrangler deploy` never changes them. So "promote dev→prod" is three separate
operations (code / schema / content) — see [Promotion](#promotion). **Prod is the
source of truth for content**; full DB copies only ever run prod→dev.

## One-time setup

### 1. GitHub
```bash
git remote add origin git@github.com:<org>/vitops-website.git
git push -u origin main
git push -u origin dev
```
Then in repo settings: protect `main` (require PR + review, no direct pushes).
Point Claude Code remote at the repo, working branch `dev`.

### 2. Cloudflare resources (need your account — run via `! wrangler ...`)
Prod (`vitops` D1 + R2) already exists. Create the isolated dev pair:
```bash
wrangler d1 create vitops-dev          # copy the returned database id
wrangler r2 bucket create vitops-dev
```

### 3. Worker runtime secrets (set on BOTH `vitops` and `vitops-dev`)
```bash
wrangler secret put EMDASH_OAUTH_GITHUB_CLIENT_ID
wrangler secret put EMDASH_OAUTH_GITHUB_CLIENT_SECRET
wrangler secret put EMDASH_ENCRYPTION_KEY
wrangler secret put EMDASH_PREVIEW_SECRET        # pin so preview tokens verify
# repeat each with:  --config dist/server/wrangler.dev.json   for the dev worker
```
Rotate the values currently in `.dev.vars` / `.env` before first push — treat
them as exposed.

### 4. GitHub Actions secrets (Settings → Secrets → Actions)
| Secret | Used by | Notes |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | all deploys | Workers + D1 + R2 edit |
| `CLOUDFLARE_ACCOUNT_ID` | all deploys | |
| `VITOPS_DEV_D1_ID` | deploy-dev | from step 2; build hard-fails without it |
| `EMDASH_TOKEN` | promote-schema | admin API token (Settings → API Tokens) |
| `PROMOTE_TOKEN` | promote *(optional)* | PAT/App token to auto-merge into `main` |

### 5. First deploys + seed dev from prod
```bash
# prod (if not already live)
pnpm run deploy
# dev
export VITOPS_DEV_D1_ID=<id from step 2>
pnpm run deploy:dev
# seed dev DB with real prod content (dev worker must be deployed first)
wrangler d1 export vitops --remote --output=./prod.sql
wrangler d1 execute vitops-dev --remote --file=./prod.sql
```
`.emdash/seed.json` only bootstraps an *empty* DB — a running dev DB is seeded by
the clone above (or the **Refresh dev from prod** workflow), not by the seed file.

## Everyday workflow

1. Claude Code remote opens a PR into `dev` (code) and/or edits content/schema on
   dev via the EmDash MCP server (`https://dev.vitops.ca/_emdash/api/mcp`).
2. Merge to `dev` → **deploy-dev** ships `dev.vitops.ca`.
3. Review on `dev.vitops.ca` (force an experiment variant with `?_ab_<key>=<variant>`).
4. Approve → run **Promote dev → main** → prod deploys.

## Promotion (dev → prod)

Three layers, three mechanisms:

| Layer | How |
|---|---|
| **Code** | **Promote dev → main** workflow (opens PR, auto-merge → deploy-prod) |
| **Schema** | **Promote schema** workflow → `scripts/promote-schema.sh`. Run against `dev` to rehearse, then `prod`. Edit the script per release to add `emdash schema` calls; regen types after. Ordering: additive changes *before* the code that uses them; removals *after*. |
| **Content** | **Prod is source of truth** — editors edit prod live. Only *dev-owned* seed/demo content promotes, via scripted `emdash content` ops. **Never** dump dev→prod (it would clobber live content, users, revisions, form submissions). |

Refresh the dev sandbox from prod anytime with the **Refresh dev from prod**
workflow (clones prod D1 → dev D1; recreate `vitops-dev` first if it already has
tables). R2 media sync is a TODO (see that workflow's comment).

## A/B testing

Dormant — no experiment is defined. See AGENTS.md, "A/B testing", for how to add
one (`site.experiments`, per-page `prerender = false`, branch on the cookie).
Reporting goes to Plausible once it is configured; don't launch a test before.

## Gotchas

- **`wrangler --env dev` does not work.** `@astrojs/cloudflare` strips top-level
  `env` blocks from its generated config. Dev deploys go through
  `scripts/build-dev-wrangler.mjs` → a flat `dist/server/wrangler.dev.json`
  deployed with `--config`. On the first real dev deploy, confirm `--config`
  overrides `.wrangler/deploy/config.json`; if not, `cp dist/server/wrangler.dev.json dist/server/wrangler.json`
  before `wrangler deploy` as a fallback.
- **Non-prod hosts are `noindex`.** Middleware sets `X-Robots-Tag: noindex` for
  any host ≠ `vitops.ca` (covers dev + `*.workers.dev`). Dev-site **auth is still
  a TODO** — the dev site is currently open (Cloudflare Access is the intended fix).
- **Email sends from `send.vitops.ca`** on every env, including dev — the dev
  contact form sends real mail unless you gate it. (Apex `vitops.ca` is Zoho MX;
  don't change the `send_email` domain — see the memory note.)
- **Cache-keying:** a page under experiment is on-demand and varies by its
  `_ab_<key>` cookie. If it is ever put behind a shared/CDN cache, the key
  **must** include that cookie, or B visitors can get cached A HTML.
- **Middleware + Astro v7:** GitHub OAuth needed a pnpm patch for the
  `locals.runtime.env` change — respect it when touching middleware.

## File map

| Concern | Path |
|---|---|
| A/B + noindex middleware | `src/middleware.ts` |
| Dev flat-config generator | `scripts/build-dev-wrangler.mjs` |
| Schema promotion template | `scripts/promote-schema.sh` |
| CI | `.github/workflows/{deploy-dev,deploy-prod,promote,promote-schema,refresh-dev}.yml` |
