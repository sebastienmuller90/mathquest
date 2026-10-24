/* Finot Académie — errata de contenu Wave 2 (24/10/2026).
   Correctifs factuels/pédagogiques appliqués après le chargement des banques, sans modifier les IDs ni les données utilisateur.
   Références de vérification : Grimm (Les Musiciens de Brême, 2e éd. 1819), Smithsonian GVP (Snæfellsjökull),
   BnF (La Chèvre de monsieur Seguin : L’Événement, 14/09/1866 ; reprise en recueil en 1869). */
(function(){
'use strict';

// CE1 — le son [z] : la consigne doit produire « fraise », pas « frase ».
if(window.MQPrimary&&window.MQPrimary._reg&&window.MQPrimary._reg.byId){
  var chapter=window.MQPrimary._reg.byId['ce1-fr-s-z'];
  if(chapter&&typeof chapter.g==='function'&&!chapter.__wave2ContentErrata){
    var originalGenerator=chapter.g;
    chapter.g=function(d){
      var q=originalGenerator(d);
      if(q&&typeof q.q==='string')q.q=q.q.replace('une fra…e','une frai…e');
      return q;
    };
    chapter.__wave2ContentErrata=true;
  }
}

// Lecture collège — métadonnées et formulation historique/scientifique.
if(window.MQ_READING&&window.MQ_READING.resources){
  var res=window.MQ_READING.resources;

  var breme=res.fr_6e_musiciens_breme_01;
  if(breme){
    breme.work='Contes de l’enfance et du foyer — 2e édition (1819)';
    breme.sourceReference='Adaptation libre et abrégée pour la 6e, d’après le conte des frères Grimm, publié pour la première fois dans la 2e édition des Contes de l’enfance et du foyer en 1819. Les frères Grimm (morts en 1859 et 1863) sont dans le domaine public — aucune traduction existante reprise.';
  }

  var sneffels=res.fr_5e_verne_sneffels_01;
  if(sneffels&&Array.isArray(sneffels.paragraphs)&&sneffels.paragraphs[0]){
    sneffels.paragraphs[0]=sneffels.paragraphs[0].replace(
      'un volcan d’Islande éteint depuis des siècles',
      'un volcan d’Islande que les personnages considèrent comme éteint depuis des siècles'
    );
    sneffels.sourceReference='Adaptation libre et abrégée pour la 5e, d’après Jules Verne (mort en 1905), dans le domaine public. La qualification du volcan comme « éteint » est présentée comme le point de vue des personnages du roman ; le Snæfellsjökull est aujourd’hui classé comme volcan actif au sens géologique.';
  }

  var seguin=res.fr_4e_chevre_seguin_01;
  if(seguin){
    seguin.work='Lettres de mon moulin (recueil 1869 ; première publication du conte en 1866)';
    seguin.sourceReference='Adaptation libre et abrégée pour la 4e, d’après Alphonse Daudet (mort en 1897), dans le domaine public. « La Chèvre de monsieur Seguin » paraît d’abord dans L’Événement le 14 septembre 1866, puis est intégrée au recueil Lettres de mon moulin en 1869.';
  }
}
})();
