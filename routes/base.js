const Router = require('koa-router');
const router = new Router();


router.get('/', (ctx, next)=>{
    ctx.body = '<h1> Next Services </h1>';
});

router.get('/login', (ctx, next)=>{
    //TODO:
});

router.get('/logout', (ctx, next)=>{
    //TODO:
});

router.get('/admin', (ctx, next)=>{
    //TODO:
});









module.exports = router;