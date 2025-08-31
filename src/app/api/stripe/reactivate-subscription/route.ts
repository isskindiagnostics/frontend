import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/firebase/config";
import { SubscriptionUpdate, APIError, StripeError } from "@/types/stripeApi";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

type ReactivateSubscriptionRequest = {
  subscriptionId: string;
};

type ReactivateSubscriptionResponse = {
  success: boolean;
};

export async function POST(
  req: NextRequest
): Promise<NextResponse<ReactivateSubscriptionResponse | APIError>> {
  try {
    const { subscriptionId }: ReactivateSubscriptionRequest = await req.json();

    if (!subscriptionId) {
      return NextResponse.json(
        { error: "Subscription ID é obrigatório" },
        { status: 400 }
      );
    }

    // Get current subscription status
    const currentSubscription =
      await stripe.subscriptions.retrieve(subscriptionId);

    // Check if subscription can be reactivated
    if (currentSubscription.status === "canceled") {
      return NextResponse.json(
        {
          error:
            "Assinatura já foi totalmente cancelada. Crie uma nova assinatura.",
        },
        { status: 400 }
      );
    }

    // Remove the cancel_at_period_end flag to reactivate
    const updatedSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        cancel_at_period_end: false,
      }
    );

    // Get the customer to find the Firebase UID
    const customer = await stripe.customers.retrieve(
      updatedSubscription.customer as string
    );

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

    // Update user document
    const userRef = doc(db, "users", firebaseUid);

    const updateData: SubscriptionUpdate = {
      "subscription.status": "active",
      "subscription.endDate": null, // Remove end date since subscription is active again
      updatedAt: Timestamp.now(),
    };

    await updateDoc(userRef, updateData);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error reactivating subscription:", error);

    const stripeError = error as StripeError;
    const errorMessage =
      stripeError.message || "Stripe error reactivating subscription.";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
