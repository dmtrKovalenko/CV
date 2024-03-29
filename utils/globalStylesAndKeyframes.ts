import { withStyles } from "@material-ui/core";
import { gradientColors } from "./theme";

export const withGlobalStylesAndKeyframes = withStyles((theme) => ({
  "@global": {
    a: {
      color: theme.palette.primary.light,
    },
    ".page-transition-container": {
      overflow: "hidden",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    ".secondaryFont": {
      fontWeight: "bold",
      fontFamily: "Nunito,-apple-system,BlinkMacSystemFont,sans-serif",
    },
    "@keyframes mouse-icon-scroll": {
      from: { opacity: 1 },
      to: { opacity: 0, transform: "translateY(36px)" },
    },
    "@keyframes mouse-icon-appear": {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    ".gradientText": {
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      background: `-webkit-gradient(linear,left top,right top,from(${gradientColors.to}),to(${gradientColors.from}))`,
    },
    ".gradientTextToTop": {
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      background: `linear-gradient(to top, ${gradientColors.to}, ${gradientColors.from})`,
    },
  },
}));
