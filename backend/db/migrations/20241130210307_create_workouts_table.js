// db/migrations/YYYYMMDDHHMMSS_create_workouts_table.js

exports.up = function(knex) {
    return knex.schema.createTable('workouts', (table) => {
      table.increments('workout_id').primary(); // Unique identifier for each workout
      table.integer('user_id').unsigned().notNullable(); // Links workout to the user
      table.string('workout_type', 50).notNullable(); // Type of workout (e.g., run, yoga)
      table.integer('duration'); // Duration in minutes
      table.decimal('distance', 5, 2); // Distance in kilometers
      table.integer('calories_burned'); // Calories burned (optional)
      table.integer('sets'); // Number of sets (optional)
      table.integer('reps'); // Number of reps (optional)
      table.integer('weight_used'); // Weight used in workout (optional)
      table.date('workout_date').defaultTo(knex.fn.now()); // Date of the workout
      table.jsonb('details'); // Additional details about the workout
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp of workout log creation
    })
    .then(() => {
      return knex.raw(`
        ALTER TABLE workouts
        ADD CONSTRAINT duration_positive CHECK (duration >= 0),
        ADD CONSTRAINT distance_positive CHECK (distance >= 0),
        ADD CONSTRAINT calories_burned_positive CHECK (calories_burned >= 0),
        ADD CONSTRAINT sets_positive CHECK (sets >= 0),
        ADD CONSTRAINT reps_positive CHECK (reps >= 0),
        ADD CONSTRAINT weight_used_positive CHECK (weight_used >= 0),
        ADD FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;
      `);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('workouts');
  };
  