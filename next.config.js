const withImages = require("next-optimized-images");

module.exports = withImages({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });

    return config;
  }
});
