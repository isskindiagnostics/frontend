"use client";

// import { Switch } from "isskinui";
// import { useState } from "react";

import ContentBlock from "@/components/ContentBlock";
import Tabs from "@/components/Tabs";
import { TabElement } from "@/components/Tabs/TabItem";

import { container, titleWrapper, blocks, contentWrapper } from "./index.css";
// import NextBilling from "./NextBilling";
// import PaymentMethods from "./PaymentMethods";
import SubscriptionOverview from "./SubscriptionOverview";

const tabs: TabElement[] = [
  {
    label: "Plano",
    selected: true,
    onSelect: () => console.log("clicked"),
  },
  {
    label: "Faturas",
    selected: false,
    onSelect: () => console.log("clicked"),
  },
];

const SubscriptionClient = () => {
  // const [toggle, setToggle] = useState(false);

  // TODO: IMPLEMENT LOADING SCREEN 
  return (
    <div className={container}>
      <Tabs tabs={tabs} />
      <div className={contentWrapper}>
        <ContentBlock>
          <div className={titleWrapper}>
            <h3>Seu plano</h3>
            {/* <Switch
              label="Renovar automaticamente"
              toggle={toggle}
              onClick={() => setToggle(!toggle)}
            /> */}
          </div>

          <p>
            Configure sua assinatura e escolha o plano que melhor atende às suas
            necessidades.
          </p>

          <div className={blocks}>
            <SubscriptionOverview onClick={() => console.log("TODO")} />
            {/* <NextBilling /> */}
          </div>
        </ContentBlock>

        {/* <PaymentMethods /> */}
      </div>
    </div>
  );
};

export default SubscriptionClient;
