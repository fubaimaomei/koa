const Koa = require('koa')
const app = new Koa();

// app.use(async (ctx,next)=>{
//     // ctx.req是Node.js的请求对象
//     await next();
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>hello world</he>'
// })

// app.use(async (ctx) => {
//     ctx.response.body = {
//         url: ctx.request.url,
//         query: ctx.request.query,
//         querystring: ctx.request.querystring
//     }
// })

// app.use(async ctx => {
//     let postdata = '';
//     ctx.req.on('data',chunk => {
//         postdata += chunk; // 原生读取post数据
//     });
//     ctx.req.on('end',()=>{
//         console.log(postdata)
//     });
// });

// app.use(async ctx=>{
//     if(ctx.request.method === "POST"){
//         // post请求
//     } else if (ctx.request.method === 'GET') {
//         if(ctx.request.path !== '/') {
//             ctx.response.type = 'html';
//             ctx.response.body = '<a href="/">回到首页</a>';
//         }else{
//             ctx.response.body  = 'hello world';
//         }
//     }
// })

// app.use(async ctx=> {
//     ctx.response.status = 200;  // 状态码
//     if(ctx.request.accepts('json')){
//         ctx.response.type = 'json';
//         ctx.response.body = { data: 'Hello World' }
//     }else if(ctx.request.accepts('html')){
//         ctx.response.type = 'html';
//         ctx.response.body = '<h1>hello world</h1>'
//     }else{
//         ctx.response.type = 'text'; // 响应类型  
//         ctx.response.body = '你好'; // 响应体
//     }
// })

app.use(async (ctx,next) => {
    const start_time = Date.now();
    await next();
    const end_time = Date.now();
    ctx.response.status = 200;
    ctx.response.type = 'html'
    ctx.response.body = `请求地址: 127.0.0.1:300 响应时间:${end_time - start_time}ms`
})

app.use(async (ctx,next) => {
    console.log('执行一些任务')
    await next()
    console.log('任务执行结束')
})

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
})
