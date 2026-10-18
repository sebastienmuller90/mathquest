/* ===== MathQuest — Moteur de lecture et compréhension (CP → 3e) =====
   Sélection adaptative de questions depuis la bibliothèque (data/reading/resources.js), notation,
   indices progressifs et suivi de maîtrise par compétence — branché sur le carnet d'erreurs existant
   (MQAdaptive.recordMistake, sur le chapitre lié) plutôt que de dupliquer un système séparé.
   Voir docs/reading-system.md pour l'architecture complète. */
(function(){
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const plain=h=>{const d=document.createElement('div');d.innerHTML=String(h||'');return (d.textContent||'').replace(/\s+/g,' ').trim();};

  // Libellés français de la taxonomie de compétences (pour l'affichage parent, point 42 du cahier
  // des charges). Toutes ne sont pas forcément utilisées par le contenu du moment — la liste reste
  // volontairement plus large pour accueillir du contenu futur sans changer l'architecture.
  const COMPETENCIES={
    READ_EXPLICIT:'Informations explicites',READ_CHARACTER:'Personnages',READ_PLACE:'Lieux',
    READ_TIME:'Moment / époque',READ_SEQUENCE:'Ordre des événements',READ_CAUSE_CONSEQUENCE:'Causes et conséquences',
    READ_VOCAB_CONTEXT:'Vocabulaire en contexte',READ_REFERENCE:'Pronoms et référents',READ_INFERENCE:'Inférences',
    READ_EMOTION_INTENTION:'Sentiments et intentions',READ_NARRATOR_POV:'Narrateur et point de vue',
    READ_MAIN_IDEA:'Idée principale et résumé',READ_AUTHOR_INTENT:'Intention de l’auteur',
    READ_JUSTIFY:'Justification par le texte',READ_DOCUMENT_SOURCE:'Sources d’un document',
    READ_ARGUMENT:'Argumentation',READ_STRUCTURE:'Structure du texte',READ_GENRE:'Genre et registre',
    READ_COMPARE_DOCUMENTS:'Comparaison de documents'
  };

  function bank(){return (window.MQ_READING&&window.MQ_READING.resources)||{};}
  function get(id){return bank()[id]||null;}
  function resourcesForChapter(chapterId){return Object.values(bank()).filter(r=>r.chapterLinks.includes(chapterId));}

  // Pour l'instant, au plus 1 support par chapitre dans le contenu réel — mais l'architecture accepte
  // plusieurs supports par chapitre (ex. plus tard) : on choisit alors celui vu le moins récemment.
  function pickResource(chapterId,state){
    const list=resourcesForChapter(chapterId);
    if(!list.length)return null;
    const prog=(state&&state.readingProgress)||{};
    list.sort((a,b)=>((prog[a.id]&&prog[a.id].lastSeen)||0)-((prog[b.id]&&prog[b.id].lastSeen)||0));
    return list[0];
  }

  function avgReadingMastery(state){
    const m=(state&&state.readingMastery)||{};
    const vals=Object.values(m).map(x=>x.value);
    if(!vals.length)return 30; // valeur neutre de départ : ni trop facile, ni trop dur dès la 1re fois.
    return vals.reduce((s,v)=>s+v,0)/vals.length;
  }
  function worstMastery(q,mastery){
    const comps=q.competencies||[];
    const vals=comps.map(c=>mastery[c]&&mastery[c].value).filter(v=>v!=null);
    return vals.length?Math.min(...vals):null;
  }

  // Sélection adaptative (point 13 et 14 du cahier des charges) : priorité aux compétences fragiles,
  // puis proximité avec le niveau de lecture courant de l'élève, avec un peu de hasard pour varier
  // d'une session à l'autre sans jamais reposer exactement les mêmes questions à chaque fois.
  function pickSession(resource,state,count){
    if(!resource)return [];
    const qs=resource.questions||[];
    const n=Math.max(1,Math.min(count||resource.sessionSize||qs.length,qs.length));
    const mastery=(state&&state.readingMastery)||{};
    const avg=avgReadingMastery(state);
    const targetDiff=Math.max(1,Math.min(8,Math.round(1+avg/100*7)));
    const scored=qs.map(q=>{
      const m=worstMastery(q,mastery);
      let score=0;
      if(m!=null&&m<55)score+=40;else if(m==null)score+=15;
      score+=10-Math.abs((q.difficulty||targetDiff)-targetDiff);
      score+=Math.random()*5;
      return {q,score};
    });
    scored.sort((a,b)=>b.score-a.score);
    return scored.slice(0,n).map(x=>prepare(x.q));
  }

  // Les questions sont écrites avec la bonne réponse en premier (QCM) et les étiquettes dans le bon
  // ordre (remise en ordre) : on mélange une copie à chaque session, comme le font les générateurs
  // d'exercices (H.ch / shuffle), sans jamais modifier la banque partagée.
  function shuffled(a){const r=a.slice();for(let i=r.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[r[i],r[j]]=[r[j],r[i]];}return r;}
  function prepare(q){
    const c={...q};
    if(q.type==='choice'&&Array.isArray(q.choices)){
      // Vrai/Faux (et Oui/Non) gardent leur ordre naturel.
      const fixed=q.choices.length===2&&/^(vrai|oui)$/i.test(q.choices[0]);
      const order=fixed?[0,1]:shuffled(q.choices.map((_,i)=>i));
      c.choices=order.map(i=>q.choices[i]);c.ans=order.indexOf(q.ans);
    }else if(q.type==='order'&&Array.isArray(q.tokens)){
      let t=shuffled(q.tokens),k=0;
      while(q.tokens.length>1&&t.join('\u0001')===q.tokens.join('\u0001')&&k++<30)t=shuffled(q.tokens);
      c.tokens=t;c._orig=q.tokens.slice();c._sel=[];
    }
    return c;
  }

  // Notation : les types standards (choice/text/order) sont délégués à la fonction check() déjà
  // utilisée par tout le moteur d'exercices — seul le type "evidence" (justification par preuve,
  // point 12) est propre à la lecture : l'élève désigne un paragraphe du texte comme preuve.
  function gradeAnswer(q,response){
    if(q.type==='evidence')return response===q.evidenceParagraph;
    return window.check(q,response);
  }

  // Indices progressifs génériques (point 15) : réutilisables sur toute question sans texte d'indice
  // écrit à la main — un élève qui résout seul garde 100% de la maîtrise, un élève aidé en garde moins.
  function hintText(q,level){
    const texts=[
      q.evidenceParagraph!=null?`Relis le paragraphe ${q.evidenceParagraph+1} du texte.`:'Relis le texte en entier avant de répondre.',
      'Cherche dans le texte les mots qui ressemblent à ceux de la question : ils te guident vers la bonne phrase.',
      'Élimine d’abord les réponses qui ne sont dites nulle part dans le texte.'
    ];
    return texts[Math.max(0,Math.min(level,texts.length-1))];
  }
  function hintPenalty(hintsUsed){return hintsUsed<=0?1:hintsUsed===1?.65:.35;}

  function updateMastery(state,competency,ok,hintsUsed){
    window.MQAdaptive.ensureState(state);
    state.readingMastery=state.readingMastery||{};
    const cur=state.readingMastery[competency]||{value:30,n:0};
    const credit=ok?hintPenalty(hintsUsed||0):0;
    const alpha=cur.n<5?.4:.2;
    const value=Math.round(Math.max(0,Math.min(100,cur.value+(credit*100-cur.value)*alpha)));
    state.readingMastery[competency]={value,n:cur.n+1,at:Date.now()};
    return value;
  }

  function responseLabel(q,response){
    if(q.type==='choice')return q.choices[response]??'';
    if(q.type==='evidence')return 'Paragraphe '+((response|0)+1);
    return String(response??'');
  }

  // Enregistre les résultats d'une session : met à jour la maîtrise par compétence ET alimente le
  // carnet d'erreurs déjà existant (point 21) sur le chapitre lié, sans créer de système parallèle.
  function recordResult(state,resource,chapterId,results){
    state.readingProgress=state.readingProgress||{};
    const prog=state.readingProgress[resource.id]||{started:Date.now(),attempts:0};
    prog.lastSeen=Date.now();prog.attempts=(prog.attempts||0)+1;
    const ok=results.filter(r=>r.ok).length;
    prog.bestScore=Math.max(prog.bestScore||0,results.length?Math.round(ok/results.length*100):0);
    prog.completed=true;
    state.readingProgress[resource.id]=prog;
    results.forEach(r=>{
      (r.q.competencies||[]).forEach(c=>updateMastery(state,c,r.ok,r.hintsUsed||0));
      if(!r.ok){
        window.MQAdaptive.recordMistake(state,chapterId,{
          q:plain(r.q.prompt),
          answer:plain(responseLabel(r.q,r.response)),
          expl:plain(r.q.explanation||'')
        });
      }
    });
    return {ok,total:results.length,score:results.length?Math.round(ok/results.length*100):0};
  }

  function masterySummary(state){
    const m=(state&&state.readingMastery)||{};
    return Object.entries(m).map(([k,v])=>({competency:k,label:COMPETENCIES[k]||k,value:v.value,n:v.n}));
  }

  // HTML du texte à lire, avec glossaire cliquable (point 16) — un seul passage par mot pour ne pas
  // surcharger visuellement un paragraphe qui répéterait le même mot plusieurs fois.
  // Pas de lookbehind (absent de Safari < 16.4) : le caractère qui précède est capturé puis remis.
  function glossRe(word){return new RegExp('(^|[^\\p{L}\\p{N}_])('+word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')(?![\\p{L}\\p{N}_])','iu');}
  function textHTML(resource){
    const glossary=resource.glossary||[];
    const used=new Set();
    const wrap=p=>{
      let out=esc(p);
      glossary.forEach(g=>{
        if(used.has(g.word))return;
        // Bornes de mot compatibles avec les lettres accentuées (\b ne les reconnaît pas).
        const re=glossRe(g.word);
        if(re.test(out)){used.add(g.word);out=out.replace(re,(m,pre,w)=>`${pre}<button class="gloss-word" data-a="glossdef:${encodeURIComponent(g.word)}">${w}</button>`);}
      });
      return out;
    };
    const typeLabel={literary_text:'Texte littéraire',document:'Document',press_article:'Article de presse'}[resource.type]||'Texte';
    return `<div class="reading-meta"><span class="rm-badge">${esc(resource.documentType||typeLabel)}</span><span class="rm-time">⏱ ${resource.estimatedReadingMinutes||3} min</span>${resource.author?`<span class="rm-author">${esc(resource.author)}${resource.work?' · '+esc(resource.work):''}</span>`:''}</div>
<div class="reading-text${resource.verse?' verse':''}">${resource.paragraphs.map((p,i)=>`<p data-para="${i}"${(resource.stanzas||[]).includes(i)?' class="stz"':''}>${wrap(p)}</p>`).join('')}</div>
${glossary.length?`<p class="reading-glossary-hint">💡 Les mots soulignés ont une petite définition — touche-les pour l’afficher.</p>`:''}`;
  }

  window.MQReading={COMPETENCIES,get,resourcesForChapter,pickResource,pickSession,gradeAnswer,hintText,hintPenalty,updateMastery,recordResult,masterySummary,avgReadingMastery,textHTML,prepare,glossRe};
})();
