/* Finot Académie — calculs calendaires sûrs aux changements d'heure.
   app-state.js corrige la série à la source. Ce module ne remplace que le petit calcul d'absence
   de Finot, qui utilisait encore une durée en millisecondes / 24 h. */
(function(root){
'use strict';
function civilDayIndex(y,m,d){return Math.floor(Date.UTC(y,m-1,d)/86400000);}
function civilDaysSince(dateKey,now=new Date()){
 const m=String(dateKey||'').match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);if(!m)return 0;
 const y=+m[1],mo=+m[2],d=+m[3];
 const parsed=new Date(y,mo-1,d);
 if(parsed.getFullYear()!==y||parsed.getMonth()!==mo-1||parsed.getDate()!==d)return 0;
 return Math.max(0,civilDayIndex(now.getFullYear(),now.getMonth()+1,now.getDate())-civilDayIndex(y,mo,d));
}
root.finotJoursAbsence=function(state){return civilDaysSince(state&&state.streak&&state.streak.last);};
root.MQCalendarDays={version:'1.0',civilDaysSince};
})(typeof window!=='undefined'?window:globalThis);
