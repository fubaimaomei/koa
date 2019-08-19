class Router {
    constructor() {
        this._routes = []; // 缓存路由规则
    }
    
    get(url,handler) { // 添加get规则
        this._routes.push({
            url,
            method: 'GET',
            handler
        });
    }
    
    routes() { // 将路由注册到app
        return async (ctx,next) => {
            const { method,url } = ctx;
            const matchedRouter = this._routes.find( r => r.method === method &&  r.url === url );
            if( matchedRouter && matchedRouter.handler ){
                await matchedRouter.handler(ctx,next);
            }else{
                await next();
            }
        }
    }
}

module.exports = Router;