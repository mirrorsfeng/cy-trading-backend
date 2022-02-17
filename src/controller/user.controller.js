const { createUser } = require('../service/user.service');

class UserController {
    async register(ctx, next) {
        const {user_name, passWord} =  ctx.request.body;
        const res = await createUser(user_name, passWord);
        ctx.body = res;
    }

    async login(ctx, next) {
        ctx.body = 'login';
    }
}

module.exports = new UserController();