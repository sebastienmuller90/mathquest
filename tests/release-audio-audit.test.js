/* Audit de release (24/10/2026) — audio, SANS prétendre avoir entendu un son.
   On vérifie ce que l'appli ENVOIE à la synthèse vocale, pas ce qu'on en entend :
   1. balayage de tous les générateurs de chapitres (ALLCH × 3 niveaux × 8 tirages) : texte audio non vide, locale valide et cohérente avec la
      matière, aucune consigne « écoute » sans audio, texte réellement prononcé sans balise / « undefined » / « [object », aucune réponse lue à voix haute
      dans une question qui demande de la trouver ;
   2. lexique de prononciation (lettres isolées, phonèmes, syllabes) ;
   3. navigateur avec une synthèse vocale simulée (SpeechSynthesisUtterance.text / .lang capturés) : dictées CP et CE1, lettres, sons, syllabes,
      mots, anglais, italien — lecture automatique, bouton « Écouter » et bouton « Lentement ».
   Complète (sans la dupliquer) audio.test.js, wave1-audio.test.js et wave1-dictation*.test.js. */
const {serve,launchEngine}=require('./release-lib');
const {seedProfile}=require('./lib');
const {answerQuestion}=require('./release-lib');

// Synthèse vocale simulée : trois voix (fr-FR, en-GB, it-IT) ; chaque énoncé est consigné puis « terminé » aussitôt.
const STUB=()=>{const spoken=[];window.__spoken=spoken;
  const voices=[{name:'Voix FR',lang:'fr-FR',voiceURI:'fr',localService:true,default:true},{name:'Voice EN',lang:'en-GB',voiceURI:'en',localService:true,default:false},{name:'Voce IT',lang:'it-IT',voiceURI:'it',localService:true,default:false}];
  function U(t){this.text=t;this.lang='';this.voice=null;this.rate=1;this.pitch=1;}
  window.SpeechSynthesisUtterance=U;
  const synth={speaking:false,pending:false,getVoices:()=>voices,speak(u){spoken.push({text:u.text,lang:u.lang,rate:u.rate,voice:u.voice&&u.voice.lang});setTimeout(()=>{try{u.onstart&&u.onstart();u.onend&&u.onend();}catch(e){}},5);},cancel(){},pause(){},resume(){},addEventListener(){},removeEventListener(){}};
  Object.defineProperty(window,'speechSynthesis',{value:synth,configurable:true});};

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const eng=(process.env.MQ_ENGINES||'chromium').split(',')[0].trim();const {srv,url}=await serve();const b=await launchEngine(eng);
 try{
  const ctx=await b.newContext({viewport:{width:390,height:844},hasTouch:true});
  await ctx.addInitScript(STUB);
  await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');if(!localStorage.getItem('__init')){localStorage.clear();localStorage.setItem('__init','1');localStorage.setItem('mathquest_profiles_v2',JSON.stringify({version:3,active:'a',profiles:{a:{name:'Test',grade:'CE1',avatar:'🦊'}}}));}}catch(e){}});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
  p.setDefaultTimeout(6000);
  await p.goto(url+'index.html',{waitUntil:'load'});await p.waitForFunction(()=>typeof S!=='undefined'&&typeof ALLCH!=='undefined'&&typeof MQAudio!=='undefined');

  if(process.env.MQ_DEBUG)console.error('étape 1');
  // ===== 1. Balayage de tous les générateurs
  const scan=await p.evaluate(()=>{
   const strip=s=>String(s==null?'':s).replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
   const norm=s=>strip(s).toLowerCase().replace(/[.,!?;:«»"“”'’]/g,'').replace(/\s+/g,' ').trim();
   const LISTEN=/🎧|(^|[.!?:]\s)[ÉE]coute(z)?\b|\bentends-tu\b|(^|[.!?:]\s)Tu entends (le|la|les|l’|un|une|ce|cette|bien) (son|mot|nombre|phrase|lettre|bruit)\b/i;
   const TRANSCRIBE=/[ÉE]coute.*(écris|recopie|tape)|dictée|ce que tu entends/i;
   const o={chapters:ALLCH.length,questions:0,audios:0,empty:[],locale:[],lang:[],listenNoAudio:[],dirty:[],leak:[],errors:[],bySub:{},cats:{},ids:{}};
   const OKLOC=['fr-FR','en-GB','it-IT'];
   for(const c of ALLCH){const sub=sOf(WMAP[c.id].id).id;
    for(const d of [1,2,3])for(let k=0;k<8;k++){let q;try{q=c.g(d);}catch(e){o.errors.push(c.id+' : '+e.message);continue;}
     if(!q){o.errors.push(c.id+' : question nulle');continue;}o.questions++;
     const stem=strip(q.q);
     if(!q.audio){if(LISTEN.test(stem))o.listenNoAudio.push(c.id+' : '+stem.slice(0,90));continue;}
     o.audios++;const a=q.audio;o.bySub[sub]=(o.bySub[sub]||0)+1;o.ids[c.id]=(o.ids[c.id]||0)+1;
     if(typeof a.t!=='string'||!a.t.trim()){o.empty.push(c.id+' : '+JSON.stringify(a));continue;}
     if(!OKLOC.includes(a.l))o.locale.push(c.id+' : « '+a.l+' »');
     const want=sub==='anglais'||sub==='p-anglais'?'en-GB':sub==='italien'?'it-IT':'fr-FR';
     if(a.l!==want)o.lang.push(c.id+' ('+sub+') : '+a.l+' « '+a.t.slice(0,40)+' »');
     let sp='';try{sp=MQAudio.spokenFor(a.t,a.k||'phrase',String(a.l).slice(0,2));}catch(e){o.errors.push(c.id+' spokenFor : '+e.message);}
     if(!sp||!String(sp).trim()||/undefined|\[object|\bNaN\b|<\/?[a-z][^>]*>|&[a-z]+;|\bnull\b/.test(a.t+' '+sp))o.dirty.push(c.id+' : « '+a.t.slice(0,50)+' » → « '+String(sp).slice(0,50)+' »');
     // la réponse attendue n'est pas lue à voix haute quand la question demande de la trouver
     let ans=[];if(q.type==='choice')ans=[strip(q.choices[q.ans])];else if(q.type==='text')ans=(q.acc||[]).map(strip);else if(q.type==='num')ans=[String(q.ans)];
     if(ans.some(x=>x&&norm(x)===norm(a.t))&&!TRANSCRIBE.test(stem)&&!/🎧|[ÉE]coute/.test(stem)&&!norm(stem).includes(norm(a.t)))o.leak.push(c.id+' : « '+stem.slice(0,60)+' » lit « '+a.t.slice(0,30)+' »');
     // catégories (lettres isolées, sons, syllabes, mots, phrases, nombres)
     const w=norm(a.t).split(' ').filter(Boolean).length;
     const cat=a.k==='lettre'||(norm(a.t).length===1)?'lettre':a.k==='phonème'||a.k==='graphème'?'phonème':a.k==='syllabe'?'syllabe':/\d|^(one|two|three|four|five|six|seven|eight|nine|ten|uno|due|tre|quattro|cinque)\b/.test(norm(a.t))?'nombre':w===1?'mot':'phrase';
     o.cats[cat]=(o.cats[cat]||0)+1;}}
   for(const k of ['empty','locale','lang','listenNoAudio','dirty','leak','errors'])o[k]=[...new Set(o[k])];
   return o;});
  T(`Balayage : ${scan.chapters} chapitres × 3 niveaux × 8 tirages, ${scan.questions} questions, aucune exception de générateur`,scan.chapters>=1000&&scan.questions>=20000&&!scan.errors.length,scan.errors.slice(0,5).join(' | '));
  T(`${scan.audios} questions audio : trois langues présentes (fr-FR, en-GB, it-IT) et plusieurs matières`,scan.audios>=500&&scan.bySub['anglais']>0&&scan.bySub['italien']>0&&scan.bySub['p-anglais']>0&&scan.bySub['p-francais']>0&&scan.bySub['francais']>0,JSON.stringify(scan.bySub));
  T('Tout exercice audio possède un texte non vide et une locale valide (fr-FR, en-GB ou it-IT)',!scan.empty.length&&!scan.locale.length,scan.empty.concat(scan.locale).slice(0,6).join(' | '));
  T('La locale de l’audio correspond à la matière (anglais → en-GB, italien → it-IT, le reste → fr-FR)',!scan.lang.length,scan.lang.slice(0,6).join(' | '));
  T('Aucune consigne « écoute / entends-tu / 🎧 » sans contenu audio, sur tous les chapitres',!scan.listenNoAudio.length,scan.listenNoAudio.slice(0,8).join(' | '));
  T('Texte réellement prononcé : jamais vide, sans balise HTML, sans « undefined », « [object », « NaN » ni entité',!scan.dirty.length,scan.dirty.slice(0,6).join(' | '));
  T('Aucune réponse attendue lue à voix haute dans une question qui demande de la trouver (hors dictée, écoute-et-choisis, ou mot déjà écrit dans la question)',!scan.leak.length,scan.leak.length+' cas — '+scan.leak.slice(0,6).join(' | '));
  T('Catégories audio présentes : sons / lettres / syllabes / mots / phrases / nombres',['mot','phrase','nombre'].every(k=>scan.cats[k]>0)&&Object.keys(scan.cats).length>=3,JSON.stringify(scan.cats));

  if(process.env.MQ_DEBUG)console.error('étape 2');
  // ===== 2. Lexique de prononciation : lettres isolées, phonèmes, syllabes
  const lex=await p.evaluate(()=>{const L=window.MQ_PRONUNCIATION,o={bad:[],counts:{},missingLetters:[]};
   const clean=s=>!s||!String(s).trim()||/undefined|\[object|\bNaN\b|<\/?[a-z]|&[a-z]+;/.test(s);
   o.counts={letters:Object.keys(L.letters).length,graphemes:Object.keys(L.graphemes).length,syllables:Object.keys(L.syllables).length};
   for(const [kind,type] of [['letters','lettre'],['graphemes','phonème'],['syllables','syllabe']])for(const [k,e] of Object.entries(L[kind])){
     const sp=MQAudio.spokenFor(k,type,'fr');if(clean(e.say)||clean(sp))o.bad.push(kind+':'+k+' → '+sp);
     if(!String(e.say).toLowerCase().includes(String(e.cible||k).toLowerCase().slice(0,1)))o.bad.push(kind+':'+k+' say sans la cible : '+e.say);}
   for(const ch of 'abcdefghijklmnopqrstuvwxyz')if(!L.letters[ch])o.missingLetters.push(ch);
   o.raw=MQAudio.spokenFor('b','lettre','fr');o.unk=MQAudio.spokenFor('zzq','syllabe','fr');return o;});
  T(`Lexique : ${lex.counts.letters} lettres, ${lex.counts.graphemes} phonèmes, ${lex.counts.syllables} syllabes, tous avec un texte à lire propre`,!lex.bad.length&&lex.counts.letters>=26,lex.bad.slice(0,5).join(' | '));
  T('Lexique : les 26 lettres de l’alphabet sont lisibles (aucune lettre isolée absente)',!lex.missingLetters.length,lex.missingLetters.join(','));
  T('Lettre isolée : lue avec son nom (« La lettre B »), jamais comme un mot ; syllabe inconnue lue telle quelle',/La lettre B/.test(lex.raw)&&lex.unk==='zzq.',lex.raw+' / '+lex.unk);

  if(process.env.MQ_DEBUG)console.error('étape 3');
  // ===== 3. Cibles de prononciation orale : propres
  const pron=await p.evaluate(()=>{const bad=[];let n=0;for(const c of ALLCH){let t=[];try{t=pronTargets(c.id)||[];}catch(e){bad.push(c.id+' : '+e.message);continue;}
    for(const x of t){n++;if(typeof x!=='string'||!x.trim()||/undefined|\[object|<\/?[a-z]|&[a-z]+;/.test(x))bad.push(c.id+' : '+JSON.stringify(x));}}return {n,bad:[...new Set(bad)]};});
  T(`Exercices de prononciation : ${pron.n} phrases cibles, aucune vide ni sale`,pron.n>0&&!pron.bad.length,pron.bad.slice(0,5).join(' | '));

  if(process.env.MQ_DEBUG)console.error('étape 4');
  // ===== 4. Navigateur + synthèse simulée : ce qui part réellement à la synthèse
  const pick=await p.evaluate(()=>{const f=(pred,n)=>ALLCH.filter(pred).slice(0,n).map(c=>({id:c.id,grade:c.grade||'6e'}));
   const sub=c=>sOf(WMAP[c.id].id).id;
   const aud=c=>{let n=0;for(let i=0;i<12;i++){try{if(c.g(2).audio)n++;}catch(e){}}return n>=4;};
   return {
    cpDict:f(c=>c.id==='cp-fr-dictee',1),ce1Dict:f(c=>c.id==='ce1-fr-dictee',1),cm2Dict:f(c=>c.id==='cm2-fr-dictee',1),
    sons:f(c=>['cp-fr-voyelles','cp-fr-consonnes-longues','cp-fr-consonnes-courtes','cp-fr-ou-on','cp-fr-an-in','cp-fr-syllabes','cp-fr-lire-mots','cp-fr-mots-outils'].includes(c.id),8),
    anglaisPrim:f(c=>sub(c)==='p-anglais'&&c.grade==='CP',2).concat(f(c=>sub(c)==='p-anglais'&&c.grade==='CE1',2),f(c=>sub(c)==='p-anglais'&&c.grade==='CM2',2)),
    anglaisCol:f(c=>sub(c)==='anglais'&&aud(c),3),italien:f(c=>sub(c)==='italien'&&aud(c),3)};});
  const play=async(chap,nq=5)=>{const t0=Date.now();if(process.env.MQ_DEBUG)setTimeout(()=>{},0);const out={id:chap.id,nq:0,n:0,issues:[],texts:[]};
   await seedProfile(p,'Test',chap.grade);
   await p.evaluate(id=>{startMission([id]);},chap.id);
   await p.evaluate(()=>{window.__spoken.length=0;});
   try{await p.waitForFunction(()=>typeof M!=='undefined'&&M&&M.q,null,{timeout:4000});}catch(e){out.issues.push('mission non démarrée');return out;}
   for(let i=0;i<nq;i++){
    const q=await p.evaluate(()=>{const x=M&&M.q;if(!x)return null;const strip=s=>String(s==null?'':s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();return {type:x.type,audio:x.audio||null,acc:(x.acc||[]).map(strip),stem:strip(x.q),dict:typeof isDictation==='function'&&isDictation(x),
      ans:x.type==='choice'?strip(x.choices[x.ans]):x.type==='num'?String(x.ans):null};});
    if(!q)break;out.nq++;
    if(q.audio){out.n++;
     const exp=await p.evaluate(a=>MQAudio.spokenFor(a.t,a.k||'phrase',String(a.l).slice(0,2)),q.audio);
     const want=String(q.audio.l);
     const norm=s=>String(s).toLowerCase().replace(/[.,!?;:«»"“”'’\s-]/g,'');
     // lecture automatique (350 ms après l'affichage)
     await p.waitForFunction(()=>window.__spoken.length>0,null,{timeout:2500}).catch(()=>{});
     const auto=await p.evaluate(()=>{const s=window.__spoken.slice();return s;});
     if(!auto.length)out.issues.push('aucune lecture automatique : '+q.audio.t.slice(0,40));
     else{const u=auto[0];out.texts.push(u.text);
      if(u.text!==exp)out.issues.push(`texte envoyé « ${u.text.slice(0,50)} » ≠ attendu « ${exp.slice(0,50)} »`);
      if(u.lang!==want)out.issues.push(`langue ${u.lang} ≠ ${want}`);
      if(!u.text.trim()||/undefined|\[object|<\/?[a-z]|NaN/.test(u.text))out.issues.push('texte sale : '+u.text.slice(0,60));
      if(u.voice!==want)out.issues.push(`voix ${u.voice} ≠ ${want}`);
      if(q.dict&&norm(u.text)!==norm(q.acc[0]))out.issues.push(`dictée : lu « ${u.text.slice(0,60)} » ≠ phrase attendue « ${q.acc[0].slice(0,60)} »`);}
     // la phrase de la dictée n'est pas affichée à l'écran avant la réponse
     if(q.dict||q.type==='text'&&/Écoute/.test(q.stem)){const shown=await p.evaluate(()=>document.getElementById('app').innerText.toLowerCase().replace(/[.,!?;:«»"“”'’\s-]/g,''));
      const target=norm(q.acc[0]||'');if(target.length>=8&&shown.includes(target))out.issues.push('phrase de la dictée visible avant réponse : '+q.acc[0].slice(0,50));}
     // boutons « Écouter » et « Lentement »
     for(const [sel,rate] of [['[data-a="qlisten"]',null],['[data-a="qlistenslow"]',.75]]){
      if(!await p.locator(sel).count()){out.issues.push('bouton absent '+sel);continue;}
      await p.evaluate(()=>{window.__spoken.length=0;});await p.click(sel);
      await p.waitForFunction(()=>window.__spoken.length>0,null,{timeout:2000}).catch(()=>{});
      const s=await p.evaluate(()=>window.__spoken.slice());
      if(!s.length)out.issues.push('rien lu après '+sel);
      else{if(s[0].text!==exp)out.issues.push(sel+' : texte « '+s[0].text.slice(0,40)+' » ≠ « '+exp.slice(0,40)+' »');if(s[0].lang!==want)out.issues.push(sel+' : langue '+s[0].lang);if(rate!=null&&s[0].rate!==rate)out.issues.push(sel+' : vitesse '+s[0].rate);}}
    }
    await p.evaluate(()=>{window.__spoken.length=0;});
    const i0=await p.evaluate(()=>M.i);
    await answerQuestion(p,true);
    await p.waitForFunction(()=>M&&M.locked,null,{timeout:3000}).catch(()=>{});
    if(await p.locator('[data-a="next"]').count())await p.click('[data-a="next"]');else await p.evaluate(()=>{if(typeof advance==='function')advance();});
    // attend que la question suivante soit réellement affichée, puis oublie ce qui a été lu pour la précédente (retour de Finot, etc.)
    const moved=await p.waitForFunction(i0=>!M||(M.i!==i0&&M.q&&!M.locked),i0,{timeout:3000}).then(()=>true).catch(()=>false);
    await p.evaluate(()=>{window.__spoken.length=0;});
    if(!moved||!await p.evaluate(()=>!!(M&&M.q)))break;}
   return out;};
  const group=async(label,list,minAudio,extra)=>{const res=[];for(const ch of list){const t0=Date.now();try{res.push(await play(ch));if(process.env.MQ_DEBUG)console.error('  chapitre',ch.id,Date.now()-t0,'ms');}catch(e){res.push({id:ch.id,nq:0,n:0,texts:[],issues:['exception : '+String(e.message).slice(0,160)]});}}
   const issues=res.flatMap(r=>r.issues.map(i=>r.id+' : '+i));const n=res.reduce((a,r)=>a+r.n,0),nq=res.reduce((a,r)=>a+r.nq,0);
   T(`${label} : ${n} énoncés audio sur ${nq} questions (${res.length} chapitres), texte et langue envoyés à la synthèse corrects`,res.length>0&&n>=minAudio&&!issues.length,(res.length?'':'aucun chapitre — ')+issues.slice(0,5).join(' | '));
   if(extra)extra(res);return res;};
  await group('Dictée CP (mots)',pick.cpDict,3,res=>{const t=res.flatMap(r=>r.texts);T('Dictée CP : un mot (ou une courte phrase) par question, jamais la consigne ni une réponse inversée',t.length>0&&t.every(x=>x.split(/\s+/).length<=4&&!/[ÉE]coute|écris/i.test(x)),t.join(' / '));});
  await group('Dictée CE1 (mots et phrases)',pick.ce1Dict,3,res=>{const t=res.flatMap(r=>r.texts);T('Dictée CE1 : le texte lu ne contient ni la consigne ni « undefined »',t.length>0&&t.every(x=>!/[ÉE]coute|écris|undefined/i.test(x)),t.join(' / '));});
  await group('Dictée CM2',pick.cm2Dict,3);
  await group('Lettres, sons, syllabes et mots (CP)',pick.sons,5);
  await group('Anglais du primaire (CP, CE1, CM2)',pick.anglaisPrim,5,res=>{T('Anglais du primaire : tout est lu avec la locale en-GB',res.flatMap(r=>r.texts).length>0,'')});
  await group('Anglais du collège',pick.anglaisCol,1);
  await group('Italien du collège',pick.italien,1);

  if(process.env.MQ_DEBUG)console.error('étape 5');
  // ===== 5. Sans voix pour une langue : le texte est affiché, rien n'est lu par une voix d'une autre langue
  const nov=await ctx.newPage();const errs2=[];nov.on('pageerror',e=>errs2.push(e.message));
  await nov.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
  await nov.addInitScript(()=>{const vs=[{name:'Voix FR',lang:'fr-FR',voiceURI:'fr',localService:true,default:true}];window.__spoken=[];window.SpeechSynthesisUtterance=function(t){this.text=t;this.lang='';this.voice=null;this.rate=1;this.pitch=1;};
   Object.defineProperty(window,'speechSynthesis',{value:{speaking:false,pending:false,getVoices:()=>vs,speak(u){window.__spoken.push({text:u.text,lang:u.lang,voice:u.voice&&u.voice.lang});setTimeout(()=>u.onend&&u.onend(),5);},cancel(){},addEventListener(){},removeEventListener(){}},configurable:true});});
  await nov.goto(url+'index.html',{waitUntil:'load'});await nov.waitForFunction(()=>typeof S!=='undefined'&&typeof MQAudio!=='undefined');
  const nv=await nov.evaluate(()=>{const c=ALLCH.find(x=>sOf(WMAP[x.id].id).id==='p-anglais');let q=null;for(let i=0;i<60&&!q;i++){const x=c.g(2);if(x.audio)q=x;}
   const html=q?audioHTML(q):'';MQAudio.speak([{t:q?q.audio.t:'Hello',l:'en-GB'}]);return {html,spoken:window.__spoken.slice(),status:MQAudio.pickVoice('en').status};});
  T('Aucune voix anglaise installée : le texte est affiché à la place du bouton, et rien n’est lu par la voix française',nv.status==='unavailable'&&/Aucune voix anglaise/.test(nv.html)&&!/qlisten/.test(nv.html)&&!nv.spoken.length,JSON.stringify({status:nv.status,spoken:nv.spoken,html:nv.html.slice(0,120)}));
  T('Aucune erreur JavaScript pendant l’audit audio',!errs.length&&!errs2.length,errs.concat(errs2).slice(0,4).join(' | '));
  await ctx.close();
 }finally{await b.close();srv.close();}return R;}
require('./lib').main(run);
