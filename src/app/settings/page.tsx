import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

import { container } from "../global.css";

import { main } from "./index.css";
import SettingsClient from "./SettingsClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurações",
  description: "",
};

export default function Settings() {
  return (
    <div className={container}>
      <Sidebar currentPage="settings" />
      <main className={main}>
        <TopBar title="Configurações" />
        <SettingsClient />
      </main>
    </div>
  );
}
