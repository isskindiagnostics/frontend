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
    analysisLimit: -1, // Unlimited
    pdfLimit: -1, // Unlimited
    features: [
      "Análises ilimitadas",
      "Relatórios de análise ilimitados",
      "Suporte prioritário",
      "Personalização do relatório",
      "Acesso a funcionalidades avançadas",
      "Atualizações e melhorias contínuas incluídas",
    ],
  },
};

export const SUBSCRIPTION_PLANS_SHORT = {
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
    ],
  },
  premium: {
    id: "premium",
    name: "Premium",
    description:
      "Apoio completo para um atendimento médico moderno e eficiente.",
    price: 4999, // in cents
    stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID!,
    analysisLimit: -1, // Unlimited
    pdfLimit: -1, // Unlimited
    features: [
      "Análises ilimitadas",
      "Relatórios de análise ilimitados",
      "Suporte prioritário",
      "Personalização do relatório",
    ],
  },
} as const;

export type PlanType = keyof typeof SUBSCRIPTION_PLANS;
