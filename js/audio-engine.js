/* Finot Académie — Moteur audio centralisé (synthèse vocale + reconnaissance), V8.13.
   Toutes les lectures passent par window.MQAudio.
   Principes :
   - chaque segment a une langue (fr, en, it) → locale BCP-47 (fr-FR, en-GB, it-IT) ;
   - la voix est choisie parmi les voix de CETTE langue uniquement (locale exacte > même langue) ; jamais une voix d'une autre langue ;
   - si l'appareil n'a aucune voix pour la langue alors qu'il en liste d'autres, on NE lit PAS (on signale « voix indisponible ») ;
     si l'appareil ne liste aucune voix (certains Android), on confie la locale au moteur du navigateur ;
   - le texte prononcé est préparé (nombres, unités, monnaie, heures, fractions, classes…) ; les sons, lettres et syllabes du CP
     passent par un lexique de prononciation (data/pronunciation-lexicon.js) plutôt que par une lecture isolée ambiguë ;
   - vitesses (21/10/2026, lecture plus douce) : normale 0,95 en français, 0,92 en langue étrangère ; lente 0,75 ;
     consignes CP/CE1 0,88. Hauteur de voix inchangée (1).
   - voix : féminine et de haute qualité d'abord (Audrey « Premium »/« Améliorée » sur iPhone, Denise/Vivienne Natural sur
     Edge, Google français…) ; voix « Eloquence » et voix fantaisie d'iOS (Grandma, Eddy, Flo…) écartées ;
   - fluidité : tous les morceaux d'une lecture sont mis d'un coup dans la file du moteur (aucune attente ni arrêt entre
     deux phrases, l'intonation n'est plus coupée) ; onsegment(i) signale le morceau en cours pour le surlignage. */
