"use client";

import { IconLink } from "isskinui";
import { useRouter } from "next/navigation";

const RestartAnalysis = () => {
  const router = useRouter();

  return (
    <IconLink icon="Redo" onClick={() => router.push("/analysis")}>
      Reiniciar
    </IconLink>
  );
};

export default RestartAnalysis;
