import { Timestamp } from "firebase/firestore";
import { Button, IconLink, Notification, PopUp } from "isskinui";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { formatPrice } from "@/components/PricingCard";
import { useShowToast } from "@/hooks/useShowToast";
import { useUserData } from "@/hooks/useUserData";
import { SUBSCRIPTION_PLANS } from "@/stripe/config";
import { formatDate } from "@/utils/date";

import {
  button,
  container,
  iconLink,
  memberDate,
  price,
  summary,
  title,
} from "./index.css";

type SubscriptionOverviewProps = {
  href?: string;
};

export const cancellationEndDate = (
  billingCycleAnchor?: Timestamp,
  startDate?: Timestamp | null
): string => {
  if (billingCycleAnchor) {
    // If we have billing cycle anchor, that's when the next billing would be
    return formatDate(billingCycleAnchor, "long");
  }

  if (startDate) {
    // Fallback: calculate based on start date + 1 month
    const start = startDate.toDate();
    const nextBilling = new Date(
      start.getFullYear(),
      start.getMonth() + 1,
      start.getDate()
    );
    return formatDate(nextBilling.toDateString(), "long");
  }

  // Last resort: 30 days from now
  const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  return formatDate(futureDate.toDateString(), "long");
};

const SubscriptionOverview = ({ href }: SubscriptionOverviewProps) => {
  const { userData } = useUserData();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const memberSince = userData?.subscription.startDate;
  const [showReactivateModal, setShowReactivateModal] =
    useState<boolean>(false);
  const [reactivateSuccessMsg, setReactivateSuccessMsg] = useShowToast();

  const plan = userData?.subscription.plan;
  const status = userData?.subscription.status;
  const analysisCount = userData?.subscription.usage?.analysisCount;
  const analysisLimit = userData?.subscription.usage?.analysisLimit;
  const startDate = userData?.subscription.startDate;
  const endDate = userData?.subscription.endDate;
  const billingCycleAnchor =
    userData?.subscription.stripeData?.billingCycleAnchor;

  const handleReactivateSubscription = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/stripe/reactivate-subscription", {
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
        throw new Error(errorData.error || "Falha ao reativar assinatura");
      }

      const result = await response.json();
      console.log("Subscription reactivated:", result);

      setReactivateSuccessMsg("Assinatura reativada com sucesso!");

      // Optionally reload the page to refresh user data
      window.location.reload();
    } catch (error) {
      console.error("Erro ao reativar assinatura:", error);
      alert(
        `Erro ao reativar assinatura: ${error instanceof Error ? error.message : "Tente novamente."}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderSubscriptionButton = () => {
    if (plan === "free") {
      return (
        <IconLink
          icon="ExternalLink"
          className={iconLink}
          href={href}
          target="_blank"
        >
          Saiba mais sobre assinaturas
        </IconLink>
      );
    }

    if (status === "canceled" && endDate) {
      return (
        <Button
          className={button}
          onClick={() => setShowReactivateModal(true)}
          disabled={isLoading}
        >
          Reativar Assinatura
        </Button>
      );
    }

    return (
      <Button
        className={button}
        onClick={() => router.push("/subscription/feedback")}
      >
        Cancelar Assinatura
      </Button>
    );
  };

  return (
    <>
      {showReactivateModal && (
        <PopUp
          width={396}
          title="Gostaria de reativar sua assinatura?"
          text={`Sua assinatura no valor de **${formatPrice(SUBSCRIPTION_PLANS.premium.price)}** será restaurada com as mesmas condições do plano anterior, e a próxima cobrança será feita em **${cancellationEndDate(billingCycleAnchor, startDate)}**. Você poderá cancelar novamente a qualquer momento nas configurações.`}
          textAlign="left"
          primaryButton={{
            label: "Reativar",
            onClick: () => {
              handleReactivateSubscription();
              setShowReactivateModal(false);
            },
          }}
          secondaryButton={{
            label: "Voltar",
            onClick: () => setShowReactivateModal(false),
          }}
        />
      )}

      {reactivateSuccessMsg && (
        <Notification type="success" label={reactivateSuccessMsg} />
      )}

      <div className={container}>
        <div className={summary}>
          <div>
            <div>
              <p className={title}>{plan === "free" ? "Básico" : "Premium"}</p>
              {status === "canceled" ? (
                <p className={memberDate}>
                  Expira em {formatDate(endDate || "", "long")}
                </p>
              ) : (
                <p className={memberDate}>
                  Membro desde {formatDate(memberSince || "", "long")}
                </p>
              )}
            </div>
          </div>

          <p className={price}>
            {analysisCount}/{analysisLimit} análises
          </p>
        </div>

        {renderSubscriptionButton()}
      </div>
    </>
  );
};

export default SubscriptionOverview;
