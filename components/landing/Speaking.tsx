import * as React from "react";
import { talks, nextTalk } from "../../content/talks.json";
import {
  makeStyles,
  Grid,
  styled,
  Typography,
  IconButton,
  Hidden,
  Button,
  Backdrop,
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
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { AnimatedCard, cardOpenSpring } from "../animated/AnimatedCard";
import { NoVideoFiller, Video } from "./Video";
import { useRouter } from "next/router";
import { useInvertedScale, motion } from "framer-motion";

interface SpeakingProps {}

const TalkCard = styled("div")(({ theme }) => ({
  maxWidth: 310,
  minWidth: 310,
  minHeight: 440,
  marginRight: "auto",
  borderRadius: 16,
  cursor: "pointer",
  transition: theme.transitions.create(["transform", "margin-right"]),

  [theme.breakpoints.down("sm")]: {
    minWidth: 200,
    maxWidth: 200,
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
      padding: "70px 0 70px 70px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        padding: "70px 32px",
      },
    },
    nextConf: {
      paddingTop: 16,
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
        paddingRight: 16,
        transform: "rotate(180deg)",
      },
    },
    talkCard: {
      display: "flex",
      flexDirection: "column",

      "&:not(:first-of-type)": {
        marginLeft: -80,
        [theme.breakpoints.down("sm")]: {
          marginLeft: -50,
        },
      },
    },
    talkCardContentContainer: {
      overflowY: "auto",
      padding: "1rem",
      background: "#1a1a1a",
      boxShadow: "-1rem 0 3rem #000",
    },
    talkTitle: {
      margin: 0,

      "&:hover": {
        cursor: "pointer",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        background: `-webkit-gradient(linear,left top,right top,from(${gradientColors.to}),to(${gradientColors.from}))`,
      },
    },
    talkContent: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    dragPin: {
      width: 120,
      height: 2,
      border: "none",
      backgroundColor: theme.palette.text.secondary,
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
  const router = useRouter();

  const [selectedCard, setSelectedTalk] = React.useState<string | null>(
    typeof router.query.talk === "string" ? router.query.talk : null
  );

  const openTalk = (title: string) => {
    window.history.pushState({}, "", `/?talk=${title}`);
    setSelectedTalk(title);
  };

  const closeTalk = () => {
    setSelectedTalk(null);
    window.history.pushState({}, "", "/");
  };

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (selectedCard !== null && e.key === "Escape") {
        closeTalk();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

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

        <Backdrop
          style={{ zIndex: 1 }}
          open={selectedCard !== null}
          onClick={closeTalk}
        />

        {[...talks].map((talk) => {
          const isSelected = talk.title === selectedCard;
          return (
            <AnimatedCard
              key={talk.title}
              component={TalkCard}
              classes={{
                root: styles.talkCard,
                contentContainer: styles.talkCardContentContainer,
              }}
              isSelected={isSelected}
              onClose={closeTalk}
              onClick={() => openTalk(talk.title)}
            >
              <div className={styles.talkContent}>
                {isSelected && (
                  <Hidden smUp>
                    <hr className={styles.dragPin} />
                  </Hidden>
                )}

                <Typography color="textSecondary" variant="overline">
                  {talk.presentations[0].when}
                </Typography>

                <BoldTypography
                  gutterBottom
                  // layout
                  style={{
                    fontSize: isSelected ? 32 : 24,
                  }}
                  className={styles.talkTitle}
                  variant={isSelected ? "h3" : "h5"}
                >
                  {talk.title}
                </BoldTypography>

                {!isSelected && (
                  <Grid container className={styles.actions}>
                    {talk.presentations[0].youTubeVideoId && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.youtube.com/watch?v=${talk.presentations[0].youTubeVideoId}`}
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
                )}

                <div>
                  {isSelected && (
                    <>
                      {talk.presentations[0].youTubeVideoId ? (
                        <Video
                          youTubeVideoId={talk.presentations[0].youTubeVideoId}
                        />
                      ) : (
                        <NoVideoFiller />
                      )}

                      <NoDecorationColorLink
                        target="blank"
                        rel="noopener noreferrer"
                        href={talk.slides}
                      >
                        <Button
                          size="large"
                          variant="outlined"
                          color="primary"
                          style={{
                            border: "none",
                            marginBottom: 32,
                            fontWeight: "bold",
                          }}
                          endIcon={<ArrowForwardIcon />}
                        >
                          Slides
                        </Button>
                      </NoDecorationColorLink>
                    </>
                  )}
                </div>
                {[...talk.presentations].map((presentation) => (
                  <SpeakingPresentation
                    key={presentation.conference}
                    presentation={presentation}
                  />
                ))}
              </div>
            </AnimatedCard>
          );
        })}
      </Grid>
    </PageNoPadding>
  );
};
