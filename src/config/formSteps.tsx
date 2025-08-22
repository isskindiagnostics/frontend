import { Timestamp } from "firebase/firestore";

import BillingAddress from "@/components/CompleteSignup/BillingAddress";
import PaymentMethod from "@/components/CompleteSignup/PaymentMethod";
import PaymentPlan from "@/components/CompleteSignup/PaymentPlan";
import PersonalInfo from "@/components/CompleteSignup/PersonalInfo";
import ProfessionalInfo from "@/components/CompleteSignup/ProfessionalInfo";
import WorkField from "@/components/CompleteSignup/WorkField";
import {
  FormStep,
  PersonalInfoStepProps,
  WorkFieldStepProps,
  ProfessionalInfoStepProps,
  PaymentPlanStepProps,
  PaymentMethodStepProps,
  BillingAddressProps,
} from "@/types/formSteps";

export const BASE_FORM_STEPS: FormStep[] = [
  {
    id: "personal-info",
    title: "Precisamos conhecer você!",
    description:
      "Preencha seus dados para que possamos identificar seu perfil.",
    requiredData: ["userData"],
    component: (props) => {
      const stepProps = props as PersonalInfoStepProps;
      return (
        <PersonalInfo
          userData={stepProps.userData}
          onNext={(userData) => stepProps.onNext({ userData })}
          isSubmitting={stepProps.isSubmitting}
        />
      );
    },
  },
  {
    id: "work-field",
    title: "Qual sua área de atuação?",
    description: "Isso nos ajuda a personalizar sua experiência.",
    requiredData: ["professionalInfo"],
    component: (props) => {
      const stepProps = props as WorkFieldStepProps;
      return (
        <WorkField
          professionalInfo={stepProps.professionalInfo}
          onNext={(professionalInfo) => stepProps.onNext({ professionalInfo })}
          onBack={stepProps.onBack}
          isSubmitting={stepProps.isSubmitting}
        />
      );
    },
  },
  {
    id: "professional-info",
    title: "Informações profissionais",
    description:
      "Esses dados ajudam a validar seu vínculo profissional na plataforma.",
    requiredData: ["professionalInfo"],
    component: (props) => {
      const stepProps = props as ProfessionalInfoStepProps;
      return (
        <ProfessionalInfo
          professionalInfo={stepProps.professionalInfo}
          onNext={(professionalInfo) => stepProps.onNext({ professionalInfo })}
          onBack={stepProps.onBack}
          isSubmitting={stepProps.isSubmitting}
        />
      );
    },
  },
  {
    id: "payment-plan",
    title: "Escolha seu plano",
    description: "Selecione o plano que melhor se adapta às suas necessidades.",
    requiredData: ["subscription"],
    component: (props) => {
      const stepProps = props as PaymentPlanStepProps;
      return (
        <PaymentPlan
          subscription={stepProps.subscription}
          onNext={(plan) => {
            const subscriptionUpdate = {
              ...stepProps.subscription,
              plan,
            };

            if (plan === "free") {
              subscriptionUpdate.status = "active";
              subscriptionUpdate.startDate = Timestamp.now();
            }

            stepProps.onNext({
              subscription: subscriptionUpdate,
            });
          }}
          isSubmitting={stepProps.isSubmitting}
        />
      );
    },
  },
];

export const PAYMENT_FORM_STEPS: FormStep[] = [
  {
    id: "payment-method",
    title: "Método de Pagamento",
    description: "Digite os dados do seu cartão para ativar o plano Premium.",
    requiredData: ["subscription"],
    component: (props) => {
      const stepProps = props as PaymentMethodStepProps;
      return (
        <PaymentMethod
          onNext={() => stepProps.onNext()}
          onBack={stepProps.onBack}
          isSubmitting={stepProps.isSubmitting}
        />
      );
    },
  },
  {
    id: "billing-address",
    title: "Endereço de cobrança",
    description:
      "Precisamos do endereço vinculado ao seu cartão para concluir a assinatura.",
    requiredData: ["billingAddress"],
    component: (props) => {
      const stepProps = props as BillingAddressProps;
      return (
        <BillingAddress
          billingAddress={stepProps.billingAddress}
          onNext={(billingAddress) => stepProps.onNext({ billingAddress })}
          onBack={stepProps.onBack}
          isSubmitting={stepProps.isSubmitting}
        />
      );
    },
  },
];

export const getFormSteps = (isPaidSubscription: boolean): FormStep[] => {
  return isPaidSubscription
    ? [...BASE_FORM_STEPS, ...PAYMENT_FORM_STEPS]
    : BASE_FORM_STEPS;
};

export const getTotalSteps = (isPaidSubscription: boolean): number => {
  return getFormSteps(isPaidSubscription).length;
};
