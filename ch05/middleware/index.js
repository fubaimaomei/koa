const path = require('path');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2'); // 集成符合koa规格的中间件
const miSend = require('./mi-send/index')
const miHttpError = require('./min-http-error/index')
module.exports = (app) => {
    app.use(miHttpError()); // 洋葱模式，它会捕捉后续中间件的错误
    app.use(nunjucks({
        ext: 'html', // 指定视图默认后缀名
        path: path.join(__dirname,'../views'),  // 指定视图目录
        nunjucksConfig: {
            trimBlocks: true     //  开启转义，防止 Xss 漏洞
        }
    }));
    app.use(serve(path.resolve(__dirname,"../public"),{
        maxAge: 30 * 24 * 60 * 60 * 1000  // 缓存一个月
    }));
    app.use(bodyParser());
    app.use(miSend());
}