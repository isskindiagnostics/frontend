"use client";

import { Button, Notification } from "isskinui";
import { useRouter } from "next/navigation";

import { container, main } from "@/app/global.css";
import { formButtonContainer } from "@/components/CompleteSignup/index.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useUserData } from "@/hooks/useUserData";

import BillingAddressForm from "../../purchase-analysis/BillingAddressForm";
import { useBillingAddress } from "../../purchase-analysis/hooks/useBillingAddress";
import { useCardForm } from "../../purchase-analysis/hooks/useCardForm";
import { usePurchaseFlow } from "../../purchase-analysis/hooks/usePurchaseFlow";
import { billingWrapper } from "../../purchase-analysis/index.css";
import NewCardForm from "../../purchase-analysis/NewCardForm";

export default function AddCardContent() {
  const { userData } = useUserData();
  const router = useRouter();

  const {
    cardBrand,
    errors,
    cardholderName,
    cardholderNameError,
    setCardholderName,
    handleCardChange,
    validateCardholderName,
    isCardFormValid,
    resetCardForm,
  } = useCardForm();

  const {
    formData,
    addressErrors,
    isCheckingPostalCode,
    handlePostalCodeChange,
    updateFormData,
    isFormValid: isAddressFormValid,
  } = useBillingAddress();

  const { isProcessing, errorMessage, successMessage, handleSaveNewCard } =
    usePurchaseFlow();

  const hasPaymentMethod =
    userData?.subscription?.stripeData?.savedCards &&
    (userData?.subscription?.stripeData?.savedCards.length > 1 ||
      userData.subscription.stripeData.savedCards[0].brand !== ""); // TODO IMPROVE THIS

  const handleSaveCard = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCardholderName(cardholderName)) {
      return;
    }

    const success = await handleSaveNewCard(cardholderName);
    if (success) {
      router.push("/subscription");
      resetCardForm();
    }
  };

  const handleBackToSavedCard = () => {
    resetCardForm();
  };

  const handleCardholderNameChange = (name: string) => {
    setCardholderName(name);
    if (cardholderNameError) {
      validateCardholderName(name);
    }
  };

  return (
    <div className={container}>
      {errorMessage && <Notification type="error" label={errorMessage} />}
      {successMessage && <Notification type="success" label={successMessage} />}

      <Sidebar currentPage="subscription" />
      <main className={main}>
        <TopBar title="Assinatura" />

        <div className={billingWrapper}>
          <div style={{ display: "flex", gap: 38, width: "100%" }}>
            <NewCardForm
              cardholderName={cardholderName}
              onCardholderNameChange={handleCardholderNameChange}
              cardholderNameError={cardholderNameError}
              cardBrand={cardBrand}
              errors={errors}
              isProcessing={isProcessing}
              onCardNumberChange={handleCardChange("cardNumber")}
              onCardExpiryChange={handleCardChange("cardExpiry")}
              onCardCvcChange={handleCardChange("cardCvc")}
              hasPaymentMethod={!!hasPaymentMethod}
              onBackToSavedCard={handleBackToSavedCard}
            />

            <BillingAddressForm
              formData={formData}
              onFormDataChange={updateFormData}
              addressErrors={addressErrors}
              isProcessing={isProcessing}
              isCheckingPostalCode={isCheckingPostalCode}
              onPostalCodeChange={handlePostalCodeChange}
            />
          </div>

          <div className={formButtonContainer}>
            <Button
              variant="outlined"
              disabled={isProcessing}
              onClick={() => router.push("/subscription")}
            >
              Voltar
            </Button>

            <Button
              onClick={handleSaveCard}
              disabled={
                isProcessing || !isCardFormValid() || !isAddressFormValid()
              }
              variant="outlined"
            >
              Salvar cartão
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
