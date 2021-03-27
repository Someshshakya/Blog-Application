// Update with your config settings.
require('dotenv').config();
const {USER_NAME, PASSWORD, DB_NAME, HOST} = process.env;


module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: DB_NAME,
      user:     USER_NAME,
      password: PASSWORD,
      host :   HOST
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: "./migrations"
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL+"?ssl=true" ,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory : './migrations'
    }
  }

};
