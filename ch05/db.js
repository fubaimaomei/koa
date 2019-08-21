// ORM  统一 Model的定义
const Sequelize = require('sequelize');
const config = require('./config/index')

console.log('init sequelize...');

const sequelize = new Sequelize(config.database,config.user,config.password,{
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

sequelize.authenticate().then(() =>{
    console.log('Connected')
}).catch(err => {
    console.error('connection fail: ',err);
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = Date.now();
                    obj.version++;
                }
            }
        }
    });
}

module.exports = {
    defineModel,
    Sequelize,
    sync: () => {
        console.log('同步所有数据表到数据库')
        sequelize.sync();
    }
}

let id = 1;
function generateId(){
    return id++;
}