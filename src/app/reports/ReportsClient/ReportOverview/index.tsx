import { IconLink, Notification } from "isskinui";
import Image from "next/image";

import ContentBlock from "@/components/ContentBlock";
import SkeletonCell from "@/components/SkeletonCell";
import { useAuth } from "@/context/AuthContext";
import { REPORT_ERROR_MESSAGES } from "@/firebase/constants";
import {
  canCreateReportPdf,
  incrementReportPdfCount,
} from "@/firebase/queryReport";
import { getUserDataById } from "@/firebase/queryUser";
import { useShowToast } from "@/hooks/useShowToast";
import { JobDataWithId } from "@/types/job";
import generatePdf from "@/utils/generatePdf";

import * as styles from "./index.css";

type ReportOverviewProps = {
  jobId: string;
  show: boolean;
  data: JobDataWithId | null;
  loading: boolean;
  error: boolean;
  onClose: () => void;
  fetchJob: (id: string) => Promise<JobDataWithId | null>;
};

const ReportOverview = ({
  jobId,
  show,
  data,
  loading,
  error,
  onClose,
  fetchJob,
}: ReportOverviewProps) => {
  const { user } = useAuth();
  const [successMessage, setSuccessMessage] = useShowToast();
  const [errorMessage, setErrorMessage] = useShowToast();

  const handleSaveJob = async (jobId: string) => {
    try {
      const jobData = await fetchJob(jobId);
      const userData = await getUserDataById(user?.uid || "");

      const allowed = await canCreateReportPdf(user?.uid || "");

      if (!allowed) {
        setErrorMessage(REPORT_ERROR_MESSAGES.limit);
        return;
      }

      if (jobData) {
        setSuccessMessage("Gerando o relatório do paciente selecionado.");
        generatePdf(userData, jobData);
        await incrementReportPdfCount(user?.uid || "");
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

      {show && (
        <div className={styles.analysisOverview}>
          <ContentBlock>
            <IconLink
              style={{ marginBottom: 10 }}
              icon="ChevronLeft"
              onClick={onClose}
            >
              Fechar
            </IconLink>

            <h3>Informações da Análise</h3>

            {loading && (
              <>
                <div className={styles.imgWrapper}>
                  <SkeletonCell height="100%" />
                </div>

                <div className={styles.skeletonWrapper}>
                  <SkeletonCell height={26} />
                  <SkeletonCell height={25} />
                </div>
              </>
            )}

            {error && (
              <Notification
                type="error"
                label="Ocorreu um erro ao carregar os dados da análise."
              />
            )}

            {!loading && !error && data && (
              <>
                <div className={styles.imgWrapper}>
                  <Image
                    className={styles.img}
                    src={data.imageUrl}
                    alt=""
                    width={85}
                    height={55}
                  />
                </div>
                <p className={styles.comment}>{data.comment}</p>
              </>
            )}

            <IconLink
              icon="Share"
              onClick={() => handleSaveJob(jobId)}
              style={{ marginLeft: "auto" }}
            >
              Salvar
            </IconLink>
          </ContentBlock>
        </div>
      )}
    </>
  );
};

export default ReportOverview;
