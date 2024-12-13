import * as React from "react";
import ExportedImage from "next-image-export-optimizer";
import { talks } from "../content/talks.json";
import { gradientColors } from "../utils/theme";
import { makeStyles, Typography } from "@material-ui/core";
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
      "& $conferenceLogoBorder": {
        background: `linear-gradient(0deg,${gradientColors.from},${gradientColors.to})`,
      },
    },
  },
  conferenceLogo: {
    borderRadius: "50%",
  },
  conferenceLogoBorder: {
    padding: "4px 4px 0px 4px",
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
        <div className={styles.conferenceLogoBorder}>
          <ExportedImage
            alt={presentation.conference + " logo"}
            className={styles.conferenceLogo}
            width={64}
            height={64}
            src={presentation.confLogoUrl}
          />
        </div>
        <Typography component="p" variant="subtitle1">
          {presentation.conference}
        </Typography>
      </div>
    </NoDecorationColorLink>
  );
};
