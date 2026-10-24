import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html');
const scripts=[...html.matchAll(/<script\s+src=["']([^"']+)["']/g)].map(m=>m[1].split(/[?#]/)[0]);
const el=()=>({style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},appendChild(){},remove(){},setAttribute(){},getAttribute(){return null},addEventListener(){},removeEventListener(){},querySelector(){return null},querySelectorAll(){return[]},getContext(){return null},focus(){},click(){},scrollIntoView(){},innerHTML:'',textContent:'',value:'',checked:false,disabled:false});
const document={readyState:'loading',visibilityState:'visible',body:el(),documentElement:el(),createElement:el,createTextNode:t=>({textContent:String(t)}),getElementById:()=>el(),querySelector(){return null},querySelectorAll(){return[]},addEventListener(){},removeEventListener(){}};
const store=new Map();
const c={console,document,navigator:{userAgent:'final-inventory',language:'fr-FR',onLine:true},location:{protocol:'https:',hostname:'localhost',origin:'https://localhost',pathname:'/'},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)},sessionStorage:{getItem(){return null},setItem(){},removeItem(){}},matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}}),setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame:f=>setTimeout(f,0),cancelAnimationFrame:clearTimeout,Audio:function(){return{play(){return Promise.resolve()},pause(){}}},Image:function(){},speechSynthesis:{speak(){},cancel(){},getVoices(){return[]}},SpeechSynthesisUtterance:function(){},fetch:async()=>({ok:false,status:404,text:async()=>'',json:async()=>({})}),crypto:globalThis.crypto,URL,URLSearchParams,TextEncoder,TextDecoder,structuredClone,performance:{now:()=>Date.now()},alert(){},confirm(){return false},prompt(){return null},addEventListener(){},removeEventListener(){}};
c.window=c;c.self=c;c.globalThis=c;vm.createContext(c);
for(const s of scripts){
  if(s.startsWith('js/vendor/'))continue;
  fs.accessSync(path.join(root,s));
  vm.runInContext(read(s),c,{filename:s,timeout:30000});
  if(s==='js/app-content.js')break;
}
const x=code=>vm.runInContext(code,c,{timeout:240000});
assert.equal(x(`typeof CHMAP`),'object');
assert.equal(x(`typeof COURS`),'object');
assert.equal(x(`typeof WMAP`),'object');

const rows=x(`(()=>{
 const clean=s=>String(s??'').replace(/<[^>]*>/g,' ').replace(/&nbsp;|&#160;| | /g,' ').replace(/\\s+/g,' ').trim();
 const words=s=>{const v=clean(s);return v?v.split(/\\s+/).filter(Boolean).length:0};
 const target=g=>g==='CP'?120:g==='CE1'?150:g==='CE2'?180:(g==='CM1'||g==='CM2')?200:220;
 const reading=window.MQ_READING?.resources?Object.values(MQ_READING.resources):[];
 const out=[];
 for(const ch of Object.values(CHMAP)){
   const id=ch.id,world=WMAP[id]||{},grade=world.lvl||'?',sub=(typeof sOf==='function'?sOf(world.id):null)||{},course=COURS[id]||{},depth=window.MQCourseDepth?.chapters?.[id]||{};
   const parts=Array.isArray(course.parts)?course.parts:[],examples=course.examples||(course.ex?[course.ex]:[]),method=course.method||[],traps=course.traps||[],retain=course.retenir||[],objectives=course.objectives||[];
   const baseBlocks=[course.hook||course.discover||'',...parts.flatMap(p=>[p?.t,p?.h]),...examples.flatMap(e=>[e?.q,...(e?.s||[])]),...method,...traps,...retain,...objectives];
   const deep=Array.isArray(depth.deep)?depth.deep:[];
   const depthBlocks=[...deep.flatMap(p=>[p?.t,p?.h]),depth.try?.q,depth.try?.a,depth.adult,depth.culture?.t,depth.culture?.h];
   const baseWords=words(baseBlocks.map(clean).filter(Boolean).join(' '));
   const depthWords=words(depthBlocks.map(clean).filter(Boolean).join(' '));
   const courseWords=baseWords+depthWords,types=new Set(),prompts=new Set();let draws=0,errors=0;
   for(const d of [1,2,3])for(let i=0;i<18;i++)try{const q=ch.g(d);draws++;if(q?.type)types.add(q.type);const p=clean(q?.q??q?.prompt);if(p)prompts.add(p);}catch(e){errors++;}
   const raw=JSON.stringify({course,depth}),readingLinks=reading.filter(r=>(r.chapterLinks||[]).includes(id)).length;
   out.push({id,title:ch.name||ch.title||id,grade,subjectId:sub.id||world.id||'unknown',subject:sub.name||sub.title||sub.id||world.id||'unknown',baseWords,depthWords,courseWords,hasDepth:depthWords>0,depthTarget:target(grade),thinBase:baseWords<target(grade),thin:courseWords<target(grade),theorySections:parts.length+deep.length,guidedExamples:examples.filter(e=>clean(e?.q)&&(e?.s||[]).length).length+(depth.try?.q&&depth.try?.a?1:0),methodSteps:method.length,traps:traps.length,retain:retain.length,objectives:objectives.length,questionTypes:[...types].sort(),uniquePrompts:prompts.size,draws,generatorErrors:errors,readingLinks,hasDocument:/data\\/images\\/|<img|figure|document|source/i.test(raw),hasAudioHint:/audio|pronon|phon[eè]me|syllab|speech|son\\b/i.test(raw)});
 }
 return out;
})()`);

