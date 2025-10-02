"use client";
import { Notification } from "isskinui";
import { useEffect, useMemo, useRef } from "react";

import SmallLogo from "@/assets/svgs/SmallLogo";
import Loader from "@/components/Loader";
import { getFormSteps, getTotalSteps } from "@/config/formSteps";
import { useFormNavigation } from "@/hooks/useFormNavigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import {
  PersonalInfoStepProps,
  WorkFieldStepProps,
  ProfessionalInfoStepProps,
  PaymentPlanStepProps,
  PaymentMethodStepProps,
  BillingAddressProps,
  StepData,
} from "@/types/formSteps";

import * as styles from "./index.css";
import { logo } from "./index.css";

export default function CompleteSignup() {
  const {
    userData,
    professionalInfo,
    subscription,
    billingAddress,
    // profileCompleted,
    isLoading,
    isSubmitting,
    saveError,
    dataLoaded,
    actions,
  } = useUserProfile();

  const justSelectedPremium = useRef(false);

  const isPremium = useMemo(() => {
    return subscription?.plan === "premium";
  }, [subscription?.plan]);

  const formSteps = useMemo(() => getFormSteps(isPremium), [isPremium]);

  const totalSteps = useMemo(() => getTotalSteps(isPremium), [isPremium]);

  const { currentStep, nextStep, prevStep, goToStep, getProgressPercentage } =
    useFormNavigation({
      totalSteps,
      onSaveStep: actions.saveStep,
      onComplete: actions.completeProfile,
    });

  const currentStepData = formSteps[currentStep - 1];

  useEffect(() => {
    if (
      subscription?.plan === "premium" &&
      currentStep === 4 &&
      justSelectedPremium.current
    ) {
      justSelectedPremium.current = false;
      goToStep(currentStep + 1);
    }
  }, [subscription?.plan, currentStep, goToStep]);

  const handleStepNavigation = async (stepData?: StepData): Promise<void> => {
    if (currentStep === 4 && stepData?.subscription?.plan === "premium") {
      justSelectedPremium.current = true;
    }

    await nextStep(stepData);
  };

  const handlePrevStep = () => {
    justSelectedPremium.current = false;
    prevStep();
  };

  const renderStep = () => {
    const step = formSteps[currentStep - 1];
    if (!step) return null;

    // Create step-specific props based on current step
    const commonProps = {
      isSubmitting,
      onNext: handleStepNavigation,
      onBack: handlePrevStep,
    };

    switch (step.id) {
      case "personal-info":
        return step.component({
          ...commonProps,
          userData,
        } as PersonalInfoStepProps);

      case "work-field":
        return step.component({
          ...commonProps,
          professionalInfo,
        } as WorkFieldStepProps);

      case "professional-info":
        return step.component({
          ...commonProps,
          professionalInfo,
        } as ProfessionalInfoStepProps);

      case "payment-plan":
        return step.component({
          ...commonProps,
          subscription,
        } as PaymentPlanStepProps);

      case "payment-method":
        return step.component({
          ...commonProps,
          subscription,
        } as PaymentMethodStepProps);

      case "billing-address":
        return step.component({
          ...commonProps,
          billingAddress,
        } as BillingAddressProps);

      default:
        return null;
    }
  };

  const renderProgressIndicators = () => {
    return (
      <div className={styles.stepIndicators}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`${styles.stepIndicator} ${
              i < currentStep ? styles.completed : ""
            }`}
            title={formSteps[i]?.title}
          >
            {i + 1}
          </div>
        ))}
      </div>
    );
  };

  if (isLoading || !dataLoaded) {
    return (
      <>
        {saveError && <Notification type="error" label={saveError} />}

        <div className={styles.container}>
          <div className={styles.header}>
            <SmallLogo className={logo} />
          </div>

          <main className={styles.main}>
            <div className={styles.loaderWrapper}>
              <Loader />
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      {saveError && <Notification type="error" label={saveError} />}

      <div className={styles.container}>
        <div className={styles.header}>
          <SmallLogo className={logo} />
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
            {renderProgressIndicators()}
          </div>
        </div>

        <main className={styles.main}>
          {currentStepData && (
            <div className={styles.stepForm}>
              <div className={styles.formHeading}>
                <h2>{currentStepData.title}</h2>
                <p>{currentStepData.description}</p>
              </div>
              {renderStep()}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
