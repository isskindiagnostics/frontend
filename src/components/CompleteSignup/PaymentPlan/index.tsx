import { Button } from "isskinui";
import { useState } from "react";

import { stepForm } from "@/app/signup/complete/index.css";
import PricingCard from "@/components/PricingCard";
import { SUBSCRIPTION_PLANS_SHORT, PlanType } from "@/stripe/config";
import { Subscription } from "@/types/subscription";

import { cardsRow, formButtonContainer } from "../index.css";

interface PaymentPlanProps {
  subscription: Subscription;
  onNext: (plan: PlanType) => void;
  onBack?: () => void;
  isSubmitting?: boolean;
}

export default function PaymentPlan({
  subscription,
  onNext,
  onBack,
  isSubmitting,
}: PaymentPlanProps) {
  const [formData, setFormData] = useState(subscription);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    subscription.plan || null
  );

  const isFormValid = selectedPlan !== null || formData.plan !== null;

  const handlePlanSelect = (planKey: string) => {
    const plan = planKey as PlanType;
    setSelectedPlan(planKey);
    setFormData((prev) => ({ ...prev, plan: plan }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlan) {
      onNext(selectedPlan as PlanType);
    }
  };

  return (
    <form className={stepForm} onSubmit={handleSubmit}>
      <div className={cardsRow}>
        {Object.entries(SUBSCRIPTION_PLANS_SHORT).map(([key, plan]) => (
          <PricingCard
            key={key}
            subscription={plan.name}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            variant={key === "premium" ? "highlight" : "default"}
            billingCycle={key === "premium" ? "monthly" : "payPerUse"}
            selected={selectedPlan === key}
            onClick={() => handlePlanSelect(key)}
            disabled={isSubmitting}
          />
        ))}
      </div>
      <div className={formButtonContainer}>
        <Button variant="outlined" disabled={isSubmitting} onClick={onBack}>
          Voltar
        </Button>
        <Button type="submit" disabled={isSubmitting || !isFormValid}>
          Próximo
        </Button>
      </div>
    </form>
  );
}