const gradeOrder=['CP','CE1','CE2','CM1','CM2','6e','5e','4e','3e'];
const byKey=new Map();
for(const r of rows){
 const key=`${r.grade}||${r.subjectId}`;
 if(!byKey.has(key))byKey.set(key,{grade:r.grade,subjectId:r.subjectId,subject:r.subject,chapters:0,totalBaseWords:0,totalWords:0,baseThin:0,thin:0,depth:0,reading:0,documents:0,audioHints:0,typeSet:new Set(),promptSum:0,errors:0});
 const a=byKey.get(key);a.chapters++;a.totalBaseWords+=r.baseWords;a.totalWords+=r.courseWords;a.baseThin+=r.thinBase?1:0;a.thin+=r.thin?1:0;a.depth+=r.hasDepth?1:0;a.reading+=r.readingLinks?1:0;a.documents+=r.hasDocument?1:0;a.audioHints+=r.hasAudioHint?1:0;a.promptSum+=r.uniquePrompts;a.errors+=r.generatorErrors;for(const t of r.questionTypes)a.typeSet.add(t);
}
const groups=[...byKey.values()].map(a=>({grade:a.grade,subjectId:a.subjectId,subject:a.subject,chapters:a.chapters,avgBaseWords:Math.round(a.totalBaseWords/a.chapters),avgCourseWords:Math.round(a.totalWords/a.chapters),baseThinCourses:a.baseThin,thinCourses:a.thin,depthChapters:a.depth,readingLinkedChapters:a.reading,documentChapters:a.documents,audioHintChapters:a.audioHints,questionTypes:[...a.typeSet].sort(),avgUniquePrompts:Math.round(a.promptSum/a.chapters),generatorErrors:a.errors})).sort((a,b)=>(gradeOrder.indexOf(a.grade)-gradeOrder.indexOf(b.grade))||a.subject.localeCompare(b.subject,'fr'));
const thinnest=[...rows].sort((a,b)=>(a.courseWords-b.courseWords)||a.id.localeCompare(b.id)).slice(0,80);
const summary={generatedAt:new Date().toISOString(),chapters:rows.length,grades:[...new Set(rows.map(r=>r.grade))].sort((a,b)=>gradeOrder.indexOf(a)-gradeOrder.indexOf(b)),subjects:[...new Set(rows.map(r=>r.subjectId))].length,baseThinCourses:rows.filter(r=>r.thinBase).length,thinCourses:rows.filter(r=>r.thin).length,depthChapters:rows.filter(r=>r.hasDepth).length,generatorErrors:rows.reduce((n,r)=>n+r.generatorErrors,0),readingLinkedChapters:rows.filter(r=>r.readingLinks>0).length,documentChapters:rows.filter(r=>r.hasDocument).length,audioHintChapters:rows.filter(r=>r.hasAudioHint).length};
const report={summary,groups,thinnest,chapters:rows};
fs.writeFileSync(path.join(root,'tests/final-product-inventory-report.json'),JSON.stringify(report,null,2));
const esc=s=>String(s??'').replace(/\|/g,'\\|').replace(/\n/g,' ');
const md=[];
md.push('# Finot Académie — inventaire final CP → 3e','',`Généré : ${summary.generatedAt}`,'',`- Chapitres actifs : **${summary.chapters}**`,`- Cours sous seuil si on ne compte que COURS : **${summary.baseThinCourses}**`,`- Cours sous seuil après ajout de MQCourseDepth : **${summary.thinCourses}**`,`- Chapitres disposant d’un approfondissement : **${summary.depthChapters}**`,`- Chapitres liés à une ressource de lecture : **${summary.readingLinkedChapters}**`,`- Chapitres avec indice de document/image : **${summary.documentChapters}**`,`- Chapitres avec indice audio/oral : **${summary.audioHintChapters}**`,`- Exceptions de générateur sur l’échantillon : **${summary.generatorErrors}**`,'','## Couverture par classe et matière','', '| Classe | Matière | Chapitres | Mots base moy. | Mots avec depth moy. | Sous seuil base | Sous seuil réel | Depth | Types | Prompts moy. | Lecture | Docs | Audio |','|---|---|---:|---:|---:|---:|---:|---:|---|---:|---:|---:|---:|');
for(const g of groups)md.push(`| ${esc(g.grade)} | ${esc(g.subject)} | ${g.chapters} | ${g.avgBaseWords} | ${g.avgCourseWords} | ${g.baseThinCourses} | ${g.thinCourses} | ${g.depthChapters} | ${esc(g.questionTypes.join(', '))} | ${g.avgUniquePrompts} | ${g.readingLinkedChapters} | ${g.documentChapters} | ${g.audioHintChapters} |`);
md.push('','## 80 cours réellement les plus courts à examiner en priorité','', '| # | Classe | Matière | Chapitre | Base | Depth | Total | Seuil | Types |','|---:|---|---|---|---:|---:|---:|---:|---|');
thinnest.forEach((r,i)=>md.push(`| ${i+1} | ${esc(r.grade)} | ${esc(r.subject)} | ${esc(r.id)} — ${esc(r.title)} | ${r.baseWords} | ${r.depthWords} | ${r.courseWords} | ${r.depthTarget} | ${esc(r.questionTypes.join(', '))} |`));
md.push('','> Les seuils de profondeur sont des indicateurs de tri, pas des règles pédagogiques absolues : CP 120 mots, CE1 150, CE2 180, CM1–CM2 200, collège 220. Le classement compte maintenant le cours de base ET les compléments `MQCourseDepth`.','');
fs.writeFileSync(path.join(root,'tests/final-product-inventory-report.md'),md.join('\n'));
console.log(JSON.stringify(summary,null,2));
if(summary.generatorErrors)process.exitCode=1;
