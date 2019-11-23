import * as React from "react";
import { Theme, makeStyles } from "@material-ui/core";
import { Footer } from "./Footer";
import { useRouter } from "next/router";
import { DeerSvg } from "../_shared/icons/DeerSvg";
import Link from "next/link";

interface LayoutProps {}

const useStyles = makeStyles((theme: Theme) => ({
  homeBtn: {
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    transition: theme.transitions.create("transform"),

    "&:hover": {
      transform: "translateY(-10px)"
    }
  }
}));

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const styles = useStyles();
  const router = useRouter();

  if (["/resume", "/resumeFullCv"].includes(router!.pathname)) {
    return <>{children}</>;
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

export default Layout;
