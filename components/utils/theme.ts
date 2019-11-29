import amber from "@material-ui/core/colors/amber";
import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: amber
  }
});

export const gradientColors = {
  from: theme.palette.primary.light,
  to: "#ff5252"
};
