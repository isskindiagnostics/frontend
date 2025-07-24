import Sidebar from "@/components/Sidebar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relatórios",
  description: "Description specific to this page",
};

export default function Signup() {
  return (
    <div>
      <Sidebar currentPage={"reports"} />
    </div>
  );
}
