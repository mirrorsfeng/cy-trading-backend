const Router = require('koa-router');

const { auth } = require('../middleware/auth.middleware');
const { uploadComment, getComment } = require('../controller/comment.controller');

const router = new Router({prefix: '/comment'});

//发表评论
router.post('/', auth, uploadComment);

//获取商品的评论
router.get('/:id', auth, getComment)


module.exports = router;