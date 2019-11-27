import * as React from "react";
import Resume from "../pages/resume";
import SaveIcon from "@material-ui/icons/Save";
import { PDF_FORMATTER_API_URL } from "./constants";
import { RESUME_URL } from "./constants";
import { NoDecorationLink } from "./_shared/Common";
import { styledBy } from "./utils/helpers";
import {
  makeStyles,
  Paper,
  Theme,
  Button,
  ClickAwayListener,
  Hidden,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles<Theme>((theme) => ({
  downloadButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
    "& > *": {
      marginBottom: 8
    }
  },
  saveIcon: {
    marginRight: 8
  },
  container: {
    position: "relative",
    minHeight: 280,
    cursor: "pointer"
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
    position: styledBy("isClicked", {
      true: "unset",
      false: "absolute"
    }),
    transform: styledBy("isClicked", {
      true: "scale(1)",
      false: "scale(0.3)"
    })
  }
}));

export const ResumePreview: React.FC = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const styles = useStyles({ isClicked });

  return (
    <>
      <div className={styles.downloadButton}>
        <NoDecorationLink
          download
          href={`${PDF_FORMATTER_API_URL}/api/render?url=${RESUME_URL}&attachmentName=DmitriyKovalenko.pdf`}
        >
          <Button color="primary" variant="contained">
            <SaveIcon className={styles.saveIcon} /> Download .pdf
          </Button>
        </NoDecorationLink>

        <Typography variant="caption">
          This may take a while, please be patient
        </Typography>
      </div>

      <Hidden mdDown>
        <ClickAwayListener onClickAway={() => setIsClicked(false)}>
          <div className={styles.container}>
            <Paper
              elevation={24}
              className={styles.scaleContainer}
              onClick={() => setIsClicked(true)}
            >
              <Resume />
            </Paper>
          </div>
        </ClickAwayListener>
      </Hidden>
    </>
  );
};
