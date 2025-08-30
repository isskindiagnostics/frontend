"use client";
import { useState } from "react";

import ContentBlock from "@/components/ContentBlock";
import Tabs from "@/components/Tabs";
import { TabElement } from "@/components/Tabs/TabItem";

import AccountTab from "./AccountTab";
import { container, contentWrapper } from "./index.css";

type TabOptions = "account" | "data";

const SettingsClient = () => {
  const [currentTab, setCurrentTab] = useState<TabOptions>("account");

  const tabs: TabElement[] = [
    {
      label: "Conta",
      selected: currentTab === "account",
      onSelect: () => setCurrentTab("account"),
    },
    {
      label: "Dados",
      selected: currentTab === "data",
      onSelect: () => setCurrentTab("data"),
    },
  ];

  return (
    <div className={container}>
      <Tabs tabs={tabs} />
      <div className={contentWrapper}>
        {currentTab === "account" ? (
          <AccountTab />
        ) : (
          <ContentBlock></ContentBlock>
        )}
      </div>
    </div>
  );
};

export default SettingsClient;
