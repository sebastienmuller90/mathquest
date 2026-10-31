# Finot Académie — État orchestration multi-store

Date : 2026-10-31

## Branches

- `main` : base produit stable connue avant correctif CI.
- `chatgpt/multistore-release-orchestration` : documentation/orchestration uniquement.
- `chatgpt/fix-ci-ubuntu24` : correctif CI isolé, PR #37, validé vert, non fusionné à ce stade.
- `claude/multistore-runtime` : non visible sur GitHub au dernier contrôle.

## PR

### #35 — orchestration

- DRAFT ;
- aucune modification produit/runtime ;
- ne pas fusionner avant comparaison avec Claude et revue finale.

### #37 — CI Ubuntu

- un seul fichier ;
- `browser.runs-on: ubuntu-latest` → `ubuntu-24.04` ;
- regression : PASS ;
- Chromium : PASS ;
- Firefox : PASS ;
- WebKit : PASS ;
- Primary special depth : PASS ;
- prête à fusionner mais consigne explicite de ne pas auto-fusionner.

## Supabase

État réel : aucun projet Supabase Finot créé.

Donc :

- aucune donnée enfant Finot actuellement stockée dans Supabase ;
- aucune RLS/RPC live Finot à corriger ;
- code frontend de sync = prototype/interface prévue ;
- création projet = décision administrative ultérieure avec accord explicite.

Préparé :

- data map ;
- backend blueprint ;
- schéma/RPC spec ;
- plan tests sécurité ;
- minimisation ;
- suppression/rétention à implémenter avant activation.

## Gates P0

### Store

- privacy policy finale publique ;
- Data Safety sur build réel ;
- comportement microphone Android validé ;
- validation physique critique finale ;
- aucun P0 sécurité runtime.

### Avant cloud Supabase

- payload allowlist ;
- date naissance hors cloud ;
- migration schéma/RPC/RLS ;
- tests isolation A/B ;
- suppression cloud ;
- rétention/backups ;
- advisors sécurité/performance.

## P1

- fusion du correctif CI #37 ;
- runtime Android/AAB ;
- manifest PWA enrichi ;
- assets Store produits ;
- tests appareils Android/Windows/Samsung ;
- versioning build final ;
- protection `main` à décider ;
- analytics restent désactivés tant que fournisseur non validé.

## Livrables orchestration disponibles

- `multistore-v1-release-strategy.md`
- `privacy-data-map.md`
- `factory-blueprint.md`
- `store-metadata-draft.md`
- `privacy-policy-draft.md`
- `multistore-release-gates.md`
- `runtime-p0-handoff.md`
- `android-permissions-matrix.md`
- `store-release-checklists.md`
- `multistore-versioning.md`
- `store-assets-spec.md`
- `public-repo-security-audit.md`
- `supabase-backend-blueprint.md`
- `supabase-schema-rpc-spec.md`
- `supabase-security-test-plan.md`
- `analytics-privacy-first.md`
- `monetization-parent-safe.md`

## Ordre d'exécution recommandé

1. fusionner #37 après autorisation explicite ;
2. vérifier `main` et CI post-merge ;
3. synchroniser la branche #35 avec le nouveau `main` sans réécriture d'historique ;
4. attendre/pousser `claude/multistore-runtime` ;
5. comparer branches fichier par fichier ;
6. fermer les P0 runtime ;
7. construire AAB dev ;
8. tests Android réels ;
9. enrichir PWA/manifest de manière coordonnée ;
10. finaliser privacy/Data Safety ;
11. produire assets définitifs ;
12. Microsoft package + tests Windows ;
13. Samsung variant + tests appareil ;
14. validation physique finale ;
15. seulement ensuite décisions administratives/publication.

## Progression vérifiée

```text
GLOBAL          ███████░░░ 70 %
Audit réel      ████████░░ 80 %
Privacy         █████████░ 90 %
Google Play     ████████░░ 76 %
Microsoft       ███████░░░ 68 %
Samsung         ██████░░░░ 62 %
PWA             ███████░░░ 68 %
Security        ████████░░ 82 %
Factory         █████████░ 92 %
Supabase design █████████░ 90 %
CI infra        ██████████ 100 % validé sur PR #37, non fusionné
```

Ces pourcentages représentent le travail effectivement vérifié/préparé ; ils ne signifient pas que les stores sont publiables aujourd'hui.
