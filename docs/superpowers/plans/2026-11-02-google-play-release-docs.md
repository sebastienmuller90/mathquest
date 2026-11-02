# Google Play release documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Synchronize the Google Play release pack with the post-PR #47 state and current 2026 Google Play requirements, without touching application code.

**Architecture:** Keep `docs/google-play/` as the release source of truth. Update stale status/requirements in place, add a public static privacy-policy template, and keep publisher-specific values as explicit placeholders.

**Tech Stack:** Markdown, static HTML, GitHub documentation.

**Spec:** `docs/superpowers/specs/2026-11-02-google-play-release-docs-design.md`

## Global Constraints

- Documentation-only branch; no application code changes.
- No Play Console action, publication, purchase, signing key or secret.
- Preserve `fr.finot.academie` and `1.0.0` / `8075006` unless later verified code changes them.
- Do not invent publisher identity, postal address, email or final privacy-policy URL.
- External Google Play requirements must be checked against official Google sources dated/current on 2026-11-02.

## Review Focus

- No stale claim that PR #47/icon integration is still pending.
- Store icon requirement remains distinct from Android launcher icon assets.
- Closed-test rule is scoped to applicable new personal developer accounts.
- Store copy makes no claim for disabled backend/remote sync/ads/purchases.
- Public privacy template remains publishable only after publisher placeholders are filled.

---

### Task 1: Refresh release and asset checklists

**Files:**
- Modify: `docs/google-play/release-checklist.md`
- Modify: `docs/google-play/store-assets-checklist.md`

- [x] Record `main@ecc9932…` / PR #47 and current API 36 requirement.
- [x] Mark Android launcher icon integration READY while keeping Play Store 512×512 asset as a separate deliverable.
- [x] Confirm feature graphic 1024×500 no-alpha and closed-test 12/14 requirement from official sources.
- [x] Re-read both files for stale TODOs and contradictory status.

### Task 2: Refresh Store/Play Console metadata

**Files:**
- Modify: `docs/google-play/store-listing-fr.md`
- Modify: `docs/google-play/play-console-answers-draft.md`

- [x] Update verified base to current `main`.
- [x] Preserve only claims proven by current local-only V1.
- [x] Make the applicable personal-account closed-test requirement precise.
- [x] Keep publisher/contact/country/program decisions explicit and unresolved.

### Task 3: Add deployable privacy-policy template

**Files:**
- Create: `docs/google-play/privacy-policy-public.html`

- [x] Mirror the verified local-only privacy behavior from `privacy-policy-draft.md`.
- [x] Use a dependency-free static HTML document suitable for HTTPS static hosting.
- [x] Keep editor identity, address, email, publication date and canonical URL as obvious placeholders.
- [x] Verify no analytics, remote assets, scripts, cookies or trackers are included.

### Task 4: Verify branch and open draft PR

- [x] Compare branch against `main`; changes are documentation only.
- [x] Re-read changed files for contradictions and placeholders.
- [ ] Open a Draft PR to `main`; do not merge.
