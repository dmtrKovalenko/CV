import * as React from "react";
import clsx from "clsx";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useWheelScroll } from "../utils/useWheelScroll";
import { useInvertedBorderRadius } from "../utils/useInvertedBorderRadius";
import { useScrollConstraints } from "../utils/useScrollConstraints";
import { makeStyles } from "@material-ui/core";

interface AnimatedCardProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactChild;
  classes: Partial<{
    root: string;
    contentContainer: string;
  }>;
  isSelected: boolean;
  onClose: () => void;
  component: string | React.ComponentType<React.HTMLProps<HTMLDivElement>>;
}

const DISMISS_DISTANCE = 75;
export const cardOpenSpring = { type: "spring", stiffness: 200, damping: 30 };
export const cardCloseSpring = { type: "spring", stiffness: 300, damping: 35 };

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
  },
  cardContentContainer: {
    width: "100%",
    height: "100%",
    display: "block",
    pointerEvents: "none",
    "&$open": {
      top: "0",
      left: "0",
      right: "0",
      position: "fixed",
      webkitPosition: "sticky",
      webkitOverflowScrolling: "touch",
      zIndex: 2,

      [theme.breakpoints.up("sm")]: {
        paddingTop: 40,
      },
    },
  },
  cardContent: {
    pointerEvents: "auto",
    borderRadius: "20px",
    background: "#1c1c1e",
    width: "100%",
    height: "100%",
    margin: "0 auto",
  },
  open: {
    "& $cardContent": {
      padding: 32,
      height: "auto",
      maxWidth: "700px",
      overflow: "auto",
    },
  },
  contentContainer: {
    padding: "460px 35px 35px 35px",
    maxWidth: "700px",
    width: "90vw",
  },
}));

export const AnimatedCard = React.memo(
  ({
    isSelected,
    onClose,
    children,
    classes,
    component: Component = "div",
    ...other
  }: AnimatedCardProps) => {
    const styles = useStyles();
    const hoverXY = useSpring(0, cardOpenSpring);

    if (isSelected) {
      hoverXY.set(0);
    }

    return (
      <Component className={clsx(styles.card, classes.root)} {...other}>
        <motion.div
          style={{ x: hoverXY, y: hoverXY }}
          transition={cardOpenSpring}
          onHoverStart={() => !isSelected && hoverXY.set(-25)}
          onHoverEnd={() => hoverXY.set(0)}
          // whileHover={isSelected ? { x: 0, y: 0 } : { y: -25, x: -25 }}
          className={clsx(styles.cardContentContainer, {
            [styles.open]: isSelected,
          })}
        >
          <motion.div
            layout
            className={clsx(styles.cardContent, classes.contentContainer)}
            transition={isSelected ? cardOpenSpring : cardCloseSpring}
            animate={isSelected ? { y: 0, x: 0 } : undefined}
            onDragEnd={(_e, info) => {
              if (info.offset.y > DISMISS_DISTANCE + 100) {
                onClose();
              }
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </Component>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);
