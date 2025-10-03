"use client";
import { Elements } from "@stripe/react-stripe-js";

import { stripePromise } from "@/stripe/config";

import AddCardContent from "./AddCardContent";

export default function AddCard() {
  return (
    <Elements stripe={stripePromise}>
      <AddCardContent />
    </Elements>
  );
}
