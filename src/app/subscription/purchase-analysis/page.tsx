"use client";
import { Elements } from "@stripe/react-stripe-js";

import { stripePromise } from "@/stripe/config";

import PurchaseAnalysisForm from "./PurchaseAnalysis";

export default function PurchaseAnalysisPage() {
  return (
    <Elements stripe={stripePromise}>
      <PurchaseAnalysisForm />
    </Elements>
  );
}
