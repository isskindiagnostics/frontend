"use client";
import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { heroSection, heroHeading } from "./index.css";
import LeftCube from "./LeftCube";
import RightCube from "./RightCube";

const Hero = () => {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const leftCubeY = useTransform(scrollYProgress, [0, 1], ["-75%", "-40%"]);
  const rightCubeY = useTransform(scrollYProgress, [0, 1], ["-55%", "-80%"]);

  return (
    <section ref={targetRef} className={heroSection}>
      <h1 className={heroHeading}>O futuro do diagnóstico de câncer de pele</h1>

      <LeftCube style={{ bottom: leftCubeY }} />
      <RightCube style={{ top: rightCubeY }} />
    </section>
  );
};

export default Hero;
