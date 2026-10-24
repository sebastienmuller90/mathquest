/* Audit de release (24/10/2026) — clavier, formulaires, accessibilité. Chromium (ou MQ_ENGINES), jamais VoiceOver.
   P6 : VRAIE frappe (page.keyboard) dans chaque champ de saisie ; après chaque touche, l'élément reste le même objet
        (marqueur JS expando), garde le focus, reste connecté au DOM, le texte s'accumule sans perte et le curseur
        (selectionStart) est là où le modèle de frappe l'attend (flèches, Début/Fin, Retour arrière, Suppr au milieu du texte) ;
        même vérification 900 ms après la dernière touche (minuteurs, sauvegarde différée, synchronisation).
   P7 : parcours Tab sans piège, ordre cohérent, focus visible, noms accessibles, champs étiquetés, aria-pressed/aria-expanded
        fidèles à l'état, aucun élément cliquable non focusable, Échap ferme les fenêtres, contraste clair/sombre des écrans
        non couverts par premium-contrast.test.js (parent ×4 + devoirs, carnet d'erreurs, assistant d'inscription, cours, réglages). */
const {serve,launchEngine,freshContext,wizard}=require('./release-lib');
const {seedProfile}=require('./lib');

/* ---------- P6 : moteur de frappe avec modèle ---------- */
// ops : 'type:abc' | 'L' | 'R' | 'HOME' | 'END' | 'BS' | 'DEL' | 'wait'
async function edit(p,sel,ops,{cursor=true,wait=900}={}){
 const bad=[];
 const st0=await p.evaluate(sel=>{const e=document.querySelector(sel);if(!e)return null;window.__mkEl=e;e.__mk=Math.random();e.focus();try{e.setSelectionRange(e.value.length,e.value.length);}catch(x){}return {v:e.value,ok:document.activeElement===e};},sel);
 if(!st0)return ['champ introuvable '+sel];if(!st0.ok)return ['focus impossible '+sel];
 let v=st0.v,c=v.length;
 const read=()=>p.evaluate(()=>{const e=window.__mkEl;let s=null;try{s=e.selectionStart;}catch(x){}return {same:document.activeElement===e,conn:e.isConnected,marked:!!e.__mk,v:e.value,s,tag:document.activeElement&&(document.activeElement.id||document.activeElement.tagName)};});
 const check=async(label)=>{const r=await read();
  if(!r.conn)bad.push(label+' : champ retiré du DOM (réécriture)');else if(!r.same)bad.push(label+' : focus perdu (actif='+r.tag+')');
  if(r.v!==v)bad.push(label+' : texte «'+r.v+'» ≠ attendu «'+v+'»');
  if(cursor&&r.s!==null&&r.s!==c)bad.push(label+' : curseur '+r.s+' ≠ '+c);return r;};
 for(const op of ops){
  if(op==='wait'){await p.waitForTimeout(wait);await check('après '+wait+' ms de repos');continue;}
  if(op.startsWith('type:')){for(const ch of op.slice(5)){await p.keyboard.type(ch);v=v.slice(0,c)+ch+v.slice(c);c++;await p.waitForTimeout(28);await check('frappe «'+ch+'»');if(bad.length>3)return bad;}continue;}
  const key={L:'ArrowLeft',R:'ArrowRight',HOME:'Home',END:'End',BS:'Backspace',DEL:'Delete'}[op];
  await p.keyboard.press(key);
  if(op==='L')c=Math.max(0,c-1);else if(op==='R')c=Math.min(v.length,c+1);else if(op==='HOME')c=0;else if(op==='END')c=v.length;
  else if(op==='BS'&&c>0){v=v.slice(0,c-1)+v.slice(c);c--;}else if(op==='DEL'){v=v.slice(0,c)+v.slice(c+1);}
  await p.waitForTimeout(28);await check(op);if(bad.length>3)return bad;}
 await p.waitForTimeout(wait);await check('repos final');
 return bad;}
const TEXT_OPS=['type:abcdef','L','L','L','type:Z','BS','DEL','HOME','type:Q','R','R','END','type:!','wait','L','type:é','BS','BS','wait'];
const NUM_OPS=['type:12','type:3','BS','type:45','wait'];

/* ---------- P7 : sondes dans la page ---------- */
const VIS=`const vis=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);if(r.width<2||r.height<2||s.visibility==='hidden'||s.display==='none')return false;for(let d=e.parentElement&&e.parentElement.closest('details');d;d=d.parentElement&&d.parentElement.closest('details'))if(!d.open&&!(e.tagName==='SUMMARY'&&e.parentElement===d))return false;if(e.closest('[aria-hidden="true"],[hidden],[inert]'))return false;return true;};`;
const FOCUSABLE_SEL='button,a[href],input:not([type=hidden]),select,textarea,summary,[tabindex]';
// éléments cliquables (data-a / data-pob / onclick) qui ne sont pas atteignables au clavier
const NONFOCUS=`(()=>{${VIS}const bad=[];
 for(const e of document.querySelectorAll('[data-a],[data-pob],[onclick]')){if(!vis(e)||e.disabled)continue;
  if(/^(BUTTON|A|INPUT|SELECT|TEXTAREA|SUMMARY|LABEL)$/.test(e.tagName))continue;
  const ti=e.getAttribute('tabindex');if(ti!==null&&+ti>=0&&(e.getAttribute('role')==='button'||e.getAttribute('role')==='link'||e.getAttribute('role')==='tab'))continue;
  if(e.closest('button,a[href],summary'))continue;
  bad.push(e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+'['+(e.dataset.a||e.dataset.pob||'onclick')+']'+(ti===null?' sans tabindex':' tabindex='+ti)+(e.getAttribute('role')?'':' sans role'));}
 return [...new Set(bad)];})()`;
