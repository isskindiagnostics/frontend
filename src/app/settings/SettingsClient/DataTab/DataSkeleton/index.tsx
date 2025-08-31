import { twoFieldsRow } from "@/components/CompleteSignup/index.css";
import ContentBlock from "@/components/ContentBlock";
import SkeletonCell from "@/components/SkeletonCell";

import { titleAndDescription } from "../../index.css";
import { inputWrapper, dataContentBlock } from "../index.css";

export default function DataSkeleton() {
  return (
    <ContentBlock className={dataContentBlock}>
      <div className={titleAndDescription}>
        <h3>Informações profissionais</h3>
        <p>
          Atualize seus dados de atuação, registro profissional e local de
          trabalho.
        </p>
      </div>

      <div className={inputWrapper}>
        <div className={twoFieldsRow}>
          <SkeletonCell width={235} height={50} />
          <SkeletonCell width={405} height={50} />
        </div>

        <div className={twoFieldsRow}>
          <SkeletonCell width="100%" height={50} />
          <SkeletonCell width="100%" height={50} />
          <SkeletonCell width="100%" height={50} />
        </div>
      </div>
    </ContentBlock>
  );
}
