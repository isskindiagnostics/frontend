import { PaymentMethod } from "@stripe/stripe-js";
import { Timestamp } from "firebase/firestore";

export type CancelSubscriptionRequest = {
  subscriptionId: string;
};

export type CancelSubscriptionResponse = {
  success: boolean;
  endDate: string;
};

export type ReactivateSubscriptionRequest = {
  subscriptionId: string;
};

export type ReactivateSubscriptionResponse = {
  success: boolean;
};

export type SubscriptionUpdate = {
  "subscription.plan"?: "free" | "premium";
  "subscription.status"?:
    | "active"
    | "trialing"
    | "canceled"
    | "past_due"
    | "incomplete";
  "subscription.startDate"?: Timestamp;
  "subscription.endDate"?: Timestamp | null; // Allow null to remove end date
  "subscription.usage.analysisCount"?: number;
  "subscription.usage.analysisLimit"?: number;
  "subscription.usage.pdfCount"?: number;
  "subscription.usage.pdfLimit"?: number;
  "subscription.stripeData.customerId"?: string;
  "subscription.stripeData.subscriptionId"?: string;
  "subscription.stripeData.defaultPaymentMethodId"?: string;
  "subscription.stripeData.billingCycleAnchor"?: Timestamp;
  "subscription.stripeData.savedCards"?: PaymentMethod[];
  updatedAt: Timestamp;
};
