const { searchChatList } = require('../service/chat.service');
const { getChatListError } = require('../constants/err.type');
class ChatControllser {
    async getMessageList(ctx) {
        const { user_name, toUser_name } = ctx.query;
        try {
            const res = await searchChatList(user_name, toUser_name);
            ctx.body = {
                code: 0,
                message: '用户聊天记录',
                result: res
            }
        } catch (err) {
            console.error(err);
            return ctx.app.emit('error', getChatListError, ctx);
        }
        
       
    }
}

module.exports = new ChatControllser();