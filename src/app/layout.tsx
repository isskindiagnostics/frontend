import Script from "next/script";
import "./global.css";
import "isskinui/css";
// import { AuthProvider } from "../../context/AuthContext";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnóstico de Câncer de Pele por Imagem",
  description:
    "Auxiliar médicos no diagnóstico de lesões benignas e malignas de pele a partir de fotos clínicas. Rápido, seguro e pensado para profissionais da saúde.",
  keywords: [
    "câncer de pele",
    "diagnóstico dermatológico",
    "dermatologia",
    "lesões de pele",
    "melanoma",
    "lesão benigna",
    "medicina",
    "saúde",
  ],
  openGraph: {
    title: "Diagnóstico de Câncer de Pele por Imagem",
    description:
      "Ferramenta desenvolvida para médicos realizarem diagnósticos precisos de lesões benignas e malignas com base em imagens clínicas.",
    url: "https://isskindiagnostics.com/",
    siteName: "Diagnóstico de Pele",
    images: [
      {
        url: "https://isskindiagnostics.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Logo da Isskin",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diagnóstico de Câncer de Pele por Imagem",
    description:
      "Ferramenta desenvolvida para médicos realizarem diagnósticos precisos de lesões benignas e malignas com base em imagens clínicas.",
    images: ["https://isskindiagnostics.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="apple-mobile-web-app-title" content="Isskin" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/icon0.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon1.png" type="image/png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-2JBCQ0EKST"
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2JBCQ0EKST');
            `,
          }}
        />
        {/* <AuthProvider> */}
        {children}
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
