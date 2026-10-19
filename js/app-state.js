/* ===== Synchronisation Supabase ===== */
const CONFIG={url:'https://nctmxxixugoxairmtjsa.supabase.co',key:'sb_publishable_ngN_Y9VsRuThBwS_pazV-A_0_hfbFWd'};
async function rpc(fn,args){const r=await fetch(`${CONFIG.url}/rest/v1/rpc/${fn}`,{method:'POST',headers:{apikey:CONFIG.key,'Content-Type':'application/json'},body:JSON.stringify(args)});const t=await r.text();if(!r.ok)throw new Error(t||('HTTP '+r.status));return t?JSON.parse(t):null;}
function rndCode(n=28){const A='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789',b=new Uint32Array(n);crypto.getRandomValues(b);return [...b].map(x=>A[x%A.length]).join('');}

/* ===== Données du jeu ===== */
const KEY='mathquest_v1',PROFILES_KEY='mathquest_profiles_v2',DEFAULT_GOAL=20;
const byId=id=>CHMAP[id];
const curS=()=>SUBMAP[S.subj]||SUBJECTS[0],WS=()=>curS().worlds,SCH=sid=>SUBJECT_CHAPTERS[sid]||[];
const AVATARS=[['🦊',0],['🐱',0],['🐼',0],['🐸',30],['🐧',30],['🦉',40],['🐬',50],['🦋',50],['🐙',60],['🦁',80],['🐺',80],['🦄',100],['🦖',120],['🐉',150],['🤖',150],['👾',180],['🧚',200],['🧙‍♀️',250]];
const THEMES=[['finot','Finot','#ff8a3d',0],['ocean','Océan','#0284c7',60],['corail','Corail','#e11d48',60],['menthe','Menthe','#059669',80],['soleil','Soleil','#d97706',80],['nuit','Nuit étoilée','#4f46e5',120],['bonbon','Bonbon','#db2777',120]];
const TITLES=['Novice','As du calcul','Stratège','Prodige','Virtuose','Génie','Légende','Mythe'];
const PRAISE=['Bravo !','Génial !','Excellent !','Parfait !','Yes !','Incroyable !','Bien joué !','Waouh !','Trop fort !'];
const PAUSES=['Fais 10 sauts sur place 🦘','Bois un grand verre d’eau 💧','Étire-toi comme un chat 🐱','Regarde au loin par la fenêtre 🌤️','Danse sur une chanson 🎵'];
const lvl=xp=>Math.floor(Math.sqrt(xp/150))+1,title=L=>TITLES[Math.min(TITLES.length-1,Math.floor((L-1)/2))];
const worldStars=w=>WCH[w].reduce((s,c)=>s+(S.chap[c.id]?.stars||0),0);
const BADGES=[
 ['first','👣','Premier pas','1re bonne réponse',s=>s.totalOk>=1],
 ['c5','🔥','En feu','Combo de 5',s=>s.bestCombo>=5],
 ['c10','☄️','Inarrêtable','Combo de 10',s=>s.bestCombo>=10],
 ['perfect','⭐','Sans faute','Une mission 3 étoiles',s=>Object.values(s.chap).some(c=>c.stars>=3)],
 ['ok50','🎯','Dans le mille','50 bonnes réponses',s=>s.totalOk>=50],
 ['ok200','💯','Machine à calculer','200 bonnes réponses',s=>s.totalOk>=200],
 ['ok500','🏅','Légendaire','500 bonnes réponses',s=>s.totalOk>=500],
 ['d3','📅','Rituel','3 jours d’affilée',s=>s.streak.best>=3],
 ['d7','🗓️','Semaine de feu','7 jours d’affilée',s=>s.streak.best>=7],
 ['fl10','⚡','Éclair','10 au défi éclair',s=>s.flashBest>=10],
 ['fl20','🌩️','Foudre','20 au défi éclair',s=>s.flashBest>=20],
 ['l5','🚀','Décollage','Niveau 5',s=>lvl(s.xp)>=5],
 ['l10','🌟','Étoile montante','Niveau 10',s=>lvl(s.xp)>=10],
 ['shop','🛍️','Styliste','Premier achat',s=>s.bought>0],
 ['goal','🎁','Parcours terminé','Premier parcours du jour terminé',s=>s.goalsDone>0],
 ['les1','📖','Première leçon','1 cours terminé',s=>Object.keys(s.lessons||{}).length>=1],
 ['les10','📚','Rat de bibliothèque','10 cours terminés',s=>Object.keys(s.lessons||{}).length>=10],
 ['les40','🎓','Encyclopédie','Les 40 cours terminés',s=>Object.keys(s.lessons||{}).length>=40],
 ...WALL.map(w=>['w'+w.id,w.emoji,w.name,'1 étoile partout : '+sOf(w.id).name+' '+w.lvl,s=>WCH[w.id].every(c=>(s.chap[c.id]?.stars||0)>=1)])];

