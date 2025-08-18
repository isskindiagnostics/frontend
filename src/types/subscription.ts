import { Timestamp } from "firebase/firestore";

export type Subscription = {
  plan: "free" | "premium";
  status: "active" | "trialing" | "canceled" | "past_due" | "incomplete";
  startDate: Timestamp | null;
  endDate?: Timestamp | null;
  usage?: SubscriptionUsage;
  stripeData?: PremiumSubscriptionData;
};

export type SubscriptionUsage = {
  analysisCount: number;
  analysisLimit: number;
  pdfCount: number;
  pdfLimit: number;
};

export type PremiumSubscriptionData = {
  customerId?: string;
  subscriptionId: string;
  defaultPaymentMethodId?: string;
  billingCycleAnchor: Timestamp;
  savedCards: PaymentMethod[];
};

export type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
};

