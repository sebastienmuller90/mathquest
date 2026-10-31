/* Finot Académie — configuration du suivi parent à distance (31/10/2026).
   DÉSACTIVÉ par défaut : l'ancien projet Supabase n'existe plus et aucun nouveau backend n'est validé. Sans configuration
   valide, l'app ne fait AUCUNE requête, ne propose ni lien ni QR, et l'espace parents l'indique clairement ; les codes
   déjà enregistrés restent sur l'appareil (aucune perte).
   Activation future (après revue de supabase/ et validation produit) : définir, avant ce script, un objet
     window.FINOT_REMOTE_SYNC = {enabled:true, url:'https://<ref>.supabase.co', key:'sb_publishable_…', schema:'api'}
   dans un fichier de configuration propre à l'environnement. Seules une URL https *.supabase.co et une clé
   « publishable » sont acceptées : jamais de clé secrète (service_role) côté client. */
(function(){
'use strict';
const src=(typeof window!=='undefined'&&window.FINOT_REMOTE_SYNC&&typeof window.FINOT_REMOTE_SYNC==='object')?window.FINOT_REMOTE_SYNC:{};
const cfg=Object.freeze({enabled:src.enabled===true,url:String(src.url||''),key:String(src.key||''),schema:String(src.schema||'api')});
function configured(){return cfg.enabled&&/^https:\/\/[a-z0-9]{8,40}\.supabase\.co$/.test(cfg.url)&&/^sb_publishable_[A-Za-z0-9_-]{8,}$/.test(cfg.key)&&/^[a-z_]{1,30}$/.test(cfg.schema);}
function config(){return configured()?{url:cfg.url,key:cfg.key,schema:cfg.schema}:null;}
function status(){return configured()?'ready':'disabled';}
window.MQRemoteSync=Object.freeze({configured,config,status});
})();
