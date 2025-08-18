import { ReactNode } from "react";

import { Subscription } from "@/types/subscription";
import {
  UserBillingAddress,
  UserData,
  UserProfessionalInfo,
} from "@/types/user";

// Base step data that can be passed between steps
export type StepData = Partial<{
  userData: UserData;
  professionalInfo: UserProfessionalInfo;
  subscription: Subscription;
  billingAddress: UserBillingAddress;
}>;

// Props that each step component receives
export type BaseStepProps = {
  isSubmitting: boolean;
  onNext: (data?: StepData) => void;
  onBack?: () => void;
};

// Specific props for each step type
export type PersonalInfoStepProps = BaseStepProps & {
  userData: UserData;
};

export type WorkFieldStepProps = BaseStepProps & {
  professionalInfo: UserProfessionalInfo;
};

export type ProfessionalInfoStepProps = BaseStepProps & {
  professionalInfo: UserProfessionalInfo;
};

export type PaymentPlanStepProps = BaseStepProps & {
  subscription: Subscription;
};

export type PaymentMethodStepProps = BaseStepProps & {
  subscription: Subscription;
};

export type BillingAddressProps = BaseStepProps & {
  billingAddress: UserBillingAddress;
};

// Union type for all possible step props
export type StepProps =
  | PersonalInfoStepProps
  | WorkFieldStepProps
  | ProfessionalInfoStepProps
  | PaymentPlanStepProps
  | PaymentMethodStepProps
  | BillingAddressProps;

// Form step configuration type
export type FormStep = {
  id: string;
  title: string;
  description?: string;
  component: (props: StepProps) => ReactNode;
  validation?: (data: StepData) => boolean;
  requiredData: (keyof StepData)[];
};

// Payment plan selection data
export type PaymentPlanData = {
  plan: "free" | "premium";
};

// Payment method data from Stripe
export type PaymentMethodData = {
  paymentMethodId?: string;
  customerId?: string;
  setupIntentId?: string;
};
