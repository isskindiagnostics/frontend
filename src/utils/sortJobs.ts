import { JobDataWithId } from "@/types/job";

export type SortReports =
  | "createdAt"
  | "protocol"
  | "patientData.name"
  | "patientData.insurance";

export type OrderReports = "asc" | "desc";

/**
 * Sorts an array of JobDataWithId based on a provided sort key.
 * Supports both top-level and nested fields (e.g., "patientData.name").
 *
 * @param jobs - The array of job data to sort.
 * @param sortBy - A string representing the field to sort by.
 *                 Supported values: "protocol", "createdAt", "patientData.name", "patientData.insurance"
 * @param order - Sorting order: "asc" (ascending) or "desc" (descending)
 * @returns A new sorted array of jobs.
 */
export function sortJobs(
  jobs: JobDataWithId[],
  sortBy: SortReports = "createdAt",
  order: OrderReports = "desc"
): JobDataWithId[] {
  return [...jobs].sort((a, b) => {
    const getValue = (job: JobDataWithId) => {
      switch (sortBy) {
        case "protocol":
          return job.protocol;
        case "createdAt":
          return job.createdAt;
        case "patientData.name":
          return job.patientData.name.toLowerCase();
        case "patientData.insurance":
          return job.patientData.insurance.toLowerCase();
        default:
          return "";
      }
    };

    const valA = getValue(a);
    const valB = getValue(b);

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });
}
