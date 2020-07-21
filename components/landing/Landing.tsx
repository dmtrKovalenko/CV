import * as React from "react";
import Tiger from "./Tiger";
import { Typography, makeStyles, Box, Hidden } from "@material-ui/core";
import { SecondaryTypography, BoldTypography } from "../_shared/Common";
import { loremIpsum } from "../constants";
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
    marginTop: "auto",
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
          variant="h2"
          align="center"
          color="inherit"
          gutterBottom
        >
          Dmitriy <span className="gradientText"> Kovalenko*</span>
        </BoldTypography>
        <Typography
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
          style={{ translateX: scrollAnimationIndex[1] }}
          className={styles.descriptionText}
        >
          Hey, how its going?
        </Typography>

        <Hidden smDown>
          <Typography
            component={motion.p}
            // @ts-expect-error
            style={{ translateX: scrollAnimationIndex[2] }}
            className={styles.descriptionText}
          >
            I am engineer with a patience to{" "}
            <span className={styles.descriptionHighlight}>design</span> tests
            and <span className={styles.descriptionHighlight}>cooking</span>{" "}
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
