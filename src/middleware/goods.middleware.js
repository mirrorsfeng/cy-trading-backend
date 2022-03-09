const { goodsFormatError } = require('../constants/err.type');

const goodsValidator = async (ctx ,next) => {
    try {
        ctx.verifyParams({
            goods_name: {type: 'string', required: true},
            goods_price: {type: 'number', required: true},
            goods_type: {type: 'string', required: true},
            goods_img: {type: 'string', required: true},
        })
    } catch (err) {
        console.log(err);
        goodsFormatError.result = err;
        return ctx.app.emit('error', goodsFormatError, ctx);
    }

    await next();
}


module.exports = {
    goodsValidator
}