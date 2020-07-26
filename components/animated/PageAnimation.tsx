import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

interface PageAnimationProps {}

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 100,
  when: "afterChildren",
};

const stackAnimationIn = { x: 0, opacity: 0 };
const stackAnimationOut = { x: 300, opacity: 1 };

export const PageAnimation: React.FC<PageAnimationProps> = ({ children }) => {
  const router = useRouter();

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      <div className="page-transition-wrapper">
        <motion.div
          transition={spring}
          key={router.pathname}
          initial={
            router.pathname === "/" ? stackAnimationIn : stackAnimationOut
          }
          animate={{ x: 0, opacity: 1 }}
          exit={router.pathname === "/" ? stackAnimationOut : stackAnimationIn}
          id="page-transition-container"
        >
          <React.Fragment key={router.pathname}>{children}</React.Fragment>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
