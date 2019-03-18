import * as React from "react";
import Photo from "../../../assets/Photo.jpg";
import { Page } from "../../_shared/Page";
import { Typography, Grid, Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface AboutMeProps {}

const useStyles = makeStyles({
  title: {
    paddingBottom: 70
  },
  avatar: {
    marginBottom: 16,
    width: 240,
    height: 240
  },
  hrBtn: {
    marginTop: 64
  }
});

export const AboutMe: React.FunctionComponent<AboutMeProps> = () => {
  const styles = useStyles();

  return (
    <Page>
      <Typography
        variant="h2"
        align="center"
        className={styles.title}
        gutterBottom
      >
        About me
      </Typography>

      <Grid container justify="center">
        <Grid xs={12} md={4} lg={3} item container justify="center" alignItems="center">
          <Avatar alt="My photo" src={Photo} className={styles.avatar} />
        </Grid>

        <Grid xs={12} md={6} item>
          <Typography variant="body1" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>

          <Typography variant="body1" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Grid>

        <Grid item container xs={12} justify="center" className={styles.hrBtn}>
          <Button size="large" variant="outlined" color="primary">
            Button for HR managers
          </Button>
        </Grid>
      </Grid>
    </Page>
  );
};
