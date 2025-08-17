"use client";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, InputField, Notification } from "isskinui";
import React, { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { stripePromise } from "@/stripe/config";
import {
  stepForm,
  formHeading,
  stripeLabel,
  stripeInputField,
  inputFieldWrapper,
  twoFieldsRow,
  formButtonContainer,
} from "../index.css";

// Stripe Elements styling
const elementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      fontFamily: "Inter, sans-serif",
      "::placeholder": {
        color: "#aab7c4",
      },
      padding: "12px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

interface PaymentMethodProps {
  onNext: (paymentMethodId: string) => void;
  onBack?: () => void;
  isSubmitting?: boolean;
}

// Inner component that uses Stripe hooks
function PaymentMethodForm({
  onNext,
  onBack,
  isSubmitting,
}: PaymentMethodProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  const [cardholderName, setCardholderName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  const isFormValid = () => {
    return (
      cardholderName.trim().length >= 2 &&
      cardComplete.cardNumber &&
      cardComplete.cardExpiry &&
      cardComplete.cardCvc
    );
  };

  // Replace the handleSubmit function in your component with this enhanced version

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Pagamento não foi carregado. Tente novamente.");
      return;
    }

    if (!isFormValid()) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const cardNumberElement = elements.getElement(CardNumberElement);

      if (!cardNumberElement) {
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
        throw new Error(paymentMethodError.message);
      }

      if (!paymentMethod) {
        throw new Error("Falha ao criar método de pagamento");
      }

      // Create customer with enhanced error handling
      let customerId = "";
      try {
        const customerResponse = await fetch("/api/stripe/create-customer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.uid,
            email: user?.email,
            name: cardholderName,
          }),
        });

        // Get the response text first
        const responseText = await customerResponse.text();

        if (!customerResponse.ok) {
          // If it starts with HTML, it's likely a Next.js error page
          if (
            responseText.trim().startsWith("<!DOCTYPE") ||
            responseText.trim().startsWith("<html")
          ) {
            throw new Error(
              `API route not found or returning HTML error page. Status: ${customerResponse.status}`
            );
          }

          try {
            const errorData = JSON.parse(responseText);
            throw new Error(
              errorData.error || `HTTP ${customerResponse.status}`
            );
          } catch (parseError) {
            throw new Error(`API error: ${responseText}`);
          }
        }

        try {
          const customerData = JSON.parse(responseText);
          customerId = customerData.customerId;
        } catch (parseError) {
          throw new Error("Invalid JSON response from customer API");
        }
      } catch (customerError) {
        console.error("Customer creation error:", customerError);
        throw new Error(
          "Erro ao processar informações do cliente: " +
            (customerError as Error).message
        );
      }

      // Create subscription with enhanced error handling
      try {
        const subscriptionResponse = await fetch(
          "/api/stripe/create-subscription",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customerId,
              paymentMethodId: paymentMethod.id,
              userId: user?.uid,
            }),
          }
        );

        const responseText = await subscriptionResponse.text();

        if (!subscriptionResponse.ok) {
          if (
            responseText.trim().startsWith("<!DOCTYPE") ||
            responseText.trim().startsWith("<html")
          ) {
            throw new Error(
              `Subscription API route not found or returning HTML error page. Status: ${subscriptionResponse.status}`
            );
          }

          try {
            const errorData = JSON.parse(responseText);
            throw new Error(
              errorData.error || `HTTP ${subscriptionResponse.status}`
            );
          } catch (parseError) {
            throw new Error(`Subscription API error: ${responseText}`);
          }
        }

        let subscriptionData;
        try {
          subscriptionData = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error("Invalid JSON response from subscription API");
        }

        // If payment requires confirmation (3D Secure, etc.)
        if (subscriptionData.clientSecret) {
          const { error: confirmError } = await stripe.confirmCardPayment(
            subscriptionData.clientSecret
          );

          if (confirmError) {
            throw new Error(confirmError.message);
          }
        }

        // Success - move to next step
        onNext(paymentMethod.id);
      } catch (subscriptionError) {
        console.error("Subscription creation error:", subscriptionError);
        throw subscriptionError;
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Erro ao processar pagamento. Tente novamente.");
    } finally {
      setProcessing(false);
    }
  };

  const handleCardChange = (elementType: string) => (event: any) => {
    setCardComplete((prev) => ({
      ...prev,
      [elementType]: event.complete,
    }));

    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  return (
    <>
      {error && <Notification type="error" label={error} />}
      <div className={stepForm}>
        <div className={formHeading}>
          <h2>Informações de Pagamento</h2>
          <p>Digite os dados do seu cartão para ativar o plano Premium.</p>
        </div>

        <form className={stepForm} onSubmit={handleSubmit}>
          <InputField
            label="Nome no cartão"
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="Digite o nome como está no cartão"
            width="100%"
            required
            disabled={processing || isSubmitting}
          />

          <div className={inputFieldWrapper}>
            <label className={stripeLabel}>Número do cartão</label>

            <CardNumberElement
              className={stripeInputField}
              options={elementOptions}
              onChange={handleCardChange("cardNumber")}
              // disabled={processing || isSubmitting}
            />
          </div>

          <div className={twoFieldsRow}>
            <div className={inputFieldWrapper}>
              <label className={stripeLabel}>Data de vencimento</label>

              <CardExpiryElement
                className={stripeInputField}
                options={elementOptions}
                onChange={handleCardChange("cardExpiry")}
                // disabled={processing || isSubmitting}
              />
            </div>

            <div className={inputFieldWrapper}>
              <label className={stripeLabel}>CVC</label>

              <CardCvcElement
                className={stripeInputField}
                options={elementOptions}
                onChange={handleCardChange("cardCvc")}
                // disabled={processing || isSubmitting}
              />
            </div>
          </div>

          <div className={formButtonContainer}>
            <Button
              type="button"
              variant="outlined"
              onClick={onBack}
              disabled={processing || isSubmitting}
            >
              Voltar
            </Button>

            <Button
              type="submit"
              variant="solid"
              disabled={!isFormValid() || processing || isSubmitting || !stripe}
            >
              {processing || isSubmitting ? "Processando..." : "Ativar Plano"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

// Main component that provides Stripe Elements context
export default function PaymentMethod(props: PaymentMethodProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentMethodForm {...props} />
    </Elements>
  );
}
