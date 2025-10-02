import { Timestamp } from "firebase/firestore";

import { Subscription } from "@/types/subscription";
import {
  UserBillingAddress,
  UserData,
  UserProfessionalInfo,
} from "@/types/user";

export const createDefaultUserData = (
  email = "",
  emailVerified = false
): UserData => ({
  name: "",
  email,
  phoneNumber: {
    areaCode: "",
    number: "",
  },
  accountType: "individual",
  profilePicture: "",
  emailVerified,
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
  plan: null,
  status: "incomplete",
  startDate: Timestamp.now(),
  endDate: null,
  usage: {
    analysisCount: 0,
    analysisLimit: 0,
    pdfCount: 0,
    pdfLimit: 0,
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
        cardholderName: "",
        isDefault: true,
      },
    ],
  },
  cancellationHistory: [],
});

export const createDefaultBillingAddress = (): UserBillingAddress => ({
  street: "",
  houseNumber: "",
  city: "",
  district: "",
  postalCode: "",
  state: "",
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

export const mergeBillingAddress = (
  existing: Partial<UserBillingAddress>,
  defaults: UserBillingAddress
): UserBillingAddress => ({
  ...defaults,
  ...existing,
});
