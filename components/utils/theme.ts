import amber from "@material-ui/core/colors/amber";
import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    htmlFontSize: 15,
    fontFamily: 'GT Walsheim Pro, Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif'
  },
  palette: {
    type: "dark",
    primary: amber,
  }
});

export const gradientColors = {
  from: theme.palette.primary.light,
  to: "#ff5252"
};
