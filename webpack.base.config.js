var path = require('path')
var glob = require('globby')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 获取入口文件
function getEntries(config) {
  var fileList = glob.sync(config.pattern)
  return fileList.reduce(function(previous, current) {
    var filePath = path.parse(path.relative(config.src, current))
    var withoutSuffix = path.join(filePath.dir, filePath.name)
    previous[withoutSuffix] = path.resolve(__dirname, current)
    return previous
  }, {})
}

var ENTRY_CONFIG = {
  css: {
    pattern: ['./src/**/[^_]*.less', '!./src/common/**/*.less', '!./src/old/**/*.less'],
    src: path.join(__dirname, 'src'),
    dst: path.resolve(__dirname, 'static/build/webpack')
  },
  js: {
    pattern: ['./src/**/[^_]*.js', '!./src/gulp/**/*.js', '!./src/common/**/*.js', '!./src/old/**/*.js'],
    src: path.join(__dirname, 'src'),
    dst: path.resolve(__dirname, 'static/build/webpack')
  }
}

// 别名配置
var ALIAS_CONFIG = ['share', 'components', 'const', 'webview', 'lib', 'log', 'utils']

function getAlias() {
  return ALIAS_CONFIG.reduce(function(previous, current) {
    var aliasName = `lcgc_${current}`
    previous[aliasName] = path.resolve(__dirname, `src/common/js/${current}/`)
    return previous
  }, {})
}

module.exports = function() {
  let config = [
    {
      devtool: 'cheap-module-eval-source-map',
      context: path.resolve(__dirname),
      entry: getEntries(ENTRY_CONFIG.css),
      output: {
        path: ENTRY_CONFIG.css.dst,
        filename: '[name].css'
      },
      module: {
        rules: [
          {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader', 'less-loader']
            })
          }
        ]
      },
      resolve: {
        extensions: ['.less']
      },
      plugins: [new ExtractTextPlugin('[name].css')]
    },
    {
      context: path.resolve(__dirname),
      entry: getEntries(ENTRY_CONFIG.js),
      output: {
        path: ENTRY_CONFIG.js.dst,
        filename: '[name].js'
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            use: 'babel-loader?cacheDirectory=true',
            exclude: /node_modules/
          },
          {
            test: /\.(svg)$/i,
            use: 'svg-sprite-loader',
            include: [require.resolve('antd-mobile').replace(/warn\.js$/, '')]
          },
          /**
           * LCGC-UI 组件库，不把 px 转成 rem
           * 否则样式有问题
           */
          {
            test: /\.css/,
            use: ['style-loader', 'css-loader'],
            include: /node_modules\/lcgc-ui/
          },
          /**
           * 在JS里面引入样式的，会把PX 转成 REM
           */
          {
            test: /\.css/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
            exclude: /node_modules\/lcgc-ui/
          },
          {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
          },
          {
            test: /\.json$/,
            use: 'json-loader'
          }
        ]
      },
      resolve: {
        alias: getAlias(),
        modules: [ENTRY_CONFIG.js.src, 'node_modules'],
        extensions: ['.web.js', '.js', '.json', '.less']
      },
      plugins: [],
      externals: {
        react: 'var React',
        'react-dom': 'var ReactDOM',
        'react-addons-css-transition-group': 'var ReactCSSTransitionGroup'
      }
    }
  ]
  return config
}
