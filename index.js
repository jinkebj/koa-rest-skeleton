const SERVER_PORT = 3000

const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaBody = require('koa-body')

const app = new Koa()
const router = new KoaRouter({
  prefix: '/api'
})
const body = new KoaBody()

// x-response-time
app.use(async function (ctx, next) {
  const start = new Date()
  await next()
  const ms = new Date() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// logger
app.use(async function (ctx, next) {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// router
app.use(router.routes()).use(router.allowedMethods())

router.get('/',
  (ctx) => {
    ctx.body = {
      result: 'success',
      content: 'Hello World!'
    }
  }
)

router.post('/', body,
  (ctx) => {
    console.log(ctx.request.body)
    ctx.body = JSON.stringify(ctx.request.body)
  }
)

app.listen(SERVER_PORT, () => console.log('server started ' + SERVER_PORT))
