/* ===== Atlas du monde (20/10/2026) : cartes du monde et des continents, puis une fiche par pays ou territoire
   (drapeau, carte, chiffres clés, « En bref », « Un peu d'histoire »). Données : data/atlas.js (window.MQ_ATLAS).
   Aucune donnée enregistrée dans la sauvegarde : le filtre et la recherche ne vivent que le temps de la session. */
let ATL={c:'',q:''};
const ATL_CONT=[['','🌍 Tous'],['europe','Europe'],['afrique','Afrique'],['asie','Asie'],['amerique-nord','Amérique du Nord'],['amerique-sud','Amérique du Sud'],['oceanie','Océanie'],['antarctique','Antarctique']];
const ATL_CNAME=Object.fromEntries(ATL_CONT.slice(1));
const atlNorm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const atlNum=n=>Number(n).toLocaleString('fr-FR');
function atlPop(n){if(!n)return '';if(n>=1e9)return 'environ '+(n/1e9).toLocaleString('fr-FR',{maximumFractionDigits:2})+' milliard'+(n>=2e9?'s':'')+' d’habitants';
 if(n>=1e6)return 'environ '+(n/1e6).toLocaleString('fr-FR',{maximumFractionDigits:1})+' million'+(n>=2e6?'s':'')+' d’habitants';return 'environ '+atlNum(Math.round(n/10)*10||n)+' habitants';}
function atlData(){return window.MQ_ATLAS||{pays:{},cartes:[],cred:{}};}
const atlImg=(f,alt,cls)=>`<img class="${cls}" src="data/images/atlas/${f}.webp" alt="${esc(alt)}" loading="lazy" decoding="async" onerror="this.remove()">`;
function atlList(){const P=atlData().pays,nq=atlNorm(ATL.q.trim());
 return Object.entries(P).filter(([k,p])=>(!ATL.c||(p.c||[]).includes(ATL.c))&&(!nq||atlNorm(p.n+' '+(p.cap||'')).includes(nq)));}
function atlListHTML(){const l=atlList();if(!l.length)return '<p class="muted center">Aucun pays ne correspond. Essaie un autre nom ou un autre continent.</p>';
 return `<p class="muted small">${l.length} pays et territoires</p><div class="atlgrid">${l.map(([k,p])=>`<button class="atlcard card" data-a="atlpays:${k}">${p.f?atlImg('flag-'+k.toLowerCase(),'','atlflag'):'<span class="atlflag atlnoflag" aria-hidden="true">🏳️</span>'}<b>${esc(p.n)}</b>${p.cap?`<small class="muted">${esc(p.cap)}</small>`:''}</button>`).join('')}</div>`;}
function atlasScreen(){if(M){clearInterval(M.tick);clearTimeout(M.tid);M=null;}L=null;ttsStop();CUR='atlas';const D=atlData();
 const cartes=D.cartes.filter(x=>!ATL.c||x.c===ATL.c);
 app.innerHTML=`${bar('🗺️ Atlas du monde')}
 <p class="muted">Les cartes du monde et des continents, puis une fiche pour chaque pays : son drapeau, sa carte, ses chiffres clés et un peu de son histoire.</p>
 ${cartes.length?`<h2 class="sec">🗺️ Les grandes cartes</h2><div class="atlmaps">${cartes.map(x=>`<button class="atlmap card" data-a="atlcarte:${x.id}">${atlImg('carte-'+x.id,x.t,'')}<span>${esc(x.t)}</span></button>`).join('')}</div>`:''}
 <h2 class="sec">🏳️ Les pays</h2>
 <input id="atlq" class="fld libsearch" type="search" placeholder="Chercher un pays ou une capitale…" value="${esc(ATL.q)}" aria-label="Rechercher un pays" autocomplete="off">
 <div class="libchips" role="group" aria-label="Continent">${ATL_CONT.map(([k,l])=>`<button class="pillbtn ${k===ATL.c?'on':''}" data-a="atlcont:${k}" aria-pressed="${k===ATL.c}">${l}</button>`).join('')}</div>
 <div id="atllist" aria-live="polite">${atlListHTML()}</div>`;}
