/* ===== Atlas : thèmes détaillés (12/11/2026) — continents, océans et mers, fleuves, lacs, montagnes, îles, déserts,
   régions et départements de France, liste détaillée des pays. Données : data/atlas-eau.js, atlas-relief.js, atlas-france.js
   (window.MQ_ATLAS_T), chargées par index.html et servies hors ligne par le pré-cache du service worker (SEEDS de sw.js).
   Chaque fiche cite ses sources. Rien n'est enregistré dans la sauvegarde : filtres et tris ne vivent que le temps de la session. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof ACT!=='object'||typeof atlasScreen!=='function')return;
const fmt=n=>Number(n).toLocaleString('fr-FR');
const compact=n=>n>=1e6?(n/1e6).toLocaleString('fr-FR',{maximumFractionDigits:n>=1e7?0:1})+' M':fmt(n);
const T=()=>window.MQ_ATLAS_T||{};
let TH={q:'',t:'',c:'',r:'',sort:'az'},CUR_COL='';
const COLS=[
 {id:'continents',icon:'🌍',name:'Les continents',one:'continent',keys:['continents'],metric:'km2',cont:false,desc:'Superficie, population et nombre de pays.'},
 {id:'oceans',icon:'🌊',name:'Océans et mers',one:'océan ou mer',keys:['oceans','mers'],metric:'km2',cont:false,desc:'Les cinq océans, puis les mers et golfes : superficie, profondeur, pays voisins.'},
 {id:'fleuves',icon:'🏞️',name:'Fleuves et rivières',one:'cours d’eau',keys:['fleuves'],metric:'km',cont:true,desc:'Longueur, bassin, débit, source, embouchure et pays traversés.'},
 {id:'lacs',icon:'💧',name:'Lacs',one:'lac',keys:['lacs'],metric:'km2',cont:true,desc:'Superficie, profondeur, altitude et pays riverains.'},
 {id:'montagnes',icon:'⛰️',name:'Montagnes et volcans',one:'relief',keys:['montagnes'],metric:'alt',cont:true,desc:'Sommets, massifs et volcans : altitude et pays.'},
 {id:'iles',icon:'🏝️',name:'Îles',one:'île',keys:['iles'],metric:'km2',cont:true,desc:'Superficie, population et pays de rattachement.'},
 {id:'deserts',icon:'🏜️',name:'Déserts',one:'désert',keys:['deserts'],metric:'km2',cont:true,desc:'Superficie et pays concernés.'},
 {id:'regions',icon:'🗺️',name:'Régions de France',one:'région',keys:['regions'],metric:'pop',cont:false,desc:'Les 18 régions : chef-lieu, départements, habitants, superficie.'},
 {id:'departements',icon:'📍',name:'Départements de France',one:'département',keys:['departements'],metric:'pop',cont:false,region:true,desc:'Les 101 départements : préfecture, région, habitants, superficie.'},
 {id:'pays',icon:'🏳️',name:'Pays : liste détaillée',one:'pays ou territoire',keys:['*pays'],metric:'pop',cont:true,desc:'Tous les pays et territoires avec capitale, habitants et superficie.'}];
const colOf=id=>COLS.find(c=>c.id===id);
const METRIC={km2:['Superficie',v=>fmt(v)+' km²',v=>compact(v)+' km²'],km:['Longueur',v=>fmt(v)+' km',v=>fmt(v)+' km'],alt:['Altitude',v=>fmt(v)+' m',v=>fmt(v)+' m'],pop:['Habitants',v=>fmt(v),v=>compact(v)+' hab.']};

// ---------- données (chargées par index.html, avec « defer » : aucun script n'est créé à la volée) ----------
function withData(render){
 if(window.MQ_ATLAS_T&&window.MQ_ATLAS_T.regions&&window.MQ_ATLAS_T.fleuves&&window.MQ_ATLAS_T.montagnes){render();return;}
 app.innerHTML=`${bar('🗺️ Atlas du monde','atlas')}<div class="card center"><p>Ces données ne sont pas encore disponibles sur cet appareil.</p><p class="muted small">Connecte-toi une fois à Internet, puis elles resteront disponibles hors ligne.</p><button class="btn ghost wide" data-a="atlas">← Retour à l’atlas</button></div>`;}

// ---------- éléments d'un thème ----------
function items(col){
 const out=[];
 for(const k of col.keys){
  if(k==='*pays'){for(const [iso,p] of Object.entries(atlData().pays))out.push({ref:'pays.'+iso,k:'pays',slug:iso,o:{n:p.n,t:'pays',pop:p.pop,km2:p.km2,cap:p.cap,c:p.c,pays:[iso]},act:'atlpays:'+iso});continue;}
  for(const [slug,o] of Object.entries(T()[k]||{}))out.push({ref:k+'.'+slug,k,slug,o,act:'atlit:'+k+'.'+slug});}
 return out;}
const findItem=ref=>{const i=ref.indexOf('.'),k=ref.slice(0,i),slug=ref.slice(i+1),o=(T()[k]||{})[slug];return o?{ref,k,slug,o}:null;};
const colForKey=k=>COLS.find(c=>c.keys.includes(k));
const countryName=iso=>atlData().pays[iso]?.n||iso;
function countriesText(o,max=3){const l=(o.pays||[]).map(countryName);if(!l.length)return '';return l.length>max?l.slice(0,max).join(', ')+' et '+(l.length-max)+' autre'+(l.length-max>1?'s':''):l.join(', ');}
function metricVal(col,it){const m=col.metric,o=it.o;return o[m]!=null?o[m]:null;}
function secondary(col,o){
 if(col.id==='departements')return `${o.code||''}${o.pref?' · '+esc(o.pref):''}`;
 if(col.id==='regions')return o.chef?'Chef-lieu : '+esc(o.chef):'';
 if(col.id==='pays')return [o.cap?esc(o.cap):'',o.km2?fmt(o.km2)+' km²':''].filter(Boolean).join(' · ');
 if(col.id==='continents')return o.npays?o.npays+' pays et territoires':'';
 const c=countriesText(o);return [o.t?esc(o.t):'',c?esc(c):''].filter(Boolean).join(' · ');}

// ---------- liste d'un thème ----------
function filtered(col){
 const nq=atlNorm(TH.q.trim());let l=items(col);
 if(TH.t)l=l.filter(x=>x.o.t===TH.t);
 if(TH.c)l=l.filter(x=>(x.o.c||[]).includes(TH.c));
 if(TH.r)l=l.filter(x=>x.o.reg===TH.r);
 if(nq)l=l.filter(x=>atlNorm([x.o.n,x.o.code,x.o.pref,x.o.chef,x.o.cap,x.o.t,(x.o.pays||[]).map(countryName).join(' ')].filter(Boolean).join(' ')).includes(nq));
 const m=col.metric,has=x=>x.o[m]!=null;
 if(TH.sort==='az')l.sort((a,b)=>a.o.n.localeCompare(b.o.n,'fr'));
 else l.sort((a,b)=>has(a)===has(b)?(TH.sort==='desc'?b.o[m]-a.o[m]:a.o[m]-b.o[m]):has(a)?-1:1);
 return l;}
function rowsHTML(col,l){
 if(!l.length)return '<p class="muted center">Aucun résultat. Essaie un autre mot ou enlève un filtre.</p>';
 const M=METRIC[col.metric];
 return `<p class="muted small">${l.length} ${l.length>1?'éléments':'élément'}</p><div class="atlrows">${l.map(x=>{const v=metricVal(col,x),sec=secondary(col,x.o);return `<button class="atlrow card" data-a="${x.act}"><span class="atlrow-main"><b>${esc(x.o.n)}</b>${sec?`<small class="muted">${sec}</small>`:''}</span>${v!=null?`<span class="atlrow-val"><b>${M[2](v)}</b><small class="muted">${M[0].toLowerCase()}</small></span>`:''}</button>`;}).join('')}</div>`;}
function colScreen(id){
 const col=colOf(id);if(!col)return atlasScreen();
 withData(()=>{
  if(CUR_COL!==id){TH={q:'',t:'',c:'',r:'',sort:col.metric==='pop'||col.metric==='km2'||col.metric==='km'||col.metric==='alt'?'desc':'az'};CUR_COL=id;}
  CUR='atlas';
  const all=items(col),types=[...new Set(all.map(x=>x.o.t).filter(Boolean))];
  const regs=col.region?Object.entries(T().regions||{}).sort((a,b)=>a[1].n.localeCompare(b[1].n,'fr')):[];
  const M=METRIC[col.metric];
  app.innerHTML=`${bar(col.icon+' '+esc(col.name),'atlas')}
  <p class="muted">${esc(col.desc)}</p>
  <input id="atlq2" class="fld libsearch" type="search" placeholder="Chercher…" value="${esc(TH.q)}" aria-label="Rechercher" autocomplete="off">
  ${types.length>1?`<div class="libchips" role="group" aria-label="Type"><button class="pillbtn ${TH.t===''?'on':''}" data-a="atlcolf:t:" aria-pressed="${TH.t===''}">Tous</button>${types.map(t=>`<button class="pillbtn ${TH.t===t?'on':''}" data-a="atlcolf:t:${esc(t)}" aria-pressed="${TH.t===t}">${esc(t[0].toUpperCase()+t.slice(1))}</button>`).join('')}</div>`:''}
  ${col.cont?`<div class="libchips" role="group" aria-label="Continent">${ATL_CONT.map(([k,l])=>`<button class="pillbtn ${TH.c===k?'on':''}" data-a="atlcolf:c:${k}" aria-pressed="${TH.c===k}">${l}</button>`).join('')}</div>`:''}
  ${regs.length?`<label class="atlsel"><span class="muted small">Région</span><select id="atlreg" class="fld" aria-label="Filtrer par région"><option value="">Toutes les régions</option>${regs.map(([k,r])=>`<option value="${esc(k)}" ${TH.r===k?'selected':''}>${esc(r.n)}</option>`).join('')}</select></label>`:''}
  <div class="atlsort" role="group" aria-label="Trier"><span class="muted small">Trier :</span>
   <button class="pillbtn ${TH.sort==='az'?'on':''}" data-a="atlcolf:sort:az" aria-pressed="${TH.sort==='az'}">A → Z</button>
   <button class="pillbtn ${TH.sort==='desc'?'on':''}" data-a="atlcolf:sort:desc" aria-pressed="${TH.sort==='desc'}">${esc(M[0])} ↓</button>
   <button class="pillbtn ${TH.sort==='asc'?'on':''}" data-a="atlcolf:sort:asc" aria-pressed="${TH.sort==='asc'}">${esc(M[0])} ↑</button></div>
  <div id="atlcollist" aria-live="polite">${rowsHTML(col,filtered(col))}</div>
  <button class="btn ghost wide" data-a="atlas">← Retour à l’atlas</button>`;
  window.scrollTo(0,0);});}
function colRefresh(){const col=colOf(CUR_COL),el=document.getElementById('atlcollist');if(col&&el)el.innerHTML=rowsHTML(col,filtered(col));}

// ---------- fiche ----------
const typeLabel=(k,o)=>o.t||(colForKey(k)?.one||'');
function facts(k,o){
 const rows=[],add=(t,v)=>{if(v!=null&&v!=='')rows.push(`<div class="frow"><span class="grow muted">${t}</span><b>${v}</b></div>`);};
 const km2=v=>v!=null?fmt(v)+' km²':null;
 switch(k){
  case 'continents':add('Superficie',km2(o.km2));add('Population',o.pop?'environ '+compact(o.pop)+' d’habitants':null);add('Pays et territoires',o.npays);break;
  case 'oceans':case 'mers':add('Type',o.t?esc(o.t):null);add('Superficie',km2(o.km2));add('Profondeur maximale',o.prof?fmt(o.prof)+' m':null);if(o.alt!=null&&o.alt<0&&!o.prof)add('Point le plus bas',fmt(-o.alt)+' m sous le niveau de la mer');break;
  case 'fleuves':add('Type',o.t?esc(o.t):null);add('Longueur',o.km?fmt(o.km)+' km':null);add('Bassin versant',km2(o.bassin));add('Débit moyen',o.debit?fmt(o.debit)+' m³/s':null);add('Source',o.src2?esc(o.src2):null);add(o.t==='fleuve'?'Se jette dans':'Se jette dans (embouchure)',o.emb?esc(o.emb):null);break;
  case 'lacs':add('Superficie',km2(o.km2));add('Profondeur maximale',o.prof?fmt(o.prof)+' m':null);add('Altitude',o.alt!=null?fmt(o.alt)+' m':null);break;
  case 'montagnes':add('Type',o.t?esc(o.t):null);add(o.t==='massif'?'Point culminant':'Altitude',o.alt?fmt(o.alt)+' m':null);add('Massif',o.massif?esc(o.massif):null);break;
  case 'iles':add('Superficie',km2(o.km2));add('Population',o.pop?'environ '+compact(o.pop)+' d’habitants':null);break;
  case 'deserts':add('Superficie',km2(o.km2));break;
  case 'regions':add('Chef-lieu',o.chef?esc(o.chef):null);add('Habitants',o.pop?fmt(o.pop):null);add('Superficie',km2(o.km2));add('Départements',o.ndep);add('Communes',o.ncom?fmt(o.ncom):null);break;
  case 'departements':add('Numéro',o.code?esc(o.code):null);add('Préfecture',o.pref?esc(o.pref):null);add('Habitants',o.pop?fmt(o.pop):null);add('Superficie',km2(o.km2));add('Communes',o.ncom?fmt(o.ncom):null);break;}
 return rows.join('');}
function linkChips(label,list){return list.length?`<div class="card atllinks"><b>${label}</b><div class="libchips">${list.join('')}</div></div>`:'';}
function creditHTML(k,o){
 const data=(k==='regions'||k==='departements')?'Chiffres : population et superficie calculées à partir des communes (geo.api.gouv.fr, Licence Ouverte, données INSEE) ; préfectures : Wikidata. ':'Chiffres : Wikidata (CC0). ';
 const text=o.src?`Texte : ${MQLinks.html(o.src,o.sw==='v'?'Vikidia':'Wikipédia')} (licence CC BY-SA). `:'';
 return `<p class="muted small atlcred">${data}${text}</p>`;}
function ficheScreen(ref){
 withData(()=>{
  const it=findItem(ref);if(!it)return atlasScreen();const {k,o}=it,col=colForKey(k);CUR='atlas';
  const countries=(o.pays||[]).filter(i=>atlData().pays[i]).map(i=>`<button class="pillbtn" data-a="atlpays:${i}">${atlData().pays[i].f?atlImg('flag-'+i.toLowerCase(),'','atlflag-s'):''}${esc(atlData().pays[i].n)}</button>`);
  const regLink=k==='departements'&&o.reg&&T().regions?.[o.reg]?[`<button class="pillbtn" data-a="atlit:regions.${esc(o.reg)}">🗺️ ${esc(T().regions[o.reg].n)}</button>`]:[];
  const deps=k==='regions'?(o.deps||[]).filter(s=>T().departements?.[s]).map(s=>`<button class="pillbtn" data-a="atlit:departements.${esc(s)}">${esc(T().departements[s].code)} · ${esc(T().departements[s].n)}</button>`):[];
  const voisins=k==='departements'?(o.voisins||[]).filter(s=>T().departements?.[s]).map(s=>`<button class="pillbtn" data-a="atlit:departements.${esc(s)}">${esc(T().departements[s].code)} · ${esc(T().departements[s].n)}</button>`):[];
  const conts=(o.c||[]).map(c=>ATL_CNAME[c]).filter(Boolean);
  app.innerHTML=`${bar((col?col.icon+' ':'')+esc(o.n),'atlcol:'+(col?col.id:''))}
  <div class="card atlfacts"><div class="atlkind muted">${esc(typeLabel(k,o))}</div>${facts(k,o)}${conts.length&&k!=='regions'&&k!=='departements'&&k!=='continents'?`<div class="frow"><span class="grow muted">Continent${conts.length>1?'s':''}</span><b>${esc(conts.join(', '))}</b></div>`:''}</div>
  ${o.note?`<p class="card atlnote">⚠️ ${esc(o.note)}</p>`:''}
  ${linkChips(k==='departements'?'Région':'Pays concernés',k==='departements'?regLink:countries)}
  ${linkChips('Départements de la région',deps)}${linkChips('Départements voisins',voisins)}
  ${(o.bref||[]).length?`<h2 class="sec">📖 En bref</h2><div class="card atltxt">${o.bref.map(x=>`<p>${esc(x)}</p>`).join('')}</div>`:''}
  ${creditHTML(k,o)}
  <button class="btn ghost wide" data-a="atlcol:${col?col.id:''}">← ${col?esc(col.name):'Retour'}</button>`;
  window.scrollTo(0,0);});}

// ---------- accueil : tuiles « Explorer par thème » ----------
function homeSection(){
 const counts={continents:7,oceans:'5 + mers',fleuves:'',lacs:'',montagnes:'',iles:'',deserts:'',regions:18,departements:101,pays:Object.keys(atlData().pays).length};
 return `<h2 class="sec">🧭 Explorer par thème</h2><div class="atlthemes">${COLS.map(c=>`<button class="atlcol card" data-a="atlcol:${c.id}"><span class="atlcol-i" aria-hidden="true">${c.icon}</span><b>${esc(c.name)}</b><small class="muted">${esc(c.desc)}</small></button>`).join('')}</div>`;}

// ---------- sous les grandes cartes : la liste détaillée correspondante ----------
const CONT_OF={europe:'europe',afrique:'afrique','amerique-nord':'amerique-nord','amerique-sud':'amerique-sud',oceanie:'oceanie',antarctique:'antarctique'};
function table(head,rows){return `<div class="atltable-wrap"><table class="atltable"><thead><tr>${head.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;}
function carteExtra(id){
 const P=atlData().pays;
 if(CONT_OF[id]){
  const ks=Object.entries(P).filter(([i,p])=>(p.c||[]).includes(CONT_OF[id])).sort((a,b)=>a[1].n.localeCompare(b[1].n,'fr'));
  if(!ks.length)return '';
  return `<h2 class="sec">📋 Les pays de ce continent (${ks.length})</h2>${table(['Pays','Capitale','Habitants','Superficie'],ks.map(([i,p])=>`<tr><th scope="row"><button class="atllinkbtn" data-a="atlpays:${i}">${esc(p.n)}</button></th><td>${esc(p.cap||'—')}</td><td>${p.pop?fmt(p.pop):'—'}</td><td>${p.km2?fmt(p.km2)+' km²':'—'}</td></tr>`))}
  <p class="muted small">Habitants et superficie : Wikidata. Touche un pays pour sa fiche complète.</p>
  <button class="btn ghost wide" data-a="atlcol:pays">📋 Voir tous les pays du monde</button>`;}
 const links={'monde-oceans':['oceans','🌊 Voir tous les océans et toutes les mers'],'monde-continents':['continents','🌍 Voir les 7 continents en détail'],'france-regions':['regions','🗺️ Voir les 18 régions de France'],'monde-relief':['montagnes','⛰️ Voir les montagnes et les volcans']};
 const l=links[id];if(!l)return '';
 return `<div class="atlextra"><button class="btn primary wide" data-a="atlcol:${l[0]}">${l[1]}</button>${id==='france-regions'?'<button class="btn ghost wide" data-a="atlcol:departements">📍 Voir les 101 départements</button>':''}${id==='monde-relief'?'<button class="btn ghost wide" data-a="atlcol:deserts">🏜️ Voir les déserts</button><button class="btn ghost wide" data-a="atlcol:fleuves">🏞️ Voir les fleuves</button>':''}${id==='monde-oceans'?'<button class="btn ghost wide" data-a="atlcol:fleuves">🏞️ Voir les fleuves et rivières</button><button class="btn ghost wide" data-a="atlcol:lacs">💧 Voir les lacs</button>':''}</div>`;}

Object.assign(ACT,{
 atlcol:id=>colScreen(String(id||'')),
 atlit:ref=>ficheScreen(String(ref||'')),
 atlcolf:a=>{const i=String(a).indexOf(':'),k=String(a).slice(0,i),v=String(a).slice(i+1);if(k in TH)TH[k]=v;colScreen(CUR_COL);}
});
document.addEventListener('input',e=>{if(e.target&&e.target.id==='atlq2'){TH.q=e.target.value;colRefresh();}});
document.addEventListener('change',e=>{if(e.target&&e.target.id==='atlreg'){TH.r=e.target.value;colRefresh();}});
window.MQAtlasThemes={COLS,items,homeSection,carteExtra,findItem,version:'1.0'};
})();
