"use client";
import { Notification } from "isskinui";

import SmallLogo from "@/assets/svgs/SmallLogo";
import { FORM_STEPS, TOTAL_STEPS } from "@/config/formSteps";
import { useFormNavigation } from "@/hooks/useFormNavigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import {
  PersonalInfoStepProps,
  WorkFieldStepProps,
  ProfessionalInfoStepProps,
  PaymentPlanStepProps,
  PaymentMethodStepProps,
  ConfirmationStepProps,
  StepData,
} from "@/types/formSteps";

import * as styles from "./index.css";
import { logo } from "./index.css";

export default function CompleteSignup() {
  const {
    userData,
    professionalInfo,
    subscription,
    // profileCompleted,
    isLoading,
    isSubmitting,
    saveError,
    actions,
  } = useUserProfile();

  const { currentStep, nextStep, prevStep, goToStep, getProgressPercentage } =
    useFormNavigation({
      totalSteps: TOTAL_STEPS,
      onSaveStep: actions.saveStep,
      onComplete: actions.completeProfile,
    });

  const handleStepNavigation = async (stepData?: StepData): Promise<void> => {
    await nextStep(stepData);
  };

  const renderStep = () => {
    if (isLoading) {
      return <div>Carregando...</div>;
    }

    const step = FORM_STEPS[currentStep - 1];
    if (!step) return null;

    // Create step-specific props based on current step
    const commonProps = {
      isSubmitting,
      onNext: handleStepNavigation,
      onBack: prevStep,
    };

    switch (currentStep) {
      case 1: // Personal Info
        return step.component({
          ...commonProps,
          userData,
        } as PersonalInfoStepProps);

      case 2: // Work Field
        return step.component({
          ...commonProps,
          professionalInfo,
        } as WorkFieldStepProps);

      case 3: // Professional Info
        return step.component({
          ...commonProps,
          professionalInfo,
        } as ProfessionalInfoStepProps);

      case 4: // Payment Plan
        return step.component({
          ...commonProps,
          subscription,
        } as PaymentPlanStepProps);

      case 5: // Payment Method
        return step.component({
          ...commonProps,
          subscription,
        } as PaymentMethodStepProps);

      case 6: // Confirmation
        return step.component({
          ...commonProps,
          userData,
          professionalInfo,
          subscription,
        } as ConfirmationStepProps);

      default:
        return null;
    }
  };

  const renderProgressIndicators = () => {
    return (
      <div className={styles.stepIndicators}>
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            onClick={() => goToStep(i + 1)}
            key={i}
            className={`${styles.stepIndicator} ${
              i < currentStep ? styles.completed : ""
            }`}
            title={FORM_STEPS[i]?.title}
          >
            {i + 1}
          </div>
        ))}
      </div>
    );
  };

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
        <main className={styles.main}>{renderStep()}</main>
      </div>
    </>
  );
}
