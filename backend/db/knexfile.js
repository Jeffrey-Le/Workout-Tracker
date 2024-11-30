require('dotenv').config();

const environments = ['development', 'test', 'production'];

const connection = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const commonConfig = {
  client: 'pg',
  connection,
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  }
};

module.exports = Object.fromEntries(environments.map((env) => [env, commonConfig]));