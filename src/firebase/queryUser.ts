import { doc, getDoc, Timestamp } from "firebase/firestore";

import { User } from "@/types/user";
import {
  createDefaultBillingAddress,
  createDefaultProfessionalInfo,
  createDefaultSubscription,
  createDefaultUserData,
} from "@/utils/userDefaults";

import { db } from "./config";

export async function getUserDataById(uid: string): Promise<User> {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.userData as User;
  }

  return {
    userData: createDefaultUserData(),
    professionalInfo: createDefaultProfessionalInfo(),
    subscription: createDefaultSubscription(),
    billingAddress: createDefaultBillingAddress(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
}
