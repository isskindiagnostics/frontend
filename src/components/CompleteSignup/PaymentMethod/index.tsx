"use client";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  CardBrand,
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
} from "@stripe/stripe-js";
import { Button, CardFlag, InputField, Notification, theme } from "isskinui";
import React, { useState } from "react";

import { stepForm } from "@/app/signup/complete/index.css";
import { useAuth } from "@/context/AuthContext";
import { stripePromise } from "@/stripe/config";
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  mapStripeBrandToFlag,
  StripeError,
} from "@/types/stripeApi";
import { parseAPIResponse } from "@/utils/parseAPIResponse";
import { translateStripeError } from "@/utils/stripeErrorTranslator";

import {
  stripeLabel,
  stripeInputField,
  inputFieldWrapper,
  twoFieldsRow,
  formButtonContainer,
  stripeError,
  stripeInputFieldError,
  inputCardBrand,
  stripeInputFieldDisabled,
  stripeLabelDisabled,
} from "../index.css";

type PaymentMethodProps = {
  onNext: (paymentMethodId: string) => void;
  onBack?: () => void;
  isSubmitting?: boolean;
};

type CardElementType = "cardNumber" | "cardExpiry" | "cardCvc";

type CardElementEventMap = {
  cardNumber: StripeCardNumberElementChangeEvent;
  cardExpiry: StripeCardExpiryElementChangeEvent;
  cardCvc: StripeCardCvcElementChangeEvent;
};

type CardCompletionState = {
  cardNumber: boolean;
  cardExpiry: boolean;
  cardCvc: boolean;
};

type CardErrors = {
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  cardholderName?: string;
  general?: string;
};

const createElementOptions = (
  isDisabled?: boolean,
  type: "default" | "cardElement" = "default"
) => {
  const elementOptions = {
    style: {
      base: {
        fontFamily: theme.typography.fontFamilyBody,
        fontSize: theme.typography.text.desktop.xl.fontSize,
        color: theme.colors.brandBlack,
        fontWeight: "300",
        "::placeholder": {
          color: theme.colors.baseGrey200,
        },
      },
      invalid: {
        color: theme.colors.brandBlack,
      },
    },
    disabled: isDisabled,
  };

  const cardElementOptions = {
    ...elementOptions,
    disableLink: true,
  };

  return type === "default" ? elementOptions : cardElementOptions;
};

