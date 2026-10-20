import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const strip=s=>String(s??'').replace(/<[^>]*>/g,' ').replace(/&nbsp;|&#160;| | /g,' ').replace(/\s+/g,' ').trim();
const norm=s=>strip(s).toLocaleLowerCase('fr');
const badValue=s=>/undefined|\bNaN\b|Infinity|\[object Object\]/.test(String(s??''));

function scriptsFromIndex(){const html=read('index.html'),out=[];let m;const re=/<script\s+src=["']([^"']+)["'][^>]*><\/script>/g;while((m=re.exec(html)))out.push(m[1].split(/[?#]/)[0]);return out;}
const fakeEl=()=>({style:{},dataset:{},classList:{add(){},remove(){},toggle(){}},appendChild(){},remove(){},setAttribute(){},getAttribute(){return null;},addEventListener(){},removeEventListener(){},querySelector(){return null;},querySelectorAll(){return[];},getContext(){return null;},focus(){},click(){},scrollIntoView(){},innerHTML:'',textContent:'',value:'',checked:false,disabled:false});
const document={readyState:'loading',body:fakeEl(),documentElement:fakeEl(),createElement(){return fakeEl();},createTextNode(t){return{textContent:String(t)};},getElementById(){return fakeEl();},querySelector(){return null;},querySelectorAll(){return[];},addEventListener(){},removeEventListener(){}};
const storage=new Map();
const context={console,document,navigator:{userAgent:'MathQuestAudit',language:'fr-FR',onLine:true,serviceWorker:undefined},location:{protocol:'https:',hostname:'localhost',origin:'https://localhost',pathname:'/index.html',href:'https://localhost/index.html'},localStorage:{getItem:k=>storage.has(k)?storage.get(k):null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k),clear:()=>storage.clear()},sessionStorage:{getItem(){return null;},setItem(){},removeItem(){},clear(){}},matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}}),requestAnimationFrame:fn=>setTimeout(()=>fn(Date.now()),0),cancelAnimationFrame:clearTimeout,setTimeout,clearTimeout,setInterval,clearInterval,alert(){},confirm(){return false;},prompt(){return null;},Audio:function(){return{play(){return Promise.resolve();},pause(){}};},Image:function(){},speechSynthesis:{speak(){},cancel(){},getVoices(){return[];}},SpeechSynthesisUtterance:function(){},fetch:async()=>({ok:false,status:404,json:async()=>({}),text:async()=>''}),crypto:globalThis.crypto,URL,URLSearchParams,TextEncoder,TextDecoder,structuredClone,performance:{now:()=>Date.now()}};
context.window=context;context.self=context;context.globalThis=context;vm.createContext(context);

const scripts=scriptsFromIndex();
for(const src of scripts){if(!exists(src))throw new Error(`Script absent référencé par index.html: ${src}`);if(src.startsWith('js/vendor/'))continue;vm.runInContext(read(src),context,{filename:src,timeout:30000});if(src==='js/app-content.js')break;}
const expr=code=>vm.runInContext(code,context,{timeout:180000});
assert.equal(expr(`typeof CHMAP`),'object','CHMAP final doit être construit');
assert.equal(expr(`typeof COURS`),'object','COURS doit être construit');
assert.equal(expr(`typeof check`),'function','check() doit être disponible');

const issues=[],warnings=[];
const push=(sev,id,msg,extra='')=>(sev==='error'?issues:warnings).push({id:String(id||'?'),msg,extra:String(extra||'')});
const stats={activeChapters:0,activeLessons:0,activeGenerators:0,generatedQuestions:0,sourceGenerators:0,sourceGeneratedQuestions:0,readingResources:0,readingQuestions:0,readingGraded:0,lexiconLanguages:0,lexiconCategories:0,lexiconWords:0,lexiconImages:0,dictationChecks:0,worlds:0,subjects:0};

// ===== Registre réellement utilisé par l'application =====
const registry=expr(`(()=>({
 chapters:Object.values(CHMAP).map(c=>({id:c.id,name:c.name||'',icon:c.icon||'',primary:!!c.primary,grade:c.grade||null,subject:c.subject||null,hasF:!!c.f,hasG:typeof c.g==='function'})),
 ids:Object.keys(CHMAP),courseIds:Object.keys(COURS),worlds:WALL.map(w=>({id:w.id,lvl:w.lvl,name:w.name})),subjects:SUBJECTS.map(s=>({id:s.id,name:s.name,worlds:s.worlds.map(w=>w.id)})),
 wch:Object.fromEntries(Object.entries(WCH).map(([k,v])=>[k,v.map(c=>c.id)])),wmap:Object.fromEntries(Object.entries(WMAP).map(([k,v])=>[k,v.id]))
}))()`);
stats.activeChapters=registry.chapters.length;stats.worlds=registry.worlds.length;stats.subjects=registry.subjects.length;
assert.ok(stats.activeChapters>400,`Registre actif trop petit: ${stats.activeChapters}`);
assert.equal(new Set(registry.ids).size,registry.ids.length,'IDs actifs dupliqués');
for(const c of registry.chapters){
 if(!strip(c.name))push('error',c.id,'Nom de chapitre vide');
 if(!c.hasG)push('error',c.id,'Chapitre actif sans générateur');
 if(!registry.courseIds.includes(c.id))push('error',c.id,'Chapitre actif sans cours COURS correspondant');
 if(!registry.wmap[c.id])push('error',c.id,'Chapitre actif absent de WMAP');
}
for(const s of registry.subjects)for(const wid of s.worlds)if(!registry.wch[wid])push('error',s.id,`Monde absent de WCH: ${wid}`);
for(const w of registry.worlds){if(!registry.wch[w.id]?.length)push('error',w.id,'Monde sans chapitre');for(const id of registry.wch[w.id]||[])if(registry.wmap[id]!==w.id)push('error',id,`WMAP incohérent: attendu ${w.id}, obtenu ${registry.wmap[id]}`);}

// ===== 100 % des leçons actives : structure et contenu rendu =====
const courseAudit=expr(`(()=>Object.values(CHMAP).map(ch=>{const c=COURS[ch.id];if(!c)return{id:ch.id,missing:true};const structured=!!(c.primary||c.structured);return{id:ch.id,structured,domain:String(c.domain||''),hook:String(c.hook||c.discover||''),parts:Array.isArray(c.parts)?c.parts.map(x=>({t:String(x.t||''),h:String(x.h||'')})):[],examples:Array.isArray(c.examples)?c.examples:(c.ex?[c.ex]:[]),method:Array.isArray(c.method)?c.method:[],traps:Array.isArray(c.traps)?c.traps:[],retenir:Array.isArray(c.retenir)?c.retenir:[],objectives:Array.isArray(c.objectives)?c.objectives:[]};}))()`);
for(const c of courseAudit){if(c.missing)continue;stats.activeLessons++;
 const all=[c.hook,...c.parts.flatMap(x=>[x.t,x.h]),...c.examples.flatMap(x=>[x?.q,...(x?.s||[])]),...c.method,...c.traps,...c.retenir,...c.objectives];
 if(!c.hook||strip(c.hook).length<3)push('error',c.id,'Cours sans introduction/découverte');
 if(!c.parts.length)push('error',c.id,'Cours sans partie théorique');
 for(const [i,p] of c.parts.entries()){if(strip(p.t).length<1)push('error',c.id,'Titre de partie vide',`partie ${i+1}`);if(strip(p.h).length<3)push('error',c.id,'Partie théorique vide',`partie ${i+1}`);}
 if(!c.examples.length||!c.examples.some(e=>strip(e?.q).length&&Array.isArray(e?.s)&&e.s.length))push('error',c.id,'Cours sans exemple guidé exploitable');
 if(!c.retenir.length)push('error',c.id,'Cours sans éléments « Je retiens »');
 if(all.some(badValue))push('error',c.id,'Cours contenant undefined/NaN/Infinity/[object Object]');
}

// ===== Questions actives : 120 tirages par difficulté et par chapitre =====
// 472 chapitres donnent typiquement > 160 000 questions exécutées.
const gen=expr(`(()=>{
 const R={errors:[],warnings:[],types:{},questions:0,generators:0};
 const clean=s=>String(s??'').replace(/<[^>]*>/g,' ').replace(/&nbsp;|&#160;| | /g,' ').replace(/\\s+/g,' ').trim();
 const invalid=s=>/undefined|\\bNaN\\b|Infinity|\\[object Object\\]/.test(String(s??''));
 const answer=q=>q.type==='choice'?q.ans:q.type==='num'?String(q.ans):q.type==='frac'?q.ans[0]+'/'+q.ans[1]:q.type==='text'?(q.acc&&q.acc[0]):q.type==='order'?q.ans:q.type==='multi'?q.ans.map(String):undefined;
 const wrong=q=>{if(q.type==='choice')return q.choices.length>1?(q.ans===0?1:0):undefined;if(q.type==='num')return String(q.ans+(Math.abs(q.ans)>1?1:.123456));if(q.type==='frac')return (q.ans[0]+q.ans[1])+'/'+q.ans[1];if(q.type==='text')return '__REPONSE_FAUSSE_MATHQUEST_AUDIT__';if(q.type==='order'){const a=q.ans.split(' ');if(a.length>1){[a[0],a[1]]=[a[1],a[0]];return a.join(' ');}return '__FAUX__';}if(q.type==='multi'){const a=q.ans.map(String);a[0]=String((+q.ans[0]||0)+1);return a;}return undefined;};
 const validate=(q,id,d,i)=>{R.questions++;R.types[q&&q.type]=(R.types[q&&q.type]||0)+1;const bad=m=>R.errors.push({id,msg:m,extra:'d='+d+', tirage='+i});
   if(!q||typeof q!=='object')return bad('Générateur ne renvoie pas un objet');if(!q.type)return bad('Question sans type');const prompt=q.q??q.prompt;if(!clean(prompt))bad('Énoncé vide');if(invalid(prompt))bad('Énoncé invalide');if(invalid(q.expl))bad('Explication invalide');if(q.hint!=null&&!clean(q.hint))R.warnings.push({id,msg:'Indice vide',extra:'d='+d});
   if(q.type==='choice'){if(!Array.isArray(q.choices)||q.choices.length<2)bad('QCM avec moins de 2 choix');else{if(!Number.isInteger(q.ans)||q.ans<0||q.ans>=q.choices.length)bad('Index de réponse QCM invalide');const x=q.choices.map(v=>clean(v).toLocaleLowerCase('fr'));if(x.some(v=>!v))bad('QCM avec choix vide');if(new Set(x).size!==x.length)bad('QCM avec choix identiques');for(let k=0;k<q.choices.length;k++)try{if(check(q,k)!==(k===q.ans))bad('Correcteur QCM incohérent pour le choix '+k);}catch(e){bad('check QCM exception: '+e.message);}}
   }else if(q.type==='num'){if(!Number.isFinite(q.ans))bad('Réponse numérique non finie');}
   else if(q.type==='frac'){if(!Array.isArray(q.ans)||q.ans.length!==2||!Number.isFinite(+q.ans[0])||!Number.isFinite(+q.ans[1])||+q.ans[1]===0)bad('Fraction invalide');}
   else if(q.type==='text'){if(!Array.isArray(q.acc)||!q.acc.length||q.acc.every(x=>!clean(x)))bad('Réponses texte absentes');}
   else if(q.type==='order'){if(!q.ans||!Array.isArray(q.tokens)||q.tokens.length<2)bad('Remise en ordre invalide');else{const t=q.tokens.map(clean);if(new Set(t).size!==t.length)bad('Jetons en double dans remise en ordre');}}
   else if(q.type==='multi'){if(!Array.isArray(q.ans)||!q.ans.length||q.ans.some(x=>!Number.isFinite(+x)))bad('Réponse multi invalide');if(!Array.isArray(q.labels)||q.labels.length!==q.ans.length)bad('Labels multi incohérents');}
   else R.warnings.push({id,msg:'Type spécialisé non couvert par check()',extra:String(q.type)});
   const a=answer(q);if(a!==undefined)try{if(!check(q,a))bad('Bonne réponse canonique refusée par check()');}catch(e){bad('check bonne réponse exception: '+e.message);}
   const w=wrong(q);if(w!==undefined)try{if(check(q,w))bad('Réponse volontairement fausse acceptée par check()');}catch(e){bad('check mauvaise réponse exception: '+e.message);}
   try{const txt=answerText(q);if(!clean(txt)||invalid(txt))bad('answerText() vide ou invalide');}catch(e){bad('answerText() exception: '+e.message);}
 };
 const active=Object.values(CHMAP).filter(c=>typeof c.g==='function');R.generators=active.length;
 for(const c of active)for(const d of [1,2,3])for(let i=0;i<120;i++){try{validate(c.g(d),c.id,d,i);}catch(e){R.errors.push({id:c.id,msg:'Générateur exception: '+e.message,extra:'d='+d+', tirage='+i});}}
 return R;
})()`);
stats.activeGenerators=gen.generators;stats.generatedQuestions=gen.questions;issues.push(...gen.errors);warnings.push(...gen.warnings);
assert.equal(stats.activeGenerators,stats.activeChapters,'Chaque chapitre actif doit avoir un générateur');

// ===== Registres source primaire/collège, même si un chapitre est ensuite fusionné/remplacé =====
const source=expr(`(()=>{
 const list=[];if(window.MQPrimary&&MQPrimary._reg)for(const c of MQPrimary._reg.chapters)list.push({src:'primary',id:c.id,g:c.g});if(window.MQCollege)for(const c of MQCollege.list)list.push({src:'college',id:c.id,g:c.g});return list;
})()`);
stats.sourceGenerators=source.length;
// On ne peut pas transférer les fonctions hors VM : on les ré-exécute dedans, 15 tirages/difficulté pour valider les sources brutes.
const sourceResult=expr(`(()=>{const out={errors:[],n:0};const all=[];if(window.MQPrimary&&MQPrimary._reg)MQPrimary._reg.chapters.forEach(c=>all.push(['primary',c]));if(window.MQCollege)MQCollege.list.forEach(c=>all.push(['college',c]));for(const [src,c] of all)for(const d of [1,2,3])for(let i=0;i<15;i++){out.n++;try{const q=c.g(d);if(!q||!q.type||!(q.q||q.prompt))out.errors.push({id:src+':'+c.id,msg:'Question source invalide',extra:'d='+d});}catch(e){out.errors.push({id:src+':'+c.id,msg:'Générateur source exception: '+e.message,extra:'d='+d+', tirage='+i});}}return out;})()`);
stats.sourceGeneratedQuestions=sourceResult.n;issues.push(...sourceResult.errors);

// ===== Lecture : 100 % des ressources et questions + moteur de correction =====
if(context.MQ_READING?.resources){const resources=Object.values(context.MQ_READING.resources);stats.readingResources=resources.length;const activeIds=new Set(registry.ids),rid=new Set();
 for(const r of resources){if(!r.id||rid.has(r.id))push('error',r.id||'reading','ID ressource absent/dupliqué');rid.add(r.id);if(!r.level||!r.title||!Array.isArray(r.paragraphs)||!r.paragraphs.length)push('error',r.id,'Ressource de lecture incomplète');if(!Array.isArray(r.chapterLinks)||!r.chapterLinks.length)push('error',r.id,'Ressource sans chapitre lié');for(const cid of r.chapterLinks||[])if(!activeIds.has(cid))push('error',r.id,`Lien vers chapitre actif inexistant: ${cid}`);
   for(const g of r.glossary||[]){if(!g.word||!g.definition)push('error',r.id,'Glossaire incomplet');if(g.word&&!r.paragraphs.some(p=>norm(p).includes(norm(g.word))))push('warning',r.id,`Mot du glossaire absent du texte: ${g.word}`);}
   const qids=new Set();for(const original of r.questions||[]){stats.readingQuestions++;if(!original.id||qids.has(original.id))push('error',r.id,'ID question lecture absent/dupliqué',original.id||'');qids.add(original.id);if(!original.prompt)push('error',r.id,'Question lecture sans énoncé',original.id);if(!Array.isArray(original.competencies)||!original.competencies.length)push('error',r.id,'Question lecture sans compétence',original.id);if(original.evidenceParagraph!=null&&(original.evidenceParagraph<0||original.evidenceParagraph>=r.paragraphs.length))push('error',r.id,'Preuve hors limites',original.id);
     for(let rep=0;rep<5;rep++){const q=context.MQReading.prepare(original);let good;if(q.type==='choice')good=q.ans;else if(q.type==='evidence')good=q.evidenceParagraph;else if(q.type==='text')good=q.acc?.[0];else if(q.type==='order')good=q.ans;else{push('error',r.id,`Type lecture inconnu: ${q.type}`,q.id);continue;}try{stats.readingGraded++;if(!context.MQReading.gradeAnswer(q,good))push('error',r.id,'Bonne réponse lecture refusée',q.id);}catch(e){push('error',r.id,'Correction lecture exception: '+e.message,q.id);}
       let wrong;if(q.type==='choice')wrong=q.choices.length>1?(q.ans===0?1:0):undefined;else if(q.type==='evidence')wrong=(q.evidenceParagraph+1)%r.paragraphs.length;else if(q.type==='text')wrong='__FAUX_AUDIT__';else if(q.type==='order'){const a=q.ans.split(' ');if(a.length>1){[a[0],a[1]]=[a[1],a[0]];wrong=a.join(' ');}}if(wrong!==undefined&&wrong!==good)try{if(context.MQReading.gradeAnswer(q,wrong))push('error',r.id,'Mauvaise réponse lecture acceptée',q.id);}catch(e){push('error',r.id,'Correction mauvaise réponse lecture exception: '+e.message,q.id);}
     }
   }
   try{const ses=context.MQReading.pickSession(r,{readingMastery:{},readingProgress:{}},r.sessionSize);if(!Array.isArray(ses)||!ses.length||ses.length>r.questions.length)push('error',r.id,'Sélection de session lecture invalide');}catch(e){push('error',r.id,'pickSession lecture exception: '+e.message);}
 }
}

// ===== Dictée : moteur complet avec cas de référence =====
if(context.MQDictation){const D=context.MQDictation;const cases=[
 ['Le chat dort sur le canapé.','Le chat dort sur le canapé.',100,true],
 ['Le chat dort sur le canapé.','le chat dort sur le canapé.',null,false],
 ["L’enfant a mangé une pomme.","L'enfant a mangé une pomme.",100,true],
 ['Les enfants jouent dans le jardin.','Les enfant jouent dans le jardin.',null,false],
 ['Il est allé à l’école.','Il et allé à l’école.',null,false],
 ['Je mange, puis je pars.','Je mange puis, je pars.',null,false]
 ];for(const [ref,ans,score,perfect] of cases){const r=D.analyze(ref,ans,{evalCase:true});stats.dictationChecks++;if(score!=null&&r.score!==score)push('error','dictation',`Score attendu ${score}, obtenu ${r.score}`,ref);if(r.perfect!==perfect)push('error','dictation',`perfect attendu ${perfect}, obtenu ${r.perfect}`,ans);if(!D.feedback(r)||!D.outcome(r,{final:true}))push('error','dictation','API feedback/outcome invalide',ref);}const r=D.analyze('Bonjour, Paul.','Bonjour Paul,.');stats.dictationChecks++;if(!r.errors.some(e=>e.type==='ponctuation'))push('error','dictation','Déplacement de ponctuation non détecté');}

// ===== Lexique illustré : 100 % des entrées et images déclarées =====
if(context.MQ_LEXICON){stats.lexiconLanguages=Object.keys(context.MQ_LEXICON).length;for(const [lang,L] of Object.entries(context.MQ_LEXICON)){const seen=new Set();const cats=Object.entries(L.cats||{});stats.lexiconCategories+=cats.length;if(!cats.length)push('error','lexicon:'+lang,'Aucune catégorie');for(const [cat,C] of cats){if(!C.name||!Array.isArray(C.words))push('error',`lexicon:${lang}:${cat}`,'Catégorie incomplète');for(const w of C.words||[]){stats.lexiconWords++;if(!Array.isArray(w)||w.length<4||!strip(w[0])||!strip(w[1])){push('error',`lexicon:${lang}:${cat}`,'Entrée lexique invalide',JSON.stringify(w));continue;}const key=norm(w[0]);if(seen.has(key))push('error',`lexicon:${lang}`,'Mot étranger dupliqué',w[0]);seen.add(key);if(w[3]){stats.lexiconImages++;const p=`data/images/lexique/${w[3]}.webp`;if(!exists(p))push('error',`lexicon:${lang}:${cat}`,`Image lexique absente: ${p}`,w[0]);}}}}
}

// ===== Médias statiques réellement littéraux (les templates ${...} sont volontairement ignorés) =====
for(const file of ['index.html','parent.html','styles.css',...scripts.filter(s=>exists(s))]){const src=read(file);let m;const re=/(?:src=|href=|url\(|['"])(data\/(?:images|audio)\/[^'"\)\s?#$]+|fonts\/[^'"\)\s?#$]+|icon\.png|manifest\.webmanifest)/g;while((m=re.exec(src))){const p=m[1].replace(/^\.\//,'');if(!exists(p))push('error',file,`Ressource locale absente: ${p}`);}}

// ===== Service worker : les entrées CORE doivent exister =====
const sw=read('sw.js');const coreMatch=sw.match(/const CORE\s*=\s*\[([\s\S]*?)\]/);if(coreMatch){for(const m of coreMatch[1].matchAll(/['"]([^'"]+)['"]/g)){const p=m[1].replace(/^\.\//,'');if(p&&!/^https?:/.test(p)&&!exists(p))push('error','sw.js',`Fichier CORE absent: ${p}`);}}

const uniq=a=>[...new Map(a.map(x=>[`${x.id}|${x.msg}|${x.extra}`,x])).values()];const errors=uniq(issues),warn=uniq(warnings);
const report={generatedAt:new Date().toISOString(),stats,questionTypes:gen.types,errorCount:errors.length,warningCount:warn.length,errors,warnings:warn};fs.writeFileSync(path.join(root,'tests/full-content-audit-report.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({stats,questionTypes:gen.types,errorCount:errors.length,warningCount:warn.length},null,2));
if(errors.length){console.error('\n=== ERREURS DÉTECTÉES ===');for(const e of errors.slice(0,250))console.error(`[${e.id}] ${e.msg}${e.extra?' — '+e.extra:''}`);process.exitCode=1;}else console.log('\nAudit intégral du contenu : aucune erreur bloquante détectée.');
