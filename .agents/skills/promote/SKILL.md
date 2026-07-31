---
name: promote
description: Promote dev → main to deploy the site to production (vitops.ca). Use ONLY when the user explicitly asks to promote, ship, or release dev to prod (e.g. "/promote", "promote to prod", "ship dev to production"). This is a deliberate production deploy — never trigger it automatically from generic "deploy" talk or as a side effect of other work.
---

# Promote (dev → main → production)

Promotion is the **manual** step that ships reviewed `dev` code to production. It
dispatches the **"Promote dev → main"** GitHub Action (`.github/workflows/promote.yml`),
which opens a PR from `dev` into the protected `main` branch and enables auto-merge.
Merging `main` triggers **Deploy prod** (`deploy-prod.yml`), which ships `vitops.ca`.

Deploys that are **already automatic** (do not use this skill for them):

- **dev** auto-deploys on every push/merge to `dev` (`deploy-dev.yml` → `dev.vitops.ca`).
- **prod** auto-deploys on every push to `main` (`deploy-prod.yml` → `vitops.ca`).

So this skill's only job is to kick off the `dev → main` promotion. It does **not**
promote schema/content — that's a separate manual step (see below).

## Steps

1. **Confirm intent.** This ships to production. Briefly state what will happen
   ("This opens a PR from `dev` into `main`; merging deploys `vitops.ca`.") and
   proceed — the user invoking this skill is the confirmation. Only pause to ask
   if they haven't clearly asked to go to prod.

2. **Dispatch the workflow** with the GitHub MCP tool:

   ```
   mcp__github__actions_run_trigger
     method:      run_workflow
     owner:       getvitops
     repo:        website
     workflow_id: promote.yml
     ref:         main
   ```

   (`ref: main` picks which copy of the workflow file runs — the workflow itself
   operates on `dev` and `main` regardless. `promote.yml` takes no inputs.)

3. **Find the run and report back.** Dispatch returns no run ID, so list the runs
   to get the URL:

   ```
   mcp__github__actions_list
     method:      list_workflow_runs
     owner:       getvitops
     repo:        website
     resource_id: promote.yml
     per_page:    1
   ```

   Give the user the run's `html_url`. If they want, watch it: poll
   `list_workflow_runs` until `status: completed`, then report `conclusion`.

## What to tell the user after dispatch

- The workflow opens (or reuses) a PR **dev → main** and enables auto-merge.
- **`main` is branch-protected.** Whether the merge completes hands-off depends on
  the repo setup:
  - With **required reviews** (default), the PR waits for a human to approve — the
    default `GITHUB_TOKEN` can't approve its own PR. Point the user to the PR to
    approve it; only then does prod deploy.
  - If a `PROMOTE_TOKEN` secret (a PAT / GitHub App token allowed to bypass
    protection) is set, auto-merge completes on its own and prod deploys with no
    further action.
- Once `main` advances, **Deploy prod** runs automatically and ships `vitops.ca`.

## Schema / content changes

If this release changes the content model, code promotion is **not** enough — the
schema lives in the DB, not git. Run the **"Promote schema"** workflow
(`promote-schema.yml`) against `prod` separately. Ordering: additive changes
(new collection / optional field) **before** the code deploy that uses them;
removals **after** the code that stops using them. Mention this to the user only
if the release plausibly touched the schema.
