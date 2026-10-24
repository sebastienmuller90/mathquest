/* Lecture au primaire, vague 2 (data/reading/resources-primary-wave2.js) : intégrité des données,
   chapitres liés réels de la bonne classe, qualité pédagogique minimale (répartition des bonnes réponses,
   typographie, explications) et parcours navigateur réel de chaque nouveau support (étapes read/readq
   insérées après « Je retiens », questions jouables, pas d'erreur JS, pas de débordement à 320 px). */
const {serve,launch,seedProfile}=require('./lib');
const fs=require('fs');
const path=require('path');
const vm=require('vm');
const LEVELS=['CP','CE1','CE2','CM1','CM2'];
const MAXD={CP:3,CE1:4,CE2:5,CM1:5,CM2:6};

function loadBanks(){
  const ctx={window:{}};ctx.window.window=ctx.window;vm.createContext(ctx);
  const read=f=>fs.readFileSync(path.join(__dirname,'..','data','reading',f),'utf8');
  vm.runInContext(read('resources.js'),ctx,{filename:'resources.js'});
  const base=Object.assign({},ctx.window.MQ_READING.resources);
  vm.runInContext(read('resources-primary-wave2.js'),ctx,{filename:'resources-primary-wave2.js'});
  const all=ctx.window.MQ_READING.resources;
  const added={};Object.keys(all).forEach(k=>{if(!base[k]&&all[k].sourceType)added[k]=all[k];});
  return {base,all,added};
}
const allStrings=r=>{
  const out=[r.title].concat(r.paragraphs);
  (r.glossary||[]).forEach(g=>out.push(g.word,g.definition));
  r.questions.forEach(q=>{out.push(q.prompt,q.explanation);(q.choices||[]).forEach(c=>out.push(c));(q.tokens||[]).forEach(c=>out.push(c));});
  return out;
};

