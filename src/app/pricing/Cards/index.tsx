"use client";

import { useRouter } from "next/navigation";

import PricingCard from "@/components/PricingCard";

import { cardsWrapper } from "../index.css";
import { SUBSCRIPTION_PLANS } from "@/stripe/config";

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

  // SUBSCRIPTION_PLANS
  return (
    <div className={cardsWrapper}>
      <PricingCard
        subscription={SUBSCRIPTION_PLANS.free.name}
        price={SUBSCRIPTION_PLANS.free.price}
        description={SUBSCRIPTION_PLANS.free.description}
        features={SUBSCRIPTION_PLANS.free.features}
        // cta="comece de graça já"
        // onButtonClick={() => router.push("/")}
      />

      <PricingCard
        subscription={SUBSCRIPTION_PLANS.premium.name}
        price={SUBSCRIPTION_PLANS.premium.price}
        description={SUBSCRIPTION_PLANS.premium.description}
        features={SUBSCRIPTION_PLANS.premium.features}
        // cta="em breve"
        variant="highlight"
        // buttonDisabled={true}
      />
    </div>
  );
}
