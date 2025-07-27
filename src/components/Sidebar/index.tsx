"use client";

import { ChartPie, Document, Logout, Money, Settings } from "isskinui";
import { useRouter } from "next/navigation";

import Logo from "@/assets/icons/Logo";

import {
  container,
  logoContainer,
  subsection,
  subline,
  logout,
} from "./index.css";
import SidebarItem from "./SidebarItem";

export type Pages = "analysis" | "reports" | "subscription" | "settings";

type SidebarProps = {
  currentPage: Pages;
  onClick?: () => void;
};

const Sidebar = ({ currentPage, onClick }: SidebarProps) => {
  const router = useRouter();

  const handleClick = (page?: Pages) => {
    if (page) {
      router.push(`/${page}`);
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={container}>
      <div className={logoContainer}>
        <Logo />
      </div>

      <div className={subsection}>
        <p className={subline}>Geral</p>
        <SidebarItem
          label="Análise"
          icon={<ChartPie width={22} height={22} />}
          selected={currentPage === "analysis"}
          onClick={() => currentPage !== "analysis" && handleClick("analysis")}
        />
        <SidebarItem
          label="Relatórios"
          icon={<Document width={22} height={22} />}
          selected={currentPage === "reports"}
          onClick={() => currentPage !== "reports" && handleClick("reports")}
        />
      </div>

      <div className={subsection}>
        <p className={subline}>Recursos</p>

        <SidebarItem
          label="Assinatura"
          icon={<Money width={22} height={22} />}
          selected={currentPage === "subscription"}
          onClick={() =>
            currentPage !== "subscription" && handleClick("subscription")
          }
        />
        <SidebarItem
          label="Configurações"
          icon={<Settings width={22} height={22} />}
          selected={currentPage === "settings"}
          onClick={() => currentPage !== "settings" && handleClick("settings")}
        />
      </div>

      <SidebarItem
        className={logout}
        label="Sair"
        icon={<Logout width={22} height={22} />}
        onClick={() => console.log("To implement")}
      />
    </div>
  );
};

export default Sidebar;
