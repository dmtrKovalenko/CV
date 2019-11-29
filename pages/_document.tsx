import React from "react";
import PropTypes from "prop-types";
import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext
} from "next/document";
import flush from "styled-jsx/server";
import { PageContext } from "../components/utils/getPageContext";
import { theme } from "../components/utils/theme";

const title = "Dmitriy Kovalenko";
const description =
  "Dmitriy Kovalenko - Software Engineer, Speaker and open-source contributor. Javascript/Ocaml lover";

//@ts-ignore
class MyDocument extends Document<{ pageContext: PageContext }> {
  static getInitialProps = (ctx: DocumentContext) => {
    // Render app and page and get the context of the page with collected side effects.
    let pageContext: PageContext | undefined = undefined;
    const page = ctx.renderPage(Component => {
      const WrappedComponent = (props: any) => {
        pageContext = props.pageContext;
        return <Component {...props} />;
      };

      WrappedComponent.propTypes = {
        pageContext: PropTypes.object.isRequired
      };

      return WrappedComponent;
    });

    let css: string;
    // It might be undefined, e.g. after an error.
    if (pageContext) {
      css = pageContext!.sheetsRegistry.toString();
    }

    return {
      ...page,
      pageContext,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <React.Fragment>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: css! }}
          />
          {flush() || null}
        </React.Fragment>
      )
    };
  };

  render() {
    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
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

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="description" content={description} />
          <meta name="og:description" content={description} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content="/static/og_image.png" />
          <meta name="twitter:title" content={title} />
          <meta property="og:image" content="/static/og_image.png" />
          <meta property="og:title" content={title} />
          <meta property="og:type" content="website" />

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
