// 访问数据库或者调用第三方API
module.exports = {
    register: async (name,pwd) => {
        let data;
        if(name == '凡凡' && pwd == '123456'){
            data = {
                status: 0,
                data: {
                    title: '个人中心',
                    content: '欢迎进入个人中心'
                }
            }
        }else{
            data = {
                status: -1,
                data: {
                    title: '登录失败',
                    content: '请输入正确的账户信息'
                }
            }
        }
       return data;
    }
}