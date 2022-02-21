const jwt = require('jsonwebtoken');
const { createUser, searchUserInfo } = require('../service/user.service');
const { userRegisterError } = require('../constants/err.type');

const { JWT_SECRET } = require('../config/config.default');
class UserController {
    async register(ctx, next) {
        const { user_name, passWord } = JSON.parse(ctx.request.body);

        try{
            const res = await createUser(user_name, passWord);
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name,
                }
            }
            return;
        }catch(err) {
            console.log(err);
            ctx.app.emit('error', userRegisterError, ctx);
        }
           
        
        
    }

    async login(ctx, next) {
        const {user_name} = JSON.parse(ctx.request.body);
        try {
            const {passWord, ...res} = await searchUserInfo(user_name);

            ctx.body = {
                code: 0,
                message: '用户登陆成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, {expiresIn: '1d'}),
                }
            }
        } catch (error) {
            console.error('用户登陆失败:' + error);
        }
    }
}

module.exports = new UserController();