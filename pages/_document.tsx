import React from "react";
import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { theme } from "../components/utils/theme";
import { ServerStyleSheets } from "@material-ui/core/styles";

const title = "Dmitriy Kovalenko";
const description =
  "Dmitriy Kovalenko - Software Engineer, Speaker and open-source contributor. Javascript/Ocaml lover";

const HOST = "https://dmtrkovalenko.dev";

//@ts-ignore
class MyDocument extends Document<{ pageContext: PageContext }> {
  static getInitialProps = async (ctx: DocumentContext) => {
    // Render app and page and get the context of the page with collected side effects.
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  };

  render() {
    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="robots" content="index,follow" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta
            name="theme-color"
            // @ts-ignore
            content={
              pageContext ? pageContext.theme.palette.primary.main : null
            }
          />

          <meta name="description" content={description} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={`${HOST}/Photo-16x9.png`} />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta name="og:description" content={description} />
          <meta property="og:image" content={`${HOST}/Photo-16x9.png`} />

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
          <link href="/fonts/sf.css" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Nunito:wght@400;600;700&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;1,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;1,700&display=swap"
            rel="stylesheet"
          />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="theme-color" content={theme.palette.primary.light} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
