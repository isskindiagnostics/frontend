"use client";

import { Notification, Search as IsskinSearch } from "isskinui";

import { uid } from "@/app/uid";
import { REPORT_ERROR_MESSAGES } from "@/firebase/constants";
import { getJobs } from "@/firebase/queryJobs";
import {
  canCreateReportPdf,
  incrementReportPdfCount,
} from "@/firebase/queryReport";
import { getUserDataById } from "@/firebase/queryUser";
import { useShowToast } from "@/hooks/useShowToast";
import { JobDataWithId } from "@/types/job";
import generatePdf from "@/utils/generatePdf";

type SearchProps = {
  fetchJob: (id: string) => Promise<JobDataWithId | null>;
};

const Search = ({ fetchJob }: SearchProps) => {
  const [successMessage, setSuccessMessage] = useShowToast();
  const [errorMessage, setErrorMessage] = useShowToast();

  const handleSuggestionSelect = async (jobId: string) => {
    try {
      const jobData = await fetchJob(jobId);
      const userData = await getUserDataById(uid);

      const allowed = await canCreateReportPdf(uid);

      if (!allowed) {
        setErrorMessage(REPORT_ERROR_MESSAGES.limit);
        return;
      }

      if (jobData) {
        setSuccessMessage("Gerando o relatório do paciente selecionado.");
        generatePdf(userData, jobData);
        await incrementReportPdfCount(uid);
      }
    } catch (error) {
      setErrorMessage(REPORT_ERROR_MESSAGES.generic || "Erro desconhecido");
      console.error("Error:", error);
    }
  };

  return (
    <>
      {successMessage && <Notification type="general" label={successMessage} />}
      {errorMessage && <Notification type="error" label={errorMessage} />}

      <IsskinSearch
        placeholder="Pesquisar"
        getSuggestions={(val) => getJobs(uid!, val)}
        onSuggestionSelect={handleSuggestionSelect}
      />
    </>
  );
};

export default Search;
