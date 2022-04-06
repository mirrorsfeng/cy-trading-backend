const Router = require('koa-router');

const { auth } = require('../middleware/auth.middleware');
const { uploadComment } = require('../controller/comment.controller');

const router = new Router({prefix: '/comment'});

//发表评论
router.post('/', auth, uploadComment);


module.exports = router;