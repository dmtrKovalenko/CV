import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

interface PageAnimationProps {
  children: React.ReactNode;
}

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

const stackAnimationIn = { x: -300, opacity: 0 };
const stackAnimationOut = { x: 300, opacity: 1 };

let firstMount = true;

export const PageAnimation: React.FC<PageAnimationProps> = ({ children }) => {
  const router = useRouter();

  React.useEffect(() => {
    firstMount = false
  }, [])

  return (
    // @ts-expect-error
    <AnimatePresence onExitComplete={handleExitComplete}>
      <div className="page-transition-wrapper">
        <motion.div
          transition={spring}
          key={router.pathname}
          initial={
            firstMount
              ? {}
              : router.pathname === "/"
                ? stackAnimationIn
                : stackAnimationOut
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
