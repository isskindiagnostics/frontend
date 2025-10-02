"use client";
import { useState } from "react";

import Tabs from "@/components/Tabs";
import { TabElement } from "@/components/Tabs/TabItem";
import { useUserData } from "@/hooks/useUserData";

import SubscriptionSkeleton from "../SubscriptionSkeleton";

import InvoicesTab from "./InvoicesTab";
import PlanTab from "./PlanTab";
import { container } from "./PlanTab/index.css";

type TabOptions = "plan" | "invoices";

const SubscriptionClient = () => {
  const { isLoading } = useUserData();
  const [currentTab, setCurrentTab] = useState<TabOptions>("plan");

  const tabs: TabElement[] = [
    {
      label: "Plano",
      selected: currentTab === "plan",
      onSelect: () => setCurrentTab("plan"),
    },
    {
      label: "Faturas",
      selected: currentTab === "invoices",
      onSelect: () => setCurrentTab("invoices"),
    },
  ];

  if (isLoading) {
    return <SubscriptionSkeleton />;
  }

  return (
    <div className={container}>
      <Tabs tabs={tabs} />
      {currentTab === "plan" ? <PlanTab /> : <InvoicesTab />}
    </div>
  );
};

export default SubscriptionClient;
