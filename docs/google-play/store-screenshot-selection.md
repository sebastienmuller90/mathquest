# Finot Académie — sélection commerciale des captures Google Play

Référence produit : générateur `tools/store-screenshots.mjs` présent dans `main`.

Objectif : utiliser au maximum les **8 captures par type d'appareil** autorisées par Google Play, avec de vraies vues de l'application et un profil fictif uniquement.

## Set final recommandé — téléphone

| Ordre | Scénario générateur | Rôle commercial | Texte alternatif conseillé |
|---:|---|---|---|
| 1 | `01-accueil` | Montrer immédiatement Finot, la personnalisation et l'univers élève | `Accueil de Finot Académie avec Finot et la séance personnalisée d'un élève fictif de CM1.` |
| 2 | `03-cours` | Prouver la profondeur et l'illustration des cours | `Cours illustré de sciences de CM1 consacré aux phases de la Lune.` |
| 3 | `04-exercice` | Montrer l'interactivité et les exercices réels | `Exercice de mathématiques de CM1 avec choix de réponses et aide pédagogique.` |
| 4 | `05-correction` | Mettre en avant l'explication après erreur | `Correction détaillée d'un exercice avec explication pédagogique après une réponse incorrecte.` |
| 5 | `06-parcours` | Montrer l'adaptation au niveau de l'élève | `Parcours personnalisé proposant des activités adaptées au niveau de l'élève fictif.` |
| 6 | `09-finot-chat` | Différencier le produit avec l'assistant Finot local | `Assistant Finot répondant dans l'application à une question sur les XP.` |
| 7 | `10-progression` | Prouver le suivi de progression | `Écran de progression avec niveau, étoiles, série de jours et taux de réussite.` |
| 8 | `11-espace-parents` | Rassurer les parents et montrer le suivi local | `Espace Parents avec temps de travail, exercices, leçons et matières d'un profil fictif.` |

## Set final recommandé — tablette

Utiliser les **mêmes huit scénarios dans le même ordre** afin de conserver une narration commerciale cohérente entre téléphone et tablette.

Google recommande/attend au moins quatre captures pour les grands écrans ; ce set de huit dépasse donc ce minimum et montre l'expérience réelle sur tablette.

## Captures de réserve

Les trois scénarios suivants restent générés mais ne font pas partie du set principal V1 :

- `02-matieres` — utile si une capture principale est visuellement faible ;
- `07-lecture` — excellente alternative pour une campagne mettant l'accent sur le français/lecture ;
- `08-dictee` — alternative pour mettre en avant le français et la lecture à voix haute.

Ils peuvent remplacer une capture du set principal **sans modifier le produit** après comparaison visuelle des PNG finaux.

## Règles avant téléversement

1. Générer téléphone + tablette depuis le **même commit `main` que la release candidate finale**.
2. Utiliser uniquement le profil fictif « Léo » CM1 fourni par le générateur.
3. Vérifier qu'aucun toast, dialogue de permission, clavier, notification ou artefact de debug n'est visible.
4. Vérifier le cadrage complet de Finot Chat après résolution de #54.
5. Ne pas ajouter de faux écran, de fonction future ou de données réelles d'enfant.
6. Conserver les PNG originaux non retouchés comme preuve de provenance.
7. Si une version marketing avec habillage est produite ensuite, conserver l'interface réelle dominante, surtout dans les trois premières images.
8. Contrôler les fichiers selon les exigences Google Play au moment du téléversement.

## Contrôle final par lot

Pour chaque type d'appareil :

- [ ] 8 fichiers présents ;
- [ ] ordre 01 → 08 validé ;
- [ ] interface réelle et lisible ;
- [ ] aucune donnée personnelle ;
- [ ] aucune ancienne palette violette résiduelle ;
- [ ] chat Finot entièrement cadré ;
- [ ] écran Parents orange/crème actuel ;
- [ ] résolution/aspect ratio conformes ;
- [ ] textes alternatifs prêts dans Play Console ;
- [ ] provenance commit + date enregistrées dans `manifest.json` ou le dossier de release.
