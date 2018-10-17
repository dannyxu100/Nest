const Router = require('koa-router');
const router = new Router();


router.get('/', (ctx, next)=>{
    ctx.body = '<h1> Next Services </h1>';
});

router.get('/login', (ctx, next)=>{
    ctx.body = '登录';
    //TODO:
});

router.get('/logout', (ctx, next)=>{
    ctx.body = '退出';
    //TODO:
});









module.exports = router;