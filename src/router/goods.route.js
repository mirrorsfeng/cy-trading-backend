const Router = require('koa-router');

const { auth } = require('../middleware/auth.middleware');
const { goodsValidator } = require('../middleware/goods.middleware');

const { upload, create, update, getTypeGoods, deleteGoods, getGoods, bannerImg } = require('../controller/goods.controller');

const router = new Router({prefix: '/goods'});
//图片上传接口
router.post('/upload', auth, upload);
//商品上传接口
router.post('/', auth, goodsValidator, create);
//修改商品接口
router.put('/:id', auth, update);
//获取分类商品
router.get('/:type', auth, getTypeGoods);
//分类页面获取商品
// router.get('/type', auth, getTypeAllGoods);
//通过id获取商品信息
router.get('/detail/:id', auth, getGoods);
//获取轮播图图片
router.get('/banner/img', auth, bannerImg);
//下架商品接口
router.post('/delete', auth, deleteGoods)

module.exports = router;