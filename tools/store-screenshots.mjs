/* Finot Académie — captures commerciales reproductibles pour la fiche Google Play (téléphone et tablette).

   Pilote un AVD réel par ADB et l'application par le protocole de débogage de la WebView (CDP). Profil et progression 100 %
   FICTIFS (« Léo », CM1), posés dans l'AVD uniquement ; barre d'état Android en mode démonstration (10:10, batterie pleine,
   Wi-Fi, aucune notification). Ne fabrique aucune fonction : chaque écran est ouvert par les vraies actions de l'application.
   Aucun envoi réseau, aucune publication. Les images vont dans artifacts/google-play/store-screens/ (non versionné).

   Usage :  node tools/store-screenshots.mjs --serial emulator-5554 --kind phone  [--apk <chemin>] [--only 01-accueil,04-exercice] [--out <dossier>]
            node tools/store-screenshots.mjs --serial emulator-5554 --kind tablet [--rotation 0]
   Prérequis : AVD démarré et déverrouillé, adb dans ANDROID_HOME ; l'APK debug fr.finot.academie.dev (npm run android:sync + gradlew assembleDebug).

   Le module exporte aussi SCREENS / SEED_JS / ONBOARDING_JS : tests/store-screenshots.test.js les exécute contre le produit réel dans
   Chromium (même navigation, mêmes attentes) sans émulateur. */
import { execFileSync } from 'node:child_process';
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const PROFILE = { name: 'Léo', grade: 'CM1' };
export const PKG = 'fr.finot.academie.dev';

const W = 'const w=ms=>new Promise(r=>setTimeout(r,ms));';

/* Création du profil par l'assistant d'accueil réel (mêmes boutons que l'enfant). */
export const ONBOARDING_JS = `(async()=>{${W}const c=s=>{const e=document.querySelector(s);if(!e)throw new Error('absent '+s);e.click();};
 const i=document.querySelector('#pob-name');i.value=${JSON.stringify(PROFILE.name)};i.dispatchEvent(new Event('input',{bubbles:true}));
 for(const s of ['[data-pob="gender"][data-value="boy"]','[data-pob="next"]','[data-pob="next"]','[data-pob="stage"][data-value="primaire"]','[data-pob="grade"][data-value="${PROFILE.grade}"]','[data-pob="next"]','[data-pob="companion"][data-value="finot"]','[data-pob="next"]','[data-pob="level"][data-value="ok"]','[data-pob="confidence"][data-value="medium"]','[data-pob="help"][data-value="try"]','[data-pob="next"]','[data-pob="goal"][data-value="understand"]','[data-pob="pace"][data-value="balanced"]','[data-pob="next"]','[data-pob="finish"]']){c(s);await w(250);}
 await w(800);try{diagExit&&diagExit()}catch(e){}ACT.home();await w(300);return {name:S.name,grade:S.grade,cur:CUR}})()`;

