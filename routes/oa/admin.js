const Router = require('koa-router');
const router = new Router();


router.get('/company', (ctx, next)=>{
    ctx.body = '/oa/dept';
    //TODO:
});
router.get('/dept/:gid', (ctx, next)=>{
    ctx.body = '/oa/dept/:gid';
    //TODO:
});





module.exports = router;