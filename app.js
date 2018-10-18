const $         = require("./lib/fn");
global.$        = $;
const Koa       = $.require('koa');
const Connector = $.require('/lib/connector');


const app = new Koa();

/********************** 路由 *************************/
const router = require('./routes/router');
app.use(router.routes());
app.use(router.allowedMethods());


/********************** 创建启动服务器 *************************/
/* app.use(async (ctx, next)=>{
    ctx.body = 'hello world.';
}); */
Connector.create();                         //连接数据库
app.listen(8838);
$.msg('Listening on 8838...');
$.msg('Visit: http://localhost:8838');