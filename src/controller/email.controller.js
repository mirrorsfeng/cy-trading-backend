const nodemailer = require('nodemailer');
const { emailError, emailCodeSaveError } = require('../constants/err.type');
const { saveCode } = require('../service/emailCode.service');

const transporter = nodemailer.createTransport({
//node_modules/nodemailer/lib/well-known/services.json  查看相关的配置
    service: 'qq',
    port: 465,
    secure: true, 
    auth: {
        user: '522764506@qq.com', 
        pass: 'cbrrmzodtdhkbgfa' // smtp 的授权码
    }
});

const sendMail = async (mail, code, call) => {

    let mailOptions = {
        from: '"cy-used-trading-platform" <522764506@qq.com>', // 发送方
        to: mail, //接收者邮箱，多个邮箱用逗号间隔
        subject: '欢迎注册cy-used-trading-platform', // 标题
        text: 'Hello world?', // 文本内容
        html: `<p>您的验证码为:${code}</p>`, //页面内容
        // attachments: [{//发送文件
        //      filename: 'index.html', //文件名字
        //      path: './index.html' //文件路径
        //  },
        //  {
        //      filename: 'sendEmail.js', //文件名字
        //      content: 'sendEmail.js' //文件路径
        //  }
        // ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return call(false);
        } else {
            return call(true) //因为是异步 所有需要回调函数通知成功结果
        }
    });

}

class sendEmailController { 
    async sendEmail(ctx, next) {
    const { email } = ctx.request.body;
    if(!email) {
        console.error('邮箱为空');
        ctx.app.emit('error', emailError, ctx);
        return;
    }

    const code = parseInt(Math.random(0, 1) * 10000);
        async function timeout() {
            return new Promise((res,rej) => {
                 sendMail(email, code, status => {
                    if(status) {
                        try {
                            saveCode(email, code); 
                        } catch (err) {
                            ctx.app.emit('error', emailCodeSaveError, ctx);
                        }
                        res(status);
                    }
                });
            })
        }

        await timeout().then(res => {
            if(res) {
                ctx.body = '发送成功';
            }else {
                ctx.body = '失败'
            }
        })
       
        
        return;
    
}
}

module.exports = new sendEmailController();