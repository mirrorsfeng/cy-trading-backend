const path = require('path');
const jwt = require('jsonwebtoken');
const { createUser, searchUserInfo, updateByID, findUserAvator, updateUserAvator } = require('../service/user.service');
const { userRegisterError } = require('../constants/err.type');

const { JWT_SECRET } = require('../config/config.default');
class UserController {
    async register(ctx, next) {
        //获取用户名 密码 邮箱
        const { user_name, passWord, email } = ctx.request.body;

        try{
            const res = await createUser(user_name, passWord, email);
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name,
                }
            }
            return;
        }catch(err) {
            console.log(err);
            ctx.app.emit('error', userRegisterError, ctx);
        }
           
        
        
    }

    async login(ctx, next) {
        const {user_name} = ctx.request.body;
        try {
            const {passWord, ...res} = await searchUserInfo(user_name);

            ctx.body = {
                code: 0,
                message: '用户登陆成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, {expiresIn: '1d'}),
                    id: res.id,
                    user_name: res.user_name,
                    avator: res.avator
                }
            }
        } catch (error) {
            console.error('用户登陆失败:' + error);
        }
    }

    async changePassword(ctx, next) {
        const id = ctx.state.user.id;
        const password = ctx.request.body.passWord;

        if(await updateByID(id, password)){
            ctx.body = {
                code: '0',
                message: '修改密码成功',
                result: ''
            }
        }else {
            ctx.body = {
                code: '10007',
                message: '修改密码失败',
                result: ''
            }
        }
        
    }

    async getUserInfo(ctx) {
        const { authorization } = ctx.request.header;
        const token = authorization? authorization.replace('Bearer ',''): null;
        try {
            const user = jwt.verify(token, JWT_SECRET);
            const avator = await findUserAvator(user.id);
            const userInfo = await searchUserInfo(user.user_name);
            ctx.body = {
                code: 0,
                message: '当前用户信息',
                result: {
                    id: user.id,
                    user_name: user.user_name,
                    avator: avator,
                    email: userInfo.email
                }
            }
        } catch (err) {
            console.error('解析token错误:' + err);
        }
    }
    async uploadUserAvator(ctx) {
        const {file} = ctx.request.files;
        const { id } = ctx.query;
        const fileTypes = ['image/jpeg', 'image/png']
        if(file) {
            if(!fileTypes.includes(file.type)) {
                return ctx.app.emit('error', unSupportedImgType, ctx);
            }
           const avator = path.basename(file.path);
           try {
              const res = await updateUserAvator(id, avator);
              if(res) {
                  ctx.body = {
                      code: 0,
                      message: '用户头像上传成功',
                      result: {
                          avator
                      }
                  }
              }else {

              }
           } catch (err) {
               console.error(err);
                return ctx.app.emit('error',fileUploadError, ctx );
           }
            // ctx.body = {
            //     code: 0,
            //     message: '商品图片上传成功',
            //     result: {
            //         goods_img: path.basename(file.path),
            //     }
            // }
        }else {
             return ctx.app.emit('error',fileUploadError, ctx );
        }
    }
}

module.exports = new UserController();