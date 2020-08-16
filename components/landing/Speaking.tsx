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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { AnimatedCard } from "../animated/AnimatedCard";
import { NoVideoFiller, Video } from "./Video";
import { motion, useMotionValue } from "framer-motion";
import { useWindowResize } from "../utils/useWindowResize";

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
    speakingSection: {
      marginBottom: 64,
      "@media(pointer: fine)": {
        overflowX: "hidden",
      },
    },
    talksContainer: {
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
      boxSizing: "content-box",
      WebkitOverflowScrolling: "touch",
      [theme.breakpoints.down("sm")]: {
        margin: "0 32px",
      },
    },
    talksGrid: {
      overflowX: "scroll",
      "@media(pointer: fine)": {
        overflowX: "visible",
      },
      display: "flex",
      flexWrap: "nowrap",
      padding: 70,
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
    scrollControls: {
      position: "absolute",
      right: 0,
      display: "none",
      "@media(pointer: fine)": {
        display: "flex",
        justifyContent: "flex-end",
      },
    },
    floatingScrollButton: {
      marginRight: 16,
      zIndex: 1,
      backgroundColor: theme.palette.background.paper,
      borderRadius: "100%",
      boxShadow: theme.shadows[14],
    },
    talkCard: {
      display: "flex",
      flexDirection: "column",

      "&:last-of-type": {
        marginRight: 60,
      },

      "&:not(:first-of-type)": {
        marginLeft: -80,
        [theme.breakpoints.down("sm")]: {
          marginLeft: -50,
        },
      },
    },
    talkCardContentContainer: {
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
  const dimensions = useWindowResize();
  const [_, setMounted] = React.useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [talksGridScrollX, setTalksGridScrollX] = React.useState(0);
  const [selectedCard, setSelectedTalk] = React.useState<string | null>(null);

  const openTalk = (title: string) => {
    window.history.pushState({}, "", `/?talk=${title}`);
    setSelectedTalk(title);
  };

  const closeTalk = () => {
    setSelectedTalk(null);
    window.history.pushState({}, "", "/");
  };

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const talk = searchParams.get("talk");
    if (typeof talk === "string") {
      setTimeout(() => setSelectedTalk(talk), 250);
    }
  }, []);

  React.useEffect(() => {
    setMounted(true);
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeTalk();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const getSpeakingSectionScrollWidth = () => {
    return scrollContainerRef.current?.scrollWidth ?? 0;
  };

  const canScroll = (side: "left" | "right") => {
    if (!scrollContainerRef.current) {
      return false;
    }

    return side === "left"
      ? talksGridScrollX > 0
      : getSpeakingSectionScrollWidth() > dimensions.width + talksGridScrollX;
  };

  const scroll = (side: "left" | "right") => {
    if (!canScroll(side)) {
      return;
    }

    const minScroll = 0;
    const maxScroll = getSpeakingSectionScrollWidth() + 60; // add additional offset for better spring animation

    const newScrollValue =
      side === "right" ? talksGridScrollX + 450 : talksGridScrollX - 450;

    setTalksGridScrollX(
      side === "right"
        ? Math.min(newScrollValue, maxScroll - dimensions.width)
        : Math.max(minScroll, newScrollValue)
    );
  };

  return (
    <PageNoPadding className={styles.speakingSection}>
      <PageTitleNoPadding id="talks" gutterBottom>
        Talks
      </PageTitleNoPadding>
      <Typography variant="subtitle1" align="center">
        I am really passionate about technical speaking. <br /> I do want to
        think that my talks are changing lives. Here is a (non-full) list of my
        talks:
      </Typography>

      {(getSpeakingSectionScrollWidth() > dimensions.width ||
        talksGridScrollX > 0) && (
        <div className={styles.scrollControls}>
          <IconButton
            disabled={!canScroll("left")}
            className={styles.floatingScrollButton}
            onClick={() => scroll("left")}
          >
            <ArrowBackIcon />
          </IconButton>

          <IconButton
            disabled={!canScroll("right")}
            className={styles.floatingScrollButton}
            onClick={() => scroll("right")}
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>
      )}

      <motion.div
        ref={scrollContainerRef}
        // using CPU accelerated margin-left animation here in order to unlock the ability to use position:fixed inside
        // It doesn't harms performance for now and renders stable 60 FPS.
        // http://meyerweb.com/eric/thoughts/2011/09/12/un-fixing-fixed-elements-with-css-transforms/
        animate={{ marginLeft: -talksGridScrollX }}
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

            <Hidden smUp implementation="css">
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
                        onClick={(e) => e.stopPropagation()}
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
      </motion.div>
    </PageNoPadding>
  );
};
