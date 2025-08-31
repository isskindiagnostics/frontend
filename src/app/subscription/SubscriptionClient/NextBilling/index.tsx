"use client";
import { CardFlag } from "isskinui";

import { formatPrice } from "@/components/PricingCard";
import { useUserData } from "@/hooks/useUserData";
import { SUBSCRIPTION_PLANS } from "@/stripe/config";
import { getNextBillingDate } from "@/stripe/utils";

import * as styles from "./index.css";

const NextBilling = () => {
  const { userData } = useUserData();
  const endDate = userData?.subscription.endDate;
  const billingCycleAnchor =
    userData?.subscription.stripeData?.billingCycleAnchor;
  const nextBilling = getNextBillingDate(billingCycleAnchor, endDate);
  const cardHolder = userData?.userData.name;
  const defaultCard = userData?.subscription.stripeData?.savedCards?.find(
    (card) => card.isDefault
  );

  return (
    <div className={styles.container}>
      <div className={styles.topWrapper}>
        <div>
          <p className={styles.smallText}>Próximo pagamento</p>
          <p className={styles.textHighlight}>{nextBilling}</p>
        </div>

        <div>
          <p className={styles.smallText}>Total à pagar</p>
          <p className={styles.textHighlight}>
            {formatPrice(SUBSCRIPTION_PLANS.premium.price)}
          </p>
        </div>
      </div>

      <div className={styles.cardContainer}>
        <CardFlag flag="visa" className={styles.cardFlag} />
        <div className={styles.cardDetails}>
          <p className={styles.smallText}>{cardHolder}</p>
          <div className={styles.circleContainer}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={styles.circleGroup}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={styles.circle}></div>
                ))}
              </div>
            ))}
            <p className={styles.smallText}>{defaultCard?.last4}</p>
          </div>
          <p className={styles.smallText}>
            Expira em {defaultCard?.expMonth?.toString().padStart(2, "0")}/
            {defaultCard?.expYear?.toString().slice(-2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NextBilling;
