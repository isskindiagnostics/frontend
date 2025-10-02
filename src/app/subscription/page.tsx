import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

import { container } from "../global.css";

import { main } from "./index.css";
import SubscriptionClient from "./SubscriptionClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assinatura",
  description: "",
};

export default function Subscription() {
  return (
    <div className={container}>
      <Sidebar currentPage="subscription" />
      <main className={main}>
        <TopBar title="Assinatura" />
        <SubscriptionClient />
      </main>
    </div>
  );
}
