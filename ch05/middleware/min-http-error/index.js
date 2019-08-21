module.exports = () => {
    return async (ctx,next) => {
        try{
            await next();
            if(ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
        }catch(e){
            let fileName = 'other';
            let status = parseInt(e.status);
            const message = e.message;
            if(status >= 400){
                switch (status) {
                    case 400:
                    case 404:
                    case 500:
                        fileName = status;
                        break;
                    default:
                        fileName = 'other';
                }
            }
        }
    }
}