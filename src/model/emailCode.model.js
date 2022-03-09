const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

const Code = seq.define('cy_code', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '邮箱'
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '邮箱验证码'
    }
})

//  Code.sync({force: true});

module.exports = Code;