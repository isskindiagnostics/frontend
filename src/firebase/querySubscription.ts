import { doc, getDoc, Timestamp } from "firebase/firestore";

import { Subscription } from "@/types/subscription";

import { db } from "./config";

export async function getSubscriptionData(
  uid: string
): Promise<{ startDate: string } | null> {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return null;

  const subscription = userSnap.data().subscription as Subscription;

  const startDateTimestamp = subscription.startDate;
  const startDate =
    startDateTimestamp instanceof Timestamp
      ? startDateTimestamp.toDate().toISOString()
      : "";

  return { startDate };
}
