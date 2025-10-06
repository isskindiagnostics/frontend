import {
  doc,
  updateDoc,
  Timestamp,
  getDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/firebase/config";
import { SUBSCRIPTION_PLANS } from "@/stripe/config";
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
  quantity?: number;
};

export async function POST(req: NextRequest): Promise<
  NextResponse<
    | {
        success: boolean;
        requiresAction?: boolean;
        clientSecret?: string;
        receiptUrl?: string;
        chargeId?: string;
      }
    | APIError
  >
> {
  try {
    const {
      customerId,
      paymentMethodId,
      userId,
      saveCard = false,
      userName,
      userEmail,
      quantity = 1,
    }: ChargeFlexRequest = await req.json();

    if (!paymentMethodId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let finalCustomerId = customerId;
    const userRef = doc(db, "users", userId);

    const userDoc = await getDoc(userRef);
    const currentData = userDoc.data();
    const currentUserEmail = userEmail || currentData?.userData?.email;

    if (!finalCustomerId) {
      const customer = await stripe.customers.create({
        metadata: {
          firebaseUid: userId,
        },
        name: userName,
        email: userEmail,
      });
      finalCustomerId = customer.id;
    }

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: finalCustomerId,
    });

    if (saveCard || !customerId) {
      await stripe.customers.update(finalCustomerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }

    const flexPricePerUnit = SUBSCRIPTION_PLANS.flex.price;
    const totalAmount = flexPricePerUnit * quantity;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "brl",
      customer: finalCustomerId,
      payment_method: paymentMethodId,
      confirm: true,
      description: `${quantity} Análise${quantity > 1 ? "s" : ""} Flex`,
      statement_descriptor_suffix: "FLEX", // Changed to suffix (max 22 chars for card)
      metadata: {
        planType: "flex",
        userId: userId,
        quantity: quantity.toString(),
      },
      receipt_email: currentUserEmail, // This sends a receipt automatically
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

    const charges = await stripe.charges.list({
      payment_intent: paymentIntent.id,
      limit: 1,
    });

    const charge = charges.data[0];
    const receiptUrl = charge?.receipt_url || undefined;

    const updateData: SubscriptionUpdate = {
      "subscription.plan": "flex",
      "subscription.status": "active",
      "subscription.usage.analysisLimit": increment(quantity),
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

    await updateDoc(userRef, {
      "subscription.paymentHistory": arrayUnion({
        date: Timestamp.now(),
        amount: totalAmount,
        currency: "brl",
        quantity: quantity,
        type: "flex_purchase" as const,
        paymentIntentId: paymentIntent.id,
        chargeId: charge?.id,
        receiptUrl: receiptUrl,
        status: "succeeded" as const,
        description: `${quantity} Análise${quantity > 1 ? "s" : ""} Flex`,
      }),
    });

    return NextResponse.json({
      success: true,
      receiptUrl,
      chargeId: charge?.id,
    });
  } catch (error) {
    console.log("Error charging flex analysis:", error);
    const stripeError = error as StripeError;
    const errorMessage = stripeError.message || "Failed to process payment";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
