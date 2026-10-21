/* Voix de Finot en fin d'exercice (21/10/2026).
   Partie 1 (Node, voix simulées) : Finot prend une voix masculine correcte (jamais robotique ni « Eloquence »), plus aiguë ;
   sans voix masculine correcte, la meilleure voix, encore plus aiguë ; la voix des leçons reste inchangée (féminine).
   Partie 2 (Chromium, synthèse simulée) : bulle de Finot sur l'écran de fin (texte toujours affiché), voix avec le ton de
   Finot, silence si le son est coupé ou si le parent a coupé la voix, choix conservé après rechargement, défi éclair
   (record), prénom absent, aucune erreur. */
const vm=require('vm'),fs=require('fs'),path=require('path');const {ROOT,serve,launch}=require('./lib');
function mk(voices){const spoken=[];const synth={getVoices:()=>voices,speak(u){spoken.push(u);setTimeout(()=>u.onend&&u.onend(),0);},cancel(){},addEventListener(){},speaking:false,pending:false};
  const ctx={console,Math,Date,JSON,String,Number,Array,Object,Set,Map,Error,RegExp,Promise,setTimeout,clearTimeout,parseInt,parseFloat,isFinite,isNaN,Intl};ctx.window=ctx;ctx.globalThis=ctx;
  ctx.speechSynthesis=synth;ctx.SpeechSynthesisUtterance=function(t){this.text=t;this.lang='';this.voice=null;this.rate=1;this.pitch=1;};
  vm.createContext(ctx);for(const f of ['data/pronunciation-lexicon.js','js/audio-engine.js'])vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),ctx,{filename:f});return {A:ctx.MQAudio,spoken};}
