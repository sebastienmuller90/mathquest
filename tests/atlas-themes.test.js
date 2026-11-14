/* Atlas : thèmes détaillés (data/atlas-eau.js, atlas-relief.js, atlas-france.js, js/app-atlas-themes.js) — 14/11/2026.
   Volumes et cohérence des données (liens pays, régions, départements), sources citées, écrans (accueil, liste, filtre, tri,
   recherche, fiche, liens croisés, tableau sous les cartes), hors ligne, 360 px, aucune erreur JavaScript. */
const fs=require('fs'),path=require('path');const {serve,launch,ROOT,seedProfile}=require('./lib');
async function run(){const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d).slice(0,700)});
  const {srv,url}=await serve();const b=await launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});await p.evaluate(()=>{try{localStorage.clear();}catch(e){}});await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Testeur','6e');await p.waitForTimeout(150);
  await p.evaluate(()=>ACT.atlas());await p.waitForTimeout(100);

  // ---------- données ----------
  const d=await p.evaluate(()=>{const A=window.MQ_ATLAS_T,P=window.MQ_ATLAS.pays,n={},bad={noName:[],noSrc:[],junk:[],noText:[],badIso:[],badSrcHost:[]};
    for(const k of Object.keys(A)){if(k==='__done')continue;n[k]=Object.keys(A[k]).length;
      for(const [s,o] of Object.entries(A[k])){const id=k+'.'+s;
        if(!o.n)bad.noName.push(id);if(!o.src)bad.noSrc.push(id);else if(!/^https:\/\/fr\.(vikidia|wikipedia)\.org\//.test(o.src))bad.badSrcHost.push(id);
        if(!(o.bref||[]).length)bad.noText.push(id);
        if((o.bref||[]).some(t=>/<|\{\{|siècle\?|millénaire\?/.test(t)))bad.junk.push(id);
        for(const i of (o.pays||[]))if(!P[i])bad.badIso.push(id+':'+i);}}
    const R=A.regions,D=A.departements,broken=[];
    for(const r of Object.keys(R))for(const x of (R[r].deps||[]))if(!D[x])broken.push(r+'>'+x);
    for(const x of Object.keys(D)){if(!R[D[x].reg])broken.push('reg:'+x);for(const v of (D[x].voisins||[]))if(!D[v])broken.push('voisin:'+x+'>'+v);}
    const sumDeps=Object.values(R).reduce((a,r)=>a+(r.deps||[]).length,0);
    const rhone=D.rhone||D['rhone-69']||Object.values(D).find(o=>o.code==='69');
    return {n,bad,broken,sumDeps,popFR:Object.values(D).reduce((a,o)=>a+(o.pop||0),0),
      paris:Object.values(D).find(o=>o.code==='75'),ev:A.fleuves.loire||Object.values(A.fleuves).find(o=>/^Loire$/.test(o.n)),mb:Object.values(A.montagnes).find(o=>/Mont Blanc/i.test(o.n)),
      rhone:rhone&&{n:rhone.n,pref:rhone.pref}};});
  const N=d.n;
  T('Volumes : 5 océans, ≥ 60 mers, ≥ 150 cours d’eau, ≥ 75 lacs, ≥ 150 montagnes, ≥ 80 îles, ≥ 30 déserts, 7 continents, 18 régions, 101 départements',
    N.oceans===5&&N.mers>=60&&N.fleuves>=150&&N.lacs>=75&&N.montagnes>=150&&N.iles>=80&&N.deserts>=30&&N.continents===7&&N.regions===18&&N.departements===101,JSON.stringify(N));
  T('Chaque fiche : nom, texte, source Vikidia ou Wikipédia ; aucun résidu de balise ; tous les pays cités existent dans l’atlas',
    !d.bad.noName.length&&!d.bad.noSrc.length&&!d.bad.noText.length&&!d.bad.junk.length&&!d.bad.badIso.length&&!d.bad.badSrcHost.length,JSON.stringify({noName:d.bad.noName.slice(0,5),noSrc:d.bad.noSrc.slice(0,5),noText:d.bad.noText.slice(0,5),junk:d.bad.junk.slice(0,5),badIso:d.bad.badIso.slice(0,5),badSrcHost:d.bad.badSrcHost.slice(0,5)}));
  T('France : 101 départements répartis dans les 18 régions, aucun lien région/département/voisin cassé, population totale plausible (60 à 72 millions)',
    d.sumDeps===101&&!d.broken.length&&d.popFR>6e7&&d.popFR<7.2e7,JSON.stringify({sum:d.sumDeps,broken:d.broken.slice(0,6),pop:d.popFR}));
  T('Exactitude : Paris (75), Rhône (69, préfecture Lyon), Loire, Mont Blanc ≈ 4 800 m',
    d.paris&&d.paris.pref==='Paris'&&d.rhone&&/Lyon/.test(d.rhone.pref||'')&&d.ev&&d.ev.km>900&&d.ev.km<1100&&d.mb&&d.mb.alt>4700&&d.mb.alt<4900,JSON.stringify({paris:d.paris&&d.paris.pref,rhone:d.rhone,loire:d.ev&&d.ev.km,mb:d.mb&&d.mb.alt}));
  const pre=require('./lib').swPrecache();
  T('Hors ligne : les trois fichiers de données et le script des thèmes sont pré-cachés',['data/atlas-eau.js','data/atlas-relief.js','data/atlas-france.js','js/app-atlas-themes.js'].every(f=>pre.includes(f)),pre.filter(f=>/atlas/.test(f)).join(','));

  // ---------- accueil ----------
  await p.evaluate(()=>ACT.atlas());await p.waitForTimeout(100);
  const h=await p.evaluate(()=>({tiles:[...document.querySelectorAll('.atlcol')].map(x=>x.dataset.a),cards:document.querySelectorAll('.atlcard').length,n:Object.keys(MQ_ATLAS.pays).length}));
  T('Accueil de l’atlas : 10 tuiles de thèmes, liste des pays toujours présente',h.tiles.length===10&&h.cards===h.n,JSON.stringify({tiles:h.tiles.length,cards:h.cards,n:h.n}));

  // ---------- liste, tri, filtre, recherche, fiche ----------
  await p.click('[data-a="atlcol:fleuves"]');await p.waitForSelector('.atlrow');
  const l1=await p.evaluate(()=>({rows:document.querySelectorAll('.atlrow').length,first:document.querySelector('.atlrow b').textContent,cur:CUR}));
  await p.click('[data-a="atlcolf:sort:az"]');await p.waitForTimeout(60);
  const az=await p.evaluate(()=>[...document.querySelectorAll('.atlrow-main b')].map(x=>x.textContent));
  const sorted=[...az].sort((a,b)=>a.localeCompare(b,'fr'));
  await p.click('[data-a="atlcolf:c:afrique"]');await p.waitForTimeout(60);
  const af=await p.evaluate(()=>[...document.querySelectorAll('.atlrow-main b')].map(x=>x.textContent));
  await p.click('[data-a="atlcolf:c:"]');await p.fill('#atlq2','loire');await p.waitForTimeout(80);
  const q=await p.evaluate(()=>[...document.querySelectorAll('.atlrow-main b')].map(x=>x.textContent));
  T('Liste des cours d’eau : 150+ lignes, tri A→Z exact, filtre Afrique (Nil oui, Loire non), recherche « loire »',
    l1.cur==='atlas'&&l1.rows>=150&&JSON.stringify(az)===JSON.stringify(sorted)&&af.length>5&&af.length<l1.rows&&af.some(x=>/^Nil/.test(x))&&!af.includes('Loire')&&q.length>=1&&q.length<10&&q.includes('Loire'),JSON.stringify({rows:l1.rows,afr:af.length,q}));
  await p.click('.atlrow');await p.waitForTimeout(150);
  const f1=await p.evaluate(()=>({t:document.querySelector('#app').innerText,facts:document.querySelectorAll('.atlfacts .frow').length,src:/Texte :/.test(document.querySelector('.atlcred')?.innerText||''),back:!!document.querySelector('[data-a="atlcol:fleuves"]')}));
  T('Fiche d’un cours d’eau : chiffres, texte « En bref », sources citées, retour vers la liste',f1.facts>=2&&/En bref/.test(f1.t)&&f1.src&&f1.back,JSON.stringify({facts:f1.facts,src:f1.src,back:f1.back}));

  // ---------- France : régions → départements → voisins ----------
  await p.evaluate(()=>ACT.atlcol('regions'));await p.waitForSelector('.atlrow');
  const reg=await p.evaluate(()=>document.querySelectorAll('.atlrow').length);
  await p.evaluate(()=>ACT.atlcol('departements'));await p.waitForSelector('.atlrow');
  const dep={all:await p.evaluate(()=>document.querySelectorAll('.atlrow').length)};
  await p.selectOption('#atlreg',{index:3});await p.waitForTimeout(80);
  dep.filtered=await p.evaluate(()=>document.querySelectorAll('.atlrow').length);
  await p.fill('#atlq2','69');await p.selectOption('#atlreg','');await p.waitForTimeout(80);
  dep.q69=await p.evaluate(()=>[...document.querySelectorAll('.atlrow-main b')].map(x=>x.textContent));
  T('France : 18 régions ; 101 départements, filtre par région, recherche par numéro « 69 » (Rhône)',reg===18&&dep.all===101&&dep.filtered>0&&dep.filtered<101&&dep.q69.some(x=>/Rhône/.test(x)),JSON.stringify({reg,dep}));
  await p.click('.atlrow');await p.waitForTimeout(150);
  const nav=await p.evaluate(()=>({reg:!!document.querySelector('[data-a^="atlit:regions."]'),voisins:document.querySelectorAll('[data-a^="atlit:departements."]').length}));
  await p.click('[data-a^="atlit:departements."]');await p.waitForTimeout(120);
  const nav2=await p.evaluate(()=>/Préfecture/.test(document.querySelector('#app').innerText));
  await p.click('[data-a^="atlit:regions."]');await p.waitForTimeout(120);
  const nav3=await p.evaluate(()=>({deps:document.querySelectorAll('[data-a^="atlit:departements."]').length,chef:/Chef-lieu/.test(document.querySelector('#app').innerText)}));
  T('Liens croisés : département → région et départements voisins ; région → ses départements',nav.reg&&nav.voisins>=1&&nav2&&nav3.deps>=1&&nav3.chef,JSON.stringify({nav,nav2,nav3}));

  // ---------- pays cités et grandes cartes ----------
  await p.evaluate(()=>ACT.atlit('lacs.'+Object.keys(MQ_ATLAS_T.lacs).find(s=>(MQ_ATLAS_T.lacs[s].pays||[]).length)));await p.waitForSelector('.atlfacts');
  await p.click('.atllinks [data-a^="atlpays:"]');await p.waitForTimeout(150);
  T('Lien d’une fiche vers la fiche du pays concerné',await p.evaluate(()=>CUR==='atlas'&&!!document.querySelector('.atlhead')),'');
  await p.evaluate(()=>ACT.atlcarte('europe'));await p.waitForTimeout(120);
  const eu=await p.evaluate(()=>({rows:document.querySelectorAll('.atltable tbody tr').length,link:!!document.querySelector('.atllinkbtn'),all:!!document.querySelector('[data-a="atlcol:pays"]')}));
  T('Carte de l’Europe : tableau des pays (capitale, habitants, superficie) avec liens, accès à la liste mondiale',eu.rows>=40&&eu.link&&eu.all,JSON.stringify(eu));
  const ex=await p.evaluate(()=>['monde-oceans','monde-continents','france-regions','monde-relief'].map(id=>{ACT.atlcarte(id);return !!document.querySelector('.atlextra [data-a^="atlcol:"]');}));
  T('Cartes du monde, des continents, du relief et des régions : boutons vers les listes détaillées',ex.every(Boolean),JSON.stringify(ex));
  await p.evaluate(()=>ACT.atlcol('pays'));await p.waitForSelector('.atlrow');
  const pays=await p.evaluate(()=>document.querySelectorAll('.atlrow').length);
  T('Liste détaillée des pays : tous les pays et territoires',pays===h.n,pays+' / '+h.n);

  // ---------- 360 px ----------
  await p.setViewportSize({width:360,height:740});const over=[];
  for(const a of [()=>ACT.atlas(),()=>ACT.atlcol('fleuves'),()=>ACT.atlcol('departements'),()=>ACT.atlcol('continents'),()=>ACT.atlit('departements.'+Object.keys(MQ_ATLAS_T.departements)[0]),()=>ACT.atlit('regions.'+Object.keys(MQ_ATLAS_T.regions)[0]),()=>ACT.atlit('montagnes.'+Object.keys(MQ_ATLAS_T.montagnes)[0]),()=>ACT.atlcarte('europe')]){
    await p.evaluate(a);await p.waitForTimeout(150);over.push(await p.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth));}
  T('360 px : aucun débordement horizontal (accueil, listes, fiches, tableau)',over.every(x=>x<=1),over.join(','));
  T('Aucune erreur JavaScript',!errs.length,errs.join(' | '));
  await b.close();srv.close();return R;}
if(require.main===module)require('./lib').main(()=>run());
module.exports=run;
