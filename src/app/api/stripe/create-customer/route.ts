import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/firebase/config";
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
  SubscriptionUpdate,
  APIError,
  StripeError,
  createFirestoreUpdate,
} from "@/types/stripeApi";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(
  req: NextRequest
): Promise<NextResponse<CreateCustomerResponse | APIError>> {
  try {
    const { userId, email, name }: CreateCustomerRequest = await req.json();

    if (!userId || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email,
      name: name || undefined, // Convert empty string to undefined
      metadata: {
        firebaseUid: userId,
      },
    });

    // Update user document with Stripe customer ID
    const userRef = doc(db, "users", userId);
    const updateData: SubscriptionUpdate = {
      "subscription.stripeData.customerId": customer.id,
      updatedAt: Timestamp.now(), // Use Timestamp instead of Date
    };

    await updateDoc(userRef, createFirestoreUpdate(updateData));

    return NextResponse.json({
      customerId: customer.id,
    });
  } catch (error) {
    console.error("Error creating customer:", error);

    const stripeError = error as StripeError;
    const errorMessage = stripeError.message || "Failed to create customer";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