const v=(name,lang,o={})=>({name,lang,voiceURI:o.uri||name,localService:o.local!==false,default:!!o.def});
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,600)});
 // iPhone : Audrey Premium (leçons) ; Thomas (Finot) ; Jacques « Eloquence » jamais choisi.
 {const {A,spoken}=mk([v('Audrey (Premium)','fr-FR',{uri:'com.apple.voice.premium.fr-FR.Audrey'}),v('Thomas','fr-FR',{uri:'com.apple.voice.compact.fr-FR.Thomas'}),v('Jacques','fr-FR',{uri:'com.apple.eloquence.fr-FR.Jacques'}),v('Amélie','fr-CA')]);
  const f=A.finotVoice('fr'),l=A.pickVoice('fr');
  T('iPhone : Finot parle avec Thomas (masculine), plus aigu ; jamais Jacques « Eloquence »',f.voice&&f.voice.name==='Thomas'&&f.male&&f.pitch>1&&f.pitch<1.3,JSON.stringify({v:f.voice&&f.voice.name,p:f.pitch}));
  T('iPhone : la voix des leçons reste Audrey (Premium)',l.voice&&l.voice.name==='Audrey (Premium)',l.voice&&l.voice.name);
  A.speak([{t:'Hey, félicitations !',l:'fr'}],{character:'finot'});A.speak([{t:'Une leçon.',l:'fr'}]);await new Promise(r=>setTimeout(r,20));
  const fin=spoken.find(u=>/félicitations/.test(u.text)),les=spoken.find(u=>/leçon/.test(u.text));
  T('speak({character:"finot"}) : voix et ton de Finot ; lecture normale inchangée (ton 1)',fin&&fin.voice.name==='Thomas'&&fin.pitch===A.FINOT.pitchMale&&les&&les.pitch===1&&les.voice.name==='Audrey (Premium)',JSON.stringify({fin:fin&&[fin.voice.name,fin.pitch],les:les&&[les.voice.name,les.pitch]}));}
 // Windows / Chrome : Paul (robotique) écarté au profit de Google français, ton plus aigu.
 {const {A}=mk([v('Microsoft Paul - French (France)','fr-FR'),v('Microsoft Hortense - French (France)','fr-FR'),v('Google français','fr-FR',{local:false})]);const f=A.finotVoice('fr');
  T('Windows : voix masculine robotique (Paul) jamais préférée à une voix naturelle ; ton plus aigu à la place',f.voice&&f.voice.name==='Google français'&&!f.male&&f.pitch===A.FINOT.pitchOther,JSON.stringify({v:f.voice&&f.voice.name,p:f.pitch}));}
 // Edge : voix naturelle masculine (Henri) choisie.
 {const {A}=mk([v('Microsoft Denise Online (Natural) - French (France)','fr-FR',{local:false}),v('Microsoft Henri Online (Natural) - French (France)','fr-FR',{local:false})]);const f=A.finotVoice('fr');
  T('Edge : voix naturelle masculine (Henri) choisie pour Finot',f.voice&&/Henri/.test(f.voice.name)&&f.male,f.voice&&f.voice.name);}
 // Seule voix masculine disponible : robotique → choisie quand même (mieux qu'aucune voix).
 {const {A}=mk([v('Microsoft Paul - French (France)','fr-FR')]);const f=A.finotVoice('fr');T('Seule voix disponible (même robotique) : Finot parle quand même',f.voice&&f.status==='exact',f.status);}
 {const {A}=mk([]);const f=A.finotVoice('fr');T('Aucune voix listée : moteur du navigateur, ton de Finot appliqué',!f.voice&&f.status==='engine-default'&&f.pitch>1,JSON.stringify(f));}

 // ---- Navigateur
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:390,height:844}});
 await ctx.addInitScript(()=>{window.__said=[];const V=[{name:'Audrey (Premium)',lang:'fr-FR',voiceURI:'audrey',localService:true},{name:'Thomas',lang:'fr-FR',voiceURI:'thomas',localService:true}];
  window.SpeechSynthesisUtterance=function(t){this.text=t;this.lang='';this.voice=null;this.rate=1;this.pitch=1;};
  const s={getVoices:()=>V,speak(u){window.__said.push({t:u.text,v:u.voice&&u.voice.name,p:u.pitch});setTimeout(()=>u.onend&&u.onend(),0);},cancel(){},addEventListener(){},speaking:false,pending:false};
  Object.defineProperty(window,'speechSynthesis',{value:s,configurable:true});try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
 await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
 await p.fill('#nm','Lina Martin');await p.click('[data-a="pickstage:college"]');await p.click('[data-a="pickgrade:6e"]');await p.click('[data-a="begin"]');await p.waitForTimeout(150);
 const end=(ok)=>p.evaluate(ok=>{window.__said=[];const id=reco().id;startMission([id]);M.ok=ok;endMission();const b=document.querySelector('.end.card .finot-say');
  return {bubble:b&&b.innerText,img:!!(b&&b.querySelector('img')),play:!!(b&&b.querySelector('[data-a="finotsay"]')),before:b&&b.nextElementSibling&&b.nextElementSibling.className,oldImg:document.querySelectorAll('.end.card .finot-live').length,said:window.__said.slice(),field:'finotVoice' in S};},ok);
 const top=await end(10);
 T('Fin d\'exercice réussi : Finot dans sa bulle (prénom, félicitations) au-dessus des étoiles, bouton « Réécouter »',top.bubble&&/Lina/.test(top.bubble)&&!/Martin/.test(top.bubble)&&top.img&&top.play&&/bigstars/.test(top.before)&&!top.oldImg,JSON.stringify(top));
 T('Finot le dit avec SA voix (Thomas, ton relevé), pas celle des leçons ; aucun champ ajouté à la sauvegarde',top.said.length===1&&top.said[0].v==='Thomas'&&top.said[0].p>1&&top.bubble.includes(top.said[0].t.slice(0,12))&&!top.field,JSON.stringify(top.said));
 const low=await end(1);
 T('Exercice raté : encouragement bienveillant (aucun reproche)',low.said.length===1&&/grave|Courage|lâche rien/.test(low.said[0].t),JSON.stringify(low.said));
 const rep=await p.evaluate(()=>{window.__said=[];document.querySelector('[data-a="finotsay"]').click();return window.__said.slice();});
 T('« Réécouter » relit la phrase affichée',rep.length===1&&rep[0].v==='Thomas',JSON.stringify(rep));
 await p.evaluate(()=>{S.sound=false;});const mute=await end(10);
 T('Son de l\'appli coupé : bulle affichée, Finot se tait',mute.bubble&&!mute.said.length,JSON.stringify(mute));
 await p.evaluate(()=>{S.sound=true;window.__said=[];ACT.finotvoice(null,null);});const off=await end(10);
 const saved=await p.evaluate(()=>{save();return S.finotVoice;});await p.reload({waitUntil:'load'});await p.waitForTimeout(300);const kept=await p.evaluate(()=>S.finotVoice);
 T('Voix coupée par le parent : bulle sans voix, choix conservé après rechargement',off.bubble&&!off.said.length&&saved===false&&kept===false,JSON.stringify({off,saved,kept}));
 await p.evaluate(()=>{ACT.finotvoice(null,null);});
 const fl=await p.evaluate(()=>{window.__said=[];S.flashBest=0;startFlash('all');M.ok=7;endFlash();const b=document.querySelector('.end.card .finot-say');return {bubble:b&&b.innerText,said:window.__said.slice(),best:S.flashBest};});
 T('Défi éclair, nouveau record : Finot le fête (bulle + voix)',fl.bubble&&/record/i.test(fl.bubble)&&fl.said.length===1&&fl.best===7,JSON.stringify(fl));
 const noName=await p.evaluate(()=>MQFinotVoice.fill('Hey {n}, félicitations ! Bravo {n} ! Ne lâche rien, {n}, je suis là.',''));
 T('Sans prénom : phrases correctes (« Hey, félicitations ! Bravo ! »)',noName==='Hey, félicitations ! Bravo ! Ne lâche rien, je suis là.',noName);
 const all=await p.evaluate(()=>Object.values(MQFinotVoice.phrases).flat());
 T('Phrases : toutes avec le prénom, courtes, sans accord masculin/féminin de l\'enfant',all.every(s=>s.includes('{n}')&&s.length<=80&&!/\b(champion|championne|prêt|prête|fort|forte|content|contente)\b/.test(s)),all.filter(s=>!s.includes('{n}')||s.length>80).join(' | '));
 T('Aucune erreur JavaScript',!errs.length,errs.slice(0,4).join(' | '));
 await b.close();srv.close();return R;}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
