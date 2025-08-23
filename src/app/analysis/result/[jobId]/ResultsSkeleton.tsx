import { container, main, pageContent } from "@/app/global.css";
import ContentBlock from "@/components/ContentBlock";
import Sidebar from "@/components/Sidebar";
import SkeletonCell from "@/components/SkeletonCell";
import TopBar from "@/components/TopBar";

import CommentBlock from "./CommentBlock";
import * as styles from "./index.css";

export default function ResultsSkeleton() {
  <SkeletonCell width={180} height={40} />;

  return (
    <div className={container} style={{ display: "flex" }}>
      <Sidebar currentPage={"analysis"} />
      <main className={main}>
        <TopBar title="Análise">
          <SkeletonCell width={218} height={42} />
        </TopBar>

        <div className={pageContent}>
          <div className={styles.resultsDashboard}>
            <ContentBlock
              className={styles.patientDataWrapper}
              flexDirection="row"
            >
              <SkeletonCell width={112} height={41} />
              <SkeletonCell width={112} height={41} />
              <SkeletonCell width={112} height={41} />
              <SkeletonCell width={112} height={41} />
            </ContentBlock>

            <ContentBlock className={styles.resultsWrapper} flexDirection="row">
              <div className={styles.imgWrapper}>
                <SkeletonCell width={345} height={270} />
              </div>

              <div>
                <div>
                  <SkeletonCell width={"100%"} height={32} />
                  <SkeletonCell width={"100%"} height={36} />
                  <SkeletonCell width={"70%"} height={36} />
                </div>

                {/* <div className={styles.malignantWrapper}>
                  <p className={styles.malignant}>Maligno</p>
                  <p className={styles.malignantPercentage}>
                    {data.result.binary_prediction.malignant.toFixed(1)}%
                  </p>
                </div> */}

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
              <ContentBlock>
                <div>
                  {/* <div className={styles.recImgWrapper}> */}
                  <SkeletonCell
                    width={85}
                    height={85}
                    style={{ marginBottom: 9 }}
                  />
                  {/* </div> */}
                  <SkeletonCell
                    width={240}
                    height={26}
                    style={{ marginBottom: 9 }}
                  />
                  <SkeletonCell
                    width={240}
                    height={20}
                    style={{ marginBottom: 9 }}
                  />
                  <SkeletonCell
                    width={240}
                    height={20}
                    style={{ marginBottom: 9 }}
                  />
                  <SkeletonCell
                    width={240}
                    height={20}
                    style={{ marginBottom: 9 }}
                  />
                </div>
              </ContentBlock>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