/* ===== État et sauvegarde ===== */
const DEF={name:'',avatar:'🦊',grade:'6e',birthdate:'',lastBirthdayYear:0,dailyGoal:20,recent:{},vocab:{},mastery:{},review:{},mistakes:{},confidence:{},adaptive:{answers:0,adaptations:0},readingMastery:{},readingProgress:{},path:null,pathHist:[],xp:0,coins:0,own:['🦊','🐱','🐼','finot'],theme:'finot',chap:{},badges:[],badgeDates:{},streak:{n:0,best:0,last:''},daily:{date:'',ok:0,done:false},flashBest:0,totalOk:0,totalQ:0,time:0,sound:true,bestCombo:0,bought:0,goalsDone:0,missions:0,pin:'',rec:'',sync:{child:'',parent:''},lessons:{},lessonScores:{},tts:{auto:false,rate:1,voices:{}},subj:'maths',
 merit:{pts:0,total:0,rules:{ok:1,mission:5,perfect:10,goal:10,streak:5,lesson:5,path:15},
  rewards:[{id:'r1',e:'📱',n:'30 min d’écran en plus',c:50},{id:'r2',e:'🍰',n:'Choisir le dessert',c:80},{id:'r3',e:'💶',n:'5 € d’argent de poche',c:200},{id:'r4',e:'🎬',n:'Sortie au cinéma',c:400}],
  req:[],hist:[],notes:[]}};
const RULES=[['ok','Par bonne réponse'],['mission','Mission réussie (2 étoiles ou plus)'],['perfect','Bonus mission sans faute'],['path','Parcours du jour terminé'],['streak','Chaque jour de série (dès le 2e jour)'],['lesson','Cours terminé (1re fois)']];
let PARENT=false;
let S,M=null,lastIn=null,T0=Date.now(),AC,ONB='🦊',PDB=null,ACTIVE='';
const clone=o=>JSON.parse(JSON.stringify(o));
const pid=()=>('p'+Date.now().toString(36)+Math.random().toString(36).slice(2,7));
/* V8.13 — sécurité : les données de récompenses sont affichées dans le HTML ; on impose types, longueurs et identifiants sûrs
   (une sauvegarde importée ou ancienne ne peut pas injecter de balise ni sortir d'un attribut). */
