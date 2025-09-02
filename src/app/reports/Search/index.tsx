"use client";
import { Notification, Search as IsskinSearch } from "isskinui";

import { useAuth } from "@/context/AuthContext";
import { REPORT_ERROR_MESSAGES } from "@/firebase/constants";
import { getJobs } from "@/firebase/queryJobs";
import {
  canCreateReportPdf,
  incrementReportPdfCount,
} from "@/firebase/queryReport";
import { useShowToast } from "@/hooks/useShowToast";
import { useUserData } from "@/hooks/useUserData";
import { JobDataWithId } from "@/types/job";
import generatePdf from "@/utils/generatePdf";

type SearchProps = {
  fetchJob: (id: string) => Promise<JobDataWithId | null>;
};

const Search = ({ fetchJob }: SearchProps) => {
  const { user } = useAuth();
  const { userData } = useUserData();
  const [successMessage, setSuccessMessage] = useShowToast();
  const [errorMessage, setErrorMessage] = useShowToast();

  const handleSuggestionSelect = async (jobId: string) => {
    try {
      const jobData = await fetchJob(jobId);

      const allowed = await canCreateReportPdf(user?.uid || "");

      if (!allowed) {
        setErrorMessage(REPORT_ERROR_MESSAGES.limit);
        return;
      }

      if (jobData && userData) {
        setSuccessMessage("Gerando o relatório do paciente selecionado.");
        generatePdf(userData, jobData);
        await incrementReportPdfCount(user?.uid || "");
      } else {
        setErrorMessage("Dados insuficientes para gerar o relatório.");
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
        getSuggestions={(val) => getJobs(user?.uid || "", val)}
        onSuggestionSelect={handleSuggestionSelect}
      />
    </>
  );
};

export default Search;
