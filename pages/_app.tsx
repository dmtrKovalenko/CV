import * as React from "react";
// @ts-ignore
import withGA from "next-ga";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Router, useRouter } from "next/router";
import { AppProps } from "next/app";
import { MuiThemeProvider, useMediaQuery } from "@material-ui/core";
import { gradientColors, theme } from "../components/utils/theme";
import { PageAnimation } from "../components/animated/PageAnimation";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const isDesktop = useMediaQuery("@media (pointer: fine)")
  const PageAnimationContainer = isDesktop ? PageAnimation : React.Fragment;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title> Dmitriy Kovalenko </title>
      </Head>

      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <PageAnimationContainer>
            <Component {...pageProps} key={router.pathname} />
          </PageAnimationContainer>
        </Layout>
      </MuiThemeProvider>

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
};

export default withGA("UA-153671665-1", Router)(MyApp);
