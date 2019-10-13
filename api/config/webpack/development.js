process.env.NODE_ENV = process.env.NODE_ENV || 'development'

process.env.API_HOST = "http://localhost:3000";

const environment = require('./environment')

module.exports = environment.toWebpackConfig()

console.log(environment.toWebpackConfig());
