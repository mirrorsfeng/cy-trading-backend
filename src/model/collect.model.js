const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const Collect = seq.define('cy_collect', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '收藏用户的id',
    },
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '收藏商品的id',
    }
})

// Collect.sync({force: true});

module.exports = Collect;