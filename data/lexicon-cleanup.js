/* Finot Académie — nettoyage des doublons exacts du lexique enrichi.
   Les anciens mots restent présents dans leur catégorie canonique ; les catégories enrichies gagnent
   de nouveaux mots utiles au lieu de répéter la même entrée. */
(function(root){
'use strict';
const L=root.MQ_LEXICON;if(!L)return;
const replacements={
 en:{travel:{
  train:['ferry','ferry','🚢'],
  plane:['platform','quai','🚉'],
  airport:['departure','départ','🛫']
 }},
 it:{travel:{
  treno:['traghetto','ferry','🚢'],
  aereo:['binario','voie','🚉'],
  aeroporto:['partenza','départ','🧳']
 },hobbies:{
  cucina:['cucinare','cuisiner','🍳']
 }}
};
for(const [lang,cats] of Object.entries(replacements))for(const [cat,map] of Object.entries(cats)){
 const words=L[lang]?.cats?.[cat]?.words;if(!Array.isArray(words))continue;
 for(let i=0;i<words.length;i++){const old=String(words[i]?.[0]||'').toLowerCase(),next=map[old];if(next)words[i]=next;}
}
// Les anciennes clés de progression représentent le même mot dans une catégorie dupliquée : elles
// doivent rejoindre la catégorie canonique, jamais le nouveau mot qui vient de remplacer le doublon.
const moved=root.MQ_LEXICON_MOVED||(root.MQ_LEXICON_MOVED={en:{},it:{}});moved.en=moved.en||{};moved.it=moved.it||{};
Object.assign(moved.en,{
 'travel|train':'transport|train',
 'travel|plane':'transport|plane',
 'travel|airport':'city|airport'
});
Object.assign(moved.it,{
 'travel|treno':'transport|treno',
 'travel|aereo':'transport|aereo',
 'travel|aeroporto':'city|aeroporto',
 'hobbies|cucina':'home|cucina'
});
root.MQLexiconCleanup={version:'1.0',replacements};
})(typeof window!=='undefined'?window:globalThis);
