import * as React from "react";
import { Typography, Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Photo from "../assets/Photo.jpg";

interface ResumeProps {}

const useStyles = makeStyles({
  container: {
    padding: 32,
    background: "white",
    color: "black",
    margin: "0 auto",
    minHeight: "100vh",
    width: "800px"
  },
  avatar: {
    width: 180,
    height: 180,
    marginBottom: 16
  }
});

const Resume: React.FunctionComponent<ResumeProps> = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Grid container>
        <Grid item xs={12} container justify="center">
          <Avatar alt="My photo" src={Photo} className={styles.avatar} />
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Typography variant="h4" color="inherit" gutterBottom>
            {" "}
            Dmitriy Kovalenko{" "}
          </Typography>
          <Typography variant="h6" color="inherit">
            {" "}
            JavScript engineer{" "}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Resume;
