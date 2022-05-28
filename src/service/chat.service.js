const Chat = require('../model/chat.model');
const { Op } = require("sequelize");
class ChatServeice {
    async createMessage(content, user_name, toUser_name) {
        const res = await Chat.create({
            user_name,
            content,
            toUser_name
        })
        return res.dataValues
    }

    async searchChatList(user_name, toUser_name) {
        const res = await Chat.findAll({
            where: {
                [Op.or]: [{user_name, toUser_name}, {user_name: toUser_name, toUser_name: user_name}]
            }
        })
        return res
    }

    async searchNotRead(toUser_name) {
        const res = await Chat.findAll({
            where: {
                [Op.and] : [{toUser_name}, {isread: 0}]
            }
        })
        return res
    }

    async updateRead(id) {
        const res = await Chat.update({isread: 1}, {
            where: {
                id
            }
        })
        return res
    }

}

module.exports = new ChatServeice(); 