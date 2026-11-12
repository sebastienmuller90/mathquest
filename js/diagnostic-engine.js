/* Finot Académie — calibration du niveau (v2, 12/11/2026).
   20 questions = 20 points, sans XP ni pièces. Bilan : note sur 20, résultat par matière, points forts et notions à travailler
   (domaines et chapitres), parcours conseillé. Même principe par matière (« Calibrer en maths », en français, en langues…).
   Les réponses alimentent les micro-compétences. Les anciennes calibrations (12 questions) restent lisibles. */
(function(){
'use strict';
if(typeof window==='undefined'||typeof document==='undefined'||typeof ACT!=='object')return;
const NQ=20,MIN_SUBJECT_CHAPTERS=6;let D=null;
const escD=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hash=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
const pickBy=(arr,seed)=>arr[hash(seed)%arr.length];
function family(id){let s='';try{s=sOf(WMAP[id].id).id}catch(e){}return String(s).replace(/^p-/,'').replace(/^primary-/,'');}
function subjectInfo(fam){const s=(typeof SUBJECTS!=='undefined'&&SUBJECTS.find(x=>x.id===fam||x.id==='p-'+fam||x.id==='primary-'+fam))||null;return {id:fam,name:s?.name||(fam?fam[0].toUpperCase()+fam.slice(1):'Matière'),emoji:s?.emoji||'📘'};}
function eligible(){if(S?.diagnostic?.completedAt||S?.diagnostic?.skippedAt)return false;const evidence=Object.keys(S?.competencies||{}).length;return evidence<6;}
function candidates(fam){return ALLCH.filter(c=>WMAP[c.id]?.lvl===S.grade&&typeof c.g==='function'&&(!fam||family(c.id)===fam));}

// ---------- domaines (catégories scolaires des chapitres, voir data/chapter-categories.js) ----------
const DOMC={};
function domainOf(cid){if(DOMC[cid])return DOMC[cid];let r=null;
 try{const w=WMAP[cid];const gs=typeof chapGroups==='function'&&w?chapGroups(w.id):null;
  if(gs)for(const g of gs){if(g.chs.some(c=>c.id===cid))r={cat:g.name,sub:'',icon:g.icon};for(const s of g.subs)if(s.chs.some(c=>c.id===cid))r={cat:g.name,sub:s.name,icon:g.icon};if(r)break;}}catch(e){}
 if(!r||r.cat==='Autres chapitres')r={cat:r?'Autres notions':(CHMAP[cid]?.name||'Notions'),sub:'',icon:r?.icon||'📁'};
 return DOMC[cid]=r;}
const domLabel=d=>d.sub||d.cat;

// ---------- plan : 20 questions réparties entre matières (ou entre domaines d'une matière) ----------
function spaced(list,n){if(!list.length)return[];if(list.length<=n)return list.slice();const out=[];for(let i=0;i<n;i++)out.push(list[Math.round(i*(list.length-1)/Math.max(1,n-1))]);return [...new Map(out.map(x=>[x.id,x])).values()];}
function chaptersFor(cands,count){
 const buckets=new Map();for(const c of cands){const k=domainOf(c.id).cat;(buckets.get(k)||buckets.set(k,[]).get(k)).push(c);}
 const bl=[...buckets.values()].sort((a,b)=>b.length-a.length),take=bl.map(()=>0);let got=0;
 while(got<count){let moved=false;for(let b=0;b<bl.length&&got<count;b++)if(take[b]<bl[b].length){take[b]++;got++;moved=true;}if(!moved)break;}
 for(let g=0;got<count&&bl.length&&g<1000;g++)for(let b=0;b<bl.length&&got<count;b++){take[b]++;got++;}
 const lists=bl.map((l,b)=>{const sp=spaced(l,Math.min(take[b],l.length)),out=[];for(let i=0;i<take[b];i++)out.push(sp[i%sp.length]);return out;});
 const res=[];for(let r=0;res.length<count;r++){let any=false;for(const l of lists)if(r<l.length){res.push(l[r]);any=true;}if(!any)break;}
 return res.slice(0,count);}
// Répartition des questions entre matières : au moins 2 par matière, plus pour les maths et le français.
function quotas(fams,counts,total){
 const w=f=>f==='maths'||f==='francais'?3:1.5,q={};
 let list=fams.slice();if(list.length*2>total)list=list.slice(0,Math.floor(total/2));
 let left=total;for(const f of list){q[f]=Math.min(2,counts[f]);left-=q[f];}
 for(let cap=1;left>0&&cap<=2;cap++){while(left>0){let best=null,bs=-1;for(const f of list){if(q[f]>=counts[f]*cap)continue;const s=w(f)/(q[f]+1);if(s>bs){bs=s;best=f;}}if(!best)break;q[best]++;left--;}}
 return q;}
function subjectsAvailable(){const by={};for(const c of candidates())(by[family(c.id)]=by[family(c.id)]||[]).push(c);
 const order=f=>f==='maths'?0:f==='francais'?1:2;
 return Object.entries(by).map(([f,l])=>({...subjectInfo(f),count:l.length})).sort((a,b)=>order(a.id)-order(b.id)||b.count-a.count);}
function buildPlan(mode='all'){
 const young=['CP','CE1'].includes(S.grade),pattern=young?[1,1,2,1,2,2,1,2,2,2,1,2]:[1,2,2,3,1,2,3,2,1,3,2,3];
 let items=[];
 if(mode==='all'){
  const all=candidates(),groups={};for(const c of all)(groups[family(c.id)]=groups[family(c.id)]||[]).push(c);
  // Matières principales d'abord (au moins 3 questions chacune) ; les autres se calibrent une par une.
  const CORE=['maths','francais','anglais','hg','sciences','qlm','pc','svt'],rk=f=>{const i=CORE.indexOf(f);return i<0?99:i;},have=Object.keys(groups),core=have.filter(f=>rk(f)<99).sort((a,b)=>rk(a)-rk(b)).slice(0,5);
  const fams=(core.length>=3?core:have.sort((a,b)=>rk(a)-rk(b)||groups[b].length-groups[a].length).slice(0,5)),counts=Object.fromEntries(fams.map(f=>[f,groups[f].length]));
  const q=quotas(fams,counts,NQ),per=fams.filter(f=>q[f]).map(f=>chaptersFor(groups[f],q[f]).map(c=>({c,f})));
  for(let r=0;items.length<NQ;r++){let any=false;for(const l of per)if(r<l.length){items.push(l[r]);any=true;}if(!any)break;}
 }else{
  const cs=candidates(mode);items=chaptersFor(cs,NQ).map(c=>({c,f:mode}));
 }
 return items.slice(0,NQ).map((x,i)=>({cid:x.c.id,d:pattern[i%pattern.length],subject:x.f}));}

function gen(item,i,mode,salt=''){const fn=()=>CHMAP[item.cid].g(item.d);let q;if(window.MQQuestionRotation?.generateSeeded){try{q=MQQuestionRotation.generateSeeded(item.cid,item.d,'diagnostic',`${ACTIVE||'profile'}|${S.grade}|${mode}|${i}${salt}`);}catch(e){q=null;}}if(!q)q=window.MQQuestionRotation?MQQuestionRotation.withMode('diagnostic',fn):fn();if(window.MQQuestionEnrichment&&!q?._mq)q=MQQuestionEnrichment.decorate(item.cid,q,item.d);return q;}
function create(mode='all'){const plan=buildPlan(mode);if(!plan.length)return null;const seen=new Set(),questions=[];
 plan.forEach((x,i)=>{let q=gen(x,i,mode);for(let t=1;t<=3&&seen.has(x.cid+'|'+plainText(q?.q||''));t++)q=gen(x,i,mode,'#'+t);seen.add(x.cid+'|'+plainText(q?.q||''));questions.push({...x,q});});
 return {id:'diag-'+Date.now().toString(36),createdAt:Date.now(),grade:S.grade,mode,i:0,answers:[],questions};}

// ---------- question en cours ----------
let SHOWN='';
const current=()=>D?.questions?.[D.i]||null;
const total=()=>D?.questions?.length||NQ;
function persist(){if(!D)return;if(D.mode==='all')S.diagnostic={...(S.diagnostic&&!S.diagnostic.completedAt?S.diagnostic:{}),active:D};else S.calib={active:D};saveLocal();}
function input(q){if(q.type==='choice')return `<div class="choices">${q.choices.map((c,i)=>`<button class="choice" data-a="diagpick:${i}"><kbd>${i+1}</kbd>${c}</button>`).join('')}</div>`;
 if(q.type==='order'){q._sel=q._sel||[];return `<div class="ans ord"><div class="ordline">${q._sel.length?q._sel.map(i=>`<span class="otw">${q.tokens[i]}</span>`).join(' '):'<span class="muted">Touche les mots dans le bon ordre</span>'}</div><div class="ordbank">${q.tokens.map((t,i)=>`<button class="otok" data-a="diagtok:${i}" ${q._sel.includes(i)?'disabled':''}>${t}</button>`).join('')}</div><button class="btn ghost wide" data-a="diagundo">↶ Retirer</button><button class="btn primary wide" data-a="diagvalid">Valider</button></div>`;}
 if(q.type==='multi')return `<div class="ans">${q.labels.map((l,i)=>`<label class="ml"><span>${l}</span><input id="di${i}" class="big" autocomplete="off" inputmode="decimal"></label>`).join('')}<button class="btn primary wide" data-a="diagvalid">Valider</button></div>`;
 return `<div class="ans"><div class="inrow"><input id="di0" class="big" autocomplete="off" inputmode="${q.type==='num'?'decimal':'text'}" placeholder="Ta réponse" aria-label="Ta réponse">${q.unit?`<span class="unit">${q.unit}</span>`:''}</div><button class="btn primary wide" data-a="diagvalid">Valider</button></div>`;}
function render(){const it=current();if(!it)return finish();CUR='diagnostic';const q=it.q,c=CHMAP[it.cid],n=total(),pct=Math.round(D.i/n*100),title=D.mode==='all'?'🧭 Diagnostic de départ':`🧭 Calibrer · ${escD(subjectInfo(D.mode).name)}`;
 app.innerHTML=`${bar(title)}<div class="card diag-head"><b>Question ${D.i+1}/${n}</b><div class="prog"><i style="width:${pct}%"></i></div><p class="muted small">Ce n’est pas un examen : Finot cherche le bon niveau pour toi. Tu verras ta note sur ${n} et ton bilan détaillé à la fin. Aucun XP ni pièce n’est gagné ou perdu.</p></div><div class="card qcard"><div class="qtag">${c.icon} ${escD(c.name)}<span>${'⚡'.repeat(it.d)}</span></div>${q._mq?.skillLabel?`<div class="mq-qmeta"><span class="mq-skill">🎯 ${escD(q._mq.skillLabel)}</span></div>`:''}<div class="qtext">${q.q}</div>${q.svg||''}${input(q)}</div><button class="btn ghost wide" data-a="diagpause">Quitter et reprendre plus tard</button>`;
 // Nouvelle question (pas un simple réaffichage, ex. mot ajouté dans une phrase à ordonner) : on repart du haut de l'écran.
 const key=D.id+':'+D.i,isNew=key!==SHOWN;SHOWN=key;if(isNew)window.scrollTo(0,0);document.getElementById('di0')?.focus(isNew?{preventScroll:true}:undefined);}
function value(q,pick){if(q.type==='choice')return pick;if(q.type==='order')return (q._sel||[]).length===q.tokens.length?q._sel.map(i=>q.tokens[i]).join(' '):null;if(q.type==='multi'){const v=q.labels.map((_,i)=>document.getElementById('di'+i)?.value||'');return v.some(x=>!String(x).trim())?null:v;}const v=document.getElementById('di0')?.value||'';return String(v).trim()?v:null;}
function answer(pick){const it=current();if(!it)return;const v=value(it.q,pick);if(v===null)return typeof shake==='function'?shake():null;const ok=check(it.q,v),skillKind=it.q?._mq?.skillKind||window.MQCompetency?.inferKind(it.cid,it.q)||'';D.answers.push({cid:it.cid,subject:it.subject,d:it.d,ok,skillKind,q:plainText(it.q.q)});try{MQCompetency?.record(S,it.cid,ok,{source:'lesson-quiz',diagnostic:true,d:it.d,q:it.q,hint:false,kind:skillKind});MQAdaptive?.refreshMastery(S,it.cid);}catch(e){}D.i++;persist();render();}

// ---------- analyse d'un résultat (fonctionne aussi sur les anciennes calibrations de 12 questions) ----------
const BAND=r=>r>=.85?{k:'top',e:'🏆',t:'Très à l’aise'}:r>=.65?{k:'good',e:'✅',t:'À l’aise'}:r>=.4?{k:'mid',e:'🟠',t:'En progrès'}:{k:'low',e:'🌱',t:'À construire'};
const noteLabel=n=>n>=18?'Excellent niveau : tu maîtrises déjà presque tout !':n>=15?'Très bon niveau : de solides bases un peu partout.':n>=12?'Bon niveau : tu as de solides bases.':n>=9?'Niveau correct : quelques notions sont à consolider.':n>=5?'Tu as des bases et une belle marge de progression : c’est parti !':'Bienvenue au départ du voyage : Finot va te faire revoir les bases, pas à pas.';
function analyse(rec){
 const rows=(rec.answers||[]).map(a=>{const d=domainOf(a.cid),c=CHMAP[a.cid];return {cid:a.cid,ok:!!a.ok,fam:a.subject||family(a.cid),chap:c?.name||'Notion',icon:c?.icon||'📘',dom:domLabel(d),cat:d.cat,dicon:d.icon,q:a.q||''};});
 const group=(keyOf,seed)=>{const m=new Map();for(const r of rows){const k=keyOf(r),g=m.get(k)||m.set(k,seed(r)).get(k);g.n++;if(r.ok)g.ok++;let ch=g.chapters.find(x=>x.cid===r.cid);if(!ch)g.chapters.push(ch={cid:r.cid,name:r.chap,icon:r.icon,ok:0,n:0});ch.n++;if(r.ok)ch.ok++;}
  return [...m.values()].map(g=>({...g,ratio:g.n?g.ok/g.n:0,band:BAND(g.n?g.ok/g.n:0)}));};
 const subjects=group(r=>r.fam,r=>({...subjectInfo(r.fam),ok:0,n:0,chapters:[]}));
 const domains=group(r=>r.fam+'|'+r.cat+'|'+r.dom,r=>({fam:r.fam,cat:r.cat,name:r.dom,icon:r.dicon,ok:0,n:0,chapters:[]}));
 const ok=rows.filter(r=>r.ok).length,n=rows.length;
 return {rows,subjects,domains,ok,n,note20:rec.note20!=null?rec.note20:Math.round(ok/Math.max(1,n)*20)};}
const listFR=a=>a.length<2?a.join(''):a.slice(0,-1).join(', ')+' et '+a[a.length-1];
const strongOf=(list)=>list.filter(g=>g.n>=1&&g.ratio>=.75).sort((a,b)=>b.ratio-a.ratio||b.n-a.n);
const weakOf=(list)=>list.filter(g=>g.ok<g.n&&g.ratio<.75).sort((a,b)=>a.ratio-b.ratio||b.n-a.n);
function finotMessage(rec,A,mode){
 const nm=S.name?escD(S.name):'',note=A.note20,seed=(S.name||'')+rec.completedAt;
 const intro=note>=15?pickBy([`Bravo ${nm||'toi'} ! Quel beau résultat.`,`Superbe, ${nm||'champion'} ! Tu peux être fier de toi.`],seed)
  :note>=9?pickBy([`Bien joué ${nm||''} ! Tu as de vraies bases et on va les faire grandir.`,`Joli travail, ${nm||'explorateur'} ! Tu as déjà beaucoup de choses acquises.`],seed)
  :pickBy([`Merci d’avoir joué le jeu, ${nm||'explorateur'} ! Ce test sert justement à voir par où commencer.`,`Courage, ${nm||'explorateur'} : savoir où l’on en est, c’est déjà la moitié du chemin !`],seed);
 const units=mode==='all'?A.subjects:A.domains,what=mode==='all'?'matière':'domaine';
 const st=strongOf(units).filter(g=>g.n>=2||units.length<3).slice(0,3),wk=weakOf(units).filter(g=>g.n>=2||units.length<3).slice(0,3);
 const lab=g=>`<b>${escD(g.name)}</b> (${g.ok}/${g.n})`;
 const parts=[intro];
 if(st.length)parts.push(`Là où tu brilles : ${listFR(st.map(lab))}.`);
 if(wk.length)parts.push(`Là où tu as le plus à gagner : ${listFR(wk.map(lab))}. Rien d’inquiétant : on y va pas à pas, avec des exercices à ta mesure.`);
 if(!st.length&&!wk.length)parts.push(`Ton niveau est plutôt homogène d’une ${what} à l’autre : on va l’affiner en jouant.`);
 parts.push('Ton parcours a été ajusté en conséquence.');
 return parts.join(' ');}
const TIPS_WEAK=['c’est là que tu vas le plus progresser.','quelques exercices et ça va venir.','on le reprend ensemble, doucement.'],TIPS_MID=['presque ! un peu d’entraînement et c’est acquis.','tu y es presque, il manque un peu de régularité.'];
function domainCard(g,i,showSubject){const b=g.band,tip=g.n<2?'une seule question : à confirmer avec la calibration de la matière.':g.ratio<.4?pickBy(TIPS_WEAK,g.name+i):g.ratio<.75?pickBy(TIPS_MID,g.name+i):'tu maîtrises bien cette partie.';
 return `<div class="card cal-dom cal-${b.k}"><div class="cal-domtop"><span class="cal-domname">${g.icon||''} ${escD(g.name)}${showSubject?` <small class="muted">· ${escD(subjectInfo(g.fam).name)}</small>`:''}</span><span class="cal-score">${b.e} ${g.ok}/${g.n}</span></div><div class="cal-meter" aria-hidden="true"><i style="width:${Math.round(g.ratio*100)}%"></i></div><p class="muted small">${g.n<2?'':b.t+' — '}${tip}</p><ul class="cal-chaps">${g.chapters.map(c=>`<li class="${c.ok===c.n?'ok':c.ok?'part':'ko'}"><span aria-hidden="true">${c.ok===c.n?'✅':c.ok?'🟠':'❌'}</span> ${escD(c.name)}${c.n>1?` <small>(${c.ok}/${c.n})</small>`:''}</li>`).join('')}</ul></div>`;}
function subjectCard(g){const b=g.band;return `<div class="card cal-sub cal-${b.k}"><div class="cal-domtop"><span class="cal-domname">${g.emoji} ${escD(g.name)}</span><span class="cal-score">${b.e} ${g.ok}/${g.n}</span></div><div class="cal-meter" aria-hidden="true"><i style="width:${Math.round(g.ratio*100)}%"></i></div><p class="muted small">${b.t}${g.n<3?' — seulement '+g.n+' question'+(g.n>1?'s':'')+' : résultat indicatif':''}</p></div>`;}
function journey(A,mode){
 const units=A.domains,wk=weakOf(units),weakKeys=new Map(wk.map((g,i)=>[g.fam+'|'+g.cat+'|'+g.name,i]));
 const missed=A.rows.filter(r=>!r.ok).map(r=>({...r,w:weakKeys.get(r.fam+'|'+r.cat+'|'+r.dom)??99})).sort((a,b)=>a.w-b.w);
 const seen=new Set(),steps=[];for(const r of missed){if(seen.has(r.cid))continue;seen.add(r.cid);steps.push({cid:r.cid,name:r.chap,why:`Tu as hésité en « ${r.dom} » : on consolide cette notion.`,kind:'work'});if(steps.length>=(mode==='all'?3:4))break;}
 const bestDom=strongOf(units)[0];if(bestDom){const ch=bestDom.chapters.find(c=>c.ok===c.n);if(ch&&!seen.has(ch.cid))steps.push({cid:ch.cid,name:ch.name,why:`Tu es à l’aise en « ${bestDom.name} » : va plus loin avec un niveau plus difficile.`,kind:'up'});}
 return steps;}
function showResult(rec,mode){mode=mode||rec.mode||'all';const A=analyse(rec);CUR='diagnostic-done';
 const n=A.n,isAll=mode==='all',title=isAll?'Calibration terminée':`Calibration · ${escD(subjectInfo(mode).name)}`;
 const steps=journey(A,mode),others=subjectsAvailable().filter(s=>s.count>=MIN_SUBJECT_CHAPTERS&&s.id!==mode);
 const st=strongOf(A.domains).slice(0,5),wk=weakOf(A.domains).slice(0,5);
 const line=(g,k)=>`<li>${k==='s'?'💪':'🌱'} <b>${escD(g.name)}</b> <span class="muted">(${isAll?escD(subjectInfo(g.fam).name)+' · ':''}${g.ok}/${g.n})</span></li>`;
 app.innerHTML=`${bar('🧭 Mon bilan','diaghub')}<div class="cal">
  <div class="card cal-hero"><div class="bigicon" aria-hidden="true">🧭</div><h1>${title}</h1><div class="diag-note" role="status"><b class="big">${A.note20} / 20</b><span class="muted">${A.ok} bonne${A.ok>1?'s':''} réponse${A.ok>1?'s':''} sur ${n}</span></div><p class="lead">${noteLabel(A.note20)}</p><p class="cal-finot">🦊 ${finotMessage(rec,A,mode)}</p><p class="muted small">Cette note ne change ni ton XP ni tes pièces. Finot s’en sert pour choisir des exercices ni trop faciles, ni trop difficiles.</p></div>
  ${isAll?`<h2 class="sec">📊 Ton niveau par matière</h2><div class="cal-grid">${A.subjects.map(subjectCard).join('')}</div>`:''}
  <h2 class="sec">🔎 ${isAll?'Détail par domaine':'Ton niveau par domaine'}</h2><div class="cal-grid">${A.domains.slice().sort((a,b)=>a.fam.localeCompare(b.fam)).map((g,i)=>domainCard(g,i,isAll)).join('')}</div>
  ${st.length?`<h2 class="sec">💪 Tes points forts</h2><div class="card"><ul class="cal-list">${st.map(g=>line(g,'s')).join('')}</ul></div>`:''}
  ${wk.length?`<h2 class="sec">🌱 À travailler, pas à pas</h2><div class="card"><ul class="cal-list">${wk.map(g=>line(g,'w')).join('')}</ul><p class="muted small">Pas de panique : ce sont les endroits où tu vas gagner le plus de points.</p></div>`:'<div class="card"><p>🎉 Aucune faiblesse repérée : continue comme ça !</p></div>'}
  ${steps.length?`<h2 class="sec">🧭 Ton parcours conseillé</h2><div class="cal-steps">${steps.map((s,i)=>`<div class="card cal-step"><span class="cal-num" aria-hidden="true">${i+1}</span><div class="grow"><b>${escD(s.name)}</b><p class="muted small">${escD(s.why)}</p></div><button class="btn ${s.kind==='work'?'primary':'ghost'} sm" data-a="chap:${escD(s.cid)}">${s.kind==='work'?'Commencer':'Voir'}</button></div>`).join('')}</div>`:''}
  <details class="card cal-detail"><summary>📋 Voir le détail des ${n} questions</summary><ol class="cal-qlist">${A.rows.map(r=>`<li class="${r.ok?'ok':'ko'}"><span aria-hidden="true">${r.ok?'✅':'❌'}</span> <b>${escD(r.chap)}</b> <small class="muted">— ${escD(r.dom)}</small>${r.ok||!r.q?'':`<div class="muted small">${escD(r.q.slice(0,180))}</div>`}</li>`).join('')}</ol></details>
  ${others.length?`<h2 class="sec">🎯 Affiner par matière</h2><p class="muted small">20 questions de plus dans une seule matière : Finot te dit précisément ce qui va bien et ce qui est à revoir.</p><div class="cal-subs">${others.map(s=>`<button class="btn ghost" data-a="diagsub:${escD(s.id)}">${s.emoji} ${escD(s.name)}</button>`).join('')}</div>`:''}
  <button class="btn primary big wide" data-a="home">Voir mon parcours</button></div>`;
 window.scrollTo(0,0);}
function finish(){
 const ans=D.answers,n=ans.length||total(),ok=ans.filter(x=>x.ok).length,by={};
 for(const a of ans){const x=by[a.subject]||(by[a.subject]={ok:0,n:0});x.n++;if(a.ok)x.ok++;}for(const x of Object.values(by))x.score=Math.round(x.ok/x.n*100);
 const mode=D.mode||'all',note20=Math.round(ok/n*20),rec={completedAt:Date.now(),grade:S.grade,mode,score:Math.round(ok/n*100),note20,ok,total:n,subjects:by,answers:ans};
 if(mode==='all'){S.diagnostic=rec;
  // Si le parcours du jour n'a pas commencé, on le régénère pour exploiter immédiatement le diagnostic.
  try{if(S.path&&pathDoneCount(S.path)===0){S.path=null;ensurePath();}}catch(e){}
 }else{S.calibrations=S.calibrations&&typeof S.calibrations==='object'?S.calibrations:{};S.calibrations[mode]=rec;delete S.calib;}
 D=null;saveLocal();showResult(rec,mode);}

// ---------- « Mon niveau » : calibrations disponibles et bilans enregistrés ----------
function hub(){D=null;CUR='diagnostic-hub';const subs=subjectsAvailable().filter(s=>s.count>=MIN_SUBJECT_CHAPTERS),g=S.diagnostic,done=!!g?.completedAt&&g.answers,cal=S.calibrations||{};
 const when=t=>t?new Date(t).toLocaleDateString('fr-FR'):'';
 const row=(icon,name,rec,startAct,showAct,resume,noRedo)=>`<div class="card cal-hubrow"><span class="cal-hubicon" aria-hidden="true">${icon}</span><div class="grow"><b>${name}</b><div class="muted small">${rec?.completedAt?`${rec.note20!=null?rec.note20:Math.round((rec.ok||0)/Math.max(1,rec.total||NQ)*20)} / 20 · ${rec.ok}/${rec.total} · ${when(rec.completedAt)}`:resume?'En pause : reprends où tu t’étais arrêté.':'Pas encore fait'}</div></div>${rec?.answers?`<button class="btn ghost sm" data-a="${showAct}">Bilan</button>`:''}${noRedo&&rec?.completedAt?'':`<button class="btn ${rec?.completedAt?'ghost':'primary'} sm" data-a="${startAct}">${rec?.completedAt?'Refaire':resume?'Reprendre':'Commencer'}</button>`}</div>`;
 app.innerHTML=`${bar('🧭 Mon niveau','home')}<p class="muted">20 questions, 20 points : une note sur 20 et un bilan détaillé de ce qui va bien et de ce qui est à revoir. Aucun XP ni pièce n’est gagné ou perdu.</p>
  <h2 class="sec">🧭 Calibration générale</h2>${row('🧭','Toutes les matières',done?g:null,'diagstart','diagshow:all',!!S.diagnostic?.active,true)}
  ${subs.length?`<h2 class="sec">🎯 Calibrer une matière</h2>${subs.map(s=>row(s.emoji,escD(s.name),cal[s.id],'diagsub:'+s.id,'diagshow:'+s.id,S.calib?.active?.mode===s.id,false)).join('')}`:''}`;
 window.scrollTo(0,0);}
function start(mode='all'){
 const pend=mode==='all'?(S.diagnostic?.active):(S.calib?.active&&S.calib.active.mode===mode?S.calib.active:null);
 if(pend&&pend.grade===S.grade)D=pend;else{D=create(mode);if(!D)return toast('Calibration indisponible pour cette classe.');persist();}
 render();}
// Carte proposée sur l'accueil uniquement, insérée de façon synchrone après son rendu (jamais dans une mission ouverte entre-temps).
function card(){if(typeof CUR!=='undefined'&&CUR!=='home')return;if(typeof HOMETAB!=='undefined'&&HOMETAB!=='accueil')return;if(!S||!S.name)return;if(!eligible()||document.querySelector('.diag-home-card'))return;const target=document.getElementById('app');if(!target)return;const b=document.createElement('button');b.className='card reco diag-home-card';b.dataset.a='diagstart';b.innerHTML='<span class="ri">🧭</span><span><small>Une seule fois · 20 questions · note sur 20</small><b>Calibrer mon niveau</b><span class="muted">20 petites questions pour que Finot adapte mieux les exercices et te dise ce qui va bien et ce qui est à revoir.</span></span><span class="go">Commencer</span>';const anchor=target.querySelector('.goal,.reco');const head=target.querySelector('header.top');anchor?anchor.insertAdjacentElement('afterend',b):head?head.insertAdjacentElement('afterend',b):target.prepend(b);}
// Accès permanent à « Mon niveau » depuis Progrès et Plus.
function hubCard(){if(typeof CUR!=='undefined'&&CUR!=='home')return;if(typeof HOMETAB==='undefined'||!['progres','plus'].includes(HOMETAB))return;if(!S||!S.name||document.querySelector('.diag-hub-card'))return;const body=document.querySelector('.hometab-body');if(!body)return;const b=document.createElement('button');b.className='card reco diag-hub-card';b.dataset.a='diaghub';b.innerHTML='<span class="ri" aria-hidden="true">🧭</span><span><small>Calibrations et bilans</small><b>Mon niveau</b><span class="muted">Note sur 20, points forts et notions à travailler, par matière.</span></span><span class="go">Ouvrir</span>';body.prepend(b);}
MQHooks.on('home:rendered',()=>{card();hubCard();},{id:'diagnostic-card'});
// Entrée dans un champ de réponse : même validation que le bouton « Valider ». Une touche maintenue ne valide pas deux fois,
// et la question suivante (champ vide) n'est jamais soumise : answer() refuse une réponse vide.
document.addEventListener('keydown',e=>{if(e.key!=='Enter'||e.repeat||typeof CUR==='undefined'||CUR!=='diagnostic'||!D)return;if(!/^di\d+$/.test(e.target?.id||''))return;e.preventDefault();answer();});
Object.assign(ACT,{diagstart:()=>start('all'),diagsub:f=>start(String(f||'maths')),diaghub:()=>hub(),diagshow:m=>{m=String(m||'all');const rec=m==='all'?S.diagnostic:S.calibrations?.[m];if(rec&&rec.answers)showResult(rec,m);else hub();},diagpick:i=>answer(+i),diagvalid:()=>answer(),diagtok:i=>{const q=current()?.q;if(!q||q.type!=='order')return;q._sel=q._sel||[];if(!q._sel.includes(+i))q._sel.push(+i);render();},diagundo:()=>{const q=current()?.q;if(q?.type==='order'){q._sel=q._sel||[];q._sel.pop();render();}},diagpause:()=>{persist();D=null;home();},diagskip:()=>{S.diagnostic={skippedAt:Date.now()};saveLocal();home();}});
window.MQDiagnostic={version:'2.0',NQ,eligible,buildPlan,quotas,analyse,domainOf,subjectsAvailable,start,create};card();
})();
