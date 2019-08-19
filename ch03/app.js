const Koa = require('koa');
// const Router = require('./Router');
const Router = require('koa-router');
const router = new Router();
const app = new Koa();
const Http = require('http');
const Querystring = require('querystring');
const bodyParser = require('koa-bodyparser');

const Service = {
    serach: async (kw = '') => {
        return new Promise((resolve,reject) => {
            Http.request({
                hostname: 'm.maoyan.com',
                path: '/ajax/search?' +  Querystring.stringify({
                    kw,
                    cityId: 10  //上海
                })
            },
            res => {
                res.setEncoding('utf-8');
                let data = [];
                res.on('data',chunk => {
                    data.push(chunk);
                })
                res.on('end',()=>{
                    resolve(data.join(''))
                })
            }
            ).end();
        })
    }
}

router.get('/',async (ctx,next) => {
    let data = await Service.serach('复仇');
    ctx.status = 200;
    ctx.type = 'json';
    ctx.body = data;
})

// router.get('/404',async (ctx,next) => {
//     ctx.status = 404;
//     ctx.response.body = 'text'
//     ctx.body = '资源未找到'
//     await next();
// })

// router.get('/',async (ctx,next) => {
//     ctx.status = 200;
//     ctx.response.body = 'text'
//     ctx.body = '欢迎访问'
//     await next();
// })

// router
//     .get('/',async (ctx,next) => {
//         ctx.boyd = 'hello world!';
//     })
//     .post('/users',async (ctx,next) => {
//         // 新增用户
//     })
//     .put('/users/:id',async (ctx,next) => {
//         // 修改对应为id用户的数据
//     })
//     .del('/user/:id,',async (ctx,next) => {
//         // 删除用户
//     })
//     .all('/*,',async (ctx,next) => {
//         // 为所有请求设置跨域资源共享
//         ctx.set("Access-Control-Allow-Origin","https://www.xxxx.com");
//         await next();
//     })


app.use(bodyParser())
app.use(router.routes()).listen(3000)
