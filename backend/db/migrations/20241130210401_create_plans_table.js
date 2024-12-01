// db/migrations/YYYYMMDDHHMMSS_create_plans_table.js

exports.up = function(knex) {
    return knex.schema.createTable('plans', (table) => {
      table.increments('plan_id').primary(); // Unique identifier for each plan
      table.integer('user_id').unsigned().notNullable(); // Links plan to the user
      table.string('plan_name', 50).notNullable(); // Name of the workout plan
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp of plan creation
    })
    .then(() => {
      return knex.raw(`
        ALTER TABLE plans
        ADD FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;
      `);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('plans');
  };
  