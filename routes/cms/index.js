const $             = global.$;
const Router        = $.require('koa-router');
const router        = new Router();

const ArticlesService  = $.require('/apps/cms/articles.service');


/** ************************* GET ****************************/
router.get('/', async (ctx) => {
    ctx.body = '/cms';
});
router.get('/article/:id', async (ctx) => {
    // ctx.body = '/cms/article/:id';
    ctx.body = await new ArticlesService().findById(ctx.params.id);
    // TODO:
});
router.get('/pages-article/:page?/:limit?', async (ctx) => {
    ctx.body = await new ArticlesService().findPage({
        'page':     ctx.params.page,
        'limit':    ctx.params.limit
    });
});


/** ************************* POST ****************************/
router.post('/add-article', async (ctx) => {
    ctx.body = await new ArticlesService().create(ctx.request.body);
});

module.exports = router;
