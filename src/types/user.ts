export type UserData = {
  name: string;
  email: string;
  phoneNumber: string;
  subscription: string;
  fieldOfWork: string;
  professionalLicense: {
    council: string;
    state: string;
    number: string;
  };
};
