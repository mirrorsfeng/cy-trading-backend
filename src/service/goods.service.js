const Goods = require('../model/goods.model');
const User = require('../model/user.model');

class GoodsService {
    async createGoods(goods) {
       const res = await Goods.create(goods);
       return res.dataValues;
    }

    async updateGoods(id, goods) {
        const res = await Goods.update(goods, {where: {id}});

        return res[0]>0? true : false;
    }

    async searchType(type) {
        const res = await Goods.findAll({
            where: {goods_type: type},
            include: [
                {
                    attributes: ['avator'],
                    model: User,
                }
            ]
        });
        return res
    }

    async getGoodsById(id) {
        const res = await Goods.findOne({
            where: {
                id,
            },
            include: [
                {
                    attributes: ['avator', 'user_name'],
                    model: User,
                }
            ]
        })
        return res
    }

    async getBanner() {
        const res = await Goods.findAll({
          limit: 5,
            order:[
                ['createdAt', 'DESC']
            ]
        })
        return res;
    }
}

module.exports = new GoodsService();