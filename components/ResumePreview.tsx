import * as React from "react";
import Resume from "../pages/resume";
import SaveIcon from "@material-ui/icons/Save";
import { PDF_FORMATTER_API_URL } from "../utils/constants";
import { RESUME_URL } from "../utils/constants";
import { NoDecorationLink } from "./Common";
import { styledBy } from "../utils/helpers";
import { gradientColors } from "../utils/theme";
import {
  makeStyles,
  Paper,
  Theme,
  Button,
  ClickAwayListener,
  Hidden,
  Typography,
} from "@material-ui/core";
import { useAnalytics } from "../utils/useAnalytics";

const useStyles = makeStyles<Theme>((theme) => ({
  downloadButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
    "& > *": {
      marginBottom: 8,
    },
  },
  gradientButton: {
    background: `-webkit-gradient(linear,left top,right top,from(${gradientColors.to}),to(${gradientColors.from}))`,
  },
  saveIcon: {
    marginRight: 8,
  },
  container: {
    position: "relative",
    minHeight: 350,
    cursor: "pointer",
  },
  scaleContainer: {
    zIndex: 1,
    width: 800,
    margin: "0 auto",
    top: 0,
    left: 0,
    right: 0,
    bottom: "100%",
    transformOrigin: "50% 0",
    transition: theme.transitions.create("transform"),
    position: styledBy("isPreviewOpen", {
      true: "unset",
      false: "absolute",
    }),
    transform: styledBy("isPreviewOpen", {
      true: "scale(1)",
      false: "scale(0.3)",
    }),
  },
  resumeContainer: {
    borderRadius: 8,
  },
}));

export const ResumePreview: React.FC = () => {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const styles = useStyles({ isPreviewOpen: isPreviewOpen });
  const send = useAnalytics();

  const openResumePreview = () => {
    send("ResumePreviewOpen");
    setIsPreviewOpen(true);
  };

  return (
    <>
      <div className={styles.downloadButton}>
        <NoDecorationLink download href="/api/renderResume">
          <Button
            className={styles.gradientButton}
            color="primary"
            variant="contained"
            onClick={() => send("ResumeDownload")}
          >
            <SaveIcon className={styles.saveIcon} /> Download .pdf
          </Button>
        </NoDecorationLink>

        <Typography variant="caption">
          This may take a while, please be patient 🐢
        </Typography>
      </div>

      <Hidden mdDown>
        <ClickAwayListener onClickAway={() => setIsPreviewOpen(false)}>
          <div className={styles.container}>
            <Paper
              elevation={24}
              className={styles.scaleContainer}
              onClick={openResumePreview}
            >
              <Resume className={styles.resumeContainer} />
            </Paper>
          </div>
        </ClickAwayListener>
      </Hidden>
    </>
  );
};
