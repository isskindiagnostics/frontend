import ContentBlock from "@/components/ContentBlock";
import SkeletonCell from "@/components/SkeletonCell";

import {
  accountContentBlock,
  profileSettings,
  inputWrapper,
  headingAction,
  accountContentWrapper,
  passwordBlock,
} from "../index.css";

export default function AccountSkeleton() {
  return (
    <div className={accountContentWrapper}>
      <ContentBlock className={accountContentBlock}>
        <div className={profileSettings}>
          <SkeletonCell
            width={94}
            height={94}
            style={{ borderRadius: "50%" }}
          />
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

      <ContentBlock className={`${accountContentBlock} ${passwordBlock}`}>
        <div>
          <div className={headingAction}>
            <h3>Senha</h3>
            <SkeletonCell width={125} height={28} />
          </div>
          <p>Use uma senha forte e exclusiva para manter sua conta protegida.</p>
        </div>
      </ContentBlock>
    </div>
  );
}
