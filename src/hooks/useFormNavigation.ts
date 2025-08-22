import { useState } from "react";

import { StepData } from "@/types/formSteps";

type FormNavigationConfig = {
  totalSteps: number;
  onSaveStep: (stepData: StepData) => Promise<boolean>;
  onComplete: () => Promise<boolean>;
};

export const useFormNavigation = ({
  totalSteps,
  onSaveStep,
  onComplete,
}: FormNavigationConfig) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = async (stepData?: StepData): Promise<boolean> => {
    if (stepData) {
      const saved = await onSaveStep(stepData);
      if (!saved) return false;
    }

    if (currentStep === totalSteps) {
      return await onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
      return true;
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const getProgressPercentage = () => {
    return Math.min(((currentStep - 1) / (totalSteps - 1)) * 100, 100);
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    getProgressPercentage,
    isFirstStep,
    isLastStep,
  };
};
