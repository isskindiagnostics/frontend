"use client";

import { Notification, Search as IsskinSearch } from "isskinui";

import { uid } from "@/app/uid";
import { getJobById, getJobs } from "@/firebase/queryJobs";
import { getUserDataById } from "@/firebase/queryUser";
import generatePdf from "@/utils/generatePdf";

import { useShowToast } from "../../../../hooks/useShowToast";

const Search = () => {
  const [showToast, setShowToast] = useShowToast();

  const handleSuggestionSelect = async (jobId: string) => {
    const jobData = await getJobById(uid!, jobId);
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
