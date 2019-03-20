const withImages = require('next-images');
const withTypescript = require('@zeit/next-typescript');

module.exports = withImages(
  withTypescript({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    webpack: (config) => {
      config.module.rules.push(
        {
          test: /\.md$/,
          use: 'raw-loader'
        }
      )
  
      return config
    },
  })
);