async function run(){
  const R=[];const T=(n,ok,d='')=>R.push({name:n,ok:!!ok,detail:String(d)});
  const {base,all,added}=loadBanks();
  const list=Object.values(added);
  const errors=[];

  // --- 1. Intégrité des données ---
  const byLevel={};LEVELS.forEach(l=>byLevel[l]=0);
  list.forEach(r=>{byLevel[r.level]=(byLevel[r.level]||0)+1;});
  T('Au moins 6 nouveaux supports par niveau du primaire (CP, CE1, CE2, CM1, CM2) et 30 au total',
    LEVELS.every(l=>byLevel[l]>=6)&&list.length>=30,JSON.stringify(byLevel));
  T('Seuls des niveaux du primaire sont ajoutés par ce fichier',list.every(r=>LEVELS.includes(r.level)),list.map(r=>r.level).join(','));

  const idsSeen=new Set(Object.keys(base));let nQ=0;
  const bad=(r,m)=>errors.push(r.id+': '+m);
  list.forEach(r=>{
    if(!/^fr_[a-z0-9_]+_\d\d$/.test(r.id))bad(r,'format d’id inattendu');
    if(idsSeen.has(r.id))bad(r,'id déjà utilisé');idsSeen.add(r.id);
    ['title','documentType','audioMode'].forEach(f=>{if(!r[f])bad(r,'champ '+f+' manquant');});
    if(r.subject!=='francais')bad(r,'matière');
    if(r.sourceType!=='original_mathquest')bad(r,'sourceType attendu original_mathquest');
    if(r.type==='document'&&!/^texte documentaire$/.test(r.documentType)&&!r.sourceReference)bad(r,'document réaliste sans sourceReference');
    if(r.sourceReference&&!/imaginaire|écrit|original/i.test(r.sourceReference))bad(r,'sourceReference sans mention de création');
    if(!r.chapterLinks||!r.chapterLinks.length)bad(r,'chapterLinks');
    if(!r.paragraphs||r.paragraphs.length<4)bad(r,'trop peu de paragraphes');
    if(!r.glossary||!r.glossary.length)bad(r,'glossaire vide');
    if(!(r.difficulty>=1&&r.difficulty<=MAXD[r.level]))bad(r,'difficulté du support hors plage pour '+r.level);
    if(r.level==='CP'&&r.audioMode!=='audioRecommended')bad(r,'CP : audioRecommended attendu');
    if(r.level==='CP'){const w=r.paragraphs.join(' ').split(/\s+/).length;if(w<25||w>85)bad(r,'CP : '+w+' mots');}
    const n=r.questions.length;nQ+=n;
    if(n<8||n>13)bad(r,n+' questions (8 à 13 attendues)');
    if(!(r.sessionSize>=4&&r.sessionSize<=n-3))bad(r,'sessionSize '+r.sessionSize+' trop proche de la banque ('+n+')');
    const g=new Set(),qids=new Set(),prompts=new Set();
    (r.glossary||[]).forEach(x=>{
      const re=new RegExp('(^|[^\\p{L}\\p{N}_])('+x.word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')(?![\\p{L}\\p{N}_])','iu');
      if(!r.paragraphs.some(p=>re.test(p)))bad(r,'glossaire hors texte : '+x.word);
      if(g.has(x.word))bad(r,'glossaire en double : '+x.word);g.add(x.word);
      if(!x.definition||x.definition.length<8)bad(r,'définition trop courte : '+x.word);
    });
    const types={choice:0,text:0,order:0,evidence:0};const ansPos={};let longest=0,multi=0;
    r.questions.forEach(q=>{
      const t=r.id+'/'+q.id;
      if(qids.has(q.id))bad(r,q.id+' dupliqué');qids.add(q.id);
      if(prompts.has(q.prompt))bad(r,q.id+' énoncé en double');prompts.add(q.prompt);
      types[q.type]=(types[q.type]||0)+1;
      if(!q.competencies||!q.competencies.length)bad(r,t+' sans compétence');
      if(!(q.difficulty>=1&&q.difficulty<=MAXD[r.level]))bad(r,t+' difficulté '+q.difficulty+' hors plage pour '+r.level);
      if(!q.explanation||q.explanation.length<20||/^bonne réponse/i.test(q.explanation)||/^voir le glossaire\.?$/i.test(q.explanation))bad(r,t+' correction trop pauvre');
      if(q.evidenceParagraph!=null&&!(q.evidenceParagraph>=0&&q.evidenceParagraph<r.paragraphs.length))bad(r,t+' evidenceParagraph hors limites');
      if(q.type==='choice'){
        if(!Array.isArray(q.choices)||q.choices.length<2||q.choices.length>4)bad(r,t+' nombre de choix');
        else{
          if(!(Number.isInteger(q.ans)&&q.ans>=0&&q.ans<q.choices.length))bad(r,t+' ans invalide');
          if(new Set(q.choices).size!==q.choices.length)bad(r,t+' choix en double');
          if(q.choices.length>=3){multi++;ansPos[q.ans]=(ansPos[q.ans]||0)+1;
            const len=q.choices.map(c=>c.length);const other=Math.max.apply(null,len.filter((x,i)=>i!==q.ans));if(len[q.ans]>=1.4*other&&len[q.ans]-other>=6)longest++;}
          if(q.choices.length===2&&/^vrai ou faux/i.test(q.prompt)&&q.choices.join('|')!=='Vrai|Faux')bad(r,t+' Vrai/Faux dans le désordre');
        }
      }else if(q.type==='text'){
        if(!q.strict)bad(r,t+' text sans strict');
        if(!Array.isArray(q.acc)||!q.acc.length||q.acc.some(a=>!a||!a.trim()))bad(r,t+' acc invalide');
      }else if(q.type==='order'){
        if(!Array.isArray(q.tokens)||q.tokens.length<3)bad(r,t+' order : au moins 3 étiquettes');
        else{
          if(q.tokens.join(' ')!==q.ans)bad(r,t+' ans ≠ tokens.join');
          if(new Set(q.tokens).size!==q.tokens.length)bad(r,t+' étiquettes en double');
          if(q.tokens.some(x=>x.length>60))bad(r,t+' étiquette trop longue');
        }
      }else if(q.type==='evidence'){
        if(q.evidenceParagraph==null)bad(r,t+' evidence sans evidenceParagraph');
      }else bad(r,t+' type inconnu '+q.type);
    });
    if(Object.keys(types).filter(k=>types[k]>0).length<3)bad(r,'moins de 3 types de questions dans la banque');
    if(!types.order)bad(r,'aucune question order');
    if(!types.evidence)bad(r,'aucune question evidence');
    if(!types.text&&r.level!=='CM2'&&r.level!=='CM1'&&r.level!=='CE2')bad(r,'aucune question text');
    if(multi>=5){
      const vals=Object.values(ansPos);const max=Math.max.apply(null,vals);
      if(Object.keys(ansPos).length<2)bad(r,'toutes les bonnes réponses au même rang');
      if(max/multi>0.6)bad(r,'une position concentre '+Math.round(100*max/multi)+' % des bonnes réponses');
      if(longest/multi>0.65)bad(r,'la bonne réponse est nettement la plus longue dans '+Math.round(100*longest/multi)+' % des QCM');
    }
    // Rédaction : pas de TODO, apostrophes/guillemets typographiques, « » avec espaces.
    allStrings(r).forEach(s=>{
      if(typeof s!=='string')return;
      if(/TODO|FIXME|XXX|lorem ipsum|undefined|\[object|\bNaN\b/i.test(s))bad(r,'marqueur interdit : '+s.slice(0,40));
      if(/'/.test(s))bad(r,'apostrophe droite : '+s.slice(0,40));
      if(/"/.test(s))bad(r,'guillemet droit : '+s.slice(0,40));
      if(/«(?![\s ])|(?<![\s ])»/.test(s))bad(r,'« » sans espace : '+s.slice(0,40));
      if(/ {2,}/.test(s)||/ [,.]/.test(s))bad(r,'espacement : '+s.slice(0,40));
      const el=s.match(/(?<![\p{L}’])(le|la|de|ne|se|que|je|me|te|ce|si) [aeiouéèêàâîôù]\p{L}*/giu);
      if(el)el.forEach(x=>{if(!/^(la|le) (ou|oui|un|onze)\b/i.test(x))bad(r,'élision ? « '+x+' »');});
    });
  });
  T('Intégrité des nouveaux supports (champs, questions, glossaire, evidence, order, typographie, répartition des bonnes réponses)',
    !errors.length,errors.slice(0,12).join(' ; ')+(errors.length>12?' … (+'+(errors.length-12)+')':''));
  T('Volume : au moins 250 nouvelles questions',nQ>=250,nQ);

  // Répartition globale des bonnes réponses (QCM à 3 choix ou plus) : aucun rang ne domine.
  const pos=[0,0,0];let tot=0;
  list.forEach(r=>r.questions.forEach(q=>{if(q.type==='choice'&&q.choices.length>=3){pos[q.ans]++;tot++;}}));
  T('Répartition globale des bonnes réponses non dégénérée (chaque rang entre 20 % et 45 %)',
    pos.every(x=>x/tot>=0.2&&x/tot<=0.45),JSON.stringify(pos));

  // Mots du texte absents de la liste interdite : pas d'œuvre moderne protégée citée.
  const prot=/Harry Potter|Tintin|Astérix|Petit Prince|Mourlevat|Morpurgo|Rowling|Pennac|Ernaux|Disney|Pokémon|Minecraft/i;
  T('Aucune œuvre ou marque moderne protégée dans les nouveaux supports',!list.some(r=>allStrings(r).some(s=>prot.test(s||''))));

  // Couverture : chapitres nouvellement liés (par rapport à resources.js seul).
  const baseLinked=new Set();Object.values(base).forEach(r=>r.chapterLinks.forEach(c=>baseLinked.add(c)));
  const newLinked=new Set();list.forEach(r=>r.chapterLinks.forEach(c=>{if(!baseLinked.has(c))newLinked.add(c);}));
  T('Au moins 30 chapitres de français du primaire nouvellement reliés à un texte',newLinked.size>=30,newLinked.size+' : '+[...newLinked].join(','));
  T('Aucun chapitre déjà lié n’est détourné : chaque nouveau support vise au moins un chapitre non encore lié',
    list.every(r=>r.chapterLinks.some(c=>!baseLinked.has(c))),list.filter(r=>!r.chapterLinks.some(c=>!baseLinked.has(c))).map(r=>r.id).join(','));

  // --- 2. Dans le vrai moteur : chapitres, compétences, parcours complet ---
  const {srv,url}=await serve();const b=await launch();const p=await b.newPage();
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(url+'index.html',{waitUntil:'load'});
  await seedProfile(p,'Lecteur','CM1');
  await p.waitForTimeout(150);

  const ids=list.map(r=>r.id);
  const struct=await p.evaluate(ids=>{
    const bad=[];const lvlOf=id=>{const w=WMAP[id];return w&&w.lvl;};
    ids.forEach(id=>{
      const r=MQ_READING.resources[id];
      if(!r){bad.push(id+' absent de la bibliothèque chargée par index.html');return;}
      r.chapterLinks.forEach(cid=>{
        if(!CHMAP[cid]){bad.push(id+' -> '+cid+' introuvable');return;}
        const w=WMAP[cid],subj=w?sOf(w.id).id:null;
        if(subj!=='p-francais')bad.push(id+' -> '+cid+' (matière '+subj+')');
        if(lvlOf(cid)!==r.level)bad.push(id+' -> '+cid+' (classe '+lvlOf(cid)+' ≠ '+r.level+')');
      });
      r.competencies.forEach(c=>{if(!MQReading.COMPETENCIES[c])bad.push(id+' compétence inconnue '+c);});
      r.questions.forEach(q=>q.competencies.forEach(c=>{if(!MQReading.COMPETENCIES[c])bad.push(id+'/'+q.id+' compétence inconnue '+c);}));
    });
    return bad;
  },ids);
  T('Chapitres liés réels, de la matière Français et de la bonne classe ; compétences toutes connues de MQReading.COMPETENCIES',
    !struct.length,struct.slice(0,6).join(' ; '));

  // Parcours : pour chaque support, ouvrir son premier chapitre lié dans la classe correspondante,
  // vérifier l'insertion read>readq après « ret », jouer toute la session (justes et fausses), atteindre « practice ».
  const flows=[];
  for(const lvl of LEVELS){
    await seedProfile(p,'Lecteur',lvl);await p.waitForTimeout(80);
    const mine=list.filter(r=>r.level===lvl).map(r=>r.id);
    const out=await p.evaluate(mine=>{
      const res=[];
      mine.forEach(rid=>{
        const r=MQ_READING.resources[rid];const link=r.chapterLinks[0];
        const one={rid,link};
        try{
          S.readingProgress={};
          openLesson(link);
          const kinds=L.steps.map(s=>s.k).filter(k=>!/^mq/.test(k));
          one.kinds=kinds.join('>');
          const st=L.steps.filter(x=>!/^mq/.test(x.k));const iRead=st.findIndex(x=>x.k==='read'&&x.resourceId===rid);
          const iRet=st.findIndex(x=>x.k==='ret');const iPr=st.findIndex(x=>x.k==='practice');
          one.inserted=iRead>iRet&&iRet>0&&st[iRead+1].k==='readq'&&st[iRead+1].resourceId===rid&&iPr===iRead+2;
          let guard=0,answered=0,right=0,types={};
          while(guard++<60&&L){
            const s=L.steps[L.i];
            if(s.k==='read'){
              const g=document.querySelector('.gloss-word');if(g)ACT.glossdef(g.dataset.a.split(':')[1]);
              one.textOK=!!document.querySelector('.reading-text')&&r.paragraphs.every((p,i)=>document.querySelector('.reading-text [data-para="'+i+'"]'));
              ACT.lnext();continue;
            }
            if(s.k==='readq'){
              const q=L.rq;const wrong=L.rqn%3===2;types[q.type]=(types[q.type]||0)+1;
              if(q.type==='choice')ACT.rpick(wrong?(q.ans+1)%q.choices.length:q.ans);
              else if(q.type==='evidence')ACT.rpick(wrong?(q.evidenceParagraph+1)%r.paragraphs.length:q.evidenceParagraph);
              else if(q.type==='order'){q._sel=q._orig.map(t=>q.tokens.indexOf(t));if(wrong)q._sel.reverse();ACT.rvalid();}
              else{document.getElementById('in0').value=wrong?'zzz':q.acc[0];ACT.rvalid();}
              if(!wrong)right++;answered++;
              one.fb=(one.fb||0)+(document.querySelector('#fb .fb')?1:0);
              ACT.rqnext();continue;
            }
            if(s.k==='practice'||s.k==='quiz')break;
            ACT.lnext();
          }
          one.reachedPractice=!!L&&L.steps[L.i].k==='practice';
          one.answered=answered;one.right=right;one.types=Object.keys(types).length;
          one.progress=S.readingProgress[rid]||null;
        }catch(e){one.err=String(e&&e.message||e);}
        res.push(one);
      });
      return res;
    },mine);
    flows.push(...out);
  }
  const notOk=flows.filter(f=>f.err||!f.inserted||!f.reachedPractice||!f.textOK||f.answered<4||!(f.progress&&f.progress.completed)||f.fb!==f.answered);
  T('Chaque nouveau support : étapes read/readq insérées juste après « Je retiens », texte complet affiché, session jouable de bout en bout jusqu’à « Je m’entraîne », progression enregistrée',
    flows.length===list.length&&!notOk.length,JSON.stringify(notOk.slice(0,3)));

  // Chapitres sans support dans la vague 2 : étapes inchangées (non-régression ciblée sur un chapitre non lié).
  await seedProfile(p,'Lecteur','CE2');await p.waitForTimeout(80);
  const untouched=await p.evaluate(()=>{openLesson('ce2-fr-dictee');return L.steps.map(s=>s.k).filter(k=>!/^mq/.test(k)).join('>');});
  T('Un chapitre de pure orthographe (ce2-fr-dictee) reste sans étape de lecture',!/read/.test(untouched),untouched);

  // --- 3. Pas de débordement à 320 px : texte et question de chaque niveau ---
  await p.setViewportSize({width:320,height:640});
  const overflow=[];
  for(const lvl of LEVELS){
    await seedProfile(p,'Lecteur',lvl);await p.waitForTimeout(80);
    const rids=list.filter(r=>r.level===lvl).map(r=>r.id);
    for(const rid of rids){
      const w=await p.evaluate(rid=>{
        const r=MQ_READING.resources[rid];openLesson(r.chapterLinks[0]);
        while(L.steps[L.i].k!=='read')ACT.lnext();
        const a=document.documentElement.scrollWidth-document.documentElement.clientWidth;
        ACT.lnext();
        const b2=document.documentElement.scrollWidth-document.documentElement.clientWidth;
        const t=document.querySelector('.qtext');
        return {a,b:b2,q:!!t};
      },rid);
      if(w.a>1||w.b>1||!w.q)overflow.push(rid+':'+JSON.stringify(w));
    }
  }
  T('Aucun débordement horizontal à 320 px (étape de lecture et première question de chacun des 30 supports)',!overflow.length,overflow.slice(0,4).join(' ; '));
  await p.setViewportSize({width:1280,height:800});

  // --- 4. Bibliothèque de lecture : les nouveaux supports y sont ouvrables ---
  await seedProfile(p,'Lecteur','CP');await p.waitForTimeout(80);
  const lib=await p.evaluate(ids=>{
    const out=[];
    ids.slice(0,3).forEach(id=>{ACT.libopen(id);out.push(L&&L.lib===id&&L.steps.map(s=>s.k).join('>')==='read>readq');});
    return out;
  },ids);
  T('Les nouveaux supports s’ouvrent depuis la bibliothèque de lecture (read>readq)',lib.every(Boolean),JSON.stringify(lib));

  T('Aucune erreur JavaScript pendant tous les parcours',!errs.length,errs.slice(0,3).join(' | '));
  await b.close();srv.close();
  return R;
}
if(require.main===module)require('./lib').main(run);
module.exports=run;
