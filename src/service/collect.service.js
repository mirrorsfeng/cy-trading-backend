const Collect = require('../model/collect.model');
const Goods = require('../model/goods.model');
const User = require('../model/user.model');
const { Op } = require("sequelize");

class CollectService {
     async searchGoods(user_id) {
        const res = await Collect.findAll({
            where: {
                user_id
            }
        })
        return res;
     }

     async createCollect(content) {
        const res = await Collect.create(content);
        return res.dataValues;
     }

     async deleteCollect(user_id, goods_id) {
         const res = await Collect.destroy({
             where: {
                [Op.and]: [{ user_id }, { goods_id }],  
             }
         })
         return res === 1? true : false;
     }

     async searchUserAllGoods(user_id) {
        const idRes = await Collect.findAll({
            where: {
                user_id
            }
        })
        const goodsRes = [];
        for(let i = 0;i<idRes.length; i++) {
            const good = await Goods.findOne({
                where: {
                    id: idRes[i].goods_id
                },
                include: [
                    {
                        attributes: ['avator'],
                        model: User,
                    }
                ]
            })
            goodsRes.push(good);
        }
        return {
            length: idRes.length,
            goods: goodsRes
        }
     }
}

module.exports = new CollectService();