const devEnvironment = require('./dev.env');
const prodEnvironment = require('./prod.env');

const environ = () => {
    const DDDD = process.env.NODE_ENV.toString()
    if (process.env.NODE_ENV.includes('production')) {
        console.log("-----------------------------------", process.env.NODE_ENV);
        return prodEnvironment.prodEnvironment();
    } else if (process.env.NODE_ENV.includes('developement')) {
        console.log("-----------------------------------", process.env.NODE_ENV);
        return devEnvironment.devEnvironment();
    }
}

module.exports = environ()