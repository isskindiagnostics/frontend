import { doc, setDoc, Timestamp } from "firebase/firestore";

import { db } from "./config";

export async function saveAnalysisData({
  uid,
  jobId,
  name,
  insurance,
  birthDate,
  gender,
  skinLocation,
  skinType,
}: {
  uid: string;
  jobId: string;
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
