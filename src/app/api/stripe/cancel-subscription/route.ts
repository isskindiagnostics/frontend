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

    // Cancel subscription at period end
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

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

    // Calculate end date - use current_period_end if available
    const typedSubscription = currentSubscription as unknown as {
      current_period_end?: number;
      current_period_start?: number;
      items?: {
        data: Array<{
          price?: {
            recurring?: {
              interval: string;
            };
          };
        }>;
      };
    };

    let endDate: Timestamp;

    if (typedSubscription.current_period_end) {
      // Use the existing current_period_end
      endDate = new Timestamp(typedSubscription.current_period_end, 0);
    } else if (typedSubscription.current_period_start) {
      // Calculate based on current_period_start + interval
      const interval =
        typedSubscription.items?.data[0]?.price?.recurring?.interval || "month";
      const startTimestamp = typedSubscription.current_period_start;
      const startDate = new Date(startTimestamp * 1000);

      let endDateCalculated: Date;
      if (interval === "year") {
        endDateCalculated = new Date(
          startDate.getFullYear() + 1,
          startDate.getMonth(),
          startDate.getDate()
        );
      } else {
        // Default to month
        endDateCalculated = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          startDate.getDate()
        );
      }

      endDate = new Timestamp(
        Math.floor(endDateCalculated.getTime() / 1000),
        0
      );
    } else {
      // Fallback: 30 days from now
      const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      endDate = new Timestamp(Math.floor(futureDate.getTime() / 1000), 0);
    }

    // Update user document
    const userRef = doc(db, "users", firebaseUid);

    const updateData: SubscriptionUpdate = {
      "subscription.status": "canceled",
      "subscription.endDate": endDate,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(userRef, updateData);

    return NextResponse.json({
      success: true,
      endDate: endDate.toDate().toISOString(),
    });
  } catch (error) {
    console.error("Error cancelling subscription:", error);

    const stripeError = error as StripeError;
    const errorMessage =
      stripeError.message || "Stripe error cancelling subscription:";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
