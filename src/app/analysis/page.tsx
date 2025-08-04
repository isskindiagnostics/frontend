import { container } from "@/app/global.css";
import Sidebar from "@/components/Sidebar";

import AnalysisForm from "./AnalysisForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Análise",
  description:
    "Envie imagens para análise clínica automatizada de lesões cutâneas.",
  robots: "noindex, nofollow",
};

export default function Signup() {
  return (
    <div className={container}>
      <Sidebar currentPage={"analysis"} />
      <AnalysisForm />
    </div>
  );
}
