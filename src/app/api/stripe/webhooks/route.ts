import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/firebase/config";
import {
  SubscriptionUpdate,
  APIError,
  getFirebaseUid,
  isDeletedCustomer,
} from "@/types/stripeApi";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(
  req: NextRequest
): Promise<NextResponse<{ received: boolean } | APIError>> {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "customer.subscription.updated":
        await handleSubscriptionUpdate(
          event.data.object as Stripe.Subscription
        );
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription
        );
        break;

      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleSubscriptionUpdate(
  subscription: Stripe.Subscription
): Promise<void> {
  // Get customer ID (handle both string and object cases)
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  // Find user by customer ID
  const customer = await stripe.customers.retrieve(customerId);

  // Type guard to ensure we have a customer object (not deleted)
  if (isDeletedCustomer(customer)) {
    console.warn(`Customer ${customerId} is deleted`);
    return;
  }

  const firebaseUid = getFirebaseUid(customer);

  if (!firebaseUid) {
    console.warn(`No firebaseUid found for customer ${customerId}`);
    return;
  }

  // Retrieve full subscription details to ensure we have all fields
  const fullSubscription = await stripe.subscriptions.retrieve(subscription.id);

  // Type assertion for the subscription
  const typedSubscription = fullSubscription as unknown as {
    id: string;
    status: Stripe.Subscription.Status;
    customer: string | { id: string };
    current_period_end?: number;
    ended_at?: number;
    cancel_at_period_end?: boolean;
  };

  const userRef = doc(db, "users", firebaseUid);

  const statusMapping: Record<
    Stripe.Subscription.Status,
    SubscriptionUpdate["subscription.status"]
  > = {
    active: "active",
    trialing: "trialing",
    canceled: "canceled",
    unpaid: "canceled",
    past_due: "past_due",
    incomplete: "incomplete",
    incomplete_expired: "incomplete",
    paused: "canceled", // Map paused to canceled for simplicity
  };

  const status = statusMapping[typedSubscription.status] || "incomplete";

  const updateData: SubscriptionUpdate = {
    "subscription.status": status,
    updatedAt: Timestamp.now(),
  };

  // Handle different cancellation scenarios
  if (
    typedSubscription.cancel_at_period_end &&
    typedSubscription.current_period_end
  ) {
    // Subscription is marked to cancel at period end - user still has access
    updateData["subscription.status"] = "canceled";
    updateData["subscription.endDate"] = new Timestamp(
      typedSubscription.current_period_end,
      0
    );
  } else if (typedSubscription.ended_at) {
    // Subscription has already ended
    updateData["subscription.endDate"] = new Timestamp(
      typedSubscription.ended_at,
      0
    );
  } else if (status === "active") {
    // Active subscription - remove end date if it was previously set
    updateData["subscription.endDate"] = null;
  }

  await updateDoc(userRef, updateData);
}

async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
): Promise<void> {
  // Get customer ID (handle both string and object cases)
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const customer = await stripe.customers.retrieve(customerId);

  if (isDeletedCustomer(customer)) {
    console.warn(`Customer ${customerId} is deleted`);
    return;
  }

  const firebaseUid = getFirebaseUid(customer);

  if (!firebaseUid) {
    console.warn(`No firebaseUid found for customer ${customerId}`);
    return;
  }

  const userRef = doc(db, "users", firebaseUid);

  // When subscription is deleted, downgrade to free plan
  const updateData: SubscriptionUpdate = {
    "subscription.plan": "free",
    "subscription.status": "canceled",
    "subscription.endDate": subscription.ended_at
      ? new Timestamp(subscription.ended_at, 0)
      : Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  await updateDoc(userRef, updateData);
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
  // Get customer ID (handle both string and object cases)
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer?.id;

  if (!customerId) {
    console.warn("No customer ID found in invoice");
    return;
  }

  const customer = await stripe.customers.retrieve(customerId);

  if (isDeletedCustomer(customer)) {
    console.warn(`Customer ${customerId} is deleted`);
    return;
  }

  const firebaseUid = getFirebaseUid(customer);

  if (!firebaseUid) {
    console.warn(`No firebaseUid found for customer ${customerId}`);
    return;
  }

  const userRef = doc(db, "users", firebaseUid);

  const updateData: SubscriptionUpdate = {
    "subscription.status": "active",
    "subscription.endDate": null, // Remove end date on successful payment
    updatedAt: Timestamp.now(),
  };

  await updateDoc(userRef, updateData);
}

async function handlePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  // Get customer ID (handle both string and object cases)
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer?.id;

  if (!customerId) {
    console.warn("No customer ID found in invoice");
    return;
  }

  const customer = await stripe.customers.retrieve(customerId);

  if (isDeletedCustomer(customer)) {
    console.warn(`Customer ${customerId} is deleted`);
    return;
  }

  const firebaseUid = getFirebaseUid(customer);

  if (!firebaseUid) {
    console.warn(`No firebaseUid found for customer ${customerId}`);
    return;
  }

  const userRef = doc(db, "users", firebaseUid);

  const updateData: SubscriptionUpdate = {
    "subscription.status": "past_due",
    updatedAt: Timestamp.now(),
  };

  await updateDoc(userRef, updateData);
}
