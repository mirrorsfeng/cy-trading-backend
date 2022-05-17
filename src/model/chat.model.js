const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const Chat = seq.define('cy_chat', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '发送方',
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '发送消息'
    },
    toUser_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '接收方',
    }
})
// Chat.sync({force: true});

module.exports = Chat;