/* Progression fictive crédible : réponses enregistrées par le moteur adaptatif, étoiles, XP, série, badges, journal d'activité. */
export const SEED_JS = `(async()=>{${W}
 const today=(()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')})();
 const subjects=['p-maths','p-francais','p-anglais','p-sciences','p-hg'];const seeded=[];
 for(const sj of subjects){let list=[];try{list=SCH(sj).filter(c=>WMAP[c.id]&&WMAP[c.id].lvl===S.grade).slice(0,sj==='p-maths'?7:4);}catch(e){}
  list.forEach((ch,i)=>{const tot=10+((i*3)%8),ok=Math.min(tot,Math.round(tot*(0.95-i*0.07)));const stars=ok/tot>0.9?3:ok/tot>0.75?2:1;
   S.chap[ch.id]={...(S.chap[ch.id]||{}),ok,tot,stars,best:Math.round(ok/tot*100),last:today};
   try{for(let k=0;k<tot-ok;k++)MQAdaptive.recordAnswer(S,ch.id,false,{});for(let k=0;k<ok+4;k++)MQAdaptive.recordAnswer(S,ch.id,true,{});}catch(e){}
   seeded.push(ch.id);});}
 S.subj='p-maths';S.xp=1840;S.coins=320;S.streak={n:6,best:9,last:today};S.totalOk=412;S.totalQ=506;S.time=7260;S.missions=23;S.goalsDone=5;S.bestCombo=11;
 S.daily={date:today,ok:14,done:false};
 try{const ids=BADGES.map(b=>b[0]).slice(0,7);S.badges=ids.slice();S.badgeDates=Object.fromEntries(ids.map(id=>[id,today]));
  BADGES.forEach(b=>{try{if(!S.badges.includes(b[0])&&b[4](S)){S.badges.push(b[0]);S.badgeDates[b[0]]=today;}}catch(e){}});}catch(e){}   // badges déjà mérités : aucun popup « Nouveau badge » pendant les captures
 try{const log=[];const now=Date.now();for(let i=0;i<16;i++){const cid=seeded[(i*3)%seeded.length],day=Math.floor(i/3),t1=now-day*86400000-((i%3)*5400000)-3600000,ms=(5+((i*7)%9))*60000,lesson=i%4===1,total=lesson?5:10,ok=Math.max(5,total-((i*5)%4));
  log.push({id:'a'+t1.toString(36)+i,t0:t1-ms,t1,ms,kind:lesson?'lesson':'exercise',ids:[cid],grade:S.grade,subj:(WMAP[cid]&&sOf(WMAP[cid].id).id)||'p-maths',reason:lesson?'lesson-end':'exercise-end',cid,ok,total});}S.activityLog=log;}catch(e){}
 // journal de réponses (taux de réussite du tableau de bord parent) : 140 réponses sur 7 jours, ~80 % justes ; leçons validées (programme)
 try{const al=[],now2=Date.now();for(let i=0;i<140;i++){const cid=seeded[i%seeded.length];al.push({t:now2-Math.floor(i/20)*86400000-(i%20)*180000-120000,cid,ok:(i%5)!==3,ms:9000+((i*37)%11000),source:'ex'});}S.answerLog=al.sort((a,b)=>a.t-b.t);
  S.lessons=S.lessons||{};seeded.slice(0,14).forEach((id,k)=>{S.lessons[id]=now2-k*43200000;});}catch(e){}
 save();ACT.home();await w(500);return {seeded:seeded.length,xp:S.xp,badges:(S.badges||[]).length,chap:Object.keys(S.chap).length}})()`;

/* Tire une question d'exercice jusqu'à ce que le prédicat soit vrai (sans y répondre). */
const exerciseJs = (subject, pred, maxTries = 40, chapterId = '') => `(async()=>{${W}ACT.home();await w(200);
 const list=${chapterId ? `[{id:${JSON.stringify(chapterId)}}]` : `SCH(${JSON.stringify(subject)}).filter(c=>WMAP[c.id]&&WMAP[c.id].lvl===S.grade)`};let info=null;
 for(let k=0;k<${maxTries}&&!info;k++){const id=list[k%list.length].id;ACT.start(id);await w(60);ACT.startlevel(id+'|2');await w(450);
  try{if(${pred})info={id,cur:CUR};}catch(e){}}
 return info||{none:true,cur:CUR}})()`;
const CHOICES = `document.querySelectorAll('#app .choice').length>=3&&(document.querySelector('#app .q,#app h2,#app .qtext')||{textContent:''}).textContent.length>12`;

