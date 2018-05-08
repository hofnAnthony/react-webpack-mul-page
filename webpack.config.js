var getWebpackConfig = require('./webpack.base.config')
let config = getWebpackConfig(false)

config[0].devtool = 'cheap-module-source-map'
config[1].devtool = 'inline-cheap-source-map'
config[1].module.rules.push({
  test: /\.(eot|woff|woff2|svg|ttf|png|jpg|jpeg|gif)(\?v=[\d\.]+)?$/,
  use: 'file-loader?name=/build/files/[name].[ext]',
  exclude: /node_modules\/antd-mobile/,
})

module.exports = config
