import { withStyles } from "@material-ui/styles";

export const withGlobalStylesAndKeyframes = withStyles(theme => ({
  "@global": {
    a: {
      color: theme.palette.primary.light
    },
    "@keyframes mouse-icon-scroll": {
      from: { opacity: 1 },
      to: { opacity: 0, transform: "translateY(36px)" }
    },
    "@keyframes mouse-icon-appear": {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
  }
}));
