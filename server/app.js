const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const helmet = require('koa-helmet')
const limit = require('koa-limit')
const { koa2HttpProxys } = require('./midware/proxy')
const loadRoute = require('./utils/load_route')

const app = new Koa()

app.use(async (ctx, next) => {
  await next()
  let contentType = ctx.res._headers['content-type'] || ''
  if (contentType.indexOf('text/html') !== -1) {
    console.log('authorization', ctx.req.headers['authorization'])
  }
})

// security headers
// http://cnodejs.org/topic/5a41c3829807389a1809f6e0
app.use(helmet())
// app.use(limit({ limit: 1000, interval: 1000 * 60 * 60 }))

app.use(bodyparser())
app.use(json())

// http-proxy middlewares
// default proxy to h5.haoguihua.cn ,please modify this config that if you need change
const DEFAULT_PROXY_CONFIG = [
  {
    path: '/j',
    target: 'http://h5.haoguihua.cn'
  }
]
app.use(koa2HttpProxys(DEFAULT_PROXY_CONFIG))

// static path
app.use(require('koa-static')(__dirname + '/../static'))

// view engine
app.use(
  views(__dirname + '/../static/views', {
    extension: 'pug'
  })
)

// auto load routes
loadRoute.init(app, __dirname + '/routes/')

module.exports = app
