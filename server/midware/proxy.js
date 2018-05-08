/**
 * 2018-02-23 17:17:42
 * koa2  http代理中间件
 */

const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer({})

// If the string does not support startWith. Add this feature.
if (!String.prototype.startWith) {
  String.prototype.startWith = function(str) {
    var reg = new RegExp('^' + str)
    return reg.test(this)
  }
}

function defaultErrorHandler(err, req, res) {
  var host = req.headers && req.headers.host
  var code = err.code
  if (res.writeHead && !res.headersSent) {
    if (/HPE_INVALID/.test(code)) {
      res.writeHead(502)
    } else {
      switch (code) {
        case 'ECONNRESET':
        case 'ENOTFOUND':
        case 'ECONNREFUSED':
          res.writeHead(504)
          break
        default:
          res.writeHead(500)
      }
    }
  }
  res.end('Error occured while trying to proxy to: ' + host + req.url)
}

proxy.on('error', defaultErrorHandler)

/**
 * KOA2 配置代理
 * 一个中间件配置一个代理
 * @param [string] urlPattern 需要代理的地址前缀
 * @param [string] options 代理的参数
 */
const koa2HttpProxy = (urlPattern, options) => {
  console.log('\x1B[32m', `[HPM] ${urlPattern} => ${options.target}`)
  return async (ctx, next) => {
    let host = options.target.replace('http://', '').replace('https://', '')
    if (ctx.path.startWith(urlPattern)) {
      ctx.req.headers['host'] = host
      return new Promise((resolve, reject) => {
        proxy.web(ctx.req, ctx.res, options)
      })
    } else {
      await next()
    }
  }
}

/**
 * KOA2 配置代理
 * 在一个中间件里面配置多个代码
 * @param [array] config 多个代理的数组  [{path:'pb/',target:'http://www.haoguihua.cn',...其他代理参数}]
 */
const koa2HttpProxys = config => {
  config = config || []

  // logger
  for (let i = 0; i < config.length; i++) {
    console.log('\x1B[32m', `[HPM] ${config[i].path} => ${config[i].target}`)
  }

  // set proxy
  return async (ctx, next) => {
    if (config.length > 0) {
      for (let i = 0; i < config.length; i++) {
        let host = config[i].target
          .replace('http://', '')
          .replace('https://', '')
        if (ctx.path.startWith(config[i].path)) {
          ctx.req.headers['host'] = host
          return new Promise((resolve, reject) => {
            proxy.web(ctx.req, ctx.res, config[i])
          })
        }
      }
    }
    await next()
  }
}

module.exports = { koa2HttpProxy, koa2HttpProxys }
