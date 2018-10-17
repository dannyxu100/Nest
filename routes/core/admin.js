const Router = require('koa-router');
const router = new Router();


router.get('/', (ctx, next)=>{
    ctx.body = '后台管理入口';
});

router.get('/login', (ctx, next)=>{
    ctx.body = '后台管理登录';
    //TODO:
});

router.get('/logout', (ctx, next)=>{
    ctx.body = '后台管理退出';
    //TODO:
});









module.exports = router;