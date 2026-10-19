import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const strip=s=>String(s??'').replace(/<[^>]*>/g,' ').replace(/&nbsp;|&#160;/g,' ').replace(/\s+/g,' ').trim();
const norm=s=>strip(s).toLowerCase();

function scriptsFromIndex(){
  const html=read('index.html'),out=[];let m;const re=/<script\s+src=["']([^"']+)["'][^>]*><\/script>/g;
  while((m=re.exec(html)))out.push(m[1].split(/[?#]/)[0]);
  return out;
}

const storage=new Map();
const fakeEl=()=>({
  style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},
  appendChild(){},remove(){},setAttribute(){},getAttribute(){return null;},
  addEventListener(){},removeEventListener(){},querySelector(){return null;},querySelectorAll(){return[];},
  getContext(){return null;},focus(){},click(){},scrollIntoView(){},
  innerHTML:'',textContent:'',value:'',checked:false,disabled:false
});
const document={
  readyState:'loading',body:fakeEl(),documentElement:fakeEl(),
  createElement(){return fakeEl();},createTextNode(t){return {textContent:String(t)};},
  getElementById(id){const e=fakeEl();if(id==='app')e.id='app';return e;},
  querySelector(){return null;},querySelectorAll(){return[];},addEventListener(){},removeEventListener(){}
};
const context={
  console,document,
  navigator:{userAgent:'MathQuestAudit',language:'fr-FR',onLine:true,serviceWorker:undefined},
  location:{protocol:'https:',hostname:'localhost',origin:'https://localhost',pathname:'/index.html',href:'https://localhost/index.html'},
  localStorage:{getItem:k=>storage.has(k)?storage.get(k):null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k),clear:()=>storage.clear()},
  sessionStorage:{getItem(){return null;},setItem(){},removeItem(){},clear(){}},
  matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}}),
  requestAnimationFrame:fn=>setTimeout(()=>fn(Date.now()),0),cancelAnimationFrame:clearTimeout,
  setTimeout,clearTimeout,setInterval,clearInterval,
  alert(){},confirm(){return false;},prompt(){return null;},
  Audio:function(){return{play(){return Promise.resolve();},pause(){}};},
  Image:function(){},speechSynthesis:{speak(){},cancel(){},getVoices(){return[];}},SpeechSynthesisUtterance:function(){},
  fetch:async()=>({ok:false,status:404,json:async()=>({}),text:async()=>''}),
  crypto:globalThis.crypto,URL,URLSearchParams,TextEncoder,TextDecoder,structuredClone,
  performance:{now:()=>Date.now()},
};
context.window=context;context.self=context;context.globalThis=context;
vm.createContext(context);

const scripts=scriptsFromIndex();
const loadUntil='js/app-content.js';
for(const src of scripts){
  if(!exists(src))throw new Error(`Script absent référencé par index.html: ${src}`);
  // Les modules d'interface suivants ne sont pas nécessaires pour auditer les banques pédagogiques.
  if(src.startsWith('js/vendor/'))continue;
  vm.runInContext(read(src),context,{filename:src,timeout:30000});
  if(src===loadUntil)break;
}

function expr(code){return vm.runInContext(code,context,{timeout:120000});}
const has=name=>expr(`typeof ${name}!=='undefined'`);
assert.ok(has('CH'),'Le registre historique CH doit être chargé');
assert.ok(has('check'),'Le correcteur check() doit être chargé');

// Construit une vue de tous les chapitres, quelle que soit leur origine (anciens CH + registres enrichis).
const inventory=expr(`(()=>{
 const out=[],seen=new Set();
 const add=c=>{if(c&&c.id&&!seen.has(c.id)){seen.add(c.id);out.push(c);}};
 if(typeof CH!=='undefined')Object.values(CH).flat().forEach(add);
 for(const k of Object.keys(globalThis)){
   const v=globalThis[k];
   if(Array.isArray(v))v.forEach(x=>{if(x&&typeof x==='object'&&typeof x.id==='string'&&(typeof x.g==='function'||x.f))add(x);});
   else if(v&&typeof v==='object'&&/^(CH_|MQ_)/.test(k)){
     for(const x of Object.values(v))if(Array.isArray(x))x.forEach(add);
   }
 }
 return out.map(c=>({id:c.id,name:c.name||'',icon:c.icon||'',hasLesson:!!c.f,hasGenerator:typeof c.g==='function'}));
})()`);
assert.ok(inventory.length>100,`Inventaire anormalement petit: ${inventory.length} chapitres`);
const ids=inventory.map(x=>x.id),dups=ids.filter((x,i)=>ids.indexOf(x)!==i);
assert.deepEqual([...new Set(dups)],[],'IDs de chapitres dupliqués');

const issues=[],warnings=[],stats={chapters:inventory.length,lessons:0,generators:0,questions:0,readingResources:0,readingQuestions:0,dictations:0};
const push=(sev,id,msg,extra='')=>(sev==='error'?issues:warnings).push({id,msg,extra});

