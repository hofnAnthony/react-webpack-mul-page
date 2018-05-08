/**
 * 这里只是单纯的把第三方公共包打出来，不和业务代码包含在一起，因此这里不算dll
 */
var webpack = require('webpack')
var path = require('path')
var os = require('os')
var UglifyJsParallelPlugin = require('webpack-uglify-parallel')
var HappyPack = require('happypack')
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  entry: {
    common: './src/common/js/common.js',
    common_react: './src/common/js/common_react.js',
    common_statistic: './src/common/js/common_statistic.js'
  },
  output: {
    path: path.resolve(__dirname, 'src/common/js/dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'"
      }
    }),
    new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      mangle: true,
      compressor: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      verbose: true
    })
  ]
}
