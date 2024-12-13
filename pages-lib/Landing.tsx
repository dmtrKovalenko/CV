import * as React from "react";
import Tiger from "./Tiger";
import { loremIpsum } from "../utils/constants";
import { BoldTypography } from "../components/Common";
import {
  Typography,
  makeStyles,
  Hidden,
  useMediaQuery,
} from "@material-ui/core";
import { motion, useViewportScroll, useTransform } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  landingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "#1a1a1a",
    color: "white",
    minHeight: "100vh",
    width: "100%",
    paddingBottom: 90,
  },
  title: {
    marginBottom: 160,
  },
  typingTitle: {
    fontWeight: "lighter",
    minHeight: 42,
  },
  descriptionContainer: {
    display: "flex",
    BoxOrient: "vertical",
    BoxDirection: "normal",
    flexDirection: "column",
    BoxAlign: "center",
    alignItems: "center",
    overflowX: "hidden",
  },
  descriptionText: {
    fontSize: "1.2rem",
    marginBottom: "0.2rem",
    letterSpacing: "0.5rem",
    textAlign: "center",
    transition: theme.transitions.create("transform"),
    // [theme.breakpoints.up("sm")]: {
    whiteSpace: "nowrap",
    "&::before, &::after": {
      content: `"${loremIpsum}"`,
      color: theme.palette.text.disabled,
    },
  },
  descriptionHighlight: {
    color: "black",
    paddingLeft: "0.5rem",
    backgroundColor: "white",
    boxShadow: "0 0 0 3px white",
  },
}));

export function Landing() {
  const styles = useStyles();
  const isDesktop = useMediaQuery("@media (pointer: fine)");
  const { scrollYProgress } = useViewportScroll();
  const scrollAnimationIndex = {
    1: useTransform(scrollYProgress, (p) => p * 500),
    2: useTransform(scrollYProgress, (p) => -(p * 500)),
    3: useTransform(scrollYProgress, (p) => p * 500),
  };

  return (
    <div id="landing" className={styles.landingContainer}>
      <Tiger />
      <div className={styles.title}>
        <BoldTypography
          variant="h1"
          align="center"
          color="inherit"
          gutterBottom
        >
          Dmitriy <span className="gradientText"> Kovalenko*</span>
        </BoldTypography>
        <Typography
          component="h2"
          id="typing"
          className={styles.typingTitle}
          align="center"
          color="inherit"
          variant="h5"
        >
          <span className="gradientText"> * </span> Your Friendly Software
          Engineer
        </Typography>
      </div>

      <div className={styles.descriptionContainer}>
        <Typography
          component={motion.p}
          // @ts-expect-error
          style={isDesktop && { translateX: scrollAnimationIndex[1] }}
          className={styles.descriptionText}
        >
          Hey, how its going?
        </Typography>

        {/** @ts-ignore children*/}
        <Hidden smDown implementation="css">
          <Typography
            component={motion.p}
            // @ts-expect-error
            style={{ translateX: scrollAnimationIndex[2] }}
            className={styles.descriptionText}
          >
            I am an engineer with the patience to{" "}
            <span className={styles.descriptionHighlight}>performance</span>, correctness,
            and photography.
          </Typography>

          <Typography
            component={motion.p}
            // @ts-expect-error
            style={{ translateX: scrollAnimationIndex[3] }}
            className={styles.descriptionText}
          ></Typography>
        </Hidden>
      </div>
    </div>
  );
}