const PaymentMethodForm = ({
  onNext,
  onBack,
  isSubmitting,
}: PaymentMethodProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  const [cardholderName, setCardholderName] = useState("");
  const [cardBrand, setCardBrand] = useState<CardBrand>("unknown");
  const [processing, setProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState<CardCompletionState>({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });
  const [errors, setErrors] = useState<CardErrors>({});

  const isFormValid = (): boolean => {
    return (
      cardholderName.trim().length >= 2 &&
      cardComplete.cardNumber &&
      cardComplete.cardExpiry &&
      cardComplete.cardCvc
    );
  };

  const clearErrors = () => {
    setErrors({});
  };

  const setFieldError = (field: keyof CardErrors, error: string) => {
    const translatedError = translateStripeError(error);
    setErrors((prev) => ({ ...prev, [field]: translatedError }));
  };

  const createCustomer = async (): Promise<string> => {
    const requestData: CreateCustomerRequest = {
      userId: user?.uid || "",
      email: user?.email || "",
      name: cardholderName,
    };

    try {
      const response = await fetch("/api/stripe/create-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const customerData = (await parseAPIResponse(
        response
      )) as CreateCustomerResponse;
      return customerData.customerId;
    } catch (error) {
      console.error("Customer creation error:", error);
      throw new Error(
        translateStripeError(
          `Erro ao processar informações do cliente: ${(error as Error).message}`
        )
      );
    }
  };

  const createSubscription = async (
    customerId: string,
    paymentMethodId: string
  ): Promise<CreateSubscriptionResponse> => {
    const requestData: CreateSubscriptionRequest = {
      customerId,
      paymentMethodId,
      userId: user?.uid || "",
    };

    try {
      const response = await fetch("/api/stripe/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      return (await parseAPIResponse(response)) as CreateSubscriptionResponse;
    } catch (error) {
      console.error("Subscription creation error:", error);
      throw error;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setFieldError("general", "Pagamento não foi carregado. Tente novamente.");
      return;
    }

    if (!isFormValid()) {
      setFieldError(
        "general",
        "Por favor, preencha todos os campos obrigatórios."
      );
      return;
    }

    setProcessing(true);
    clearErrors();

    try {
      const cardNumberElement = elements.getElement(CardNumberElement);

      if (!cardNumberElement) {
        setFieldError("general", "Elemento do cartão não encontrado");
        throw new Error("Elemento do cartão não encontrado");
      }

      // Create payment method
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardNumberElement,
          billing_details: {
            name: cardholderName,
            email: user?.email,
          },
        });

      if (paymentMethodError) {
        const translatedError = translateStripeError(
          paymentMethodError.message || "",
          paymentMethodError.code,
          paymentMethodError.decline_code
        );
        throw new Error(translatedError);
      }

      if (!paymentMethod) {
        setFieldError("general", "Falha ao criar método de pagamento");
      }

      // Create customer
      const customerId = await createCustomer();

      // Create subscription
      const subscriptionData = await createSubscription(
        customerId,
        paymentMethod.id
      );

      // Handle 3D Secure if required
      if (subscriptionData.clientSecret) {
        const { error: confirmError } = await stripe.confirmCardPayment(
          subscriptionData.clientSecret
        );

        if (confirmError) {
          // Enhanced error translation for 3D Secure errors
          const translatedError = translateStripeError(
            confirmError.message || "",
            confirmError.code,
            confirmError.decline_code
          );
          throw new Error(translatedError);
        }
      }

      // Success
      onNext(paymentMethod.id);
    } catch (err) {
      const error = err as StripeError;
      console.error("Payment error:", error);

      // Translate the error message to Portuguese
      const translatedError = translateStripeError(
        error.message || "Erro ao processar pagamento. Tente novamente."
      );

      setFieldError("general", translatedError);
    } finally {
      setProcessing(false);
    }
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

  const handleCardholderNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCardholderName(value);

    if (errors.cardholderName && value.trim().length >= 2) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.cardholderName;
        return newErrors;
      });
    }
  };

  const handleCardholderNameBlur = () => {
    if (cardholderName.trim().length > 0 && cardholderName.trim().length < 2) {
      setFieldError(
        "cardholderName",
        "O nome do portador deve ter pelo menos 2 caracteres."
      );
    } else if (cardholderName.trim().length === 0) {
      setFieldError("cardholderName", "Este campo é obrigatório.");
    }
  };

  const isDisabled = processing || isSubmitting;

  return (
    <>
      {errors.general && <Notification type="error" label={errors.general} />}

      <form className={stepForm} onSubmit={handleSubmit}>
        <InputField
          label="Nome no cartão"
          type="text"
          value={cardholderName}
          onChange={handleCardholderNameChange}
          onBlur={handleCardholderNameBlur}
          placeholder="Digite o nome como está no cartão"
          width="100%"
          error={errors.cardholderName}
          required
          disabled={isDisabled}
        />

        <div className={twoFieldsRow}>
          <div className={inputFieldWrapper}>
            <label
              className={`${stripeLabel} ${isDisabled && stripeLabelDisabled} `}
            >
              Número do cartão
            </label>
            <CardNumberElement
              className={`${stripeInputField} ${isDisabled && stripeInputFieldDisabled} ${isDisabled && stripeInputFieldDisabled} ${errors.cardNumber && stripeInputFieldError}`}
              options={createElementOptions(isDisabled, "cardElement")}
              onChange={handleCardChange("cardNumber")}
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

          <div className={inputFieldWrapper}>
            <label
              className={`${stripeLabel} ${isDisabled && stripeLabelDisabled} `}
            >
              Data de vencimento
            </label>
            <CardExpiryElement
              className={`${stripeInputField} ${isDisabled && stripeInputFieldDisabled} ${errors.cardExpiry && stripeInputFieldError}`}
              options={createElementOptions(isDisabled)}
              onChange={handleCardChange("cardExpiry")}
            />
            {errors.cardExpiry && (
              <div className={stripeError}>{errors.cardExpiry}</div>
            )}
          </div>

          <div className={inputFieldWrapper}>
            <label
              className={`${stripeLabel} ${isDisabled && stripeLabelDisabled} `}
            >
              CVC
            </label>
            <CardCvcElement
              className={`${stripeInputField} ${isDisabled && stripeInputFieldDisabled} ${errors.cardCvc && stripeInputFieldError}`}
              options={createElementOptions(isDisabled)}
              onChange={handleCardChange("cardCvc")}
            />
            {errors.cardCvc && (
              <div className={stripeError}>{errors.cardCvc}</div>
            )}
          </div>
        </div>

        <div className={formButtonContainer}>
          <Button
            type="button"
            variant="outlined"
            onClick={onBack}
            disabled={isDisabled}
          >
            Voltar
          </Button>

          <Button
            type="submit"
            disabled={!isFormValid() || isDisabled || !stripe}
          >
            Próximo
          </Button>
        </div>
      </form>
    </>
  );
};

export default function PaymentMethod(props: PaymentMethodProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentMethodForm {...props} />
    </Elements>
  );
}
