"use client";
import { Icons } from "isskinui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

import { container, main, pageContent } from "@/app/global.css";
import ContentBlock from "@/components/ContentBlock";
import DataChip from "@/components/DataChip";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useAuth } from "@/context/AuthContext";
import { getJobById } from "@/firebase/queryJobs";
import { JobDataWithId } from "@/types/job";
import { getAge } from "@/utils/date";
import {
  getGenderLabel,
  getSkinTypeLabel,
  getProbabilityLabel,
  // getDxLabel,
  getRecCardLabel,
} from "@/utils/labels";

import CommentBlock from "./CommentBlock";
import * as styles from "./index.css";
import RestartAnalysis from "./RestartAnalysis";
import ResultsSkeleton from "./ResultsSkeleton";
import { SaveButton } from "./SaveButton";

type Chip = {
  icon: Icons;
  label: string;
  value: string | number;
};

export default function ResultsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<JobDataWithId | null>(null);
  const [loading, setLoading] = useState(true);
  const { jobId } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const jobData = await getJobById(user.uid, jobId);
        setData(jobData);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, jobId]);

  if (!user) {
    router.push("/login");
  }

  if (loading) {
    return <ResultsSkeleton />;
  }

  if (!data) {
    return <div>Resultado não encontrado.</div>; // TODO: change to 404 page
  }

  const chips: Chip[] = [
    {
      icon: "Cake",
      label: "Idade",
      value: `${getAge(data.patientData.birthDate)} anos`,
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
          <SaveButton jobId={jobId} uid={user?.uid || ""} />
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

                {/* <div className={styles.dxWrapper}>
                  <div className={styles.dxTypeLabel}>
                    <p>Tipo</p>
                    <div className={styles.betaBadge}>Beta</div>
                  </div>
                  <p className={styles.dxValue}>
                    {getDxLabel(data.result.dx_prediction)}
                  </p>
                </div> */}
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
