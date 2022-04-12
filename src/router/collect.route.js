const Router = require('koa-router');

const { auth } = require('../middleware/auth.middleware');
const { getCollectGoods, createCol, cancelCollect } = require('../controller/collect.controller');

const router = new Router({prefix: '/collect'});

// 获取当前用户收藏商品id
router.get('/goods', auth, getCollectGoods);

//添加收藏
router.post('/', auth, createCol);

//移除收藏
router.put('/', auth, cancelCollect);


module.exports = router;