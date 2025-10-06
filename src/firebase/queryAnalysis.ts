import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";

import { Subscription } from "@/types/subscription";

import { db } from "./config";

/**
 * Checks whether the user is allowed to perform a new analysis.
 *
 * - Users on premium plans can always perform analyses.
 * - Users on the free plan are limited by `analysisLimit`.
 *
 * @param uid - The UID of the user performing the analysis
 * @returns A promise that resolves to `true` if the user can perform an analysis, or `false` if not
 */
export async function canPerformAnalysis(uid: string): Promise<boolean> {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return false;

  const subscription = userSnap.data().subscription as Subscription;
  if (subscription.plan !== "free") return true;

  const free = subscription.usage;
  const count = free?.analysisCount || 0;
  const limit = free?.analysisLimit || 0;

  return count < limit;
}

/**
 * Increments the `analysisCount` field in a user's subscription (for free plan usage tracking).
 *
 * This should be called after a successful analysis if the user is on a free plan.
 *
 * @param uid - The UID of the user whose count should be incremented
 * @returns A promise that resolves to the new `analysisCount` after incrementing
 * @throws Will silently return 0 if the user document does not exist
 */
export async function incrementAnalysisCount(uid: string): Promise<number> {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return 0;

  const subscription = userSnap.data().subscription as Subscription;
  const usage = subscription.usage;
  const currentCount = usage?.analysisCount || 0;
  const newCount = currentCount + 1;

  await updateDoc(userRef, {
    "subscription.usage.analysisCount": newCount,
  });

  return newCount;
}

/**
 * Saves patient metadata and analysis protocol information for a specific analysis job.
 *
 * - Stores data inside the job document at `users/{uid}/jobs/{jobId}`
 * - Fields are merged (existing values are preserved unless overwritten)
 *
 * @param uid - UID of the user submitting the analysis
 * @param jobId - ID of the job document being updated
 * @param protocol - Clinical protocol code
 * @param name - Patient's full name
 * @param insurance - Insurance name
 * @param birthDate - Patient's birth date
 * @param gender - Patient's gender identity
 * @param skinLocation - Area of skin being analyzed
 * @param skinType - Patient's skin type classification (nullable)
 * @returns A promise that resolves when the data is saved
 */
export async function saveAnalysisData({
  uid,
  jobId,
  protocol,
  name,
  insurance,
  birthDate,
  gender,
  skinLocation,
  skinType,
}: {
  uid: string;
  jobId: string;
  protocol: string;
  name: string;
  insurance: string;
  birthDate: Date | null;
  gender: string;
  skinLocation: string;
  skinType: string;
}) {
  const ref = doc(db, "users", uid, "jobs", jobId);

  await setDoc(
    ref,
    {
      protocol: protocol.trim(),
      patientData: {
        name: name.trim(),
        insurance: insurance.trim(),
        birthDate: birthDate ? Timestamp.fromDate(birthDate) : null,
        gender: gender.trim(),
        skinLocation: skinLocation.trim(),
        skinType: skinType.trim(),
      },
    },
    { merge: true }
  );
}

/**
 * Adds or updates a free-text comment in a job document.
 *
 * - Trims whitespace from the comment before saving
 * - Merges with existing job data
 *
 * @param uid - UID of the user submitting the comment
 * @param jobId - ID of the job document to update
 * @param comment - Free-form comment or observation of analysis
 * @returns A promise that resolves to the saved comment
 */
export async function saveAnalysisComment({
  uid,
  jobId,
  comment,
}: {
  uid: string;
  jobId: string;
  comment: string;
}) {
  const trimmed = comment.trim();
  const ref = doc(db, "users", uid, "jobs", jobId);

  await setDoc(ref, { comment: trimmed }, { merge: true });

  return trimmed;
}

/**
 * Retrieves the current analysis usage for a user on a free plan.
 *
 * - Useful for showing the user how many analyses they’ve used and how many remain
 *
 * @param uid - UID of the user
 * @returns A promise that resolves to an object with `count` and `limit`,
 *          or `null` if the user document doesn't exist
 */
export async function getAnalysisUsage(
  uid: string
): Promise<{ count: number; limit: number } | null> {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return null;

  const subscription = userSnap.data().subscription as Subscription;
  const free = subscription.usage;
  const count = free?.analysisCount || 0;
  const limit = free?.analysisLimit || 0;

  return { count, limit };
}