// noms accessibles STRICTS : un champ doit avoir une vraie étiquette (aria-label/labelledby/label), pas un simple placeholder
const NAMES=`(()=>{${VIS}
 const txt=e=>(e.innerText||e.textContent||'').replace(/\\s+/g,' ').trim();
 const lbl=e=>{if((e.getAttribute('aria-label')||'').trim())return e.getAttribute('aria-label').trim();const lb=e.getAttribute('aria-labelledby');if(lb){const t=lb.split(/\\s+/).map(id=>{const x=document.getElementById(id);return x?txt(x):'';}).join(' ').trim();if(t)return t;}if(e.id){const l=document.querySelector('label[for="'+CSS.escape(e.id)+'"]');if(l&&txt(l))return txt(l);}const w=e.closest('label');if(w&&txt(w))return txt(w);return '';};
 const desc=e=>e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.dataset&&e.dataset.a?'[data-a="'+e.dataset.a+'"]':'')+(typeof e.className==='string'&&e.className?'.'+e.className.trim().split(/\\s+/).slice(0,2).join('.'):'');
 const bad=[];
 for(const e of document.querySelectorAll('button,a[href],input:not([type=hidden]),select,textarea,summary,[role=button],[tabindex="0"]')){if(!vis(e))continue;
  const aria=lbl(e),title=(e.getAttribute('title')||'').trim(),t=txt(e),field=/^(INPUT|SELECT|TEXTAREA)$/.test(e.tagName);
  if(field){if(!aria&&!title){bad.push((e.getAttribute('placeholder')?'champ à placeholder seul (pas d’étiquette) ':'champ sans étiquette ')+desc(e));}continue;}
  if(!aria&&!title&&!t){bad.push('sans nom '+desc(e));continue;}
  if(!aria&&!title&&!/[\\p{L}\\p{N}]/u.test(t))bad.push('bouton-icône sans aria-label « '+t.slice(0,6)+' » '+desc(e));}
 for(const e of document.querySelectorAll('[aria-labelledby]')){for(const id of e.getAttribute('aria-labelledby').split(/\\s+/))if(!document.getElementById(id))bad.push('aria-labelledby orphelin '+desc(e)+'→'+id);}
 for(const l of document.querySelectorAll('label[for]')){if(!document.getElementById(l.getAttribute('for')))bad.push('label for orphelin → '+l.getAttribute('for'));}
 const ids={};for(const e of document.querySelectorAll('[id]')){ids[e.id]=(ids[e.id]||0)+1;}for(const k in ids)if(ids[k]>1&&document.querySelector('label[for="'+CSS.escape(k)+'"]'))bad.push('id dupliqué #'+k);
 return [...new Set(bad)];})()`;
// aria-pressed / aria-expanded / aria-current cohérents avec l'état visuel (classe sel/on/active/current)
const ARIASTATE=`(()=>{${VIS}const bad=[];
 for(const e of document.querySelectorAll('[aria-pressed]')){if(!vis(e))continue;const v=e.getAttribute('aria-pressed');if(!/^(true|false|mixed)$/.test(v)){bad.push('aria-pressed invalide «'+v+'» '+e.className);continue;}
  const cls=/\\b(sel|on|active|selected|current)\\b/.test(e.className);const hasCls=/\\b(sel|on|active|selected)\\b/.test(e.className);
  if(hasCls&&v!=='true')bad.push('classe active mais aria-pressed='+v+' '+e.className);
  if(!hasCls&&v==='true'&&e.parentElement&&e.parentElement.querySelector('.sel,.on,.active,.selected'))bad.push('aria-pressed=true sans classe, alors qu’un frère est sélectionné '+e.className);}
 for(const e of document.querySelectorAll('[aria-expanded]')){if(!vis(e))continue;const v=e.getAttribute('aria-expanded');if(!/^(true|false)$/.test(v))bad.push('aria-expanded invalide «'+v+'»');}
 return bad;})()`;
const FOCUS_RING=`(()=>{const e=document.activeElement;if(!e||e===document.body)return null;const s=getComputedStyle(e);const r=e.getBoundingClientRect();
 let fixed=false;for(let x=e;x&&x.nodeType===1;x=x.parentElement)if(getComputedStyle(x).position==='fixed'){fixed=true;break;}
 if(e.__fi===undefined)e.__fi=(window.__fiN=(window.__fiN||0)+1);
 return {fi:e.__fi,id:e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.dataset&&e.dataset.a?'['+e.dataset.a+']':'')+(typeof e.className==='string'&&e.className?'.'+e.className.trim().split(/\\s+/)[0]:''),
  ring:(s.outlineStyle!=='none'&&parseFloat(s.outlineWidth)>0)||(!!s.boxShadow&&s.boxShadow!=='none'),fv:e.matches(':focus-visible'),top:r.top+scrollY,left:r.left,fixed,ti:e.tabIndex,tag:e.tagName,type:e.type||'',
  field:/^(INPUT|TEXTAREA|SELECT)$/.test(e.tagName)};})()`;
