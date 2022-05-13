import * as React from "react";
import { BoldTypography, Page, PageTitle } from "../components/Common";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import WarningIcon from "@material-ui/icons/Warning";
import {
  makeStyles,
  Typography,
  Button,
  TextField,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { useAnalytics } from "../utils/useAnalytics";

const useStyles = makeStyles((theme) => ({
  clipPath: {
    width: "100%",
    height: 200,
    backgroundColor: "#1a1a1a",
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 100% 0)",
    "-webkit-clip-path": "polygon(0 100%, 100% 100%, 100% 100%, 100% 0)",
    [theme.breakpoints.down("sm")]: {
      height: 100,
    },
  },
  page: {
    backgroundColor: "#1a1a1a",
    paddingTop: 64,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 16,
    },
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
      marginBottom: "3rem",
    },
  },
  feedbackInput: {
    gridArea: "feedback-input",
  },
  sendButton: {
    gridArea: "send",
    marginTop: 16,
    fontWeight: "bold",
  },
  helperMessage: {
    fontSize: "1rem",
  },
}));

type RequestState = "idle" | "pending" | "success" | "error" | "overlimit";

function getIcon(state: RequestState) {
  switch (state) {
    case "overlimit":
      return <WarningIcon />;

    case "pending":
      return <CircularProgress size={24} />;

    case "success":
      return <DoneAllIcon />;

    default:
      return <ArrowForwardIcon />;
  }
}

function getMessage(state: RequestState) {
  switch (state) {
    case "overlimit":
      return "Your feedback was sent already. Please please please, do not perform DoS-attack on this form XD";
    case "error":
      return "A critical error appeared while sending your feedback. This is really weird that you see this. I am sorry 🙈! I`ll be notified about this error and will try to fix this ASAP.";
    case "success":
      return "Your feedback was sent. Thanks for your words 🙏";

    default:
      return " ";
  }
}

export const Feedback: React.FC = ({}) => {
  const styles = useStyles();
  const theme = useTheme();
  const formRef = React.useRef<HTMLFormElement>(null);
  const toShowLargeTextArea = useMediaQuery(theme.breakpoints.up("sm"));
  const [message, setMessage] = React.useState("");
  const [sendingState, setSendingState] = React.useState<RequestState>("idle");
  const send = useAnalytics();

  const sendFeedback = () => {
    if (!message) {
      return;
    }

    if (sendingState === "success" || sendingState === "overlimit") {
      setSendingState("overlimit");
      return;
    }

    setSendingState("pending");

    if (!formRef.current) {
      setSendingState("error");
      return;
    }

    fetch(`/api/sendFeedback?message=${message}`, {
      method: "GET",
    })
      .then((res) => {
        if (res.status >= 400) {
          setSendingState("error");
          send("FeedbackError", { props: res });
        } else {
          setSendingState("success");
          send("FeedbackSent");
        }
      })
      .catch(() => setSendingState("error"));
  };

  return (
    <>
      <div className={styles.clipPath} />
      <Page className={styles.page}>
        <form
          name="Feedback"
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            sendFeedback();
          }}
        >
          <div className={styles.grid}>
            <BoldTypography variant="h3" id="about" align="left" className={styles.title}>
              Drop me a <span className="gradientText"> note</span>
            </BoldTypography>

            <Typography className={styles.description} gutterBottom>
              Say something! Send me a completely private and <b>anonymous</b>{" "}
              message. Feel free to say anything, even if it's not positive.
              Looking forward to your feedback!
            </Typography>

            <div className={styles.feedbackInput}>
              <TextField
                id="feedback-message"
                required
                fullWidth
                multiline
                rows={toShowLargeTextArea ? 12 : 6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                label="Your message"
                placeholder="Any text"
                variant="outlined"
                name="message"
                FormHelperTextProps={{ className: styles.helperMessage }}
                helperText={getMessage(sendingState)}
              />
            </div>

            <div className={styles.sendButton}>
              <Button
                type="submit"
                size="large"
                variant="outlined"
                color="primary"
                disabled={sendingState === "overlimit"}
                className={styles.sendButton}
                endIcon={getIcon(sendingState)}
              >
                Send
              </Button>
            </div>
          </div>
        </form>
      </Page>
    </>
  );
};
