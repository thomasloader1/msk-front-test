const withNextIntl = require("next-intl/plugin")("./i18n.ts");
/** @type {import('next').NextConfig} */

const nextConfig = {
  //output: 'export', //For static site (loses SSR cappabilites)
  //distDir: "dist",

  experimental: {
    runtime: 'experimental-edge',
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wp.msklatam.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
