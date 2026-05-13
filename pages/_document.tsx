import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";


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
    return (
      <Html lang="en" dir="ltr" style={{ colorScheme: "dark" }}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200;300;400;500;600&family=Inter:wght@300;400;500;600;700&family=Noto+Color+Emoji&display=swap"
            rel="stylesheet"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @font-face {
                  font-family: "EmojiFallback";
                  src: local("Apple Color Emoji"),
                       local("Segoe UI Emoji"),
                       local("Segoe UI Symbol"),
                       local("Noto Color Emoji"),
                       url(https://fonts.gstatic.com/s/notocoloremoji/v25/Yq6P-KqIXTD0t4D9z1ESnKM3-HpFabsE4tq3luCC7p-aXxcn.0.woff2) format("woff2");
                  unicode-range: U+1F000-1FFFF, U+2600-27BF, U+2300-23FF, U+2B00-2BFF, U+1F300-1F9FF, U+1FA00-1FAFF, U+200D, U+FE0F, U+20E3;
                }
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
