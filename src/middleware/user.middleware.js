const bcrypt = require('bcryptjs');
const { searchUserInfo } = require('../service/user.service');
const { findCode } = require('../service/emailCode.service');
const { userFormateError,
        userAlreadyExited, 
        userRegisterError, 
        userNotExist, 
        userLoginError,
        userPasswordError,
        emailCodeError,
        emailCodeNotExist,
     } = require('../constants/err.type');

const userValidator = async (ctx, next) => {
    const { user_name, passWord } = ctx.request.body;
    if(!user_name || !passWord) {
        console.error('用户名或密码为空或邮箱', ctx.request.body);
        ctx.app.emit('error',userFormateError, ctx);
        return;
    }
    await next();
}

const registerValidator = async (ctx, next) => {
    const { user_name, passWord, email, code } = ctx.request.body;
    if(!user_name || !passWord || !email || !code) {
        console.error('用户名或密码为空或邮箱', ctx.request.body);
        ctx.app.emit('error',userFormateError, ctx);
        return;
    }
    try {
        const codeRes = await findCode(email);
        if(code != codeRes.code) {
            console.error("验证码错误")
            ctx.app.emit('error', emailCodeError, ctx);
            return;
        }
    } catch (err) {
        console.error('该邮箱没有获取验证码');
        ctx.app.emit('error', emailCodeNotExist, ctx);
        return;
    }
    await next();
}

const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body;
    try{
        const isRepeat = await searchUserInfo(user_name);
        if(isRepeat){
            console.error('用户已存在');
            ctx.app.emit('error',userAlreadyExited, ctx);
              return;
          }
    }catch(err) {
        console.error('用户注册错误');
        ctx.app.emit('error', userRegisterError, ctx);
        return;
    }
    
    await next();
}

const cryptPassword = async (ctx,next) => {
    const body =  ctx.request.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.passWord, salt);
    body.passWord = hash;

    ctx.request.body = body;

    await next();
}

const verifyLogin = async (ctx,next) => {
    const { user_name, passWord } = ctx.request.body;

    try {
        const res = await searchUserInfo(user_name);
    if(!res) {
        console.error('用户不存在!');
        ctx.app.emit('error', userNotExist ,ctx)
        return;
    }

    if(!bcrypt.compareSync(passWord, res.passWord)) {
        console.error('用户密码错误');
        ctx.app.emit('error', userPasswordError ,ctx);
        return;
    }
        
    } catch (err) {
        console.error(err);
        return ctx.app.emit('error', userLoginError, ctx);
    }
    
    await next();
}

module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin,
    registerValidator
}