export const SCREENS = [
  { id: 'accueil', n: '01', title: 'Accueil élève', description: 'Accueil de Léo (CM1) : Finot, séance personnalisée, aide aux devoirs',
    js: `(async()=>{${W}ACT.home();await w(600);window.scrollTo(0,0);return CUR})()`, expect: `CUR==='home'&&S.name===${JSON.stringify(PROFILE.name)}&&!!document.querySelector('.hometabs.show')` },
  { id: 'matieres', n: '02', title: 'Matières', description: 'Choix des matières et des mondes de cours',
    js: `(async()=>{${W}ACT.home();await w(300);document.querySelector('[data-a="hometab:matieres"]').click();await w(800);window.scrollTo(0,0);return CUR})()`, expect: `!!document.querySelector('[data-a^="subj:"]')` },
  { id: 'cours', n: '03', title: 'Cours illustré', description: 'Leçon illustrée de sciences CM1 : Les phases de la Lune',
    js: `(async()=>{${W}ACT.home();await w(200);ACT.lesson('cm1-sc-lune');await w(500);const lv=document.querySelector('[data-a^="lessonlevel:"]');if(lv){lv.click();await w(900);}
     try{L.i=0;renderLesson();await w(900);}catch(e){}let n=0;while(n++<24){const im=document.querySelector('#app img[src*="lecons"]');if(im&&im.complete&&im.naturalWidth>0)break;await w(250);}return CUR})()`,
    expect: `CUR==='lesson'&&!!document.querySelector('#app img[src*="lecons"]')` },
  { id: 'exercice', n: '04', title: 'Exercice', description: 'Question à choix avec indices et aide de Finot',
    js: exerciseJs('p-maths', CHOICES, 40, 'cm1-ma-solides'), expect: CHOICES },
  { id: 'correction', n: '05', title: 'Correction', description: 'Réponse fausse : correction expliquée et suite de l’exercice',
    js: `(async()=>{${W}const r=await ${exerciseJs('p-maths', CHOICES, 40, 'cm1-ma-solides')};
     const ch=[...document.querySelectorAll('#app .choice')];const ans=(typeof M!=='undefined'&&M&&M.q&&typeof M.q.ans==='number')?M.q.ans:0;const bad=ch.find((e,i)=>i!==ans)||ch[0];bad.click();await w(1200);return r})()`,
    expect: `!!document.querySelector('#app .fb,#app .feedback,#app .bad,#app .wrong,#app .mq-corr')||/J’ai compris|Continuer|Suivant/.test(document.querySelector('#app').innerText)` },
  { id: 'parcours', n: '06', title: 'Parcours personnalisé', description: 'Parcours adapté au niveau de Léo',
    js: `(async()=>{${W}ACT.home();await w(300);ACT.path();await w(900);window.scrollTo(0,0);return CUR})()`, expect: `CUR==='path'||/parcours/i.test(document.querySelector('#app').innerText)` },
  { id: 'lecture', n: '07', title: 'Lecture', description: 'Bibliothèque de lecture : un texte de CM1',
    js: `(async()=>{${W}ACT.home();await w(300);ACT.library();await w(500);const lv=document.querySelector('[data-a="liblvl:CM1"]');if(lv){lv.click();await w(600);}
     const t=document.querySelector('[data-a^="libopen:"]');if(t){t.click();await w(900);}window.scrollTo(0,0);return CUR})()`, expect: `CUR==='library'||CUR==='reading'||!!document.querySelector('[data-a^="libopen:"],#app .reading,#app .lbody')` },
  { id: 'dictee', n: '08', title: 'Dictée', description: 'Dictée : écoute de la phrase et saisie avec accents',
    // la phrase est lue automatiquement : on attend la fin de la lecture pour que le bouton audio soit au repos (pas de « stop » orange)
    js: `(async()=>{const r=await ${exerciseJs('p-francais', `typeof isDictation==='function'&&M&&M.q&&isDictation(M.q)`, 40, 'cm1-fr-dictee')};let n=0;while(n++<80&&typeof TTS!=='undefined'&&TTS.playing)await new Promise(x=>setTimeout(x,250));try{if(typeof TTS!=='undefined'&&TTS.playing)ttsStop();}catch(e){}await new Promise(x=>setTimeout(x,900));return r})()`, expect: `!!document.querySelector('#in0')&&/Écoute et écris/.test(document.querySelector('#app').innerText)&&typeof isDictation==='function'&&isDictation(M.q)` },   // pas d'exigence sur le bouton audio : absent là où la synthèse vocale n'existe pas (Chromium de CI)
  { id: 'finot-chat', n: '09', title: 'Assistant Finot', description: 'Finot ouvert : question « C’est quoi les XP ? » et sa réponse',
    js: `(async()=>{${W}ACT.home();await w(300);finotOpen();await w(700);const b=document.querySelector('#finotchat [data-a="finotsug:0"]');if(b){b.click();await w(1800);}
     const c=document.getElementById('fchBody');const u=c&&c.querySelector('.fch-msg.you');if(c&&u)c.scrollTop=Math.max(0,u.offsetTop-c.offsetTop-10);return !!b})()`, expect: `!!document.querySelector('#fchBody .fch-msg.you')`,
    after: `try{finotClose()}catch(e){}` },
  { id: 'progression', n: '10', title: 'Progression', description: 'Niveau, étoiles, série de jours et réussite',
    js: `(async()=>{${W}ACT.home();await w(300);document.querySelector('[data-a="hometab:progres"]').click();await w(800);window.scrollTo(0,0);return CUR})()`, expect: `/Ma progression/.test(document.querySelector('#app').innerText)&&!!document.querySelector('.prog-kpis')` },
  { id: 'espace-parents', n: '11', title: 'Espace parents', description: 'Vue rapide parent : temps de travail, exercices, leçons, matières',
    js: `(async()=>{${W}ACT.home();await w(300);document.querySelector('[data-a="hometab:plus"]').click();await w(400);document.querySelector('[data-a=parent]').click();await w(700);
     const p=document.querySelector('#pin'),p2=document.querySelector('#pin2');if(p){p.value='4827';p.dispatchEvent(new Event('input',{bubbles:true}));if(p2){p2.value='4827';p2.dispatchEvent(new Event('input',{bubbles:true}));}
      [...document.querySelectorAll('button')].find(x=>/Créer le code/.test(x.textContent))?.click();await w(900);[...document.querySelectorAll('button')].find(x=>/C’est noté/.test(x.textContent))?.click();await w(900);}
     try{parentScreen('suivi');await w(600);}catch(e){}
     const h=[...document.querySelectorAll('#app h2,#app h3,#app .eyebrow,#app b')].find(e=>/Vue rapide parent/.test(e.textContent));
     if(h){const card=h.closest('.card')||h.parentElement;window.scrollTo(0,Math.max(0,card.getBoundingClientRect().top+scrollY-12));}await w(500);return {parent:PARENT,found:!!h}})()`,
    expect: `PARENT===true&&/Vue rapide parent/.test(document.querySelector('#app').innerText)`, after: `try{PARENT=false;ACT.home()}catch(e){}` },
];

