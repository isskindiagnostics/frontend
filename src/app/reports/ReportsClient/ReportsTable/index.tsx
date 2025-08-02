import { Bin, IconLink, PopUp } from "isskinui";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

import Sleeping from "@/assets/images/sleeping.png";
import Warning from "@/assets/images/warning.png";
import ContentBlock from "@/components/ContentBlock";
import { JobDataWithId } from "@/types/job";
import { formatDate } from "@/utils/date";
import { getInsuranceLabel } from "@/utils/labels";

import * as styles from "./index.css";

type ReportsTableProps = {
  jobs: JobDataWithId[];
  loadingMore: boolean;
  filteredJobs: JobDataWithId[];
  onReportClick: (jobId: string) => Promise<void>;
  onDeleteJobClick: (jobId: string) => Promise<void>;
  loadMoreJobs: () => void;
  hasMore: boolean;
  selectedJob: string;
  setSelectedJob: Dispatch<SetStateAction<string | null>>;
};

const tableHead = ["Protocolo", "Paciente", "Convênio", "Data"];

const ReportsTable = ({
  jobs,
  loadingMore,
  filteredJobs,
  onReportClick,
  onDeleteJobClick,
  loadMoreJobs,
  hasMore,
  selectedJob,
  setSelectedJob,
}: ReportsTableProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <>
      {showPopup && (
        <PopUp
          title="Tem certeza que deseja deletar a análise?"
          text="Não será possível recuperá-la depois."
          image={{ src: Warning.src, alt: "" }}
          primaryButton={{
            label: "Tenho",
            onClick: () => {
              onDeleteJobClick(selectedJob);
              setShowPopup(false);
            },
          }}
          secondaryButton={{
            label: "Cancelar",
            onClick: () => setShowPopup(false),
          }}
        />
      )}

      <ContentBlock
        className={`${styles.tableMinHeight}`}
        style={{
          flexGrow: jobs.length >= 7 ? 1 : "inherit",
        }}
      >
        <div className={styles.scrollWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHeadGroup}>
              <tr>
                {tableHead.map((item, idx) => (
                  <th
                    className={`${styles.tableHead} ${styles.columnWidths[idx]}`}
                    key={idx}
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 && !loadingMore && (
                <tr>
                  <td colSpan={5}>
                    <div className={styles.noJobsWrapper}>
                      <Image src={Sleeping} alt="" width={142} height={142} />
                      <p>
                        Nada por aqui ainda! Assim que você fizer uma análise,
                        ela aparecerá nesta lista.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {filteredJobs.map((job, idx) => {
                const isLast = idx === filteredJobs.length - 1;

                return (
                  <tr
                    key={job.id}
                    style={{ cursor: "pointer" }}
                    role="button"
                    onClick={() => onReportClick(job.id)}
                  >
                    <td
                      className={`${styles.tableData} ${styles.columnWidths[idx]} ${isLast ? styles.noBorder : ""}`}
                    >
                      {job.protocol}
                    </td>
                    <td
                      className={`${styles.tableData} ${styles.columnWidths[idx]} ${isLast ? styles.noBorder : ""}`}
                    >
                      {job.patientData.name}
                    </td>
                    <td
                      className={`${styles.tableData} ${styles.columnWidths[idx]} ${isLast ? styles.noBorder : ""}`}
                    >
                      {getInsuranceLabel(job.patientData.insurance)}
                    </td>
                    <td
                      className={`${styles.tableData} ${styles.columnWidths[idx]} ${isLast ? styles.noBorder : ""}`}
                    >
                      {formatDate(job.createdAt)}
                    </td>
                    <td
                      className={`${styles.tableData} ${styles.columnWidths[idx]} ${isLast ? styles.noBorder : ""} ${styles.bin}`}
                    >
                      <Bin
                        width={22}
                        onClick={() => {
                          setShowPopup(true);
                          setSelectedJob(job.id);
                        }}
                        cursor="pointer"
                      />
                    </td>
                  </tr>
                );
              })}

              <tr>
                {hasMore && (
                  <td colSpan={5} className={styles.tableDataHasMore}>
                    <IconLink
                      icon="Rotate"
                      renderAs="button"
                      onClick={loadMoreJobs}
                      disabled={loadingMore}
                    >
                      {loadingMore ? "Carregando..." : "Carregar mais"}
                    </IconLink>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </ContentBlock>
    </>
  );
};

export default ReportsTable;
