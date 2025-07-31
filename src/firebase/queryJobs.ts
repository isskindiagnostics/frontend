import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";

import { JobData } from "@/types/job";

import { db } from "./config";

type Suggestion = {
  value: string;
  body: {
    protocol: string;
    name: string;
  };
};

export async function getJobs(
  uid: string,
  searchTerm: string
): Promise<Suggestion[]> {
  const jobsRef = collection(db, "users", uid, "jobs");
  const q = query(jobsRef, orderBy("createdAt", "desc"), limit(10));
  const snapshot = await getDocs(q);

  const matches: Suggestion[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data() as JobData;

    const body = {
      protocol: data.protocol,
      name: data.patientData.name,
    };

    if (
      body.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      body.protocol.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      matches.push({ value: doc.id, body });
    }
  });

  return matches;
}

export async function getJobById(
  uid: string,
  jobId: string
): Promise<JobData | null> {
  const jobRef = doc(db, "users", uid, "jobs", jobId);
  const docSnap = await getDoc(jobRef);
  if (docSnap.exists()) {
    return docSnap.data() as JobData;
  }
  return null;
}
