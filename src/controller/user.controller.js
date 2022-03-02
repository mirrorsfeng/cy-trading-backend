const jwt = require('jsonwebtoken');
const { createUser, searchUserInfo, updateByID } = require('../service/user.service');
const { userRegisterError } = require('../constants/err.type');

const { JWT_SECRET } = require('../config/config.default');
class UserController {
    async register(ctx, next) {
        const { user_name, passWord } = ctx.request.body;

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
        const {user_name} = ctx.request.body;
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

    async changePassword(ctx, next) {
        const id = ctx.state.user.id;
        const password = ctx.request.body.passWord;

        if(await updateByID(id, password)){
            ctx.body = {
                code: '0',
                message: '修改密码成功',
                result: ''
            }
        }else {
            ctx.body = {
                code: '10007',
                message: '修改密码失败',
                result: ''
            }
        }
        
    }
}

module.exports = new UserController();