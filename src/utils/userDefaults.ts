import { Timestamp } from "firebase/firestore";

import { Subscription } from "@/types/subscription";
import { UserData, UserProfessionalInfo } from "@/types/user";

export const createDefaultUserData = (
  email = "",
  isEmailVerified = false
): UserData => ({
  name: "",
  email,
  phoneNumber: {
    areaCode: "",
    number: "",
  },
  accountType: "individual",
  profilePicture: "",
  isEmailVerified,
});

export const createDefaultProfessionalInfo = (): UserProfessionalInfo => ({
  fieldOfWork: "",
  institution: "",
  register: {
    council: "",
    state: "",
    number: "",
  },
});

export const createDefaultSubscription = (): Subscription => ({
  plan: "free",
  status: "trialing",
  startDate: Timestamp.now(),
  endDate: null,
  usage: {
    analysisCount: 0,
    analysisLimit: 5,
    pdfCount: 0,
    pdfLimit: 5,
  },
  stripeData: {
    customerId: "",
    subscriptionId: "",
    defaultPaymentMethodId: "",
    billingCycleAnchor: Timestamp.now(),
    savedCards: [
      {
        id: "",
        brand: "",
        last4: "",
        expMonth: 12,
        expYear: 2040,
        isDefault: true,
      },
    ],
  },
});

// Safe merge function that ensures all nested properties exist
export const mergeUserData = (
  existing: Partial<UserData>,
  defaults: UserData
): UserData => ({
  ...defaults,
  ...existing,
  phoneNumber: {
    ...defaults.phoneNumber,
    ...existing.phoneNumber,
  },
});

export const mergeProfessionalInfo = (
  existing: Partial<UserProfessionalInfo>,
  defaults: UserProfessionalInfo
): UserProfessionalInfo => ({
  ...defaults,
  ...existing,
  register: {
    ...defaults.register,
    ...existing.register,
  },
});

export const mergeSubscription = (
  existing: Partial<Subscription>,
  defaults: Subscription
): Subscription => ({
  ...defaults,
  ...existing,
  usage: existing.usage
    ? {
        ...defaults.usage,
        ...existing.usage,
      }
    : defaults.usage,
  stripeData: existing.stripeData
    ? {
        ...defaults.stripeData,
        ...existing.stripeData,
        savedCards:
          existing.stripeData?.savedCards ||
          defaults.stripeData?.savedCards ||
          [],
      }
    : defaults.stripeData,
});
