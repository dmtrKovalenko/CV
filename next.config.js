const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

module.exports = withCSS(
  withImages({
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    webpack: config => {
      config.module.rules.push({
        test: /\.md$/,
        use: "raw-loader"
      });

      return config;
    }
  })
);
