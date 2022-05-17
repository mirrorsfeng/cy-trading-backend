const Router = require('koa-router');

const { auth } = require('../middleware/auth.middleware');
const { getMessageList } = require('../controller/chat.controller');
const router = new Router({prefix: '/chat'});

router.get('/', auth, getMessageList);


module.exports = router;