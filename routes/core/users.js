const $             = global.$;
const Router        = $.require('koa-router');
const router        = new Router();

const UsersService  = $.require('/apps/core/users.service');

/** ************************* GET ****************************/
router.get('/detail/:id', async (ctx) => {
    ctx.body = await new UsersService().findById(ctx.params.id);
});
router.get('/pages/:page?/:limit?', async (ctx) => {
    ctx.body = await new UsersService().findPage({
        'page':     ctx.params.page,
        'limit':    ctx.params.limit
    });
});


/** ************************* POST ****************************/
router.post('/add', async (ctx) => {
    ctx.body = await new UsersService().create(ctx.request.body);
});
router.post('/update', async (ctx) => {
    let id = ctx.request.body.id;
    delete ctx.request.body.id;
    ctx.body = await new UsersService().updateById(id, ctx.request.body);
});
router.post('/remove', async (ctx) => {
    ctx.body = await new UsersService().removeById(ctx.request.body.id);
});


module.exports = router;
