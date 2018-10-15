const Koa = require('koa');
const app = new Koa();



/********************** 路由 *************************/
const router = require('./routes/base');
app.use(router.routes());


/********************** 创建启动服务器 *************************/
/* app.use(async (ctx, next)=>{
    ctx.body = 'hello world.';
}); */
app.listen(8838);
console.log('Listening on 8838...');
console.log('Visit: http://localhost:8838');