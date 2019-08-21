// 自动导出所有model

const fs = require('fs');
const db = require('./db');
const path = require('path');

let files = fs.readdirSync(__dirname + '/model');
let js_files = files.filter(f => {  // 过滤出js文件
    return f.endsWith('.js')
});

module.exports = {};

for(let f of js_files) {
    console.log(`从${f}中导入modle`);
    let name = f.substring(0,f.length - 3);
    module.exports[name] = require(path.join(__dirname + '/model/' + f));
    console.log(module.exports[name])
}

module.exports.sync = () => {
    db.sync();
}