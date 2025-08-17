import { Timestamp } from "firebase/firestore";

import { Subscription } from "./subscription";

export type User = {
  userData: UserData;
  professionalInfo: UserProfessionalInfo;
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
  isEmailVerified?: boolean;
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
