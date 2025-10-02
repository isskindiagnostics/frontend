import { useElements, useStripe } from "@stripe/react-stripe-js";
import { CardNumberElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { useShowToast } from "@/hooks/useShowToast";
import { useUserData } from "@/hooks/useUserData";

import {
  ChargeResponse,
  PurchaseWithNewCardParams,
  PurchaseWithSavedCardParams,
} from "../types";

export function usePurchaseFlow() {
  const { userData, refreshUserData } = useUserData();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useShowToast();
  const [successMessage, setSuccessMessage] = useShowToast();

  const handlePurchaseWithSavedCard = async (quantity: number) => {
    const defaultCard = userData?.subscription?.stripeData?.savedCards?.find(
      (card) => card.isDefault
    );

    if (!userData?.subscription?.stripeData?.customerId || !defaultCard) {
      setErrorMessage("Método de pagamento não encontrado");
      return;
    }

    setIsProcessing(true);

    try {
      const params: PurchaseWithSavedCardParams = {
        customerId: userData.subscription.stripeData.customerId,
        paymentMethodId: defaultCard.id,
        userId: user?.uid || "",
        userName: userData.userData.name,
        userEmail: user?.email || "",
        quantity,
      };

      const response = await fetch("/api/stripe/charge-flex-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Response is not JSON:", await response.text());
        throw new Error("Erro no servidor. Resposta inválida recebida.");
      }

      const data: ChargeResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha ao processar pagamento");
      }

      // Handle 3D Secure if required
      if (data.requiresAction && data.clientSecret) {
        if (!stripe) {
          throw new Error("Stripe não carregado");
        }

        const { error: confirmError } = await stripe.confirmCardPayment(
          data.clientSecret
        );

        if (confirmError) {
          throw new Error(confirmError.message);
        }
      }

      setSuccessMessage(
        `${quantity} ${quantity === 1 ? "análise comprada" : "análises compradas"} com sucesso! Redirecionando...`
      );
      setTimeout(() => router.push("/subscription"), 2000);
    } catch (error) {
      console.error("Error purchasing analysis:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao processar pagamento"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveNewCard = async (cardholderName: string) => {
    if (!stripe || !elements) {
      setErrorMessage("Stripe não carregado. Por favor, recarregue a página.");
      return false;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      setErrorMessage("Elemento de cartão não encontrado");
      return false;
    }

    // Validate user authentication
    const userId = user?.uid;
    if (!userId) {
      setErrorMessage("Usuário não autenticado.");
      return false;
    }

    setIsProcessing(true);

    try {
      // Get or create customer ID
      let customerId = userData?.subscription?.stripeData?.customerId;

      // If no customer ID exists (flex users), create one first
      if (!customerId) {
        const createCustomerResponse = await fetch(
          "/api/stripe/create-customer",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              email: user?.email || "",
              name: userData?.userData.name || "",
            }),
          }
        );

        const contentType = createCustomerResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error(
            "Response is not JSON:",
            await createCustomerResponse.text()
          );
          throw new Error("Erro no servidor. Resposta inválida recebida.");
        }

        const customerData = await createCustomerResponse.json();

        if (!createCustomerResponse.ok) {
          throw new Error(
            customerData.error || "Falha ao criar cliente no Stripe"
          );
        }

        customerId = customerData.customerId;

        // Refresh user data to get the new customer ID
        await refreshUserData();
      }

      // Create payment method with cardholder name
      const { error: pmError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardNumberElement,
          billing_details: {
            name: cardholderName,
          },
        });

      if (pmError || !paymentMethod) {
        throw new Error(
          pmError?.message || "Falha ao criar método de pagamento"
        );
      }

      // Save card by attaching to customer
      const response = await fetch("/api/stripe/save-payment-method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          paymentMethodId: paymentMethod.id,
          userId,
          setAsDefault: true,
          cardholderName,
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Response is not JSON:", await response.text());
        throw new Error("Erro no servidor. Resposta inválida recebida.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha ao salvar cartão");
      }

      setSuccessMessage("Cartão salvo com sucesso!");
      await refreshUserData();
      return true;
    } catch (error) {
      console.error("Error saving card:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao salvar cartão"
      );
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePurchaseWithNewCard = async (
    quantity: number,
    cardholderName: string
  ) => {
    if (!stripe || !elements) {
      setErrorMessage("Stripe não carregado. Por favor, recarregue a página.");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      setErrorMessage("Elemento de cartão não encontrado");
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment method with cardholder name
      const { error: pmError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardNumberElement,
          billing_details: {
            name: cardholderName,
          },
        });

      if (pmError || !paymentMethod) {
        throw new Error(
          pmError?.message || "Falha ao criar método de pagamento"
        );
      }

      const params: PurchaseWithNewCardParams = {
        customerId: userData?.subscription?.stripeData?.customerId || "",
        paymentMethodId: paymentMethod.id,
        userId: user?.uid || "",
        saveCard: true,
        userName: userData?.userData.name || "",
        userEmail: user?.email || "",
        quantity,
        cardholderName,
      };

      // Charge for the analysis
      const response = await fetch("/api/stripe/charge-flex-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Response is not JSON:", await response.text());
        throw new Error("Erro no servidor. Resposta inválida recebida.");
      }

      const data: ChargeResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha ao processar pagamento");
      }

      // Handle 3D Secure if required
      if (data.requiresAction && data.clientSecret) {
        const { error: confirmError } = await stripe.confirmCardPayment(
          data.clientSecret
        );

        if (confirmError) {
          throw new Error(confirmError.message);
        }
      }

      setSuccessMessage(
        `${quantity} ${quantity === 1 ? "análise comprada" : "análises compradas"} com sucesso! Redirecionando...`
      );
      setTimeout(() => router.push("/subscription"), 2000);
    } catch (error) {
      console.error("Error purchasing analysis:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao processar pagamento"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    errorMessage,
    successMessage,
    handlePurchaseWithSavedCard,
    handleSaveNewCard,
    handlePurchaseWithNewCard,
  };
}
