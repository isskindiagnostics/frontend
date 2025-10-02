import ContentBlock from "@/components/ContentBlock";
import SkeletonCell from "@/components/SkeletonCell";

import { titleAndDescription } from "../../index.css";
import {
  accountContentBlock,
  profileSettings,
  inputWrapper,
  headingAction,
  accountContentWrapper,
  passwordBlock,
  blocksWrapper,
} from "../index.css";

export default function AccountSkeleton() {
  return (
    <div className={accountContentWrapper}>
      <ContentBlock className={accountContentBlock}>
        <div className={profileSettings}>
          <SkeletonCell
            width={94}
            height={94}
            style={{ borderRadius: "50%", minWidth: 94 }}
          />
          <div className={titleAndDescription}>
            <h3>Perfil</h3>
            <p>Mantenha os dados da sua conta seguros e atualizados.</p>
          </div>
        </div>

        <div className={inputWrapper}>
          <SkeletonCell width={"100%"} height={50} />
          <SkeletonCell width={"100%"} height={50} />
        </div>
      </ContentBlock>

      <div className={blocksWrapper}>
        <ContentBlock className={`${accountContentBlock} ${passwordBlock}`}>
          <div className={titleAndDescription}>
            <div className={headingAction}>
              <h3>Senha</h3>
              <SkeletonCell width={125} height={28} />
            </div>
            <p>
              Use uma senha forte e exclusiva para manter sua conta protegida.
            </p>
          </div>
        </ContentBlock>

        {/* TODO!!! */}
        {/* <ContentBlock className={`${accountContentBlock} ${passwordBlock}`}>
          <div>
            <div className={headingAction}>
              <h3>Autenticação de dois fatores</h3>

              <SkeletonCell width={125} height={28} />
            </div>
            <p>
              A autenticação de dois fatores adiciona uma camada extra de
              segurança à sua conta, exigindo mais do que apenas uma senha para
              fazer login.
            </p>
          </div>
        </ContentBlock> */}
      </div>
    </div>
  );
}
