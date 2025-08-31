import { container } from "@/app/global.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

import { main } from "../index.css";

import FeedbackClient from "./FeedbackClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancelar Assinatura | Isskin",
  description: "",
};

export default function SubscriptionFeedback() {
  return (
    <div className={container}>
      <Sidebar currentPage="subscription" />
      <main className={main}>
        <TopBar title="Assinatura" />
        <FeedbackClient />
      </main>
    </div>
  );
}
