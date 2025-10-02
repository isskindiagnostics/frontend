import { doc, updateDoc, Timestamp, increment } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/firebase/config";
import { SUBSCRIPTION_PLANS_SHORT } from "@/stripe/config";
import {
  SubscriptionUpdate,
  APIError,
  StripeError,
  getCardDetails,
} from "@/types/stripeApi";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

type ChargeFlexRequest = {
  customerId?: string;
  paymentMethodId: string;
  userId: string;
  saveCard?: boolean;
  userName?: string;
  userEmail?: string;
};

export async function POST(
  req: NextRequest
): Promise<
  NextResponse<
    | { success: boolean; requiresAction?: boolean; clientSecret?: string }
    | APIError
  >
> {
  try {
    const {
      customerId,
      paymentMethodId,
      userId,
      saveCard = false,
    }: ChargeFlexRequest = await req.json();

    if (!paymentMethodId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let finalCustomerId = customerId;
    const userRef = doc(db, "users", userId);

    if (!finalCustomerId) {
      const customer = await stripe.customers.create({
        metadata: {
          firebaseUid: userId,
        },
      });
      finalCustomerId = customer.id;
    }

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: finalCustomerId,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: SUBSCRIPTION_PLANS_SHORT.flex.price,
      currency: "brl",
      customer: finalCustomerId,
      payment_method: paymentMethodId,
      confirm: true,
      metadata: {
        planType: "flex",
        userId: userId,
      },
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription`,
    });

    if (paymentIntent.status === "requires_action") {
      return NextResponse.json({
        success: false,
        requiresAction: true,
        clientSecret: paymentIntent.client_secret || undefined,
      });
    }

    if (paymentIntent.status !== "succeeded") {
      throw new Error("Payment failed");
    }

    const updateData: SubscriptionUpdate = {
      "subscription.plan": "flex",
      "subscription.status": "active",
      "subscription.usage.analysisLimit": increment(1),
      "subscription.stripeData.customerId": finalCustomerId,
      updatedAt: Timestamp.now(),
    };

    if (!customerId) {
      updateData["subscription.startDate"] = Timestamp.now();
    }

    if (saveCard || !customerId) {
      const paymentMethod =
        await stripe.paymentMethods.retrieve(paymentMethodId);
      const cardDetails = getCardDetails(paymentMethod);

      await stripe.customers.update(finalCustomerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      updateData["subscription.stripeData.defaultPaymentMethodId"] =
        paymentMethodId;
      updateData["subscription.stripeData.savedCards"] = [
        {
          id: paymentMethodId,
          brand: cardDetails.brand,
          last4: cardDetails.last4,
          expMonth: cardDetails.expMonth,
          expYear: cardDetails.expYear,
          isDefault: true,
        },
      ];
    }

    await updateDoc(userRef, updateData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error charging flex analysis:", error);
    const stripeError = error as StripeError;
    const errorMessage = stripeError.message || "Failed to process payment";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
