const connection =
  require('../knexfile')[process.env.NODE_ENV || 'development'];

const db = require('knex')(connection);

module.exports = {
  async getAll() {
    return db('company');
  },
};
