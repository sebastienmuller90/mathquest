/* MathQuest — Référentiel officiel 2026-2027
   Référentiel central utilisé par les phases pédagogiques V8.2 à V8.6. */
(function(){
  const BO={
    CYCLE3_FR_MATH_2025:{
      label:'BO n°16 du 17 avril 2025',
      title:'Programmes de français et de mathématiques du cycle 3',
      url:'https://www.education.gouv.fr/bo/2025/Hebdo16/MENE2504620A'
    },
    CYCLE4_FR_MATH_2026:{
      label:'BO n°10 du 5 mars 2026',
      title:'Programmes de français et de mathématiques du cycle 4',
      url:'https://www.education.gouv.fr/bo/2026/Hebdo10/MENE2602912A'
    },
    CYCLES_2020:{
      label:'BO n°31 du 30 juillet 2020',
      title:'Programme du cycle 4 encore applicable aux niveaux non basculés',
      url:'https://www.education.gouv.fr/bo/20/Hebdo31/MENE2018714A.htm'
    },
    LVE_2025:{
      label:'BO n°22 du 29 mai 2025',
      title:'Programmes de langues vivantes étrangères au collège',
      url:'https://www.education.gouv.fr/bo/2025/Hebdo22/MENE2504621A'
    },
    HG_CYCLE3_2020:{
      label:'BO n°31 du 30 juillet 2020',
      title:'Programme d’histoire-géographie du cycle 3 encore applicable en 6e en 2026-2027',
      url:'https://www.education.gouv.fr/bo/20/Hebdo31/MENE2018714A.htm'
    },
    HG_CYCLE4_2020:{
      label:'BO n°31 du 30 juillet 2020',
      title:'Programme d’histoire-géographie du cycle 4 en vigueur en 5e, 4e et 3e',
      url:'https://www.education.gouv.fr/bo/20/Hebdo31/MENE2018714A.htm'
    },
    EMC_2024:{
      label:'BO n°24 du 13 juin 2024',
      title:'Programme d’enseignement moral et civique',
      url:'https://www.education.gouv.fr/bo/2024/Hebdo24/MENE2413934A'
    }
  };

  const rec=(ref,status,note,extra={})=>({ref,status,note,...extra});
  const records={
    maths:{
      '6e':rec('CYCLE3_FR_MATH_2025','actuel','Programme cycle 3 applicable en 6e depuis 2025-2026.'),
      '5e':rec('CYCLE4_FR_MATH_2026','nouveau','Nouveau programme cycle 4 applicable en 5e à la rentrée 2026-2027.',{nextSwitch:null}),
      '4e':rec('CYCLES_2020','transition','Programme 2020 encore applicable en 2026-2027.',{nextSwitch:'2027-2028',nextRef:'CYCLE4_FR_MATH_2026'}),
      '3e':rec('CYCLES_2020','transition','Programme 2020 encore applicable en 2026-2027.',{nextSwitch:'2028-2029',nextRef:'CYCLE4_FR_MATH_2026'})
    },
    francais:{
      '6e':rec('CYCLE3_FR_MATH_2025','actuel','Programme cycle 3 applicable en 6e depuis 2025-2026.'),
      '5e':rec('CYCLE4_FR_MATH_2026','nouveau','Nouveau programme cycle 4 applicable en 5e à la rentrée 2026-2027.'),
      '4e':rec('CYCLES_2020','transition','Programme 2020 encore applicable en 2026-2027.',{nextSwitch:'2027-2028',nextRef:'CYCLE4_FR_MATH_2026'}),
      '3e':rec('CYCLES_2020','transition','Programme 2020 encore applicable en 2026-2027.',{nextSwitch:'2028-2029',nextRef:'CYCLE4_FR_MATH_2026'})
    },
    anglais:{
      '6e':rec('LVE_2025','actuel','Nouveau programme LVE applicable en 6e depuis 2025-2026.'),
      '5e':rec('LVE_2025','nouveau','Nouveau programme LVE applicable en 5e à la rentrée 2026-2027.'),
      '4e':rec('CYCLES_2020','transition','Ancien programme de cycle 4 encore applicable en 4e cette année.',{nextSwitch:'2027-2028',nextRef:'LVE_2025'}),
      '3e':rec('CYCLES_2020','transition','Ancien programme de cycle 4 encore applicable en 3e cette année.',{nextSwitch:'2028-2029',nextRef:'LVE_2025'})
    },
    italien:{
      '6e':rec('LVE_2025','optionnel','Possible en 6e notamment dans un parcours bilangue ; MathQuest ne l’active pas par défaut.'),
      '5e':rec('LVE_2025','nouveau','Nouveau programme LVE applicable en 5e à la rentrée 2026-2027.'),
      '4e':rec('CYCLES_2020','transition','Ancien programme de cycle 4 encore applicable en 4e cette année.',{nextSwitch:'2027-2028',nextRef:'LVE_2025'}),
      '3e':rec('CYCLES_2020','transition','Ancien programme de cycle 4 encore applicable en 3e cette année.',{nextSwitch:'2028-2029',nextRef:'LVE_2025'})
    },
    hg:{
      '6e':rec('HG_CYCLE3_2020','transition','Le programme Histoire-Géographie 2020 reste applicable en 6e en 2026-2027.',{nextSwitch:'2027-2028',futureNote:'Le nouveau programme cycle 3 publié au BO n°22 du 28 mai 2026 ne s’applique à la 6e qu’en 2027-2028.'}),
      '5e':rec('HG_CYCLE4_2020','actuel','Programme cycle 4 en vigueur.'),
      '4e':rec('HG_CYCLE4_2020','actuel','Programme cycle 4 en vigueur.'),
      '3e':rec('HG_CYCLE4_2020','actuel','Programme cycle 4 en vigueur.')
    },
    emc:{
      '6e':rec('EMC_2024','nouveau','Nouveau programme EMC applicable en 6e à la rentrée 2026-2027.'),
      '5e':rec('EMC_2024','actuel','Programme EMC 2024 déjà applicable en 5e.'),
      '4e':rec('EMC_2024','actuel','Programme EMC 2024 déjà applicable en 4e.'),
      '3e':rec('EMC_2024','nouveau','Nouveau programme EMC applicable en 3e à la rentrée 2026-2027.')
    }
  };

  const subjectNames={maths:'Mathématiques',francais:'Français',anglais:'Anglais',italien:'Italien',hg:'Histoire-Géographie',emc:'EMC'};
  const appState={maths:'complete-v8.2',francais:'complete-v8.3',anglais:'complete-v8.4',italien:'complete-v8.4',hg:'complete-v8.5',emc:'complete-v8.5'};

  function get(subject,grade){return records[subject]?.[grade]||null;}
  function source(subject,grade){const r=get(subject,grade);return r?BO[r.ref]||null:null;}
  function subjectsForGrade(grade){return Object.keys(records).filter(k=>records[k][grade]);}
  function audit(subject,grade){const r=get(subject,grade),src=source(subject,grade);return r?{subject,subjectName:subjectNames[subject]||subject,grade,schoolYear:'2026-2027',appState:appState[subject]||'planned',...r,source:src}:null;}

  window.MQ_CURRICULUM={
    version:'2026-2027.5',
    schoolYear:'2026-2027',
    verifiedOn:'2026-10-06',
    officialOnly:true,
    BO,records,subjectNames,appState,get,source,subjectsForGrade,audit,
    rollout:{
      maths:{'5e':'2026-2027','4e':'2027-2028','3e':'2028-2029'},
      francais:{'5e':'2026-2027','4e':'2027-2028','3e':'2028-2029'},
      lve:{'6e':'2025-2026','5e':'2026-2027','4e':'2027-2028','3e':'2028-2029'},
      hgCycle3:{'6e':'2027-2028'},
      emc:{'6e':'2026-2027','5e':'2024-2025','4e':'2025-2026','3e':'2026-2027'}
    }
  };
})();
