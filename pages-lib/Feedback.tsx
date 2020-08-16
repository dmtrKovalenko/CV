import * as Rt from "react";
import Link from "next/link";
import { Page, PageTitle } from "../components/Common";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {
  makeStyles,
  Typography,
  Avatar,
  Button,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  clipPath: {
    width: "100%",
    height: 200,
    backgroundColor: "#1a1a1a",
    // clipPath: "polygon(0 0, 0% 100%, 100% 100%)",
    "-webkit-clip-path": "polygon(0 100%, 100% 100%, 100% 100%, 100% 0)",
    [theme.breakpoints.down("sm")]: {
      height: 100,
    },
  },
  page: {
    backgroundColor: "#1a1a1a",
    paddingTop: 64,
    // compensation for the footer clip path
    paddingBottom: 200 + 64,
    marginBottom: -200,
  },
  grid: {
    maxWidth: 1300,
    margin: "64px auto",
    display: "grid",
    gridTemplateAreas: `
    "title"
    "description"
    "feedback-input"
    "send"
    `,
    gridColumnGap: 32,
    gridTemplateColumns: "1fr",
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr",
      gridColumnGap: 128,
      gridTemplateAreas: `
      "title feedback-input"
      "description feedback-input"
      "description feedback-input"
      "send feedback-input"
     `,
    },
  },
  title: {
    marginTop: 0,
    gridArea: "title",
  },
  description: {
    gridArea: "description",
    [theme.breakpoints.down("md")]: {
      marginBottom: "3rem"
    }
  },
  feedbackInput: {
    gridArea: "feedback-input",
  },
  sendButton: {
    gridArea: "send",
    marginTop: 16,
    fontWeight: "bold",
  },
}));

export const Feedback: React.FC = ({}) => {
  const styles = useStyles();

  const sendFeedback = () => {
    fetch('local')
  };



  return (
    <>
      <div className={styles.clipPath} />
      <Page className={styles.page}>
        <div className={styles.grid}>
          <PageTitle id="about" align="left" className={styles.title}>
            Drop me a <span className="gradientText"> note</span>
          </PageTitle>

          <Typography className={styles.description} gutterBottom>
            Say something! Send me a completely private and <b>anonymous</b>{" "}
            message. Feel free to say anything, even if it's not positive.
            Looking forward for Your feedback!
          </Typography>

          <div className={styles.sendButton}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              className={styles.sendButton}
              endIcon={<ArrowForwardIcon />}
            >
              Send
            </Button>
          </div>

          <div className={styles.feedbackInput}>
            <TextField
              fullWidth
              rows={12}
              label="Your message"
              multiline
              placeholder="Any text"
              variant="outlined"
              helperText={" "}
            />
          </div>
        </div>
      </Page>
    </>
  );
};
