const path = require("path");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  distDir: "_next",

  poweredByHeader: false,

  reactStrictMode: true,

  assetPrefix: isProd ? "https://static.xxx.com/" : "",

  images: {
    domains: ["avatars.githubusercontent.com", "static.cnodejs.org"],
  },

  env: {
    NEXT_PUBLIC_TARGET: process.env["TARGET"],
  },
};
