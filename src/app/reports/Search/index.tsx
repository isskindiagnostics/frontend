"use client";

import { Notification, Search as IsskinSearch } from "isskinui";

import { uid } from "@/app/uid";
import { getJobs } from "@/firebase/queryJobs";
import { getUserDataById } from "@/firebase/queryUser";
import { useShowToast } from "@/hooks/useShowToast";
import { JobDataWithId } from "@/types/job";
import generatePdf from "@/utils/generatePdf";

type SearchProps = {
  fetchJob: (id: string) => Promise<JobDataWithId | null>;
};

const Search = ({ fetchJob }: SearchProps) => {
  const [showToast, setShowToast] = useShowToast();

  const handleSuggestionSelect = async (jobId: string) => {
    const jobData = await fetchJob(jobId);
    const userData = await getUserDataById(uid);

    if (jobData) {
      setShowToast(true);
      generatePdf(userData, jobData);
    }
  };

  return (
    <>
      {showToast && (
        <Notification
          type="general"
          label="Gerando o relatório do paciente selecionado."
        />
      )}

      <IsskinSearch
        placeholder="Pesquisar"
        getSuggestions={(val) => getJobs(uid!, val)}
        onSuggestionSelect={handleSuggestionSelect}
      />
    </>
  );
};

export default Search;
