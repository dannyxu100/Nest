const $             = global.$;
const Router        = $.require('koa-router');
const router        = new Router();

const UsersService  = $.require('/apps/core/users.service');


/** ************************* GET ****************************/
router.get('/detail/:id', async (ctx) => {
    ctx.body = await UsersService.detail(ctx.params.id);
});


/** ************************* POST ****************************/
router.post('/add', async (ctx) => {
    ctx.body = await UsersService.add(ctx.request.body);
});


module.exports = router;