(function(root){
'use strict';
const LOCALES={fr:'fr-FR',en:'en-GB',it:'it-IT'};
const LANG_NAMES={fr:'française',en:'anglaise',it:'italienne'};
const RATES={normal:{fr:.95,en:.92,it:.92},slow:{fr:.75,en:.75,it:.75},young:.88};
const TYPES=['phrase','mot','syllabe','lettre','graphème','phonème','consigne','langue'];
const st={voices:[],loaded:false,listeners:[],prefs:{},last:null,gen:0,unavailable:{},onUnavailable:null,onFail:null};
const synth=()=>root.speechSynthesis||null;
const Utt=()=>root.SpeechSynthesisUtterance||null;
const lang2=l=>String(l||'fr').toLowerCase().slice(0,2);
function locale(l){return LOCALES[lang2(l)]||String(l||'fr-FR');}
function supported(){return !!(synth()&&Utt());}

/* ---------- Chargement des voix (asynchrone) ---------- */
function refresh(){const s=synth();if(!s)return [];let v=[];try{v=s.getVoices()||[];}catch(e){v=[];}st.voices=v.slice();if(v.length){st.loaded=true;st.listeners.splice(0).forEach(f=>{try{f(st.voices);}catch(e){}});}return st.voices;}
function init(){const s=synth();if(!s)return;refresh();try{if(s.addEventListener)s.addEventListener('voiceschanged',refresh);else s.onvoiceschanged=refresh;}catch(e){}}
function ready(timeout=1500){return new Promise(res=>{if(st.loaded||!synth())return res(st.voices);const t=setTimeout(()=>res(refresh()),timeout);st.listeners.push(v=>{clearTimeout(t);res(v);});refresh();});}
function setPrefs(p){st.prefs=Object.assign({},p||{});}

/* ---------- Choix de la voix ---------- */
// Voix naturelles (neuronales) d'abord ; voix de synthèse anciennes, très robotiques, en dernier recours.
// Les voix « Online » ont besoin d'Internet : hors connexion, elles se taisent, on les écarte donc.
const QUALITY=/natural|neural|online|premium|enhanced|améliorée|wavenet|siri/i;
const ROBOTIC=/hortense|julie|paul|zira|david desktop|mark|hazel|george|elsa|cosimo|espeak|pico|festival|mbrola/i;
// iOS / macOS : voix « Eloquence » et voix fantaisie, très mécaniques — jamais choisies si une autre voix existe.
const NOVELTY=/eloquence|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley|bahh|bells|boing|bubbles|cellos|jester|organ|trinoids|whisper|wobble|zarvox|albert|bad news|good news|superstar|junior|ralph|kathy|fred/i;
// Voix féminines connues (lecture douce, demande du 21/10/2026) et voix masculines connues.
const FEMALE=/audrey|am[ée]lie|aur[ée]lie|marie|c[ée]line|l[ée]a|denise|vivienne|eloise|brigitte|virginie|google fran[çc]ais|samantha|karen|serena|kate|moira|tessa|alice|federica|paola|elsa|isabella|libby|sonia|maisie/i;
const MALE=/thomas|nicolas|daniel|henri|paul|claude|r[ée]my|jacques|antoine|j[ée]r[ôo]me|luca|arthur|oliver|gordon|rishi|diego|giorgio/i;
/* who='finot' : voix du personnage (idée du 21/10/2026) — masculine, douce, distincte de la voix des leçons. Une voix
   masculine correcte passe avant une voix féminine premium ; une voix masculine robotique (Paul, eSpeak…) ne passe jamais
   avant une voix naturelle : sans voix masculine correcte, Finot garde la meilleure voix, plus aiguë (voir FINOT). */
function score(v,loc,who){const vl=String(v.lang||'').replace('_','-').toLowerCase(),L=loc.toLowerCase();let s=0;
  if(vl===L)s+=100;else if(vl.slice(0,2)===L.slice(0,2))s+=50;else return -1;
  const online=/online/i.test(v.name)||v.localService===false,offline=typeof navigator!=='undefined'&&navigator.onLine===false;
  if(online&&offline)return -1;
  const id=v.name+' '+(v.voiceURI||'');
  if(/premium/i.test(id))s+=45;else if(/enhanced|améliorée|amelioree/i.test(id))s+=35;else if(QUALITY.test(id))s+=30;if(/compact/i.test(id))s-=5;
  if(/google/i.test(v.name))s+=12;if(/apple|amélie|thomas|audrey|aurélie|daniel|alice|federica|luca/i.test(v.name))s+=8;
  const robotic=ROBOTIC.test(v.name)&&!QUALITY.test(v.name);
  if(who==='finot'){if(MALE.test(v.name)&&!FEMALE.test(v.name))s+=60;if(robotic)s-=60;}
  else if(FEMALE.test(v.name))s+=15;else if(MALE.test(v.name))s-=10;
  if(NOVELTY.test(id))s-=60;if(robotic)s-=20;if(v.localService)s+=1;return s;}
// Ton de Finot : un peu plus aigu et vif qu'un adulte (personnage de dessin animé), sans devenir criard.
const FINOT={pitchMale:1.2,pitchOther:1.32,rate:1};
function isMaleVoice(v){return !!(v&&MALE.test(v.name)&&!FEMALE.test(v.name));}
/* Voix de Finot : {voice, male, pitch, rate, locale} ; ignore le choix fait pour les leçons (c'est un personnage). */
function finotVoice(l='fr'){const loc=locale(l),vs=st.voices.length?st.voices:refresh();
  const ranked=vs.map(v=>[score(v,loc,'finot'),v]).filter(x=>x[0]>=0).sort((a,b)=>b[0]-a[0]);const v=ranked.length?ranked[0][1]:null,male=isMaleVoice(v);
  const status=!vs.length?'engine-default':!v?'unavailable':String(v.lang||'').replace('_','-').toLowerCase()===loc.toLowerCase()?'exact':'language';
  return {voice:v,male,pitch:male?FINOT.pitchMale:FINOT.pitchOther,rate:FINOT.rate,locale:loc,status};}
/* Renvoie {voice, status, locale} — status : 'exact' | 'language' | 'preferred' | 'engine-default' (aucune voix listée) | 'unavailable'. */
function pickVoice(l){const loc=locale(l),la=lang2(l);const vs=st.voices.length?st.voices:refresh();
  if(!vs.length)return {voice:null,status:'engine-default',locale:loc};
  const pref=st.prefs[la];if(pref){const p=vs.find(v=>(v.voiceURI===pref||v.name===pref)&&score(v,loc)>=0);if(p)return {voice:p,status:'preferred',locale:loc};}
  const ranked=vs.map(v=>[score(v,loc),v]).filter(x=>x[0]>=0).sort((a,b)=>b[0]-a[0]);
  if(!ranked.length)return {voice:null,status:'unavailable',locale:loc};
  const best=ranked[0][1],exact=String(best.lang||'').replace('_','-').toLowerCase()===loc.toLowerCase();return {voice:best,status:exact?'exact':'language',locale:loc};}
function voicesFor(l){const loc=locale(l);return (st.voices.length?st.voices:refresh()).filter(v=>score(v,loc)>=0);}

/* ---------- Préparation du texte (français) ---------- */
const SHORT={a:'a',i:'i',o:'o',u:'u','é':'é','è':'è',e:'eu',ou:'ou',on:'on',an:'an',en:'an',in:'in',ain:'in',ein:'in',un:'un',oi:'oi',oin:'oin',ch:'che',gn:'gne',ph:'fe',qu:'ke',gu:'gue',ge:'je',gi:'ji',ce:'se',ci:'si',eu:'eu','œu':'eu',au:'o',eau:'o',ai:'è',ei:'è',er:'é',ez:'é',et:'è',ill:'ille',ail:'aille',eil:'eille',euil:'euille',ouille:'ouille',ien:'ien',ion:'ion',x:'kse',y:'i',s:'se',ss:'se',z:'ze',f:'fe',v:'ve',l:'le',m:'me',n:'ne',r:'re',j:'je',p:'pe',t:'te',b:'be',d:'de',k:'ke',c:'ke',g:'gue'};
const MOIS=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
const LETTER_NAME={a:'a',b:'bé',c:'cé',d:'dé',e:'eu',f:'effe',g:'gé',h:'ache',i:'i',j:'ji',k:'ka',l:'elle',m:'emme',n:'enne',o:'o',p:'pé',q:'ku',r:'erre',s:'esse',t:'té',u:'u',v:'vé',w:'double vé',x:'ixe',y:'i grec',z:'zède'};
const ROM=r=>{const v={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};let n=0;for(let i=0;i<r.length;i++){const x=v[r[i]],y=v[r[i+1]]||0;n+=x<y?-x:x;}return n;};
const DEN={2:['demi','demis'],3:['tiers','tiers'],4:['quart','quarts'],5:['cinquième','cinquièmes'],6:['sixième','sixièmes'],7:['septième','septièmes'],8:['huitième','huitièmes'],9:['neuvième','neuvièmes'],10:['dixième','dixièmes'],12:['douzième','douzièmes'],100:['centième','centièmes'],1000:['millième','millièmes']};
const CLASSES={CP:'C P',CE1:'C E 1',CE2:'C E 2',CM1:'C M 1',CM2:'C M 2',DNB:'D N B',ULIS:'ULIS',SEGPA:'SEGPA',CDI:'C D I',EPS:'E P S',EMC:'E M C',SVT:'S V T'};
const ORD={'6e':'sixième','5e':'cinquième','4e':'quatrième','3e':'troisième','2de':'seconde','2nde':'seconde','1re':'première','1ère':'première','1er':'premier','1ers':'premiers'};
const UNITS=[['km/h','kilomètres heure'],['m/s','mètres par seconde'],['g/cm³','grammes par centimètre cube'],['kg/m³','kilogrammes par mètre cube'],['g/L','grammes par litre'],['N/kg','newtons par kilogramme'],
  ['kWh','kilowattheures'],['Wh','wattheures'],['km²','kilomètres carrés'],['cm²','centimètres carrés'],['dm²','décimètres carrés'],['mm²','millimètres carrés'],['m²','mètres carrés'],
  ['cm³','centimètres cubes'],['dm³','décimètres cubes'],['m³','mètres cubes'],['km','kilomètres'],['hm','hectomètres'],['dam','décamètres'],['dm','décimètres'],['cm','centimètres'],['mm','millimètres'],
  ['kg','kilogrammes'],['mg','milligrammes'],['hL','hectolitres'],['cL','centilitres'],['mL','millilitres'],['dL','décilitres'],['min','minutes'],['°C','degrés Celsius'],['kΩ','kilohms'],['Ω','ohms'],
  ['mA','milliampères'],['kW','kilowatts'],['Hz','hertz'],['Go','gigaoctets'],['Mo','mégaoctets'],['Ko','kilooctets'],['To','téraoctets'],['m','mètres'],['g','grammes'],['L','litres'],['l','litres'],['t','tonnes'],['s','secondes'],
  ['V','volts'],['A','ampères'],['W','watts'],['J','joules'],['N','newtons'],['°','degrés']];
// Une apostrophe juste après la lettre est une élision (« 10 000 s’écrivent », « 3 s’il », « 8 l’enfant »), jamais une unité.
const UNIT_RE=new RegExp('(\\d)\\s?('+UNITS.map(u=>u[0].replace(/[.*+?^${}()|[\]\\/]/g,'\\$&')).join('|')+')(?![\\p{L}\\d²³\'’])','gu');
const UNIT_MAP=Object.fromEntries(UNITS);
function prepareFR(t){t=' '+String(t??'').replace(/[  ]/g,' ').replace(/[’‘`´]/g,"'")+' ';
  t=t.replace(/av\.\s*J\.-C\./g,'avant Jésus-Christ').replace(/apr\.\s*J\.-C\./g,'après Jésus-Christ');
  // Lettre seule (choix « b », « y », « l »…) : on lui donne son nom, sinon la synthèse la lit comme un mot (« y » → « i »).
  {const m=t.match(/^\s*[«"(]?\s*([A-Za-z])\s*[»")]?\s*\.?\s*$/);if(m)return LETTER_NAME[m[1].toLowerCase()];}
  // Blancs « ___ » des exercices (« Il faut que nous ___ (être) à l’heure ») : une pause, jamais « tiret bas ».
  t=t.replace(/_{2,}/g,' … ');
  // Abréviations et numéros que les voix lisent mal (« n° 3 » → « n degré 3 », « Mme » → lettres)
  t=t.replace(/\bMmes\b/g,'mesdames').replace(/\bMme\b/g,'madame').replace(/\bMlle\b/g,'mademoiselle').replace(/\bMM\.\s?(?=[A-ZÉÈ])/g,'messieurs ').replace(/\bM\.\s?(?=[A-ZÉÈ])/g,'monsieur ').replace(/\bDr\.?\s(?=[A-ZÉÈ])/g,'docteur ')
   .replace(/\bn[°º]\s?(?=\d)/gi,'numéro ').replace(/\bpp\.\s?(?=\d)/g,'pages ').replace(/\bp\.\s?(?=\d)/g,'page ').replace(/\bFig\.\s?(?=\d)/g,'figure ').replace(/\bcf\.\s?/g,'voir ').replace(/\betc\./g,'et cetera.').replace(/\bIer\b/g,'premier');
  // Dates 12/10/2026 → « 12 octobre 2026 » (la voix lirait « barre »)
  t=t.replace(/\b(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/(\d{4})\b/g,(m,d,mo,y)=>`${+d===1?'1er':+d} ${MOIS[+mo-1]} ${y}`);
  // Phonèmes et graphèmes notés [ou], [ch] : lexique de prononciation
  // Syllabe à lire (« Lis : s + é ») : on prononce les sons (« se, é »), pas les noms de lettres.
  t=t.replace(/^(\s*Lis\s*:\s*)(\S{1,3}) \+ (\S{1,3})(\s*)$/i,(m,a,x,y,z)=>a+(SHORT[x.toLowerCase()]||x)+' plus '+(SHORT[y.toLowerCase()]||y)+z);
  // Son noté [ou] : explication complète s'il termine la phrase ; au milieu d'une question, juste le son (sinon la question est coupée en deux).
  {const whole=t;t=t.replace(/\[([a-zéèêàùôîœ]{1,6})\](\s*\.?\s*$)?/gi,(m,g,end)=>end!==undefined||/^\s*$/.test(whole.replace(m,''))?' '+graphemeSpoken(g)+' ':' '+(SHORT[g.toLowerCase()]||g)+' ');}
  // Chiffres collés au mot qui précède (« euros5 », « ?5 ») et traits de comptage « | » (non prononçables)
  t=t.replace(/([a-zéèêàùç]{3,})(\d)/g,'$1, $2').replace(/([?!])(\d)/g,'$1 $2').replace(/\|+/g,' ');
  t=t.replace(/(\d) (?=\d{3}\b)/g,'$1');
  // Monnaie
  t=t.replace(/(\d+),(\d{2})\s?€/g,(m,e,c)=>+e?`${e} euro${+e>1?'s':''} ${+c}`:`${+c} centimes`).replace(/(\d+)\s?€/g,(m,e)=>`${e} euro${+e>1?'s':''}`).replace(/€/g,' euros ');
  t=t.replace(/£\s?(\d+)[.,](\d{2})/g,(m,e,c)=>`${e} livre${+e>1?'s':''} ${+c}`).replace(/£\s?(\d+)/g,(m,e)=>`${e} livre${+e>1?'s':''}`);
  // Fractions d'heure : 1/2 h, 1/4 h, 3/4 h (sinon « 2 heures » serait lu après un « un sur »)
  t=t.replace(/(^|[^\d/])1\/2\s?h\b/g,'$1une demi-heure').replace(/(^|[^\d/])1\/4\s?h\b/g,"$1un quart d'heure").replace(/(^|[^\d/])3\/4\s?h\b/g,"$1trois quarts d'heure");
  // Heures : 8 h 30, 14 h 05, 9 h
  t=t.replace(/\b(\d{1,2})\s?h\s?(\d{2})\b/g,(m,h,mi)=>`${h} heure${+h>1?'s':''} ${mi}`).replace(/\b(\d{1,2})\s?h\b(?!\s?\d)/g,(m,h)=>`${h} heure${+h>1?'s':''}`);
  // Fractions simples : 1/4 → un quart ; 3/5 → 3 cinquièmes ; autres → a sur b
  t=t.replace(/(^|[^\d/,])(\d{1,3})\s?\/\s?(\d{1,4})(?![\d/])/g,(m,p,a,b,off,str)=>{const d=DEN[+b];if(!d)return `${p}${a} sur ${b}`;const n=+a;if(n===1&&/\b(un|une)$/i.test(str.slice(0,off)))return `${p}${d[0]}`;return `${p}${n===1?'un':a} ${n>1?d[1]:d[0]}`;});
  // Unités après un nombre
  t=t.replace(UNIT_RE,(m,d,u)=>`${d} ${UNIT_MAP[u]}`);
  // Classes et sigles scolaires
  t=t.replace(/\b(CP|CE1|CE2|CM1|CM2|DNB|CDI|EPS|EMC|SVT)\b/g,m=>' '+CLASSES[m]+' ');
  t=t.replace(/\b(6e|5e|4e|3e|2de|2nde|1re|1ère|1er|1ers)\b/g,m=>ORD[m]);
  t=t.replace(/\b(Louis|Henri|Charles|François|Philippe|Napoléon|Léon|Jean|Guillaume|Pie|Benoît)\s+([IVXL]{1,6})\b/g,(m,n,r)=>`${n} ${ROM(r)}`);
  t=t.replace(/\b([IVXLC]{1,6})(e|ème)\s+(siècle|millénaire|République|arrondissement)/g,(m,r,s,w)=>`${ROM(r)}ème ${w}`);
  t=t.replace(/\b(\d+)e\b/g,'$1ème');
  // Signe moins : « -5 °C », « 8 - 3 = 5 » (le trait d'union n'est pas lu)
  t=t.replace(/(^|[\s(=])-(?=\d)/g,'$1 moins ');if(/=/.test(t))t=t.replace(/(\d)\s[-–]\s(?=\d)/g,'$1 moins ');
  // Symboles mathématiques
  t=t.replace(/([\w)])²/g,'$1 au carré').replace(/([\w)])³/g,'$1 au cube');
  t=t.replace(/×/g,' fois ').replace(/÷/g,' divisé par ').replace(/−/g,' moins ').replace(/\+/g,' plus ').replace(/≤/g,' inférieur ou égal à ').replace(/≥/g,' supérieur ou égal à ').replace(/≈/g,' environ ').replace(/≠/g,' différent de ')
   .replace(/</g,' inférieur à ').replace(/>/g,' supérieur à ').replace(/=/g,' égale ').replace(/√/g,' racine de ').replace(/π/g,' pi ').replace(/%/g,' pour cent ').replace(/→/g,', donc ').replace(/…/g,' … ').replace(/─+/g,' ');
  t=t.replace(/\p{Extended_Pictographic}|️|‍/gu,'');
  return t.replace(/\s+/g,' ').trim();}
function prepareForeign(t){return String(t??'').replace(/[’‘`´]/g,"'").replace(/[  ]/g,' ').replace(/_{2,}/g,' … ').replace(/\p{Extended_Pictographic}|️|‍/gu,'').replace(/\s+/g,' ').trim();}
function prepare(t,l='fr'){return lang2(l)==='fr'?prepareFR(t):prepareForeign(t);}

/* ---------- Lexique de prononciation (lettres, graphèmes, syllabes) ---------- */
const LEX=()=>root.MQ_PRONUNCIATION||{letters:{},graphemes:{},syllables:{}};
function graphemeSpoken(g){g=String(g).toLowerCase();const e=LEX().graphemes[g];return e?e.say:`le son ${g}`;}
/* Texte réellement prononcé selon le TYPE_AUDIO. Le texte affiché peut différer du texte prononcé. */
function spokenFor(text,type='phrase',l='fr'){const la=lang2(l),T=String(text??'').trim();
  if(type==='raw')return la==='fr'?T:prepareForeign(T); // texte déjà préparé par l'appli
  if(la!=='fr')return prepareForeign(T);
  const k=T.toLowerCase();const lex=LEX();
  if(type==='lettre'){const e=lex.letters[k];return e?e.say:`${T}. La lettre ${T}.`;}
  if(type==='graphème'||type==='phonème'){const e=lex.graphemes[k];return e?e.say:`${T}. Le son ${T}.`;}
  if(type==='syllabe'){const e=lex.syllables[k];return e?e.say:`${T}.`;}
  return prepareFR(T);}

/* ---------- Lecture ---------- */
function rateFor(l,{slow=false,young=false,type='phrase'}={}){const la=lang2(l);if(slow)return RATES.slow[la]||.75;if(young&&(type==='consigne'||type==='phrase')&&la==='fr')return RATES.young;return RATES.normal[la]||1;}
/* speak([{t,l,type}], {slow, young, onend, onstart, onsegment, onunavailable}) → rapport {spoken:[…], skipped:[…]}.
   Tous les énoncés sont confiés d'un coup à la file du moteur : pas de silence ni de remise à zéro de l'intonation entre
   deux morceaux (les lectures paraissaient hachées, surtout sur iPhone). onsegment(i) : début du morceau i de segs. */
// Erreurs de synthèse qui signifient « cette voix ne peut pas parler maintenant » (et non un arrêt volontaire ou une
// lecture refusée faute de geste de l'utilisateur) : interrupted, canceled et not-allowed n'en font pas partie.
const FAIL_CODES=/^(synthesis-failed|synthesis-unavailable|language-unavailable|voice-unavailable|network|audio-hardware)$/;
function speak(segs,opt={}){const rep={spoken:[],skipped:[]};const s=synth(),U=Utt();if(!s||!U){rep.skipped=segs.map(x=>({...x,why:'synthèse indisponible'}));if(opt.onend)opt.onend(rep);return rep;}
  stop();const g=++st.gen;st.last={segs,opt};const utts=[];
  const finot=opt.character==='finot';
  (segs||[]).forEach((sg,idx)=>{if(!sg||!String(sg.t||'').trim())return;const la=lang2(sg.l);const pv=finot?finotVoice(la):pickVoice(la);
    if(pv.status==='unavailable'){rep.skipped.push({...sg,why:'aucune voix '+(LANG_NAMES[la]||la)});if(!st.unavailable[la]){st.unavailable[la]=1;const cb=opt.onunavailable||st.onUnavailable;if(cb)try{cb(la);}catch(e){}}return;}
    const text=spokenFor(sg.t,sg.type||'phrase',la);if(!text)return;
    let u;try{u=new U(text);}catch(e){rep.skipped.push({...sg,why:'erreur'});return;}
    u.lang=pv.locale;if(pv.voice)u.voice=pv.voice;u.rate=sg.rate||(finot?pv.rate:rateFor(la,{slow:opt.slow,young:opt.young,type:sg.type}));u.pitch=finot?pv.pitch:1;
    rep.spoken.push({t:text,l:la,locale:pv.locale,voice:pv.voice?pv.voice.name:'(moteur du navigateur)',status:pv.status,rate:u.rate,pitch:u.pitch});utts.push([u,idx]);});
  if(!utts.length){if(opt.onend)opt.onend(rep);return rep;}
  let started=false,finished=false;const failedHere={};const finish=()=>{if(finished||g!==st.gen)return;finished=true;if(opt.onend)opt.onend(rep);};
  utts.forEach(([u,idx],j)=>{const last=j===utts.length-1;
    u.onstart=()=>{if(g!==st.gen)return;if(!started){started=true;if(opt.onstart)try{opt.onstart();}catch(e){}}if(opt.onsegment)try{opt.onsegment(idx);}catch(e){}};
    u.onend=()=>{if(last)finish();};
    // Échec réel de la voix (pas un arrêt volontaire) : on prévient une fois par lecture et par langue, sans bloquer la suite.
    u.onerror=ev=>{const code=ev&&ev.error;if(g===st.gen&&FAIL_CODES.test(String(code||''))){const la=lang2(segs[idx].l);
      if(!failedHere[la]){failedHere[la]=1;const cb=opt.onfail||st.onFail;if(cb)try{cb(la,code);}catch(e){}}}if(last)finish();};
    try{s.speak(u);}catch(e){if(last)finish();}});
  // Filet : certains moteurs n'émettent pas toujours onend ; la lecture est finie quand la file est vide.
  const watch=()=>{if(finished||g!==st.gen)return;let busy=true;try{busy=!!(s.speaking||s.pending);}catch(e){}if(!busy)return finish();setTimeout(watch,1000);};setTimeout(watch,2500);
  return rep;}
function stop(){st.gen++;const s=synth();if(s)try{s.cancel();}catch(e){}}
function replay(){if(st.last)return speak(st.last.segs,st.last.opt);return null;}
function speaking(){const s=synth();try{return !!(s&&(s.speaking||s.pending));}catch(e){return false;}}

/* ---------- Reconnaissance vocale ---------- */
// Reconnaissance : capacité centralisée (js/speech-capability.js) ; null dans l'app Android V1.
const Rec=()=>root.MQSpeechCapability?root.MQSpeechCapability.Recognition():(root.SpeechRecognition||root.webkitSpeechRecognition||null);
function recognitionLocale(l){return locale(l);}
function createRecognizer(l){const R=Rec();if(!R)return null;const r=new R();r.lang=recognitionLocale(l);r.interimResults=false;r.maxAlternatives=3;r.continuous=false;return r;}

/* ---------- Diagnostic (page « Voix de l'appareil ») ---------- */
function diagnostics(){const vs=st.voices.length?st.voices:refresh();
  return {supported:supported(),recognition:!!Rec(),count:vs.length,
    voices:vs.map(v=>({name:v.name,lang:v.lang,locale:String(v.lang||'').replace('_','-'),engine:v.localService?'locale (sur l’appareil)':'en ligne',default:!!v.default,uri:v.voiceURI})),
    chosen:Object.fromEntries(Object.keys(LOCALES).map(l=>{const p=pickVoice(l);return [l,{locale:p.locale,status:p.status,voice:p.voice?p.voice.name:null,voiceLang:p.voice?p.voice.lang:null}];}))};}

init();
root.MQAudio={version:'8.13',LOCALES,TYPES,RATES,FINOT,locale,lang2,supported,init,refresh,ready,setPrefs,pickVoice,finotVoice,voicesFor,prepare,prepareFR,prepareForeign,spokenFor,graphemeSpoken,rateFor,speak,stop,replay,speaking,recognitionLocale,createRecognizer,diagnostics,
  set onUnavailable(f){st.onUnavailable=f;},get onUnavailable(){return st.onUnavailable;},
  set onFail(f){st.onFail=f;},get onFail(){return st.onFail;},_state:st};
})(typeof window!=='undefined'?window:globalThis);
