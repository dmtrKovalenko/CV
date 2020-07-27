import * as React from "react";
import clsx from "clsx";
import { motion, useMotionValue } from "framer-motion";
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
    position: "relative",
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
    position: "relative",
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
    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);

    // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
    const inverted = useInvertedBorderRadius(20);

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = React.useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);
    
    React.useEffect(() => {
      if (isSelected) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "auto"
      }
    }, [isSelected])

    function checkSwipeToDismiss(yPosition: number) {
      if (yPosition > DISMISS_DISTANCE) {
        onClose();
      }
    }

    function checkZIndex(latest: any) {
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected && latest.scaleX < 1.01) {
        zIndex.set(0);
      }
    }

    // When this card is selected, attach a wheel event listener
    const containerRef = React.useRef(null);
    useWheelScroll({
      y,
      constraints,
      ref: containerRef,
      isActive: isSelected,
      onWheelCallback: () => checkSwipeToDismiss(y.get()),
    });

    return (
      <Component
        ref={containerRef}
        className={clsx(styles.card, classes.root)}
        {...other}
      >
        <div
          className={clsx(styles.cardContentContainer, {
            [styles.open]: isSelected,
          })}
        >
          <motion.div
            ref={cardRef}
            className={clsx(styles.cardContent, classes.contentContainer)}
            style={{ ...inverted, zIndex, y }}
            layout
            transition={isSelected ? cardOpenSpring : cardCloseSpring}
            drag={isSelected ? "y" : false}
            dragConstraints={constraints}
            // whileHover={isSelected ? { y: 0, x: 0 } : { y: -25, x: -25 }}
            onUpdate={checkZIndex}
            onDragEnd={(_e, info) => {
              if (info.offset.y > DISMISS_DISTANCE + 100) {
                onClose();
              }
            }}
          >
            {children}
          </motion.div>
        </div>
      </Component>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);
