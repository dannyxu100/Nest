const $             = global.$;
const Router        = $.require('koa-router');
const router        = new Router();

const UsersService  = $.require('/apps/core/users.service');

router.get('/add', (ctx, next) => {
    let users = new UsersService();
    users.create({
        'name':       '三',
        'phone':      '13688387774',
        'password':   '123456'
    }).then((res) => {
        // debugger;
    }, (err) => {
        // debugger;
    });
});


module.exports = router;
