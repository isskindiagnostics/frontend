import { Card, IconLink } from "isskinui";

import ContentBlock from "@/components/ContentBlock";

import * as styles from "./index.css";

const PaymentMethods = () => {
  return (
    <ContentBlock>
      <div className={styles.titleWrapper}>
        <h3>Seu plano</h3>
        <IconLink icon="Plus">Adicionar novo cartão</IconLink>
      </div>

      <p>
        Configure sua assinatura e escolha o plano que melhor atende às suas
        necessidades.
      </p>

      <div className={styles.cards}>
        <Card
          onClick={() => console.log("TODO")}
          cardName="Nubank"
          cardHolder="Julia de Assis"
          cardNumber="1234"
          expirationDate={new Date()}
          isDefault={true}
          flag="mastercard"
        />
      </div>
    </ContentBlock>
  );
};

export default PaymentMethods;
