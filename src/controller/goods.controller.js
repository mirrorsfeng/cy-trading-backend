const path = require('path');
const gm = require('gm').subClass({imageMagick: true});
const Jimp = require('jimp');
const { 
    fileUploadError,
    unSupportedImgType, 
    publishGoodsError,
    invalidGoodsId,
    getTypeGoodsError,
    typeGoodsNotExist,
    getGoodsError,
 } = require('../constants/err.type');
const { createGoods, updateGoods, searchType, getGoodsById, getBanner } = require('../service/goods.service');
class GoodsController{
    async upload(ctx, next) {
       const {file} = ctx.request.files;
       const { width, height } = ctx.query;
       const fileTypes = ['image/jpeg', 'image/png']
       if(file) {
           if(!fileTypes.includes(file.type)) {
               return ctx.app.emit('error', unSupportedImgType, ctx);
           }
           if(width || height) {
            const h = height || width;
            const image = await Jimp.read(file.path);
            await image.resize(parseInt(width),parseInt(h));
            await image.writeAsync(file.path);
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

    async getGoods(ctx) {
        const { id } = ctx.params;
        try {
            const res =  await getGoodsById(id);
            if(!res) {
                console.error('找不到该商品');
                return ctx.app.emit('error', getGoodsError, ctx);
            }
            ctx.body = res;
        } catch (err) {
            console.error('找不到该商品');
            return ctx.app.emit('error', getGoodsError, ctx);
        }
    }

    async deleteGoods(ctx) {

    }

    async bannerImg(ctx) {
        const res = await getBanner();
        const imgArr = [];
        for(let i = 0;i<res.length;i++) {
            const im = {};
            const imgPath = path.join(__dirname, `../upload/${res[i].goods_img}`);
            const last = imgPath.split('.');
            console.log(last);
            const image = await Jimp.read(imgPath);
            await image.resize(600,Jimp.AUTO);
            const y = (image.bitmap.height-250)/2;
            await image.crop(0,y,600,250);
            await image.writeAsync(path.join(__dirname, `../upload/banner${res[i].id}.${last[1]}`));
            im.img = `/banner${res[i].id}.${last[1]}`;
            im.id = res[i].id;
            im.type = res[i].goods_type
            imgArr.push(im);
        }
       
        return ctx.body= imgArr 
    }
}

module.exports = new GoodsController();