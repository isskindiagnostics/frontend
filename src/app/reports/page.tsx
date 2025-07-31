import { container, main } from "@/app/global.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

import Search from "./Search";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relatórios",
  description:
    "Visualize e baixe os relatórios gerados a partir das análises de lesões cutâneas realizadas em seus pacientes.",
  robots: "noindex, nofollow",
};

export default function Reports() {
  return (
    <div className={container}>
      <Sidebar currentPage={"reports"} />
      <main className={main}>
        <TopBar title="Relatórios">
          <Search />
        </TopBar>
      </main>
    </div>
  );
}
