// config/db.js

const environment = process.env.NODE_ENV || 'development';
console.log(`Current environment: ${environment}`);
const config = require('../knexfile')[environment];
console.log(`Knex config:`, config);

if (!config) {
  throw new Error(`Knex configuration for environment '${environment}' not found.`);
}

const knex = require('knex')(config);

module.exports = knex;
