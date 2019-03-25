const $             = global.$;
const Router        = $.require('koa-router');
const router        = new Router();


/** ************************* GET ****************************/
router.get('/', async (ctx) => {
    ctx.body = '后台管理入口';
});

router.get('/login', async (ctx) => {
    ctx.body = '后台管理登录';
    // TODO:
});

router.get('/logout', async (ctx) => {
    ctx.body = '后台管理退出';
    // TODO:
});

/** ************************* POST ****************************/
router.post('/login', async (ctx) => {
    // TODO:
});

module.exports = router;
