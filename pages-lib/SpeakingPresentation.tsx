import * as React from "react";
import { talks } from "../content/talks.json";
import { gradientColors } from "../utils/theme";
import { Avatar, makeStyles, Typography } from "@material-ui/core";
import { NoDecorationColorLink } from "../components/Common";

type Presentation = typeof talks[number]["presentations"][number];

interface SpeakingPresentationProps {
  presentation: Presentation;
}

const useStyles = makeStyles({
  talkPresentation: {
    display: "flex",
    flexWrap: "nowrap",
    marginBottom: 8,
    alignItems: "center",
    "&:hover": {
      "& $avatarBorder": {
        background: `linear-gradient(0deg,${gradientColors.from},${gradientColors.to})`,
      },
    },
  },
  conferenceLogo: {
    width: 64,
    height: 64,
  },
  avatarBorder: {
    padding: "3px 4px",
    borderRadius: "50%",
    marginRight: 8,
  },
});

export const SpeakingPresentation: React.FC<SpeakingPresentationProps> = ({
  presentation,
}) => {
  const styles = useStyles();
  return (
    <NoDecorationColorLink
      target="_blank"
      rel="noopener noreferrer"
      href={presentation.confWebsite}
      onClick={(e) => e.stopPropagation}
    >
      <div key={presentation.conference} className={styles.talkPresentation}>
        <div className={styles.avatarBorder}>
          <Avatar
            src={presentation.confLogoUrl}
            className={styles.conferenceLogo}
            alt={presentation.conference + " logo"}
          />
        </div>
        <Typography component="p" variant="subtitle1">
          {presentation.conference}
        </Typography>
      </div>
    </NoDecorationColorLink>
  );
};
