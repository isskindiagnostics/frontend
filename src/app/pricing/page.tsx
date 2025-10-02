import Navigation from "@/components/Navigation";

import Cards from "./Cards";
import { main, pageContent, subline, textWrapper, title } from "./index.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planos e Preços | Isskin",
  description:
    "Conheça nossos planos de assinatura! Tenha acesso a relatórios detalhados, suporte dedicado e tecnologia avançada para diagnósticos rápidos e precisos.",
  robots: "index, follow",
  openGraph: {
    title: "Planos e Preços | Isskin",
    description:
      "Planos para médicos com análises ilimitadas, relatórios detalhados e suporte especializado. Comece grátis com 10 análises e faça upgrade quando precisar.",
    url: "https://https://isskindiagnostics.com/pricing",
    siteName: "Isskin Diagnostics",
    images: [
      {
        url: "https://https://isskindiagnostics.com/og-image.png",
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
    title: "Planos e Preços | Isskin",
    description:
      "Assinaturas para médicos: grátis com 10 análises, premium ilimitado e suporte dedicado. Comece hoje mesmo!",
    site: "@IsskinDiagnostics",
    creator: "@IsskinDiagnostics",
    images: ["https://https://isskindiagnostics.com/og-image.png"],
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

export default function Pricing() {
  return (
    <main className={main}>
      <Navigation />
      <div className={pageContent}>
        <div className={textWrapper}>
          <h1 className={title}>Escolha o plano ideal para você</h1>
          <p className={subline}>
            Analise seus casos com segurança e agilidade, sem complicação.
          </p>
        </div>
        <Cards />
      </div>
    </main>
  );
}
