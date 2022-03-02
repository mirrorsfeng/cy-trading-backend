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
        ccode: '10103',
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
    }
}