const FOCUSABLES=`(()=>{${VIS}return [...document.querySelectorAll('${FOCUSABLE_SEL}')].filter(e=>vis(e)&&!e.disabled&&e.tabIndex>=0&&!e.closest('[inert]')).map(e=>{if(e.__fi===undefined)e.__fi=(window.__fiN=(window.__fiN||0)+1);return {fi:e.__fi,d:e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.dataset&&e.dataset.a?'['+e.dataset.a+']':'')+(typeof e.className==='string'&&e.className?'.'+e.className.trim().split(/\\s+/)[0]:'')+'@'+Math.round(e.getBoundingClientRect().top+scrollY)};});})()`;
const POSTAB=`(()=>[...document.querySelectorAll('[tabindex]')].filter(e=>+e.getAttribute('tabindex')>0).map(e=>e.tagName+(e.id?'#'+e.id:'')))()`;
// Parcours Tab : renvoie {n, trap, noRing, jumps, unreached}
async function tabWalk(p,max=140){
 // point de départ de la navigation séquentielle = haut du document
 await p.evaluate(()=>{const a=document.activeElement;a&&a.blur&&a.blur();window.scrollTo(0,0);document.body.setAttribute('tabindex','-1');document.body.focus();document.body.removeAttribute('tabindex');});
 const want=await p.evaluate(FOCUSABLES);const seq=[];let first=null,trap=null,same=0,prev=null;
 for(let i=0;i<max;i++){await p.keyboard.press('Tab');const r=await p.evaluate(FOCUS_RING);if(!r){if(seq.length)break;continue;}
  const key=r.fi;
  if(first===null)first=key;else if(key===first&&prev!==first)break; // boucle complète
  // un champ date a 3 segments : Tab y reste 3 fois sur le même élément (comportement natif, pas un piège)
  if(key===prev){same++;if(same>=(r.type==='date'?4:2)){trap=r.id;break;}}else same=0;prev=key;if(key!==(seq[seq.length-1]||{}).key)seq.push({...r,key});}
 const seen=new Set(seq.map(x=>x.key));const unreached=want.filter(w=>!seen.has(w.fi)).map(w=>w.d);
 const noRing=seq.filter(s=>!s.ring&&!s.field).map(s=>s.id);
 const noFv=seq.filter(s=>!s.fv).map(s=>s.id);
 const jumps=[];let last=null;for(const s of seq){if(s.fixed){continue;}if(last&&s.top<last.top-300)jumps.push(`${last.id}(${Math.round(last.top)})→${s.id}(${Math.round(s.top)})`);last=s;}
 return {n:seq.length,want:want.length,trap,noRing:[...new Set(noRing)],noFv:[...new Set(noFv)],jumps,unreached};}

const AUDIT=`(()=>{const cv=document.createElement('canvas');cv.width=cv.height=1;const cx=cv.getContext('2d',{willReadFrequently:true});
 const px=c=>{cx.clearRect(0,0,1,1);cx.fillStyle='#000';cx.fillStyle=c;cx.fillRect(0,0,1,1);const d=cx.getImageData(0,0,1,1).data;return [d[0],d[1],d[2],d[3]/255];};
 const lum=c=>{const f=x=>{x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4);};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2]);};
 const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
 const over=(f,b)=>[f[0]*f[3]+b[0]*(1-f[3]),f[1]*f[3]+b[1]*(1-f[3]),f[2]*f[3]+b[2]*(1-f[3]),1];
 const toks=s=>s.match(/(rgba?\\([^)]*\\)|color\\([^)]*\\)|#[0-9a-f]{3,8})/gi)||[];
 const stack=(r,k)=>{const al=r[3]+k[3]*(1-r[3]);if(al<=0)return [0,0,0,0];return [(r[0]*r[3]+k[0]*k[3]*(1-r[3]))/al,(r[1]*r[3]+k[1]*k[3]*(1-r[3]))/al,(r[2]*r[3]+k[2]*k[3]*(1-r[3]))/al,al];};
 function bgs(el){let res=[[0,0,0,0]];
  for(let e=el;e&&e.nodeType===1;e=e.parentElement){const cs=getComputedStyle(e);const cands=[];const img=cs.backgroundImage;const c=px(cs.backgroundColor);
   if(img&&img!=='none'&&/gradient/.test(img)){for(const t of toks(img))cands.push(stack(px(t),c));}else if(c[3]>0)cands.push(c);
   if(!cands.length)continue;
   const out=[];for(const r of res){if(r[3]>=.99){out.push(r);continue;}for(const k of cands)out.push(stack(r,k));}
   res=out.slice(0,40);if(res.every(r=>r[3]>=.99))break;}
  return res.map(r=>r[3]>=.99?r:over(r,[255,255,255,1]));}
 const out=[];const app=document.getElementById('app')||document.body;
 const scope=[...app.querySelectorAll('*'),...document.querySelectorAll('#hometabs *')];
 for(const el of scope){const cs=getComputedStyle(el);if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity<.05)continue;
  const r=el.getBoundingClientRect();if(r.width<2||r.height<2)continue;if(el.closest('[aria-hidden="true"],[disabled],svg'))continue;
  const own=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();if(own.length<2)continue;
  let op=1;for(let e=el;e&&e.nodeType===1;e=e.parentElement){op*=+getComputedStyle(e).opacity;}if(op<.9)continue;
  const fg=px(cs.color);const size=parseFloat(cs.fontSize),bold=parseInt(cs.fontWeight)>=700,big=size>=24||(size>=18.66&&bold),need=big?3:4.5;
  const worst=Math.min(...bgs(el).map(b=>ratio(over(fg,b),b)));
  if(worst<need)out.push(el.tagName.toLowerCase()+'.'+String(el.className&&el.className.baseVal!==undefined?'':el.className).trim().split(/\\s+/)[0]+' « '+own.slice(0,24)+' » '+worst.toFixed(2)+'/'+need);}
 return out;})()`;

