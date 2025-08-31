import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/firebase/config";
import { SubscriptionUpdate, APIError, StripeError } from "@/types/stripeApi";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

type CancelSubscriptionRequest = {
  subscriptionId: string;
};

type CancelSubscriptionResponse = {
  success: boolean;
  endDate: string;
};

export async function POST(
  req: NextRequest
): Promise<NextResponse<CancelSubscriptionResponse | APIError>> {
  try {
    const { subscriptionId }: CancelSubscriptionRequest = await req.json();

    if (!subscriptionId) {
      return NextResponse.json(
        { error: "Subscription ID é obrigatório" },
        { status: 400 }
      );
    }

    const currentSubscription =
      await stripe.subscriptions.retrieve(subscriptionId);

    const customerId =
      typeof currentSubscription.customer === "string"
        ? currentSubscription.customer
        : currentSubscription.customer.id;

    const customer = await stripe.customers.retrieve(customerId);

    if (!customer || customer.deleted) {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }

    const firebaseUid = customer.metadata.firebaseUid;

    if (!firebaseUid) {
      return NextResponse.json(
        { error: "UID do Firebase não encontrado" },
        { status: 400 }
      );
    }

    // Calculate the actual end date based on billing cycle
    // We need to expand the subscription items to get pricing info
    const subscriptionWithItems = await stripe.subscriptions.retrieve(
      subscriptionId,
      {
        expand: ["items.data.price"],
      }
    );

    // Get the billing interval from the first subscription item
    const firstItem = subscriptionWithItems.items.data[0];
    const price = firstItem.price as Stripe.Price;
    const interval = price.recurring?.interval || "month";
    const intervalCount = price.recurring?.interval_count || 1;

    // Calculate end date based on billing cycle anchor and interval
    const billingCycleAnchor = currentSubscription.billing_cycle_anchor;
    const anchorDate = new Date(billingCycleAnchor * 1000);

    // Calculate next billing date from anchor
    let endDate: Date;
    switch (interval) {
      case "day":
        endDate = new Date(
          anchorDate.getTime() + intervalCount * 24 * 60 * 60 * 1000
        );
        break;
      case "week":
        endDate = new Date(
          anchorDate.getTime() + intervalCount * 7 * 24 * 60 * 60 * 1000
        );
        break;
      case "month":
        endDate = new Date(anchorDate);
        endDate.setMonth(endDate.getMonth() + intervalCount);
        break;
      case "year":
        endDate = new Date(anchorDate);
        endDate.setFullYear(endDate.getFullYear() + intervalCount);
        break;
      default:
        // Fallback to 30 days from now
        endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }

    const endTimestamp = new Timestamp(Math.floor(endDate.getTime() / 1000), 0);

    // Update user document
    const userRef = doc(db, "users", firebaseUid);

    const updateData: SubscriptionUpdate = {
      "subscription.status": "canceled",
      "subscription.endDate": endTimestamp,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(userRef, updateData);

    return NextResponse.json({
      success: true,
      endDate: endTimestamp.toDate().toISOString(),
    });
  } catch (error) {
    console.error("Error cancelling subscription:", error);

    const stripeError = error as StripeError;
    const errorMessage =
      stripeError.message || "Stripe error cancelling subscription:";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
