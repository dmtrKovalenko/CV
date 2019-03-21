import React from 'react';
import PropTypes from 'prop-types';
import Document, { Head, Main, NextScript } from 'next/document';
// @ts-ignore
import flush from 'styled-jsx/server';
import { PageContext } from '../src/utils/getPageContext';

class MyDocument extends Document<{ pageContext: PageContext }> {
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
            content={pageContext ? pageContext.theme.palette.primary.main : null}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js" />

          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"/>
          <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5"/>
          <link rel="stylesheet" href="/static/global.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = ctx => {
  // Render app and page and get the context of the page with collected side effects.
  let pageContext: PageContext | undefined = undefined;
  const page = ctx.renderPage(Component => {
    const WrappedComponent = (props: any) => {
      pageContext = props.pageContext;
      return <Component {...props} />;
    };

    WrappedComponent.propTypes = {
      pageContext: PropTypes.object.isRequired,
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
    ),
  };
};

export default MyDocument;
