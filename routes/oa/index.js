const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = '/oa';
});
router.get('/notice/:id', (ctx, next) => {
    ctx.body = '/notice/:id';
    // TODO:
});


module.exports = router;
