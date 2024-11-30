/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('workouts').del();

    // Get the user ids for inserting into workouts table
    const users = await knex('users').select('user_id', 'username');
  
    // Inserts seed entries
    await knex('workouts').insert([
      {
        user_id: users[0]['user_id'],
        workout_type: 'Running',
        duration: 30, // in minutes
        distance: 5.0, // in km
        distance_unit: 'km',
        calories: 300,
        sets: null,
        reps: null,
        weight_used: null,
        workout_date: '2024-11-22',
        workout_time: '07:30:00',
        details: JSON.stringify({ location: 'Park', weather: 'Sunny' }),
        notes: 'Ran a good amount. Almost did not make it back home.',
      },
      {
        user_id: users[1]['user_id'],
        workout_type: 'Strength Training',
        duration: 45,
        distance: null,
        distance_unit: null,
        calories: 500,
        sets: 4,
        reps: 12,
        weight_used: 50, // in kg
        workout_date: '2024-11-23',
        workout_time: '18:00:00',
        details: JSON.stringify({ muscle_group: 'Chest and Triceps' }),
        notes: 'Increased bench press weight. Almost did not make the press.',
      },
      {
        user_id: users[2]['user_id'],
        workout_type: 'Cycling',
        duration: 60,
        distance: 20.0, // in km
        distance_unit: 'km',
        calories: 600,
        sets: null,
        reps: null,
        weight_used: null,
        workout_date: '2024-11-24',
        workout_time: '10:00:00',
        details: JSON.stringify({ terrain: 'Hilly', bike: 'Road Bike' }),
        notes: 'Challenging route but rewarding. Almost fell off the bike.',
      },
    ]);
  };
  