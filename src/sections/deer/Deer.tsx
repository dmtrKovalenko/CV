import React, { useEffect } from "react";
import Particles from "react-particles-js";

import { Typography, Theme, NoSsr } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { MouseIcon } from "./MouseIcon";
import { deerParticles } from "../..//utils/particlesParams";

const useStyles = makeStyles((theme: Theme) => ({
  landingContainer: {
    background: "#161616",
    color: "white",
    height: "100vh",
    width: "100%",

    "& div:first-child": {
      height: "100vh",
      width: "100%"
    },
    "& canvas": {
      marginTop: -150,
      marginBottom: -150,
      [theme.breakpoints.down("sm")]: {
        marginTop: 0,
        marginBottom: 0
      }
    }
  },
  title: {
    height: "30%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
}));

export function Deer() {
  const styles = useStyles();

  useEffect(() => {
    import("../../utils/typeit");
  }, []);

  return (
    <div className={styles.landingContainer}>
      <NoSsr>
        <Particles params={deerParticles} />
      </NoSsr>

      <div className={styles.title}>
        <Typography variant="h3" align="center" color="inherit" gutterBottom>
          Hi! I'm
          <Typography display="inline" variant="inherit" color="primary">
            {" Dima "}
          </Typography>
        </Typography>
        <Typography id="typing" align="center" color="inherit" variant="h4" />
      </div>

      <MouseIcon />
    </div>
  );
}
