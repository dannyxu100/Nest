const $             = global.$;
const Router        = $.require('koa-router');
const router        = new Router();

const UsersService  = $.require('/apps/core/users.service');


/** ************************* GET ****************************/
router.get('/detail/:id', async (ctx, next) => {
    ctx.body = await UsersService.findById(ctx.params.id);
    next();
});
router.get('/pages/:page?/:limit?', async (ctx) => {
    ctx.body = await UsersService.findPage(ctx.params.page, ctx.params.limit);
});


/** ************************* POST ****************************/
router.post('/add', async (ctx) => {
    ctx.body = await UsersService.create(ctx.request.body);
});
router.post('/update', async (ctx) => {
    let id = ctx.request.body.id;
    delete ctx.request.body.id;
    ctx.body = await UsersService.updateById(id, ctx.request.body);
});
router.post('/remove', async (ctx) => {
    ctx.body = await UsersService.removeById(ctx.request.body.id);
});


module.exports = router;
