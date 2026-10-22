/* Finot Académie — migration idempotente des anciennes clés de vocabulaire dupliquées. */
(function(root){
'use strict';
if(typeof window==='undefined')return;
const MOVES={
 'en|travel|train':'en|transport|train',
 'en|travel|plane':'en|transport|plane',
 'en|travel|airport':'en|city|airport',
 'it|travel|treno':'it|transport|treno',
 'it|travel|aereo':'it|transport|aereo',
 'it|travel|aeroporto':'it|city|aeroporto',
 'it|hobbies|cucina':'it|home|cucina'
};
const n=v=>Number.isFinite(+v)?+v:0;
function choose(a,b){
 if(!a)return b?{...b}:null;if(!b)return {...a};
 const la=n(a.last),lb=n(b.last),ba=n(a.box),bb=n(b.box);
 const src=la!==lb?(la>lb?a:b):(ba>=bb?a:b),out={...src};
 out.correct=Math.max(n(a.correct),n(b.correct));out.wrong=Math.max(n(a.wrong),n(b.wrong));
 out.last=Math.max(la,lb);out.box=Math.max(0,Math.min(5,n(src.box)));
 if(!Number.isFinite(+out.next))out.next=0;
 return out;
}
function migrateVocab(v){if(!v||typeof v!=='object'||Array.isArray(v))return false;let changed=false;
 for(const [oldKey,newKey] of Object.entries(MOVES)){if(!(oldKey in v))continue;v[newKey]=choose(v[oldKey],v[newKey]);delete v[oldKey];changed=true;}
 return changed;
}
function migrateAll(){let changed=false;
 try{if(typeof PDB==='object'&&PDB?.profiles)for(const p of Object.values(PDB.profiles)){p.vocab=p.vocab&&typeof p.vocab==='object'?p.vocab:{};changed=migrateVocab(p.vocab)||changed;}}catch(e){}
 try{if(typeof S==='object'&&S){S.vocab=S.vocab&&typeof S.vocab==='object'?S.vocab:{};changed=migrateVocab(S.vocab)||changed;}}catch(e){}
 if(changed)try{saveLocal();}catch(e){}return changed;
}
if(typeof MQHooks!=='undefined'){
 MQHooks.on('profile:changed',()=>migrateAll(),{id:'lexicon-cleanup-profile',order:3});
 MQHooks.on('home:rendered',()=>migrateAll(),{id:'lexicon-cleanup-home',order:3});
}
setTimeout(migrateAll,0);
root.MQLexiconMigration={version:'1.0',moves:MOVES,migrateVocab,migrateAll};
})(typeof window!=='undefined'?window:globalThis);
