"use client";
import { Card, Flag, IconLink } from "isskinui";
import { useRouter } from "next/navigation";

import ContentBlock from "@/components/ContentBlock";
import { useUserData } from "@/hooks/useUserData";

import * as styles from "./index.css";

const PaymentMethods = () => {
  const { userData } = useUserData();
  const router = useRouter();

  const cardHolder = userData?.userData.name;
  const defaultCard = userData?.subscription.stripeData?.savedCards?.find(
    (card) => card.isDefault
  );
  const hasPaymentMethod =
    userData?.subscription?.stripeData?.savedCards &&
    (userData?.subscription?.stripeData?.savedCards.length > 1 ||
      userData.subscription.stripeData.savedCards[0].brand !== ""); // TODO IMPROVE THIS

  const flag = (defaultCard?.brand as Flag) || "visa";

  return (
    <ContentBlock>
      <div className={styles.titleWrapper}>
        <h3>Método de Pagamento</h3>
        <IconLink
          icon="Plus"
          onClick={() => router.push("/subscription/add-card")}
        >
          Adicionar novo cartão
        </IconLink>
      </div>

      <p>Adicione, remova ou atualize seus métodos de pagamento.</p>

      {hasPaymentMethod && (
        <div className={styles.cards}>
          <Card
            cardHolder={cardHolder || ""}
            cardNumber={defaultCard?.last4 || ""}
            expirationDate={new Date(defaultCard?.expYear || "")}
            isDefault={defaultCard?.isDefault || true}
            flag={flag}
            variant="blue"
          />
        </div>
      )}
    </ContentBlock>
  );
};

export default PaymentMethods;
