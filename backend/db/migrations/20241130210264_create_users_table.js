// db/migrations/20241130210307_create_users_table.js

exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('user_id').primary(); // Unique identifier for each user
      table.string('username', 50).unique().notNullable(); // Unique username for login
      table.string('email', 100).unique().notNullable(); // Unique email for communication/login
      table.string('password_hash', 255).notNullable(); // Hashed password for secure storage
      table.integer('age').notNullable(); // Age of the user (must be non-negative)
      table.string('gender', 10); // Gender information (optional)
      table.decimal('height', 4, 2).notNullable(); // Height in centimeters (used for BMI calculations)
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp of account creation
    })
    .then(() => knex.raw(`
      ALTER TABLE users
      ADD CONSTRAINT age_positive CHECK (age >= 0),
      ADD CONSTRAINT height_positive CHECK (height >= 0);
    `));
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  