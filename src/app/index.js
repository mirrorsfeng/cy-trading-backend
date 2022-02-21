const Koa = require('koa');
const koaBody = require('koa-body');

const errorHandler = require('./errorHander');

const userRouter = require('../router/user.route');
const emailRouter = require('../router/email.route');

const app = new Koa();

app.use(koaBody());
app.use(userRouter.routes());
app.use(emailRouter.routes());

app.on('error', errorHandler);

module.exports = app;