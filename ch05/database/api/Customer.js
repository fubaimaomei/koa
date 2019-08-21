const model = require('../../model');
const Customer = model.Customer;
const { Op } = require('sequelize');
async function getAllCustomers(){
    return Customer.findAndCountAll({
        attributes: ['id','name','sex','fulladdress'],
        order: [
            ['updatedAt','DESC']
        ]
    })
}

async function getCustomerById(id) {
    return Customer.findByPk(id);
}

async function getCustomerByName(name) {
    return Customer.findAll({
        where: {
            name: {
                [Op.like]: `${name}%`
            }
        }
    })
}

async function uppdateCustomer(id,customer) {
    const item = await getCustomerById(id)
    if(item) {
        return item.update(customer);
    }else{
        throw new Error(`the customer with id ${id} is not exist`)
    }
}

async function createCustomer(customer) {
    return  Customer.create(customer);
}

async function deleteCustomer(id) {
    const customer =  await getCustomerById(id);
    if(customer){
        return customer.destory();
    }
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    getCustomerByName,
    uppdateCustomer,
    createCustomer,
    deleteCustomer
}


// // 定义模型
// // sequelize 创建得表默认还有createAt updateAt 两个字段
// const Category = sequelize.define('category',{  // category 表  
//     id: {
//         type: Sequelize.UUID,
//         primaryKey: true
//     },
//     name: Sequelize.STRING
// })

// const Project = sequelize.define('project',{  // project 表
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false,  // 不为空指
//         unique: true
//     },
//     date: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW
//     }
// })

// const Product = sequelize.define('product',{  // Product 表
//     name: Sequelize.STRING
// },{
//     tiumestamps: false, // 禁止默认字段createAt updateAt得创建
//     updateAt: 'updateTimestamp', // 创建 updateTimestamp 替代 updateAt 字段
//     tableName: 'my_product' // 修改表名为 my_product
// })

// const Custom = sequelize.define('custom',{
//     name: {
//         type: Sequelize.STRING,
//         get () {  // 定义 getter 自定义获取数据
//             const title = this.getDataValue('title');
//             return `${this.getDataValue('name')} (${title})`
//         }
//     },
//     title: {
//         type: Sequelize.STRING,
//         set (val) {
//             this.setDataValue('title',val.toUpperCase())
//         }
//     }
// })

// // sequelize.sync().then(()=>{  // 将模型全部同步到数据库中

// // }).catch(error=>{
// //     console.log(error)
// // })

// // Product.sync(); 同步单个数据表
// // Product.sync({ force: true }); 强制替换数据表

// Product.findAll({
//     attributes: ['name','data']
// }).then(res=>{
//     console.log(res)
// })