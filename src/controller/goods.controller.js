const path = require('path');

const { 
    fileUploadError,
    unSupportedImgType, 
    publishGoodsError,
    invalidGoodsId,
    getTypeGoodsError,
    typeGoodsNotExist,
 } = require('../constants/err.type');
const { createGoods, updateGoods, searchType } = require('../service/goods.service');
class GoodsController{
    async upload(ctx, next) {
       const {file} = ctx.request.files;
       const fileTypes = ['image/jpeg', 'image/png']
       if(file) {
           if(!fileTypes.includes(file.type)) {
               return ctx.app.emit('error', unSupportedImgType, ctx);
           }
           ctx.body = {
               code: 0,
               message: '商品图片上传成功',
               result: {
                   goods_img: path.basename(file.path),
               }
           }
       }else {
            return ctx.app.emit('error',fileUploadError, ctx );
       }
    }

    async create(ctx) {
        try {
           const {createdAt, updatedAt, ...res} = await createGoods(ctx.request.body);
           ctx.body = {
                code: 0,
                message: '发布商品成功',
                result: res,
           }
        } catch (err) {
            console.error(err);
            return ctx.app.emit('error', publishGoodsError, ctx);
        }
    }

    async update(ctx) {
        try {
            const res = await updateGoods(ctx.params.id, ctx.request.body);
            if(res) {
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result: '',
                }
            }else {
                return ctx.app.emit('error', invalidGoodsId, ctx);
            }
        } catch (err) {
            console.error(err);
        }
        
    }

    async getTypeGoods(ctx) {
       const { type } = ctx.params;
       const num = ctx.query.num;
        try {
            const res = await searchType(type);
            const value = [];
            if(!res){
                console.error('商品类型不存在');
               return ctx.app.emit('error', typeGoodsNotExist, ctx);
                
            }
            if(!num || num>=res.length) {
                    res.forEach(item => {
                        value.push(item.dataValues);
                    });
            }else {
                for(let i=0; i<num; i++){
                    value.push(res[i].dataValues);
                }
            }
            ctx.body = value;
        } catch (err) {
            console.error('获取类型商品失败');
            return ctx.app.emit('error', getTypeGoodsError, ctx);  
        }
    }

    async getTypeAllGoods(ctx) {

    }
}

module.exports = new GoodsController();