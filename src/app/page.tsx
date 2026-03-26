"use client";

import { useState } from "react";
import XLSX from "xlsx-js-style";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Shield,
  Globe,
  Phone,
  Mail,
  Info,
  Download,
  Building2,
  Users,
  TrendingUp,
  Clock,
  ChevronDown,
  ChevronUp,
  Landmark,
  Banknote,
  FileText,
  Target,
  ExternalLink,
} from "lucide-react";
import { COUNTRIES, type CountryData } from "../data/countries";

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

const fmt = (n: number) =>
  n.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

/* ═══════════════════════════════════════════════════════════════
   ANALYSIS HELPERS
   ═══════════════════════════════════════════════════════════════ */

function getPensionStatus(c: CountryData): "ok" | "warning" | "critical" {
  if (c.pension.keyRisks.length === 0) return "ok";
  const hasUrgent = c.pension.keyRisks.some(
    (r) =>
      r.toLowerCase().includes("obligatoire") ||
      r.toLowerCase().includes("immédiat") ||
      r.toLowerCase().includes("priorité haute") ||
      r.toLowerCase().includes("vérifier")
  );
  return hasUrgent ? "critical" : "warning";
}

function getAlertCounts() {
  let critical = 0;
  let warning = 0;
  let ok = 0;
  COUNTRIES.forEach((c) => {
    const s = getPensionStatus(c);
    if (s === "critical") critical++;
    else if (s === "warning") warning++;
    else ok++;
  });
  return { critical, warning, ok };
}

const alerts = getAlertCounts();

