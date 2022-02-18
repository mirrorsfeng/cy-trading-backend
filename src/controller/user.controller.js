const { createUser, searchUserInfo } = require('../service/user.service');

class UserController {
    async register(ctx, next) {
        const { user_name, passWord } = JSON.parse(ctx.request.body);
        if(!user_name || !passWord) {
            console.error('用户名或密码为空', ctx.request.body);
            ctx.status = 400;
            ctx.body = {
                code: '10001',
                message: '用户名或密码为空',
                result: ''
            }
            return;
        }

        const isRepeat = await searchUserInfo(user_name);
        if(isRepeat){
            ctx.body = {
                code: '10002',
                message: '用户名重复',
                result: ''
            }
            return;
        }else {
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
        }
        
        
    }

    async login(ctx, next) {
        ctx.body = 'login';
    }
}

module.exports = new UserController();