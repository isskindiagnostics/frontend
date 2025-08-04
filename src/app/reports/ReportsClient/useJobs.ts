import { useState } from "react";

import { getMoreJobs, deleteJob, getJobById } from "@/firebase/queryJobs";
import { JobDataWithId } from "@/types/job";

export function useJobs(initialJobs: JobDataWithId[], uid: string) {
  const [jobs, setJobs] = useState(initialJobs);
  const [hasMore, setHasMore] = useState(initialJobs.length > 0);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    const lastJob = jobs[jobs.length - 1];
    const more = await getMoreJobs(lastJob.createdAt, uid, 30);
    
    setJobs((prev) => [...prev, ...more]);
    setHasMore(more.length === 30);
    setLoadingMore(false);
  };

  const deleteById = async (id: string) => {
    await deleteJob(uid, id);
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const fetchJob = (id: string) => getJobById(uid, id);

  return {
    jobs,
    hasMore,
    loadingMore,
    loadMore,
    deleteById,
    fetchJob,
    setJobs,
  };
}
