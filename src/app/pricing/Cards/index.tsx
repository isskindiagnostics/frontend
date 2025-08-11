"use client";

import { useRouter } from "next/navigation";

import PricingCard from "@/components/PricingCard";

import { cardsWrapper } from "../index.css";

const featureFree = [
  "5 análises totais",
  "5 relatórios de análise totais",
  "Suporte básico via FAQs",
  "Acesso básico às funcionalidades",
];

const featurePremium = [
  "Análises ilimitadas",
  "Relatórios de análise ilimitados",
  "Suporte prioritário",
  "Personalização do relatório",
  "Acesso a funcionalidades avançadas",
  "Atualizações e melhorias contínuas incluídas ",
];

export default function Cards() {
  const router = useRouter();
  return (
    <div className={cardsWrapper}>
      <PricingCard
        subscription="Grátis"
        price={0}
        description="Ideal para explorar e entender a nossa plataforma."
        features={featureFree}
        cta="comece de graça já"
        onButtonClick={() => router.push("/")}
      />
      <PricingCard
        subscription="Premium"
        price={49.99}
        description="Apoio completo para um atendimento médico moderno e eficiente."
        features={featurePremium}
        cta="em breve"
        variant="highlight"
        buttonDisabled={true}
      />
    </div>
  );
}
