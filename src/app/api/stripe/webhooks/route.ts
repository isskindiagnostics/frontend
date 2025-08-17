import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/firebase/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

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

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  // Find user by customer ID
  const customer = await stripe.customers.retrieve(customerId);
  const firebaseUid = (customer as any).metadata?.firebaseUid;

  if (!firebaseUid) return;

  const userRef = doc(db, "users", firebaseUid);

  let status: string;
  switch (subscription.status) {
    case "active":
      status = "active";
      break;
    case "trialing":
      status = "trialing";
      break;
    case "canceled":
    case "unpaid":
      status = "canceled";
      break;
    case "past_due":
      status = "past_due";
      break;
    default:
      status = "incomplete";
  }

  await updateDoc(userRef, {
    "subscription.status": status,
    "subscription.endDate": subscription.ended_at
      ? Timestamp.fromDate(new Date(subscription.ended_at * 1000))
      : null,
    updatedAt: Timestamp.now(),
  });
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const firebaseUid = (customer as any).metadata?.firebaseUid;

  if (!firebaseUid) return;

  const userRef = doc(db, "users", firebaseUid);

  await updateDoc(userRef, {
    "subscription.status": "active",
    updatedAt: Timestamp.now(),
  });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const firebaseUid = (customer as any).metadata?.firebaseUid;

  if (!firebaseUid) return;

  const userRef = doc(db, "users", firebaseUid);

  await updateDoc(userRef, {
    "subscription.status": "past_due",
    updatedAt: Timestamp.now(),
  });
}
