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
      case "customer.subscription.deleted":
        await handleSubscriptionUpdate(
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
  const customerId = subscription.customer as string;

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

  const status = statusMapping[subscription.status] || "incomplete";

  const updateData: SubscriptionUpdate = {
    "subscription.status": status,
    "subscription.endDate": subscription.ended_at
      ? Timestamp.fromDate(new Date(subscription.ended_at * 1000))
      : null,
    updatedAt: Timestamp.now(),
  };

  await updateDoc(userRef, updateData);
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
  const customerId = invoice.customer as string;
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
    updatedAt: Timestamp.now(),
  };

  await updateDoc(userRef, updateData);
}

async function handlePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  const customerId = invoice.customer as string;
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