// Leçons : titre, contenu, exemple/structure présents.
for(const c of inventory){
  if(!c.hasLesson)continue;stats.lessons++;
  const r=expr(`(()=>{const c=(()=>{const all=[];if(typeof CH!=='undefined')Object.values(CH).flat().forEach(x=>all.push(x));for(const k of Object.keys(globalThis)){const v=globalThis[k];if(Array.isArray(v))v.forEach(x=>{if(x&&x.id)all.push(x)});else if(v&&typeof v==='object'&&/^(CH_|MQ_)/.test(k))for(const x of Object.values(v))if(Array.isArray(x))x.forEach(y=>{if(y&&y.id)all.push(y)});}return all.find(x=>x.id===${JSON.stringify(c.id)});})();const f=c&&c.f;return !f?null:{t:String(f.t||''),l:Array.isArray(f.l)?f.l.map(String):[],ex:String(f.ex||'')}})()`);
  if(!r){push('error',c.id,'Fiche de leçon introuvable');continue;}
  if(strip(r.t).length<2)push('error',c.id,'Titre de leçon vide');
  if(!r.l.length||r.l.every(x=>strip(x).length<3))push('error',c.id,'Contenu théorique vide');
  if(r.l.some(x=>/undefined|\bNaN\b|\[object Object\]/.test(String(x))))push('error',c.id,'Contenu de leçon contenant une valeur invalide');
  if(r.ex&&/undefined|\bNaN\b|\[object Object\]/.test(r.ex))push('error',c.id,'Exemple de leçon invalide');
}

const auditGeneratorCode=`(()=>{
 const results={issues:[],warnings:[],stats:{generators:0,questions:0},types:{}};
 const strip=s=>String(s??'').replace(/<[^>]*>/g,' ').replace(/&nbsp;|&#160;/g,' ').replace(/\\s+/g,' ').trim();
 const canon=q=>{if(q.type==='choice')return q.ans;if(q.type==='num')return String(q.ans);if(q.type==='frac')return q.ans[0]+'/'+q.ans[1];if(q.type==='text')return q.acc&&q.acc[0];if(q.type==='order')return q.ans;if(q.type==='multi')return q.ans.map(String);return undefined;};
 const valid=(q,cid,d,i)=>{
   results.stats.questions++;results.types[q&&q.type]=(results.types[q&&q.type]||0)+1;
   const bad=m=>results.issues.push({id:cid,msg:m,extra:'d='+d+', tirage='+i});
   if(!q||typeof q!=='object')return bad('Générateur ne renvoie pas un objet question');
   if(!q.type)return bad('Question sans type');
   const prompt=q.q??q.prompt;if(strip(prompt).length<1)bad('Énoncé vide');
   if(/undefined|\\bNaN\\b|Infinity|\\[object Object\\]/.test(String(prompt)))bad('Énoncé contenant une valeur invalide');
   if(q.expl!=null&&/undefined|\\bNaN\\b|Infinity|\\[object Object\\]/.test(String(q.expl)))bad('Explication contenant une valeur invalide');
   if(q.type==='choice'){
     if(!Array.isArray(q.choices)||q.choices.length<2)bad('QCM avec moins de 2 choix');
     else{if(!Number.isInteger(q.ans)||q.ans<0||q.ans>=q.choices.length)bad('Index de bonne réponse invalide');const n=q.choices.map(x=>strip(x).toLowerCase());if(new Set(n).size!==n.length)bad('QCM avec choix identiques');if(n.some(x=>!x))bad('QCM avec choix vide');}
   }else if(q.type==='num'){if(!Number.isFinite(q.ans))bad('Réponse numérique non finie');}
   else if(q.type==='frac'){if(!Array.isArray(q.ans)||q.ans.length!==2||!Number.isFinite(+q.ans[0])||!Number.isFinite(+q.ans[1])||+q.ans[1]===0)bad('Fraction invalide');}
   else if(q.type==='text'){if(!Array.isArray(q.acc)||!q.acc.length||q.acc.every(x=>!strip(x)))bad('Réponses texte acceptées vides');}
   else if(q.type==='order'){if(!q.ans||!Array.isArray(q.tokens)||q.tokens.length<2)bad('Question de remise en ordre invalide');}
   else if(q.type==='multi'){if(!Array.isArray(q.ans)||!q.ans.length||q.ans.some(x=>!Number.isFinite(+x)))bad('Question multi invalide');}
   else results.warnings.push({id:cid,msg:'Type de question spécialisé non validé par le correcteur générique',extra:q.type});
   const a=canon(q);if(a!==undefined){try{if(!check(q,a))bad('La réponse canonique est refusée par check()');}catch(e){bad('check() lève une exception: '+e.message);}}
 };
 const all=[];if(typeof CH!=='undefined')Object.values(CH).flat().forEach(c=>all.push(c));
 for(const k of Object.keys(globalThis)){const v=globalThis[k];if(Array.isArray(v))v.forEach(x=>{if(x&&x.id&&typeof x.g==='function')all.push(x)});else if(v&&typeof v==='object'&&/^(CH_|MQ_)/.test(k))for(const x of Object.values(v))if(Array.isArray(x))x.forEach(y=>{if(y&&y.id&&typeof y.g==='function')all.push(y)});}
 const uniq=[...new Map(all.filter(c=>c&&c.id&&typeof c.g==='function').map(c=>[c.id,c])).values()];results.stats.generators=uniq.length;
 for(const c of uniq)for(const d of [1,2,3])for(let i=0;i<60;i++){try{valid(c.g(d),c.id,d,i);}catch(e){results.issues.push({id:c.id,msg:'Générateur lève une exception: '+e.message,extra:'d='+d+', tirage='+i});}}
 return results;
})()`;
const gen=expr(auditGeneratorCode);stats.generators=gen.stats.generators;stats.questions=gen.stats.questions;issues.push(...gen.issues);warnings.push(...gen.warnings);
assert.ok(stats.generators>50,`Trop peu de générateurs détectés: ${stats.generators}`);

