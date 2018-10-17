const Router = require('koa-router');
const router = new Router();


router.get('/grouplist', (ctx, next)=>{
    ctx.body = '/cms/grouplist';
    //TODO:
});
router.get('/group/:gid', (ctx, next)=>{
    ctx.body = '/cms/group/:gid';
    //TODO:
});





module.exports = router;