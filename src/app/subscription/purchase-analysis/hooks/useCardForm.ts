import { CardBrand } from "@stripe/stripe-js";
import { useState } from "react";

import { translateStripeError } from "@/utils/stripeErrorTranslator";

import {
  CardCompletionState,
  CardElementEventMap,
  CardElementType,
  CardErrors,
} from "../types";

export function useCardForm() {
  const [cardBrand, setCardBrand] = useState<CardBrand>("unknown");
  const [errors, setErrors] = useState<CardErrors>({});
  const [cardComplete, setCardComplete] = useState<CardCompletionState>({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });
  const [cardholderName, setCardholderName] = useState("");
  const [cardholderNameError, setCardholderNameError] = useState("");

  const setFieldError = (field: keyof CardErrors, error: string) => {
    const translatedError = translateStripeError(error);
    setErrors((prev) => ({ ...prev, [field]: translatedError }));
  };

  const handleCardChange =
    <T extends CardElementType>(elementType: T) =>
    (event: CardElementEventMap[T]) => {
      setCardComplete((prev) => ({
        ...prev,
        [elementType]: event.complete,
      }));

      if (elementType === "cardNumber" && "brand" in event && event.brand) {
        setCardBrand(event.brand as CardBrand);
      }

      if (event.error) {
        const translatedError = translateStripeError(
          event.error.message,
          event.error.code,
          undefined // decline codes are not used in element validation
        );

        setFieldError(elementType, translatedError);
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[elementType];
          return newErrors;
        });
      }
    };

  const validateCardholderName = (name: string): boolean => {
    if (!name.trim()) {
      setCardholderNameError("Nome do titular é obrigatório");
      return false;
    }
    setCardholderNameError("");
    return true;
  };

  const isCardFormValid = (): boolean => {
    return (
      cardComplete.cardNumber &&
      cardComplete.cardExpiry &&
      cardComplete.cardCvc &&
      cardholderName.trim() !== "" &&
      Object.keys(errors).length === 0
    );
  };

  const resetCardForm = () => {
    setCardBrand("unknown");
    setErrors({});
    setCardComplete({
      cardNumber: false,
      cardExpiry: false,
      cardCvc: false,
    });
    setCardholderName("");
    setCardholderNameError("");
  };

  return {
    cardBrand,
    errors,
    cardComplete,
    cardholderName,
    cardholderNameError,
    setCardholderName,
    handleCardChange,
    validateCardholderName,
    isCardFormValid,
    resetCardForm,
  };
}
