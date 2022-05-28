const Router = require('koa-router');

const { auth } = require('../middleware/auth.middleware');
const { getMessageList, changeReadStatus, findNotRead } = require('../controller/chat.controller');
const router = new Router({prefix: '/chat'});
//获取聊天消息
router.get('/', auth, getMessageList);

router.put('/', auth, changeReadStatus);

router.get('/noread', auth, findNotRead)

module.exports = router;