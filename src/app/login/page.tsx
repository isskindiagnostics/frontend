import SmallLogo from "@/assets/svgs/SmallLogo";
import Waves from "@/assets/svgs/Waves";

import * as styles from "./index.css";
import LoginForm from "./LoginForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Isskin",
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
    title: "Login | Isskin",
    description:
      "Ferramenta desenvolvida para médicos realizarem diagnósticos precisos de lesões benignas e malignas com base em imagens clínicas.",
    url: "https://isskindiagnostics.com/",
    siteName: "Isskin | Diganóstico de Câncer de Pele",
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
    title: "Isskin | Diganóstico de Câncer de Pele",
    description:
      "Ferramenta desenvolvida para médicos realizarem diagnósticos precisos de lesões benignas e malignas com base em imagens clínicas.",
    images: ["https://isskindiagnostics.com/og-image.png"],
  },
};

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.graphicWrapper}>
        <div className={styles.imgWrapper}>
          <Waves className={styles.svg} />
        </div>
        <div className={styles.graphicContentWrapper}>
          <SmallLogo />
          <h2 className={styles.headline}>Bem-Vindo de volta!</h2>
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.mainTextWrapper}>
          <h1 className={styles.headingMain}>Login</h1>
          <p>Por favor, entre com sua conta Isskin.</p>
        </div>
        <LoginForm />
      </main>
    </div>
  );
}
