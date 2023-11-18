const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // resolve: {
  //   modules: ["node_modules", path.resolve(__dirname, "src")],
  //   fallback: {
  //     fs: false,
  //     tls: false,
  //     net: false,
  //     path: require.resolve("path-browserify"),
  //     zlib: false,
  //     http: false,
  //     https: false,
  //     stream: require.resolve("stream-browserify"),
  //     util: require.resolve("util/"),
  //     buffer: require.resolve("buffer/"),
  //     crypto: require.resolve("crypto-browserify"),
  //     "scaler-school-of-technology/bhashini-web-translator": require.resolve(
  //       "@scaler-school-of-technology/bhashini-web-translator"
  //     ),
  //   },
  // },
  entry: {
    popup: "./src/popup.jsx",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/popup.html",
      filename: "popup.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
};
