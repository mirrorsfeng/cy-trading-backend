const Collect = require('../model/collect.model');
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
}

module.exports = new CollectService();