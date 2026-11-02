# Google Play release documentation — design

## Intent

Bring the Google Play release documentation in sync with `main@ecc99323915bfe17ff4267e8ea0d2bfbf0f88b78` after PR #47, while Claude Code works independently on Android validation, Store screenshots and Android 13 monochrome icon support.

## Goals

- Remove stale pre-#47 status from the Google Play checklist.
- Record current Google Play asset and testing requirements from official Google documentation checked on 2026-11-02.
- Keep Store copy aligned with the actual local-only Android V1.
- Provide a deployable static privacy-policy HTML template without inventing publisher identity/contact details.
- Keep this branch documentation-only so it can merge without conflicting with Claude's Android branch.

## Non-goals

- No publication to Google Play.
- No Play Console actions, purchases, signing keys or secrets.
- No application code changes.
- No generated commercial screenshots or feature graphic on this branch.
- No invented legal identity, address or contact information.

## Approach

Use the existing `docs/google-play/` release pack as the source of truth, update only stale statuses and external-rule wording, and add one standalone public-policy HTML template. Claude owns Android validation/scripts/assets; this branch owns release documentation, policy wording and Store metadata.

## Constraints

- Preserve `fr.finot.academie` and version `1.0.0` / `8075006` unless a later verified build changes them.
- Keep V1 claims limited to features proven in the current Android build.
- Privacy policy must remain accurate for a local-only V1 with no ads, analytics, account or production backend.
- Publisher identity/contact placeholders remain explicit until supplied by the owner.
