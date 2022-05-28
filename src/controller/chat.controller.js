const { searchChatList, searchNotRead, updateRead } = require('../service/chat.service');
const { getChatListError } = require('../constants/err.type');
const { searchUserInfo } = require('../service/user.service');
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

    async changeReadStatus(ctx) {
        const { id } = ctx.request.body;
        const res = await updateRead(id);
        let stand = true;
        if(!res) {
            stand = false
        }
        ctx.body = {
            code: 0,
            result: stand,
        } 
    }

    async findNotRead(ctx) {
        const { name } = ctx.query;
        const infoList = await searchNotRead(name);
        const list = new Set();
        infoList.forEach(item => {
            list.add(item.user_name);
        })
        const userList = [];
        for(let i of list) {
           const res = await searchUserInfo(i);
           const obj = {
               user_name: res.user_name,
               avator: res.avator
           }
            userList.push(obj);
        }
        ctx.body = userList
    }
}

module.exports = new ChatControllser();