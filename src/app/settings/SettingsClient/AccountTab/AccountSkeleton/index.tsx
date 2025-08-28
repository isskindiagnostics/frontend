import ContentBlock from "@/components/ContentBlock";
import SkeletonCell from "@/components/SkeletonCell";

import {
  accountContentBlock,
  profileSettings,
  inputWrapper,
} from "../index.css";

export default function AccountSkeleton() {
  return (
    <ContentBlock className={accountContentBlock}>
      <div className={profileSettings}>
        <SkeletonCell width={94} height={94} style={{ borderRadius: "50%" }} />
        <div>
          <h3>Perfil</h3>
          <p>Mantenha os dados da sua conta seguros e atualizados.</p>
        </div>
      </div>

      <div className={inputWrapper}>
        <SkeletonCell width={"100%"} height={50} />
        <SkeletonCell width={"100%"} height={50} />
      </div>
    </ContentBlock>
  );
}
