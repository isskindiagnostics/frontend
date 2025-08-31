"use client";
import { Card, Flag, IconLink } from "isskinui";

import ContentBlock from "@/components/ContentBlock";
import { useUserData } from "@/hooks/useUserData";

import * as styles from "./index.css";

const PaymentMethods = () => {
  const { userData } = useUserData();

  const cardHolder = userData?.userData.name;
  const defaultCard = userData?.subscription.stripeData?.savedCards?.find(
    (card) => card.isDefault
  );

  const flag = (defaultCard?.brand as Flag) || "visa";

  return (
    <ContentBlock>
      <div className={styles.titleWrapper}>
        <h3>Método de Pagamento</h3>
        {/* <IconLink icon="Plus">Adicionar novo cartão</IconLink> */}
      </div>

      <p>Adicione, remova ou atualize seus métodos de pagamento.</p>

      <div className={styles.cards}>
        <Card
          // onClick={() => console.log("TODO")}
          // cardName=""
          cardHolder={cardHolder || ""}
          cardNumber={defaultCard?.last4 || ""}
          expirationDate={new Date(defaultCard?.expYear || "")}
          isDefault={defaultCard?.isDefault || true}
          flag={flag}
        />
      </div>
    </ContentBlock>
  );
};

export default PaymentMethods;
