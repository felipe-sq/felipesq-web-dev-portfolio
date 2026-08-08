/** @type {import('next').NextConfig} */
module.exports = {
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/generate-sitemap");
    }

    return config;
  },
};
