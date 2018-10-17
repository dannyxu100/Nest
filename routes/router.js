const fs        = require("fs");
const path      = require("path");
const Router    = require('koa-router');
const fn        = require("../lib/fn");



fn.log('Loading Routes...', fn.logStyle.Blue);
const router = new Router();

/************************ 基础路由 ***********************/
const routerIndex = require("./core/index");
const routerAdmin = require("./core/admin");
router.use(routerIndex.routes());
router.use('/admin', routerAdmin.routes());





/************************ 扩展模块路由 ***********************/
//通过遍历文件夹，动态加载所有路由文件
let routesFolder = path.join(__dirname);

function iterator( dir ) {
    dir = dir || '';
    let currentFolder, list, info, file, filename, routerSub;
    currentFolder = routesFolder + dir;
    list = fs.readdirSync( currentFolder );

    fn.each(list, (item, index)=>{
        if( 'router.js' === item || 'core' === item ) {
            return true;
        }
        // fn.log(currentFolder + '/' + item, fn.logStyle.Red);
        file = path.join(currentFolder, '/', item);
        info = fs.statSync(file);
        if (info.isDirectory()) {
            fn.log('...Directory: '+ file);
            iterator('/'+ item);
        } else {
            fn.log('......File: '+ file);
            filename = path.basename(file, '.js');
            routerSub = require( file );
            // fn.log(dir, fn.logStyle.Red);
            router.use(dir, routerSub.routes());
        }
    });
}
iterator();




module.exports = router;