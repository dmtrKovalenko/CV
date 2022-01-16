import * as React from "react";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { MuiThemeProvider, useMediaQuery } from "@material-ui/core";
import { gradientColors, theme } from "../utils/theme";
import { PageAnimation } from "../components/PageAnimation";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isDesktop = useMediaQuery("@media (pointer: fine)");
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
}
