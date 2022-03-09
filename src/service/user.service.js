const User = require('../model/user.model');
class UserService {
    async createUser(user_name, passWord, email) {
     const res = await User.create({ user_name, passWord, email})
      return res.dataValues
    }

    async searchUserInfo(user_name) {
     const res = await User.findOne({where: { user_name : user_name}});
     if(res) {
         return res.dataValues // 用户已存在
     }else {
         return 0 // 用户不存在
     }
    }

    async updateByID(id, passWord) {
        const whereOpt = { id };
        const res = await User.update({ passWord }, {where : whereOpt});
       
        return res[0]>0? true : false;
    }
}

module.exports = new UserService();