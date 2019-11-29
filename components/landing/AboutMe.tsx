import * as React from "react";
import Link from "next/link";
import { Page, PageTitle } from "../_shared/Common";
import {
  makeStyles,
  Typography,
  Grid,
  Avatar,
  Button
} from "@material-ui/core";
import ReactMarkDown from "react-markdown";
import Photo from "../../assets/Photo.jpg";
import aboutMeMd from "../../content/about.md";

interface AboutMeProps {}

const useStyles = makeStyles({
  avatar: {
    marginBottom: 16,
    width: 240,
    height: 240
  },
  hrBtn: {
    marginTop: 64
  }
});

const currentAge = new Date().getFullYear() - 1997;
const processedAboutText = aboutMeMd.replace(
  "%TOKEN_AGE%",
  currentAge.toString()
);

export const AboutMe: React.FC<AboutMeProps> = () => {
  const styles = useStyles();

  return (
    <Page>
      <PageTitle>About me</PageTitle>

      <Grid container justify="center">
        <Grid
          xs={12}
          md={4}
          lg={3}
          xl={2}
          item
          container
          justify="center"
          alignItems="center"
        >
          <Avatar alt="My photo" src={Photo} className={styles.avatar} />
        </Grid>

        <Grid xs={12} md={6} xl={4} item>
          <Typography component="span" variant="subtitle1" gutterBottom>
            <ReactMarkDown source={processedAboutText} />
          </Typography>
        </Grid>

        <Grid item container xs={12} justify="center" className={styles.hrBtn}>
          <Link href="/forHrs" prefetch>
            <Button size="large" variant="outlined" color="primary">
              Button for HR managers
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Page>
  );
};
