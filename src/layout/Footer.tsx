import * as React from "react";
import { Grid, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { DeerToRabbit } from "./DeerToRabit";
import { TwitterIconSvg } from "../_shared/icons/Twitter";
import { contacts } from "../../content/contacts.json";
import { LinkedinSvgIcon } from "../../src/_shared/icons/LinkedinLogo";
import { InstagramSvgIcon } from "../../src/_shared/icons/Instagram";
import { GithubSvgIcon } from "../../src/_shared/icons/Github";
import { FacebookSvgIcon } from "../../src/_shared/icons/Facebook";
import { EmailSvgIcon } from "../../src/_shared/icons/Email";

const useStyles = makeStyles((theme: Theme) => ({
  clipPath: {
    width: "100%",
    height: 200,
    backgroundColor: "black",
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 100% 0)",
    [theme.breakpoints.down("sm")]: {
      height: 100
    }
  },
  container: {
    backgroundColor: "black"
  },
  socialContact: {
    marginTop: 32,
    marginBottom: 8,
    paddingBottom: 16,
    borderBottom: "1px solid white",
    display: "flex",
    alignItems: "flex-end",
    width: 300
  },
  socialLabel: {
    marginLeft: 16
  }
}));

type SocialContact = {
  name: string;
  url: string;
};

const icons: Record<string, React.ComponentType> = {
  "Twitter": TwitterIconSvg,
  "E-mail": EmailSvgIcon,
  "LinkedIn": LinkedinSvgIcon,
  "Instagram": InstagramSvgIcon,
  "Github": GithubSvgIcon,
  "Facebook": FacebookSvgIcon
};

const SocialContact: React.FC<SocialContact> = ({ name, url }) => {
  const styles = useStyles();
  const Icon = icons[name];

  if (!Icon) {
    throw new Error("Hey, you likely forgot to add the new social contact icon to icons map at Footer.tsx")
  }
  
  return (
    <div className={styles.socialContact}>
      <Icon />
      <Typography className={styles.socialLabel} variant="subtitle1">
        {"On " + name}
      </Typography>
    </div>
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
          container
          direction="column"
          alignItems="center"
          justify="center"
          md={4}
        >
          <Typography variant="h4" gutterBottom>
            Contact me
          </Typography>

          {contacts.map(contact => (
            <SocialContact
              key={contact.name}
              name={contact.name}
              url={contact.url}
            />
          ))}
        </Grid>

        <Grid item container md={6} justify="center">
          <DeerToRabbit />
        </Grid>
      </Grid>
    </>
  );
};
