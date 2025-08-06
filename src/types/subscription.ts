import { Timestamp } from "firebase/firestore";

export type Subscription = {
  plan: "free" | "premium";
  status: "active" | "trialing" | "canceled" | "past_due";
  startDate: Timestamp;
  endDate?: Timestamp | null;
  free?: FreeSubscription;
  premium?: PremiumSubscription;
};

export type FreeSubscription = {
  analysisCount: number;
  analysisLimit: number;
  pdfCount: number;
  pdfLimit: number;
};

export type PremiumSubscription = {
  customerId: string; // Stripe Customer ID
  subscriptionId: string; // Stripe Subscription ID
  defaultPaymentMethodId?: string; // Stripe Payment Method ID
  billingCycleAnchor?: string; // Data da próxima cobrança
  savedCards: {
    id: string; // Stripe paymentMethod.id
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    isDefault?: boolean; // optional flag for default card
  }[];
};
