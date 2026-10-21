# Finot Académie — banques de questions

Ce dossier complète les générateurs procéduraux de Finot Académie.

## Principe

Finot Académie ne stocke pas des milliers de copies presque identiques d’un calcul. Chaque chapitre possède déjà un générateur `g(d)` capable de produire des variantes. Le moteur `js/question-rotation.js` lui ajoute :

- une rotation par fenêtre de 12 heures ;
- un compteur propre au chapitre et au niveau de difficulté ;
- une mémoire des questions récemment vues pour éviter les répétitions ;
- un espace de tirage séparé pour les futures interrogations parent ;
- une génération déterministe pendant la création d’une question, ce qui permet d’auditer/reproduire un tirage en cas de bug.

## Banques enrichies

`banks.js` contient des situations rédigées à la main : contextes, problèmes, documents, amorces, phrases, scénarios scientifiques ou historiques. Elles sont facultatives : le moteur principal continue de fonctionner si une matière n’a pas encore de banque enrichie.

Règles d’ajout :

1. une entrée doit être adaptée à la classe et à la notion ;
2. ne jamais mettre la réponse dans l’énoncé ;
3. préférer plusieurs contextes réellement différents à des reformulations superficielles ;
4. une interrogation parent ne doit pas dépendre d’une question déjà mémorisable à l’identique ;
5. tout nouveau générateur/banque doit passer `tests/full-content-audit-v2.mjs` et les audits navigateur.
