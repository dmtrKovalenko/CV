import * as React from "react";
import Resume from "../pages/resume";
import SaveIcon from "@material-ui/icons/Save";
import { gradientColors } from "../utils/theme";
import {
  makeStyles,
  Paper,
  Theme,
  Button,
  Hidden,
  Typography,
} from "@material-ui/core";
import { useAnalytics } from "../utils/useAnalytics";
import { motion } from "framer-motion";
import { AnimatedText } from "./AnimatedText";

type ResumePreviewProps = { align?: "start" | "center" };
const useStyles = makeStyles<Theme, ResumePreviewProps>(() => ({
  downloadButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: ({ align }) => align ?? "center",
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
    borderRadius: "0.5rem",
    overflow: "hidden",
  },
}));

export const ResumePreview: React.FC<ResumePreviewProps> = (props) => {
  const styles = useStyles(props);
  const send = useAnalytics();
  const [isDownloading, setIsDownloading] = React.useState(false);

  const openResumePreview = () => {
    send("ResumePreviewOpen");
  };

  return (
    <>
      <div className={styles.downloadButton}>
        <Button
          className={styles.gradientButton}
          color="primary"
          variant="contained"
          onClick={() => {
            send("ResumeDownload");
            setIsDownloading(true);
          }}
          href="/api/renderResume"
        >
          <SaveIcon className={styles.saveIcon} /> Download .pdf
        </Button>

        <Typography variant="caption">
          This may take a while, please be patient 🐢
        </Typography>
      </div>

      <Hidden mdDown>
        <div
          style={{
            position: "relative",
            width: 800,
            height: 1800,
            margin: props.align === "center" ? "0 auto" : "0 0",
          }}
        >
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              width: "100%",
              height: "100",
              margin: "0 auto",
            }}
          >
            <motion.div
              initial="hidden"
              style={{ marginTop: "20%" }}
              animate={isDownloading ? "visible" : "hidden"}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.025,
                  },
                },
              }}
            >
              <div className="container">
                {["Take care!", "My resume is already", "In your computer"].map(
                  (item, index) => {
                    return (
                      <AnimatedText
                        highlightWords={["resume", "computer"]}
                        text={item}
                        key={index}
                      />
                    );
                  },
                )}
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            transition={{ delay: 0.6 }}
            style={{ position: "absolute", transformOrigin: "0% 0" }}
            animate={
              isDownloading
                ? {
                    x: [0, -100, -400],
                    y: [0, 0, 3500],
                    scale: 0.1,
                  }
                : {
                    x: 0,
                  }
            }
          >
            <Paper
              elevation={24}
              className={styles.scaleContainer}
              onClick={openResumePreview}
            >
              <Resume className={styles.resumeContainer} />
            </Paper>
          </motion.div>
        </div>
      </Hidden>
    </>
  );
};

ResumePreview.defaultProps = {
  align: "center",
};
