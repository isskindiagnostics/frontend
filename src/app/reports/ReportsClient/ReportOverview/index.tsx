import { IconLink, Notification } from "isskinui";
import Image from "next/image";

import { uid } from "@/app/uid";
import ContentBlock from "@/components/ContentBlock";
import SkeletonCell from "@/components/SkeletonCell";
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
  const [showToast, setShowToast] = useShowToast(8000);

  const handleSaveJob = async (jobId: string) => {
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
