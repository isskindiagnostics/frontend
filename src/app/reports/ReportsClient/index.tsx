"use client";

import { Notification } from "isskinui";
import { useState } from "react";

import { main } from "@/app/global.css";
import { uid } from "@/app/uid";
import TopBar from "@/components/TopBar";
import { useShowToast } from "@/hooks/useShowToast";
import { JobDataWithId } from "@/types/job";
import { sortJobs, SortReports } from "@/utils/sortJobs";

import Search from "../Search";

import HeaderControls from "./HeaderControls";
import * as styles from "./index.css";
import ReportOverview from "./ReportOverview";
import ReportsTable from "./ReportsTable";
import { useJobs } from "./useJobs";

export default function ReportsClient({
  jobs: initialJobs,
  insurances,
}: {
  jobs: JobDataWithId[];
  insurances: string[];
}) {
  const {
    jobs,
    hasMore,
    loadingMore,
    loadMore,
    setJobs,
    fetchJob,
    deleteById,
  } = useJobs(initialJobs, uid);
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(
    null
  );
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useShowToast();

  const [overviewData, setOverviewData] = useState<JobDataWithId | null>(null);
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [overviewError, setOverviewError] = useState(false);

  const filteredJobs = selectedInsurance
    ? jobs.filter((job) => job.patientData.insurance === selectedInsurance)
    : jobs;

  const handleDeleteJob = async (jobId: string) => {
    try {
      await deleteById(jobId);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch {
      setErrorMessage(
        "Ocorreu um erro ao excluir. Por favor, tente mais tarde."
      );
    }
  };

  const onReportClick = async (jobId: string) => {
    setSelectedJob(jobId);
    setOverviewLoading(true);
    setOverviewError(false);

    try {
      const data = await fetchJob(jobId);
      if (data) setOverviewData(data);
      else setOverviewError(true);
    } catch {
      setOverviewError(true);
    } finally {
      setOverviewLoading(false);
    }
  };

  const handleCloseOverview = () => {
    setSelectedJob(null);
    setOverviewData(null);
    setOverviewError(false);
  };

  return (
    <main className={main}>
      {errorMessage && <Notification type="error" label={errorMessage} />}

      <TopBar title="Relatórios">
        <Search fetchJob={fetchJob} />
      </TopBar>

      <HeaderControls
        insurances={insurances}
        selectedInsurance={selectedInsurance}
        setSelectedInsurance={setSelectedInsurance}
        filteredJobsCount={filteredJobs.length}
        loadMoreJobs={loadMore}
        onOptionSelect={(option) => {
          if (!option) {
            setJobs(jobs);
            return;
          }
          const keyMap: Record<string, SortReports> = {
            Data: "createdAt",
            Protocolo: "protocol",
            Paciente: "patientData.name",
            Convênio: "patientData.insurance",
          };
          const sortKey = keyMap[option];
          if (!sortKey) return;

          const sorted = sortJobs(jobs, sortKey, "asc");
          setJobs(sorted);
        }}
      />

      <div className={styles.contentWrapper}>
        <ReportsTable
          jobs={jobs}
          loadingMore={loadingMore}
          filteredJobs={filteredJobs}
          onReportClick={onReportClick}
          onDeleteJobClick={handleDeleteJob}
          loadMoreJobs={loadMore}
          hasMore={hasMore}
          selectedJob={selectedJob || ""}
          setSelectedJob={setSelectedJob}
        />

        <ReportOverview
          show={selectedJob !== null}
          data={overviewData}
          loading={overviewLoading}
          error={overviewError}
          jobId={selectedJob || ""}
          onClose={handleCloseOverview}
          fetchJob={fetchJob}
        />
      </div>
    </main>
  );
}
