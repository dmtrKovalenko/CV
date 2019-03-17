import React, { useEffect } from "react";
import { Typography, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Particles from "react-particles-js";
import { deerParticles } from "../utils/particlesParams";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: "#161616",
    color: "white",
    height: "100vh",
    width: "100vw",

    "& div:first-child": {
      height: "100vh",
      width: "100vw"
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

function IndexPage() {
  const styles = useStyles();

  useEffect(() => {
    import("../utils/typeit");
  }, []);

  return (
    <div className={styles.container}>
      {process.browser && <Particles params={deerParticles} />}

      <div className={styles.title}>
        <Typography variant="h3" align="center" color="inherit" gutterBottom>
          Hi! I'm
          <Typography display="inline" variant="inherit" color="primary">
            {" "}
            Dima{" "}
          </Typography>
        </Typography>
        <Typography id="typing" align="center" color="inherit" variant="h4" />
      </div>
    </div>
  );
}

export default IndexPage;