export const fileName = (screen, kind) => kind === 'tablet' ? `${screen.n}-tablet-${screen.id}.png` : `${screen.n}-${screen.id}.png`;

// ---------------------------------------------------------------- partie ADB (ignorée par les tests)
const here = dirname(fileURLToPath(import.meta.url));
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const args = process.argv.slice(2);
  const val = f => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
  const serial = val('--serial'), kind = val('--kind');
  if (!serial || !['phone', 'tablet'].includes(kind)) { console.error('Usage : node tools/store-screenshots.mjs --serial <adb> --kind phone|tablet [--apk chemin] [--only ids] [--out dossier] [--rotation 0]'); process.exit(2); }
  const { connect } = await import('./android-cdp.mjs');
  const sdk = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT || join(process.env.LOCALAPPDATA || '', 'Android', 'Sdk');
  const ADB = join(sdk, 'platform-tools', process.platform === 'win32' ? 'adb.exe' : 'adb');
  if (!existsSync(ADB)) { console.error('adb introuvable : ' + ADB); process.exit(2); }
  const outRoot = resolve(val('--out') || join(here, '..', 'artifacts', 'google-play', 'store-screens'));
  const out = join(outRoot, kind); mkdirSync(out, { recursive: true });
  const only = (val('--only') || '').split(',').filter(Boolean);
  const apk = val('--apk') || join(here, '..', 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
  const PORT = 9440;
  const adb = (...a) => { try { return execFileSync(ADB, ['-s', serial, ...a], { encoding: 'utf8', timeout: 180000 }).trim(); } catch (e) { return 'ERR ' + (e.stdout || '') + (e.message || ''); } };
  let c = null;
  const attach = async () => { for (let k = 0; k < 30; k++) { try { const pid = adb('shell', 'pidof', PKG).split(/\s+/)[0]; if (!pid || pid.startsWith('ERR')) throw 0; adb('forward', `tcp:${PORT}`, `localabstract:webview_devtools_remote_${pid}`); c = await connect(PORT); await c.evaluate('document.readyState'); return; } catch (e) { await sleep(2000); } } throw new Error('WebView injoignable'); };
  const ev = (x, t) => c.evaluate(x, t);
  const launch = async () => { if (c) { try { c.close(); } catch (e) { } } adb('shell', 'am', 'force-stop', PKG); adb('shell', 'am', 'start', '-W', '-n', `${PKG}/fr.finot.academie.MainActivity`); await sleep(2000); await attach();
    for (let k = 0; k < 40; k++) { if ((await ev('typeof S!=="undefined"&&!!S&&document.readyState==="complete"')) === true) break; await sleep(500); } await sleep(1000); };
  const demo = on => { if (!on) { adb('shell', 'am', 'broadcast', '-a', 'com.android.systemui.demo', '-e', 'command', 'exit'); adb('shell', 'settings', 'put', 'global', 'sysui_demo_allowed', '0'); return; }
    adb('shell', 'settings', 'put', 'global', 'sysui_demo_allowed', '1'); const d = (...a) => adb('shell', 'am', 'broadcast', '-a', 'com.android.systemui.demo', '-e', 'command', ...a);
    d('enter'); d('clock', '-e', 'hhmm', '1010'); d('battery', '-e', 'level', '100', '-e', 'plugged', 'false'); d('network', '-e', 'wifi', 'show', '-e', 'level', '4', '-e', 'fully', 'true'); d('network', '-e', 'mobile', 'hide'); d('notifications', '-e', 'visible', 'false'); };
  const clean = () => ev(`(()=>{try{const t=document.getElementById('toast');if(t){t.classList.remove('show');t.textContent=''}}catch(e){}try{const c=document.getElementById('celeb');if(c)c.classList.remove('show');}catch(e){}document.activeElement&&document.activeElement.blur&&document.activeElement.blur();})()`);
  const settle = async () => { await clean(); await sleep(2800); await clean();   // laisse passer d'éventuels popups différés (célébrations) puis les retire
    for (let k = 0; k < 20; k++) { const busy = await ev(`!!document.querySelector('.view-pop,.confetti,.pop-in')||document.getAnimations().some(a=>a.playState==='running'&&a.effect&&a.effect.getTiming&&a.effect.getTiming().iterations!==Infinity)`); if (busy !== true) break; await sleep(300); } await sleep(1200); };

  if (process.env.SETUP !== '0') {
    adb('shell', 'cmd', 'uimode', 'night', 'no'); adb('shell', 'settings', 'put', 'system', 'font_scale', '1.0'); adb('shell', 'wm', 'density', 'reset');
    if (existsSync(apk)) { adb('uninstall', PKG); const r = adb('install', '-r', apk); if (!/Success/.test(r)) throw new Error('installation : ' + r); } else console.log('APK absent, application déjà installée supposée : ' + apk);
    await launch(); console.log('profil', JSON.stringify(await ev(ONBOARDING_JS))); console.log('progression', JSON.stringify(await ev(SEED_JS)));
  } else await launch();
  demo(true); await sleep(1500);
  const rot = kind === 'tablet' ? (val('--rotation') || '0') : '0';
  adb('shell', 'settings', 'put', 'system', 'accelerometer_rotation', '0'); adb('shell', 'settings', 'put', 'system', 'user_rotation', rot); adb('shell', 'cmd', 'window', 'user-rotation', 'lock', rot); await sleep(2500);
  const model = adb('shell', 'getprop', 'ro.product.model'), api = +adb('shell', 'getprop', 'ro.build.version.sdk'), release = adb('shell', 'getprop', 'ro.build.version.release');
  const root = resolve(here, '..').replace(/\\/g, '/');
  let sha = ''; try { sha = execFileSync('git', ['-c', `safe.directory=${root}`, 'rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(); } catch (e) { }
  const manifest = { generated: new Date().toISOString().slice(0, 10), git: sha, kind, serial, device: model, android: release, api, profil: `${PROFILE.name} (${PROFILE.grade}), données fictives`, captures: [] };
  // --only : on conserve les captures déjà listées pour les écrans non rejoués (le manifeste reste complet)
  let previous = []; try { previous = JSON.parse(readFileSync(join(out, 'manifest.json'), 'utf8')).captures || []; } catch (e) { }
  const failures = [];
  try {
    for (const s of SCREENS) {
      if (only.length && !only.includes(s.id) && !only.includes(`${s.n}-${s.id}`)) continue;
      let ok = false, info = null;
      for (let t = 0; t < 3 && !ok; t++) {   // jusqu'à 3 essais : un écran n'est accepté que si l'attente produit est vraie
        try { info = await ev(s.js, 90000); await sleep(400); ok = (await ev(`!!(${s.expect})`)) === true; } catch (e) { info = String(e.message).slice(0, 120); }
        if (!ok) { await ev('ACT.home()').catch(() => { }); await sleep(600); } }
      if (!ok) { failures.push(s.id); console.log(`ÉCHEC ${s.id} : écran non obtenu (${JSON.stringify(info)})`); continue; }
      await settle();
      const buf = execFileSync(ADB, ['-s', serial, 'exec-out', 'screencap', '-p'], { maxBuffer: 128 << 20 });
      const file = fileName(s, kind); writeFileSync(join(out, file), buf);
      const width = buf.readUInt32BE(16), height = buf.readUInt32BE(20);
      if (buf.length < 60000) { failures.push(s.id + ' (image presque vide)'); console.log(`ÉCHEC ${s.id} : image trop légère (${buf.length} o)`); continue; }
      manifest.captures.push({ fichier: `${kind}/${file}`, ecran: s.title, description: s.description, largeur: width, hauteur: height, orientation: width > height ? 'paysage' : 'portrait', octets: buf.length });
      console.log(`capture ${file} ${width}x${height}`);
      if (s.after) await ev(s.after).catch(() => { });
    }
  } finally { demo(false); }
  const fresh = new Set(manifest.captures.map(c => c.fichier));
  manifest.captures = [...previous.filter(c => !fresh.has(c.fichier) && existsSync(join(outRoot, c.fichier))), ...manifest.captures].sort((a, b) => a.fichier.localeCompare(b.fichier));
  writeFileSync(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  if (failures.length) { console.error('ÉCHECS : ' + failures.join(', ')); process.exit(1); }
  console.log(`OK : ${manifest.captures.length} captures dans ${out}`);
  process.exit(0);
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(e => { console.error('CRASH', e.stack); process.exit(1); });
