"use client";

import { motion, Transition } from "motion/react";
import { HTMLAttributes } from "react";

import { container, ball } from "./index.css";

type LoaderProps = HTMLAttributes<HTMLDivElement> & {};

const Loader = ({ className }: LoaderProps) => {
  const ballContainer = {
    rotate: 360,
  };

  const transitionContainer: Transition = {
    duration: 1.5,
    ease: "linear",
    times: [0, 1],
    repeat: Infinity,
    repeatType: "loop",
  };

  const ballOne = {
    left: ["0%", "50%"],
    top: ["0%", "50%"],
  };

  const ballTwo = {
    right: ["0%", "50%"],
    top: ["0%", "50%"],
  };

  const ballThree = {
    left: ["50%", "50%"],
    bottom: ["0%", "50%"],
  };

  const transition: Transition = {
    duration: 1.5,
    ease: "easeInOut",
    times: [0, 0.5, 1],
    repeat: Infinity,
    // repeatType: "loop",
    repeatType: "mirror",
  };

  return (
    <motion.div
      className={`${container} ${className}`}
      animate={ballContainer}
      transition={transitionContainer}
    >
      <motion.div
        className={`${ball}`}
        style={{ marginLeft: -15, marginTop: -15 }}
        animate={ballOne}
        transition={{ ...transition, delay: 0 }}
      ></motion.div>
      <motion.div
        className={`${ball}`}
        style={{ marginRight: -15, marginTop: -15 }}
        animate={ballTwo}
        transition={{ ...transition, delay: 0.1 }}
      ></motion.div>
      <motion.div
        className={`${ball}`}
        style={{ marginLeft: -15, marginBottom: -15 }}
        animate={ballThree}
        transition={{ ...transition, delay: 0.2 }}
      ></motion.div>
    </motion.div>
  );
};

export default Loader;
