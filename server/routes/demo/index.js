const router = require('koa-router')()

router.prefix('/demo')

router.get('/test', async (ctx, next) => {
  await ctx.render('demo/link', {
    title: 'Hello Koa 2!'
  })
})

module.exports = router
