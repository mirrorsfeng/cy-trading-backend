const Goods = require('../model/goods.model');

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
        const res = await Goods.findAll({where: {goods_type: type}});

        return res
    }
}

module.exports = new GoodsService();