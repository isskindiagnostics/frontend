import Sidebar from "@/components/Sidebar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Análise",
  description: "Description specific to this page",
};

export default function Signup() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar currentPage={"analysis"} />
    </div>
  );
}
