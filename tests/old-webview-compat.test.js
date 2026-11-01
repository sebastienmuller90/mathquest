/* Recette multi-AVD (01/11/2026) — WebView Android anciennes (AVD API 30 : WebView 83, minSdk 24).
   Constaté sur l'émulateur : Array.prototype.at (Chrome 92) cassait la correction animée des multiplications à
   deux chiffres, Element.replaceChildren (Chrome 86) levait une erreur à chaque disparition de toast.
   1) en navigateur, sans ces API : la correction animée de 47 × 23 se construit et l'appli tourne sans erreur ;
   2) garde statique : le JS de l'appli n'utilise aucune API absente de Chrome 83. */
const fs=require('fs'),path=require('path');
const {serve,launch,seedProfile,main}=require('./lib');
const ROOT=path.join(__dirname,'..');
const RECENT=[['Array/String .at()',/\.at\(\s*-?\d/],['replaceChildren',/\.replaceChildren\(/],['replaceAll',/\.replaceAll\(/],['structuredClone',/\bstructuredClone\(/],
 ['Object.hasOwn',/\bObject\.hasOwn\(/],['findLast',/\.findLast(Index)?\(/],['toSorted/toReversed',/\.to(Sorted|Reversed|Spliced)\(/],['opérateurs ??= ||= &&=',/(\?\?|\|\||&&)=/]];
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,500)});
 const files=['index.html','parent.html',...fs.readdirSync(path.join(ROOT,'js')).filter(f=>f.endsWith('.js')).map(f=>'js/'+f)];
 const hits=[];for(const f of files){const src=fs.readFileSync(path.join(ROOT,f),'utf8');for(const [n,re] of RECENT){const m=src.match(re);if(m)hits.push(`${f} : ${n} (« ${src.slice(Math.max(0,m.index-30),m.index+20).replace(/\s+/g,' ')} »)`);}}
 T('Garde statique : aucune API JavaScript absente des WebView Chrome 83 dans index/parent/js',!hits.length,hits.join(' | '));
 const {srv,url}=await serve();const b=await launch();
 try{const ctx=await b.newContext({viewport:{width:360,height:640}});
  await ctx.addInitScript(()=>{for(const P of [Array.prototype,String.prototype])delete P.at;for(const P of [Element.prototype,Document.prototype,DocumentFragment.prototype])delete P.replaceChildren;});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await seedProfile(p,'WebView 83','CM2');
  const r=await p.evaluate(()=>{const q={type:'num',q:'Calcule 47 × 23',ans:1081};const o={at:typeof [].at};try{const m=MQCorrections.multiplicationModel(MQCorrections.parseMultiplication(q));o.steps=m.steps.length;o.last=m.steps[m.steps.length-1].sum;}catch(e){o.err=e.message;}
   const mf=MQCorrections.modelFor({q,question:q});o.adapter=mf&&mf.adapter;toast('Essai');return o;});
  await p.waitForTimeout(2950);
  T('Sans Array.prototype.at : correction animée de 47 × 23 construite (adaptateur multiplication)',r.at==='undefined'&&!r.err&&r.steps>1&&r.last===1081&&r.adapter,JSON.stringify(r));
  T('Sans replaceChildren ni .at : aucune erreur JavaScript (toast compris)',!errs.length,errs.join(' | '));
  await ctx.close();}
 finally{await b.close();srv.close();}
 return R;}
if(require.main===module)main(run);
module.exports=run;
