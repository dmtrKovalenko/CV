import amber from "@material-ui/core/colors/amber";
import { createMuiTheme } from "@material-ui/core";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});

export const theme = createMuiTheme({
  typography: {
    htmlFontSize: 15,
    fontFamily:
      "GT Walsheim Pro, Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif",
    body1: {
      fontSize: "1.3rem",
      [breakpoints.down("sm")]: {
        fontSize: "1.2rem"
      }
    },
    h1: {
      fontSize: "4.5rem",
      [breakpoints.down("sm")]: {
        fontSize: "4rem"
      }
    },
    h2: {
      fontSize: "4.5rem",
      [breakpoints.down("sm")]: {
        fontSize: "4rem"
      }
    }
  },
  palette: {
    type: "dark",
    primary: amber,
  },
});

export const gradientColors = {
  from: theme.palette.primary.light,
  to: "#ff5252",
};
