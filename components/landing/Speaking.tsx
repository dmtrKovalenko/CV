import * as React from "react";
import { talks, nextTalk } from "../../content/talks.json";
import {
  makeStyles,
  Grid,
  styled,
  Typography,
  IconButton,
  Hidden,
} from "@material-ui/core";
import {
  BoldTypography,
  NoDecorationColorLink,
  PageNoPadding,
  PageTitleNoPadding,
  SecondaryTypography,
} from "../../components/_shared/Common";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { gradientColors } from "../utils/theme";
import { SpeakingPresentation } from "./SpeakingPresentation";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

interface SpeakingProps {}

const TalkCard = styled("div")(({ theme }) => ({
  maxWidth: 310,
  minWidth: 310,
  minHeight: 400,
  marginRight: "auto",
  borderRadius: 16,
  padding: "1rem",
  transition: theme.transitions.create(["transform", "margin-right"]),

  [theme.breakpoints.down("sm")]: {
    minWidth: 200,
    maxWidth: 200,
    minHeight: 440,
  },
}));

const useStyles = makeStyles((theme) => {
  return {
    talksContainer: {
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
      overflowX: "scroll",
      boxSizing: "content-box",
      WebkitOverflowScrolling: "touch",
      [theme.breakpoints.down("sm")]: {
        margin: "0 32px",
      },
    },
    talksGrid: {
      overflowX: "scroll",
      WebkitOverflowScrolling: "touch",
      scrollSnapType: "mandatory",
      scrollSnapPointsX: "repeat(250px)",
      padding: "70px 0 70px 70px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        padding: "70px 32px",
      },
    },
    nextConf: {
      zIndex: 100,
      marginRight: 160,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: `linear-gradient(0deg,${gradientColors.from},${gradientColors.to})`,
      [theme.breakpoints.down("sm")]: {
        minWidth: 130,
        maxWidth: 130,
        marginRight: 100,
        writingMode: "vertical-rl",
        transform: "rotate(180deg)",
      },
    },
    talkCard: {
      display: "flex",
      flexDirection: "column",
      background: "#1a1a1a",
      boxShadow: "-1rem 0 3rem #000",
      willChange: "transform",

      "&:hover": {
        transform: "translateY(-1.5rem)",

        "&~*": {
          transform: "translateX(50px)",
          [theme.breakpoints.down("sm")]: {
            transform: "translateX(20px)",
          },
        },
      },

      "&:not(:first-of-type)": {
        marginLeft: -80,
        [theme.breakpoints.down("sm")]: {
          marginLeft: -50,
        },
      },
    },
    talkTitle: {
      fontSize: "1.4rem",

      "&:hover": {
        cursor: "pointer",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        background: `-webkit-gradient(linear,left top,right top,from(${gradientColors.to}),to(${gradientColors.from}))`,
      },
    },
    actions: {
      marginBottom: "auto",
      marginLeft: -12,
    },
    presentations: {
      maxHeight: 64,
      overflow: "hidden",

      "&:hover": {
        maxHeight: "unset",
      },
    },
    gradientIcon: {
      fill: `url(#svg-gradient)`,
    },
  };
});

export const Speaking: React.FC<SpeakingProps> = ({}) => {
  const styles = useStyles();
  return (
    <PageNoPadding>
      <PageTitleNoPadding id="talks" gutterBottom>
        Talks
      </PageTitleNoPadding>
      <Typography variant="subtitle1" align="center">
        I am really passionate about technical speaking. <br /> I do want to
        think that my talks are changing lives. Here is a (non-full) list of my
        talks:
      </Typography>

      <Grid
        container
        wrap="nowrap"
        direction="row"
        className={styles.talksGrid}
      >
        <TalkCard className={styles.nextConf}>
          <NoDecorationColorLink
            target="_blank"
            rel="noopener noreferrer"
            href={nextTalk.confWebsite}
          >
            <BoldTypography
              align="center"
              variant="h4"
              style={{ marginLeft: "1rem" }}
            >
              Meet me at
            </BoldTypography>

            <Hidden smUp>
              <SecondaryTypography gutterBottom align="center" variant="h5">
                {nextTalk.conference}
              </SecondaryTypography>
            </Hidden>

            <Hidden smDown>
              <Typography
                gutterBottom
                style={{ marginBottom: "2rem" }}
                align="center"
                variant="h5"
              >
                {nextTalk.conference}
              </Typography>
              <Grid container style={{ marginBottom: 24 }}>
                <Grid
                  xs={6}
                  item
                  container
                  direction="column"
                  alignItems="center"
                >
                  <QueryBuilderIcon />
                  <Typography align="center" variant="subtitle1">
                    {nextTalk.when}
                  </Typography>
                </Grid>

                <Grid
                  xs={6}
                  item
                  container
                  direction="column"
                  alignItems="center"
                >
                  <LocationOnIcon />
                  <Typography gutterBottom align="center" variant="subtitle1">
                    {nextTalk.location}
                  </Typography>
                </Grid>
              </Grid>

              <BoldTypography gutterBottom align="center" variant="h5">
                «<br />
                {nextTalk.talk}
                <br />»
              </BoldTypography>
            </Hidden>
          </NoDecorationColorLink>
        </TalkCard>

        {[...talks].map((talk) => (
          <TalkCard key={talk.title} className={styles.talkCard}>
            <Typography color="textSecondary" variant="overline">
              {talk.presentations[0].when}
            </Typography>

            <NoDecorationColorLink
              target="_blank"
              rel="noopener noreferrer"
              href={talk.slides}
            >
              <BoldTypography className={styles.talkTitle} variant="h5">
                {talk.title}
              </BoldTypography>
            </NoDecorationColorLink>

            <Grid container className={styles.actions}>
              {talk.presentations[0].video && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={talk.presentations[0].video}
                >
                  <IconButton>
                    <YouTubeIcon
                      fontSize="large"
                      className={styles.gradientIcon}
                    />
                  </IconButton>
                </a>
              )}
            </Grid>

            {[...talk.presentations].map((presentation) => (
              <SpeakingPresentation
                key={presentation.conference}
                presentation={presentation}
              />
            ))}
          </TalkCard>
        ))}
      </Grid>
    </PageNoPadding>
  );
};
