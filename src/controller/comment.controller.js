const { createComment, getCommentById } = require('../service/comment.service');

const { createCommentError, getCommentError } = require('../constants/err.type');

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
        return ctx.app.emit('error', createCommentError, ctx);
       }
        
       
    }

    async getComment(ctx) {
        const { id } = ctx.params;
        try {
            const res = await getCommentById(id);
            ctx.body = {
                code: 0,
                message: '获取评论成功',
                result: res,
            }
        } catch (err) {
            console.error(err);
            return ctx.app.emit('error', getCommentError, ctx);
        }
       
    }
}


module.exports = new CommentController();