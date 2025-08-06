import { Subscription } from "./subscription";

export type UserData = {
  name: string;
  email: string;
  phoneNumber: string;
  fieldOfWork: string;
  professionalLicense: {
    council: string;
    state: string;
    number: string;
  };
  subscription: Subscription;
};
