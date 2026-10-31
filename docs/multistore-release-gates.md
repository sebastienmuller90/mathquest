# Finot Académie — gates de release multi-store

Référence : `main` @ `05b4c0ce21bd78a9027367d1219e660ec86f7bda`

## 1. Règle de décision

Aucune publication Store tant qu’un P0 est ouvert.

La CI verte ne remplace pas les tests appareil réel ni les preuves de sécurité backend.

## 2. P0 — bloquants publication

| ID | Sujet | Propriétaire principal | Preuve de fermeture attendue |
|---|---|---|---|
| P0-01 | Isolation Supabase inter-familles | Claude/runtime + backend | tests négatifs lecture/écriture croisée + audit RPC/RLS |
| P0-02 | Payload cloud trop large | Claude/runtime | allowlist explicite + test de contrat |
| P0-03 | Date de naissance complète envoyable au cloud | Claude/runtime | test prouvant absence du champ dans payload distant |
| P0-04 | Suppression cloud non démontrée | Claude/runtime + backend | action suppression + test backend + ancien lien invalide |
| P0-05 | Rétention backend non définie | Orchestration/produit | durée documentée + backend aligné |
| P0-06 | Privacy policy non publiable | ChatGPT/orchestration | texte final + identité/contact + URL publique |
| P0-07 | Data Safety non finalisée | ChatGPT + Claude | questionnaire aligné au binaire/réseau réel |
| P0-08 | Micro/reconnaissance vocale Android non caractérisée | Claude/runtime | preuve traitement/permission ou feature désactivée V1 |

## 3. P1 — avant V1 production

| ID | Sujet | Propriétaire | Critère |
|---|---|---|---|
| P1-01 | AAB release production | Claude | build reproductible signé |
| P1-02 | target API Google actuel | Claude | build conforme Play |
| P1-03 | permissions Android minimales | Claude + ChatGPT | inventaire manifest + justification |
| P1-04 | tests Android réels | Claude/QA | installation, offline, update, micro, stockage |
| P1-05 | manifest PWA Store-quality | coordination | validé sans régression PWA |
| P1-06 | assets Google | produit/design | icon, feature graphic, screenshots |
| P1-07 | assets Microsoft | produit/design | desktop screenshots + tile |
| P1-08 | assets Samsung | produit/design | icon + 4–8 screenshots |
| P1-09 | validation physique Finot finale | QA | protocole physique complété |
| P1-10 | changelog/versioning | orchestration | version RC figée |
| P1-11 | closed testing Google si applicable | administratif | 12 testeurs/14 jours selon compte concerné |
| P1-12 | support/contact publics | produit | email/URL fonctionnels |

## 4. P2 — après V1 possible

- analytics produit avancés ;
- optimisation Store A/B ;
- monétisation réelle ;
- enrichissements UX secondaires ;
- Amazon Fire Tablet ;
- automatisation poussée des publications.

## 5. Gates par canal

### Google Play

GO uniquement si :
- P0 tous fermés ;
- AAB signé ;
- target API conforme ;
- Data Safety final ;
- Families/Target Audience/IARC complétés ;
- privacy URL publique ;
- assets prêts ;
- test fermé terminé si requis ;
- accord explicite de publication.

### Microsoft Store

GO uniquement si :
- P0 tous fermés ;
- PWA packaging validé ;
- install/update/offline Windows testés ;
- listing/asset/privacy prêts ;
- aucun fork fonctionnel Windows ;
- accord explicite de publication.

### Samsung Galaxy Store

GO uniquement si :
- base Android Google stabilisée ;
- variante Samsung issue du même projet ;
- aucun mécanisme de self-update natif non conforme ;
- metadata/screenshots exacts ;
- privacy prête ;
- accord explicite de publication.

### Web / PWA

GO release stable uniquement si :
- P0 applicables fermés ;
- offline/update verts ;
- stockage/migrations verts ;
- validation physique minimale ;
- privacy accessible.

### Amazon Fire

NO-GO V1. Nouvelle décision séparée après stabilisation des canaux prioritaires.

## 6. Matrice de coordination Git

### Branche ChatGPT

`chatgpt/multistore-release-orchestration`

Doit privilégier :
- `docs/` ;
- conformité ;
- release planning ;
- metadata ;
- QA gates ;
- Factory Blueprint.

### Branche Claude

`claude/multistore-runtime`

Doit privilégier :
- Android/Capacitor ;
- code runtime ;
- permissions ;
- sécurité backend/runtime ;
- tests techniques ;
- builds.

## 7. Gate de fusion des deux chantiers

Avant toute fusion :

1. vérifier SHA de base ;
2. vérifier `git status`/worktrees côté Claude ;
3. pousser les branches ;
4. comparer les diffs ;
5. identifier fichiers communs ;
6. résoudre les conflits consciemment ;
7. exécuter tests ciblés ;
8. exécuter suite complète ;
9. audit privacy/security ;
10. CI verte ;
11. revue humaine ;
12. seulement ensuite merge.

Aucun merge automatique de `main` n’est autorisé par ce document.

## 8. Definition of Done — Application #001

Finot Académie devient officiellement le Blueprint #001 de l’App Factory lorsque :

- Google Play est prêt ou publié après accord ;
- Microsoft Store est prêt ou publié après accord ;
- Samsung est prêt à partir de la même base Android ;
- PWA reste stable ;
- P0 = 0 ;
- privacy/data map sont stables ;
- Factory Core v1 est extrait ;
- le pipeline de release est reproductible ;
- les leçons de publication sont documentées pour l’app #002.
