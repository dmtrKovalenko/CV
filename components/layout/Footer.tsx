import * as React from "react";
import { Grid, Theme, Typography, makeStyles } from "@material-ui/core";
import { DeerToRabbit } from "./DeerToRabbit";
import { TwitterIconSvg } from "../_shared/icons/Twitter";
import { contacts } from "../../content/contacts.json";
import { LinkedinSvgIcon } from "../_shared/icons/LinkedinLogo";
import { InstagramSvgIcon } from "../_shared/icons/Instagram";
import { GithubSvgIcon } from "../_shared/icons/Github";
import { FacebookSvgIcon } from "../_shared/icons/Facebook";
import { EmailSvgIcon } from "../_shared/icons/Email";

const useStyles = makeStyles((theme: Theme) => ({
  clipPath: {
    width: "100%",
    height: 200,
    backgroundColor: "black",
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 100% 0)",
    "-webkit-clip-path": "polygon(0 100%, 100% 100%, 100% 100%, 100% 0)",
    [theme.breakpoints.down("sm")]: {
      height: 100
    }
  },
  container: {
    backgroundColor: "black"
  },
  social: {
    [theme.breakpoints.down('sm')]: {
      order: 1,
      marginBottom: 32
    },
  },
  animation: {
    marginTop: -50,
    [theme.breakpoints.down('xs')]: {
      margin: '-100px 0'
    }
  },
  socialContact: {
    marginTop: 32,
    marginBottom: 8,
    paddingBottom: 16,
    display: "flex",
    flexDirection: "column",
    width: 300,
    borderBottom: "3px solid white",

    "&:after": {
      top: 19,
      content: '""',
      position: "relative",
      borderBottom: `3px solid ${theme.palette.primary.light}`,
      transformOrigin: "0% 100%",
      transform: "scale(0)",
      transition: theme.transitions.create("transform")
    },

    "& svg": {
      transition: theme.transitions.create("transform"),
    },

    "&:hover": {
      "& svg": {
        willChange: 'transform',
        transform: "translateY(-10px)"
      },

      "&:after": {
        willChange: 'transform',
        transform: "scale(1)"
      }
    }
  },
  socialLink: {
    textDecoration: "none"
  },
  socialLabel: {
    marginLeft: 20,
    color: 'white'
  }
}));

const icons: Record<string, React.ComponentType> = {
  "E-mail": EmailSvgIcon,
  Twitter: TwitterIconSvg,
  LinkedIn: LinkedinSvgIcon,
  Instagram: InstagramSvgIcon,
  Github: GithubSvgIcon,
  Facebook: FacebookSvgIcon
};

const SocialContact: React.FC<{ name: string; url: string }> = ({ name, url }) => {
  const styles = useStyles();
  const Icon = icons[name];

  if (!Icon) {
    throw new Error(
      "Hey, you likely forgot to add the new social contact icon to icons map at Footer.tsx"
    );
  }

  return (
    <a rel="noopenner noreferrer" target="_blank" className={styles.socialLink} href={url}>
      <div className={styles.socialContact}>
        <Grid container>
          <Icon />
          <Typography className={styles.socialLabel} variant="subtitle1">
            {"On " + name}
          </Typography>
        </Grid>
      </div>
    </a>
  );
};

export const Footer: React.FunctionComponent<{}> = () => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.clipPath} />
      <Grid className={styles.container} container justify="space-between">
        <Grid item md={1} />
        <Grid
          item
          md={4}
          container
          direction="column"
          alignItems="center"
          justify="center"
          className={styles.social}
        >
          <Typography variant="h4" gutterBottom>
            Find me
          </Typography>

          {contacts.map(contact => (
            <SocialContact
              key={contact.name}
              name={contact.name}
              url={contact.url}
            />
          ))}
        </Grid>

        <Grid item container md={6} className={styles.animation} justify="center">
          <DeerToRabbit />
        </Grid>
      </Grid>
    </>
  );
};
