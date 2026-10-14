(function(){
  // École primaire puis collège. Les anciennes valeurs (6e…3e) restent valides telles quelles.
  const LEVELS=['CP','CE1','CE2','CM1','CM2','6e','5e','4e','3e'];
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const day=86400000;
  function recentAccuracy(state,id){const a=state?.recent?.[id];if(!Array.isArray(a)||!a.length)return null;return a.reduce((s,x)=>s+(x?1:0),0)/a.length;}
  function chapterAccuracy(state,id){const s=state?.chap?.[id];return s&&s.tot? s.ok/s.tot : null;}
  function mastery(state,id){
    const r=recentAccuracy(state,id),a=chapterAccuracy(state,id),best=state?.lessonScores?.[id]||0,stars=state?.chap?.[id]?.stars||0,done=!!state?.lessons?.[id];
    if(r==null&&a==null&&!best&&!done)return 0;
    let w=0,s=0;
    if(r!=null){s+=r*45;w+=45;}
    if(a!=null){s+=a*20;w+=20;}
    if(best){s+=(best/100)*20;w+=20;}
    s+=(stars/3)*10;w+=10;
    s+=(done?1:0)*5;w+=5;
    return Math.round(clamp((s/Math.max(1,w))*100,0,100));
  }
  function masteryLabel(v){v=+v||0;return v>=85?{k:'mastered',e:'🏆',t:'Maîtrisé'}:v>=65?{k:'acquired',e:'✅',t:'Acquis'}:v>=40?{k:'learning',e:'🟠',t:'En cours'}:v>0?{k:'fragile',e:'🔴',t:'Fragile'}:{k:'new',e:'🌱',t:'Nouveau'};}
  function isDue(state,id,now=Date.now()){const r=state?.review?.[id];return !!r&&(!r.next||r.next<=now);}
  function dueInText(state,id,now=Date.now()){const r=state?.review?.[id];if(!r||!r.next)return 'à programmer';const d=r.next-now;if(d<=0)return 'à revoir maintenant';const days=Math.max(1,Math.ceil(d/day));return `dans ${days} jour${days>1?'s':''}`;}
  function scheduleReview(state,id,quality='practice',score=null){state.review=state.review||{};const m=mastery(state,id);let days;
    if(quality==='lesson')days=score>=95?7:score>=80?3:1;
    else if(m>=90)days=14;else if(m>=80)days=7;else if(m>=65)days=3;else days=1;
    state.review[id]={last:Date.now(),next:Date.now()+days*day,days,mastery:m};return state.review[id];
  }
  function scoreChapter(state,c){const ra=recentAccuracy(state,c.id),ca=chapterAccuracy(state,c.id),m=mastery(state,c.id),best=state?.lessonScores?.[c.id]||0,done=!!state?.lessons?.[c.id];
    let p=(100-m)*.55;if(ra!=null)p+=(1-ra)*45;else if(ca!=null)p+=(1-ca)*28;else p+=24;if(!done)p+=18;if(best&&best<70)p+=12;if(isDue(state,c.id))p+=25;return p;}
  function recommendation(state,chapters,wmap,grade){let list=chapters.slice();if(grade){const same=list.filter(c=>wmap[c.id]?.lvl===grade);if(same.length)list=same;}list.sort((a,b)=>scoreChapter(state,b)-scoreChapter(state,a));return list[0]||chapters[0]||null;}
  function weakChapters(state,chapters,wmap,grade,limit=5){let list=chapters.filter(c=>{const s=state?.chap?.[c.id],r=recentAccuracy(state,c.id);return (s&&s.tot>=2)||r!=null||!state?.lessons?.[c.id]||isDue(state,c.id);});if(grade){const same=list.filter(c=>wmap[c.id]?.lvl===grade);if(same.length)list=same;}return list.map(c=>({c,score:scoreChapter(state,c),acc:recentAccuracy(state,c.id)??chapterAccuracy(state,c.id),mastery:mastery(state,c.id),due:isDue(state,c.id)})).sort((a,b)=>b.score-a.score).slice(0,limit);}
  function difficulty(state,id){const m=mastery(state,id),r=recentAccuracy(state,id),a=r??chapterAccuracy(state,id),stars=state?.chap?.[id]?.stars||0;if(a==null&&m===0)return stars===0?1:stars<3?2:3;if(m<45||(a!=null&&a<.55))return 1;if(m<78||(a!=null&&a<.82))return 2;return 3;}
  function lessonDifficulty(state,id){const m=mastery(state,id);return m>=80?3:m>=45?2:1;}
  function nextDifficulty(current,ok,streak=0){if(ok&&streak>=2)return clamp(current+1,1,3);if(!ok)return clamp(current-1,1,3);return clamp(current,1,3);}
  function ensureState(state){state.mastery=state.mastery||{};state.review=state.review||{};state.mistakes=state.mistakes||{};state.confidence=state.confidence||{};state.adaptive=state.adaptive||{answers:0,adaptations:0};return state;}
  function refreshMastery(state,id){ensureState(state);const m=mastery(state,id);state.mastery[id]={value:m,label:masteryLabel(m).t,at:Date.now()};return m;}
  function recordAnswer(state,id,ok,meta={}){ensureState(state);state.adaptive.answers=(state.adaptive.answers||0)+1;refreshMastery(state,id);return {mastery:state.mastery[id].value};}
  function recordMistake(state,id,item){ensureState(state);const a=state.mistakes[id]||(state.mistakes[id]=[]);a.unshift({q:String(item?.q||'').slice(0,220),answer:String(item?.answer||'').slice(0,180),expl:String(item?.expl||'').slice(0,320),at:Date.now(),seen:0});if(a.length>12)a.length=12;}
  function resolveMistake(state,id){const a=state?.mistakes?.[id];if(!Array.isArray(a))return;const x=a.find(v=>!v.seen);if(x)x.seen=Date.now();}
  function lessonResult(state,id,score,confidence=0){ensureState(state);state.confidence[id]={value:+confidence||0,at:Date.now()};const r=scheduleReview(state,id,'lesson',score);const m=refreshMastery(state,id);return {mastery:m,review:r};}
  function practiceResult(state,id){ensureState(state);const r=scheduleReview(state,id,'practice');const m=refreshMastery(state,id);return {mastery:m,review:r};}
  function coachTip(state,id,ok){const m=mastery(state,id),lab=masteryLabel(m);if(ok){if(m>=85)return 'Très solide. Explique maintenant la méthode avec tes propres mots : c’est le meilleur test de maîtrise.';if(m>=65)return 'Bonne réponse. Cherche maintenant le pourquoi, pas seulement le résultat.';return 'Bien. Répète la méthode une deuxième fois sans regarder l’exemple pour la fixer.';}
    if(m<40)return 'On simplifie : repère d’abord ce que la question demande, puis une seule règle utile. La prochaine question sera plus guidée.';
    return 'L’erreur est utile : compare ta démarche avec la correction, repère l’étape exacte qui a dérapé, puis reformule la règle.';
  }
  function subjectMetrics(state,subject){let ok=0,tot=0,done=0,ms=0;for(const c of subject.chapters){const s=state?.chap?.[c.id];if(s){ok+=s.ok||0;tot+=s.tot||0;}if(state?.lessons?.[c.id])done++;ms+=mastery(state,c.id);}return {ok,tot,acc:tot?Math.round(ok/tot*100):0,done,total:subject.chapters.length,mastery:subject.chapters.length?Math.round(ms/subject.chapters.length):0};}
  function profileMetrics(state,allChapters){const tot=state?.totalQ||0,ok=state?.totalOk||0;const ms=allChapters?.length?Math.round(allChapters.reduce((s,c)=>s+mastery(state,c.id),0)/allChapters.length):0;return {name:state?.name||'Profil',grade:state?.grade||'6e',questions:tot,acc:tot?Math.round(ok/tot*100):0,lessons:Object.keys(state?.lessons||{}).length,stars:Object.values(state?.chap||{}).reduce((s,x)=>s+(x?.stars||0),0),minutes:Math.round((state?.time||0)/60),goal:state?.dailyGoal||20,mastery:ms};}
  function dueVocab(v){if(!v)return true;if(v.status==='hard'||v.status==='learning')return true;return !v.next||v.next<=Date.now();}
  function vocabUpdate(v,ok){v=v||{status:'learning',correct:0,wrong:0,last:0,next:0,box:0};v.last=Date.now();if(ok){v.correct++;v.box=clamp((v.box||0)+1,0,5);v.status=v.box>=4?'mastered':'learning';const days=[0,1,3,7,14,30][v.box]||30;v.next=Date.now()+days*day;}else{v.wrong++;v.box=Math.max(0,(v.box||0)-1);v.status='hard';v.next=Date.now()+6*3600000;}return v;}
  window.MQAdaptive={LEVELS,recentAccuracy,chapterAccuracy,mastery,masteryLabel,isDue,dueInText,scheduleReview,recommendation,weakChapters,difficulty,lessonDifficulty,nextDifficulty,ensureState,refreshMastery,recordAnswer,recordMistake,resolveMistake,lessonResult,practiceResult,coachTip,subjectMetrics,profileMetrics,dueVocab,vocabUpdate};
})();
