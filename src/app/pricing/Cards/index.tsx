"use client";

import PricingCard from "@/components/PricingCard";
import { SUBSCRIPTION_PLANS } from "@/stripe/config";

import { cardsWrapper } from "../index.css";

export default function Cards() {
  return (
    <div className={cardsWrapper}>
      {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
        <PricingCard
          key={key}
          subscription={plan.name}
          price={plan.price}
          description={plan.description}
          features={plan.features}
          variant={key === "premium" ? "highlight" : "default"}
        />
      ))}
    </div>
  );
}
