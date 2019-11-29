import { withStyles } from "@material-ui/core";
import { gradientColors } from "./theme";

export const withGlobalStylesAndKeyframes = withStyles(theme => ({
  "@global": {
    a: {
      color: theme.palette.primary.light
    },
    '.gradientText': {
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      background: `-webkit-gradient(linear,left top,right top,from(${gradientColors.to}),to(${gradientColors.from}))`
    },
    "@keyframes mouse-icon-scroll": {
      from: { opacity: 1 },
      to: { opacity: 0, transform: "translateY(36px)" }
    },
    "@keyframes mouse-icon-appear": {
      from: { opacity: 0 },
      to: { opacity: 1 }
    }
  }
}));
