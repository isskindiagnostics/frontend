import ContentBlock from "@/components/ContentBlock";
import SkeletonCell from "@/components/SkeletonCell";

import {
  blocks,
  container,
  contentWrapper,
  titleWrapper,
} from "./SubscriptionClient/index.css";
import {
  summary,
  container as overviewContainer,
} from "./SubscriptionClient/SubscriptionOverview/index.css";

const colors = {
  wrapper: "#343434ff",
  shimmer:
    "linear-gradient(90deg, rgba(249, 249, 249, 0) 0%, #6d6d6db6 50%, rgba(249, 249, 249, 0) 100%)",
};

const SubscriptionSkeleton = () => {
  return (
    <div className={container}>
      <div
        style={{
          display: "flex",
          minHeight: 36,
          gap: 47,
          boxShadow: "inset 0 -1px 0 0 #CED8DA",
        }}
      >
        <SkeletonCell width={50} height={24} />
        <SkeletonCell width={50} height={24} />
      </div>

      <div className={contentWrapper}>
        <ContentBlock>
          <div className={titleWrapper}>
            <h3>Seu plano</h3>
            <SkeletonCell width={231} height={25} />
          </div>

          <p>
            Configure sua assinatura e escolha o plano que melhor atende às suas
            necessidades.
          </p>

          <div className={blocks}>
            <div className={overviewContainer}>
              <div>
                <div className={summary}>
                  <SkeletonCell
                    width={120}
                    height={23}
                    style={{ marginBottom: 10 }}
                    colors={colors}
                  />
                  <SkeletonCell width={150} height={23} colors={colors} />
                </div>
                <SkeletonCell width={428} height={23} colors={colors} />
              </div>
              <SkeletonCell width={103} height={40} colors={colors} />
            </div>
            {/* <NextBilling /> */}
          </div>
        </ContentBlock>
      </div>
    </div>
  );
};

export default SubscriptionSkeleton;
