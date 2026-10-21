/* Accessibilité clavier et noms accessibles (20/10/2026, §12 de l'audit de stabilisation), Chromium.
   1. Noms accessibles : chaque bouton, lien, champ et résumé visible des écrans principaux (accueil et ses onglets,
      exercice de chaque type, quiz de cours, parcours du jour, espace parents, Finot ouvert) a un nom non vide ;
      un bouton-icône (aucune lettre ni chiffre dans son texte : ✕, 🦊, 🔊, ⓘ, ←…) doit avoir un aria-label (ou title).
   2. Exercice à choix entièrement au clavier : Tab atteint les réponses, Entrée valide, le focus arrive sur
      « suivant » ; Entrée sur ce bouton avance d'UNE seule question ; Espace valide aussi ; raccourcis 1-4.
   3. Focus visible (:focus-visible → contour ou ombre) sur les boutons principaux atteints au clavier.
   4. Finot : ouverture au clavier, focus dans la zone de saisie, fermeture par Échap, bouton de fermeture nommé. */
const {serve,launch}=require('./lib');
const NAMES=`(()=>{
 const vis=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);if(r.width<2||r.height<2||s.visibility==='hidden'||s.display==='none')return false;for(let d=e.parentElement&&e.parentElement.closest('details');d;d=d.parentElement&&d.parentElement.closest('details'))if(!d.open&&!(e.tagName==='SUMMARY'&&e.parentElement===d))return false;return true;};
 const txt=e=>(e.innerText||e.textContent||'').replace(/\\s+/g,' ').trim();
 const lbl=e=>{if(e.getAttribute('aria-label'))return e.getAttribute('aria-label').trim();const lb=e.getAttribute('aria-labelledby');if(lb)return lb.split(/\\s+/).map(id=>txt(document.getElementById(id)||document.createElement('i'))).join(' ').trim();if(e.id){const l=document.querySelector('label[for="'+CSS.escape(e.id)+'"]');if(l&&txt(l))return txt(l);}const w=e.closest('label');if(w&&txt(w))return txt(w);return '';};
 const desc=e=>e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.dataset&&e.dataset.a?'[data-a="'+e.dataset.a+'"]':'')+(typeof e.className==='string'&&e.className?'.'+e.className.trim().split(/\\s+/).slice(0,2).join('.'):'');
 const bad=[];
 for(const e of document.querySelectorAll('button,a[href],input:not([type=hidden]),select,textarea,summary,[role=button]')){if(!vis(e))continue;
  const aria=lbl(e),title=(e.getAttribute('title')||'').trim(),t=txt(e),field=/^(INPUT|SELECT|TEXTAREA)$/.test(e.tagName);
  if(field){if(!aria&&!title&&!(e.getAttribute('placeholder')||'').trim())bad.push('champ sans nom '+desc(e));continue;}
  if(!aria&&!title&&!t){bad.push('sans nom '+desc(e));continue;}
  if(!aria&&!title&&!/[\\p{L}\\p{N}]/u.test(t))bad.push('bouton-icône sans aria-label « '+t.slice(0,6)+' » '+desc(e));}
 return [...new Set(bad)];})()`;
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const {srv,url}=await serve();const b=await launch();const ctx=await b.newContext({viewport:{width:1024,height:800}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
 const n0=await p.evaluate(NAMES);T('Accueil premier lancement (création de profil) : tous les contrôles ont un nom accessible',!n0.length,n0.join(' | '));
 await p.fill('#nm','Clavier');await p.click('[data-a="pickstage:college"]');await p.click('[data-a="pickgrade:6e"]');await p.click('[data-a="begin"]');await p.waitForTimeout(200);

 // 1. Noms accessibles sur les écrans principaux.
 const screens={};const look=async(label,fn)=>{if(fn)await p.evaluate(fn);await p.waitForTimeout(80);const r=await p.evaluate(NAMES);if(r.length)screens[label]=r;};
 const tabs=await p.evaluate(()=>typeof HOMETABS!=='undefined'?HOMETABS.map(t=>t[0]):['accueil']);
 for(const k of tabs)await look('accueil/'+k,`(()=>{home();ACT.hometab('${k}');})()`);
 const plan=await p.evaluate(()=>{const want=['choice','num','frac','text','order','multi'],got={};for(const c of ALLCH){if(Object.keys(got).length===want.length)break;if(!WMAP[c.id]||typeof c.g!=='function')continue;for(let k=0;k<3;k++){let q;try{q=c.g(2);}catch(e){break;}if(q&&want.includes(q.type)&&!got[q.type]){got[q.type]=c.id;break;}}}return got;});
 for(const [type,cid] of Object.entries(plan)){
  await look('exercice '+type,`(()=>{home();startMission(['${cid}']);for(let k=0;k<30&&M.q.type!=='${type}';k++)M.q=CHMAP['${cid}'].g(M.d);renderQ();})()`);
  await look('correction '+type,`(()=>{const q=M.q;if(q.type==='choice')validate((q.ans+1)%q.choices.length);else{M.your='?';result(false);}})()`);}
 await look('quiz de cours',`(()=>{home();const id=reco().id;openLesson(id);L.i=L.steps.findIndex(s=>s.k==='quiz');renderLesson();})()`);
 await look('étape de cours',`(()=>{L.i=1;renderLesson();})()`);
 await look('parcours du jour',`(()=>{ACT.path();})()`);
 await look('espace parents',`(()=>{parentScreen('suivi');})()`);
 await look('Finot ouvert',`(()=>{home();finotOpen();})()`);
 await p.evaluate(()=>{finotClose();home();});
 const sk=Object.keys(screens);
 T('Noms accessibles : boutons, liens, champs et boutons-icônes des écrans principaux',!sk.length,sk.map(k=>k+' → '+screens[k].slice(0,6).join(' ; ')).join(' || '));

 // 2. Exercice à choix au clavier.
 const cid=plan.choice;
 const kb={};
 if(cid){
  await p.evaluate(c=>{home();startMission([c]);for(let k=0;k<30&&M.q.type!=='choice';k++)M.q=CHMAP[c].g(M.d);renderQ();document.activeElement&&document.activeElement.blur();},cid);
  const wrongIdx=await p.evaluate(()=>(M.q.ans+1)%M.q.choices.length);
  let reached=false;for(let i=0;i<40;i++){await p.keyboard.press('Tab');const a=await p.evaluate(()=>document.activeElement&&document.activeElement.dataset?document.activeElement.dataset.a||'':'');if(a==='pick:'+wrongIdx){reached=true;break;}}
  kb.tabToChoice=reached;
  const ring=await p.evaluate(()=>{const e=document.activeElement,s=getComputedStyle(e);return {outline:s.outlineStyle!=='none'&&parseFloat(s.outlineWidth)>0,shadow:s.boxShadow&&s.boxShadow!=='none',matches:e.matches(':focus-visible')};});
  kb.focusRingChoice=ring;
  if(reached){await p.keyboard.press('Enter');await p.waitForTimeout(150);kb.enterValidates=await p.evaluate(()=>!!(M&&M.locked));if(!kb.enterValidates){await p.keyboard.press('Space');await p.waitForTimeout(150);}
   Object.assign(kb,await p.evaluate(()=>({locked:!!(M&&M.locked),wrongShown:!!document.querySelector('#fb .fb.bad'),focus:document.activeElement&&(document.activeElement.dataset.a||document.activeElement.id||document.activeElement.tagName),i:M.i})));
   const i0=kb.i;await p.keyboard.press('Enter');await p.waitForTimeout(200);
   kb.afterNext=await p.evaluate(()=>({i:M?M.i:null,locked:!!(M&&M.locked)}));kb.advancedOnce=kb.afterNext.i===i0+1;}
  // Espace sur une réponse, puis raccourci numérique.
  await p.evaluate(c=>{home();startMission([c]);for(let k=0;k<30&&M.q.type!=='choice';k++)M.q=CHMAP[c].g(M.d);renderQ();},cid);
  const sp=await p.evaluate(()=>{const b=document.querySelector('.choice');b.focus();return {tq:S.totalQ};});await p.keyboard.press('Space');await p.waitForTimeout(120);
  kb.space=await p.evaluate(t=>S.totalQ===t+1&&!!M.locked,sp.tq);
  await p.evaluate(c=>{home();startMission([c]);for(let k=0;k<30&&M.q.type!=='choice';k++)M.q=CHMAP[c].g(M.d);renderQ();document.activeElement&&document.activeElement.blur();},cid);
  const tq=await p.evaluate(()=>S.totalQ);await p.keyboard.press('2');await p.waitForTimeout(120);
  kb.digit=await p.evaluate(t=>S.totalQ===t+1&&!!M.locked,tq);}
 T('Exercice à choix au clavier : Tab atteint les réponses ; après validation, correction affichée et focus sur « suivant »',cid&&kb.tabToChoice&&kb.locked&&kb.wrongShown&&kb.focus==='next',JSON.stringify(kb));
 T('Entrée sur une réponse focalisée la valide (comme Espace)',cid&&kb.enterValidates,JSON.stringify({enterValidates:kb.enterValidates}));
 T('Entrée sur « suivant » : une seule question avancée (pas de double traitement clavier + clic)',cid&&kb.advancedOnce&&kb.afterNext&&!kb.afterNext.locked,JSON.stringify(kb.afterNext));
 T('Espace sur une réponse et raccourci « 2 » : réponse validée une fois',cid&&kb.space&&kb.digit,JSON.stringify({space:kb.space,digit:kb.digit}));

 // 3. Focus visible au clavier sur les boutons principaux.
 const rings={};
 const ringOf=async(label,prep,sel)=>{await p.evaluate(prep);await p.evaluate(()=>{document.activeElement&&document.activeElement.blur();});
  let ok=null;for(let i=0;i<60;i++){await p.keyboard.press('Tab');const hit=await p.evaluate(s=>{const e=document.activeElement;if(!e||!e.matches(s))return null;const st=getComputedStyle(e);return {outline:st.outlineStyle!=='none'&&parseFloat(st.outlineWidth)>0,shadow:!!st.boxShadow&&st.boxShadow!=='none',fv:e.matches(':focus-visible')};},sel);if(hit){ok=hit;break;}}
  rings[label]=ok;};
 if(cid){await ringOf('réponse (.choice)',`(()=>{home();startMission(['${cid}']);for(let k=0;k<30&&M.q.type!=='choice';k++)M.q=CHMAP['${cid}'].g(M.d);renderQ();})()`,'.choice');
  await ringOf('Indice (.btn)',`(()=>{home();startMission(['${cid}']);})()`,'.btn[data-a="hint"]');}
 await ringOf('onglet d’accueil (.htab)',`(()=>{if(M){clearInterval(M.tick);clearTimeout(M.tid);M=null;}ACT.hometab('accueil');home();})()`,'.htab');
 await ringOf('bouton de Finot (.finot-fab)',`(()=>{if(M){clearInterval(M.tick);clearTimeout(M.tid);M=null;}ACT.hometab('accueil');home();})()`,'.finot-fab');
 await ringOf('carte du devoir du jour',`(()=>{if(M){clearInterval(M.tick);clearTimeout(M.tid);M=null;}ACT.hometab('accueil');home();})()`,'[data-a="path"]');
 const noRing=Object.entries(rings).filter(([k,v])=>!v||!(v.outline||v.shadow)).map(([k,v])=>k+':'+JSON.stringify(v));
 T('Focus visible au clavier (contour ou ombre) sur les boutons principaux',!noRing.length,noRing.join(' | ')||JSON.stringify(rings));

 // 4. Finot au clavier.
 await p.evaluate(()=>{finotClose();const cel=document.getElementById('celeb');if(cel&&cel.classList.contains('show')&&ACT.celebclose)ACT.celebclose();if(M){clearInterval(M.tick);clearTimeout(M.tid);M=null;}L=null;ACT.hometab('accueil');home();const f=document.querySelector('.finot-fab');f&&f.focus();});
 await p.keyboard.press('Enter');await p.waitForTimeout(200);
 const fo=await p.evaluate(()=>({open:!!document.querySelector('#finotchat.open'),focus:document.activeElement&&document.activeElement.id,close:(()=>{const c=document.querySelector('#finotchat [data-a="finotclose"]');return c?(c.getAttribute('aria-label')||c.textContent||'').trim():null;})()}));
 await p.keyboard.press('Escape');await p.waitForTimeout(150);
 const fc=await p.evaluate(()=>({closed:!document.querySelector('#finotchat.open'),focus:document.activeElement&&(document.activeElement.className||document.activeElement.tagName)}));
 T('Finot au clavier : ouverture par Entrée, focus dans la zone de saisie, fermeture par Échap, bouton de fermeture nommé',fo.open&&fo.focus==='finotin'&&fc.closed&&!!fo.close,JSON.stringify({fo,fc}));
 T('Finot : après Échap, le focus revient sur le bouton qui l’a ouvert (pas perdu sur la page)',fc.closed&&/finot-fab/.test(String(fc.focus)),JSON.stringify(fc));
 T('Aucune erreur JavaScript',!errs.length,errs.slice(0,4).join(' | '));
 await b.close();srv.close();return R;}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
