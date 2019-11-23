import * as React from "react";
import Tiger from "./Tiger/Tiger";
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
    width: "100%"
  },
  title: {
    marginTop: "auto",
    marginBottom: 160
  }
});

export function Landing() {
  const styles = useStyles();

  React.useEffect(() => {
    import("../../utils/typeit").then(({ start }) => start());
  }, []);

  return (
    <div className={styles.landingContainer}>
      <Tiger />
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
