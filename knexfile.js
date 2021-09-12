const { DB_CONNECTION_STRING } = require('./config.json');

module.exports = {
  development: {
    client: 'pg',
    connection: DB_CONNECTION_STRING,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
