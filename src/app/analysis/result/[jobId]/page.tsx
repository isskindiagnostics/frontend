import { doc, getDoc } from "firebase/firestore";
import { Icons } from "isskinui";
import Image from "next/image";

import { container, main, pageContent } from "@/app/global.css";
import ContentBlock from "@/components/ContentBlock";
import DataChip from "@/components/DataChip";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { db } from "@/firebase/config";
import { JobData } from "@/types/job";
import { getAge } from "@/utils/date";

import { uid } from "../../../uid";

import CommentBlock from "./CommentBlock";
import * as styles from "./index.css";
import {
  getGenderLabel,
  getSkinTypeLabel,
  getProbabilityLabel,
  getDxLabel,
  getRecCardLabel,
} from "./labels";
import RestartAnalysis from "./RestartAnalysis";
import { SaveButton } from "./SaveButton";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Análise",
  description: "Description specific to this page",
};

type Chip = {
  icon: Icons;
  label: string;
  value: string | number;
};

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const jobRef = doc(db, "users", uid, "jobs", jobId);
  const jobSnap = await getDoc(jobRef);

  if (!jobSnap.exists()) {
    return <div>Resultado não encontrado.</div>; // change to 404 page
  }

  const data = jobSnap.data() as JobData;

  const chips: Chip[] = [
    {
      icon: "Cake",
      label: "Idade",
      value: `${getAge(data.patientData.birthDate.toDate())} anos`,
    },
    {
      icon: "Skin",
      label: "Tipo de Pele",
      value: getSkinTypeLabel(data.patientData.skinType) ?? "",
    },
    {
      icon: "Gender",
      label: "Gênero",
      value: getGenderLabel(data.patientData.gender),
    },
    {
      icon: "Locate",
      label: "Local",
      value: data.patientData.skinLocation,
    },
  ];

  const probLabel = getProbabilityLabel(
    data.result.binary_prediction.malignant
  );

  const analysisRecommendation = getRecCardLabel(
    data.result.binary_prediction.malignant
  );

  return (
    <div className={container} style={{ display: "flex" }}>
      <Sidebar currentPage={"analysis"} />
      <main className={main}>
        <TopBar title="Análise">
          <RestartAnalysis />
          <SaveButton jobId={jobId} uid={uid} />
        </TopBar>

        <div className={pageContent}>
          <div className={styles.resultsDashboard}>
            <ContentBlock
              className={styles.patientDataWrapper}
              flexDirection="row"
            >
              {chips.map((chip, idx) => {
                return (
                  <DataChip
                    key={idx}
                    icon={chip.icon}
                    label={chip.label}
                    value={chip.value}
                    style={{
                      display: chip.value === "" ? "none" : "inherit",
                    }}
                  />
                );
              })}
            </ContentBlock>

            <ContentBlock className={styles.resultsWrapper} flexDirection="row">
              <div className={styles.imgWrapper}>
                <Image
                  className={styles.analysisImg}
                  src={data.imageUrl}
                  alt=""
                  fill
                />
              </div>

              <div>
                <div>
                  <h2>{probLabel.title}</h2>
                  <p>{probLabel.subline}</p>
                </div>

                <div className={styles.malignantWrapper}>
                  <p className={styles.malignant}>Maligno</p>
                  <p className={styles.malignantPercentage}>
                    {data.result.binary_prediction.malignant.toFixed(1)}%
                  </p>
                </div>

                <div className={styles.dxWrapper}>
                  <div className={styles.dxTypeLabel}>
                    <p>Tipo</p>
                    <div className={styles.betaBadge}>Beta</div>
                  </div>
                  <p className={styles.dxValue}>
                    {getDxLabel(data.result.dx_prediction)}
                  </p>
                </div>
              </div>
            </ContentBlock>

            <CommentBlock />
          </div>

          <div className={styles.recommendations}>
            <h2>Recomendações</h2>
            <div className={styles.recommendationsWrapper}>
              {analysisRecommendation.map((rec, idx) => (
                <ContentBlock key={idx}>
                  <div>
                    <div className={styles.recImgWrapper}>
                      <Image
                        className={styles.recImg}
                        src={rec.img}
                        alt=""
                        width={85}
                        height={55}
                      />
                    </div>
                    <p className={styles.recTitle}>{rec.title}</p>
                    <p>{rec.subline}</p>
                  </div>
                </ContentBlock>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
