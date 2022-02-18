const User = require('../model/user.model');
class UserService {
    async createUser(user_name, passWord) {
     const res = await User.create({ user_name, passWord})
      return res.dataValues
    }

    async searchUserInfo(user_name) {
     const res = await User.findOne({where: { user_name : user_name}})
     if(res) {
         return 1 // 用户已存在
     }else {
         return 0 // 用户不存在
     }
    }
}

module.exports = new UserService();