const path = require('path');
const serve = require('koa-static');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = require('./router');
const nunjucks = require('koa-nunjucks-2'); // 集成符合koa规格的中间件
app.use(nunjucks({
    ext: 'html', // 指定视图默认后缀名
    path: path.join(__dirname,'views'),  // 指定视图目录
    nunjucksConfig: {
        trimBlocks: true     //  开启转义，防止 Xss 漏洞
    }
}));
app.use(serve(path.resolve(__dirname,"./public"),{
    maxAge: 30 * 24 * 60 * 60 * 1000  // 缓存一个月
}));
app.use(bodyParser());
router(app);
app.listen(3000,()=>{
    console.log('Server is running at http://127.0.0.1:3000')
});