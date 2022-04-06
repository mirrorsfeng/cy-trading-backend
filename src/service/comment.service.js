const Comment = require('../model/comment.model');

class CommentService {
    async createComment(comment) {
        const res = await Comment.create(comment);
        return res.dataValues
    }
}


module.exports = new CommentService();