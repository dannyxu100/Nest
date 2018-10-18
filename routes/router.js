const $        = global.$;
const Router   = $.require('koa-router');



$.log('Loading Routes...', $.logStyle.Blue);
const router = new Router();

/************************ 基础路由 ***********************/
const routerIndex = $.require("/routes/core/index");
const routerAdmin = $.require("/routes/core/admin");
router.use(routerIndex.routes());
router.use('/admin', routerAdmin.routes());





/************************ 扩展模块路由 ***********************/
//通过遍历文件夹，动态加载所有路由文件
let routesFolder = $.path.join(__dirname);

function iterator( dir ) {
    dir = dir || '';
    let currentFolder, list, info, file, filename, routerSub;
    currentFolder = routesFolder + dir;
    list = $.fs.readdirSync( currentFolder );

    $.each(list, (item, index)=>{
        if( 'router.js' === item || 'core' === item ) {
            return true;
        }
        // $.log(currentFolder + '/' + item, $.logStyle.Red);
        file = $.path.join(currentFolder, '/', item);
        info = $.fs.statSync(file);
        if (info.isDirectory()) {
            $.log('...Directory: '+ file);
            iterator('/'+ item);
        } else {
            $.log('......File: '+ file);
            filename = $.path.basename(file, '.js');
            routerSub = $.require( file );
            // $.log(dir, $.logStyle.Red);
            router.use(dir, routerSub.routes());
        }
    });
}
iterator();




module.exports = router;