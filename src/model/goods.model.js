const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const Goods = seq.define('cy_goods', {
    goods_comment: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品描述',
    },
    goods_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        comment: '商品价格'
    },
    goods_type: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品类型',
    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片url',
    },
    goods_userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '发布该商品的用户id'
    }
})

// Goods.sync({force: true});

module.exports = Goods