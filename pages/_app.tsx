import React from "react";
import App, { AppProps } from "next/app";
import Head from "next/head";
import { StylesProvider, MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import getPageContext, {
  PageContext
} from "../components/utils/getPageContext";
import Layout from "../components/layout/Layout";
import { gradientColors } from "../components/utils/theme";

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
    const { Component, pageProps } = this.props;
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
              <Component pageContext={this.pageContext} {...pageProps} />
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
            height: 0
          }}
        >
          <linearGradient id="svg-gradient" x2="1" y2="1">
            <stop offset="0%" stop-color={gradientColors.from} />
            <stop offset="100%" stop-color={gradientColors.to} />
          </linearGradient>
        </svg>
      </>
    );
  }
}

export default MyApp;
