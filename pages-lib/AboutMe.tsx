import * as React from "react";
import Link from "next/link";
import { Page, PageTitle } from "../components/Common";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {
  makeStyles,
  Typography,
  Avatar,
  Button,
  useTheme,
} from "@material-ui/core";
import ReactMarkDown from "react-markdown";
import Photo300 from "../assets/Photo-300.jpeg";
import Photo360 from "../assets/Photo-360.jpeg";
import Photo480 from "../assets/Photo-480.jpg";
import aboutMeMd from "../content/about.md";

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

    "& img": {
      width: "100%",
    },
  },
  text: {
    maxWidth: 600,
    justifySelf: "center",
    gridArea: "about",
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
  const theme = useTheme();
  const styles = useStyles();

  return (
    <Page>
      <div className={styles.grid}>
        <PageTitle id="about" className={styles.title}>
          About me
        </PageTitle>

        <Avatar alt="My photo" className={styles.avatar}>
          <picture>
            <source
              media={theme.breakpoints.up("lg").replace("@media", "")}
              srcSet={Photo480}
            />
            <source
              media={theme.breakpoints.up("md").replace("@media", "")}
              srcSet={Photo360}
            />
            <img src={Photo300} alt="kek" />
          </picture>
        </Avatar>

        <div className={styles.text}>
          <Typography component="div" gutterBottom>
            <ReactMarkDown source={processedAboutText} />
          </Typography>

          <Link href="/forHrs">
            <Button
              size="large"
              variant="outlined"
              color="primary"
              style={{ fontWeight: "bold" }}
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
