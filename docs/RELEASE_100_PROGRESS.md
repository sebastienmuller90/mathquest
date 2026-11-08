# Tableau de bord — Finot Académie, objectif « release ready »

Dernière mise à jour : 08/11/2026 — base `main` = `924e0b9` (dernière fusion : #86 porte adulte du code parent). Seul un commit de documentation suit.

Quatre niveaux, volontairement distincts (aucun 100 % tant qu'un niveau obligatoire n'est pas démontré) :

1. **Développement terminé** — fonctionnalités V1 présentes, aucun défaut P0/P1 connu.
2. **Validation technique terminée** — tests verts, builds reproductibles, recette émulateur.
3. **Dossier Store prêt** — visuels, textes, déclarations préparés **et** vérifiés.
4. **Publication effectivement réalisée** — compte, signature, téléversement : **non réalisée**.

## Synthèse

| Chantier | Dév. | Validation technique | Dossier Store | Publication |
| --- | --- | --- | --- | --- |
| PWA / hors ligne / mises à jour | terminé | terminé (CI + `run-all` 1858/0) | — | — |
| Android V1 | terminé | terminé sur 3 émulateurs ; grand téléphone API 35 non testé ; **appareil physique non testé** | assets prêts, déclarations à saisir | non réalisée |
| iOS | projet natif fusionné (#79) | **non exécutable** sans Mac/Xcode ; tests statiques 63/63 et 90/90 | docs fusionnées (#71) | non réalisée |
| Conformité Stores | — | — | vérification faite (#78), écarts à trancher | — |
| Monétisation V1.1 | hors V1 (architecture seule) | — | — | — |

## Validation finale sur le HEAD `924e0b9`

- `run-all` complet : **1858 PASS, 0 FAIL**, 110 suites, 3235 s. `e2e` : **72/72**.
- Un premier `run-all` avait donné 5 FAIL, tous hors code applicatif : trois tests privés (`e2e`, `finot-assistant`, `accessibility`) ne franchissaient pas la porte adulte de #86 (corrigés avec `passAdultGate`), et `@capacitor/ios` manquait du `node_modules` local (la CI l'installe via `npm ci`).
- AAB non signé `8075016` : SHA-256 `c029eb0beaa55cf29016cdb462b90900ee0994b2a72f08cfe1352e9696119700`. Détails et empreintes de tous les visuels : `docs/google-play/ASSET_STATUS_2026-11-08.md`.

## Émulateurs réellement testés (08/11/2026)

| AVD | API | Suite appli | Suite réseau |
| --- | --- | --- | --- |
| Tablette | 36 | 34 / 0 / 1 | 24 / 0 |
| Téléphone standard (Pixel) | 36 | 34 / 0 / 1 | 24 / 0 |
| Petit téléphone | 30 | 34 / 0 / 1 | 24 / 0 |
| Grand téléphone | 35 | **non testé** (démarrage impossible : disque C: insuffisant) | **non testé** |

Les émulateurs ne prouvent pas le comportement sur appareil réel.

## Points ouverts (honnêtes)

- Grand téléphone API 35 à rejouer après libération de ≥ 12 Go sur C:.
- Bouton « Valider » parfois débordant sur tablette à police 2× + affichage agrandi : vu une fois, non reproduit en 3 essais, cause non établie.
- Test Firefox `pwa-update` instable en CI à une occasion, cause non établie.
- Permission `INTERNET` (suivi distant désactivé) : décision à prendre.
- Le verrou du code parent peut être contourné en avançant l'horloge ; code parent à renforcer avant tout achat.
- iOS : âge visé 6–15 ans > Catégorie Enfants Apple ; déclaration de chiffrement à confirmer.

## Interventions humaines obligatoires

1. Créer et sauvegarder la clé d'upload, puis signer l'AAB `8075016` (`D:\UpFactory\Releases\Signer-Finot-AAB.ps1`, mots de passe saisis par l'éditeur). Ne jamais téléverser un AAB non signé ; les AAB `8075012` et `8075014` sont obsolètes.
2. Tester sur appareil physique.
3. Compte Play Console (identité, statut « trader »), déclarations, republication de la politique de confidentialité publique, téléversement.
4. iOS : Mac + Xcode 26+, compte Apple Developer.
5. Libérer de la place sur C: pour tester le grand téléphone API 35.

Voir aussi `docs/google-play/final-human-inputs.md`.
