const Koa       = require('koa');
const fn        = require("./lib/fn");



const app = new Koa();


/********************** 路由 *************************/
const router = require('./routes/router');
app.use(router.routes());
app.use(router.allowedMethods());


/********************** 创建启动服务器 *************************/
/* app.use(async (ctx, next)=>{
    ctx.body = 'hello world.';
}); */
app.listen(8838);
fn.msg('Listening on 8838...');
fn.msg('Visit: http://localhost:8838');