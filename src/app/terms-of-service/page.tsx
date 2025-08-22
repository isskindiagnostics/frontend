import Navigation from "@/components/Navigation";

import { TOPICS, TERMS_SECTIONS } from "./content";
import { pageContent, contentWrapper, main } from "./index.css";
import TermsHeader from "./TermsHeader";
import TermsSection from "./TermsSection";
import TopicNavigation from "./TopicNavigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Serviço | Isskin",
  description:
    "Conheça nossos planos de assinatura! Tenha acesso a relatórios detalhados, suporte dedicado e tecnologia avançada para diagnósticos rápidos e precisos.",
  robots: "index, follow",
  openGraph: {
    title: "Termos de Serviço | Isskin",
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
    title: "Termos de Serviço | Isskin",
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

export default function TermsOfService() {
  return (
    <main className={main} style={{ backgroundColor: "white" }}>
      <Navigation />
      <div className={pageContent}>
        <div>
          <TopicNavigation topics={TOPICS} sections={TERMS_SECTIONS} />
        </div>
        <div>
          <div style={{ minHeight: 100, width: "100%" }}></div>
          <TermsHeader
            title="Termos de Serviço"
            lastUpdated="22 de agosto de 2025"
          />
          <div className={contentWrapper}>
            {TERMS_SECTIONS.map((section) => (
              <TermsSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
