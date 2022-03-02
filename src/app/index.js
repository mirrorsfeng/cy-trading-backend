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

app.use(koaBody({
    multipart: true,
    formidable:{
        //相对于脚本运行路径下
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true,
    }
}));
app.use(KoaStatic(path.join(__dirname, '../upload')));
app.use(cors2());
app.use(parameter(app));
// app.use(userRouter.routes());
// app.use(emailRouter.routes());
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', errorHandler);

module.exports = app;