async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,1100)});
 const eng=(process.env.MQ_ENGINES||'chromium').split(',')[0].trim();const {srv,url}=await serve();const b=await launchEngine(eng);
 try{
  /* =============== P6 : onboarding (contexte vierge, PC 1024×800) =============== */
  {const {ctx,p,errs}=await freshContext(b,url,{w:1024,h:800});
   await p.waitForSelector('#pob-name');
   const nm=await edit(p,'#pob-name',['type:Lina','L','L','type:ïx','BS','HOME','type:M','END','type:z','wait']);
   T('Frappe réelle dans le prénom (#pob-name) : focus, texte et curseur stables, flèches/Retour arrière/Suppr au milieu',!nm.length,nm.join(' | '));
   const w1=await p.evaluate(()=>MQProfileOnboarding.state.name+'|'+document.getElementById('pob-name').value);
   T('Le prénom saisi au clavier est bien celui de l’état du formulaire',w1.split('|')[0]===w1.split('|')[1]&&w1.split('|')[0].length>2,w1);
   await p.click('[data-pob="gender"][data-value="girl"]');await p.click('[data-pob="next"]');
   await p.waitForSelector('#pob-birth');
   // date : saisie segment par segment (locale en-US : mm/jj/aaaa)
   const bd=[];await p.focus('#pob-birth');await p.evaluate(()=>{const e=document.getElementById('pob-birth');window.__mkEl=e;e.__mk=1;});
   const dchk=async lab=>{const r=await p.evaluate(()=>{const e=window.__mkEl;return {same:document.activeElement===e,conn:e.isConnected,v:e.value,st:MQProfileOnboarding.state.birthdate};});if(!r.conn)bd.push(lab+' : champ réécrit');else if(!r.same)bd.push(lab+' : focus perdu');return r;};
   const dayFirst=await p.evaluate(()=>new Intl.DateTimeFormat(navigator.language).formatToParts(new Date(2014,11,5)).filter(x=>x.type==='day'||x.type==='month')[0].type==='day');
   const seg=(d,m)=>dayFirst?d+m:m+d; // jour 05, mois 12 (ordre selon la langue du navigateur)
   for(const ch of seg('05','12')+'2014'){await p.keyboard.type(ch);await p.waitForTimeout(40);await dchk('chiffre '+ch);}
   let r=await dchk('date complète');if(r.v!=='2014-12-05'||r.st!=='2014-12-05')bd.push('valeur '+r.v+' / état '+r.st+' (jour d’abord : '+dayFirst+')');
   await p.keyboard.press('ArrowLeft');await p.keyboard.press('ArrowLeft');await p.keyboard.type('0');await p.keyboard.type('9');await p.waitForTimeout(60);r=await dchk('retour au 1er segment puis 09');
   if(r.v!==(dayFirst?'2014-12-09':'2014-09-05'))bd.push('retour au 1er segment : '+r.v);
   await p.keyboard.press('ArrowUp');await p.waitForTimeout(60);r=await dchk('flèche haut');if(r.v!==(dayFirst?'2014-01-09':'2014-09-06'))bd.push('flèche haut (segment suivant après 2 chiffres) : '+r.v);
   await p.keyboard.press('Backspace');await p.waitForTimeout(60);r=await dchk('Retour arrière segment');if(r.v!=='')bd.push('segment effacé devrait vider la valeur : '+r.v);
   await p.keyboard.type('11');await p.waitForTimeout(60);r=await dchk('re-saisie mois');
   await p.waitForTimeout(900);r=await dchk('repos 900 ms');
   T('Frappe réelle dans la date de naissance (#pob-birth) : champ jamais réécrit, focus conservé, segments, flèches, effacement',!bd.length,bd.join(' | '));
   await p.fill('#pob-birth','2014-12-05');
   T('Aucune erreur JavaScript (onboarding)',!errs.length,errs.join(' | '));
   await ctx.close();}

  /* =============== profil réel puis P6 sur les écrans de l'appli =============== */
  const {ctx,p,errs}=await freshContext(b,url,{w:1024,h:800});
  await wizard(p,{name:'Clavier',grade:'6e',stage:'college',birth:'2013-05-05',gender:'girl'});

  // exercice : un chapitre par type de réponse, y compris la dictée
  const plan=await p.evaluate(()=>{const got={};const want=['num','frac','text','multi'];
   for(const c of ALLCH){if(!WMAP[c.id]||typeof c.g!=='function')continue;for(let k=0;k<6;k++){let q;try{q=c.g(2);}catch(e){break;}if(!q)continue;
     if(q.type==='text'&&q.audio&&/dict/i.test((c.name||'')+c.id)&&!got.dictee){got.dictee=c.id;}
     if(want.includes(q.type)&&!got[q.type]&&!(q.type==='text'&&q.audio))got[q.type]=c.id;}
    if(got.dictee&&want.every(t=>got[t]))break;}
   if(!got.dictee){for(const c of ALLCH){if(!WMAP[c.id]||typeof c.g!=='function')continue;for(let k=0;k<6;k++){let q;try{q=c.g(2);}catch(e){break;}if(q&&q.type==='text'&&q.audio){got.dictee=c.id;break;}}if(got.dictee)break;}}
   return got;});
  const startQ=async(cid,type,audio)=>p.evaluate(({cid,type,audio})=>{home();startMission([cid]);for(let k=0;k<300&&!(M.q.type===type&&(!audio||M.q.audio)&&!(type==='text'&&!audio&&M.q.audio));k++)M.q=CHMAP[cid].g([M.d,1,2,3][k%4]);renderQ();return M.q.type+(document.getElementById('in0')?'':' SANS #in0');},{cid,type,audio});
  for(const [kind,cid] of Object.entries(plan)){
   const type=kind==='dictee'?'text':kind;const sq=await startQ(cid,type,kind==='dictee');
   const fld=type==='multi'?'#in0':'#in0';
   const ops=type==='text'||type==='frac'?TEXT_OPS:NUM_OPS;
   const bad=await edit(p,fld,ops,{cursor:type!=='num'?true:true});
   if(type==='multi'){await p.keyboard.press('Tab');const m=await edit(p,'#in1',NUM_OPS);bad.push(...m);}
   T(`Réponse en exercice, type « ${kind} » (#in0${type==='multi'?', #in1':''}) : focus, texte et curseur stables à la frappe réelle`,!bad.length,bad.join(' | ')+(bad.length?' ['+cid+' '+sq+']':''));}
  T('Types de réponse trouvés pour l’exercice (num, frac, text, multi, dictée)',['num','frac','text','multi','dictee'].every(k=>plan[k]),JSON.stringify(plan));

  // lecture seule : Entrée dans la réponse ne détruit pas le champ avant validation (rien à valider si vide)
  // devoirs parent
  await p.evaluate(()=>{PARENT=true;parentScreen('suivi');});await p.waitForSelector('#hw-title');
  const hwT=await edit(p,'#hw-title',TEXT_OPS);T('Devoirs parent : titre (#hw-title) à la frappe réelle',!hwT.length,hwT.join(' | '));
  const hwN=await edit(p,'#hw-note',TEXT_OPS);T('Devoirs parent : consigne (#hw-note, textarea) à la frappe réelle',!hwN.length,hwN.join(' | '));
  await p.focus('#hw-due');await p.evaluate(()=>{const e=document.getElementById('hw-due');window.__mkEl=e;});
  const dayFirst2=await p.evaluate(()=>new Intl.DateTimeFormat(navigator.language).formatToParts(new Date(2014,11,5)).filter(x=>x.type==='day'||x.type==='month')[0].type==='day');
  for(const ch of (dayFirst2?'1503':'0315')+'2027'){await p.keyboard.type(ch);await p.waitForTimeout(30);}
  const due=await p.evaluate(()=>({same:document.activeElement===window.__mkEl,conn:window.__mkEl.isConnected,v:window.__mkEl.value}));
  T('Devoirs parent : échéance (#hw-due) tapée au clavier, champ conservé',due.same&&due.conn&&due.v==='2027-03-15',JSON.stringify(due));
  const keep=await p.evaluate(()=>[document.getElementById('hw-title').value.length,document.getElementById('hw-note').value.length]);
  T('Devoirs parent : les 3 champs gardent leur contenu après la saisie des autres',keep[0]>5&&keep[1]>5,JSON.stringify(keep));
  // réglages parent
  await p.evaluate(()=>{parentScreen('reglages');});await p.waitForSelector('#np');
  const np=await edit(p,'#np',['type:1234','L','L','type:9','BS','END','type:5','wait']);T('Réglages parent : nouveau code (#np, mot de passe) à la frappe réelle',!np.length,np.join(' | '));
  const ru=await p.evaluate(()=>[...document.querySelectorAll('[id^="ru_"]')].map(e=>'#'+e.id).slice(0,2));
  let ruBad=[];for(const s of ru){ruBad.push(...await edit(p,s,['END','type:7','BS','type:12','wait'],{cursor:false,wait:300}));}
  T('Réglages parent : barème de bons points (champs numériques) à la frappe réelle',ru.length&&!ruBad.length,ruBad.join(' | '));
  // récompenses
  await p.evaluate(()=>{parentScreen('recomp');});await p.waitForSelector('#br');
  const br=await edit(p,'#br',TEXT_OPS);T('Récompenses parent : raison du bonus (#br) à la frappe réelle',!br.length,br.join(' | '));
  const bn=await edit(p,'#bn',['END','BS','BS','BS','type:25','wait'],{cursor:false,wait:300});T('Récompenses parent : nombre de points (#bn) à la frappe réelle',!bn.length,bn.join(' | '));
  const rw=await edit(p,'#rwl .rw input.grow',TEXT_OPS);T('Récompenses parent : nom d’une récompense à la frappe réelle',!rw.length,rw.join(' | '));
  // import
  await p.evaluate(()=>{parentScreen('reglages');});await p.click('[data-a="impshow"]');await p.waitForSelector('#imp');
  const im=await edit(p,'#imp',TEXT_OPS);T('Import : zone de code (#imp, textarea) à la frappe réelle, focus donné à l’ouverture',!im.length,im.join(' | '));
  // code PIN : création (deux champs) puis déverrouillage
  await p.evaluate(()=>{S.pin='';PARENT=false;parentGate();});await p.waitForSelector('#pin');
  const foc=await p.evaluate(()=>document.activeElement&&document.activeElement.id);
  const pin=await edit(p,'#pin',['type:1234','L','BS','type:7','END','wait']);
  const pin2=await edit(p,'#pin2',['type:4821','wait'],{wait:300});
  T('Code parent : saisie du code (#pin, #pin2) à la frappe réelle, focus initial dans #pin',foc==='pin'&&!pin.length&&!pin2.length,[foc,...pin,...pin2].join(' | '));
  // Finot, bibliothèque, atlas
  await p.evaluate(()=>{PARENT=false;home();finotOpen();});await p.waitForSelector('#finotin');
  const fin=await edit(p,'#finotin',TEXT_OPS);T('Finot : zone de question (#finotin) à la frappe réelle',!fin.length,fin.join(' | '));
  await p.evaluate(()=>{finotClose();ACT.library();});await p.waitForSelector('#libq');
  const lq=await edit(p,'#libq',['type:frac','L','type:i','BS','HOME','type:a','BS','wait'],{wait:400});T('Bibliothèque : recherche (#libq) – la liste se met à jour sans réécrire le champ',!lq.length,lq.join(' | '));
  await p.evaluate(()=>{ACT.atlas();});await p.waitForSelector('#atlq');
  const aq=await edit(p,'#atlq',['type:rome','L','type:i','BS','HOME','type:a','BS','wait'],{wait:400});T('Atlas : recherche (#atlq) – la liste se met à jour sans réécrire le champ',!aq.length,aq.join(' | '));
  // devoirs de profil: sélecteur de classe (select) : changement au clavier ne casse pas le focus
  T('Aucune erreur JavaScript (P6)',!errs.length,errs.slice(0,3).join(' | '));

  /* =============== P7 : Tab, focus visible, noms, états, clics non focusables =============== */
  const screens={
   'accueil':`(()=>{PARENT=false;home();ACT.hometab('accueil');})()`,
   'matières':`(()=>{PARENT=false;home();ACT.hometab('matieres');})()`,
   'progrès':`(()=>{PARENT=false;home();ACT.hometab('progres');})()`,
   'plus':`(()=>{PARENT=false;home();ACT.hometab('plus');})()`,
   'exercice choix':`(()=>{PARENT=false;home();const c=SCH(S.subj).find(c=>WMAP[c.id]).id;startMission([c]);for(let k=0;k<40&&M.q.type!=='choice';k++)M.q=CHMAP[c].g(M.d);renderQ();})()`,
   'exercice saisie':`(()=>{PARENT=false;home();startMission(['${plan.num||plan.text}']);renderQ();})()`,
   'parent suivi + devoirs':`(()=>{PARENT=true;parentScreen('suivi');})()`,
   'parent programme':`(()=>{PARENT=true;parentScreen('programme');})()`,
   'parent récompenses':`(()=>{PARENT=true;parentScreen('recomp');})()`,
   'parent réglages':`(()=>{PARENT=true;parentScreen('reglages');})()`,
   'carnet d’erreurs':`(()=>{PARENT=false;home();const c=SCH(S.subj).find(c=>WMAP[c.id]).id;MQAdaptive.recordMistake(S,c,{q:'2+2 ?',answer:'4',expl:'deux et deux font quatre'});save();ACT.mistakes();})()`,
   'cours / leçon':`(()=>{PARENT=false;home();const id=reco().id;openLesson(id);})()`,
   'code parent (création)':`(()=>{S.pin='';PARENT=false;L=null;parentGate();})()`,
   'code parent (déverrouillage)':`(()=>{S.pin='4821';PARENT=false;L=null;parentGate();})()`,
   'code oublié':`(()=>{PARENT=false;L=null;forgotScreen();})()`,
   'import':`(()=>{PARENT=true;parentScreen('reglages');ACT.impshow();})()`,
   'bibliothèque':`(()=>{PARENT=false;L=null;home();ACT.library();})()`,
   'atlas':`(()=>{PARENT=false;L=null;home();ACT.atlas();})()`,
   'Finot ouvert':`(()=>{PARENT=false;L=null;home();finotOpen();})()`};
  const walkRes={};const nameRes={};const nfRes={};const stRes={};const posTab=[];
  const clean=`(()=>{try{if(M){clearInterval(M.tick);clearTimeout(M.tid);}}catch(e){}})()`;
  for(const [label,fn] of Object.entries(screens)){await p.evaluate(fn).catch(e=>{walkRes[label]={err:String(e).slice(0,120)};});await p.waitForTimeout(120);
   if(walkRes[label])continue;
   const w=await tabWalk(p);walkRes[label]=w;
   const n=await p.evaluate(NAMES);if(n.length)nameRes[label]=n;
   const nf=await p.evaluate(NONFOCUS);if(nf.length)nfRes[label]=nf;
   const as=await p.evaluate(ARIASTATE);if(as.length)stRes[label]=as;
   const pt=await p.evaluate(POSTAB);if(pt.length)posTab.push(label+':'+pt.join(','));}
  const fmt=(o,pick)=>Object.entries(o).filter(([k,v])=>pick(v)).map(([k,v])=>k+' → '+pick(v)).join(' || ');
  T('Tab parcourt chaque écran sans piège clavier (la boucle revient au premier contrôle)',Object.values(walkRes).every(w=>!w.err&&!w.trap&&w.n>0),fmt(walkRes,w=>w.err||w.trap||(w.n?'':'aucun focus')));
  T('Tab atteint tous les contrôles interactifs visibles (aucun contrôle ignoré)',Object.values(walkRes).every(w=>!w.unreached||!w.unreached.length),fmt(walkRes,w=>w.unreached&&w.unreached.length?w.unreached.slice(0,6).join(', '):''));
  T('Ordre de tabulation cohérent : aucun tabindex positif, aucun saut en arrière de plus de 300 px (hors éléments fixes)',!posTab.length&&Object.values(walkRes).every(w=>!w.jumps||!w.jumps.length),posTab.join(' ; ')+' '+fmt(walkRes,w=>w.jumps&&w.jumps.length?w.jumps.slice(0,3).join(' ; '):''));
  T('Focus visible (contour ou ombre non nul) sur tout contrôle atteint au clavier',Object.values(walkRes).every(w=>!w.noRing||!w.noRing.length),fmt(walkRes,w=>w.noRing&&w.noRing.length?w.noRing.slice(0,6).join(', '):''));
  T('Nom accessible STRICT : boutons, liens, bouton-icônes nommés ; chaque champ a une vraie étiquette (pas de placeholder seul)',!Object.keys(nameRes).length,fmt(nameRes,v=>v.slice(0,6).join(' ; ')));
  T('Aucun élément cliquable (data-a / data-pob / onclick) hors bouton/lien/champ sans tabindex+role',!Object.keys(nfRes).length,fmt(nfRes,v=>v.slice(0,6).join(' ; ')));
  T('aria-pressed / aria-expanded valides et cohérents avec l’état visuel (classe sélectionnée) sur chaque écran',!Object.keys(stRes).length,fmt(stRes,v=>v.slice(0,5).join(' ; ')));

  // Bascules : l'attribut ARIA change réellement avec l'état après un vrai clic / une vraie touche
  const tg=[];
  await p.evaluate(()=>{try{finotClose();}catch(e){}PARENT=true;parentScreen('reglages');});
  if(await p.locator('[data-a="finotvoice"]').count()){
   const a0=await p.evaluate(()=>document.querySelector('[data-a="finotvoice"]').getAttribute('aria-pressed')+'|'+(S.finotVoice!==false));
   await p.focus('[data-a="finotvoice"]');await p.keyboard.press('Enter');await p.waitForTimeout(80);
   const a1=await p.evaluate(()=>{const e=document.querySelector('[data-a="finotvoice"]');return e.getAttribute('aria-pressed')+'|'+(S.finotVoice!==false)+'|'+(document.activeElement===e);});
   const [pa,sv]=a1.split('|');if(pa!==sv)tg.push('finotvoice aria-pressed='+pa+' ≠ état '+sv);if(a0.split('|')[0]===pa)tg.push('finotvoice : aria-pressed inchangé après Entrée');}
  await p.evaluate(()=>{PARENT=false;home();const c=SCH(S.subj).find(c=>WMAP[c.id]).id;startMission([c]);for(let k=0;k<40&&M.q.type!=='choice';k++)M.q=CHMAP[c].g(M.d);renderQ();});
  if(await p.locator('[data-a="whyactivity"]').count()){
   await p.focus('[data-a="whyactivity"]');await p.keyboard.press('Enter');await p.waitForTimeout(80);
   const e1=await p.evaluate(()=>({x:document.querySelector('[data-a="whyactivity"]').getAttribute('aria-expanded'),open:!!document.querySelector('.mq-why-card')}));
   await p.keyboard.press('Enter');await p.waitForTimeout(80);
   const e2=await p.evaluate(()=>({x:document.querySelector('[data-a="whyactivity"]').getAttribute('aria-expanded'),open:!!document.querySelector('.mq-why-card')}));
   if(e1.x!==String(e1.open))tg.push('Pourquoi ? aria-expanded='+e1.x+' panneau='+e1.open);if(e2.x!==String(e2.open))tg.push('Pourquoi ? 2e clic aria-expanded='+e2.x+' panneau='+e2.open);if(e1.open===e2.open)tg.push('Pourquoi ? ne bascule pas');}
  else tg.push('bouton « Pourquoi ? » absent de l’exercice');
  // assistant : un clic sur un choix met à jour aria-pressed (et un seul reste à true)
  {const {ctx:c2,p:q}=await freshContext(b,url,{w:1024,h:800});await q.waitForSelector('.pob-shell');
   await q.click('[data-pob="gender"][data-value="boy"]');
   const g=await q.evaluate(()=>[...document.querySelectorAll('[data-pob="gender"]')].map(e=>e.dataset.value+'='+e.getAttribute('aria-pressed')+'/'+e.classList.contains('sel')));
   if(g.join()!=='girl=false/false,boy=true/true')tg.push('assistant genre : '+g.join());
   await q.focus('[data-pob="gender"][data-value="girl"]');await q.keyboard.press('Space');
   const g2=await q.evaluate(()=>[...document.querySelectorAll('[data-pob="gender"]')].map(e=>e.dataset.value+'='+e.getAttribute('aria-pressed')));
   if(g2.join()!=='girl=true,boy=false')tg.push('assistant genre au clavier : '+g2.join());
   const aria=await q.evaluate(ARIASTATE);if(aria.length)tg.push(...aria);
   // contraste + noms + non focusables de chaque étape de l'assistant
   const wiz={names:[],nf:[],walk:[]};
   await q.fill('#pob-name','Test');await q.click('[data-pob="next"]');
   for(let step=1;step<=6;step++){
    if(step===1){}else if(step===2){await q.click('[data-pob="stage"][data-value="college"]');await q.click('[data-pob="grade"][data-value="6e"]');}
    else if(step===4){await q.click('[data-pob="level"][data-value="ok"]');await q.click('[data-pob="confidence"][data-value="medium"]');await q.click('[data-pob="help"][data-value="try"]');}
    else if(step===5){await q.click('[data-pob="goal"][data-value="understand"]');await q.click('[data-pob="pace"][data-value="balanced"]');}
    const nn=await q.evaluate(NAMES);if(nn.length)wiz.names.push('étape '+step+': '+nn.slice(0,3).join(' ; '));
    const nf=await q.evaluate(NONFOCUS);if(nf.length)wiz.nf.push('étape '+step+': '+nf.slice(0,3).join(' ; '));
    const w=await tabWalk(q,60);if(w.trap||w.noRing.length||w.unreached.length)wiz.walk.push('étape '+step+': '+JSON.stringify({trap:w.trap,noRing:w.noRing.slice(0,3),unreached:w.unreached.slice(0,3)}));
    if(step<6)await q.click('[data-pob="next"]');}
   if(wiz.names.length)tg.push('noms assistant : '+wiz.names.join(' | '));if(wiz.nf.length)tg.push('non focusables assistant : '+wiz.nf.join(' | '));if(wiz.walk.length)tg.push('Tab assistant : '+wiz.walk.join(' | '));
   await c2.close();}
  T('Bascules et assistant : aria-pressed / aria-expanded changent avec l’état (clic, Entrée, Espace), noms/Tab/focus corrects sur les 7 étapes de l’assistant',!tg.length,tg.join(' | '));

  // Échap ferme les fenêtres, pas de piège
  const esc=[];
  await p.evaluate(()=>{PARENT=false;if(M){clearInterval(M.tick);clearTimeout(M.tid);M=null;}home();finotOpen();});await p.waitForTimeout(150);
  await p.keyboard.press('Escape');await p.waitForTimeout(150);
  if(await p.evaluate(()=>!!document.querySelector('#finotchat.open')))esc.push('Finot ne se ferme pas avec Échap');
  await p.evaluate(()=>{home();});
  const cel=await p.evaluate(()=>{try{const n=new Date();S.birthdate='2015-'+String(n.getMonth()+1).padStart(2,'0')+'-'+String(n.getDate()).padStart(2,'0');S.lastBirthdayYear=0;save();checkBirthday();}catch(e){return 'err '+e;}return 'ok';});
  await p.waitForTimeout(700);
  if(await p.evaluate(()=>!!document.getElementById('celeb')?.classList.contains('show'))){await p.keyboard.press('Escape');await p.waitForTimeout(150);if(await p.evaluate(()=>document.getElementById('celeb').classList.contains('show')))esc.push('la célébration ne se ferme pas avec Échap');}
  await p.evaluate(()=>{home();const c=SCH(S.subj).find(c=>WMAP[c.id]).id;startMission([c]);renderQ();});
  const padBtn=await p.locator('[data-a="padtoggle"]').count();
  if(padBtn){await p.click('[data-a="padtoggle"]');await p.waitForTimeout(150);const open=await p.evaluate(()=>!!PAD.open);
   if(open){await p.keyboard.press('Escape');await p.waitForTimeout(150);if(await p.evaluate(()=>!!PAD.open))esc.push('le brouillon ne se ferme pas avec Échap');}}
  // dialogue Finot : le focus reste piégeable ? Tab dans le chat ne doit pas rester bloqué sur un seul contrôle
  await p.evaluate(()=>{if(M){clearInterval(M.tick);clearTimeout(M.tid);M=null;}home();finotOpen();});await p.waitForTimeout(150);
  const seqC=[];for(let i=0;i<12;i++){await p.keyboard.press('Tab');seqC.push(await p.evaluate(()=>document.activeElement&&(document.activeElement.id||document.activeElement.dataset.a||document.activeElement.tagName)));}
  if(new Set(seqC).size<2)esc.push('Tab dans Finot ne bouge pas : '+seqC.join(','));
  await p.evaluate(()=>finotClose());
  T('Échap ferme Finot, la célébration et le brouillon ; Tab circule dans la fenêtre Finot (pas de piège)',!esc.length,esc.join(' | ')+' célébration:'+cel+' brouillon:'+(padBtn?'testé':'bouton absent'));
  T('Aucune erreur JavaScript (P7)',!errs.length,errs.slice(0,3).join(' | '));
  await ctx.close();

  /* =============== P7 : contraste des écrans non couverts, clair et sombre =============== */
  const PROFS=[['CM2','CM2'],['4e','4e']];
  for(const scheme of ['light','dark']){const bad=[];
   // assistant d'inscription (7 étapes) sur un contexte vierge
   {const {ctx:c3,p:q}=await freshContext(b,url,{w:390,h:844,scheme});await q.waitForSelector('.pob-shell');
    const chk=async lab=>{await q.waitForTimeout(60);for(const x of await q.evaluate(AUDIT))bad.push('assistant/'+lab+': '+x);};
    await chk('étape 1');await q.fill('#pob-name','Lou');await q.click('[data-pob="gender"][data-value="girl"]');await chk('étape 1 remplie');await q.click('[data-pob="next"]');
    await q.fill('#pob-birth','2014-03-02');await chk('étape 2');await q.click('[data-pob="next"]');
    await q.click('[data-pob="stage"][data-value="college"]');await q.click('[data-pob="grade"][data-value="6e"]');await chk('étape 3');await q.click('[data-pob="next"]');
    await chk('étape 4');await q.click('[data-pob="next"]');
    await q.click('[data-pob="level"][data-value="ok"]');await q.click('[data-pob="confidence"][data-value="medium"]');await q.click('[data-pob="help"][data-value="try"]');await chk('étape 5');await q.click('[data-pob="next"]');
    await q.click('[data-pob="goal"][data-value="understand"]');await q.click('[data-pob="pace"][data-value="balanced"]');await chk('étape 6');await q.click('[data-pob="next"]');await chk('étape 7');
    await c3.close();}
   for(const [pn,grade] of PROFS){const {ctx:c4,p:q}=await freshContext(b,url,{w:390,h:844,scheme});
    await seedProfile(q,'Lou',grade);
    const chk=async lab=>{await q.waitForTimeout(80);for(const x of await q.evaluate(AUDIT))bad.push(`${pn}/${lab}: ${x}`);};
    await q.evaluate(()=>{const c=SCH(S.subj).find(c=>WMAP[c.id]).id;MQAdaptive.recordMistake(S,c,{q:'2+2 ?',answer:'4',expl:'deux et deux font quatre'});S.homework=[{id:'h1',title:'Devoir test',subject:'p-maths',due:'',note:'une note',status:'claimed',createdAt:1,claimedAt:2,validatedAt:0,rewardedAt:0,rewardDay:'',reward:null},{id:'h2',title:'Autre',subject:'',due:'',note:'',status:'todo',createdAt:3,claimedAt:0,validatedAt:0,rewardedAt:0,rewardDay:'',reward:null}];S.merit.req=[];save();});
    await q.evaluate(()=>{PARENT=true;parentScreen('suivi');});await chk('parent suivi + devoirs');
    await q.evaluate(()=>{PARENT=true;parentScreen('programme');});await chk('parent programme');
    await q.evaluate(()=>{PARENT=true;parentScreen('recomp');});await chk('parent récompenses');
    await q.evaluate(()=>{PARENT=true;parentScreen('reglages');});await chk('parent réglages');
    await q.click('[data-a="impshow"]').catch(()=>{});await chk('parent réglages + import');
    await q.evaluate(()=>{S.pin='';PARENT=false;parentGate();});await chk('code parent (création)');
    await q.evaluate(()=>{PARENT=false;home();ACT.mistakes();});await chk('carnet d’erreurs');
    await q.evaluate(()=>{const id=reco().id;openLesson(id);});await chk('cours : étape 1');
    for(let i=1;i<6;i++){const more=await q.evaluate(()=>{if(typeof L==='undefined'||!L)return false;if(L.i>=L.steps.length-1)return false;L.i++;renderLesson();return true;});if(!more)break;await chk('cours : étape '+(i+1)+' ('+await q.evaluate(()=>L&&L.steps[L.i]&&L.steps[L.i].k)+')');}
    await q.evaluate(()=>{L=null;PARENT=false;home();finotOpen();});await q.waitForTimeout(250);await chk('Finot ouvert');
    await q.evaluate(()=>{finotClose();ACT.library();});await chk('bibliothèque');
    await q.evaluate(()=>{ACT.atlas();});await chk('atlas');
    await c4.close();}
   const uniq=[...new Set(bad)];
   T(`Contraste ≥ 4,5 (3 gros texte), thème ${scheme==='dark'?'sombre':'clair'} : assistant 7 étapes, parent ×4 + devoirs + import, code parent, carnet d’erreurs, cours, Finot, bibliothèque, atlas`,!uniq.length,`${uniq.length} problème(s) : `+uniq.slice(0,14).join(' | '));}
 } finally { await b.close();srv.close(); }
 return R;}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
