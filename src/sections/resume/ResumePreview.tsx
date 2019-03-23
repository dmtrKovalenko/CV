import * as React from "react";
import Resume from "../../../pages/resume";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/styles";
import { PDF_FORMATTER_API_URL } from "../../constants";
import { RESUME_URL } from "../../constants";
import {
  Paper,
  Theme,
  Button,
  ClickAwayListener,
  Hidden
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  downloadButton: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 16
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
    transform: `scale(0.3)`,
    transition: theme.transitions.create("transform"),
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "100%"
  }
}));

export const ResumePreview: React.FC = () => {
  const styles = useStyles();
  const [isClicked, setIsClicked] = React.useState(false);

  return (
    <>
      <div className={styles.downloadButton}>
        <a
          download
          href={`${PDF_FORMATTER_API_URL}/api/render?url=${RESUME_URL}&attachmentName=DmitriyKovalenko.pdf`}
        >
          <Button color="primary" variant="contained">
            <SaveIcon className={styles.saveIcon} /> Download .pdf
          </Button>
        </a>
      </div>

      <Hidden mdDown>
        <ClickAwayListener onClickAway={() => setIsClicked(false)}>
          <div className={styles.container}>
            <Paper
              id="resume"
              className={styles.scaleContainer}
              elevation={24}
              style={{
                transform: isClicked ? "scale(1)" : undefined,
                position: isClicked ? "unset" : undefined,
                transformOrigin: isClicked ? "50% 0" : undefined
              }}
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
