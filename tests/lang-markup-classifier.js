/* Classement prudent de la langue des passages en gras des cours approfondis de langues (P2-1, 01/11/2026).
   Règle : un passage n'est étranger (en / it) que s'il ne contient AUCUN marqueur français ; un passage mixte
   (« will + verbe de base ») ou un terme de grammaire (« prétérit ») reste français. Utilisé par le test de garde
   course-depth-lang-markup.test.js ; le balisage des données a été produit avec ces mêmes règles puis relu. */
'use strict';
const WORD=/[A-Za-zÀ-ÖØ-öø-ÿŒœ']+/g;
// Mots outils exclusivement français (absents de l'anglais courant).
const FR_EN=new Set(('le la les un une des du de et est sont pour avec ne pas il elle elles je tu nous vous ils qui que ce cette ces '+
 'mot mots phrase phrases verbe verbes forme formes base sauf toujours seul seule sans au aux sur dans ou quand être avoir mais donc '+
 'très comme tout tous toute toutes personne personnes nom noms temps passé présent futur participe singulier pluriel majuscule minuscule '+
 'terminaison accord sujet complément adjectif adverbe pronom exemple exemples règle sens si en se sa son ses leur leurs y à '+
 "c' d' j' l' n' qu' s' qu'il qu'on c'est d'un d'une l'on par faire sait livre rouge chiffre lettre consonne voyelle "+
 'après avant avril blanc corbeaux devant droit entre froid gazon habitude interdiction invariable inverse jamais lundi pangramme '+
 'petit preuves projet souvent uniforme vaccin tamise').split(/\s+/));
// Mots outils exclusivement français face à l'italien (on écarte la, le, un, il, tu, qui, ce, si, se, non… qui existent en italien).
const FR_IT=new Set(('de des du et est sont pour avec pas je nous vous ils elle elles que cette ces mot mots phrase phrases verbe verbes '+
 'forme formes sauf toujours sans au aux sur dans ou quand être avoir mais donc car très comme tout tous toute toutes les une en '+
 'personne personnes nom noms temps passé présent futur participe singulier pluriel majuscule minuscule terminaison accord sujet '+
 "complément adjectif adverbe pronom article exemple exemples règle sens leur leurs y c' j' qu' qu'il qu'on c'est l'on "+
 'faire lettre lettres consonne consonnes voyelle voyelles première premier deuxième '+
 // mots français ou anglais isolés présents dans le cours d'italien (faux amis, rappels) : pas de voix italienne
 'florence genre invariables minuscules omis parents relatives library').split(/\s+/));
const FR_ACCENT=/[éêçûôîâëïœ]/;           // lettres propres au français (hors noms propres capitalisés)
const IT_FINAL_E=/(ché|né|sé|tré)$/;        // perché, né, sé, ventitré… : é final italien
const EN_LOANS=/^(café|cafés|fiancé|fiancée|résumé|naïve|cliché|clichés)$/; // mots anglais accentués
function words(t){return (String(t).replace(/[’]/g,"'").match(WORD)||[]).map(w=>w.toLowerCase());}
function rawWords(t){return String(t).replace(/[’]/g,"'").match(WORD)||[];}
// lang : 'en' ou 'it'. Renvoie 'en' | 'it' | 'fr' | null (rien de lisible).
function classify(text,lang){const plain=String(text).replace(/<[^>]+>/g,' ').replace(/&[a-z]+;/g,' ');
 const raw=rawWords(plain);if(!raw.length)return null;
 const FR=lang==='it'?FR_IT:FR_EN;let fr=0;
 for(const w of raw){const lw=w.toLowerCase();
  if(FR.has(lw))fr++;
  // élision française collée (l'enfant, d'accord) : marqueur seulement face à l'anglais
  else if(lang==='en'&&/^(l|d|j|qu|c|n|s)'[a-zà-ÿ]/.test(lw))fr++;
  // Accent propre au français : mot en minuscule (les prénoms accentués d'une phrase anglaise ne comptent pas) ;
  // face à l'italien, on compte aussi les noms propres (« Comédie ») et le è placé au milieu d'un mot (« première »).
  if((lang==='it'||/^[a-zà-ÿœ]/.test(w))&&FR_ACCENT.test(lw)&&!(lang==='it'&&IT_FINAL_E.test(lw))&&!(lang==='en'&&EN_LOANS.test(lw)))fr++;
  else if(/è./.test(lw)&&(lang==='it'||/^[a-zà-ÿœ]/.test(w)))fr++;}  // è au milieu d'un mot (bibliothèque, première) ; pas « Inès » dans une phrase anglaise
 return fr?'fr':lang;}
module.exports={classify,words};
