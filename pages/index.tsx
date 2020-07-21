import * as React from "react";
import { Landing } from "../components/landing/Landing";
import { AboutMe } from "../components/landing/AboutMe";
import { Speaking } from "../components/landing/Speaking";
import { motion } from "framer-motion";

interface LandingProps {}

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const thumbnailVariants = {
  initial: { scale: 0.9, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: { duration: 1.5, ...transition },
  },
};
const Main: React.FunctionComponent<LandingProps> = () => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
    >
      <Landing />
      <AboutMe />
      <Speaking />
    </motion.div>
  );
};

export default Main;
