import * as React from "react";
import Link from "next/link";
import { Page, PageTitle } from "../_shared/Common";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { makeStyles, Typography, Avatar, Button } from "@material-ui/core";
import ReactMarkDown from "react-markdown";
import Photo from "../../assets/Photo.jpg";
import aboutMeMd from "../../content/about.md";

interface AboutMeProps {}

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginBottom: 16,
    width: 300,
    height: 300,
    gridArea: "avatar",
    alignSelf: "center",
    justifySelf: "center",

    [theme.breakpoints.up("md")]: {
      marginTop: 64,
      width: 360,
      height: 360,
    },

    [theme.breakpoints.up("lg")]: {
      width: 480,
      height: 480,
    },
  },
  text: {
    maxWidth: 600,
    justifySelf: "center",
    gridArea: "about",
  },
  aboutText: {
    fontSize: "1.3rem",
  },
  title: {
    gridArea: "title",
  },
  hrBtn: {
    marginTop: 64,
  },
  grid: {
    maxWidth: 1540,
    margin: "0 auto",
    display: "grid",
    gridColumnGap: "64px",
    gridTemplateAreas: `
    "title"
    "avatar"
    "about"
   `,

    [theme.breakpoints.up("md")]: {
      gridTemplateAreas: `
      "title title avatar"
      "about about avatar"
      "about about avatar"
     `,
    },
  },
}));

const currentAge = new Date().getFullYear() - 1997;
const processedAboutText = aboutMeMd.replace(
  "%TOKEN_AGE%",
  currentAge.toString()
);

export const AboutMe: React.FC<AboutMeProps> = () => {
  const styles = useStyles();

  return (
    <Page>
      <div className={styles.grid}>
        <PageTitle id="about" className={styles.title}>
          About me
        </PageTitle>

        <Avatar alt="My photo" src={Photo} className={styles.avatar} />

        <div className={styles.text}>
          <Typography component="div" className={styles.aboutText} gutterBottom>
            <ReactMarkDown source={processedAboutText} />
          </Typography>

          <Link href="/forHrs">
            <Button
              size="large"
              variant="outlined"
              color="primary"
              style={{fontWeight: 'bold'}}
              endIcon={<ArrowForwardIcon />}
            >
              Lets work together
            </Button>
          </Link>
        </div>
      </div>
    </Page>
  );
};
