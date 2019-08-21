const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const middleware = require('./middleware/index')
middleware(app);
router(app);
app.listen(3000,()=>{
    console.log('Server is running at http://127.0.0.1:3000')
});