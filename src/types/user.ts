import { Timestamp } from "firebase/firestore";

import { Subscription } from "./subscription";

export type User = {
  userData: UserData;
  professionalInfo: UserProfessionalInfo;
  billingAddress?: UserBillingAddress;
  subscription: Subscription;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type UserData = {
  name: string;
  email: string;
  phoneNumber: {
    areaCode: string;
    number: string;
  };
  accountType: "individual" | "organization";
  profilePicture?: string;
  emailVerified?: boolean;
};

export type UserProfessionalInfo = {
  fieldOfWork: string;
  institution: string;
  register: {
    council: string;
    state: string;
    number: string;
  };
};

export type UserBillingAddress = {
  street: string;
  houseNumber: string;
  city: string;
  district: string;
  postalCode: string;
  state: string;
};
