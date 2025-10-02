"use client";
import { Switch } from "isskinui";
// import { useState } from "react";

import ContentBlock from "@/components/ContentBlock";
import { useUserData } from "@/hooks/useUserData";

import { titleWrapper, blocks, contentWrapper } from "./index.css";
import NextBilling from "./NextBilling";
import PaymentMethods from "./PaymentMethods";
import SubscriptionOverview from "./SubscriptionOverview";

const PlanTab = () => {
  // const [toggle, setToggle] = useState(false);
  const { userData } = useUserData();
  const status = userData?.subscription.status;
  const subscriptionType = userData?.subscription.plan;

  return (
    <div className={contentWrapper}>
      <ContentBlock>
        <div className={titleWrapper}>
          <h3>Seu plano</h3>
          <Switch
            label="Renovar automaticamente"
            toggle={true}
            disabled={true}
            // toggle={toggle}
            // onClick={() => setToggle(!toggle)}
          />
        </div>

        <p>
          Configure sua assinatura e escolha o plano que melhor atende às suas
          necessidades.
        </p>

        <div className={blocks}>
          <SubscriptionOverview href="/pricing" />

          {status !== "canceled" ||
            (subscriptionType !== "flex" && <NextBilling />)}
        </div>
      </ContentBlock>

      <PaymentMethods />
    </div>
  );
};

export default PlanTab;
