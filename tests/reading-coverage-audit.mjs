import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const el=()=>({style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},appendChild(){},remove(){},setAttribute(){},getAttribute(){return null},addEventListener(){},removeEventListener(){},querySelector(){return null},querySelectorAll(){return[]},focus(){},click(){},scrollIntoView(){},innerHTML:'',textContent:'',value:'',checked:false,disabled:false});
const document={readyState:'loading',visibilityState:'visible',body:el(),documentElement:el(),createElement:el,getElementById:()=>el(),querySelector(){return null},querySelectorAll(){return[]},addEventListener(){},removeEventListener(){}};
const store=new Map();
const c={console,document,navigator:{userAgent:'reading-audit',language:'fr-FR',onLine:true},location:{protocol:'https:',hostname:'localhost',origin:'https://localhost',pathname:'/'},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)},sessionStorage:{getItem(){return null},setItem(){},removeItem(){}},matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}}),setTimeout,clearTimeout,setInterval,clearInterval,requestAnimationFrame:f=>setTimeout(f,0),cancelAnimationFrame:clearTimeout,Audio:function(){return{play(){return Promise.resolve()},pause(){}}},Image:function(){},speechSynthesis:{speak(){},cancel(){},getVoices(){return[]}},SpeechSynthesisUtterance:function(){},fetch:async()=>({ok:false,status:404,text:async()=>'',json:async()=>({})}),crypto:globalThis.crypto,URL,URLSearchParams,TextEncoder,TextDecoder,structuredClone,performance:{now:()=>Date.now()},alert(){},confirm(){return false},prompt(){return null},addEventListener(){},removeEventListener(){}};
c.window=c;c.self=c;c.globalThis=c;vm.createContext(c);

