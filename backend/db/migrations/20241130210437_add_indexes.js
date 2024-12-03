// db/migrations/YYYYMMDDHHMMSS_add_indexes.js

exports.up = function(knex) {
    return knex.schema
      .then(() => knex.raw('CREATE INDEX IF NOT EXISTS idx_user_id ON workouts(user_id);'))
      .then(() => knex.raw('CREATE INDEX IF NOT EXISTS idx_workout_type ON workouts(workout_type);'))
      .then(() => knex.raw('CREATE INDEX IF NOT EXISTS idx_plan_user_id ON plans(user_id);'))
      .then(() => knex.raw('CREATE INDEX IF NOT EXISTS idx_reminder_user_id ON reminders(user_id);'))
      .then(() => knex.raw('CREATE INDEX IF NOT EXISTS idx_user_id_bmi ON bmi_history(user_id);'))
      .then(() => knex.raw('CREATE INDEX IF NOT EXISTS idx_date_workouts ON workouts(workout_date);'))
      .then(() => knex.raw('CREATE INDEX IF NOT EXISTS idx_recorded_at_bmi ON bmi_history(recorded_at);'));
  };
  
  exports.down = function(knex) {
    return knex.schema
      .then(() => knex.raw('DROP INDEX IF EXISTS idx_user_id;'))
      .then(() => knex.raw('DROP INDEX IF EXISTS idx_workout_type;'))
      .then(() => knex.raw('DROP INDEX IF EXISTS idx_plan_user_id;'))
      .then(() => knex.raw('DROP INDEX IF EXISTS idx_reminder_user_id;'))
      .then(() => knex.raw('DROP INDEX IF EXISTS idx_user_id_bmi;'))
      .then(() => knex.raw('DROP INDEX IF EXISTS idx_date_workouts;'))
      .then(() => knex.raw('DROP INDEX IF EXISTS idx_recorded_at_bmi;'));
  };
  