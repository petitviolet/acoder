module.exports = {
  enforce: 'pre',
  test: /\.tsx$/,
  exclude: /node_modules/,
  use: 'tslint-loader',
}
