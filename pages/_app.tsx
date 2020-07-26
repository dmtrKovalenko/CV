import React from "react";
import App, { AppProps } from "next/app";
import Head from "next/head";
import { StylesProvider, MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import getPageContext, {
  PageContext,
} from "../components/utils/getPageContext";
import Layout from "../components/layout/Layout";
import { gradientColors } from "../components/utils/theme";
import Router, { withRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
// @ts-ignore
import withGA from "next-ga";

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

class MyApp extends App {
  private pageContext: PageContext;

  constructor(props: AppProps) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, router, pageProps } = this.props;
    const spring = {
      type: "spring",
      damping: 20,
      stiffness: 100,
      when: "afterChildren",
    };


    const stackAnimationIn = { x: -300, opacity: 0 };
    const stackAnimationOut = { x: 300, opacity: 1 };
    return (
      <>
        <Head>
          <title> Dmitriy Kovalenko </title>
        </Head>

        <StylesProvider
          generateClassName={this.pageContext.generateClassName}
          sheetsRegistry={this.pageContext.sheetsRegistry}
          sheetsManager={this.pageContext.sheetsManager}
        >
          <MuiThemeProvider theme={this.pageContext.theme}>
            <CssBaseline />
            <Layout>
              <AnimatePresence>
                <div className="page-transition-wrapper">
                  <motion.div
                    transition={spring}
                    key={router.pathname}
                    initial={
                      router.pathname === "/"
                        ? stackAnimationIn
                        : stackAnimationOut
                    }
                    animate={{ x: 0, opacity: 1 }}
                    exit={
                      router.pathname === "/"
                        ? stackAnimationOut
                        : stackAnimationIn
                    }
                    id="page-transition-container"
                  >
                    <Component {...pageProps} key={router.pathname} />
                  </motion.div>
                </div>
              </AnimatePresence>
            </Layout>
          </MuiThemeProvider>
        </StylesProvider>

        {/* needs to fill svg values with gradient */}
        <svg
          aria-hidden
          focusable="false"
          style={{
            width: 0,
            position: "absolute",
            visibility: "hidden",
            height: 0,
          }}
        >
          <linearGradient id="svg-gradient" x2="1" y2="1">
            <stop offset="0%" stopColor={gradientColors.from} />
            <stop offset="100%" stopColor={gradientColors.to} />
          </linearGradient>
        </svg>
      </>
    );
  }
}

export default withRouter(withGA("UA-153671665-1", Router)(MyApp));
