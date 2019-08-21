const db = require('../db');
console.log(`生成Customer model`)
module.exports = db.defineModel('customer',{  // customer 会被默认修改成 customers
    name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    sex: {
        type: db.Sequelize.ENUM(['男','女']),
        allowNull: false
    },
    address: {
        type: db.Sequelize.STRING
    },
    fullAddress: {
        type: db.Sequelize.STRING,
        get(){
            return `${this.getDataValue('country')}${this.getDataValue('city')}${this.getDataValue('address')}`
        }
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: db.Sequelize.STRING
    },
    country: {
        type: db.Sequelize.STRING
    },
    city: {
        type: db.Sequelize.STRING
    }
})