const SAFE_ID=/^[\w-]{1,40}$/,numOr=(v,d=0)=>Number.isFinite(+v)?+v:d,txtOnly=(v,n)=>String(v??'').replace(/[<>"`]/g,'').slice(0,n);
const unEnt=t=>String(t??'').replace(/&(lt|gt|amp|quot|#39);/g,(m,k)=>({lt:'<',gt:'>',amp:'&',quot:'"','#39':"'"}[k]));
// Lexique illustré à 500 mots (19/10/2026) : quelques anciens mots ont changé de catégorie (ex. « apple » passe de
// Nourriture à Fruits). On renomme leur clé de progression sans jamais écraser une clé existante.
function lexMigrate(v){const M=window.MQ_LEXICON_MOVED;if(!M||!v||typeof v!=='object')return;for(const k of Object.keys(v)){const i=k.indexOf('|'),l=k.slice(0,i),t=M[l]&&M[l][k.slice(i+1)];if(t&&!((l+'|'+t) in v)){v[l+'|'+t]=v[k];delete v[k];}}}
function sanitizeMerit(m){m.pts=Math.max(0,Math.round(numOr(m.pts)));m.total=Math.max(0,Math.round(numOr(m.total)));
 const r0=m.rules&&typeof m.rules==='object'?m.rules:{};m.rules=Object.fromEntries(Object.keys(DEF.merit.rules).map(k=>[k,Math.max(0,Math.round(numOr(r0[k],DEF.merit.rules[k])))]));
 const obj=v=>v&&typeof v==='object'&&!Array.isArray(v);
 m.rewards=m.rewards.filter(obj).slice(0,40).map(w=>({id:SAFE_ID.test(String(w.id))?String(w.id):'w'+Math.random().toString(36).slice(2,9),e:txtOnly(w.e,8),n:txtOnly(w.n,60),c:Math.max(1,Math.round(numOr(w.c,10)))}));
 m.req=m.req.filter(r=>obj(r)&&SAFE_ID.test(String(r.id))&&SAFE_ID.test(String(r.rid))).slice(0,50).map(r=>({id:String(r.id),rid:String(r.rid),t:numOr(r.t,Date.now())}));
 m.hist=m.hist.filter(obj).slice(0,300).map(h=>({t:numOr(h.t,Date.now()),w:txtOnly(h.w,120),d:Math.round(numOr(h.d))}));
 m.notes=m.notes.filter(v=>typeof v==='string').slice(-20).map(v=>unEnt(v).slice(0,300));}
/* Nettoyage profond d'un code d'import : aucune chaîne ne peut contenir de balise, de guillemet droit ou d'accent grave. */
function deepClean(v,depth=0){if(depth>12)return null;if(typeof v==='string')return v.replace(/[<>`]/g,'').replace(/"/g,'”');if(Array.isArray(v))return v.slice(0,5000).map(x=>deepClean(x,depth+1));
 if(v&&typeof v==='object'){const o={};for(const k of Object.keys(v)){if(/[<>"`]/.test(k)||k==='__proto__'||k==='constructor'||k==='prototype')continue;o[k]=deepClean(v[k],depth+1);}return o;}
 return typeof v==='number'||typeof v==='boolean'||v===null?v:null;}
function normalizeState(o){const x={...clone(DEF),...(o||{})};x.merit={...clone(DEF.merit),...(x.merit||{})};x.merit.rules={...DEF.merit.rules,...(x.merit.rules||{})};x.sync={...DEF.sync,...(x.sync||{})};x.tts={...DEF.tts,...(x.tts||{})};x.lessonScores=x.lessonScores||{};x.lessons=x.lessons||{};x.chap=x.chap||{};x.recent=x.recent||{};x.vocab=x.vocab||{};x.mastery=x.mastery||{};x.review=x.review||{};x.mistakes=x.mistakes||{};x.confidence=x.confidence||{};x.adaptive={...DEF.adaptive,...(x.adaptive||{})};x.readingMastery=x.readingMastery&&typeof x.readingMastery==='object'&&!Array.isArray(x.readingMastery)?x.readingMastery:{};x.readingProgress=x.readingProgress&&typeof x.readingProgress==='object'&&!Array.isArray(x.readingProgress)?x.readingProgress:{};MQAdaptive.ensureState(x);{const g=window.MQPrimary?MQPrimary.normGrade(x.grade):x.grade;x.grade=MQAdaptive.LEVELS.includes(g)?g:'6e';}const obj=(v,d)=>v&&typeof v==='object'&&!Array.isArray(v)?{...d,...v}:{...d};x.streak=obj(x.streak,DEF.streak);x.daily=obj(x.daily,DEF.daily);x.merit.req=Array.isArray(x.merit.req)?x.merit.req:[];x.merit.hist=Array.isArray(x.merit.hist)?x.merit.hist:[];x.merit.notes=Array.isArray(x.merit.notes)?x.merit.notes:[];x.merit.rewards=Array.isArray(x.merit.rewards)?x.merit.rewards:clone(DEF.merit.rewards);sanitizeMerit(x.merit);lexMigrate(x.vocab);if(!(o&&o.merit&&o.merit.rules&&'path' in o.merit.rules)){const g0=numOr(o&&o.merit&&o.merit.rules&&o.merit.rules.goal,10);if(g0!==10)x.merit.rules.path=Math.max(0,Math.round(g0));}x.path=x.path&&typeof x.path==='object'&&!Array.isArray(x.path)&&typeof x.path.date==='string'&&Array.isArray(x.path.steps)&&x.path.steps.length===6&&x.path.steps.every(s=>s&&typeof s==='object')?x.path:null;x.pathHist=Array.isArray(x.pathHist)?x.pathHist.filter(h=>h&&typeof h==='object'&&typeof h.date==='string').slice(-30):[];x.own=Array.isArray(x.own)?x.own:clone(DEF.own);if(typeof x.subj!=='string'||!SUBMAP[x.subj])x.subj='maths';['xp','coins','totalOk','totalQ','time','flashBest','bestCombo','bought','goalsDone','missions'].forEach(k=>{x[k]=Number.isFinite(+x[k])?+x[k]:0;});if(typeof x.avatar!=='string'||x.avatar.length>16||/[<>&"']/.test(x.avatar))x.avatar='🦊';if(typeof x.birthdate!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(x.birthdate))x.birthdate='';x.lastBirthdayYear=Number.isFinite(+x.lastBirthdayYear)?+x.lastBirthdayYear:0;x.dailyGoal=Math.max(5,Math.min(100,parseInt(x.dailyGoal)||DEFAULT_GOAL));x.badges=Array.isArray(x.badges)?x.badges:[];x.badgeDates=x.badgeDates&&typeof x.badgeDates==='object'&&!Array.isArray(x.badgeDates)?x.badgeDates:{};for(const k of Object.keys(x)){if(k!=='mistakes'&&k!=='merit')x[k]=deepClean(x[k]);}for(const id of Object.keys(x.mistakes)){const a=x.mistakes[id];if(!Array.isArray(a)||/[<>"`]/.test(id)){delete x.mistakes[id];continue;}x.mistakes[id]=a.filter(m=>m&&typeof m==='object').slice(0,12).map(m=>({q:String(m.q??'').slice(0,220),answer:String(m.answer??'').slice(0,180),expl:String(m.expl??'').slice(0,320),at:numOr(m.at,Date.now()),seen:numOr(m.seen,0)}));}return x;}
function load(){
 let raw=null;try{raw=localStorage.getItem(PROFILES_KEY);PDB=JSON.parse(raw||'null');}catch(e){PDB=null;}
 // Donnée illisible : on la conserve intacte avant toute reconstruction, pour pouvoir la récupérer.
 if(raw&&(!PDB||!PDB.profiles||typeof PDB.profiles!=='object')){try{localStorage.setItem('mathquest_profiles_corrupt_backup_'+Date.now(),raw);}catch(e){}}
 if(!PDB||!PDB.profiles||typeof PDB.profiles!=='object'){let legacy=null;try{legacy=JSON.parse(localStorage.getItem(KEY)||'null');}catch(e){}const id=pid();PDB={version:2,active:id,profiles:{[id]:normalizeState(legacy)}};try{if(legacy)localStorage.setItem('mathquest_v1_backup',JSON.stringify(legacy));}catch(e){}}
 const ids=Object.keys(PDB.profiles);if(!ids.length){const id=pid();PDB.profiles[id]=clone(DEF);PDB.active=id;}
 ACTIVE=PDB.profiles[PDB.active]?PDB.active:Object.keys(PDB.profiles)[0];PDB.active=ACTIVE;S=normalizeState(PDB.profiles[ACTIVE]);saveLocal();
}
function saveLocal(){try{if(!PDB)PDB={version:2,active:ACTIVE||pid(),profiles:{}};if(!ACTIVE)ACTIVE=PDB.active||pid();PDB.version=3;PDB.active=ACTIVE;PDB.profiles[ACTIVE]=clone(S);localStorage.setItem(PROFILES_KEY,JSON.stringify(PDB));localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function save(){saveLocal();schedSync();}
function profileList(){return Object.entries(PDB?.profiles||{}).map(([id,v])=>[id,normalizeState(v)]);}
function profileSummary(v){const done=Object.keys(v.lessons||{}).length,stars=Object.values(v.chap||{}).reduce((a,c)=>a+(c.stars||0),0);return `${v.grade||'6e'} · ${done} cours · ★ ${stars} · niv. ${lvl(v.xp||0)}`;}
function activateProfile(id,goHome=true){if(!PDB?.profiles[id])return;saveLocal();clearTimeout(syncT);stopPron();ttsStop();if(M){clearInterval(M.tick);clearTimeout(M.tid);M=null;}L=null;padClose();ACTIVE=id;PDB.active=id;S=normalizeState(PDB.profiles[id]);PARENT=false;SYNC={ok:null,at:0,err:''};applyTheme();saveLocal();if(goHome)home();schedSync(300);}
function createProfile(){saveLocal();const id=pid(),base=clone(DEF);base.sound=S?.sound??true;base.pin=S?.pin||'';base.rec=S?.rec||'';base.theme=S?.theme||'finot';base.merit.rules=clone(S?.merit?.rules||DEF.merit.rules);base.merit.rewards=clone(S?.merit?.rewards||DEF.merit.rewards);PDB.profiles[id]=base;ACTIVE=id;PDB.active=id;S=normalizeState(base);ONB='🦊';saveLocal();onboarding(true);}
function deleteProfile(id){if(!PDB?.profiles[id]||Object.keys(PDB.profiles).length<=1)return false;try{localStorage.setItem('mathquest_profile_deleted_backup',JSON.stringify({id,data:PDB.profiles[id],t:Date.now()}));}catch(e){}delete PDB.profiles[id];if(ACTIVE===id){ACTIVE=Object.keys(PDB.profiles)[0];PDB.active=ACTIVE;S=normalizeState(PDB.profiles[ACTIVE]);}saveLocal();return true;}
let syncT=null,syncing=false,SYNC={ok:null,at:0,err:''},CUR='';
function snapshot(){const o=clone(S);delete o.pin;delete o.rec;delete o.sync;o.lastSeen=Date.now();return o;}
function schedSync(ms=2500){if(!S.sync||!S.sync.child)return;clearTimeout(syncT);syncT=setTimeout(syncNow,ms);}
async function syncNow(){if(!S.sync||!S.sync.child||syncing)return;syncing=true;
 try{const acts=await rpc('mq_push',{p_child:S.sync.child,p_data:snapshot()});
  if(acts&&acts.length){acts.forEach(a=>{try{applyAction(a);}catch(e){}});saveLocal();await rpc('mq_ack',{p_child:S.sync.child,p_ids:acts.map(a=>a.id)});await rpc('mq_push',{p_child:S.sync.child,p_data:snapshot()});if(!M){if(CUR==='home')home();else if(CUR==='rewards')rewardsScreen();}}
  SYNC={ok:true,at:Date.now(),err:''};}
 catch(e){SYNC={ok:false,at:Date.now(),err:String(e.message||e).slice(0,120)};}
 finally{syncing=false;}}
function applyAction(a){const p=a.payload||{};
 if(a.kind==='accept')doAccept(p.req);else if(a.kind==='refuse')doRefuse(p.req);
 else if(a.kind==='bonus')doBonus(parseInt(p.n)||0,String(p.why||'').slice(0,60));
 else if(a.kind==='rewards'&&Array.isArray(p.list)){S.merit.rewards=p.list.filter(w=>w&&w.id&&w.n).slice(0,40).map(w=>({id:String(w.id).slice(0,40),e:String(w.e||'🎁').slice(0,8),n:String(w.n).slice(0,50),c:Math.max(1,parseInt(w.c)||1)}));cleanReq();}
 else if(a.kind==='rules'&&p.rules)RULES.forEach(([k])=>{if(p.rules[k]!=null)S.merit.rules[k]=Math.max(0,parseInt(p.rules[k])||0);});}
function cleanReq(){const ids=S.merit.rewards.map(w=>w.id);S.merit.req=S.merit.req.filter(r=>ids.includes(r.rid));}
function doAccept(id){const r=S.merit.req.find(x=>x.id===id),w=r&&S.merit.rewards.find(x=>x.id===r.rid);if(!w)return false;if(S.merit.pts<w.c){toast('Solde insuffisant');return false;}S.merit.pts-=w.c;logM(-w.c,'Récompense : '+w.n);S.merit.req=S.merit.req.filter(x=>x.id!==id);S.merit.notes.push(`🎉 Récompense accordée : ${w.e} ${w.n} !`);return true;}
function doRefuse(id){const r=S.merit.req.find(x=>x.id===id),w=r&&S.merit.rewards.find(x=>x.id===r.rid);S.merit.req=S.merit.req.filter(x=>x.id!==id);if(w)S.merit.notes.push(`Demande pas accordée pour l’instant : ${w.n}`);}
function doBonus(n,why){if(!n)return;if(n>0){why=why||'Bonus des parents';addMerit(n,why,null);S.merit.notes.push(`🎖️ +${n} bons points : ${why}`);}else{why=why||'Retrait des parents';const d=Math.min(-n,S.merit.pts);S.merit.pts-=d;logM(-d,why);S.merit.notes.push(`🎖️ −${d} bons points : ${why}`);}}
const dstr=t=>{const d=new Date(t);return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();};
function touchDaily(){const t=dstr(Date.now());if(S.daily.date!==t)S.daily={date:t,ok:0,done:false};}
function touchStreak(){const t=dstr(Date.now()),y=dstr(Date.now()-864e5);if(S.streak.last===t)return;S.streak.n=S.streak.last===y?S.streak.n+1:1;S.streak.last=t;S.streak.best=Math.max(S.streak.best,S.streak.n);if(S.streak.n>1)addMerit(S.merit.rules.streak,`Série de ${S.streak.n} jours 🔥`);}
/* V8.21 — date de naissance facultative (S.birthdate). Âge calculé à la volée, jamais stocké séparément.
   localISODate (jamais toISOString) : un format local zéro-paddé pour comparer/limiter des dates sans
   décalage de fuseau horaire — voir la leçon retenue sur dstr()/toISOString() pour les tests. */
const localISODate=t=>{const d=new Date(t);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
function ageFromBirthdate(bd){if(!/^\d{4}-\d{2}-\d{2}$/.test(bd||''))return null;const [y,m,d]=bd.split('-').map(Number);const now=new Date();let age=now.getFullYear()-y;if(now.getMonth()+1<m||(now.getMonth()+1===m&&now.getDate()<d))age--;return age>=0&&age<130?age:null;}
function checkBirthday(){if(!S.birthdate)return;const [,m,d]=S.birthdate.split('-').map(Number),now=new Date(),y=now.getFullYear();if(now.getMonth()+1===m&&now.getDate()===d&&S.lastBirthdayYear!==y){S.lastBirthdayYear=y;save();const age=ageFromBirthdate(S.birthdate);setTimeout(()=>finotCeleb(FINOT_IMG.cadeau,'Joyeux anniversaire !',age?`${S.name}, Finot te souhaite un joyeux anniversaire pour tes ${age} ans ! 🎂`:`${S.name}, Finot te souhaite un joyeux anniversaire ! 🎂`),500);}}
/* Accessibilité — contraste des couleurs (WCAG AA ≥ 4,5:1). Les 7 thèmes débloquables ont des couleurs très
   différentes (orange clair à indigo foncé) : un texte blanc fixe sur le bouton, ou une couleur de texte
   fixe par-dessus le fond, ne peut pas convenir à tous. Ces fonctions recalculent à chaque thème la teinte de
   texte la plus lisible, sans jamais réutiliser un blanc/noir qui casserait le contraste d'un autre thème. */
function relLum([r,g,b]){const f=c=>{c/=255;return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);}
function hex2rgb(h){h=String(h).replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return [(n>>16)&255,(n>>8)&255,n&255];}
function rgb2hex(r,g,b){return '#'+[r,g,b].map(x=>Math.max(0,Math.min(255,Math.round(x))).toString(16).padStart(2,'0')).join('');}
function contrastRatio(a,b){const la=relLum(hex2rgb(a)),lb=relLum(hex2rgb(b));const [hi,lo]=la>lb?[la,lb]:[lb,la];return (hi+0.05)/(lo+0.05);}
function rgb2hsl(r,g,b){r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h,s;const l=(max+min)/2;if(max===min){h=s=0;}else{const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);if(max===r)h=(g-b)/d+(g<b?6:0);else if(max===g)h=(b-r)/d+2;else h=(r-g)/d+4;h/=6;}return [h,s,l];}
function hsl2rgb(h,s,l){if(s===0)return [l*255,l*255,l*255];const hue=(p,q,t)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p;};const q=l<0.5?l*(1+s):l+s-l*s,p=2*l-q;return [hue(p,q,h+1/3)*255,hue(p,q,h)*255,hue(p,q,h-1/3)*255];}
// Assombrit (fond clair) ou éclaircit (fond sombre) une couleur par petits pas, en gardant sa teinte, jusqu'à
// atteindre le contraste visé avec ce fond — pour l'utiliser ensuite comme texte lisible par-dessus.
function shadeForContrast(hex,bgHex,target=4.5){const [h,s]=rgb2hsl(...hex2rgb(hex));let l=rgb2hsl(...hex2rgb(hex))[2];const goDark=relLum(hex2rgb(bgHex))>0.5;
 for(let i=0;i<25;i++){const cur=rgb2hex(...hsl2rgb(h,s,l));if(contrastRatio(cur,bgHex)>=target)return cur;l=goDark?Math.max(0,l-.04):Math.min(1,l+.04);}
 return goDark?'#000000':'#ffffff';}
function applyTheme(){const t=THEMES.find(x=>x[0]===S.theme)||THEMES[0],accent=t[2],root=document.documentElement;root.style.setProperty('--accent',accent);
 const darkTxt='#1a1008';root.style.setProperty('--on-accent',contrastRatio(darkTxt,accent)>=contrastRatio('#ffffff',accent)?darkTxt:'#ffffff');
 // --surface2 est, empiriquement, la plus exigeante des 3 surfaces (bg/surface/surface2) dans les deux
 // modes clair/sombre de cette palette précise : y passer garantit de passer aussi sur les 2 autres.
 const surf=getComputedStyle(root).getPropertyValue('--surface2').trim()||'#ffe7d3';
 root.style.setProperty('--accent-text',contrastRatio(accent,surf)>=4.6?accent:shadeForContrast(accent,surf,4.6));
 applyStage();}
if(window.matchMedia)matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>applyTheme());
// Interface allégée et agrandie au primaire, encore plus pour CP-CE1.
function applyStage(){if(!S)return;document.body.classList.toggle('primary',stageOf(S.grade)==='primaire');document.body.classList.toggle('young',S.grade==='CP'||S.grade==='CE1');}

/* ===== Effets ===== */
const $=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plainText=h=>{const d=document.createElement('div');d.innerHTML=String(h||'');return d.textContent.replace(/\s+/g,' ').trim();};
const masteryHTML=id=>{const v=MQAdaptive.mastery(S,id),l=MQAdaptive.masteryLabel(v);return `<span class="mastery-chip ${l.k}">${l.e} ${l.t} · ${v}%</span>`;};
function sfx(k){if(!S.sound)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const seq={ok:[[660,.08],[880,.14]],bad:[[196,.22]],lvl:[[523,.1],[659,.1],[784,.1],[1047,.25]],coin:[[988,.06],[1319,.12]]}[k];let t=AC.currentTime;
 seq.forEach(([f,d])=>{const o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(.13,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g).connect(AC.destination);o.start(t);o.stop(t+d);t+=d*.9;});}catch(e){}}
function confetti(n=24){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const cols=['#f59e0b','#22c55e','#3b82f6','#ec4899','#a855f7','#ef4444'];
 for(let i=0;i<n;i++){const e=document.createElement('i');e.className='cf';e.style.left=(25+Math.random()*50)+'vw';e.style.background=cols[i%cols.length];e.style.setProperty('--dx',(Math.random()*50-25)+'vw');e.style.setProperty('--r',(Math.random()*900)+'deg');e.style.animationDelay=(Math.random()*.15)+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),1800);}}
function toast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.setAttribute('aria-live','polite');t.setAttribute('role','status');document.body.appendChild(t);}t.innerHTML=m;t.classList.toggle('raised',CUR==='home');t.classList.remove('show');void t.offsetWidth;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2800);}
function shake(){const c=$('.qcard');if(c){c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake');}}
/* V8.17 — vraie célébration (overlay + confettis) au lieu d'un simple toast, pour les deux temps forts
   « très exubérants » demandés : déblocage d'un badge, et montée de palier du lien avec Finot. */
function finotCelebDOM(){if(document.getElementById('celeb'))return;const d=document.createElement('div');d.id='celeb';d.dataset.a='celebclose';d.setAttribute('role','status');d.setAttribute('aria-live','polite');
 d.innerHTML='<div class="celeb-card celeb-pop"><button class="btn ghost sm celeb-close" data-a="celebclose" aria-label="Fermer">✕</button><div class="celeb-icon"></div><b class="celeb-title"></b><div class="celeb-sub"></div></div>';document.body.appendChild(d);}
let CELEB_T=null;
function finotCeleb(icon,title,sub){finotCelebDOM();const d=document.getElementById('celeb'),card=d.querySelector('.celeb-card'),ic=d.querySelector('.celeb-icon');
 ic.innerHTML=icon.includes('/')?`<img src="${icon}" alt="" aria-hidden="true" class="finot-live" style="width:72px;height:72px;object-fit:contain;">`:esc(icon);
 d.querySelector('.celeb-title').textContent=title;d.querySelector('.celeb-sub').textContent=sub||'';
 card.classList.remove('celeb-pop');void card.offsetWidth;card.classList.add('celeb-pop');
 d.classList.add('show');confetti(32);sfx('lvl');clearTimeout(CELEB_T);CELEB_T=setTimeout(()=>d.classList.remove('show'),2400);}
function checkBadges(m){const unlocked=[];BADGES.forEach(b=>{if(!S.badges.includes(b[0])&&b[4](S)){S.badges.push(b[0]);S.badgeDates[b[0]]=Date.now();if(m)m.newB.push(b);unlocked.push(b);}});save();
 unlocked.forEach((b,i)=>setTimeout(()=>finotCeleb('data/images/finot/ui-celeb-badge.png','Nouveau badge !',`${b[1]} ${b[2]}`),i*2600));}
const starStr=n=>`<span class="st">${'★'.repeat(n)}<i>${'★'.repeat(3-n)}</i></span>`;
const bar=(t,back='home')=>`<div class="bar"><button class="btn ghost sm" data-a="${back}" aria-label="${back==='home'?'Accueil':'Retour'}">←</button><h1>${t}</h1><span class="pill">🪙 ${S.coins}</span></div>`;

