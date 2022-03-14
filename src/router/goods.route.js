const Router = require('koa-router');

const { auth } = require('../middleware/auth.middleware');
const { goodsValidator } = require('../middleware/goods.middleware');

const { upload, create, update, getTypeGoods, getTypeAllGoods } = require('../controller/goods.controller');

const router = new Router({prefix: '/goods'});
//图片上传接口
router.post('/upload', auth, upload);
//商品上传接口
router.post('/', auth, goodsValidator, create);
//修改商品接口
router.put('/:id', auth, goodsValidator, update);
//获取分类商品
router.get('/:type', auth, getTypeGoods);
//分类页面获取商品
router.get('/type', auth, getTypeAllGoods)
module.exports = router;