import { doc, getDoc, updateDoc } from "firebase/firestore";

import { Subscription } from "@/types/subscription";

import { db } from "./config";

/**
 * Checks whether a user is allowed to generate a new PDF report.
 *
 * - Premium users can generate unlimited PDFs.
 * - Free users are limited by their `pdfLimit`.
 *
 * @param uid - The UID of the user attempting to generate a report
 * @returns A promise that resolves to `true` if the user can generate a report, or `false` if they’ve reached their limit
 */
export async function canCreateReportPdf(uid: string): Promise<boolean> {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return false;

  const subscription = userSnap.data().subscription as Subscription;
  if (subscription.plan !== "free") return true;

  const free = subscription.free;
  const count = free?.pdfCount || 0;
  const limit = free?.pdfLimit || 0;

  return count < limit;
}

/**
 * Increments the PDF generation count for a user on the free plan.
 *
 * - Should be called only after a PDF is successfully generated.
 * - Premium users are not affected by this count.
 *
 * @param uid - The UID of the user generating the report
 * @returns A promise that resolves to the new `pdfCount` value after incrementing,
 *          or `0` if the user document does not exist
 */
export async function incrementReportPdfCount(uid: string): Promise<number> {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return 0;

  const subscription = userSnap.data().subscription as Subscription;
  const free = subscription.free;
  const currentCount = free?.pdfCount || 0;
  const newCount = currentCount + 1;

  await updateDoc(userRef, {
    "subscription.free.pdfCount": newCount,
  });

  return newCount;
}

/**
 * Retrieves the current PDF generation usage for a user on a free plan.
 *
 * - Useful for showing the user how many pdf generations they’ve used and how many remain
 *
 * @param uid - UID of the user
 * @returns A promise that resolves to an object with `count` and `limit`,
 *          or `null` if the user document doesn't exist
 */
export async function getReportPdfUsage(
  uid: string
): Promise<{ count: number; limit: number } | null> {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return null;

  const subscription = userSnap.data().subscription as Subscription;
  const free = subscription.free;
  const count = free?.pdfCount || 0;
  const limit = free?.pdfLimit || 0;

  return { count, limit };
}
