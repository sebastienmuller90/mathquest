# Tableau de bord — Finot Académie, objectif « release ready »

Dernière mise à jour : 04/11/2026 — base `main` = `1e7bbd0a143cfeb4bf1bd06f9609b1f7e53fe56d` (CI verte).

Quatre niveaux, volontairement distincts (aucun 100 % tant qu'un niveau obligatoire n'est pas démontré) :

1. **Développement terminé** — fonctionnalités V1 présentes, aucun défaut P0/P1 connu.
2. **Validation technique terminée** — tests verts, builds reproductibles, recette émulateur.
3. **Dossier Store prêt** — visuels, textes, déclarations préparés **et** vérifiés.
4. **Publication effectivement réalisée** — compte, signature, téléversement : **non réalisée**.

## Synthèse

| Chantier | Dév. | Validation technique | Dossier Store | Publication |
| --- | --- | --- | --- | --- |
| PWA / hors ligne / mises à jour | terminé | terminé (CI + run-all) | — | — |
| Android V1 | terminé | terminé sur émulateurs ; **appareil physique non testé** | prêt côté assets, déclarations à saisir | non réalisée |
| iOS | en cours (PR dédiée) | **non exécutable** sans Mac/Xcode | docs présentes (PR #70/#71), à compléter | non réalisée |
| Conformité Stores | — | — | vérification des sources officielles en cours | — |
| Monétisation V1.1 | hors V1 (architecture seule) | — | — | — |

## Chantiers

### PWA, Service Worker, cache, mises à jour — 100 % (dév. + validation)
- Fait : course d'activation du service worker corrigée (#72), test de non-régression exécuté en CI (#73), `serve()` du harnais ne tire plus de port interdit par Chromium (#76).
- Tests : CI complète verte sur les PR ; `run-all` final : 1679 PASS + 1 FAIL (timeout de chargement dû à la contention CPU, `release-responsive`), **rejoué seul : 9/9 PASS**.
- Reste : rien.

### Interface, responsive, accessibilité, chat Finot, espace Parents — 100 % (dév. + validation)
- Fait : chat Finot lisible sur petit écran (#54, #74) ; lien vers la politique de confidentialité **dans l'espace Parents uniquement** (#75), jamais dans l'espace enfant.
- Tests : `finot-chat-initial-geometry`, `parent-privacy-link`, balayages responsive (683 contrôles), clavier/accessibilité.

### Android natif — dév. 100 %, validation technique 100 % hors appareil physique
- AAB non signé `8075012` : SHA-256 `09ab5ed9…c93c94`, **build reproductible démontré** (deux builds identiques).
- Recette émulateur : téléphone 34/0/1, tablette 34/0/1 (la première exécution tablette avait donné 4 FAIL au premier démarrage à froid ; rejouée, 34/0 — voir `docs/google-play/ASSET_STATUS_2026-11-04.md`).
- Visuels finaux : icône 512, Feature Graphic 1024×500, 11 captures téléphone + 11 tablette, empreintes SHA-256 dans `ASSET_STATUS_2026-11-04.md`.
- **Reste (humain)** : clé d'upload et signature, appareil physique, compte Play Console.

### iOS — voir la PR `claude/ios-capacitor`
- Aucun build iOS ne peut être exécuté ici (pas de Mac). Tout ce qui exige Xcode est marqué « non exécuté ».

### Google Play / App Store (dossiers)
- Google Play : `docs/google-play/*`, état du 04/11 ; vérification de conformité aux sources officielles en cours (PR `claude/docs-conformite-stores`).
- App Store : PR #70/#71 (docs) à arbitrer.

### Monétisation
- V1 gratuite, sans publicité ni achat intégré, inchangée. Architecture V1.1 rédigée séparément, sans code ni dépense.

## Interventions humaines obligatoires (liste minimale)
Voir `docs/google-play/final-human-inputs.md` et le rapport final : clé d'upload + signature de l'AAB, compte Play Console (identité légale), appareil physique, saisie des déclarations, téléversement ; pour iOS : Mac + Xcode 26, compte Apple Developer.
