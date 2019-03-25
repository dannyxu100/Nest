const $             = global.$;
const Router        = $.require('koa-router');
const router        = new Router();

/** ************************* GET ****************************/
router.get('/', async (ctx) => {
    ctx.body = '<h1> Next Services </h1>';
});

router.get('/login', async (ctx) => {
    // ctx.body = '登录';
    // TODO:
});

router.get('/logout', async (ctx) => {
    // ctx.body = '退出';
});


/** ************************* POST ****************************/
router.post('/login', async (ctx) => {
    // TODO:
});


module.exports = router;
