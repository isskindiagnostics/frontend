import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  doc,
  getDoc,
  QueryConstraint,
  Timestamp,
  startAfter,
  deleteDoc,
} from "firebase/firestore";

import { JobData, JobDataWithId } from "@/types/job";
import { SortReports } from "@/utils/sortJobs";

import { db } from "./config";

type Suggestion = {
  value: string;
  body: {
    protocol: string;
    name: string;
  };
};

export type FirestoreJobData = Omit<
  JobData,
  "createdAt" | "completedAt" | "patientData"
> & {
  createdAt: Timestamp;
  completedAt?: Timestamp;
  patientData: Omit<JobData["patientData"], "birthDate"> & {
    birthDate: Timestamp;
  };
};

/**
 * Converts Firestore job data with Timestamps into JobDataWithId
 * with ISO string dates for easier consumption.
 *
 * @param id - Firestore document ID of the job
 * @param data - Raw job data from Firestore with Timestamps
 * @returns Job data with ISO strings and the id included
 */
export function convertJobData(
  id: string,
  data: FirestoreJobData
): JobDataWithId {
  return {
    id,
    ...data,
    createdAt: data.createdAt.toDate().toISOString(),
    completedAt: data.completedAt?.toDate().toISOString(),
    patientData: {
      ...data.patientData,
      birthDate: data.patientData.birthDate.toDate().toISOString(),
    },
  };
}

/**
 * Helper function that fetches jobs from Firestore with optional query constraints.
 *
 * @param uid - User ID whose jobs we want to fetch
 * @param constraints - Optional array of Firestore query constraints (e.g., orderBy, limit)
 * @returns Array of jobs with id and raw data
 */
async function fetchJobs(uid: string, constraints: QueryConstraint[] = []) {
  const jobsRef = collection(db, "users", uid, "jobs");
  const q = query(jobsRef, ...constraints);
  const snapshot = await getDocs(q);

  const jobs: { id: string; data: JobData }[] = [];
  snapshot.forEach((docSnap) => {
    const data = docSnap.data() as JobData;
    jobs.push({ id: docSnap.id, data });
  });

  return jobs;
}

/**
 * Retrieves all jobs for a user ordered by creation date descending.
 *
 * @param uid - User ID whose jobs we want
 * @param limitCount - Maximum number of jobs to retrieve (default is 6)
 * @param sortBy - Field to sort results by SortReports
 * @returns Promise resolving to array of jobs with id and ISO date strings
 */
export async function getAllJobs(
  uid: string,
  limitNumber: number = 6,
  sortBy: SortReports = "createdAt"
): Promise<JobDataWithId[]> {
  const q = query(
    collection(db, `users/${uid}/jobs`),
    orderBy(sortBy, "desc"),
    limit(limitNumber)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data() as FirestoreJobData;
    return convertJobData(doc.id, data);
  });
}

/**
 * Fetches the next page of jobs after a given job's createdAt timestamp.
 * Used for pagination / infinite scroll.
 *
 * @param lastCreatedAt - ISO string of the last job's createdAt timestamp
 * @param uid - User ID whose jobs we want
 * @param limitCount - Maximum number of jobs to retrieve (default is 15)
 * @param sortBy - Field to sort results by SortReports
 * @returns Promise resolving to an array of next jobs with id and ISO date strings
 */
export async function getMoreJobs(
  lastCreatedAt: string,
  uid: string,
  limitCount: number = 15,
  sortBy: SortReports = "createdAt"
): Promise<JobDataWithId[]> {
  const lastTimestamp = Timestamp.fromDate(new Date(lastCreatedAt));

  const q = query(
    collection(db, "users", uid, "jobs"),
    orderBy(sortBy, "desc"),
    startAfter(lastTimestamp),
    limit(limitCount)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data() as FirestoreJobData;

    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate().toISOString() ?? "",
      completedAt: data.completedAt?.toDate().toISOString() ?? undefined,
      patientData: {
        ...data.patientData,
        birthDate: data.patientData.birthDate?.toDate().toISOString(),
      },
    };
  }) as JobDataWithId[];
}

/**
 * Retrieves up to 6 recent job suggestions matching the search term.
 * Matches by patient name or protocol.
 *
 * @param uid - User ID whose jobs to search
 * @param searchTerm - Term to search for in patient name or protocol
 * @param sortBy - Field to sort results by SortReports
 * @returns Promise resolving to array of suggestion objects with id and protocol/name
 */
export async function getJobs(
  uid: string,
  searchTerm: string,
  sortBy: SortReports = "createdAt"
): Promise<Suggestion[]> {
  const jobs = await fetchJobs(uid, [orderBy(sortBy, "desc"), limit(6)]);

  return jobs
    .filter(({ data }) => {
      const name = data.patientData.name.toLowerCase();
      const protocol = data.protocol.toLowerCase();
      const term = searchTerm.toLowerCase();
      return name.includes(term) || protocol.includes(term);
    })
    .map(({ id, data }) => ({
      value: id,
      body: {
        protocol: data.protocol,
        name: data.patientData.name,
      },
    }));
}

/**
 * Retrieves a single job by its ID for a given user.
 *
 * @param uid - User ID who owns the job
 * @param jobId - Firestore document ID of the job
 * @returns Promise resolving to full job data with ISO strings or null if not found
 */
export async function getJobById(
  uid: string,
  jobId: string
): Promise<JobDataWithId | null> {
  const jobRef = doc(db, "users", uid, "jobs", jobId);
  const snapshot = await getDoc(jobRef);

  if (!snapshot.exists()) return null;

  const data = snapshot.data() as FirestoreJobData;
  return convertJobData(snapshot.id, data);
}

/**
 * Calculates the 4 most common insurance values among a user's jobs.
 *
 * @param uid - User ID whose jobs to analyze
 * @returns Promise resolving to array of up to 4 insurance names sorted by frequency
 */
export async function getMostCommonInsurance(uid: string): Promise<string[]> {
  const jobs = await fetchJobs(uid);
  const insuranceCount: Record<string, number> = {};

  jobs.forEach(({ data }) => {
    const insurance = data.patientData.insurance?.trim();
    if (insurance) {
      insuranceCount[insurance] = (insuranceCount[insurance] || 0) + 1;
    }
  });

  return Object.entries(insuranceCount)
    .sort((a, b) => b[1] - a[1])
    .map(([insurance]) => insurance)
    .slice(0, 4);
}

/**
 * Deletes a job document for a given user by its job ID.
 *
 * @param uid - User ID who owns the job
 * @param jobId - Firestore document ID of the job to delete
 * @returns Promise that resolves when deletion is complete
 * @throws Throws if deletion fails
 */
export async function deleteJob(uid: string, jobId: string): Promise<void> {
  const jobRef = doc(db, "users", uid, "jobs", jobId);
  await deleteDoc(jobRef);
}
