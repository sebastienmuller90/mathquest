# Finot Académie — Google Play store listing (English, en-US / en-GB)

Texte anglais prêt à copier dans Play Console (fiche localisée en anglais), **non soumis**. Rédigé le 04/11/2026 d'après le contenu réellement présent dans le dépôt (voir §5) ; équivalent de `store-listing-fr.md`, dont il reprend les mêmes promesses, sans en ajouter.

Limites Google Play vérifiées le 04/11/2026 sur https://support.google.com/googleplay/android-developer/answer/9859152 : nom 30 caractères, description courte 80, description longue 4 000 (caractères pleine et demi-chasse comptés pareil). Comptes exacts faits par script Node (points de code Unicode).

## 1. App name

```text
Finot Académie
```

14 / 30 caractères.

## 2. Short description

```text
French school lessons and exercises, CP to 3e. No ads, works offline.
```

69 / 80 caractères.

## 3. Full description

```text
Finot Académie helps pupils from CP to 3e (the French school years, roughly ages 6 to 15) with detailed lessons, interactive exercises and revision that adapts to their level. Finot, the friendly fox companion, guides them step by step. The content follows the French school curriculum and is written in French.

FOR PUPILS
• Lessons explained simply, with examples and illustrations
• Exercises with progressive hints and detailed step-by-step corrections
• A starting diagnostic to find the right level
• Personalised revision ("5 minutes intelligentes") that comes back to past mistakes
• Reading, dictation and language lessons with read-aloud support
• Maths, French, English, Italian, history-geography, civics and other subjects
• Rewards (XP, badges) to encourage regular practice, with no in-app purchases
• A dyslexia-friendly reading mode, a dark theme, and support for the phone's text size

FOR PARENTS
• A parents' area protected by a code: progress overview, settings and skills practised
• Manual export and import of progress
• No account to create

YOUR PRIVACY
• Works offline: lessons and exercises are built into the app
• Your child's information stays on the device and is not sent to the publisher
• No ads, no trackers and no in-app purchases in this version
• No request for microphone, camera, location or contacts access

Finot Académie is based on the school and middle-school curricula in France. It is an independent app: it is not published or endorsed by the French Ministry of National Education.
```

1530 / 4 000 caractères.

## 4. Release notes (version 1.0.0)

```text
First release of Finot Académie: lessons, exercises, dictations, reading, languages and personalised revision from CP to 3e. Finot guides pupils step by step, with a parents' area, dyslexia-friendly mode, dark theme and offline use. No ads and no account required.
```

264 / 500 caractères. Variante courte :

```text
First release of Finot Académie: lessons and exercises from CP to 3e, personalised revision, parents' area, dyslexia-friendly mode and offline use. No ads and no account required.
```

179 / 500 caractères.

## 5. Preuves de véracité (contenu réel)

| Affirmation | Preuve dans le dépôt |
|---|---|
| CP to 3e, French curriculum, content in French | `js/primary-engine.js` (primaire), `data/primary/cp.js` à `cm2.js`, `data/college/` (6e–3e) |
| Subjects: maths, French, English, Italian, history-geography, civics | `SUBJECTS` dans `js/app-content.js` ; Italien = collège uniquement |
| Fox companion Finot | `js/app-screens.js` (assistant 🦊, réponses locales, aucun appel réseau) |
| Read-aloud | moteur TTS du système (`js/platform-tts.js`) |
| Dyslexia-friendly mode, dark theme | `js/dys-mode.js`, `js/dys-mode.css` |
| Export / import of progress | `js/app-actions.js` (code d'export dans l'espace Parents) |
| No ads / trackers / purchases / account / sensitive permissions | `data-safety-draft.md` §2, manifeste Android (`INTERNET` seule, `AD_ID` retiré) |
| Not endorsed by the Ministry | mention explicite, aucun logo officiel |

## 6. Règles de prudence

- Aucun « certified », « official », « best », « #1 », « free forever », « approved by teachers/ministry ».
- « Based on the curricula » et non « compliant with the official curriculum ».
- L'application est **en français** : la fiche anglaise le dit explicitement pour ne pas induire en erreur un utilisateur anglophone.
- Aucune fonction de suivi à distance, cloud ni micro (absents de la V1).
