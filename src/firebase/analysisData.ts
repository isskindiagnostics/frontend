import { doc, setDoc } from "firebase/firestore";

import { db } from "./firebase";

export async function saveAnalysisData({
  uid,
  jobId,
  name,
  insurance,
  date,
  gender,
  skinLocation,
  skinType,
}: {
  uid: string;
  jobId: string;
  name: string;
  insurance: string;
  date: Date | null;
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
        date: date,
        gender: gender.trim(),
        skinLocation: skinLocation.trim(),
        skinType: skinType.trim(),
      },
    },
    { merge: true }
  );
}
