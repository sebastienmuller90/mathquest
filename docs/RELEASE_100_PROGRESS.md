# Tableau de bord — Finot Académie, objectif « release ready »

Dernière mise à jour : 04/11/2026 — base `main` = `4bd274f` (après fusion de #71, #77, #78, #79).

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
| iOS | projet natif créé et fusionné (#79) | **non exécutable** sans Mac/Xcode ; test statique `ios-config` 39/39 | docs App Store fusionnées (#71), à finaliser avec le titulaire du compte | non réalisée |
| Conformité Stores | — | — | vérification sur sources officielles faite (#78), 5 écarts à trancher | — |
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

### iOS — dév. fait (#79), validation technique **non faite**
- Fait : `@capacitor/ios` 8.6.0 (Swift Package Manager), dossier `ios/` (bundle `fr.finot.academie`, iPhone + iPad, iOS 15 minimum, `PrivacyInfo.xcprivacy`, `Info.plist` sans permission, icône 1024 sans alpha, launch screen crème), `tests/ios-config.test.js` 39/39 en CI, procédure Mac dans `docs/ios/README.md`.
- **Non exécuté** : tout ce qui exige Xcode (build, simulateur, archive, TestFlight). Le `project.pbxproj` n'a jamais été ouvert dans Xcode.
- Écarts à trancher : âge visé 6–15 ans > Catégorie Enfants Apple (≤ 11 ans) ; déclaration de chiffrement à confirmer ; icône 1024 agrandie depuis 512.

### Google Play / App Store (dossiers)
- Google Play : `docs/google-play/*` + `ASSET_STATUS_2026-11-04.md` ; APK de recette `artifacts/google-play/recette/finot-academie-recette-debug-8075012.apk` (SHA-256 `9325049a3c2f633383e9fc088c4efb91389ae1f31161d034aa425c3b4bdb0441`, hors Git).
- Vérification de conformité sur sources officielles : `docs/stores/verification-conformite-2026-11.md` (#78). Écarts à trancher : statut « trader » (DSA), vérification des développeurs Android, permission INTERNET (suivi distant désactivé), public cible vs Catégorie Enfants Apple, code parent = empreinte 32 bits (barrière d'usage, à renforcer avant tout achat).
- App Store : `docs/app-store/*` (#71) fusionnée ; PR #64 et #70 fermées (contenu intégré / doublon).

### Monétisation
- V1 gratuite, sans publicité ni achat intégré, inchangée. Architecture V1.1 rédigée séparément, sans code ni dépense.

## Interventions humaines obligatoires (liste minimale)
Voir `docs/google-play/final-human-inputs.md` et le rapport final : clé d'upload + signature de l'AAB, compte Play Console (identité légale), appareil physique, saisie des déclarations, téléversement ; pour iOS : Mac + Xcode 26, compte Apple Developer.
