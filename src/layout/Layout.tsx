import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { Footer } from "./Footer";
import { withRouter, WithRouterProps } from "next/router";
import { DeerSvg } from "../../src/_shared/icons/DeerSvg";
import Link from "next/link";

interface LayoutProps extends WithRouterProps {}

const useStyles = makeStyles((theme: Theme) => ({
  "@global": {
    a: {
      color: theme.palette.primary.light
    }
  },
  homeBtn: {
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: theme.transitions.create('transform'),

    "&:hover": {
      transform: 'translateY(-10px)'
    }
  }
}));

const Layout: React.FunctionComponent<LayoutProps> = ({ router, children }) => {
  const styles = useStyles();

  if (router!.pathname === "/resume") {
    return <>{children}</>
  }

  return (
    <main>
      {router!.pathname !== "/" && (
        <Link href="/">
          <div className={styles.homeBtn}>
           <DeerSvg />
          </div>
        </Link>
      )}

      <div children={children} />
      <Footer />
    </main>
  );
};

export default withRouter(Layout);
