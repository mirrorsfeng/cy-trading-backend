const { createCollect, searchGoods, deleteCollect } = require('../service/collect.service');

const { createColError, getCollectGoodsError, notFoundCollect, deleteCollectError } = require('../constants/err.type');

class CollectController {
    async getCollectGoods(ctx) {
        try {
            const { userId } = ctx.query;
            const res = await searchGoods(userId);
            const data = res.map(item => {
                return item.goods_id;
            })
            ctx.body = {
                code: 0,
                message: '用户收藏商品id',
                result: data,
            };
        } catch (err) {
            console.error(err);
            return ctx.app.emit('error', getCollectGoodsError, ctx);
        }
       
    }


    async createCol(ctx) {
        try {
            const res = await createCollect(ctx.request.body);
            ctx.body = {
                code: 0,
                message: '收藏成功',
                result: res,
            }; 
        } catch (err) {
            console.error(err);
           return ctx.app.emit('error', createColError, ctx);
        }
       
    }

    async cancelCollect(ctx) {
        try {
            const { user_id, goods_id } = ctx.request.body;
            const res = await deleteCollect(user_id, goods_id);
            if(res) {
                ctx.body = {
                    code: 0,
                    message: '删除成功',
                    result: ''
                }
            }else {
                return ctx.app.emit('error', notFoundCollect, ctx);
            }
        } catch (err) {
            console.error(err);
            return ctx.app.emit('error', deleteCollectError, ctx);
        }
    }
}


module.exports = new CollectController();