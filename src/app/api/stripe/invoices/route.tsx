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

    // Fetch invoices from Stripe
    const params: Stripe.InvoiceListParams = {
      customer,
      limit,
      expand: ["data.customer", "data.subscription"], // Expand related objects if needed
    };

    if (startingAfter) {
      params.starting_after = startingAfter;
    }

    const invoices = await stripe.invoices.list(params);

    return NextResponse.json({
      invoices: invoices.data,
      has_more: invoices.has_more,
    });
  } catch (error) {
    console.error("Error fetching Stripe invoices:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        error: "Failed to fetch invoices",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
