import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { CardFlag, InputField } from "isskinui";

import {
  twoFieldsRow,
  inputFieldWrapper,
  stripeLabel,
  stripeLabelDisabled,
  stripeInputField,
  stripeInputFieldDisabled,
  stripeInputFieldError,
  inputCardBrand,
  stripeError,
} from "@/components/CompleteSignup/index.css";
import { createElementOptions } from "@/components/CompleteSignup/PaymentMethod";
import ContentBlock from "@/components/ContentBlock";
import { mapStripeBrandToFlag } from "@/types/stripeApi";

import { contentBlockWidth } from "../index.css";
import { NewCardFormProps } from "../types";

export default function NewCardForm({
  cardholderName,
  onCardholderNameChange,
  cardholderNameError,
  cardBrand,
  errors,
  isProcessing,
  onCardNumberChange,
  onCardExpiryChange,
  onCardCvcChange,
}: NewCardFormProps) {
  return (
    <ContentBlock className={contentBlockWidth}>
      <InputField
        label="Nome do titular (como está no cartão)"
        type="text"
        value={cardholderName}
        onChange={(e) => onCardholderNameChange(e.target.value)}
        disabled={isProcessing}
        error={cardholderNameError}
        width={"100%"}
      />

      <div className={inputFieldWrapper}>
        <label
          className={`${stripeLabel} ${isProcessing && stripeLabelDisabled}`}
        >
          Número do cartão
        </label>
        <CardNumberElement
          className={`${stripeInputField} ${isProcessing && stripeInputFieldDisabled} ${errors.cardNumber && stripeInputFieldError}`}
          options={createElementOptions(isProcessing, "cardElement")}
          onChange={onCardNumberChange}
        />

        {mapStripeBrandToFlag(cardBrand) && (
          <CardFlag
            flag={mapStripeBrandToFlag(cardBrand)!}
            className={inputCardBrand}
          />
        )}

        {errors.cardNumber && (
          <div className={stripeError}>{errors.cardNumber}</div>
        )}
      </div>

      <div className={twoFieldsRow}>
        <div className={inputFieldWrapper}>
          <label
            className={`${stripeLabel} ${isProcessing && stripeLabelDisabled}`}
          >
            Data de vencimento
          </label>
          <CardExpiryElement
            className={`${stripeInputField} ${isProcessing && stripeInputFieldDisabled} ${errors.cardExpiry && stripeInputFieldError}`}
            options={createElementOptions(isProcessing)}
            onChange={onCardExpiryChange}
          />
          {errors.cardExpiry && (
            <div className={stripeError}>{errors.cardExpiry}</div>
          )}
        </div>

        <div className={inputFieldWrapper}>
          <label
            className={`${stripeLabel} ${isProcessing && stripeLabelDisabled}`}
          >
            CVC
          </label>
          <CardCvcElement
            className={`${stripeInputField} ${isProcessing && stripeInputFieldDisabled} ${errors.cardCvc && stripeInputFieldError}`}
            options={createElementOptions(isProcessing)}
            onChange={onCardCvcChange}
          />
          {errors.cardCvc && (
            <div className={stripeError}>{errors.cardCvc}</div>
          )}
        </div>
      </div>
    </ContentBlock>
  );
}
