// db/migrations/YYYYMMDDHHMMSS_create_reminders_table.js

exports.up = function(knex) {
    return knex.schema.createTable('reminders', (table) => {
      table.increments('reminder_id').primary(); // Unique identifier for each reminder
      table.integer('user_id').unsigned().notNullable(); // Links reminder to the user
      table.timestamp('reminder_date'); // Date and time of the reminder
      table.text('message'); // Reminder message
    })
    .then(() => {
      return knex.raw(`
        ALTER TABLE reminders
        ADD FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;
      `);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('reminders');
  };
  