const { createComment } = require('../service/comment.service');

const { createCommentError } = require('../constants/err.type');

class CommentController {
    async uploadComment(ctx) {
       try {
        const res = await createComment(ctx.request.body);
        ctx.body = {
            code: 0,
            message: '评论发表成功',
            result: res,
        }
       } catch (err) {
        console.error(err);
        return ctx.app.emit('error', createComment, ctx);
       }
        
       
    }
}


module.exports = new CommentController();