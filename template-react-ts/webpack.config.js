const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";

const getCssLoaders = () => {
  const loaders = [
    {
      loader: "css-loader",
    },
    {
      loader: "sass-loader",
    },
  ];

  if (devMode) {
    // 开发环境使用style-loader
    loaders.unshift({
      loader: "style-loader",
    });
  } else {
    // 生产环境提取css文件
    loaders.unshift({
      loader: MiniCssExtractPlugin.loader,
    });
  }
  return loaders;
};

const cdnjs = [
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
]
  .map((url) => {
    return `<script crossorigin src="${url}"></script>`;
  })
  .join("");

module.exports = {
  entry: "./src/index.tsx",

  devtool: devMode ? "inline-source-map" : false,

  mode: devMode ? "development" : "production",

  externals: devMode
    ? {}
    : {
        react: "React",
        "react-dom": "ReactDOM",
      },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      Styles: path.resolve(__dirname, "../src/assets/styles/"),
      Images: path.resolve(__dirname, "../src/assets/images/"),
      Utils: path.resolve(__dirname, "../src/utils/"),
    },
  },

  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: getCssLoaders(),
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "assets/images",
        },
      },
      {
        test: /\.(svg|eot|ttf|woff)\w*/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "assets/fonts",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "xun-react-starter",
      template: "./src/template.html",
      minify: false,
      inject: "body",
      cdnjs: cdnjs,
    }),
    new MiniCssExtractPlugin({
      filename: "assets/styles/[name].[contenthash].css",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, "./tsconfig.json"),
      },
    }),
  ],

  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 9001,
    historyApiFallback: true,
  },
};
