import * as React from "react";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { MuiThemeProvider, useMediaQuery } from "@material-ui/core";
import { gradientColors, theme } from "../utils/theme";
import { PageAnimation } from "../components/PageAnimation";
import Script from "next/script";

const title = "Dmitriy Kovalenko";
const description =
  "Dmitriy Kovalenko - Software Engineer, Speaker and open-source contributor. Rust and C multimedia expert.";

const HOST = "https://dmtrkovalenko.dev";


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

        <meta charSet="utf-8" />
        <meta name="robots" content="index,follow" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#1a1a1a" />

        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${HOST}/Photo-16x9.jpg`} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta property="og:image" content={`${HOST}/Photo-16x9.jpg`} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="preload" as="stylesheet" href="/fonts/sf.css" />
        <link
          rel="preload"
          as="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;1,700&display=swap"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

      </Head>

      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <PageAnimationContainer>
            <Component {...pageProps} key={router.pathname} />
          </PageAnimationContainer>
        </Layout>
      </MuiThemeProvider>

      <Script
        defer
        data-domain="dmtrkovalenko.dev"
        src="https://plausible.io/js/plausible.js"
      />

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
