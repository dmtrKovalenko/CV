import React from "react";
import App from "next/app";
import Head from "next/head";
import { StylesProvider, ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import getPageContext, { PageContext } from "../components/utils/getPageContext";
// @ts-ignore
import { MuiThemeProvider } from "@material-ui/core";
import Layout from "../components/layout/Layout";

class MyApp extends App {
  constructor() {
    // @ts-ignore
    super();
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
            <ThemeProvider theme={this.pageContext.theme}>
              <CssBaseline />
              <Layout>
                <Component pageContext={this.pageContext} {...pageProps} />
              </Layout>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </>
    );
  }

  private pageContext: PageContext;
}

export default MyApp;
