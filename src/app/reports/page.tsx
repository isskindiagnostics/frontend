import { Metadata } from "next";

import Sidebar from "@/components/Sidebar";

import { container } from "../global.css";

import ReportsContent from "./ReportsContent";

export const metadata: Metadata = {
  title: "Relatórios",
  description:
    "Visualize e baixe os relatórios gerados a partir das análises de lesões cutâneas realizadas em seus pacientes.",
  robots: "noindex, nofollow",
};

export default function Reports() {
  return (
    <div className={container}>
      <Sidebar currentPage="reports" />
      <ReportsContent />
    </div>
  );
}