function atlCredit(f){const c=atlData().cred[f];return c?`${esc(c.a)} · ${esc(c.l)} · Wikimedia Commons`:'';}
function atlasCarte(id){const x=atlData().cartes.find(c=>c.id===id);if(!x)return atlasScreen();CUR='atlas';
 app.innerHTML=`${bar('🗺️ '+esc(x.t),'atlas')}<figure class="lfig atlbig">${atlImg('carte-'+x.id,x.t,'')}<figcaption><b>${esc(x.t)}</b><small>${esc(x.a)} · ${esc(x.l)} · Wikimedia Commons</small></figcaption></figure>
 <p class="muted small">Astuce : pince l’image avec deux doigts pour zoomer.</p><button class="btn ghost wide" data-a="atlas">← Retour à l’atlas</button>`;window.scrollTo(0,0);}
function atlasPays(iso){const p=atlData().pays[iso];if(!p)return atlasScreen();CUR='atlas';const k=iso.toLowerCase();
 const row=(t,v)=>v?`<div class="frow"><span class="grow muted">${t}</span><b>${v}</b></div>`:'';
 app.innerHTML=`${bar((p.f?'':'🏳️ ')+esc(p.n),'atlas')}
 <div class="atlhead">${p.f?atlImg('flag-'+k,'Drapeau : '+p.n,'atlbigflag'):''}${p.m?atlImg('map-'+k,'Carte : '+p.n,'atlbigmap'):''}</div>
 <div class="card atlfacts">${row('Capitale',esc(p.cap||''))}${row('Continent',(p.c||[]).map(c=>ATL_CNAME[c]).filter(Boolean).join(', '))}
  ${row('Population',atlPop(p.pop))}${row('Superficie',p.km2?atlNum(p.km2)+' km²':'')}${row('Langue'+((p.lang||[]).length>1?'s':'')+' officielle'+((p.lang||[]).length>1?'s':''),esc((p.lang||[]).join(', ')))}
  ${row('Monnaie',esc((p.cur||[]).join(', ')))}${row('Rattaché à',esc(p.sov||''))}</div>
 ${p.note?`<p class="card atlnote">⚠️ ${esc(p.note)}</p>`:''}
 ${p.bref?`<h2 class="sec">📖 En bref</h2><div class="card atltxt">${p.bref.map(x=>`<p>${esc(x)}</p>`).join('')}</div>`:''}
 ${p.hist?`<h2 class="sec">🏛️ Un peu d’histoire</h2><div class="card atltxt">${p.hist.map(x=>`<p>${esc(x)}</p>`).join('')}</div>`:''}
 <p class="muted small atlcred">${p.src?`Textes : <a href="${esc(p.src)}" target="_blank" rel="noopener noreferrer">Vikidia</a>, l’encyclopédie des 8-13 ans (licence CC BY-SA). `:''}Chiffres : Wikidata.
  ${p.f?'Drapeau : '+atlCredit('flag-'+k)+'. ':''}${p.m?'Carte : '+atlCredit('map-'+k)+'.':''}</p>
 <button class="btn ghost wide" data-a="atlas">← Tous les pays</button>`;window.scrollTo(0,0);}
function atlRefresh(){const el=document.getElementById('atllist');if(el)el.innerHTML=atlListHTML();}
Object.assign(ACT,{
 atlas:()=>atlasScreen(),
 atlcont:k=>{ATL.c=k||'';atlasScreen();},
 atlpays:k=>atlasPays(k),
 atlcarte:k=>atlasCarte(k)
});
document.addEventListener('input',e=>{if(e.target&&e.target.id==='atlq'){ATL.q=e.target.value;atlRefresh();}});
