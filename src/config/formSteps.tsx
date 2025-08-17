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
  ConfirmationStepProps,
} from "@/types/formSteps";

export const FORM_STEPS: FormStep[] = [
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
          onNext={(plan) =>
            stepProps.onNext({
              subscription: { ...stepProps.subscription, plan },
            })
          }
          isSubmitting={stepProps.isSubmitting}
        />
      );
    },
  },
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
    id: "confirmation",
    title: "Confirmação",
    description: "Revisar e finalizar",
    requiredData: ["userData", "professionalInfo", "subscription"],
    component: (props) => {
      const stepProps = props as ConfirmationStepProps;
      return (
        <div>
          <h2>Confirmação</h2>
          <p>Nome: {stepProps.userData.name}</p>
          <p>Email: {stepProps.userData.email}</p>
          <p>Área: {stepProps.professionalInfo.fieldOfWork}</p>
          <p>Plano: {stepProps.subscription.plan}</p>
          <button
            onClick={() => stepProps.onNext()}
            disabled={stepProps.isSubmitting}
          >
            Finalizar Cadastro
          </button>
        </div>
      );
    },
  },
];

export const TOTAL_STEPS = FORM_STEPS.length;
