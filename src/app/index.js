const path = require('path');

const Koa = require('koa');
const koaBody = require('koa-body');
const cors2 = require('koa2-cors');
const KoaStatic = require('koa-static');
const parameter = require('koa-parameter');

const errorHandler = require('./errorHander');

// const userRouter = require('../router/user.route');
// const emailRouter = require('../router/email.route');
const router = require('../router');

const app = new Koa();

// app.use(cors2());
app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
  });
app.use(koaBody({
    multipart: true,
    formidable:{
        //相对于脚本运行路径下
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true,
    }
}));
app.use(KoaStatic(path.join(__dirname, '../upload')));
app.use(parameter(app));
// app.use(userRouter.routes());
// app.use(emailRouter.routes());
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', errorHandler);

module.exports = app;