"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { getAllJobs, getMostCommonInsurance } from "@/firebase/queryJobs";
import { JobDataWithId } from "@/types/job";

import ReportsClient from "./ReportsClient";
import ReportsSkeleton from "./ReportsSkeleton";

export default function ReportsContent() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [jobs, setJobs] = useState<JobDataWithId[]>([]);
  const [insurances, setInsurances] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const [jobsData, insurancesData] = await Promise.all([
          getAllJobs(user.uid),
          getMostCommonInsurance(user.uid),
        ]);

        setJobs(jobsData);
        setInsurances(insurancesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchData();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return <ReportsSkeleton />;
  }

  if (!user) {
    router.push("/login");
  }

  return <ReportsClient jobs={jobs} insurances={insurances} />;
}
