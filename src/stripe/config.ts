import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const SUBSCRIPTION_PLANS = {
  flex: {
    id: "flex",
    name: "Flex",
    description: "Ideal para quem faz análises esporadicamente.",
    price: 899,
    analysisLimit: -1,
    pdfLimit: -1,
    features: [
      "Análises de acordo com demanda",
      "Relatórios de análise ilimitados",
      "Suporte básico via FAQs",
      "Personalização do relatório",
    ],
  },
  premium: {
    id: "premium",
    name: "Premium",
    description:
      "Apoio completo para um atendimento médico moderno e eficiente.",
    price: 3999,
    stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID!,
    analysisLimit: 10,
    pdfLimit: -1,
    features: [
      "10 análises por mês",
      "Relatórios de análise ilimitados",
      "Suporte prioritário",
      "Personalização do relatório",
      "7 dias de teste grátis",
    ],
  },
  free: {
    id: "free",
    name: "Sem Plano Ativo",
    description: "Nenhum plano ativo no momento.",
    price: 0,
    analysisLimit: 0,
    pdfLimit: 0,
    features: ["Escolha um plano para começar a usar"],
  },
};

export const SUBSCRIPTION_PLANS_SHORT = {
  flex: {
    id: "flex",
    name: "Flex",
    description: "Ideal para quem faz análises esporadicamente.",
    price: 899,
    analysisLimit: 1,
    pdfLimit: 1,
    features: [
      "Análises de acordo com demanda",
      "Relatórios de análise ilimitados",
      "Suporte básico via FAQs",
      "Personalização do relatório",
    ],
  },
  premium: {
    id: "premium",
    name: "Premium",
    description:
      "Apoio completo para um atendimento médico moderno e eficiente.",
    price: 4999, // in cents
    stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID!,
    analysisLimit: 10,
    pdfLimit: 10,
    features: [
      "10 análises por mês",
      "Relatórios de análise ilimitados",
      "Suporte prioritário",
      "Personalização do relatório",
      "7 dias grátis",
    ],
  },
} as const;

export type PlanType = keyof typeof SUBSCRIPTION_PLANS;
