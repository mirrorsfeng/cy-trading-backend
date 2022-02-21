const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

const User = seq.define('cy_User', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名',
    },
    passWord: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '密码',
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否是管理员,0:普通用户(默认), 1:管理员',
    }
});

 User.sync();

 module.exports = User