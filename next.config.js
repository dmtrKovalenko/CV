const withImages = require('next-images');
const withTypescript = require('@zeit/next-typescript');

module.exports = withImages(
  withTypescript({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  })
);
