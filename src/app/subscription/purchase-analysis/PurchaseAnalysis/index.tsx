"use client";

import { Button, Notification } from "isskinui";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { container, main } from "@/app/global.css";
import { formButtonContainer } from "@/components/CompleteSignup/index.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useUserData } from "@/hooks/useUserData";
import { SUBSCRIPTION_PLANS } from "@/stripe/config";

import BillingAddressForm from "../BillingAddressForm";
import { useBillingAddress } from "../hooks/useBillingAddress";
import { useCardForm } from "../hooks/useCardForm";
import { usePurchaseFlow } from "../hooks/usePurchaseFlow";
import { billingWrapper } from "../index.css";
import NewCardForm from "../NewCardForm";
import PaymentMethod from "../PaymentMethod";
import QuantitySelector from "../QuantitySelector";

export default function PurchaseAnalysisForm() {
  const { userData } = useUserData();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [useNewCard, setUseNewCard] = useState(false);

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

  const {
    isProcessing,
    errorMessage,
    successMessage,
    handlePurchaseWithSavedCard,
    handleSaveNewCard,
  } = usePurchaseFlow();

  const hasPaymentMethod =
    userData?.subscription?.stripeData?.savedCards &&
    (userData?.subscription?.stripeData?.savedCards.length > 1 ||
      userData.subscription.stripeData.savedCards[0].brand !== ""); // TODO IMPROVE THIS

  const defaultCard = userData?.subscription?.stripeData?.savedCards?.find(
    (card) => card.isDefault
  );

  const cardHolder = userData?.userData.name;
  const flexPrice = SUBSCRIPTION_PLANS.flex.price;
  const totalPrice = flexPrice * quantity;

  const handlePurchase = async () => {
    await handlePurchaseWithSavedCard(quantity);
  };

  const handleSaveCard = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCardholderName(cardholderName)) {
      return;
    }

    const success = await handleSaveNewCard(cardholderName);
    if (success) {
      setUseNewCard(false);
      router.push("/subscription/purchase-analysis");
      resetCardForm();
    }
  };

  const handleBackToSavedCard = () => {
    setUseNewCard(false);
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

        {!useNewCard ? (
          <div style={{ display: "flex", gap: 38 }}>
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
              totalPrice={totalPrice}
              isProcessing={isProcessing}
              onCancel={() => router.push("/subscription")}
              onPurchase={handlePurchase}
              hasPaymentMethod={!!hasPaymentMethod}
            />

            <PaymentMethod
              hasPaymentMethod={!!hasPaymentMethod}
              defaultCard={defaultCard}
              cardHolder={cardHolder}
              onAddNewCard={() => setUseNewCard(true)}
              isProcessing={isProcessing}
            />
          </div>
        ) : (
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
                onClick={() => setUseNewCard(false)}
              >
                Voltar
              </Button>

              <Button
                onClick={handleSaveCard}
                disabled={
                  isProcessing || !isCardFormValid() || !isAddressFormValid()
                }
                variant="solid"
              >
                Salvar cartão
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
