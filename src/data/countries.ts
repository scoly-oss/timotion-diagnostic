/* ═══════════════════════════════════════════════════════════════
   TiMOTION Europe — Country data: Pension & Salary
   Sources: Official open data per country (2024-2025 in force)
   ═══════════════════════════════════════════════════════════════ */

export interface PensionData {
  legalRetirementAge: string;
  earlyRetirementAge: string;
  contributionRateEmployee: string;
  contributionRateEmployer: string;
  calculationBasis: string;
  pillar1: string;
  pillar2: string;
  pillar2Mandatory: boolean;
  pillar3: string;
  minimumPension: string;
  sources: string[];
  keyRisks: string[];
  notes: string;
}

export interface SalaryData {
  minimumWage: string;
  minimumWageMonthly: string;
  averageSalary: string;
  employerSocialCharges: string;
  typicalSalesRep: string;
  typicalSalesManager: string;
  typicalOfficeAdmin: string;
  bonusPractice: string;
  sources: string[];
  notes: string;
}

export interface CountryData {
  id: string;
  name: string;
  flag: string;
  employees: number;
  currency: string;
  pension: PensionData;
  salary: SalaryData;
}

export const COUNTRIES: CountryData[] = [
  /* ─────── FRANCE ─────── */
  {
    id: "fr",
    name: "France",
    flag: "🇫🇷",
    employees: 70,
    currency: "EUR",
    pension: {
      legalRetirementAge: "64 ans (réforme 2023, progressif jusqu'en 2030)",
      earlyRetirementAge: "62 ans (carrières longues sous conditions)",
      contributionRateEmployee: "11,31% (6,90% vieillesse plafonnée + 0,40% déplafonnée + CEG 0,86% + AGIRC-ARRCO 3,15%)",
      contributionRateEmployer: "16,46% (8,55% vieillesse plafonnée + 2,02% déplafonnée + CEG 1,29% + AGIRC-ARRCO 4,72%)",
      calculationBasis: "25 meilleures années (régime général) + points AGIRC-ARRCO",
      pillar1: "Régime général Sécurité sociale (répartition) — pension max ~50% du PASS (plafond annuel SS = 46 368 €/an en 2024)",
      pillar2: "AGIRC-ARRCO obligatoire pour tous les salariés — système par points. Retraite complémentaire représente ~50-60% de la pension totale pour les cadres",
      pillar2Mandatory: true,
      pillar3: "PER (Plan d'Épargne Retraite) — facultatif, avantage fiscal à l'entrée. PERCO/Article 83 possibles via l'entreprise",
      minimumPension: "~1 000 €/mois brut (minimum contributif avec carrière complète)",
      sources: [
        "Code de la sécurité sociale, art. L351-1 et suivants",
        "Accord national interprofessionnel AGIRC-ARRCO",
        "Loi n°2023-270 du 14 avril 2023 (réforme retraites)",
      ],
      keyRisks: [],
      notes: "Système mature et complet. La complémentaire AGIRC-ARRCO est obligatoire, donc pas de gap de couverture en France.",
    },
    salary: {
      minimumWage: "11,88 €/h brut (SMIC 2025)",
      minimumWageMonthly: "1 801,80 €/mois brut (151,67h)",
      averageSalary: "~3 100 €/mois brut (moyenne nationale privé)",
      employerSocialCharges: "~42-45% du brut (charges patronales totales)",
      typicalSalesRep: "35 000 – 50 000 € brut/an (fixe + variable)",
      typicalSalesManager: "55 000 – 80 000 € brut/an",
      typicalOfficeAdmin: "28 000 – 35 000 € brut/an",
      bonusPractice: "Variable commercial courant (10-30% du fixe). 13ème mois selon convention collective. Intéressement/participation possible.",
      sources: [
        "Décret n°2024-951 du 23 octobre 2024 (SMIC)",
        "INSEE — Données salariales 2024",
      ],
      notes: "Convention collective applicable : vérifier la CCN Métallurgie (IDCC 3248) ou Commerce de gros (IDCC 573) selon classification TiMOTION France.",
    },
  },
  /* ─────── ALLEMAGNE ─────── */
  {
    id: "de",
    name: "Allemagne",
    flag: "🇩🇪",
    employees: 7,
    currency: "EUR",
    pension: {
      legalRetirementAge: "67 ans (progressif, atteint en 2031 — Regelaltersgrenze)",
      earlyRetirementAge: "63 ans (avec 45 ans de cotisation — Altersrente für besonders langjährig Versicherte)",
      contributionRateEmployee: "9,3% (part salarié de la Rentenversicherung)",
      contributionRateEmployer: "9,3% (part employeur — total 18,6%)",
      calculationBasis: "Système par points (Entgeltpunkte). 1 point = salaire moyen national cotisé 1 an. Valeur du point : 39,32 € Ouest (2025)",
      pillar1: "Gesetzliche Rentenversicherung (GRV) — régime légal obligatoire par répartition. Taux de remplacement ~48% du dernier salaire pour carrière complète",
      pillar2: "Betriebliche Altersversorgung (bAV) — retraite d'entreprise. NON obligatoire mais très répandue. Le salarié a un DROIT LÉGAL à la conversion salariale (Entgeltumwandlung, § 1a BetrAVG). L'employeur DOIT contribuer 15% min sur les cotisations du salarié en Entgeltumwandlung depuis 2019.",
      pillar2Mandatory: false,
      pillar3: "Riester-Rente (subventionnée par l'État, 175 €/an + enfants) et Rürup-Rente (avantage fiscal, indépendants). Privé facultatif.",
      minimumPension: "Grundrente (retraite de base) : complément pour carrières >33 ans mais faibles revenus — jusqu'à ~418 €/mois en 2024",
      sources: [
        "Sozialgesetzbuch VI (SGB VI) — Gesetzliche Rentenversicherung",
        "Betriebsrentengesetz (BetrAVG) — Loi sur les retraites d'entreprise",
        "Deutsche Rentenversicherung — barèmes 2025",
      ],
      keyRisks: [
        "Obligation légale de proposer l'Entgeltumwandlung si le salarié le demande (§ 1a BetrAVG)",
        "Obligation de contribuer 15% minimum employeur sur la conversion salariale depuis 01/01/2019 (§ 1a Abs. 1a BetrAVG)",
        "Risque : si TiMOTION n'a pas mis en place de dispositif bAV, tout salarié peut le demander et l'employeur doit répondre",
      ],
      notes: "PRIORITÉ HAUTE — Des salariés allemands ont déjà demandé un pension plan. Le pilier 2 n'est pas obligatoire de manière proactive, MAIS le salarié a un droit légal à y accéder. Il faut vérifier si TiMOTION DE a déjà un dispositif en place (Direktversicherung, Pensionskasse, etc.).",
    },
    salary: {
      minimumWage: "12,82 €/h brut (Mindestlohn 2025)",
      minimumWageMonthly: "~2 221 €/mois brut (173,33h)",
      averageSalary: "~4 100 €/mois brut (moyenne nationale)",
      employerSocialCharges: "~20-21% du brut (patronales : 9,3% retraite + 1,3% chômage + 7,3% santé + 1,7% dépendance + 1,6% accidents)",
      typicalSalesRep: "45 000 – 65 000 € brut/an",
      typicalSalesManager: "70 000 – 100 000 € brut/an",
      typicalOfficeAdmin: "32 000 – 42 000 € brut/an",
      bonusPractice: "Variable commercial très répandu. 13ème mois courant (Weihnachtsgeld). Urlaubsgeld (prime vacances) dans ~50% des entreprises.",
      sources: [
        "Mindestlohngesetz (MiLoG) — Verordnung 2025",
        "Destatis — Verdiensterhebung 2024",
      ],
      notes: "Pas de grille légale obligatoire hors convention collective. TiMOTION DE est probablement hors convention (pas de Tarifvertrag applicable). Les salaires sont librement négociés.",
    },
  },
  /* ─────── ROYAUME-UNI ─────── */
  {
    id: "uk",
    name: "Royaume-Uni",
    flag: "🇬🇧",
    employees: 3,
    currency: "GBP",
    pension: {
      legalRetirementAge: "66 ans (State Pension age — passera à 67 entre 2026-2028, puis 68 d'ici 2044-2046)",
      earlyRetirementAge: "Pas de retraite anticipée dans le régime légal. Accès aux pensions privées dès 55 ans (57 ans à partir de 2028)",
      contributionRateEmployee: "12% de £242 à £967/semaine (National Insurance Class 1) + 2% au-delà",
      contributionRateEmployer: "13,8% au-delà de £175/semaine (Secondary Threshold)",
      calculationBasis: "State Pension : forfaitaire, basée sur 35 ans de cotisations NI. Montant fixe, pas lié au salaire.",
      pillar1: "New State Pension : £221,20/semaine (2024/25) soit ~£11 502/an. Forfaitaire. Requiert 35 ans de NI contributions pour le taux plein.",
      pillar2: "Auto-Enrolment OBLIGATOIRE depuis 2012. L'employeur DOIT inscrire automatiquement tout salarié (22+ ans, >£10 000/an). Cotisation minimum : 8% (3% employeur + 5% salarié). Véhicule type : workplace pension (Defined Contribution).",
      pillar2Mandatory: true,
      pillar3: "Personal Pension / SIPP — facultatif, avantage fiscal (tax relief at source). ISA aussi utilisé comme véhicule d'épargne.",
      minimumPension: "State Pension : £221,20/semaine (~£11 502/an) pour carrière complète. Pension Credit pour compléter si revenus < £218,15/semaine.",
      sources: [
        "Pensions Act 2008 & 2014",
        "The Workplace Pension Regulations 2012 (Auto-Enrolment)",
        "GOV.UK — State Pension rates 2024/25",
      ],
      keyRisks: [
        "Auto-enrolment est OBLIGATOIRE — l'employeur doit inscrire et contribuer minimum 3%",
        "Vérifier que TiMOTION UK respecte bien l'auto-enrolment pour ses 3 salariés",
        "Sanctions du Pensions Regulator en cas de non-conformité (amendes progressives)",
      ],
      notes: "Le UK est clair : auto-enrolment obligatoire avec 3% minimum employeur. C'est un dispositif simple à mettre en place via un provider (NEST, Aviva, etc.). Vérifier la conformité.",
    },
    salary: {
      minimumWage: "£12,21/h (National Living Wage 21+ ans, avril 2025)",
      minimumWageMonthly: "~£2 117/mois brut (173,33h)",
      averageSalary: "~£35 000/an brut (médiane UK, ONS 2024)",
      employerSocialCharges: "~15-16% (13,8% NI employeur + ~1-2% pension auto-enrolment 3%)",
      typicalSalesRep: "£30 000 – £45 000/an (base + commission)",
      typicalSalesManager: "£50 000 – £75 000/an",
      typicalOfficeAdmin: "£25 000 – £32 000/an",
      bonusPractice: "Commission commerciale très courante. Pas de 13ème mois culturellement. Bonus annuel discrétionnaire fréquent.",
      sources: [
        "National Minimum Wage Regulations 2025",
        "ONS — Annual Survey of Hours and Earnings 2024",
      ],
      notes: "Salaires libres, pas de grille obligatoire. Les salaires UK sont souvent exprimés en annuel. Attention au post-Brexit : les salariés doivent avoir le droit de travailler au UK.",
    },
  },
  /* ─────── PAYS-BAS ─────── */
  {
    id: "nl",
    name: "Pays-Bas",
    flag: "🇳🇱",
    employees: 2,
    currency: "EUR",
    pension: {
      legalRetirementAge: "67 ans (AOW-leeftijd, depuis 2024 — indexé sur l'espérance de vie ensuite)",
      earlyRetirementAge: "Pas de retraite anticipée légale dans l'AOW. Accès aux pensions professionnelles possible avant selon le règlement du fonds.",
      contributionRateEmployee: "0% pour l'AOW (financé par l'impôt) — mais cotisation pension professionnelle variable (~5-8% du salaire selon le fonds)",
      contributionRateEmployer: "AOW intégré dans les prélèvements fiscaux (~17,9% inclus dans l'IR). Pension professionnelle : employeur ~10-15% du salaire selon le fonds de pension",
      calculationBasis: "AOW : forfaitaire, basé sur les années de résidence (50 ans pour taux plein). Pension prof. : salaire moyen de carrière ou dernier salaire selon le fonds.",
      pillar1: "AOW (Algemene Ouderdomswet) : pension de base universelle. ~€1 401/mois brut (personne seule, 2024). Financée par impôt, pas de cotisation séparée visible.",
      pillar2: "Pension professionnelle — QUASI-OBLIGATOIRE. Si un secteur ou entreprise a un fonds de pension, l'adhésion est obligatoire. ~90% des salariés néerlandais sont couverts. Gros fonds sectoriels (PMT pour la métallurgie, ABP pour le public).",
      pillar2Mandatory: false,
      pillar3: "Troisième pilier limité depuis 2023 (suppression de la déduction fiscale pour les produits du 3ème pilier). Épargne libre.",
      minimumPension: "AOW = ~€1 401/mois brut (seul) ou ~€964/mois par personne (couple). Pas de minimum pour le pilier 2.",
      sources: [
        "Algemene Ouderdomswet (AOW)",
        "Pensioenwet (Pw) — Loi sur les pensions",
        "DNB & AFM — régulateurs des fonds de pension",
        "SVB — barèmes AOW 2024",
      ],
      keyRisks: [
        "PRIORITÉ HAUTE — Les salariés NL ont demandé un pension plan",
        "Vérifier si TiMOTION NL est rattaché à un fonds de pension sectoriel obligatoire (Bedrijfstakpensioenfonds)",
        "Si non rattaché à un fonds sectoriel, l'entreprise peut mettre en place un régime d'entreprise (ondernemingspensioenfonds ou contrat avec un assureur)",
        "La nouvelle loi Wtp (Wet toekomst pensioenen, 2023) impose une transition vers des régimes à cotisations définies d'ici 2028",
      ],
      notes: "PRIORITÉ HAUTE — Comme l'Allemagne, les NL ont un pilier 2 quasi-systématique. Ne pas en avoir est une anomalie qui peut poser des problèmes de recrutement et de rétention. Urgent de vérifier la situation.",
    },
    salary: {
      minimumWage: "€13,68/h brut (WML 2025 — calculé sur base horaire depuis jan. 2024)",
      minimumWageMonthly: "~€2 070/mois brut (sur 36h/semaine)",
      averageSalary: "~€3 900/mois brut (moyenne CBS 2024)",
      employerSocialCharges: "~18-22% du brut (ZVW santé ~6,68% + WW chômage ~2,64% + WIA invalidité ~7,11% + divers)",
      typicalSalesRep: "€40 000 – €60 000 brut/an",
      typicalSalesManager: "€65 000 – €90 000 brut/an",
      typicalOfficeAdmin: "€30 000 – €40 000 brut/an",
      bonusPractice: "Vakantiegeld (prime de vacances) OBLIGATOIRE : 8% du salaire annuel brut, versé en mai. Variable commercial courant. 13ème mois fréquent mais pas obligatoire.",
      sources: [
        "Wet minimumloon en minimumvakantiebijslag (WML)",
        "CBS — Statline salaires 2024",
      ],
      notes: "Attention : le vakantiegeld (8%) est OBLIGATOIRE par la loi. Vérifier que TiMOTION NL le verse bien. La durée du travail standard est 36-40h/semaine selon le secteur.",
    },
  },
  /* ─────── ITALIE ─────── */
  {
    id: "it",
    name: "Italie",
    flag: "🇮🇹",
    employees: 8,
    currency: "EUR",
    pension: {
      legalRetirementAge: "67 ans (pensione di vecchiaia — avec 20 ans minimum de cotisation)",
      earlyRetirementAge: "64 ans + 20 ans cotisation (pensione anticipata contributiva) ou 42 ans 10 mois de cotisation (hommes) / 41 ans 10 mois (femmes)",
      contributionRateEmployee: "9,19% (IVS — Invalidità, Vecchiaia, Superstiti)",
      contributionRateEmployer: "23,81% (IVS employeur)",
      calculationBasis: "Système contributif (post-1996) : capitalisation virtuelle des cotisations. Mixte pour les carrières ayant commencé avant 1996.",
      pillar1: "INPS — Regime obbligatorio (régime général obligatoire). Taux de cotisation total de 33%. Système contributif : pension = montant accumulé × coefficient de transformation lié à l'âge.",
      pillar2: "Fondi pensione complementari — NON obligatoires mais très encouragés. Le TFR (Trattamento di Fine Rapporto = indemnité de fin de contrat, ~6,91%/an du salaire) peut être dirigé vers un fonds de pension. Si le salarié ne choisit pas dans les 6 mois, le TFR va par défaut au fonds de pension sectoriel (silenzio-assenso).",
      pillar2Mandatory: false,
      pillar3: "PIP (Piano Individuale Pensionistico) — plans individuels de retraite, avantage fiscal jusqu'à 5 164,57 €/an.",
      minimumPension: "~€598/mois (trattamento minimo 2024) pour les pensions contributives basses + intégration au minimum.",
      sources: [
        "Legge 335/1995 (Riforma Dini)",
        "D.Lgs. 252/2005 (Previdenza complementare)",
        "INPS — Barèmes 2024",
        "COVIP — Rapport annuel fonds de pension",
      ],
      keyRisks: [
        "Le TFR est un droit du salarié — vérifier que TiMOTION IT le provisionne correctement (~6,91%/an)",
        "Si un salarié n'a pas fait de choix explicite sur le TFR dans les 6 mois, il part automatiquement au fonds de pension sectoriel",
        "Les fondi negoziali (fonds sectoriels) du commerce offrent souvent un abondement employeur — à vérifier si applicable",
      ],
      notes: "L'Italie a un système contributif pur pour les nouvelles générations. Le TFR est un mécanisme unique : c'est à la fois une indemnité de départ et un véhicule de retraite. 8 salariés en Italie = sujet important.",
    },
    salary: {
      minimumWage: "Pas de SMIC légal en Italie — les minima sont fixés par les CCNL (conventions collectives nationales)",
      minimumWageMonthly: "Variable selon CCNL. Commercio (commerce) : ~€1 650-1 800/mois brut pour un employé niveau 4",
      averageSalary: "~€2 300/mois brut (moyenne ISTAT 2024)",
      employerSocialCharges: "~30-32% du brut (INPS 23,81% + INAIL ~1% + TFR 6,91% provisionné)",
      typicalSalesRep: "€30 000 – €45 000 brut/an",
      typicalSalesManager: "€50 000 – €70 000 brut/an",
      typicalOfficeAdmin: "€25 000 – €32 000 brut/an",
      bonusPractice: "13ème mois (tredicesima) OBLIGATOIRE par les CCNL. 14ème mois (quattordicesima) dans beaucoup de CCNL du commerce. Variable commercial courant.",
      sources: [
        "CCNL Commercio (Confcommercio)",
        "ISTAT — Statistiche salariali 2024",
      ],
      notes: "ATTENTION : la tredicesima (13ème mois) est obligatoire. La quattordicesima aussi dans le CCNL Commercio. Identifier quelle CCNL s'applique à TiMOTION IT (probablement Commercio ou Metalmeccanici).",
    },
  },
  /* ─────── ESPAGNE ─────── */
  {
    id: "es",
    name: "Espagne",
    flag: "🇪🇸",
    employees: 5,
    currency: "EUR",
    pension: {
      legalRetirementAge: "66 ans et 8 mois en 2025 (progressif vers 67 ans en 2027, sauf 65 ans avec 38+ ans de cotisation)",
      earlyRetirementAge: "Retraite anticipée volontaire : 2 ans avant l'âge légal (avec 35 ans cotisation minimum) — pénalité de 2-3,26%/trimestre anticipé",
      contributionRateEmployee: "4,7% (contingencias comunes)",
      contributionRateEmployer: "23,6% (contingencias comunes, incluant incapacité temporaire)",
      calculationBasis: "Dernières 25 années de cotisation. Taux de remplacement : 50% pour 15 ans, 100% pour 36 ans (progressif).",
      pillar1: "Sistema de Seguridad Social — régime général obligatoire (INSS). Pension max : ~€3 175/mois brut (2024). Pension min : ~€1 033/mois (avec conjoint).",
      pillar2: "Planes de pensiones de empleo — NON obligatoires. Peu développés historiquement en Espagne (~10% de couverture). Nouvelle loi 2022 encourage les plans sectoriels.",
      pillar2Mandatory: false,
      pillar3: "Planes de pensiones individuales — limite de déduction réduite à 1 500 €/an. Plans d'entreprise : limite portée à 8 500 €/an.",
      minimumPension: "~€1 033/mois (avec conjoint) à ~€721/mois (sans conjoint, >65 ans) — 2024",
      sources: [
        "Ley General de la Seguridad Social (LGSS)",
        "Ley 12/2022 — Planes de pensiones de empleo",
        "Seguridad Social — Prestaciones 2024",
      ],
      keyRisks: [
        "Pas d'obligation de pilier 2 — pas de risque de non-conformité",
        "Mais le système légal a un taux de remplacement relativement élevé si carrière complète",
      ],
      notes: "L'Espagne a un pilier 1 généreux mais fragile démographiquement. Le pilier 2 est très peu développé — proposer un plan d'entreprise serait un avantage compétitif pour les 5 salariés.",
    },
    salary: {
      minimumWage: "Salario Mínimo Interprofesional (SMI) 2025 : 1 184 €/mois brut (14 pagas) soit ~16 576 €/an",
      minimumWageMonthly: "€1 184/mois brut (sur 14 mensualités) = ~€1 381/mois sur 12 mois",
      averageSalary: "~€2 200/mois brut (moyenne INE 2024)",
      employerSocialCharges: "~30-33% du brut (23,6% SS + chômage ~5,5% + FOGASA 0,2% + FP 0,6%)",
      typicalSalesRep: "€25 000 – €40 000 brut/an",
      typicalSalesManager: "€45 000 – €65 000 brut/an",
      typicalOfficeAdmin: "€22 000 – €30 000 brut/an",
      bonusPractice: "ATTENTION : 14 pagas (2 payes extra en juin et décembre) est la NORME en Espagne. Le SMI est exprimé sur 14 mois. Variable commercial courant.",
      sources: [
        "Real Decreto SMI 2025",
        "INE — Encuesta anual de estructura salarial",
      ],
      notes: "Les salaires espagnols sont souvent exprimés sur 14 mensualités (pagas extraordinarias en juin et décembre). C'est quasi-universel. En comparer avec d'autres pays, toujours raisonner en annuel brut.",
    },
  },
  /* ─────── BELGIQUE ─────── */
  {
    id: "be",
    name: "Belgique",
    flag: "🇧🇪",
    employees: 1,
    currency: "EUR",
    pension: {
      legalRetirementAge: "65 ans (passera à 66 ans en 2025, puis 67 ans en 2030)",
      earlyRetirementAge: "63 ans (avec 42 ans de carrière) ou 60 ans (avec 44 ans de carrière)",
      contributionRateEmployee: "13,07% (cotisation globale incluant retraite, santé, chômage)",
      contributionRateEmployer: "~25% (cotisation patronale globale, incluant modération salariale)",
      calculationBasis: "Salaire moyen de toute la carrière, plafonné. Taux : 60% (isolé) ou 75% (ménage) du salaire moyen.",
      pillar1: "Pension légale — régime salarié géré par le SFP. Pension max ~€2 500/mois brut. Très redistributif.",
      pillar2: "Pension complémentaire d'entreprise (assurance groupe / fonds de pension) — NON obligatoire mais très courante (~75% des salariés couverts). Loi sur les Pensions Complémentaires (LPC/WAP, 2003).",
      pillar2Mandatory: false,
      pillar3: "Épargne-pension individuelle (avantage fiscal ~30% sur max 1 020 € ou 1 310 €/an). Épargne à long terme.",
      minimumPension: "€1 738/mois brut (pension minimum ménage) ou €1 390/mois (isolé) — 2024, si carrière complète",
      sources: [
        "Loi du 28 avril 2003 relative aux pensions complémentaires (LPC/WAP)",
        "SFP (Service fédéral des Pensions) — barèmes 2024",
      ],
      keyRisks: [
        "Pas d'obligation légale de pilier 2, mais 75% des salariés belges en bénéficient — un salarié isolé sans couverture est une anomalie",
        "La norme de la profession est de proposer une assurance groupe",
      ],
      notes: "Avec 1 seul salarié, le sujet est limité mais mettre en place une assurance groupe est simple et attendu en Belgique.",
    },
    salary: {
      minimumWage: "RMMMG : €2 029,88/mois brut (Revenu Minimum Mensuel Moyen Garanti, 2024)",
      minimumWageMonthly: "€2 029,88/mois brut",
      averageSalary: "~€3 800/mois brut (moyenne Statbel 2024)",
      employerSocialCharges: "~25-27% du brut (après réductions structurelles)",
      typicalSalesRep: "€38 000 – €55 000 brut/an",
      typicalSalesManager: "€60 000 – €85 000 brut/an",
      typicalOfficeAdmin: "€30 000 – €40 000 brut/an",
      bonusPractice: "13ème mois très courant (quasi-standard). Pécule de vacances (double et simple) OBLIGATOIRE. Avantages en nature fréquents (voiture de société = quasi-norme pour les commerciaux en Belgique).",
      sources: [
        "CNT — Convention collective sur le RMMMG",
        "Statbel — Enquête sur la structure des salaires 2024",
      ],
      notes: "La Belgique a des charges patronales très élevées mais beaucoup de réductions structurelles. La voiture de société est un avantage quasi-incontournable pour les profils commerciaux.",
    },
  },
  /* ─────── POLOGNE ─────── */
  {
    id: "pl",
    name: "Pologne",
    flag: "🇵🇱",
    employees: 2,
    currency: "PLN",
    pension: {
      legalRetirementAge: "65 ans (hommes) / 60 ans (femmes)",
      earlyRetirementAge: "Pas de retraite anticipée standard dans le nouveau système (sauf professions spécifiques)",
      contributionRateEmployee: "9,76% (emerytalne) + 1,5% (rentowe/invalidité) = 11,26% total retraite",
      contributionRateEmployer: "9,76% (emerytalne) + 6,5% (rentowe) = 16,26% total retraite",
      calculationBasis: "Système à cotisations définies (NDC). Pension = capital accumulé ÷ espérance de vie restante à la retraite.",
      pillar1: "ZUS — Régime obligatoire à cotisations définies notionnelles. Première composante (12,22% sur sous-compte) + OFE (fonds ouverts de pension, 7,3% — part du 2ème pilier historique, quasi-disparu).",
      pillar2: "PPK (Pracownicze Plany Kapitałowe) — OBLIGATOIRE depuis 2019 pour tous les employeurs. Cotisation : salarié 2% + employeur 1,5% minimum. Inscription automatique de tous les salariés 18-55 ans (opt-out possible mais réinscription auto tous les 4 ans).",
      pillar2Mandatory: true,
      pillar3: "IKE (Indywidualne Konto Emerytalne) et IKZE — comptes individuels de retraite avec avantages fiscaux. Plafonds annuels.",
      minimumPension: "1 780,96 PLN/mois brut (~€410/mois) — 2024",
      sources: [
        "Ustawa o pracowniczych planach kapitałowych (Loi PPK, 2018)",
        "ZUS — Barèmes 2024",
      ],
      keyRisks: [
        "PPK est OBLIGATOIRE pour l'employeur depuis 2019 — amende jusqu'à 1,5% de la masse salariale en cas de non-mise en place",
        "Vérifier IMMÉDIATEMENT que TiMOTION PL a mis en place le PPK",
        "L'employeur doit verser 1,5% minimum + le salarié 2%",
      ],
      notes: "Le PPK est un dispositif récent (2019) mais OBLIGATOIRE. C'est l'équivalent polonais de l'auto-enrolment britannique. Non-conformité = sanctions financières.",
    },
    salary: {
      minimumWage: "4 666 PLN/mois brut (~€1 080) en 2025",
      minimumWageMonthly: "4 666 PLN/mois brut",
      averageSalary: "~7 500 PLN/mois brut (~€1 740)",
      employerSocialCharges: "~20-22% du brut (ZUS patronal : retraite 9,76% + invalidité 6,5% + accidents ~1,67% + FP 2,45% + FGŚP 0,1%)",
      typicalSalesRep: "8 000 – 12 000 PLN/mois brut (~€1 850 – €2 780)",
      typicalSalesManager: "15 000 – 22 000 PLN/mois brut (~€3 480 – €5 100)",
      typicalOfficeAdmin: "5 500 – 8 000 PLN/mois brut (~€1 280 – €1 850)",
      bonusPractice: "Pas de 13ème mois obligatoire. Primes de performance courantes. Variable commercial standard.",
      sources: [
        "Rozporządzenie w sprawie minimalnego wynagrodzenia 2025",
        "GUS — Dane o wynagrodzeniach 2024",
      ],
      notes: "La Pologne a des coûts salariaux significativement plus bas que l'Europe de l'Ouest mais en rattrapage rapide. Le SMIC polonais augmente fortement chaque année (~12-15%/an ces dernières années).",
    },
  },
  /* ─────── DANEMARK ─────── */
  {
    id: "dk",
    name: "Danemark",
    flag: "🇩🇰",
    employees: 1,
    currency: "DKK",
    pension: {
      legalRetirementAge: "67 ans (folkepension — sera indexé sur l'espérance de vie, 68 ans prévu vers 2030)",
      earlyRetirementAge: "Efterløn (préretraite) possible 3 ans avant la folkepension si membre de l'A-kasse depuis 30 ans et cotisation efterløn versée",
      contributionRateEmployee: "ATP : 1/3 de la cotisation (montant fixe ~94 DKK/mois pour temps plein). Pension professionnelle : 4-5% du salaire généralement.",
      contributionRateEmployer: "ATP : 2/3 de la cotisation (~189 DKK/mois). Pension professionnelle : 8-12% du salaire selon accord.",
      calculationBasis: "Folkepension : forfaitaire + supplément sous condition de revenus. ATP : cotisations fixes → pension par points. Pension prof. : cotisations définies.",
      pillar1: "Folkepension : pension de base universelle ~6 978 DKK/mois (~€935) + supplément sous conditions ~7 680 DKK/mois. ATP : pension complémentaire légale obligatoire.",
      pillar2: "Pensions professionnelles — QUASI-OBLIGATOIRES via les conventions collectives (~90% des salariés couverts). Cotisation typique : 12-17% du salaire (2/3 employeur, 1/3 salarié). Gros fonds : PensionDanmark, Danica, PFA.",
      pillar2Mandatory: false,
      pillar3: "Aldersopsparing (épargne-vieillesse) : max 5 800 DKK/an (2024), taxé à 15,3% à l'entrée. Ratepension : déduction fiscale.",
      minimumPension: "Folkepension base : ~6 978 DKK/mois + ældrecheck (allocation personnes âgées si faibles revenus). Pas de minimum pour le pilier 2.",
      sources: [
        "Lov om social pension (Folkepensionsloven)",
        "ATP-loven",
        "Finanstilsynet — Pensions statistics",
      ],
      keyRisks: [
        "Le Danemark a un des systèmes de retraite les mieux notés au monde (Mercer Global Pension Index n°1)",
        "Vérifier si le salarié DK est couvert par une convention collective (overenskomst) qui rend la pension professionnelle obligatoire",
        "Si pas de convention collective, il est TRÈS ANORMAL de ne pas proposer de pension professionnelle au Danemark",
      ],
      notes: "Au Danemark, ne pas avoir de pension professionnelle est socialement inacceptable. Même avec 1 salarié, il faut proposer un plan. Le standard est 12-17% du salaire en cotisation totale.",
    },
    salary: {
      minimumWage: "Pas de SMIC légal au Danemark — les minima sont fixés par les conventions collectives (~130-140 DKK/h soit ~€17,50-€18,80/h)",
      minimumWageMonthly: "~28 000-32 000 DKK/mois brut via convention collective (~€3 750-€4 290)",
      averageSalary: "~45 000 DKK/mois brut (~€6 030 — un des plus élevés d'Europe)",
      employerSocialCharges: "~1-3% seulement (ATP + AES). Le Danemark a des charges patronales très faibles car le système est financé par l'impôt.",
      typicalSalesRep: "35 000 – 50 000 DKK/mois brut (~€4 700 – €6 700)",
      typicalSalesManager: "55 000 – 75 000 DKK/mois brut (~€7 380 – €10 060)",
      typicalOfficeAdmin: "30 000 – 38 000 DKK/mois brut (~€4 020 – €5 100)",
      bonusPractice: "Pas de 13ème mois obligatoire ni culturel. Feriepenge (argent de vacances) : 12,5% du salaire, provisionné via FerieKonto. Variable commercial courant.",
      sources: [
        "DA — Dansk Arbejdsgiverforening salary statistics",
        "Statistics Denmark — Lønstatistik 2024",
      ],
      notes: "Le Danemark a des salaires très élevés mais des charges patronales très faibles. Le coût total employeur est en réalité comparable aux autres pays. Les Feriepenge (12,5%) sont un coût obligatoire.",
    },
  },
  /* ─────── RÉPUBLIQUE TCHÈQUE ─────── */
  {
    id: "cz",
    name: "République tchèque",
    flag: "🇨🇿",
    employees: 1,
    currency: "CZK",
    pension: {
      legalRetirementAge: "65 ans (progressif, dépend de l'année de naissance — 63 ans 10 mois à 65 ans selon la génération)",
      earlyRetirementAge: "3 ans avant l'âge légal (předčasný důchod) — mais réduction permanente de la pension (~0,9-1,5%/trimestre)",
      contributionRateEmployee: "8,0% (důchodové pojištění — retraite + invalidité) — inclus dans les 11% de cotisation globale salarié",
      contributionRateEmployer: "24,8% cotisation globale dont ~21,5% pour la retraite",
      calculationBasis: "Système à prestations définies. Pension = base forfaitaire + % du salaire de référence (moyenné sur toute la carrière, revalorisé).",
      pillar1: "ČSSZ (Česká správa sociálního zabezpečení) — régime obligatoire à prestations définies. Taux de remplacement ~40-50% du dernier salaire pour une carrière complète.",
      pillar2: "Penzijní připojištění (ancien 3ème pilier devenu pilier complémentaire) — NON obligatoire. L'État verse une contribution publique (max 230 CZK/mois si cotisation ≥1 000 CZK/mois). Avantage fiscal pour l'employeur.",
      pillar2Mandatory: false,
      pillar3: "Doplňkové penzijní spoření (DPS) — épargne-pension complémentaire avec contribution étatique. Très populaire (~60% des Tchèques y participent).",
      minimumPension: "~5 000 CZK/mois (~€200) — pension minimale, mais en pratique la plupart reçoivent 15 000-18 000 CZK/mois",
      sources: [
        "Zákon č. 155/1995 Sb. (Loi sur l'assurance-pension)",
        "Zákon č. 427/2011 Sb. (Doplňkové penzijní spoření)",
        "ČSSZ — Statistiky 2024",
      ],
      keyRisks: [
        "Pas d'obligation de pilier 2 employeur",
        "Mais contribuer au DPS du salarié est une pratique courante et un avantage fiscal pour l'employeur (jusqu'à 50 000 CZK/an déductible)",
      ],
      notes: "La CZ a un système simple. Pas de risque de non-conformité sur la retraite. Proposer une contribution employeur au DPS est un bon levier de rétention mais pas obligatoire.",
    },
    salary: {
      minimumWage: "20 800 CZK/mois brut (~€845) en 2025",
      minimumWageMonthly: "20 800 CZK/mois brut",
      averageSalary: "~43 000 CZK/mois brut (~€1 750)",
      employerSocialCharges: "~33,8% du brut (24,8% social + 9% santé)",
      typicalSalesRep: "40 000 – 60 000 CZK/mois brut (~€1 630 – €2 440)",
      typicalSalesManager: "70 000 – 100 000 CZK/mois brut (~€2 850 – €4 070)",
      typicalOfficeAdmin: "30 000 – 40 000 CZK/mois brut (~€1 220 – €1 630)",
      bonusPractice: "13ème mois (roční odměna) courant mais pas obligatoire. Příspěvek na stravování (contribution repas) très répandue. Variable commercial standard.",
      sources: [
        "Nařízení vlády o minimální mzdě 2025",
        "ČSÚ — Mzdy a náklady práce 2024",
      ],
      notes: "La République tchèque a des coûts salariaux attractifs mais en hausse rapide. Les contributions repas (stravenky / stravenkový paušál) sont une pratique quasi-universelle à vérifier.",
    },
  },
  /* ─────── RUSSIE ─────── */
  {
    id: "ru",
    name: "Russie",
    flag: "🇷🇺",
    employees: 1,
    currency: "RUB",
    pension: {
      legalRetirementAge: "65 ans (hommes) / 60 ans (femmes) — progressif après réforme 2018, atteint en 2028",
      earlyRetirementAge: "Possible pour professions spécifiques (travail dangereux, Grand Nord, etc.). Досрочная пенсия.",
      contributionRateEmployee: "0% (pas de cotisation retraite salarié en Russie)",
      contributionRateEmployer: "22% sur salaire ≤ base maximale (2 225 000 RUB/an en 2024), 10% au-delà. Inclus dans les cotisations sociales unifiées.",
      calculationBasis: "Système par points (пенсионные коэффициенты). Pension = nombre de points × valeur du point (133,05 RUB en 2024) + partie fixe (8 134,88 RUB/mois).",
      pillar1: "ПФР / СФР (Социальный фонд России) — régime obligatoire. Pension moyenne ~22 000 RUB/mois (~€220). Système par points.",
      pillar2: "НПФ (Негосударственные пенсионные фонды) — Fonds de pension privés. NON obligatoires. Peu développés. La composante capitalisation (накопительная часть) est gelée depuis 2014.",
      pillar2Mandatory: false,
      pillar3: "Programme d'épargne-pension volontaire cofinancé par l'État (programme de долгосрочные сбережения, 2024). Facultatif.",
      minimumPension: "Прожиточный минимум пенсионера : ~13 290 RUB/mois (~€130) — 2024. Complément au minimum garanti.",
      sources: [
        "Федеральный закон №400-ФЗ «О страховых пенсиях»",
        "СФР — Барème 2024",
      ],
      keyRisks: [
        "RISQUE GÉOPOLITIQUE : sanctions internationales — vérifier les restrictions sur les transferts et les paiements",
        "Pas d'obligation de pilier 2",
        "Complexité administrative : la Russie a un système RH très bureaucratique (трудовая книжка, etc.)",
      ],
      notes: "Contexte géopolitique : les sanctions peuvent impacter les transferts financiers et la gestion RH. 1 seul salarié — évaluer si le maintien est stratégique. Le système de retraite russe est financé à 100% par l'employeur (0% salarié).",
    },
    salary: {
      minimumWage: "МРОТ (SMIC) : 22 440 RUB/mois (~€220) en 2025",
      minimumWageMonthly: "22 440 RUB/mois brut",
      averageSalary: "~73 000 RUB/mois brut (~€720) — très variable selon région (Moscou ~120 000 RUB)",
      employerSocialCharges: "~30% (22% retraite + 2,9% social + 5,1% santé) sur base ≤ plafond, ~15,1% au-delà",
      typicalSalesRep: "80 000 – 150 000 RUB/mois brut (~€790 – €1 480)",
      typicalSalesManager: "150 000 – 250 000 RUB/mois brut (~€1 480 – €2 470)",
      typicalOfficeAdmin: "50 000 – 80 000 RUB/mois brut (~€490 – €790)",
      bonusPractice: "13ème salaire (тринадцатая зарплата) courant mais pas obligatoire. Primes trimestrielles fréquentes. Variable commercial standard.",
      sources: [
        "Федеральный закон о МРОТ 2025",
        "Росстат — Данные о зарплатах 2024",
      ],
      notes: "ATTENTION sanctions : difficultés possibles pour les paiements internationaux, les assurances, et la gestion RH transfrontalière. Les taux de change RUB/EUR sont très volatils.",
    },
  },
];
