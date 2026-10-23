/* Finot Académie — cours approfondis, vague 1 pédagogie finale (23/10/2026). Même format que course-depth-maths-cm1.js
   (deep / try / adult / culture), affiché par js/course-depth.js. Rien n'est retiré des cours existants. */
(function(root){
'use strict';
const D=root.MQCourseDepth=root.MQCourseDepth||{version:'1',chapters:{},add(map,meta){for(const id of Object.keys(map))this.chapters[id]=Object.assign({},meta,map[id]);}};
D.add({
});
})(typeof window!=='undefined'?window:globalThis);
