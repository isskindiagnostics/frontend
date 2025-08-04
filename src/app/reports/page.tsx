import { Metadata } from "next";
import { Suspense } from "react";

import Sidebar from "@/components/Sidebar";

import { container } from "../global.css";

import ReportsContent from "./ReportsContent";
import ReportsSkeleton from "./ReportsSkeleton";

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
      <Suspense fallback={<ReportsSkeleton />}>
        <ReportsContent />
      </Suspense>
    </div>
  );
}
