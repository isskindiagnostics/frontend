"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import {
  aboutSection,
  textWrapper,
  badgeHeadingWrapper,
  aboutBadge,
  aboutHeading,
  aboutText,
  imageWrapper,
  aboutImage,
  scrollWrapper,
} from "./index.css";

const About = () => {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0", "100px"]);
  const sectionY = useTransform(scrollYProgress, [0, 0.2], ["-60px", "-100px"]);

  return (
    <motion.section
      ref={targetRef}
      className={aboutSection}
      style={{ marginTop: sectionY }}
    >
      <div className={scrollWrapper}>
        <div className={textWrapper}>
          <div className={badgeHeadingWrapper}>
            <div className={aboutBadge}>Quem somos nós</div>
            <h2 className={aboutHeading}>
              A Isskin elimina meses de espera com análise inteligente de lesões
            </h2>
          </div>

          <p className={aboutText}>
            Nós criamos uma aplicação que analisa lesões cutâneas em segundos
            com alta precisão e detecta câncer de pele, permitindo que médicos
            de qualquer área identifiquem casos suspeitos rapidamente.
          </p>
        </div>

        <div className={imageWrapper}>
          <motion.img
            src="/images/skin-mole.jpg"
            alt=""
            className={aboutImage}
            style={{ y: imageY, scale: 1.3 }}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default About;
