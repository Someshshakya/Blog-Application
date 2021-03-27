const envirnment = process.env.NODE_ENV || "development" ;
const config = require('./knexfile')[envirnment]
module.exports = require('knex')(config);