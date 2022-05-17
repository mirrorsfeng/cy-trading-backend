module.exports = {
    userFormateError: {
        code: '10001',
        message: '用户名或密码为空',
        result: ''
    },
    userAlreadyExited: {
        code: '10002',
        message: '用户名重复',
        result: ''
    },
    userRegisterError: {
        code: '10003',
        message: '用户注册错误',
        result: ''
    },
    emailError: {
        code: '11001',
        message: '邮箱不能为空',
        result: ''
    },
    emailCodeError: {
        code: '11002',
        message: '验证码错误',
        result: '',
    },
    emailCodeSaveError: {
        code: '11003',
        message: '验证码保存错误',
        result: '',
    },
    emailCodeNotExist: {
        code: '11004',
        message: '邮箱尚未获取验证码',
        result: '',
    },
    userNotExist: {
        code: '10004',
        message: '用户不存在',
        result: ''
    },
    userLoginError: {
        code: '10005',
        message: '用户登陆失败',
        result: ''
    },
    userPasswordError: {
        code: '10006',
        message: '用户密码错误',
        result: ''
    },
    tokenExpiredError: {
        code: '10101',
        message: 'token已过期',
        result: ''
    },
    invalidToken: {
        code: '10102',
        message: '无效的token',
        result:''
    },
    noneToken: {
        code: '10103',
        message: '没有携带token',
        result:''
    },
    fileUploadError: {
        code: '10201',
        message: '商品图片上传失败',
        result: '',
    },
    unSupportedImgType: {
        code: '10202',
        message: '图片上传不支持该格式',
        result: '',
    },
    goodsFormatError: {
        code: '10203',
        message: '商品参数格式错误',
        result: '',
    },
    publishGoodsError: {
        code: '10204',
        message: '发布商品出错',
        result: '',
    },
    invalidGoodsId: {
        code: '10205',
        message: '修改商品信息不存在',
        result: '',
    },
    getTypeGoodsError: {
        code: '10206',
        message: '获取类型商品错误',
        result: '',
    },
    typeGoodsNotExist: {
        code: '10207',
        message: '该商品类型不存在',
        result: '',
    },
    getGoodsError: {
        code: '10208',
        message: '获取该商品失败',
        result: '',
    },


    createCommentError: {
        code: '10301',
        message: '评论发表失败',
        result: '',
    },
    getCommentError: {
        code: '10302',
        message: '获取评论失败',
        result: '',
    },


    createColError: {
        code: '10401',
        message: '添加收藏失败',
        result: '',
    },
    getCollectGoodsError: {
        code: '10402',
        message: '查找用户收藏失败',
        result: '',
    },


    notFoundCollect: {
        code: '10501',
        message: '没有该记录',
        result: '',
    },
    deleteCollectError: {
        code: '10502',
        message: '删除收藏错误',
        result: '',
    },
    getUserGoodsError: {
        code: '10503',
        message: '获取用户所收藏商品错误',
        result: '',
    },


    getChatListError: {
        code: '10601',
        message: '获取聊天记录失败',
        result: '',
    }
}