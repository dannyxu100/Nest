const $      = global.$;
const Router = $.require('koa-router');
const router = new Router();


router.get('/', (ctx, next)=>{
    ctx.body = '/cms';
});
router.get('/article/:id', (ctx, next)=>{
    ctx.body = '/cms/article/:id';
    //TODO:
});





module.exports = router;