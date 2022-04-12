const Comment = require('../model/comment.model');
const User = require('../model/user.model');

class CommentService {
    async createComment(comment) {
        const res = await Comment.create(comment);
        return res.dataValues
    }

    async getCommentById(goods_id) {
        const res = await Comment.findAll({
            where: {
                goods_id,
            },
            order:[
                ['createdAt', 'ASC']
            ],
            include: [
                {
                    attributes: ['avator', 'user_name'],
                    model: User,
                }
            ]
        })
        return res
    }
}


module.exports = new CommentService();