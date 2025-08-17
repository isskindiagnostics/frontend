import { Timestamp } from "firebase/firestore";
import Stripe from "stripe";

export interface CreateCustomerRequest {
  userId: string;
  email: string;
  name?: string;
}

export interface CreateCustomerResponse {
  customerId: string;
}

export interface CreateSubscriptionRequest {
  customerId: string;
  paymentMethodId: string;
  userId: string;
}

export interface CreateSubscriptionResponse {
  subscriptionId: string;
  clientSecret?: string;
}

// Type guards for safe type checking
export const isExpandedCustomer = (
  customer: unknown
): customer is Stripe.Customer => {
  return (
    typeof customer === "object" &&
    customer !== null &&
    "metadata" in customer &&
    !("deleted" in customer)
  );
};

export const isExpandedSubscription = (
  subscription: unknown
): subscription is Stripe.Subscription => {
  return (
    typeof subscription === "object" &&
    subscription !== null &&
    "latest_invoice" in subscription &&
    "billing_cycle_anchor" in subscription
  );
};

export const isExpandedInvoice = (
  invoice: unknown
): invoice is Stripe.Invoice => {
  return (
    typeof invoice === "object" &&
    invoice !== null &&
    "payment_intent" in invoice &&
    "customer" in invoice
  );
};

// Helper functions for safe property access
export const getFirebaseUid = (
  customer: Stripe.Customer
): string | undefined => {
  return customer.metadata?.firebaseUid;
};

export const getPaymentIntentClientSecret = (
  subscription: Stripe.Subscription
): string | undefined => {
  const invoice = subscription.latest_invoice;

  // Check if latest_invoice is an expanded Invoice object
  if (
    typeof invoice === "object" &&
    invoice !== null &&
    "payment_intent" in invoice
  ) {
    const paymentIntent = invoice.payment_intent;

    // Check if payment_intent is an expanded PaymentIntent object
    if (
      typeof paymentIntent === "object" &&
      paymentIntent !== null &&
      "client_secret" in paymentIntent
    ) {
      const clientSecret = paymentIntent.client_secret;
      // Ensure client_secret is actually a string, not null or empty object
      return typeof clientSecret === "string" && clientSecret.length > 0
        ? clientSecret
        : undefined;
    }
  }
  return undefined;
};

// Helper function to safely get card details
export const getCardDetails = (paymentMethod: Stripe.PaymentMethod) => {
  const card = paymentMethod.card;
  if (!card) {
    throw new Error("Payment method does not have card details");
  }

  return {
    brand: card.brand,
    last4: card.last4,
    expMonth: card.exp_month,
    expYear: card.exp_year,
  };
};

// Helper function to check if customer is deleted
export const isDeletedCustomer = (
  customer: Stripe.Customer | Stripe.DeletedCustomer
): customer is Stripe.DeletedCustomer => {
  return "deleted" in customer && customer.deleted === true;
};

// Webhook Event Data Types
export type WebhookEventType =
  | "customer.subscription.updated"
  | "customer.subscription.deleted"
  | "invoice.payment_succeeded"
  | "invoice.payment_failed";

export interface WebhookEvent {
  type: WebhookEventType;
  data: {
    object: Stripe.Subscription | Stripe.Invoice;
  };
}

// Firebase Update Types - Compatible with Firestore updateDoc
export type SubscriptionUpdate = {
  "subscription.plan"?: "free" | "premium";
  "subscription.status"?:
    | "active"
    | "trialing"
    | "canceled"
    | "past_due"
    | "incomplete";
  "subscription.startDate"?: Timestamp;
  "subscription.endDate"?: Timestamp | null;
  "subscription.usage.analysisLimit"?: number;
  "subscription.usage.pdfLimit"?: number;
  "subscription.stripeData.subscriptionId"?: string;
  "subscription.stripeData.customerId"?: string;
  "subscription.stripeData.defaultPaymentMethodId"?: string;
  "subscription.stripeData.billingCycleAnchor"?: Timestamp;
  "subscription.stripeData.savedCards"?: Array<{
    id: string;
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    isDefault: boolean;
  }>;
  updatedAt?: Timestamp | Date;
};

// Helper function to create type-safe Firestore updates
export const createFirestoreUpdate = (
  data: SubscriptionUpdate
): Record<string, unknown> => {
  return data as Record<string, unknown>;
};

// Error Types
export interface APIError {
  error: string;
  details?: string;
}

export interface StripeError extends Error {
  type?: string;
  code?: string;
  statusCode?: number;
}
