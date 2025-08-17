import PricingCard from "@/components/PricingCard";
import { SUBSCRIPTION_PLANS, PlanType } from "@/stripe/config";

import { cardsRow } from "../index.css";

interface PaymentPlanProps {
  // selectedPlan: PlanType;
  onNext: (plan: PlanType) => void;
  // onBack: () => void;
  isSubmitting?: boolean;
}

export default function PaymentPlan({
  // selectedPlan,
  onNext,
  // isSubmitting = false,
}: PaymentPlanProps) {
  const handlePlanSelect = (planKey: string) => {
    const plan = planKey as PlanType;
    onNext(plan);
  };

  return (
    <div className={cardsRow}>
      {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
        <PricingCard
          key={key}
          subscription={plan.name}
          price={plan.price}
          description={plan.description}
          features={plan.features}
          variant={key === "premium" ? "highlight" : "default"}
          onClick={() => handlePlanSelect(key)}
        />
      ))}
    </div>
  );
}
