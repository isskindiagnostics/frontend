import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customer = searchParams.get("customer");
    const limit = parseInt(searchParams.get("limit") || "10");
    const startingAfter = searchParams.get("starting_after");

    if (!customer) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    const params: Stripe.ChargeListParams = {
      customer,
      limit,
      expand: ["data.payment_intent"],
    };

    if (startingAfter) {
      params.starting_after = startingAfter;
    }

    const charges = await stripe.charges.list(params);

    const flexCharges = charges.data.filter(
      (charge) => charge.metadata?.planType === "flex"
    );

    const formattedCharges = flexCharges.map((charge) => ({
      id: charge.id,
      amount: charge.amount,
      currency: charge.currency,
      created: charge.created,
      description: charge.description,
      receipt_url: charge.receipt_url,
      receipt_email: charge.receipt_email,
      status: charge.status,
      metadata: charge.metadata,
      payment_method_details: {
        card: charge.payment_method_details?.card
          ? {
              brand: charge.payment_method_details.card.brand,
              last4: charge.payment_method_details.card.last4,
            }
          : null,
      },
    }));

    return NextResponse.json({
      charges: formattedCharges,
      has_more: charges.has_more,
    });
  } catch (error) {
    console.log("Error fetching Stripe charges:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        error: "Failed to fetch charges",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
