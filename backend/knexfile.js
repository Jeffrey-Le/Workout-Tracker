// knexfile.js

require('dotenv').config(); // Load environment variables

const connection = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'workout_tracker_test',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
};

const commonConfig = {
  client: 'pg',
  connection,
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
  pool: {
    min: 2,
    max: 10,
  },
  acquireConnectionTimeout: 10000,
};

module.exports = {
  development: {
    ...commonConfig,
    debug: true,
  },
  test: {
    ...commonConfig,
    connection: {
      ...connection,
      database: process.env.DB_TEST_NAME || 'workout_tracker_test',
    },
  },
  production: {
    ...commonConfig,
    connection: {
      ...connection,
      ssl: { rejectUnauthorized: false },
    },
  },
};
