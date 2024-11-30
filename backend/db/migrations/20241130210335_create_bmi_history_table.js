// db/migrations/YYYYMMDDHHMMSS_create_bmi_history_table.js

exports.up = function(knex) {
    return knex.schema.createTable('bmi_history', (table) => {
      table.increments('bmi_id').primary(); // Unique identifier for each BMI entry
      table.integer('user_id').unsigned().notNullable(); // Links BMI entry to the user
      table.decimal('weight', 5, 2).notNullable(); // User's weight in kilograms
      table.decimal('height', 4, 2).notNullable(); // Height at the time of recording
      table.decimal('bmi', 4, 2).notNullable(); // Auto-calculated BMI
      table.timestamp('recorded_at').defaultTo(knex.fn.now()); // Timestamp of BMI record
    })
    .then(() => {
      return knex.raw(`
        ALTER TABLE bmi_history
        ADD CONSTRAINT weight_positive CHECK (weight >= 0),
        ADD CONSTRAINT height_positive CHECK (height >= 0),
        ADD CONSTRAINT bmi_positive CHECK (bmi >= 0),
        ADD FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;
      `);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('bmi_history');
  };
  