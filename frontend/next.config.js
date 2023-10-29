// /* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-env node */
// // @ts-check

// /**
//  * @type {import('next').NextConfig}
//  **/
// let nextConfig = {}

// const withTwin = require('./withTwin.js')
// nextConfig = withTwin(nextConfig)

// module.exports = nextConfig

/** @type {import('next').NextConfig} */

// const nextConfig = {}
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // {...nextConfig},
};