/* ═══════════════════════════════════════════════════════════════
   EXCEL EXPORT
   ═══════════════════════════════════════════════════════════════ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type R = any;

const S = {
  titleBlue: {
    font: { name: "Trebuchet MS", bold: true, sz: 16, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "0056B3" } },
    alignment: { horizontal: "center" as const, vertical: "center" as const },
  },
  subtitle: {
    font: { name: "Trebuchet MS", italic: true, sz: 11, color: { rgb: "666666" } },
  },
  headerNavy: {
    font: { name: "Trebuchet MS", bold: true, sz: 11, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "1E2D3D" } },
    alignment: { horizontal: "center" as const, vertical: "center" as const, wrapText: true },
  },
  cellNormal: {
    font: { name: "Trebuchet MS", sz: 11 },
    alignment: { vertical: "center" as const, wrapText: true },
    border: { bottom: { style: "thin" as const, color: { rgb: "E5E7EB" } } },
  },
  cellAlt: {
    font: { name: "Trebuchet MS", sz: 11 },
    fill: { fgColor: { rgb: "F0F7FF" } },
    alignment: { vertical: "center" as const, wrapText: true },
    border: { bottom: { style: "thin" as const, color: { rgb: "E5E7EB" } } },
  },
  cellCritical: {
    font: { name: "Trebuchet MS", bold: true, sz: 11, color: { rgb: "DC2626" } },
    fill: { fgColor: { rgb: "FEF2F2" } },
    alignment: { vertical: "center" as const, wrapText: true },
  },
  brandFooter: {
    font: { name: "Trebuchet MS", bold: true, sz: 11, color: { rgb: "0056B3" } },
    alignment: { horizontal: "center" as const },
  },
};

function exportDiagnostic() {
  const wb = XLSX.utils.book_new();

  // === SYNTHÈSE ===
  const synthRows: R[][] = [];
  synthRows.push([
    { v: "DIAGNOSTIC RETRAITE & SALAIRES — TiMOTION EUROPE", s: S.titleBlue },
    ...Array(5).fill({ v: "", s: S.titleBlue }),
  ]);
  synthRows.push([{ v: `Analyse réalisée par DAIRIA Avocats × Exiliance — ${new Date().toLocaleDateString("fr-FR")}`, s: S.subtitle }]);
  synthRows.push([]);
  synthRows.push([
    { v: "Pays", s: S.headerNavy },
    { v: "Effectif", s: S.headerNavy },
    { v: "Âge retraite", s: S.headerNavy },
    { v: "Pilier 2 obligatoire ?", s: S.headerNavy },
    { v: "Salaire minimum", s: S.headerNavy },
    { v: "Charges patronales", s: S.headerNavy },
  ]);
  COUNTRIES.forEach((c, i) => {
    const cs = i % 2 === 0 ? S.cellNormal : S.cellAlt;
    synthRows.push([
      { v: `${c.flag} ${c.name}`, s: cs },
      { v: c.employees, s: cs },
      { v: c.pension.legalRetirementAge, s: cs },
      { v: c.pension.pillar2Mandatory ? "OUI" : "Non", s: c.pension.pillar2Mandatory ? S.cellCritical : cs },
      { v: c.salary.minimumWageMonthly, s: cs },
      { v: c.salary.employerSocialCharges, s: cs },
    ]);
  });
  synthRows.push([]);
  synthRows.push([{ v: "DAIRIA Avocats × Exiliance — s.coly@dairia-avocats.com — 06 72 42 24 86", s: S.brandFooter }]);
  const wsSynth = XLSX.utils.aoa_to_sheet(synthRows);
  wsSynth["!cols"] = [{ wch: 20 }, { wch: 10 }, { wch: 40 }, { wch: 22 }, { wch: 30 }, { wch: 35 }];
  wsSynth["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];
  XLSX.utils.book_append_sheet(wb, wsSynth, "Synthèse");

  // === Per country sheets ===
  COUNTRIES.forEach((c) => {
    const rows: R[][] = [];
    rows.push([{ v: `${c.flag} ${c.name} — Diagnostic complet`, s: S.titleBlue }, ...Array(2).fill({ v: "", s: S.titleBlue })]);
    rows.push([{ v: `Effectif : ${c.employees} salarié(s) | Devise : ${c.currency}`, s: S.subtitle }]);
    rows.push([]);

    // Pension section
    rows.push([{ v: "RETRAITE", s: S.headerNavy }, { v: "", s: S.headerNavy }, { v: "", s: S.headerNavy }]);
    const pensionFields = [
      ["Âge légal", c.pension.legalRetirementAge],
      ["Retraite anticipée", c.pension.earlyRetirementAge],
      ["Cotisation salarié", c.pension.contributionRateEmployee],
      ["Cotisation employeur", c.pension.contributionRateEmployer],
      ["Base de calcul", c.pension.calculationBasis],
      ["Pilier 1 (légal)", c.pension.pillar1],
      ["Pilier 2 (entreprise)", c.pension.pillar2],
      ["Pilier 2 obligatoire ?", c.pension.pillar2Mandatory ? "OUI" : "Non"],
      ["Pilier 3 (individuel)", c.pension.pillar3],
      ["Pension minimum", c.pension.minimumPension],
    ];
    pensionFields.forEach(([label, val], i) => {
      const cs = i % 2 === 0 ? S.cellNormal : S.cellAlt;
      rows.push([{ v: label, s: { ...cs, font: { ...cs.font, bold: true } } }, { v: val, s: cs }, { v: "", s: cs }]);
    });

    rows.push([]);
    if (c.pension.keyRisks.length > 0) {
      rows.push([{ v: "RISQUES IDENTIFIÉS", s: S.headerNavy }, { v: "", s: S.headerNavy }, { v: "", s: S.headerNavy }]);
      c.pension.keyRisks.forEach((r) => {
        rows.push([{ v: "⚠️", s: S.cellCritical }, { v: r, s: S.cellCritical }, { v: "", s: S.cellCritical }]);
      });
    }

    rows.push([]);
    // Salary section
    rows.push([{ v: "GRILLES SALARIALES", s: S.headerNavy }, { v: "", s: S.headerNavy }, { v: "", s: S.headerNavy }]);
    const salaryFields = [
      ["Salaire minimum", c.salary.minimumWage],
      ["Salaire minimum mensuel", c.salary.minimumWageMonthly],
      ["Salaire moyen national", c.salary.averageSalary],
      ["Charges patronales", c.salary.employerSocialCharges],
      ["Commercial terrain", c.salary.typicalSalesRep],
      ["Directeur commercial", c.salary.typicalSalesManager],
      ["Administratif", c.salary.typicalOfficeAdmin],
      ["Pratique bonus/primes", c.salary.bonusPractice],
    ];
    salaryFields.forEach(([label, val], i) => {
      const cs = i % 2 === 0 ? S.cellNormal : S.cellAlt;
      rows.push([{ v: label, s: { ...cs, font: { ...cs.font, bold: true } } }, { v: val, s: cs }, { v: "", s: cs }]);
    });

    rows.push([]);
    rows.push([{ v: "SOURCES", s: S.headerNavy }, { v: "", s: S.headerNavy }, { v: "", s: S.headerNavy }]);
    [...c.pension.sources, ...c.salary.sources].forEach((src) => {
      rows.push([{ v: "📄", s: S.cellNormal }, { v: src, s: S.cellNormal }, { v: "", s: S.cellNormal }]);
    });

    rows.push([]);
    rows.push([{ v: "DAIRIA Avocats × Exiliance", s: S.brandFooter }]);

    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws["!cols"] = [{ wch: 25 }, { wch: 70 }, { wch: 20 }];
    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }];
    XLSX.utils.book_append_sheet(wb, ws, c.name.substring(0, 31));
  });

  XLSX.writeFile(wb, `TiMOTION_Diagnostic_Social_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function StatusBadge({ status }: { status: "ok" | "warning" | "critical" }) {
  if (status === "critical")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
        <XCircle size={12} /> Action requise
      </span>
    );
  if (status === "warning")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
        <AlertTriangle size={12} /> À vérifier
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
      <CheckCircle size={12} /> Conforme
    </span>
  );
}

function CountryCard({ country }: { country: CountryData }) {
  const [open, setOpen] = useState(false);
  const status = getPensionStatus(country);

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${status === "critical" ? "border-red-300 bg-red-50/30" : status === "warning" ? "border-amber-300 bg-amber-50/30" : "border-gray-200 bg-white"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{country.flag}</span>
          <div className="text-left">
            <div className="font-bold text-gray-900">{country.name}</div>
            <div className="text-sm text-gray-500">
              {country.employees} salarié{country.employees > 1 ? "s" : ""} · {country.currency}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={status} />
          {open ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </div>
      </button>

      {open && (
        <div className="border-t p-4 space-y-6">
          {/* PENSION */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-lg text-[#0056b3] mb-3">
              <Landmark size={18} /> Retraite
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              <InfoRow label="Âge légal de départ" value={country.pension.legalRetirementAge} />
              <InfoRow label="Retraite anticipée" value={country.pension.earlyRetirementAge} />
              <InfoRow label="Cotisation salarié" value={country.pension.contributionRateEmployee} />
              <InfoRow label="Cotisation employeur" value={country.pension.contributionRateEmployer} />
              <InfoRow label="Base de calcul" value={country.pension.calculationBasis} className="md:col-span-2" />
            </div>

            <div className="mt-3 space-y-2">
              <PillarBlock title="Pilier 1 — Régime légal obligatoire" content={country.pension.pillar1} color="blue" />
              <PillarBlock
                title={`Pilier 2 — Retraite d'entreprise ${country.pension.pillar2Mandatory ? "(OBLIGATOIRE)" : "(facultatif)"}`}
                content={country.pension.pillar2}
                color={country.pension.pillar2Mandatory ? "red" : "amber"}
              />
              <PillarBlock title="Pilier 3 — Épargne individuelle" content={country.pension.pillar3} color="gray" />
            </div>

            <InfoRow label="Pension minimum" value={country.pension.minimumPension} className="mt-3" />

            {country.pension.keyRisks.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 font-bold text-red-700 mb-2">
                  <AlertTriangle size={16} /> Risques identifiés
                </div>
                <ul className="space-y-1">
                  {country.pension.keyRisks.map((r, i) => (
                    <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                      <span className="mt-0.5">•</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {country.pension.notes && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                <Info size={14} className="inline mr-1" /> {country.pension.notes}
              </div>
            )}
          </div>

          {/* SALARY */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-lg text-[#0056b3] mb-3">
              <Banknote size={18} /> Grilles salariales
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              <InfoRow label="Salaire minimum" value={country.salary.minimumWage} />
              <InfoRow label="Mensuel brut min." value={country.salary.minimumWageMonthly} />
              <InfoRow label="Salaire moyen national" value={country.salary.averageSalary} />
              <InfoRow label="Charges patronales totales" value={country.salary.employerSocialCharges} />
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[#1e2d3d] text-white">
                    <th className="px-3 py-2 text-left font-semibold">Profil type</th>
                    <th className="px-3 py-2 text-left font-semibold">Fourchette brut annuel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-3 py-2 font-medium text-gray-700">Commercial terrain</td>
                    <td className="px-3 py-2 text-gray-900">{country.salary.typicalSalesRep}</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-700">Directeur commercial</td>
                    <td className="px-3 py-2 text-gray-900">{country.salary.typicalSalesManager}</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-gray-700">Administratif / Support</td>
                    <td className="px-3 py-2 text-gray-900">{country.salary.typicalOfficeAdmin}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <InfoRow label="Pratique bonus / primes" value={country.salary.bonusPractice} className="mt-3" />

            {country.salary.notes && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                <AlertTriangle size={14} className="inline mr-1" /> {country.salary.notes}
              </div>
            )}
          </div>

          {/* SOURCES */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-sm text-gray-500 mb-2">
              <FileText size={14} /> Sources officielles
            </h4>
            <ul className="text-xs text-gray-500 space-y-0.5">
              {[...country.pension.sources, ...country.salary.sources].map((src, i) => (
                <li key={i}>📄 {src}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-lg p-2.5 ${className}`}>
      <div className="text-xs font-semibold text-gray-500 mb-0.5">{label}</div>
      <div className="text-sm text-gray-900">{value}</div>
    </div>
  );
}

function PillarBlock({ title, content, color }: { title: string; content: string; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    red: "bg-red-50 border-red-300 text-red-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
    gray: "bg-gray-50 border-gray-200 text-gray-800",
  };
  return (
    <div className={`border rounded-lg p-3 ${colors[color] || colors.gray}`}>
      <div className="font-semibold text-sm mb-1">{title}</div>
      <div className="text-sm">{content}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ACTION PLAN
   ═══════════════════════════════════════════════════════════════ */

const ACTION_PLAN = [
  {
    priority: "Immédiat",
    color: "red",
    actions: [
      {
        title: "Vérifier la conformité PPK en Pologne",
        detail: "Le PPK est obligatoire depuis 2019. Confirmer que TiMOTION PL a mis en place le dispositif avec un opérateur agréé. Sanctions en cas de manquement.",
        countries: ["🇵🇱"],
      },
      {
        title: "Vérifier l'auto-enrolment au Royaume-Uni",
        detail: "L'auto-enrolment est obligatoire. Confirmer que les 3 salariés UK sont inscrits avec contribution employeur ≥3%. Contrôler via The Pensions Regulator.",
        countries: ["🇬🇧"],
      },
      {
        title: "Répondre aux demandes pension en Allemagne et Pays-Bas",
        detail: "Des salariés ont déjà demandé un pension plan. En Allemagne, le droit à l'Entgeltumwandlung est légal (§1a BetrAVG). Aux Pays-Bas, ne pas avoir de pension professionnelle est une anomalie.",
        countries: ["🇩🇪", "🇳🇱"],
      },
    ],
  },
  {
    priority: "Sous 30 jours",
    color: "amber",
    actions: [
      {
        title: "Identifier les conventions collectives applicables",
        detail: "Italie : déterminer le CCNL applicable (Commercio, Metalmeccanici). France : vérifier la CCN (Métallurgie 3248 ou Commerce de gros). Pays-Bas : vérifier si un fonds de pension sectoriel s'applique.",
        countries: ["🇮🇹", "🇫🇷", "🇳🇱"],
      },
      {
        title: "Auditer le versement du TFR en Italie",
        detail: "Le TFR (~6,91% du salaire/an) est un droit du salarié. Vérifier qu'il est correctement provisionné pour les 8 salariés italiens et que le choix d'affectation a été documenté.",
        countries: ["🇮🇹"],
      },
      {
        title: "Mettre en place une pension professionnelle au Danemark",
        detail: "Même avec 1 salarié, ne pas proposer de pension est socialement inacceptable au Danemark. Standard : 12-17% du salaire en cotisation totale.",
        countries: ["🇩🇰"],
      },
      {
        title: "Vérifier les obligations salariales spécifiques",
        detail: "Pays-Bas : vakantiegeld 8% obligatoire. Espagne : 14 pagas. Italie : tredicesima + quattordicesima. Belgique : pécule de vacances double.",
        countries: ["🇳🇱", "🇪🇸", "🇮🇹", "🇧🇪"],
      },
    ],
  },
  {
    priority: "Recommandé",
    color: "blue",
    actions: [
      {
        title: "Construire un régime de retraite harmonisé européen",
        detail: "Explorer la faisabilité d'un pooling via un assureur international (Allianz, AXA) pour proposer des conditions uniformes à travers l'Europe, tout en respectant les obligations locales.",
        countries: ["🌍"],
      },
      {
        title: "Benchmark salarial détaillé par poste",
        detail: "À partir des données TiMOTION (Excel Clément), confronter les rémunérations réelles avec les fourchettes marché identifiées. Identifier les écarts pays par pays.",
        countries: ["🌍"],
      },
      {
        title: "Évaluer la situation en Russie",
        detail: "1 salarié avec risque géopolitique (sanctions, transferts). Évaluer la pertinence du maintien et les contraintes administratives.",
        countries: ["🇷🇺"],
      },
      {
        title: "Documenter pour la direction taiwanaise",
        detail: "Préparer des fiches synthétiques par pays en anglais, adaptées à la culture taïwanaise, avec des comparaisons visuelles et des recommandations de coût.",
        countries: ["🇹🇼"],
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function Home() {
  const [activeSection, setActiveSection] = useState("constat");
  const [activeTab, setActiveTab] = useState<"pension" | "salary">("pension");

  const sections = [
    { id: "constat", label: "Constat", icon: Target },
    { id: "diagnostic", label: "Diagnostic", icon: Globe },
    { id: "risques", label: "Risques", icon: Shield },
    { id: "plan", label: "Plan d'action", icon: TrendingUp },
    { id: "synthese", label: "Synthèse", icon: FileText },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  const totalEmployees = COUNTRIES.reduce((sum, c) => sum + c.employees, 0);

  return (
    <div className="min-h-screen">
      {/* ═══ HEADER ═══ */}
      <header className="bg-gradient-to-r from-[#0056b3] to-[#1e2d3d] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-blue-200 mb-1">DAIRIA Avocats × Exiliance</div>
              <h1 className="text-2xl md:text-3xl font-bold">TiMOTION Europe</h1>
              <p className="text-blue-200 mt-1">Diagnostic Social International — Retraite & Grilles Salariales</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">{COUNTRIES.length}</div>
                <div className="text-blue-200">pays</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{fmt(totalEmployees)}</div>
                <div className="text-blue-200">salariés</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{alerts.critical}</div>
                <div className="text-red-300">alertes</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ NAV ═══ */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 no-print">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex gap-1 overflow-x-auto py-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSection === s.id
                    ? "bg-[#0056b3] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <s.icon size={14} />
                {s.label}
              </a>
            ))}
          </div>
          <button
            onClick={exportDiagnostic}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
          >
            <Download size={14} />
            Exporter Excel
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* ═══ SECTION: CONSTAT ═══ */}
        <section id="constat">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target size={20} className="text-[#0056b3]" /> Constat
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-red-700 font-bold mb-2">
                <XCircle size={18} /> {alerts.critical} pays — Action requise
              </div>
              <p className="text-sm text-red-600">
                Obligations légales non vérifiées ou manquantes : dispositifs de retraite obligatoires (PPK Pologne, auto-enrolment UK), demandes salariés en attente (Allemagne, Pays-Bas).
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-700 font-bold mb-2">
                <AlertTriangle size={18} /> {alerts.warning} pays — À vérifier
              </div>
              <p className="text-sm text-amber-600">
                Points d&apos;attention identifiés : conventions collectives à confirmer, obligations salariales spécifiques (13ème/14ème mois, vakantiegeld, TFR).
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                <CheckCircle size={18} /> {alerts.ok} pays — Conforme
              </div>
              <p className="text-sm text-green-600">
                Pas de risque majeur identifié. Système de retraite légal opérationnel sans obligation complémentaire employeur manquante.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Building2 size={16} /> Contexte TiMOTION
            </h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>TiMOTION Technology Co. Ltd.</strong> est un fabricant taïwanais de vérins électriques et systèmes de contrôle de mouvement, servant les secteurs médical, mobilier, ergonomie et industrie (OEM exclusivement).
              </p>
              <p>
                La filiale européenne (~{fmt(totalEmployees)} salariés) assure la <strong>distribution commerciale</strong> dans {COUNTRIES.length} pays.
                L&apos;activité en Europe est principalement commerciale (vente, support technique, administration) — pas de production.
              </p>
              <p>
                <strong>Enjeu :</strong> Clément Ferretti (DRH Europe) doit harmoniser la vision sociale à travers {COUNTRIES.length} juridictions,
                documenter pour la direction à Taïwan, et répondre aux demandes urgentes de pension plan (Allemagne, Pays-Bas).
              </p>
            </div>
          </div>
        </section>

        {/* ═══ SECTION: DIAGNOSTIC ═══ */}
        <section id="diagnostic">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe size={20} className="text-[#0056b3]" /> Diagnostic par pays
          </h2>

          {/* Toggle pension / salary */}
          <div className="flex gap-2 mb-4 no-print">
            <button
              onClick={() => setActiveTab("pension")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === "pension"
                  ? "bg-[#0056b3] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Landmark size={14} /> Retraite
            </button>
            <button
              onClick={() => setActiveTab("salary")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === "salary"
                  ? "bg-[#0056b3] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Banknote size={14} /> Grilles salariales
            </button>
          </div>

          {/* Comparative table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto mb-6">
            {activeTab === "pension" ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1e2d3d] text-white">
                    <th className="px-3 py-3 text-left font-semibold">Pays</th>
                    <th className="px-3 py-3 text-left font-semibold">Eff.</th>
                    <th className="px-3 py-3 text-left font-semibold">Âge légal</th>
                    <th className="px-3 py-3 text-left font-semibold">Cotis. employeur</th>
                    <th className="px-3 py-3 text-left font-semibold">Pilier 2</th>
                    <th className="px-3 py-3 text-center font-semibold">Obligatoire ?</th>
                    <th className="px-3 py-3 text-center font-semibold">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {COUNTRIES.map((c, i) => {
                    const status = getPensionStatus(c);
                    return (
                      <tr key={c.id} className={`border-b border-gray-100 ${i % 2 === 1 ? "bg-gray-50/50" : ""}`}>
                        <td className="px-3 py-2.5 font-medium">
                          <span className="mr-1.5">{c.flag}</span> {c.name}
                        </td>
                        <td className="px-3 py-2.5 text-gray-600">{c.employees}</td>
                        <td className="px-3 py-2.5 text-gray-700 max-w-[200px] truncate" title={c.pension.legalRetirementAge}>
                          {c.pension.legalRetirementAge.split("(")[0].trim()}
                        </td>
                        <td className="px-3 py-2.5 text-gray-700 max-w-[180px] truncate" title={c.pension.contributionRateEmployer}>
                          {c.pension.contributionRateEmployer.split("(")[0].trim()}
                        </td>
                        <td className="px-3 py-2.5 text-gray-700 max-w-[250px]">
                          <div className="truncate" title={c.pension.pillar2}>
                            {c.pension.pillar2.split("—")[0].split("–")[0].trim().substring(0, 60)}...
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {c.pension.pillar2Mandatory ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">OUI</span>
                          ) : (
                            <span className="text-gray-400 text-xs">Non</span>
                          )}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          <StatusBadge status={status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1e2d3d] text-white">
                    <th className="px-3 py-3 text-left font-semibold">Pays</th>
                    <th className="px-3 py-3 text-left font-semibold">Eff.</th>
                    <th className="px-3 py-3 text-left font-semibold">Salaire min. mensuel</th>
                    <th className="px-3 py-3 text-left font-semibold">Salaire moyen</th>
                    <th className="px-3 py-3 text-left font-semibold">Charges patron.</th>
                    <th className="px-3 py-3 text-left font-semibold">Commercial terrain</th>
                    <th className="px-3 py-3 text-left font-semibold">Dir. commercial</th>
                  </tr>
                </thead>
                <tbody>
                  {COUNTRIES.map((c, i) => (
                    <tr key={c.id} className={`border-b border-gray-100 ${i % 2 === 1 ? "bg-gray-50/50" : ""}`}>
                      <td className="px-3 py-2.5 font-medium">
                        <span className="mr-1.5">{c.flag}</span> {c.name}
                      </td>
                      <td className="px-3 py-2.5 text-gray-600">{c.employees}</td>
                      <td className="px-3 py-2.5 text-gray-700">{c.salary.minimumWageMonthly}</td>
                      <td className="px-3 py-2.5 text-gray-700">{c.salary.averageSalary}</td>
                      <td className="px-3 py-2.5 text-gray-700 max-w-[180px] truncate" title={c.salary.employerSocialCharges}>
                        {c.salary.employerSocialCharges.split("(")[0].trim()}
                      </td>
                      <td className="px-3 py-2.5 text-gray-700">{c.salary.typicalSalesRep}</td>
                      <td className="px-3 py-2.5 text-gray-700">{c.salary.typicalSalesManager}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Detailed cards per country */}
          <h3 className="font-bold text-gray-900 mb-3">Détail par pays</h3>
          <div className="space-y-3">
            {COUNTRIES.map((c) => (
              <CountryCard key={c.id} country={c} />
            ))}
          </div>
        </section>

        {/* ═══ SECTION: RISQUES ═══ */}
        <section id="risques">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield size={20} className="text-red-600" /> Cartographie des risques
          </h2>

          <div className="space-y-4">
            {/* Risk by type */}
            <div className="bg-white border border-red-200 rounded-xl p-5">
              <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                <AlertTriangle size={16} /> Risque de non-conformité retraite
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Certains pays imposent des dispositifs de retraite d&apos;entreprise obligatoires. Le non-respect expose à des sanctions financières et des litiges avec les salariés.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {COUNTRIES.filter((c) => c.pension.keyRisks.length > 0).map((c) => (
                  <div key={c.id} className="bg-red-50 border border-red-100 rounded-lg p-3">
                    <div className="font-semibold text-red-800 mb-1">{c.flag} {c.name} ({c.employees} sal.)</div>
                    <ul className="text-xs text-red-700 space-y-1">
                      {c.pension.keyRisks.map((r, i) => (
                        <li key={i}>• {r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-amber-200 rounded-xl p-5">
              <h3 className="font-bold text-amber-700 mb-3 flex items-center gap-2">
                <Banknote size={16} /> Risque salarial — Obligations spécifiques
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Plusieurs pays ont des obligations salariales au-delà du salaire de base : 13ème/14ème mois, prime de vacances, TFR. Le non-versement expose à des rappels de salaire.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-amber-100 rounded-lg">
                  <thead>
                    <tr className="bg-amber-100 text-amber-900">
                      <th className="px-3 py-2 text-left font-semibold">Pays</th>
                      <th className="px-3 py-2 text-left font-semibold">Obligation</th>
                      <th className="px-3 py-2 text-left font-semibold">Détail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-amber-50">
                      <td className="px-3 py-2 font-medium">🇳🇱 Pays-Bas</td>
                      <td className="px-3 py-2 font-semibold text-red-700">Vakantiegeld OBLIGATOIRE</td>
                      <td className="px-3 py-2">8% du salaire brut annuel, versé en mai</td>
                    </tr>
                    <tr className="border-b border-amber-50 bg-amber-50/30">
                      <td className="px-3 py-2 font-medium">🇪🇸 Espagne</td>
                      <td className="px-3 py-2 font-semibold text-red-700">14 pagas (standard)</td>
                      <td className="px-3 py-2">2 mensualités extra (juin + décembre) — quasi-universel</td>
                    </tr>
                    <tr className="border-b border-amber-50">
                      <td className="px-3 py-2 font-medium">🇮🇹 Italie</td>
                      <td className="px-3 py-2 font-semibold text-red-700">Tredicesima + Quattordicesima + TFR</td>
                      <td className="px-3 py-2">13ème + 14ème mois (CCNL) + TFR 6,91%/an provisionné</td>
                    </tr>
                    <tr className="border-b border-amber-50 bg-amber-50/30">
                      <td className="px-3 py-2 font-medium">🇧🇪 Belgique</td>
                      <td className="px-3 py-2 font-semibold text-amber-700">Pécule de vacances double</td>
                      <td className="px-3 py-2">~92% du salaire mensuel brut, versé avant congés</td>
                    </tr>
                    <tr className="border-b border-amber-50">
                      <td className="px-3 py-2 font-medium">🇩🇰 Danemark</td>
                      <td className="px-3 py-2 font-semibold text-amber-700">Feriepenge OBLIGATOIRE</td>
                      <td className="px-3 py-2">12,5% du salaire, provisionné via FerieKonto</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">🇫🇷 France</td>
                      <td className="px-3 py-2 font-semibold text-amber-700">Selon CCN</td>
                      <td className="px-3 py-2">13ème mois si convention collective le prévoit. Intéressement/participation selon seuils.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Globe size={16} /> Risque géopolitique
              </h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="font-semibold text-red-800 mb-1">🇷🇺 Russie — 1 salarié</div>
                <p className="text-sm text-red-700">
                  Sanctions internationales : restrictions possibles sur les transferts financiers, les assurances, et la gestion RH transfrontalière.
                  Volatilité du rouble. Complexité administrative (трудовая книжка). Évaluer la pertinence du maintien de ce poste.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION: PLAN D'ACTION ═══ */}
        <section id="plan">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#0056b3]" /> Plan d&apos;action
          </h2>

          <div className="space-y-6">
            {ACTION_PLAN.map((group) => (
              <div key={group.priority}>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className={group.color === "red" ? "text-red-600" : group.color === "amber" ? "text-amber-600" : "text-blue-600"} />
                  <h3 className={`font-bold ${group.color === "red" ? "text-red-700" : group.color === "amber" ? "text-amber-700" : "text-blue-700"}`}>
                    {group.priority}
                  </h3>
                </div>
                <div className="space-y-3">
                  {group.actions.map((action, i) => (
                    <div
                      key={i}
                      className={`border rounded-xl p-4 ${
                        group.color === "red"
                          ? "border-red-200 bg-red-50/50"
                          : group.color === "amber"
                          ? "border-amber-200 bg-amber-50/50"
                          : "border-blue-200 bg-blue-50/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">
                            {i + 1}. {action.title}
                          </div>
                          <p className="text-sm text-gray-700">{action.detail}</p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          {action.countries.map((flag, fi) => (
                            <span key={fi} className="text-lg">{flag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SECTION: SYNTHÈSE ═══ */}
        <section id="synthese">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={20} className="text-[#0056b3]" /> Synthèse comparative
          </h2>

          <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0056b3] text-white">
                  <th className="px-3 py-3 text-left font-semibold">Pays</th>
                  <th className="px-3 py-3 text-center font-semibold">Eff.</th>
                  <th className="px-3 py-3 text-center font-semibold">Âge retraite</th>
                  <th className="px-3 py-3 text-center font-semibold">Pilier 2 oblig.</th>
                  <th className="px-3 py-3 text-center font-semibold">Cotis. retraite totale</th>
                  <th className="px-3 py-3 text-center font-semibold">SMIC mensuel</th>
                  <th className="px-3 py-3 text-center font-semibold">Charges patron.</th>
                  <th className="px-3 py-3 text-center font-semibold">Statut</th>
                </tr>
              </thead>
              <tbody>
                {COUNTRIES.map((c, i) => {
                  const status = getPensionStatus(c);
                  return (
                    <tr key={c.id} className={`border-b border-gray-100 ${i % 2 === 1 ? "bg-gray-50/50" : ""}`}>
                      <td className="px-3 py-2.5 font-medium whitespace-nowrap">
                        {c.flag} {c.name}
                      </td>
                      <td className="px-3 py-2.5 text-center">{c.employees}</td>
                      <td className="px-3 py-2.5 text-center text-xs">{c.pension.legalRetirementAge.split("(")[0].trim()}</td>
                      <td className="px-3 py-2.5 text-center">
                        {c.pension.pillar2Mandatory ? (
                          <span className="font-bold text-red-700">OUI</span>
                        ) : (
                          <span className="text-gray-400">Non</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-center text-xs">
                        {c.pension.contributionRateEmployee.split("(")[0].trim()} + {c.pension.contributionRateEmployer.split("(")[0].trim()}
                      </td>
                      <td className="px-3 py-2.5 text-center text-xs">{c.salary.minimumWageMonthly}</td>
                      <td className="px-3 py-2.5 text-center text-xs">{c.salary.employerSocialCharges.split("(")[0].trim()}</td>
                      <td className="px-3 py-2.5 text-center"><StatusBadge status={status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ═══ SECTION: CONTACT ═══ */}
        <section id="contact">
          <div className="bg-gradient-to-r from-[#0056b3] to-[#1e2d3d] text-white rounded-xl p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold mb-2">DAIRIA Avocats × Exiliance</h2>
                <p className="text-blue-200 text-sm mb-4">
                  Ce diagnostic a été généré par l&apos;IA DAIRIA, vérifiée et enrichie par nos équipes.
                  Les données sont issues de sources officielles publiques (open data) de chaque pays.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    <a href="mailto:s.coly@dairia-avocats.com" className="hover:underline">s.coly@dairia-avocats.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    <a href="tel:+33672422486" className="hover:underline">06 72 42 24 86</a>
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <button
                  onClick={exportDiagnostic}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#0056b3] rounded-xl font-bold hover:bg-blue-50 transition-colors"
                >
                  <Download size={16} />
                  Exporter le diagnostic
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#1e2d3d] text-gray-400 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} DAIRIA Avocats × Exiliance — Diagnostic Social International TiMOTION Europe</p>
          <p className="mt-1 text-xs">
            Les informations contenues dans ce document sont à caractère informatif. Elles ne constituent pas un avis juridique.
            Pour toute décision, consultez un professionnel qualifié dans la juridiction concernée.
          </p>
        </div>
      </footer>
    </div>
  );
}
