const Goods = require('../model/goods.model');
const User = require('../model/user.model');
const { Op } = require("sequelize");

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

    async searchLike(keywords) {
        const res = await Goods.findAll({
            where: {
                [Op.or]: [{  goods_comment: {
                    [Op.like]: `%${keywords}%`
                    }}, {
                        goods_type: {
                            [Op.like]: `%${keywords}%`
                        }
                    }]
              
            },
            include: [
                {
                    attributes: ['avator'],
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

    async destroyGoods(id) {
        const res = await Goods.destroy({
            where: {
                id
            }
        })
        return res
    }

    async searchUserGoods(goods_userId) {
        const res = await Goods.findAll({
            where: {
                goods_userId
            },
            include: [
                {
                    attributes: ['avator'],
                    model: User,
                }
            ]
        })
        return res
    }
}

module.exports = new GoodsService();