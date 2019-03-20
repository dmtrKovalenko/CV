import * as React from "react";
import Link from 'next/link'
import Photo from "../../../assets/Photo.jpg";
import { Page } from "../../_shared/Page";
import { Typography, Grid, Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ReactMarkDown from 'react-markdown'
import aboutMeMd from '../../../content/about.md'

interface AboutMeProps {}

const useStyles = makeStyles({
  title: {
    paddingBottom: 70
  },
  section: {
    paddingTop: 90
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
    <Page className={styles.section}>
      <Typography
        variant="h2"
        align="center"
        className={styles.title}
        gutterBottom
      >
        About me
      </Typography>

      <Grid container justify="center">
        <Grid xs={12} md={4} lg={3} xl={2} item container justify="center" alignItems="center">
          <Avatar alt="My photo" src={Photo} className={styles.avatar} />
        </Grid>

        <Grid xs={12} md={6} xl={4} item>
          <Typography component="span" variant="subtitle1" gutterBottom>
            <ReactMarkDown source={aboutMeMd} />
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
