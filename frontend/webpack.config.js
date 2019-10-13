const webpack = require('webpack');
const path = require("path");

module.exports = (env, argv) => ({
  mode: 'development',

  entry: path.resolve(__dirname, "src/index.tsx"),

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },

  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
  },

  resolve: {
    modules: [
      "node_modules",
      path.resolve('./src'),
    ],
    extensions: [".ts", ".tsx", ".js"]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    historyApiFallback: true,
    port: 3035,
    hot: true,
    open: true,
    watchContentBase: true
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development"
    })
  ]
});
