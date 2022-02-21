const Router = require('koa-router');
const { sendEmail } = require('../controller/email.controller');

const router = new Router({prefix: '/email'});

router.post('/', sendEmail);

module.exports = router;