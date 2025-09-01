"use client";
import { Timestamp } from "firebase/firestore";
import { Button, InputField, Notification, PopUp, Radio } from "isskinui";
import { useRouter } from "next/navigation";
import { useState } from "react";

import ContentBlock from "@/components/ContentBlock";
import { useShowToast } from "@/hooks/useShowToast";
import { useUserData } from "@/hooks/useUserData";
import { CancellationFeedback } from "@/types/subscription";

import { cancellationEndDate } from "../../SubscriptionClient/PlanTab/SubscriptionOverview";

import {
  cancellationButtonWrapper,
  cancellationNotice,
  feedbackForm,
  radioOptions,
  textWrapper,
} from "./index.css";

export default function FeedbackClient() {
  const router = useRouter();
  const { userData, updateUserData } = useUserData();

  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [additionalFeedback, setAdditionalFeedback] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useShowToast();

  const startDate = userData?.subscription.startDate;
  const billingCycleAnchor =
    userData?.subscription.stripeData?.billingCycleAnchor;

  const reasonOptions = [
    { label: "Não estou usando com frequência", value: "lowFrequency" },
    { label: "O preço está alto", value: "highPrice" },
    {
      label: "O app não atendeu às minhas expectativas",
      value: "unmetExpectations",
    },
    { label: "Tive problemas técnicos", value: "technicalProblems" },
    { label: "Outro motivo", value: "otherReason" },
  ];

  const handleCancelSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // First cancel the Stripe subscription
      const response = await fetch("/api/stripe/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: userData?.subscription.stripeData?.subscriptionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao cancelar assinatura");
      }

      // Create cancellation feedback object
      const cancellationFeedback: CancellationFeedback = {
        reason: selectedReason || "Não informado",
        ...(additionalFeedback && { feedback: additionalFeedback }),
        timestamp: Timestamp.now(),
        subscriptionType: userData?.subscription.plan || "premium",
      };

      const updatedHistory = [
        ...(userData?.subscription.cancellationHistory || []),
        cancellationFeedback,
      ];

      await updateUserData({
        "subscription.cancellationHistory": updatedHistory,
        "subscription.status": "canceled",
      });

      setShowConfirmationModal(true);
    } catch (error) {
      console.error("Error cancelling subscription:", error);

      setErrorMessage("Erro ao cancelar assinatura. Tente novamente depois.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {errorMessage && <Notification type="error" label={errorMessage} />}

      {showConfirmationModal && (
        <PopUp
          width={396}
          title="Sua assinatura foi cancelada"
          text={`Você poderá continuar usando todas as funcionalidades premium do app normalmente até **${cancellationEndDate(billingCycleAnchor, startDate)}**. Após essa data, você não poderá mais enviar imagens e poderá apenas visualizar resultados anteriores.`}
          textAlign="left"
          primaryButton={{
            label: "Concluir",
            onClick: () => {
              router.push("/subscription");
            },
          }}
        />
      )}

      <ContentBlock>
        <div className={textWrapper}>
          <h3>Antes, gostaríamos de saber sua opinião!</h3>
          <p>
            Por que você está cancelando sua assinatura? Sua resposta nos ajuda
            a melhorar o app.
          </p>
        </div>

        <form className={feedbackForm} onSubmit={handleCancelSubscription}>
          <div className={radioOptions}>
            {reasonOptions.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                checked={selectedReason === option.value}
                onChange={() => setSelectedReason(option.value)}
                label={option.label}
              />
            ))}
          </div>

          {selectedReason === "otherReason" && (
            <InputField
              label="Motivo (opcional)"
              type="text"
              width="100%"
              value={additionalFeedback}
              onChange={(e) => setAdditionalFeedback(e.target.value)}
            />
          )}

          <div>
            <p className={cancellationNotice}>
              Ao cancelar, você continuará com acesso ao app até o final do
              período atual.
            </p>

            <div className={cancellationButtonWrapper}>
              <Button
                variant="outlined"
                onClick={() => router.push("/subscription")}
                disabled={isLoading}
              >
                Voltar
              </Button>
              <Button type="submit" disabled={isLoading}>
                Cancelar Assinatura
              </Button>
            </div>
          </div>
        </form>
      </ContentBlock>
    </>
  );
}
