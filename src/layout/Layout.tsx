import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { Footer } from "./Footer";

interface LayoutProps {}

const useStyles = makeStyles((theme: Theme) => ({
  "@global": {
    a: {
      color: theme.palette.primary.light
    }
  }
}));

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const styles = useStyles();

  return (
    <main>
      <div children={children} />
      <Footer />
    </main>
  );
};

export default Layout;
