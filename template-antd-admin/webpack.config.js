const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: path.resolve(__dirname, "src/main.tsx"),

  cache: {
    type: "filesystem", // 使用文件缓存
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "tsx",
              target: "es2015",
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".ejs"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    fallback: { crypto: false, querystring: false, path: false, url: false },
    modules: ["node_modules", path.resolve(__dirname, "src")],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: path.join(__dirname, "public/index.html"),
      env: process.env.BUILD_ENV,
    }),
  ],
};
