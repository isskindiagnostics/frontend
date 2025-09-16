import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const SUBSCRIPTION_PLANS = {
  free: {
    id: "free",
    name: "Grátis",
    description: "Ideal para explorar e entender a nossa plataforma.",
    price: 0,
    analysisLimit: 5,
    pdfLimit: 5,
    features: [
      "5 análises totais",
      "5 relatórios de análise totais",
      "Suporte básico via FAQs",
      "Acesso básico às funcionalidades",
    ],
  },
  premium: {
    id: "premium",
    name: "Premium",
    description:
      "Apoio completo para um atendimento médico moderno e eficiente.",
    price: 4999, // in cents
    stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID!,
    analysisLimit: 20,
    pdfLimit: 20,
    features: [
      "20 análises mensais",
      "20 relatórios de análise mensais",
      "Suporte prioritário",
      "Personalização do relatório",
      "Acesso a funcionalidades avançadas",
      "Atualizações e melhorias contínuas incluídas",
    ],
  },
};

export const SUBSCRIPTION_PLANS_SHORT = {
  flex: {
    id: "flex",
    name: "Flex",
    description: "Ideal para quem faz análises exporadicamente.",
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
