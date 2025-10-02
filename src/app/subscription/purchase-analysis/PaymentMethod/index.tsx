import { Card, IconLink, type Flag } from "isskinui";

import ContentBlock from "@/components/ContentBlock";

import {
  headingAction,
  paymentMehodBlock,
  titleAndDescription,
} from "../index.css";
import { PaymentMethodProps } from "../types";

export default function PaymentMethod({
  hasPaymentMethod,
  defaultCard,
  cardHolder,
  onAddNewCard,
  isProcessing,
}: PaymentMethodProps) {
  const flag = (defaultCard?.brand as Flag) || "visa";

  return (
    <ContentBlock className={paymentMehodBlock}>
      <div className={titleAndDescription}>
        <div className={headingAction}>
          <h3>
            {hasPaymentMethod
              ? " Método de Pagamento"
              : "Adicione Método de Pagamento"}
          </h3>
          <IconLink icon="Plus" onClick={onAddNewCard} disabled={isProcessing}>
            {hasPaymentMethod ? "Usar outro cartão" : "Adicionar cartão"}
          </IconLink>
        </div>
        <p>Esse será o cartão cobrado na sua compra</p>
      </div>

      {hasPaymentMethod && defaultCard && (
        <Card
          cardHolder={cardHolder || ""}
          cardNumber={defaultCard.last4 || ""}
          expirationDate={
            new Date(2000 + defaultCard.expYear, defaultCard.expMonth - 1)
          }
          isDefault={defaultCard.isDefault || true}
          flag={flag}
        />
      )}
    </ContentBlock>
  );
}
