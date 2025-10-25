"use client";
import { Button, Link } from "isskinui";
import { motion, Transition } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import {
  hambugerStripeBottom,
  hambugerStripeTop,
  hamburgerBtn,
  navActions,
  navContainer,
  navItem,
  navItemLogin,
  navLogin,
  navLogo,
  navWrapper,
} from "./index.css";

const ANIMATIONS = {
  hamburger: {
    open: {
      height: [2.5, 6, 2.6],
      position: [6, 14],
      rotateTop: [0, 0, 135],
      rotateBottom: [0, 0, 45],
    },
    closed: {
      height: [2.6, 4.5, 2.5],
      position: [14, 14, 6],
      rotateTop: [135, 0, 0],
      rotateBottom: [45, 0, 0],
    },
  },
  navigation: {
    open: { height: 330 },
    closed: { height: 56 },
  },
  navList: {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  },
};

const BREAKPOINT = 1000;

const getAnimationValues = (isOpen: boolean) => ({
  container: ANIMATIONS.navigation[isOpen ? "open" : "closed"],
  hamburger: ANIMATIONS.hamburger[isOpen ? "open" : "closed"],
  navList: ANIMATIONS.navList[isOpen ? "open" : "closed"],
  transition: {
    type: "tween",
    ease: isOpen ? "circOut" : "circIn",
    duration: 0.5,
  } as Transition,
});

export default function NavBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= BREAKPOINT;
      setIsDesktop(desktop);
      if (desktop) setIsOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const animation = getAnimationValues(isOpen);
  const shouldShowNav = isDesktop || isOpen;

  return (
    <motion.nav
      className={navContainer}
      animate={animation.container}
      transition={animation.transition}
    >
      <Image
        src="icons/logo.svg"
        alt="Isskin Logo"
        width="106"
        height="32"
        className={navLogo}
      />

      <motion.ul
        className={navWrapper}
        animate={!shouldShowNav ? animation.navList : {}}
        transition={
          !shouldShowNav ? { ...animation.transition, delay: 0.3 } : {}
        }
        style={{ visibility: shouldShowNav ? "visible" : "hidden" }}
      >
        <li>
          <Link className={navItem} variant="strong">
            Sobre Nós
          </Link>
        </li>
        <li>
          <Link className={navItem} variant="strong">
            Planos
          </Link>
        </li>
        <li>
          <Link className={navItem} variant="strong">
            Contato
          </Link>
        </li>
        <li>
          <Link
            className={`${navItem} ${navItemLogin}`}
            onClick={() => router.push("/login")}
            variant="strong"
          >
            Entrar
          </Link>
        </li>
      </motion.ul>

      <div className={navActions}>
        <Link
          onClick={() => router.push("/login")}
          className={`${navLogin}`}
          variant="strong"
        >
          Entrar
        </Link>

        <Button onClick={() => router.push("/signup")}>Cadastrar</Button>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={hamburgerBtn}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <motion.div
            className={hambugerStripeTop}
            initial={false}
            animate={{
              height: animation.hamburger.height,
              top: animation.hamburger.position,
              rotate: animation.hamburger.rotateTop,
            }}
            transition={animation.transition}
          />
          <motion.div
            className={hambugerStripeBottom}
            initial={false}
            animate={{
              height: animation.hamburger.height,
              bottom: animation.hamburger.position,
              rotate: animation.hamburger.rotateBottom,
            }}
            transition={animation.transition}
          />
        </button>
      </div>
    </motion.nav>
  );
}
