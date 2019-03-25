const $             = require('./lib/fn');
global.$            = $;
const Koa           = $.require('koa');
const Body          = $.require('koa-body');
const Connector     = $.require('/lib/connector');
const jwt           = $.require('jsonwebtoken');
const tokenconfig   = $.require('/config/token');


const app = new Koa();
app.use(Body({
    'multipart': true
}));
/* app.use((ctx, next) => {
    ctx.post = ctx.request.body;
    next();
}); */


/* $.require('babel-register')({
    'presets': ['es2015', 'stage-3']
}); */


/** ******************** 路由 *************************/
const router = require('./routes/router');
// app.use(async (ctx, next) => {
//     try {
//         await next();
//     } catch (err) {
//         ctx.body = err.message;
//     }
// });
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
    /* let payload = {
        'userid':       '5bd82bc4ad02e420d8417119',
        'username':     '马丽丽'
    };
    let token = jwt.sign(payload, tokenconfig.secret.user);
    ctx.body = '登录成功：' + token; */
    next();
});
app.use(async (ctx, next) => {
    try {
        await next();
        if (ctx.status === 404) {
            ctx.throw(404);
        }
    } catch (err) {
        $.error(err.stack);
        const status = err.status || 500;
        ctx.status = status;
        if (status === 404) {
            // ctx.render('./404');
            ctx.body = 'Not Found：404';
        } else if (status === 500) {
            // ctx.render('./500');
            ctx.body = 'Internal Server Error：500';
        } else {
            ctx.body = err.message;
        }
    }
});


/** ******************** 创建启动服务器 *************************/
Connector.create();                         // 连接数据库
app.listen(8838);
$.msg('Listening on 8838...');
$.msg('Visit: http://localhost:8838');
