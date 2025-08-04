import { getAllJobs, getMostCommonInsurance } from "@/firebase/queryJobs";

import { uid } from "../uid";

import ReportsClient from "./ReportsClient";

export default async function ReportsContent() {
  const jobs = await getAllJobs(uid);
  const insurances = await getMostCommonInsurance(uid);

  return <ReportsClient jobs={jobs} insurances={insurances} />;
}
