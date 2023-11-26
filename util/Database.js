const {Pool} = require('pg')
const config = require('../config/databaseConfig')
const pool = new Pool(config)

module.exports = pool