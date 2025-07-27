import { doc, setDoc } from "firebase/firestore";

import { db } from "./config";

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
