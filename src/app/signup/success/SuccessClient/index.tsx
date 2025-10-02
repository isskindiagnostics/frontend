"use client";

import { Button } from "isskinui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Confetti from "@/assets/images/confetti.png";
import SmallLogo from "@/assets/svgs/SmallLogo";
import { useAuth } from "@/context/AuthContext";

import * as completeStyles from "../../complete/index.css";

import * as styles from "./index.css";

export default function SuccessClient() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  return (
    <div className={completeStyles.container}>
      <div className={completeStyles.header}>
        <SmallLogo className={completeStyles.logo} />
      </div>

      <main className={styles.main}>
        <div className={styles.imageWrapper}>
          <Image src={Confetti} alt="" width={253} height={253} />
        </div>
        <div className={styles.textContainer}>
          <h1>Tudo pronto!</h1>
          <p>
            Agora você já pode começar a usar a plataforma e realizar análises
            de lesões.
          </p>
        </div>
        <Button onClick={() => router.push("/analysis")}>Vamos lá!</Button>
      </main>
    </div>
  );
}
