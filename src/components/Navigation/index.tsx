"use client";

import { Button } from "isskinui";
import { useRouter } from "next/navigation";

import Logo from "@/assets/icons/Logo";

import { nav } from "./index.css";

const Navigation = () => {
  const router = useRouter();
  return (
    <nav className={nav}>
      <Logo />
      <Button onClick={() => router.push("/analysis")}>
        acessar plataforma
      </Button>
    </nav>
  );
};
export default Navigation;
