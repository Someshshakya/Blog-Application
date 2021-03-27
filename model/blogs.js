const { Model } = require('objection');

class MinimalModel extends Model {
  static get tableName() {
    return 'blogs';
  }
}

module.exports = MinimalModel;