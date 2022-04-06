const { DataTypes } = require('sequelize');
const User = require('./user.model');
const seq = require('../db/seq');

const Comment = seq.define('cy_comment', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '评论内容',
    },
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '对应商品的id',
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '发布用户的id',
    }
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id'
});
// Comment.sync({force: true});

module.exports = Comment;