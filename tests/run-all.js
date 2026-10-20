/* Lance toute la suite de tests MathQuest, chaque suite dans son propre processus Node.
   Une sous-suite est ÉCHOUÉE si : code de sortie ≠ 0, OU au moins un « ❌ FAIL » affiché, OU aucune ligne « BILAN PASS=… FAIL=… ».
   Le processus run-all se termine avec le code 1 si une seule sous-suite échoue.
   Usage : node run-all.js            (toutes les suites)
           SUITES=data,hang node run-all.js   (sélection, utile pour les tests du système de tests) */
const {spawnSync}=require('child_process');const path=require('path');
const ALL=[
  ['selftest','Système de tests','selftest.test.js',[]],
  ['data','Données','data.test.js',[]],
  ['generic','Contenu générique','generic-content.test.js',[]],
  ['college','Chapitres collège reconstruits','college-check.test.js',[]],
  ['hang','Générateurs (boucles)','hang.test.js',[]],
  ['fuzz','Fuzzing','fuzz.test.js',[process.env.FUZZ_N||'500']],
  ['math','Cohérence mathématique','math-check.test.js',[]],
  ['coverage','Couverture des programmes CP→CM2','coverage.test.js',[]],
  ['lang','Qualité linguistique et brouillons','language.test.js',[]],
  ['audio','Audio','audio.test.js',[]],
  ['dictation','Dictée','dictation.test.js',[]],
  ['e2e','Parcours navigateur','e2e.test.js',[]],
  ['regression','Non-régression CP → 3e','regression.test.js',[]],
  ['saves','Sauvegardes','saves.test.js',[]],
  ['security','Sécurité import / affichage (XSS)','security.test.js',[]],
  ['perf','Performance (poids, démarrage)','perf.test.js',[]],
  ['pwa','Hors ligne / PWA','pwa.test.js',[]],
  ['offline','Hors ligne réel (serveur coupé)','offline-real.test.js',[]],
  ['finot','Assistant Finot','finot-assistant.test.js',[]],
  ['celeb','Célébration (badges, palier de lien)','celebration.test.js',[]],
  ['a11y','Accessibilité (aria-live, PIN suppression, contraste)','accessibility.test.js',[]],
  ['birthdate','Date de naissance facultative et anniversaire','birthdate.test.js',[]],
  ['reading','Lecture et compréhension','reading.test.js',[]],
  ['path','Parcours du jour','path.test.js',[]],
  ['lexicon','Lexique illustré','lexicon.test.js',[]],
  ['chapcats','Catégories des chapitres et devoir du jour','chapter-categories.test.js',[]],
  ['lessonimg','Images des leçons et crédits','lesson-images.test.js',[]],
  ['atlas','Atlas du monde (pays, drapeaux, cartes)','atlas.test.js',[]],
  ['hooks','Architecture : points d’extension, réponse unique, écran de mission isolé','hooks.test.js',[]],
  ['mobile','Mise en page mobile (5 tailles, Chromium + WebKit, géométrie réelle)','mobile-layout.test.js',[]],
  ['pwaupdate','Mise à jour de l’appli installée (N → N+1, version, hors ligne)','pwa-update.test.js',[]],
  ['scenarios','Scénarios réels (migration, stockage corrompu, profils, rechargements, parcours)','scenarios.test.js',[]],
  ['keyboard','Accessibilité clavier et noms accessibles','keyboard-a11y.test.js',[]],
];
const fs=require('fs');
function runSuite([key,name,file,args]){
  const f=path.resolve(__dirname,file);if(!fs.existsSync(f))return {key,name,ok:false,pass:0,fail:1,ms:0,why:'fichier de test absent : '+file,out:''};
  const t0=Date.now();const r=spawnSync(process.execPath,[f,...args],{cwd:__dirname,encoding:'utf8',maxBuffer:256*1024*1024,timeout:+(process.env.SUITE_TIMEOUT||1800000)});
  const out=(r.stdout||'')+(r.stderr||'');const m=[...out.matchAll(/BILAN PASS=(\d+) FAIL=(\d+)/g)].pop();
  const pass=m?+m[1]:0,fail=m?+m[2]:0;const reds=(out.match(/❌ FAIL/g)||[]).length;
  const why=[];if(r.status!==0)why.push('code de sortie '+(r.status===null?'(interrompu : '+(r.signal||'timeout')+')':r.status));if(!m)why.push('pas de ligne BILAN');if(reds)why.push(reds+' assertion(s) rouge(s)');if(fail)why.push(fail+' échec(s) déclaré(s)');
  return {key,name,ok:!why.length,pass,fail:Math.max(fail,reds,why.length?1:0),ms:Date.now()-t0,why:why.join(', '),out};
}
if(require.main===module){
  const sel=process.env.SUITES?process.env.SUITES.split(','):null;const suites=ALL.filter(s=>!sel||sel.includes(s[0]));
  const res=[];const t0=Date.now();
  for(const s of suites){process.stdout.write(`\n=== ${s[1]} (${s[2]}) ===\n`);const r=runSuite(s);process.stdout.write(r.out);
    console.log(`→ ${r.ok?'✅ SUITE OK':'❌ SUITE ÉCHOUÉE'} : ${r.pass} PASS, ${r.fail} FAIL, ${Math.round(r.ms/1000)} s${r.why?' ('+r.why+')':''}`);res.push(r);}
  console.log('\n================ BILAN GLOBAL ================');
  for(const r of res)console.log(`${r.ok?'✅':'❌'} ${r.name.padEnd(36)} PASS ${String(r.pass).padStart(4)}  FAIL ${String(r.fail).padStart(3)}  ${String(Math.round(r.ms/1000)).padStart(4)} s${r.why?'  '+r.why:''}`);
  const P=res.reduce((a,r)=>a+r.pass,0),F=res.reduce((a,r)=>a+r.fail,0),bad=res.filter(r=>!r.ok).length+(res.length?0:1);
  console.log(`\nTOTAL : ${P} PASS, ${F} FAIL, ${bad} suite(s) échouée(s) sur ${res.length} — durée ${Math.round((Date.now()-t0)/1000)} s`);
  console.log(bad?'RÉSULTAT : ÉCHEC':'RÉSULTAT : SUCCÈS');process.exitCode=bad?1:0;
}
module.exports={runSuite,ALL};
