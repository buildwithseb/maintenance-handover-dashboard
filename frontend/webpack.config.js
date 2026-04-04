const path = require("path");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/app.js",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      clean: true,
    },

    devServer: {
      static: {
        directory: path.resolve(__dirname),
      },
      open: true,
    },

    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",

    plugins: [
      new Dotenv(
        { systemvars: true, }
      ),
      new CopyPlugin({
        patterns: [
          { from: "index.html", to: "index.html" },
          { from: "styles.css", to: "styles.css", noErrorOnMissing: true }
        ],
      }),
    ],
  };
};