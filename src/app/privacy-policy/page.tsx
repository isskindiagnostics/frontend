import Navigation from "@/components/Navigation";

import {
  contentWrapper,
  main,
  pageContent,
} from "../terms-of-service/index.css";
import TermsHeader from "../terms-of-service/TermsHeader";
import TermsSection from "../terms-of-service/TermsSection";
import TopicNavigation from "../terms-of-service/TopicNavigation";

import { POLICY_SECTIONS } from "./content";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Políticas de Privacidade | Isskin",
  description:
    "Conheça nossos planos de assinatura! Tenha acesso a relatórios detalhados, suporte dedicado e tecnologia avançada para diagnósticos rápidos e precisos.",
  robots: "index, follow",
  openGraph: {
    title: "Políticas de Privacidade | Isskin",
    description:
      "Planos para médicos com análises ilimitadas, relatórios detalhados e suporte especializado. Comece grátis com 10 análises e faça upgrade quando precisar.",
    url: "https://isskindiagnostics.com/pricing",
    siteName: "Isskin Diagnostics",
    images: [
      {
        url: "https://isskindiagnostics.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Isskin",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Políticas de Privacidade | Isskin",
    description:
      "Assinaturas para médicos: grátis com 10 análises, premium ilimitado e suporte dedicado. Comece hoje mesmo!",
    site: "@IsskinDiagnostics",
    creator: "@IsskinDiagnostics",
    images: ["https://isskindiagnostics.com/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  keywords: [
    "análise dermatológica",
    "isskin",
    "planos e preços",
    "análise câncer de pele",
    "relatórios dermatológicos",
    "diagnóstico rápido",
    "plano gratuito",
    "plano premium",
  ].join(", "),
};

export default function PrivacyPolicy() {
  return (
    <main className={main} style={{ backgroundColor: "white" }}>
      <Navigation />
      <div className={pageContent}>
        <div>
          <TopicNavigation sections={POLICY_SECTIONS} />
        </div>
        <div>
          <div style={{ minHeight: 100, width: "100%" }}></div>
          <TermsHeader
            title="Políticas de Privacidade"
            lastUpdated="22 de agosto de 2025"
          />
          <div className={contentWrapper}>
            {POLICY_SECTIONS.map((section) => (
              <TermsSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
