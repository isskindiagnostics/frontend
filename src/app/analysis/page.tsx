import Sidebar from "@/components/Sidebar";

import AnalysisForm from "./AnalysisForm";
import { container } from "./index.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Análise",
  description: "Description specific to this page",
};

export default function Signup() {
  return (
    <div className={container} style={{ display: "flex" }}>
      <Sidebar currentPage={"analysis"} />
      <AnalysisForm />
    </div>
  );
}
