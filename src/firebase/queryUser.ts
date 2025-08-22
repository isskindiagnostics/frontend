import { doc, getDoc } from "firebase/firestore";

import { UserData } from "@/types/user";

import { db } from "./config";

export async function getUserDataById(uid: string): Promise<UserData> {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.userData as UserData;
  }

  //TODO FIX TYPE
  return {
    name: "",
    email: "",
    phoneNumber: "",
    fieldOfWork: "",
    professionalLicense: {
      council: "",
      state: "",
      number: "",
    },
    subscription: {
      plan: "free",
      status: "trialing",
      startDate: "",
      endDate: null,
    },
  };
}
