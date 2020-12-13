import * as React from "react";
import { Typography, styled } from "@material-ui/core";

interface VideoProps {
  timeout?: number;
  youTubeVideoId: string;
}

const iframeStyles = {

  width: "100%",
  height: 356,
};

const VideoIFrame = styled("iframe")(iframeStyles);

const VideoPreview = styled("div")({
  ...iframeStyles,
  margin: "32px 0 8px",
  backgroundColor: "black",
});

export const Video: React.FC<VideoProps> = ({ youTubeVideoId, timeout = 200 }) => {
  const [shouldLoadVideo, setLoadVideo] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setLoadVideo(true);
    }, timeout);
  }, []); // eslint-disable-line
  return shouldLoadVideo ? (
    <VideoPreview>
      <VideoIFrame
        frameBorder={0}
        allowFullScreen
        src={`https://www.youtube.com/embed/${youTubeVideoId}`}
      />
    </VideoPreview>
  ) : (
    <VideoPreview />
  );
};

const NoVideoFillerContainer = styled("div")({
  marginTop: 32,
});

export const NoVideoFiller: React.FC<{}> = ({}) => {
  return (
    <NoVideoFillerContainer>
      <Typography>
        It looks like there is no video for this talk 😓. If this is, new talk
        please get back in a few weeks.
        <b> But </b> if you still in the mood to watch something I can propose a
        video of{" "}
        <a href="https://en.wikipedia.org/wiki/Samoyed_(dog)"> samoyed </a>{" "}
        tasting food:
      </Typography>

      <Video youTubeVideoId="rwAzSupGjmo" />
    </NoVideoFillerContainer>
  );
};
