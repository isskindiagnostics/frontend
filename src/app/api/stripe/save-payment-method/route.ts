import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { adminDb } from "@/firebase/admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

type SavedCard = {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  cardholderName: string;
  isDefault: boolean;
};

type UserData = {
  subscription?: {
    stripeData?: {
      savedCards?: SavedCard[];
    };
  };
};

export async function POST(req: NextRequest) {
  try {
    const {
      customerId,
      paymentMethodId,
      userId,
      setAsDefault,
      cardholderName,
    } = await req.json();

    // Validate required fields
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

    // Get payment method details
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    // If setAsDefault, update customer's default payment method
    if (setAsDefault) {
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    }

    // Prepare card data for Firestore
    const cardData: SavedCard = {
      id: paymentMethodId,
      brand: paymentMethod.card?.brand || "unknown",
      last4: paymentMethod.card?.last4 || "0000",
      expMonth: paymentMethod.card?.exp_month || 0,
      expYear: paymentMethod.card?.exp_year || 0,
      cardholderName: cardholderName || "",
      isDefault: setAsDefault || false,
    };

    // Update Firestore
    const userRef = adminDb.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data() as UserData;
    let savedCards: SavedCard[] =
      userData?.subscription?.stripeData?.savedCards || [];

    // If setting as default, update all other cards
    if (setAsDefault) {
      savedCards = savedCards.map((card) => ({
        ...card,
        isDefault: false,
      }));
    }

    // Add or update the card
    const existingCardIndex = savedCards.findIndex(
      (card) => card.id === paymentMethodId
    );

    if (existingCardIndex >= 0) {
      savedCards[existingCardIndex] = cardData;
    } else {
      savedCards.push(cardData);
    }

    // Update Firestore
    await userRef.update({
      "subscription.stripeData.savedCards": savedCards,
    });

    return NextResponse.json({
      success: true,
      paymentMethod: cardData,
    });
  } catch (error) {
    console.error("Error saving payment method:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to save payment method",
      },
      { status: 500 }
    );
  }
}
