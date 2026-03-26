import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TiMOTION Europe — Diagnostic Social International",
  description:
    "Analyse comparative retraite & grilles salariales dans 11 pays européens — DAIRIA Avocats × Exiliance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
