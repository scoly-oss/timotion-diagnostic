/* ═══════════════════════════════════════════════════════════════
   TiMOTION Europe — Country data: Pension & Salary
   VERIFIED from official open data — March 2026
   Sources: Urssaf, BOSS, Agirc-Arrco, GOV.UK, DRV, SVB,
            INPS, Seguridad Social, SFPD, ZUS, borger.dk, ČSSZ, СФР
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
      legalRetirementAge: "64 ans (loi n°2023-270 du 14/04/2023, progressif : 62 ans 3 mois pour les nés en 1961, 64 ans pour les nés à partir de 1968)",
      earlyRetirementAge: "Carrières longues : 58 ans (début à 16 ans), 60 ans (début à 18 ans), 62 ans (début à 20 ans), 63 ans (début à 21 ans)",
      contributionRateEmployee: "11,31% (vieillesse plafonnée 6,90% + déplafonnée 0,40% + AGIRC-ARRCO T1 3,15% + CEG 0,86%)",
      contributionRateEmployer: "16,46% (vieillesse plafonnée 8,55% + déplafonnée 2,02% + AGIRC-ARRCO T1 4,72% + CEG 1,29% + CET 0,21%)",
      calculationBasis: "25 meilleures années (régime général) + points AGIRC-ARRCO. PASS 2025 : 3 925 €/mois (47 100 €/an)",
      pillar1: "Régime général Sécurité sociale (répartition) — pension max ~50% du PASS. Cotisation totale vieillesse base : 17,87% (8,55% + 2,02% employeur + 6,90% + 0,40% salarié)",
      pillar2: "AGIRC-ARRCO obligatoire pour tous les salariés. Taux appelé T1 : 7,87% (6,20% × 127%). Répartition 60/40. CEG : 2,15% T1. CET : 0,35%. Représente ~50-60% de la pension totale pour les cadres.",
      pillar2Mandatory: true,
      pillar3: "PER (Plan d'Épargne Retraite) — facultatif, avantage fiscal à l'entrée. PERCO/Article 83 possibles via l'entreprise.",
      minimumPension: "~1 000 €/mois brut (minimum contributif avec carrière complète)",
      sources: [
        "Loi n°2023-270 du 14 avril 2023 — service-public.fr",
        "Urssaf — Taux de cotisations secteur privé 2025 (urssaf.fr)",
        "Agirc-Arrco — Circulaire 2024-18 Paramètres 2025",
        "BOSS — boss.gouv.fr",
      ],
      keyRisks: [],
      notes: "Système mature et complet. La complémentaire AGIRC-ARRCO est obligatoire, donc pas de gap de couverture en France.",
    },
    salary: {
      minimumWage: "11,88 €/h brut (SMIC 2025, inchangé depuis le 01/11/2024)",
      minimumWageMonthly: "1 801,80 €/mois brut (151,67h)",
      averageSalary: "~3 100 €/mois brut (moyenne nationale privé, INSEE 2024)",
      employerSocialCharges: "~42-45% du brut (charges patronales totales incluant SS, AGIRC-ARRCO, chômage, AT/MP)",
      typicalSalesRep: "35 000 – 50 000 € brut/an (fixe + variable)",
      typicalSalesManager: "55 000 – 80 000 € brut/an",
      typicalOfficeAdmin: "28 000 – 35 000 € brut/an",
      bonusPractice: "Variable commercial courant (10-30% du fixe). 13ème mois selon CCN. Intéressement/participation possible.",
      sources: [
        "Urssaf — Montant du Smic 2025 (urssaf.fr)",
        "Service-Public.fr — Revalorisation Smic",
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
      legalRetirementAge: "67 ans (Regelaltersgrenze, atteint en 2031 pour les nés à partir de 1964. En 2025 : 66 ans 2 mois pour les nés en 1959)",
      earlyRetirementAge: "63 ans avec 45 ans de cotisation (Altersrente für besonders langjährig Versicherte). Pas de décote.",
      contributionRateEmployee: "9,3% (Rentenversicherung — part salarié)",
      contributionRateEmployer: "9,3% (Rentenversicherung — part employeur). Total : 18,6%. BBG 2025 : 8 050 €/mois (96 600 €/an, unifié Est/Ouest)",
      calculationBasis: "Système par points (Entgeltpunkte). Rentenwert : 39,32 € (→ 40,79 € au 01/07/2025). Standardrente (45 pts) : ~1 836 €/mois brut",
      pillar1: "Gesetzliche Rentenversicherung (GRV) — régime légal obligatoire. Taux de remplacement ~48%. Pension moyenne ~1 543 €/mois (2024).",
      pillar2: "Betriebliche Altersversorgung (bAV) — NON obligatoire de manière proactive MAIS le salarié a un DROIT LÉGAL à l'Entgeltumwandlung (§1a BetrAVG). L'employeur DOIT verser 15% minimum sur les cotisations du salarié (§1a Abs. 1a BetrAVG, en vigueur pour tous les contrats depuis 01/01/2022).",
      pillar2Mandatory: false,
      pillar3: "Riester-Rente (175 €/an subvention + enfants) et Rürup-Rente (avantage fiscal). Privé facultatif.",
      minimumPension: "Grundrente : complément pour carrières >33 ans à faibles revenus — jusqu'à ~418 €/mois",
      sources: [
        "Deutsche Rentenversicherung — Rechengrößen 2025 (deutsche-rentenversicherung.de)",
        "BMAS — Mindestlohn & Rentenanpassung 2025 (bmas.de)",
        "BetrAVG §1a — gesetze-im-internet.de",
      ],
      keyRisks: [
        "Obligation légale de proposer l'Entgeltumwandlung si le salarié le demande (§1a BetrAVG)",
        "Obligation de contribuer 15% minimum employeur sur la conversion salariale — en vigueur pour TOUS les contrats depuis 01/01/2022",
        "Risque : si TiMOTION DE n'a pas de dispositif bAV, tout salarié peut le demander et l'employeur doit répondre",
        "Prescription : 30 ans (§18a BetrAVG) — risque de rappel très long",
      ],
      notes: "PRIORITÉ HAUTE — Des salariés allemands ont déjà demandé un pension plan. Le 15% Zuschuss s'applique aux Direktversicherung, Pensionskasse et Pensionsfonds (pas Direktzusage ni Unterstützungskasse).",
    },
    salary: {
      minimumWage: "12,82 €/h brut (Mindestlohn 2025, MiLoG)",
      minimumWageMonthly: "~2 221 €/mois brut (173,33h)",
      averageSalary: "~4 100 €/mois brut (Destatis 2024)",
      employerSocialCharges: "~20-21% du brut (RV 9,3% + chômage 1,3% + santé ~7,3% + dépendance ~1,7% + accidents ~1,6%)",
      typicalSalesRep: "45 000 – 65 000 € brut/an",
      typicalSalesManager: "70 000 – 100 000 € brut/an",
      typicalOfficeAdmin: "32 000 – 42 000 € brut/an",
      bonusPractice: "Variable commercial très répandu. Weihnachtsgeld (13ème mois) courant. Urlaubsgeld (prime vacances) ~50% des entreprises.",
      sources: [
        "Bundesregierung — Mindestlohn 2025 (bundesregierung.de)",
        "Destatis — Verdiensterhebung 2024",
      ],
      notes: "Pas de grille légale obligatoire hors Tarifvertrag. TiMOTION DE probablement hors convention. Salaires librement négociés.",
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
      legalRetirementAge: "66 ans (State Pension age). Passera à 67 entre mai 2026 et avril 2028. Puis 68 d'ici 2044-2046 (en cours de revue).",
      earlyRetirementAge: "Pas de retraite anticipée dans le régime légal. Accès aux pensions privées dès 55 ans (57 ans à partir de 2028).",
      contributionRateEmployee: "8% de £12 571 à £50 270/an (National Insurance Class 1) + 2% au-delà",
      contributionRateEmployer: "15% au-delà de £5 000/an (Secondary Threshold). Hausse significative vs 2024/25 (était 13,8% au-delà de £9 100).",
      calculationBasis: "New State Pension : forfaitaire, 35 ans de NI contributions pour le taux plein. Non lié au salaire.",
      pillar1: "New State Pension : £230,25/semaine (2025/26) soit ~£11 973/an. Forfaitaire. Triple lock (hausse +4,1% en 2025/26).",
      pillar2: "Auto-Enrolment OBLIGATOIRE depuis 2012. Minimum : 8% total (3% employeur + 5% salarié) sur qualifying earnings (£6 240 à £50 270/an). Inscription automatique des salariés 22+ ans gagnant >£10 000/an.",
      pillar2Mandatory: true,
      pillar3: "Personal Pension / SIPP — facultatif, tax relief at source.",
      minimumPension: "New State Pension : £230,25/semaine (~£11 973/an). Pension Credit si revenus < £218,15/semaine.",
      sources: [
        "GOV.UK — Benefit and Pension Rates 2025-2026",
        "The Pensions Regulator — Auto-Enrolment (thepensionsregulator.gov.uk)",
        "GOV.UK — Rates and Thresholds for Employers 2025-2026",
        "GOV.UK — National Minimum Wage Rates",
      ],
      keyRisks: [
        "Auto-enrolment OBLIGATOIRE — employeur doit contribuer minimum 3%",
        "HAUSSE NI employeur 2025/26 : 15% (vs 13,8%) et seuil abaissé à £5 000 (vs £9 100) — impact coût significatif",
        "Vérifier que TiMOTION UK respecte l'auto-enrolment pour ses 3 salariés",
        "Sanctions du Pensions Regulator en cas de non-conformité",
      ],
      notes: "Le UK est clair : auto-enrolment obligatoire avec 3% minimum employeur. Attention à la hausse significative du NI employeur en 2025/26 (+1,2 pts et seuil divisé par ~2).",
    },
    salary: {
      minimumWage: "£12,21/h (National Living Wage 21+ ans, avril 2025, +6,7%)",
      minimumWageMonthly: "~£2 117/mois brut (173,33h)",
      averageSalary: "~£35 000/an brut (médiane UK, ONS 2024)",
      employerSocialCharges: "~18-20% (NI employeur 15% + auto-enrolment 3%)",
      typicalSalesRep: "£30 000 – £45 000/an (base + commission)",
      typicalSalesManager: "£50 000 – £75 000/an",
      typicalOfficeAdmin: "£25 000 – £32 000/an",
      bonusPractice: "Commission commerciale courante. Pas de 13ème mois culturellement. Bonus annuel discrétionnaire fréquent.",
      sources: [
        "GOV.UK — National Minimum Wage Rates 2025",
        "ONS — Annual Survey of Hours and Earnings 2024",
      ],
      notes: "Post-Brexit : les salariés doivent avoir le right to work au UK. Employment Allowance £10 500 peut réduire le NI employeur.",
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
      legalRetirementAge: "67 ans (AOW-leeftijd, fixé pour 2025-2027. Passera à 67 ans 3 mois en 2028, indexé sur espérance de vie CBS)",
      earlyRetirementAge: "Pas de retraite anticipée dans l'AOW. Accès aux pensions professionnelles possible avant selon le règlement du fonds.",
      contributionRateEmployee: "AOW : intégré dans l'IR (17,9%). Pension professionnelle : ~4-8% selon le fonds",
      contributionRateEmployer: "Pension professionnelle : ~8-15% selon le fonds. Zvw (santé) : 6,51% plafonné à 75 864 €/an",
      calculationBasis: "AOW : forfaitaire, basé sur 50 ans de résidence. Pension prof. : cotisations définies (transition Wtp vers 01/01/2028).",
      pillar1: "AOW : €1 580,92/mois brut (personne seule, 01/01/2025) + vakantiegeld €102,46/mois. Financée par impôt (17,9% inclus dans IR). Source : SVB.",
      pillar2: "Pension professionnelle — QUASI-OBLIGATOIRE. ~90% couverts. Transition Wtp (loi 01/07/2023) vers cotisations définies, deadline repoussée au 01/01/2028. Vérifier si TiMOTION NL est rattaché à un fonds sectoriel (Bedrijfstakpensioenfonds).",
      pillar2Mandatory: false,
      pillar3: "3ème pilier limité depuis 2023 (suppression déduction fiscale). Épargne libre.",
      minimumPension: "AOW = €1 580,92/mois brut (seul). Pas de minimum pour le pilier 2.",
      sources: [
        "SVB — Bedragen AOW 2025 (svb.nl)",
        "Rijksoverheid — AOW-leeftijd 2025-2031",
        "Rijksoverheid — Wet toekomst pensioenen (Wtp)",
        "DNB — Pensioenen (dnb.nl)",
      ],
      keyRisks: [
        "PRIORITÉ HAUTE — Les salariés NL ont demandé un pension plan",
        "Vérifier si TiMOTION NL est rattaché à un fonds de pension sectoriel obligatoire",
        "Ne pas avoir de pension professionnelle aux Pays-Bas est une anomalie (~90% des salariés couverts)",
        "Transition Wtp en cours — deadline 01/01/2028 pour passer en cotisations définies",
      ],
      notes: "PRIORITÉ HAUTE — Le pilier 2 est quasi-systématique aux NL. Urgent de vérifier la situation et mettre en place un dispositif si absent.",
    },
    salary: {
      minimumWage: "€14,06/h brut (WML 01/01/2025, → €14,40/h au 01/07/2025). Indexé 2×/an.",
      minimumWageMonthly: "~€2 234/mois brut (sur 40h/semaine, base horaire depuis 01/01/2024)",
      averageSalary: "~€3 900/mois brut (CBS 2024)",
      employerSocialCharges: "~18-23% (Zvw 6,51% + AWf 2,74% contrat fixe / 7,74% flex + Aof 6,35-7,58% + Whk ~1,33% + Ufo 0,68%)",
      typicalSalesRep: "€40 000 – €60 000 brut/an",
      typicalSalesManager: "€65 000 – €90 000 brut/an",
      typicalOfficeAdmin: "€30 000 – €40 000 brut/an",
      bonusPractice: "Vakantiegeld OBLIGATOIRE : 8% du salaire brut annuel (WMM), versé avant le 30 juin. Variable commercial courant. 13ème mois fréquent.",
      sources: [
        "Rijksoverheid — Bedragen minimumloon 2025",
        "Belastingdienst — Premies werknemersverzekeringen 2025",
        "CBS — Statline salaires 2024",
      ],
      notes: "ATTENTION : vakantiegeld 8% OBLIGATOIRE par la loi. Non-conformité : amendes Nederlandse Arbeidsinspectie, rappel jusqu'à 5 ans. Prime AWf différenciée contrat fixe/flex.",
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
      legalRetirementAge: "67 ans (pensione di vecchiaia, avec 20 ans min de cotisation). Inchangé 2025-2026, prochaine révision 01/01/2027.",
      earlyRetirementAge: "42 ans 10 mois de cotisation (hommes) / 41 ans 10 mois (femmes) — sans condition d'âge. Ou 64 ans + 20 ans cotisation (contributif pur).",
      contributionRateEmployee: "9,19% (IVS — Invalidità, Vecchiaia, Superstiti). +1% au-delà du 1er seuil de pension.",
      contributionRateEmployer: "23,81% (IVS). Total IVS : 33%. Base max (post-1996) : 120 607 €/an.",
      calculationBasis: "Système contributif (post-1996) : capitalisation virtuelle × coefficient de transformation lié à l'âge. Mixte pour carrières pré-1996.",
      pillar1: "INPS — Régime obligatoire. Taux total 33%. Pension moyenne ~1 200 €/mois.",
      pillar2: "Fondi pensione complementari — NON obligatoires mais TFR dirigeable vers fonds de pension. Silenzio-assenso : si pas de choix dans 6 mois, le TFR va au fonds sectoriel automatiquement.",
      pillar2Mandatory: false,
      pillar3: "PIP (Piano Individuale Pensionistico) — avantage fiscal jusqu'à 5 164,57 €/an.",
      minimumPension: "€616,67/mois (trattamento minimo 2025, base €603,40 + revalorisation 2,2% Legge di Bilancio 2025) × 13 mensualités",
      sources: [
        "INPS — Circolare n°27 du 30/01/2025 (inps.it)",
        "INPS — Circolare n°23 du 28/01/2025 (prestazioni 2025)",
        "D.Lgs. 252/2005 — Previdenza complementare",
        "COVIP — Rapport annuel fonds de pension",
      ],
      keyRisks: [
        "Le TFR est un droit du salarié — vérifier provisionnement correct (~6,91%/an = salaire/13,5 - 0,5% INPS)",
        "Silenzio-assenso : si un salarié n'a pas choisi dans les 6 mois, TFR va automatiquement au fonds sectoriel",
        "Vérifier quel CCNL s'applique (Commercio ? Metalmeccanici ?) — impacts sur tredicesima/quattordicesima",
      ],
      notes: "Le TFR (6,91%/an) est à la fois indemnité de départ et véhicule de retraite. Coefficient de revalorisation ISTAT (déc 2025) : 1,02311. 8 salariés = sujet important.",
    },
    salary: {
      minimumWage: "Pas de SMIC légal en Italie — minima fixés par les CCNL",
      minimumWageMonthly: "Variable selon CCNL. Commercio nivel 4 : ~€1 650-1 800/mois brut",
      averageSalary: "~€2 300/mois brut (ISTAT 2024)",
      employerSocialCharges: "~30-32% du brut (INPS 23,81% + INAIL ~1% + TFR 6,91% provisionné)",
      typicalSalesRep: "€30 000 – €45 000 brut/an",
      typicalSalesManager: "€50 000 – €70 000 brut/an",
      typicalOfficeAdmin: "€25 000 – €32 000 brut/an",
      bonusPractice: "Tredicesima (13ème mois) OBLIGATOIRE (DPR 1070/1960). Quattordicesima (14ème mois) obligatoire dans CCNL Commercio. Paiement : 24 décembre.",
      sources: [
        "INPS — Aliquote contributive 2025 (Circolare n°27)",
        "ISTAT — Statistiche salariali 2024",
        "CCNL Commercio (Confcommercio)",
      ],
      notes: "Tredicesima obligatoire par la loi. Quattordicesima : obligatoire si CCNL Commercio s'applique. Identifier la CCNL applicable à TiMOTION IT.",
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
      legalRetirementAge: "66 ans 8 mois (2025, règle générale). 65 ans si 38 ans 3 mois de cotisation. Vers 67 ans en 2027.",
      earlyRetirementAge: "Retraite anticipée volontaire : 2 ans avant l'âge légal (35 ans cotisation min) — pénalité 2-3,26%/trimestre",
      contributionRateEmployee: "4,70% (contingencias comunes) + MEI 0,13% = 4,83%",
      contributionRateEmployer: "23,60% (contingencias comunes) + MEI 0,67% = 24,27%",
      calculationBasis: "Dernières 25 années. Taux de remplacement : 50% pour 15 ans → 100% pour 36 ans 6 mois. Base max cotisation : 4 909,50 €/mois.",
      pillar1: "INSS — Régime général obligatoire. Pension max : ~€3 175/mois. Cotisation totale CC : 28,30% + MEI 0,80%.",
      pillar2: "Planes de pensiones de empleo — NON obligatoires. Peu développés (~10% couverts). Loi 12/2022 encourage les plans sectoriels.",
      pillar2Mandatory: false,
      pillar3: "Planes de pensiones individuales — limite 1 500 €/an. Plans d'entreprise : 8 500 €/an.",
      minimumPension: "~€1 033/mois (avec conjoint) / ~€721/mois (isolé >65 ans) — 2024",
      sources: [
        "Seguridad Social — Jubilación (seg-social.es)",
        "BOE — Real Decreto 87/2025 (SMI)",
        "BOE — Orden PJC/178/2025 (cotisations 2025)",
        "Loi 12/2022 — Planes de pensiones de empleo",
      ],
      keyRisks: [
        "Pas d'obligation de pilier 2 — pas de risque de non-conformité sur la retraite",
        "MEI (Mecanismo de Equidad Intergeneracional) : nouvelle cotisation 0,80% depuis 2023, en hausse progressive",
      ],
      notes: "Pilier 1 généreux si carrière complète. Proposer un plan d'entreprise serait un avantage compétitif pour les 5 salariés espagnols.",
    },
    salary: {
      minimumWage: "SMI 2025 : 1 184 €/mois (14 pagas) = 39,47 €/jour (Real Decreto 87/2025, +4,41%)",
      minimumWageMonthly: "€1 184/mois sur 14 mensualités = ~€1 381/mois proraté sur 12 mois. Annuel : 16 576 €",
      averageSalary: "~€2 200/mois brut (INE 2024)",
      employerSocialCharges: "~31-34% (CC 23,60% + desempleo 5,50% + FOGASA 0,20% + FP 0,60% + MEI 0,67%)",
      typicalSalesRep: "€25 000 – €40 000 brut/an",
      typicalSalesManager: "€45 000 – €65 000 brut/an",
      typicalOfficeAdmin: "€22 000 – €30 000 brut/an",
      bonusPractice: "14 pagas OBLIGATOIRE (art. 31 Estatuto de los Trabajadores) : 2 payes extra en juin et décembre. Le SMI est exprimé sur 14 mois. Variable commercial courant.",
      sources: [
        "BOE — Real Decreto 87/2025 (SMI)",
        "Seguridad Social — Cotización 2025",
        "INE — Encuesta anual de estructura salarial",
      ],
      notes: "Les 14 pagas sont LÉGALEMENT OBLIGATOIRES (pas juste culturel). Le SMI est toujours exprimé sur 14 mensualités. Comparer en annuel brut avec les autres pays.",
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
      legalRetirementAge: "66 ans (depuis le 01/01/2025, nés à partir du 01/01/1960). Passera à 67 ans en 2030. Anticipée : 63 ans avec 42 ans de carrière.",
      earlyRetirementAge: "63 ans (42 ans de carrière) ou 60-61 ans avec carrières plus longues",
      contributionRateEmployee: "13,07% (cotisation globale incluant retraite, santé, chômage)",
      contributionRateEmployer: "~25% (cotisation patronale globale, après réductions structurelles)",
      calculationBasis: "Salaire moyen de toute la carrière, plafonné. Taux : 60% (isolé) ou 75% (ménage) du salaire moyen.",
      pillar1: "Pension légale SFP. Taux de remplacement structurellement bas (~35-50%). Pension max ~€2 500/mois brut.",
      pillar2: "Assurance groupe / Fonds de pension (LPC/WAP 2003) — NON obligatoire au niveau individuel MAIS beaucoup de commissions paritaires sectorielles l'imposent. ~75% des salariés couverts. Rendement garanti minimum : 2,50% depuis 01/01/2025.",
      pillar2Mandatory: false,
      pillar3: "Épargne-pension individuelle : avantage fiscal ~30% sur max 1 020 € ou 1 310 €/an.",
      minimumPension: "€1 738/mois brut (ménage) / €1 390/mois (isolé) — 2024, carrière complète",
      sources: [
        "Partena Professional — Retirement age 66 in 2025",
        "SFPD — Service fédéral des Pensions (sfpd.fgov.be)",
        "Loi du 28 avril 2003 (LPC/WAP) — pensions complémentaires",
      ],
      keyRisks: [
        "75% des salariés belges ont une assurance groupe — ne pas en avoir est une anomalie",
        "Vérifier si la commission paritaire applicable impose un plan sectoriel",
        "Taux de remplacement légal très bas (~35-50%) rend le pilier 2 quasi-indispensable",
      ],
      notes: "Avec 1 salarié, mettre en place une assurance groupe est simple et attendu en Belgique. Rendement garanti minimum 2,50% depuis 2025.",
    },
    salary: {
      minimumWage: "RMMMG : €2 111,89/mois brut (depuis février 2025, indexation +2%)",
      minimumWageMonthly: "€2 111,89/mois brut (~€12,83/h sur 38h/semaine)",
      averageSalary: "~€3 800/mois brut (Statbel 2024)",
      employerSocialCharges: "~25-27% du brut (après réductions structurelles)",
      typicalSalesRep: "€38 000 – €55 000 brut/an",
      typicalSalesManager: "€60 000 – €85 000 brut/an",
      typicalOfficeAdmin: "€30 000 – €40 000 brut/an",
      bonusPractice: "13ème mois quasi-standard. Pécule de vacances OBLIGATOIRE : simple (salaire maintenu) + double (92% du brut mensuel). Ouvriers : 15,38% via ONVA. Voiture de société = norme pour commerciaux.",
      sources: [
        "SPF Emploi — Salaire minimum (emploi.belgique.be)",
        "CNT — RMMMG (cnt-nar.be)",
        "ONVA — Calcul pécule de vacances",
        "Statbel — Enquête structure salaires 2024",
      ],
      notes: "Pécule de vacances double (92% du brut) est OBLIGATOIRE. ONSS 13,07% sur le double pécule. La voiture de société est quasi-incontournable pour les profils commerciaux en Belgique.",
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
      legalRetirementAge: "65 ans (hommes) / 60 ans (femmes) — inchangé depuis la réforme 2017 qui a annulé le passage à 67 ans",
      earlyRetirementAge: "Pas de retraite anticipée standard (sauf professions spécifiques)",
      contributionRateEmployee: "9,76% (emerytalne) + 1,50% (rentowe) + 2,45% (chorobowe) = 13,71%",
      contributionRateEmployer: "9,76% (emerytalne) + 6,50% (rentowe) + ~0,67-3,33% (wypadkowe) + FP 2,45% + FGŚP 0,1%",
      calculationBasis: "Système NDC (cotisations définies notionnelles). Pension = capital accumulé ÷ espérance de vie. Plafond emerytalne+rentowe : 260 190 PLN/an.",
      pillar1: "ZUS — Régime obligatoire NDC. Cotisation emerytalne totale : 19,52% (9,76% + 9,76%).",
      pillar2: "PPK (Pracownicze Plany Kapitałowe) — OBLIGATOIRE pour l'employeur depuis 2019. Cotisation : salarié 2% (réductible à 0,5% si revenu < 120% SMIC) + employeur 1,5% min (jusqu'à 4% volontaire). Auto-inscription 18-54 ans, opt-out possible mais réinscription auto tous les 4 ans. Prime État : 240 PLN/an + 250 PLN welcome.",
      pillar2Mandatory: true,
      pillar3: "IKE et IKZE — comptes individuels avec avantages fiscaux.",
      minimumPension: "1 780,96 PLN/mois brut (~€410/mois) — 2024",
      sources: [
        "Ustawa o PPK (2018) — mojeppk.pl",
        "ZUS — Składki 2025 (zus.pl)",
        "OECD — Pensions at a Glance 2025, Poland",
      ],
      keyRisks: [
        "PPK OBLIGATOIRE pour l'employeur — amende jusqu'à 1,5% de la masse salariale en cas de non-mise en place",
        "Vérifier IMMÉDIATEMENT que TiMOTION PL a mis en place le PPK avec un opérateur agréé",
        "Coût employeur PPK : 1,5% minimum du brut de chaque salarié",
      ],
      notes: "Le PPK est obligatoire et récent (2019). L'employeur DOIT proposer le dispositif même si le salarié peut refuser (opt-out). Coût total employeur : PLN 5 622 par salarié au SMIC.",
    },
    salary: {
      minimumWage: "4 666 PLN/mois brut (~€1 080) / 30,50 PLN/h (2025, taux unique pour l'année)",
      minimumWageMonthly: "4 666 PLN/mois brut. Net : ~3 511 PLN. Coût employeur total : ~5 622 PLN",
      averageSalary: "~7 500 PLN/mois brut (~€1 740)",
      employerSocialCharges: "~20-22% (emerytalne 9,76% + rentowe 6,50% + wypadkowe ~1,67% + FP 2,45% + FGŚP 0,1% + PPK 1,5%)",
      typicalSalesRep: "8 000 – 12 000 PLN/mois brut (~€1 850 – €2 780)",
      typicalSalesManager: "15 000 – 22 000 PLN/mois brut (~€3 480 – €5 100)",
      typicalOfficeAdmin: "5 500 – 8 000 PLN/mois brut (~€1 280 – €1 850)",
      bonusPractice: "Pas de 13ème mois obligatoire. Primes de performance courantes. Variable commercial standard.",
      sources: [
        "gov.pl — Ministry of Family, Minimum Wage 2025",
        "ZUS — Składki na ubezpieczenia społeczne 2025",
      ],
      notes: "SMIC polonais en hausse rapide (~12-15%/an). Taux unique pour 2025 (vs 2 revalorisations en 2024). PPK 1,5% à inclure dans le coût employeur.",
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
      legalRetirementAge: "67 ans (folkepension). Passera à 68 en 2030, 69 en 2035, 70 en 2040 (adopté mai 2025, indexé espérance de vie).",
      earlyRetirementAge: "Efterløn (préretraite) possible 3 ans avant folkepension si membre A-kasse depuis 30 ans",
      contributionRateEmployee: "ATP : 1/3 = ~1 136 DKK/an (montant fixe). Pension prof. : ~4-5% du salaire via convention collective.",
      contributionRateEmployer: "ATP : 2/3 = ~2 673 DKK/an (montant fixe). Pension prof. : ~8-11% du salaire via convention collective.",
      calculationBasis: "Folkepension : forfaitaire + supplément sous conditions de revenus. ATP : cotisations fixes → pension par points. Pension prof. : cotisations définies.",
      pillar1: "Folkepension : base ~6 978 DKK/mois + supplément sous conditions ~7 680 DKK/mois. ATP total : 3 809 DKK/an.",
      pillar2: "Pensions professionnelles — QUASI-OBLIGATOIRES via conventions collectives (~90% couverts). Cotisation typique : 12-15% du salaire (2/3 employeur + 1/3 salarié). Secteur industrie 2025 : 13% total.",
      pillar2Mandatory: false,
      pillar3: "Aldersopsparing : max 5 800 DKK/an (taxé 15,3% à l'entrée).",
      minimumPension: "Folkepension base : ~6 978 DKK/mois + ældrecheck si faibles revenus",
      sources: [
        "borger.dk — State Pension & ATP rates",
        "Rangvid Blog — Retirement age to 70",
        "IndustriAll Europe — DK 2025 agreement",
      ],
      keyRisks: [
        "Danemark = système de retraite n°1 mondial (Mercer Index)",
        "Ne PAS proposer de pension professionnelle au Danemark est socialement inacceptable — même avec 1 salarié",
        "Vérifier si le salarié est couvert par une overenskomst (convention collective) qui rend la pension obligatoire",
      ],
      notes: "Standard danois : 12-15% du salaire en pension professionnelle. Ne pas proposer de plan = signal négatif fort pour le recrutement et la rétention.",
    },
    salary: {
      minimumWage: "Pas de SMIC légal au Danemark (confirmé : exempt de la directive EU minimum wage). Minima via conventions collectives : ~110 DKK/h (~€14,75/h)",
      minimumWageMonthly: "~28 000-32 000 DKK/mois brut via convention collective (~€3 750-€4 290)",
      averageSalary: "~45 000 DKK/mois brut (~€6 030 — un des plus élevés d'Europe)",
      employerSocialCharges: "~1-3% seulement (ATP ~2 673 DKK/an + AES). Charges patronales très faibles car système financé par l'impôt.",
      typicalSalesRep: "35 000 – 50 000 DKK/mois brut (~€4 700 – €6 700)",
      typicalSalesManager: "55 000 – 75 000 DKK/mois brut (~€7 380 – €10 060)",
      typicalOfficeAdmin: "30 000 – 38 000 DKK/mois brut (~€4 020 – €5 100)",
      bonusPractice: "Feriepenge OBLIGATOIRE : 12,5% du salaire (via FerieKonto) + ferietillæg 1% pour salariés mensualisés. Pas de 13ème mois culturel. 5 semaines de congés.",
      sources: [
        "workindenmark.dk — Holiday Allowance",
        "virk.dk — ATP contribution rates",
        "Statistics Denmark — Lønstatistik 2024",
      ],
      notes: "Salaires très élevés mais charges patronales très faibles. Coût total employeur comparable aux autres pays. Feriepenge 12,5% = coût obligatoire à provisionner.",
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
      legalRetirementAge: "~64 ans 2 mois en 2025 (progressif, +2 mois/an). Réforme 2025 : objectif 67 ans pour les nés après 1988 (+1 mois/an).",
      earlyRetirementAge: "3 ans avant l'âge légal (předčasný důchod) — réduction permanente ~0,9-1,5%/trimestre anticipé",
      contributionRateEmployee: "6,5% (pension) + 0,6% (maladie) = 7,1% social + 4,5% santé = 11,6% total",
      contributionRateEmployer: "21,5% (pension) + 2,1% (maladie) + 1,2% (emploi) = 24,8% social + 9,0% santé = 33,8% total",
      calculationBasis: "Prestations définies. Pension = base forfaitaire + % du salaire de référence. Plafond SS : 2 234 736 CZK/an.",
      pillar1: "ČSSZ — Régime obligatoire à prestations définies. Taux de remplacement ~40-50%.",
      pillar2: "DPS (Doplňkové penzijní spoření) — NON obligatoire. Contribution étatique : 20% du dépôt mensuel, max 340 CZK/mois (sur dépôt de 1 700 CZK). Avantage fiscal employeur : jusqu'à 50 000 CZK/an déductible. À partir de 2026 : obligation pour certains employeurs (3ème catégorie risque).",
      pillar2Mandatory: false,
      pillar3: "DPS fait office de 3ème pilier. ~60% des Tchèques y participent. Déduction fiscale salarié : jusqu'à 48 000 CZK/an.",
      minimumPension: "~5 000 CZK/mois (~€200) minimum, mais en pratique ~15 000-18 000 CZK/mois",
      sources: [
        "ČSSZ — Důchodový věk (cssz.cz)",
        "MPSV — Old-age Pension (mpsv.cz)",
        "PWC — Czech Republic Tax Summaries 2025",
      ],
      keyRisks: [
        "Pas d'obligation de pilier 2 employeur en 2025",
        "Mais contribuer au DPS est un avantage fiscal (50 000 CZK/an déductible) et un bon levier de rétention",
        "Réforme 2025 : nouveau plafond objectif 67 ans — impact sur la communication salarié",
      ],
      notes: "Système simple, pas de risque de non-conformité sur la retraite. Contribuer au DPS du salarié = geste apprécié et fiscalement avantageux.",
    },
    salary: {
      minimumWage: "20 800 CZK/mois brut / 124,40 CZK/h (~€845, +10% vs 2024)",
      minimumWageMonthly: "20 800 CZK/mois brut (~€845). Objectif : 47% du salaire moyen d'ici 2029.",
      averageSalary: "~43 000 CZK/mois brut (~€1 750)",
      employerSocialCharges: "33,8% (social 24,8% + santé 9,0%)",
      typicalSalesRep: "40 000 – 60 000 CZK/mois brut (~€1 630 – €2 440)",
      typicalSalesManager: "70 000 – 100 000 CZK/mois brut (~€2 850 – €4 070)",
      typicalOfficeAdmin: "30 000 – 40 000 CZK/mois brut (~€1 220 – €1 630)",
      bonusPractice: "Pas de 13ème mois obligatoire. Příspěvek na stravování (contribution repas / stravenky) quasi-universelle. Variable commercial standard.",
      sources: [
        "Ecovis Legal CZ — Minimum Wage 2025",
        "PWC — Czech Republic Tax Summaries 2025",
        "ČSÚ — Mzdy a náklady práce 2024",
      ],
      notes: "Coûts salariaux en hausse rapide. Charges patronales élevées (33,8%) malgré des salaires modestes. Contributions repas = pratique quasi-universelle à vérifier.",
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
      legalRetirementAge: "65 ans (hommes) / 60 ans (femmes) — transition 2019-2028. En 2025 : année « blanche » (quasi personne ne qualifie pour la retraite d'âge standard).",
      earlyRetirementAge: "Professions spécifiques (travail dangereux, Grand Nord). Досрочная пенсия.",
      contributionRateEmployee: "0% (pas de cotisation retraite salarié en Russie)",
      contributionRateEmployer: "22% sur salaire ≤ 2 759 000 RUB/an, 10% au-delà. Total social : 30% (22% pension + 2,9% social + 5,1% médical), 15,1% au-delà du plafond.",
      calculationBasis: "Système par points (пенсионные коэффициенты). Pension = points × valeur du point + partie fixe.",
      pillar1: "СФР (Социальный фонд России) — Régime obligatoire. 100% financé par l'employeur. Pension moyenne ~22 000 RUB/mois (~€220).",
      pillar2: "НПФ (fonds privés) — NON obligatoires. Peu développés. Composante capitalisation gelée depuis 2014.",
      pillar2Mandatory: false,
      pillar3: "Programme долгосрочные сбережения (2024) — cofinancé par l'État. Facultatif.",
      minimumPension: "Прожиточный минимум пенсионера : ~13 290 RUB/mois (~€130)",
      sources: [
        "СФР — How Pensions Are Formed (sfr.gov.ru)",
        "Konsu Group — MROT 2025",
      ],
      keyRisks: [
        "RISQUE GÉOPOLITIQUE MAJEUR : Art. 5n Règlement 833/2014 interdit les services comptables/RH aux entités russes par des entreprises EU",
        "L'exemption intra-groupe A EXPIRÉ le 20/06/2024 — TiMOTION doit obtenir une licence nationale pour continuer la gestion RH",
        "19ème paquet de sanctions (oct. 2025) : nouvelles restrictions sur les transactions et paiements",
        "Les citoyens/résidents EU ne peuvent plus être employés par des entités russes pour des services restreints",
      ],
      notes: "ATTENTION SANCTIONS : l'exemption intra-groupe pour les services RH/comptables a expiré. TiMOTION doit vérifier qu'il dispose d'une licence nationale pour maintenir ce salarié. Évaluer sérieusement la pertinence du maintien.",
    },
    salary: {
      minimumWage: "МРОТ : 22 440 RUB/mois (~€220) en 2025 (+17% vs 2024). Régional : Moscou 32 916 RUB, St-Pétersbourg 28 750 RUB",
      minimumWageMonthly: "22 440 RUB/mois brut (~€220)",
      averageSalary: "~73 000 RUB/mois brut (~€720) — très variable (Moscou ~120 000 RUB)",
      employerSocialCharges: "30% (22% pension + 2,9% social + 5,1% médical) sur base ≤ plafond, 15,1% au-delà. 0% salarié.",
      typicalSalesRep: "80 000 – 150 000 RUB/mois brut (~€790 – €1 480)",
      typicalSalesManager: "150 000 – 250 000 RUB/mois brut (~€1 480 – €2 470)",
      typicalOfficeAdmin: "50 000 – 80 000 RUB/mois brut (~€490 – €790)",
      bonusPractice: "13ème salaire courant mais pas obligatoire. Primes trimestrielles fréquentes.",
      sources: [
        "Konsu Group — Minimal Wage Russia 2025",
        "Trading Economics — Russia Minimum Wages",
        "EU Council — Sanctions Q&A (consilium.europa.eu)",
        "Norton Rose Fulbright — Russia Sanctions Overview",
      ],
      notes: "CRITIQUE : Vérifier l'autorisation nationale pour maintenir les services RH/paie. Sanctions EU restrictives depuis l'expiration de l'exemption intra-groupe (20/06/2024). Volatilité RUB/EUR.",
    },
  },
];
