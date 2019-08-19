// 项目入口文件

const http = require('http') // 核心功能模块
const path = require('path') // 文件与目录路径处理
const url = require('url') // URL解析
const fs = require('fs') // 文件系统


// 一些配置项
const  hostname  = '127.0.0.1';
const port =  8080;

const server = http.createServer((req,res) => {
    let pathname = url.parse(req.url).pathname;  
    let extname = path.extname(pathname) // 读取文件扩展名
    if(pathname == '/'){
        res.writeHead(200,{ 'Content-Type': 'text/html' });
        res.end(fs.readFileSync(path.join(__dirname,pathname,'index.html')));
    } else if (extname == '.jpg' || extname == '.png'){
        res.writeHead(200,{ 'Content-Type': 'image/'+ extname.substr(1) +''});
        res.end(fs.readFileSync(path.join(__dirname,pathname)));
    }  else {
        res.statusCode = 404;
        res.end();
    }
});

// 启动http服务

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`)
});
