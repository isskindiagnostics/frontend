import { IconLink } from "isskinui";

import ContentBlock from "@/components/ContentBlock";

import {
  accountContentBlock,
  headingAction,
  accountContentWrapper,
  passwordBlock,
} from "../index.css";

export default function AuthenticationData() {
  return (
    <div className={accountContentWrapper}>
      <ContentBlock className={`${accountContentBlock} ${passwordBlock}`}>
        <div>
          <div className={headingAction}>
            <h3>Autenticação de dois fatores</h3>

            <IconLink icon="ArrowRight" onClick={() => console}>
              Ativar
            </IconLink>
          </div>
          <p>
            A autenticação de dois fatores adiciona uma camada extra de
            segurança à sua conta, exigindo mais do que apenas uma senha para
            fazer login.
          </p>
        </div>
      </ContentBlock>
    </div>
  );
}
