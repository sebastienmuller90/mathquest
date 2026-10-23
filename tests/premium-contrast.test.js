/* Contraste réel de l'interface premium (23/10/2026), clair ET sombre, 3 profils (CP, CM2, 4e), téléphone 390×844.
   Chaque texte visible est mesuré par le navigateur : couleur calculée contre fond effectif (fonds semi-transparents composités,
   dégradés pris dans le pire cas). Seuil WCAG AA : 4,5 (3 pour les gros textes : ≥ 24 px, ou ≥ 18,66 px en gras).
   Écrans : accueil et ses 4 onglets, monde et chapitres, fiche, choix du niveau, boutique, badges, question avant/après
   réponse, fin de séance avec montée de niveau. Les symboles ✓ / ✕ des réponses sont mesurés à part (seuil 3).
   Les éléments désactivés (disabled) et les décorations aria-hidden sont ignorés. */
const {serve,launch,seedProfile}=require('./lib');
const PROFS=[['CP','CP'],['CM2','CM2'],['4e','4e']];
const AUDIT=`(()=>{const cv=document.createElement('canvas');cv.width=cv.height=1;const cx=cv.getContext('2d',{willReadFrequently:true});
 const px=c=>{cx.clearRect(0,0,1,1);cx.fillStyle='#000';cx.fillStyle=c;cx.fillRect(0,0,1,1);const d=cx.getImageData(0,0,1,1).data;return [d[0],d[1],d[2],d[3]/255];};
 const lum=c=>{const f=x=>{x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4);};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2]);};
 const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
 const over=(f,b)=>[f[0]*f[3]+b[0]*(1-f[3]),f[1]*f[3]+b[1]*(1-f[3]),f[2]*f[3]+b[2]*(1-f[3]),1];
 const toks=s=>s.match(/(rgba?\\([^)]*\\)|color\\([^)]*\\)|#[0-9a-f]{3,8})/gi)||[];
 // fonds possibles (une liste, pour couvrir les dégradés) en remontant jusqu'à un fond opaque
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
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,900)});
 const {srv,url}=await serve();const b=await launch();const errs=[];
 for(const scheme of ['light','dark']){const bad=[];
  for(const [pn,grade] of PROFS){const ctx=await b.newContext({viewport:{width:390,height:844},colorScheme:scheme});
   await ctx.addInitScript(()=>{try{sessionStorage.setItem('fa_splash_shown','1');}catch(e){}});
   const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
   await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
   await seedProfile(p,'Lou',grade);
   const check=async label=>{await p.waitForTimeout(60);const r=await p.evaluate(AUDIT);for(const x of r)bad.push(`${pn}/${label}: ${x}`);};
   for(const tab of ['accueil','matieres','progres','plus']){await p.evaluate(k=>ACT.hometab(k),tab);await check(tab);}
   const ids=await p.evaluate(()=>{const w=WALL.find(x=>x.lvl===S.grade&&WCH[x.id]&&WCH[x.id].length);return {w:w.id,c:WCH[w.id][1].id};});
   await p.evaluate(i=>ACT.world(i.w),ids);await check('monde');
   await p.evaluate(i=>ACT.chap(i.c),ids);await check('fiche');
   await p.evaluate(i=>ACT.start(i.c),ids);await check('niveau');
   await p.evaluate(()=>ACT.shop());await check('boutique');
   await p.evaluate(()=>ACT.badges());await check('badges');
   // question, puis retour après réponse
   const cids=await p.evaluate(()=>SCH(S.subj).filter(c=>WMAP[c.id]&&WMAP[c.id].lvl===S.grade).map(c=>c.id));
   let done=false;for(const id of cids){if(done)break;await p.evaluate(id=>{ACT.start(id);ACT.startlevel(id+'|2');},id);await p.waitForTimeout(60);
    if(await p.locator('.choice').count()){await check('question');await p.locator('.choice').first().click();await p.waitForTimeout(80);await check('retour');
     const ic=await p.evaluate(()=>{const px=(()=>{const cv=document.createElement('canvas');cv.width=cv.height=1;const cx=cv.getContext('2d',{willReadFrequently:true});return c=>{cx.clearRect(0,0,1,1);cx.fillStyle=c;cx.fillRect(0,0,1,1);const d=cx.getImageData(0,0,1,1).data;return [d[0],d[1],d[2]];};})();
      const lum=c=>{const f=x=>{x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4);};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2]);};
      return ['.choice.good','.choice.bad'].map(s=>{const e=document.querySelector(s);if(!e)return null;const cs=getComputedStyle(e,'::after');const a=lum(px(cs.color)),c=lum(px(cs.backgroundColor));return +((Math.max(a,c)+.05)/(Math.min(a,c)+.05)).toFixed(2);});});
     ic.forEach((v,i)=>{if(v!==null&&v<3)bad.push(`${pn}: symbole ${i?'✕':'✓'} ${v}/3`);});done=true;}}
   await p.evaluate(()=>{const c=SCH(S.subj)[0].id;ACT.startlevel(c+'|2');M.i=M.n;M.ok=M.n;M.xp=60;M.coins=10;M.L0=Math.max(1,lvl(S.xp)-1);endMission();});await check('fin');
   await ctx.close();}
  const uniq=[...new Set(bad)];
  T(`Texte lisible partout (≥ 4,5 ; 3 pour les gros textes), thème ${scheme==='dark'?'sombre':'clair'}, 3 profils × 12 écrans`,!uniq.length,`${uniq.length} problème(s) : `+uniq.slice(0,12).join(' | '));}
 T('Aucune erreur JavaScript',!errs.length,errs.slice(0,3).join(' | '));
 await b.close();srv.close();return R;}
require('./lib').main(run);
