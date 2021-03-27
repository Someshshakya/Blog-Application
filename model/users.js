const { Model } = require('objection')
const knex = require('../config')
Model.knex(knex);


// To check unique email id
const unique = require('objection-unique')({
  fields: ['email','username'],
  identifiers: ['id']
});

class Users extends unique(Model) {
  static get tableName() {
      return 'users';
  }
  static get jsonSchema() {
      return {
          type: 'object',
          required: ['email','username','password'],
          properties: {
              id: { type: 'integer' },
              username: { type: 'string', minLength: 1, maxLength: 255 },
              email: { type: 'string' },
              password: { type: 'string' }
          }
      }
  }
}
module.exports = Users;