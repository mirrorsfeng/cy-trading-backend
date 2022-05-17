const Chat = require('../model/chat.model');
const { Op } = require("sequelize");
class ChatServeice {
    createMessage(content, user_name, toUser_name) {
        Chat.create({
            user_name,
            content,
            toUser_name
        }).then(res => {
            return true;
        })
    }

    async searchChatList(user_name, toUser_name) {
        const res = await Chat.findAll({
            where: {
                [Op.or]: [{user_name, toUser_name}, {user_name: toUser_name, toUser_name: user_name}]
            }
        })
        return res
    }
}

module.exports = new ChatServeice(); 