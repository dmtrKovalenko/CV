import * as React from "react";
import { Typography, styled } from "@material-ui/core";

interface VideoProps {
  youTubeVideoId: string;
}

const VideoIFrame = styled("iframe")({
  margin: "32px 0 8px",
  width: "100%",
  height: 390,
});

export const Video: React.FC<VideoProps> = ({ youTubeVideoId }) => {
  return (
    <VideoIFrame
      frameBorder={0}
      src={`https://www.youtube.com/embed/${youTubeVideoId}`}
    />
  );
};

const NoVideoFillerContainer = styled("div")({
  marginTop: 32
})

export const NoVideoFiller: React.FC<{}> = ({}) => {
  return (
    <NoVideoFillerContainer>
      <Typography>
        It looks like there is no video for this talk 😓. If this is a new talk
        please get back in a few weeks.
      </Typography>
      <Typography>
        <b> But </b> if you still in the mood to watch something – I propose a
        video of <a href="https://en.wikipedia.org/wiki/Samoyed_(dog)"> samoyed </a> tasting food:
      </Typography>

      <Video youTubeVideoId="rwAzSupGjmo" />
    </NoVideoFillerContainer>
  );
};
