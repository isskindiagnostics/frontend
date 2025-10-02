import SuccessClient from "./SuccessClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro Concluído - Sua conta está pronta!",
  description:
    "Parabéns! Seu cadastro foi concluído com sucesso. Agora você pode começar a usar a plataforma e realizar análises de lesões.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CompletePage() {
  return <SuccessClient />;
}