// Lecture : toutes les ressources et toutes les questions sont structurées, liées à des chapitres, et corrigibles.
if(context.MQ_READING?.resources){
  const resources=Object.values(context.MQ_READING.resources);stats.readingResources=resources.length;
  const chapterIds=new Set(ids);
  const rid=new Set();
  for(const r of resources){
    if(!r.id||rid.has(r.id))push('error',r.id||'reading','ID de ressource de lecture absent/dupliqué');rid.add(r.id);
    if(!r.level||!r.title||!Array.isArray(r.paragraphs)||!r.paragraphs.length)push('error',r.id,'Ressource de lecture incomplète');
    for(const cid of r.chapterLinks||[])if(!chapterIds.has(cid))push('error',r.id,`Lien vers chapitre inexistant: ${cid}`);
    const qids=new Set();for(const q of r.questions||[]){stats.readingQuestions++;if(!q.id||qids.has(q.id))push('error',r.id,'ID de question lecture absent/dupliqué',q.id||'');qids.add(q.id);if(!q.prompt)push('error',r.id,'Question de lecture sans énoncé',q.id);if(!Array.isArray(q.competencies)||!q.competencies.length)push('warning',r.id,'Question de lecture sans compétence',q.id);if(q.evidenceParagraph!=null&&(q.evidenceParagraph<0||q.evidenceParagraph>=r.paragraphs.length))push('error',r.id,'Paragraphe de preuve hors limites',q.id);if(q.type==='choice'){if(!Array.isArray(q.choices)||q.choices.length<2||!Number.isInteger(q.ans)||q.ans<0||q.ans>=q.choices.length)push('error',r.id,'QCM de lecture invalide',q.id);const ch=q.choices.map(norm);if(new Set(ch).size!==ch.length)push('error',r.id,'QCM de lecture avec choix identiques',q.id);}if(q.type==='text'&&(!Array.isArray(q.acc)||!q.acc.length))push('error',r.id,'Réponse texte de lecture manquante',q.id);if(q.type==='order'&&(!Array.isArray(q.tokens)||!q.tokens.length||!q.ans))push('error',r.id,'Ordre de lecture invalide',q.id);}
  }
}

// Dictées : audit structurel des banques déclarées par le moteur si elles sont exposées.
for(const key of Object.keys(context)){
  if(!/DICT|DICTATION/i.test(key))continue;const v=context[key];
  const scan=x=>{if(Array.isArray(x))for(const e of x){if(typeof e==='string'&&e.trim().length>10)stats.dictations++;else if(e&&typeof e==='object')scan(e);}else if(x&&typeof x==='object')for(const y of Object.values(x))scan(y);};
  try{scan(v);}catch{}
}

// Références médias locales dans HTML + JS/CSS : toute ressource statique citée doit exister.
for(const file of ['index.html','parent.html','styles.css',...scripts.filter(s=>exists(s))]){
  const src=read(file);let m;const re=/(?:src=|href=|url\(|['"])(data\/(?:images|audio)\/[^'"\)\s?#]+|fonts\/[^'"\)\s?#]+|icon\.png|manifest\.webmanifest)/g;
  while((m=re.exec(src))){const p=m[1].replace(/^\.\//,'');if(!exists(p))push('error',file,`Ressource locale absente: ${p}`);}
}

// Déduplique les alertes identiques issues des tirages aléatoires.
const uniq=x=>[...new Map(x.map(v=>[`${v.id}|${v.msg}|${v.extra}`,v])).values()];
const errors=uniq(issues),warn=uniq(warnings);
const report={generatedAt:new Date().toISOString(),stats,errors,warnings:warn.slice(0,500),questionTypes:gen.types};
fs.writeFileSync(path.join(root,'tests/full-content-audit-report.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({stats,errorCount:errors.length,warningCount:warn.length,questionTypes:gen.types},null,2));
if(errors.length){console.error('\n=== ERREURS DÉTECTÉES ===');for(const e of errors.slice(0,200))console.error(`[${e.id}] ${e.msg}${e.extra?' — '+e.extra:''}`);process.exitCode=1;}else console.log('\nAudit intégral du contenu : aucune erreur bloquante détectée.');
