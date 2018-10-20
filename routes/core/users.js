const $             = global.$;
const Router        = $.require('koa-router');
const router        = new Router();

const UsersService  = $.require('/apps/core/users.service');

router.get('/add', (ctx, next) => {
    let users = new UsersService();
    let p = users.create({
        name:       '三十',
        phone:      '13688387776',
        password:   '123456'
    });
    p.then((res) => {
        // debugger;
    }, (res) => {
        // debugger;
    });
});


module.exports = router;
