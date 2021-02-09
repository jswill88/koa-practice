const Koa = require('koa');
const Router = require('koa-router');

/** Logger gives info in the server terminal about the requests */
const Logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();


/** add error middleware before routes */
app.use(async (ctx, next) => {
  try {
    await next()
  } catch(e) {
    console.log(e.status);
    ctx.status = e.status || 500;
    ctx.body = e.message;
  }
});

router.get('home', '/', async ctx => {
  /** test what error looks like */
  // ctx.throw('sample error message', 500);
  ctx.status = 200;
  ctx.body = 'Hello Koa.js server';
});

router.post('/paramtest/:word', async ctx => {
  const { word } = ctx.params;
  ctx.status = 201;
  // The ctx.body is what shown in the response
  ctx.body = `this is the word submitted: ${word}`
})

router.post('/body', async (ctx) => {
  // const { request: req } = ctx;
  const { request } =  ctx;
  /** With the koa-bodyparser, the body is now in req.body */
  console.log('request', request.body);
  ctx.body = request.body;
})

app.use(bodyParser());
app.use(Logger());

/** boilerplate koa code */
app.use(router.routes())
  .use(router.allowedMethods());

app.listen(8080, () => {
  console.log('listening on 8080')
});
