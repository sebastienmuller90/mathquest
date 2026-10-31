# Finot Académie — preuves de hardening Release Candidate

Date : 2026-10-31

Ce document consigne les deux derniers correctifs de sécurité/privacy appliqués sur la candidate Android/Store avant le freeze RC.

## 1. Android FileProvider

Défaut constaté : `android/app/src/main/res/xml/file_paths.xml` exposait un `external-path` global alors que Finot n'utilise aucun partage de stockage externe nécessitant cette surface.

TDD :

1. ajout d'un test statique exigeant l'absence de `external-path` et un cache interne uniquement ;
2. test rouge confirmé : 28/29 contrôles Android passaient, seul FileProvider échouait ;
3. correction minimale : `cache-path` interne uniquement ;
4. validation verte : suites multistore/hardening, Gradle réel, APK, AAB et audit du manifeste.

État final : **PASS**.

## 2. Suppression locale d'un profil enfant

Défaut constaté : `deleteProfile()` supprimait le profil de la base active mais conservait silencieusement une copie complète dans `mathquest_profile_deleted_backup`, sans TTL ni parcours de restauration identifié.

TDD :

1. extension du parcours E2E multi-profils ;
2. suppression réelle d'un profil parmi cinq ;
3. invariants exigés : quatre autres profils intacts, profil cible absent, aucune copie cachée ;
4. test rouge confirmé : 9/10 PASS, unique échec `backup:"présent"` ;
5. correction minimale : ne plus créer ce backup et supprimer une éventuelle ancienne clé legacy lors d'une suppression autorisée.

État attendu après CI du présent commit : **aucune copie cachée complète après suppression de profil**.

## 3. Règle de freeze

Après validation verte de ce HEAD :

- aucune nouvelle fonctionnalité V1 ;
- seuls P0/P1, défauts appareils, conformité Store et métadonnées sont autorisés ;
- aucune fusion vers `main` sans accord explicite du propriétaire ;
- aucune publication, signature production, package ID définitif ou backend production sans accord explicite.
