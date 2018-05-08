
var os = require('os')
var webpack = require('webpack')
var UglifyJsParallelPlugin = require('webpack-uglify-parallel')
var HappyPack = require('happypack')
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

var getWebpackConfig = require('./webpack.base.config')
var config = getWebpackConfig()

config[1].module.rules.push({
  test: /\.(eot|woff|woff2|svg|ttf|png|jpg|jpeg|gif)(\?v=[\d\.]+)?$/,
  use: 'file-loader?name=/dist/files/[name].[ext]',
  exclude: /node_modules\/antd-mobile/,
})

// 设置构建JS线上环境变量
config[1].plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: '"production"'
  }
}))

// 设置压缩代码
config[1].plugins.push(new UglifyJsParallelPlugin({
  workers: os.cpus().length,
  mangle: true,
  compressor: {
    warnings: false,
    drop_console: true,
    drop_debugger: true
  }
}))

// 开始多线程构建
config[1].plugins.push(new HappyPack({
  id: 'happybabel',
  loaders: ['babel-loader'],
  threadPool: happyThreadPool,
  verbose: true
}))

module.exports = config