const html=read('index.html');
const scripts=[...html.matchAll(/<script\s+src=["']([^"']+)["']/g)].map(m=>m[1].split(/[?#]/)[0]);
for(const s of scripts){
  if(s.startsWith('js/vendor/'))continue;
  const file=path.join(root,s);
  if(!fs.existsSync(file))continue;
  vm.runInContext(read(s),c,{filename:s,timeout:30000});
  if(s==='js/app-content.js')break;
}

const R=c.MQ_READING?.resources||{};
// CHMAP est déclaré lexicalement dans le runtime (const), donc il faut le lire DANS le contexte VM.
const CH=vm.runInContext(`typeof CHMAP==='object' ? CHMAP : {}`,c);
const resources=Object.values(R);
const levels=['CP','CE1','CE2','CM1','CM2','6e','5e','4e','3e'];
const byLevel=Object.fromEntries(levels.map(l=>[l,{resources:0,linkedChapters:new Set(),questions:0,types:new Set(),documentTypes:new Set(),competencies:new Set(),sources:new Set()}]));
const issues=[];
const warnings=[];
const linked=new Set();
const qIds=new Set();
let questionCount=0;

const allowedSources=new Set(['original_mathquest','public_domain','open_access','cc0','cc_by','cc_by_sa']);
for(const r of resources){
  const level=r.level||'?';
  if(!byLevel[level])byLevel[level]={resources:0,linkedChapters:new Set(),questions:0,types:new Set(),documentTypes:new Set(),competencies:new Set(),sources:new Set()};
  const b=byLevel[level]; b.resources++;
  b.documentTypes.add(r.documentType||r.type||'unknown'); b.sources.add(r.sourceType||'unknown');
  const paragraphs=Array.isArray(r.paragraphs)?r.paragraphs:[];
  const qs=Array.isArray(r.questions)?r.questions:[];
  if(!r.id)issues.push({resource:r.title||'?',issue:'id manquant'});
  if(!r.title)issues.push({resource:r.id||'?',issue:'titre manquant'});
  if(!paragraphs.length)issues.push({resource:r.id,issue:'aucun paragraphe'});
  if(qs.length<5)warnings.push({resource:r.id,issue:`seulement ${qs.length} questions`});
  if(!allowedSources.has(r.sourceType))issues.push({resource:r.id,issue:`sourceType non reconnu: ${r.sourceType}`});
  if(r.sourceType==='public_domain' && !(r.author||r.work))warnings.push({resource:r.id,issue:'domaine public sans auteur/œuvre documenté'});
  for(const ch of r.chapterLinks||[]){
    linked.add(ch); b.linkedChapters.add(ch);
    if(!CH[ch])issues.push({resource:r.id,issue:`chapterLink orphelin: ${ch}`});
  }
  for(const comp of r.competencies||[])b.competencies.add(comp);
  for(const q of qs){
    questionCount++;b.questions++;b.types.add(q.type||'unknown');
    for(const comp of q.competencies||[])b.competencies.add(comp);
    const qKey=`${r.id}:${q.id}`;
    if(qIds.has(qKey))issues.push({resource:r.id,issue:`question id dupliqué: ${q.id}`});
    qIds.add(qKey);
    if(!q.prompt)issues.push({resource:r.id,question:q.id,issue:'prompt manquant'});
    if(Number.isInteger(q.evidenceParagraph) && (q.evidenceParagraph<0||q.evidenceParagraph>=paragraphs.length))issues.push({resource:r.id,question:q.id,issue:`evidenceParagraph hors limites: ${q.evidenceParagraph}/${paragraphs.length}`});
  }
}

const chapterRows=Object.values(CH).map(ch=>({id:ch.id,name:ch.name||ch.title||ch.id}));
const linkedExisting=chapterRows.filter(ch=>linked.has(ch.id));
const summary={
  version:c.MQ_READING?.version||null,
  resources:resources.length,
  linkedChapters:linked.size,
  linkedExistingChapters:linkedExisting.length,
  questions:questionCount,
  avgQuestionsPerResource:resources.length?Math.round(questionCount/resources.length*10)/10:0,
  issues:issues.length,
  warnings:warnings.length,
  sourceTypes:[...new Set(resources.map(r=>r.sourceType||'unknown'))].sort(),
  documentTypes:[...new Set(resources.map(r=>r.documentType||r.type||'unknown'))].sort(),
  competencies:[...new Set(resources.flatMap(r=>[...(r.competencies||[]),...(r.questions||[]).flatMap(q=>q.competencies||[])]))].sort()
};
const levelsReport={};
for(const [level,b] of Object.entries(byLevel))levelsReport[level]={resources:b.resources,linkedChapters:b.linkedChapters.size,questions:b.questions,questionTypes:[...b.types].sort(),documentTypes:[...b.documentTypes].sort(),competencies:[...b.competencies].sort(),sourceTypes:[...b.sources].sort()};
const report={summary,levels:levelsReport,issues,warnings,resourceIds:resources.map(r=>r.id),linkedChapterIds:[...linked].sort()};
fs.writeFileSync(path.join(root,'tests/reading-coverage-report.json'),JSON.stringify(report,null,2));
const md=['# Finot Académie — audit lecture / compréhension','',`Version bibliothèque : **${summary.version||'n/a'}**`,'',`- Ressources : **${summary.resources}**`,`- Chapitres liés : **${summary.linkedChapters}**`,`- Questions : **${summary.questions}**`,`- Moyenne questions/ressource : **${summary.avgQuestionsPerResource}**`,`- Erreurs structurelles : **${summary.issues}**`,`- Avertissements qualité : **${summary.warnings}**`,'','## Par niveau','', '| Niveau | Ressources | Chapitres liés | Questions | Types de documents | Types de questions |','|---|---:|---:|---:|---|---|'];
for(const level of levels) {const b=levelsReport[level];md.push(`| ${level} | ${b.resources} | ${b.linkedChapters} | ${b.questions} | ${b.documentTypes.join(', ')} | ${b.questionTypes.join(', ')} |`)}
if(issues.length){md.push('','## Erreurs structurelles','',...issues.map(x=>`- ${x.resource}${x.question?`/${x.question}`:''} — ${x.issue}`));}
if(warnings.length){md.push('','## Avertissements','',...warnings.map(x=>`- ${x.resource} — ${x.issue}`));}
fs.writeFileSync(path.join(root,'tests/reading-coverage-report.md'),md.join('\n'));
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
