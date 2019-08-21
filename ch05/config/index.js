const defaultConfig  = './config-default';
const overrideConfig = './config-override';
let config = null;
if(process.env.NODE_ENV === 'dev'){
    console.log(`Load ${defaultConfig}`);
    config = require(defaultConfig);
}else{
    console.log(`Load ${defaultConfig}`);
    config = require(defaultConfig);
    try {
        if (fs.statSync(overrideConfig).isFile()) {
            console.log(`Load ${overrideConfig}...`);
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (err) {
        console.log(`Cannot load ${overrideConfig}.`);
    }
}

module.exports = config;