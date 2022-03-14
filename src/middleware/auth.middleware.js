const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default');
const { tokenExpiredError, invalidToken, noneToken } = require('../constants/err.type');

const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header;
    const token = authorization? authorization.replace('Bearer ',''): null;
    if(!token) {
        console.error('没有携带token')
        return ctx.app.emit('error', noneToken, ctx);
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        ctx.state.user = user;
    } catch (err) {
        switch(err.name) {
            case 'TokenExpiredError':
                console.error('token已过期', err);
              return ctx.app.emit('error', tokenExpiredError, ctx );
            
            case 'JsonWebTokenError': 
                console.error('无效的token', err);
                return ctx.app.emit('error', invalidToken, ctx);

        }
    }

    await next();
}


module.exports = {
    auth
}