import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/firebase/config";
import { SUBSCRIPTION_PLANS } from "@/stripe/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: NextRequest) {
  try {
    const { customerId, paymentMethodId, userId } = await req.json();

    if (!customerId || !paymentMethodId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // Set as default payment method
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create subscription - immediate payment, no trial
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: SUBSCRIPTION_PLANS.premium.stripePriceId,
        },
      ],
      default_payment_method: paymentMethodId,
      expand: ["latest_invoice.payment_intent"],
    });

    // Get payment method details for saving
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    const card = paymentMethod.card;

    // Calculate dates
    const now = Timestamp.now();

    // Update user document
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      "subscription.plan": "premium",
      "subscription.status": "active", // Active immediately since payment is processed
      "subscription.startDate": now,
      "subscription.usage.analysisLimit":
        SUBSCRIPTION_PLANS.premium.analysisLimit,
      "subscription.usage.pdfLimit": SUBSCRIPTION_PLANS.premium.pdfLimit,
      "subscription.stripeData.subscriptionId": subscription.id,
      "subscription.stripeData.defaultPaymentMethodId": paymentMethodId,
      "subscription.stripeData.billingCycleAnchor": Timestamp.fromDate(
        new Date(subscription.billing_cycle_anchor * 1000)
      ),
      "subscription.stripeData.savedCards": [
        {
          id: paymentMethodId,
          brand: card?.brand || "",
          last4: card?.last4 || "",
          expMonth: card?.exp_month || 0,
          expYear: card?.exp_year || 0,
          isDefault: true,
        },
      ],
      updatedAt: now,
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: (subscription.latest_invoice as any)?.payment_intent
        ?.client_secret,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
