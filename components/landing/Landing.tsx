import * as React from "react";
import Tiger from "./Tiger";
import { MouseIcon } from "./MouseIcon";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  landingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "#1a1a1a",
    color: "white",
    minHeight: "100vh",
    width: "100%",
    paddingBottom: 32
  },
  title: {
    marginTop: "auto",
    marginBottom: 160
  },
  typingTitle: {
    minHeight: 42
  }
});

export function Landing() {
  const styles = useStyles();

  React.useEffect(() => {
    import("../utils/typeit").then(({ start }) => start());
  }, []);

  return (
    <div id="landing" className={styles.landingContainer}>
      <Tiger />
      <div className={styles.title}>
        <Typography component="h1" variant="h3" align="center" color="inherit" gutterBottom>
          Hi! I'm
          <Typography display="inline" variant="inherit" color="primary">
            {" Dmitriy "}
          </Typography>
        </Typography>
        <Typography id="typing" className={styles.typingTitle} align="center" color="inherit" variant="h4" />
      </div>

      <MouseIcon />
    </div>
  );
}
