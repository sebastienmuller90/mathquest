/* Finot Académie — droits d'accès (futur premium) : architecture seule, aucune logique commerciale branchée (31/10/2026).
   - MQEntitlements.hasPremium() / has(product) : lecture du dernier état connu (finot_entitlements_v1, schéma versionné,
     séparé des profils, jamais synchronisé). Par défaut : aucun droit, et RIEN dans l'app n'est verrouillé : l'expérience
     gratuite actuelle reste intégralement accessible.
   - PurchaseProvider (à brancher plus tard, ex. Google Play Billing) : {id, available():Promise<bool>,
     purchase(productId):Promise<{products:[]}>, restore():Promise<{products:[]}>} via MQEntitlements.setProvider().
   - Achat : uniquement depuis l'espace parents (jamais d'écran d'achat face à l'enfant) ; sans fournisseur, refus
     explicite « unavailable » sans aucun effet. restorePurchases() ne fait rien sans fournisseur. */
(function(){
'use strict';
const KEY='finot_entitlements_v1';
let provider=null;
const empty=()=>({schema:1,products:[],updatedAt:0});
function state(){try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&o.schema===1&&Array.isArray(o.products))return {schema:1,products:known(o.products),updatedAt:+o.updatedAt||0};}catch(e){}return empty();}
function write(products){const s={schema:1,products:[...new Set(known(products))],updatedAt:Date.now()};try{localStorage.setItem(KEY,JSON.stringify(s));}catch(e){}return s;}
const fail=(code,msg)=>{const e=new Error(msg);e.code=code;return e;};
const inParent=()=>!!(window.MQParentGate&&MQParentGate.active()); // espace parents réellement affiché (js/parent-gate.js)
// Liste FERMÉE des produits connus : tout autre identifiant est refusé, à l'achat comme à la restauration.
const PRODUCTS=Object.freeze(['finot.premium']);
const known=list=>(Array.isArray(list)?list:[]).filter(p=>typeof p==='string'&&PRODUCTS.includes(p));
function has(product){return state().products.includes(String(product));}
function hasPremium(){return has('finot.premium');}
function providerId(){return provider?provider.id:'none';}
function setProvider(p){provider=p&&typeof p.purchase==='function'?p:null;}
async function purchase(productId){
 if(!inParent())throw fail('parent-gate','Achat possible uniquement depuis l’espace parents');
 if(!PRODUCTS.includes(String(productId)))throw fail('unknown-product','Produit inconnu');
 if(!provider||(provider.available&&!(await provider.available())))throw fail('unavailable','Aucun achat disponible sur cet appareil');
 const r=await provider.purchase(String(productId));
 // Seul le produit demandé peut être accordé, et seulement si le fournisseur le confirme.
 const granted=known((r&&r.products)||[]).includes(String(productId));
 const s=granted?write(state().products.concat(String(productId))):state();return {products:s.products,granted};}
async function restorePurchases(){
 if(!provider||typeof provider.restore!=='function')return {restored:0,products:state().products};
 const r=await provider.restore();const list=known((r&&r.products)||[]);const s=write(list);return {restored:list.length,products:s.products};}
window.MQEntitlements=Object.freeze({PRODUCTS,has,hasPremium,providerId,setProvider,purchase,restorePurchases});
})();
