// Logging and Deleting Workouts
// This file demonstrates how to handle logging or deleting a workout using
// the backend-to-frontend structure. Teammates can copy and refactor this
// code into their files as needed.

// Note: Ensure you have the PostgreSQL pool (`pool`) and `authenticateToken` middleware set up properly in your backend.

// POST /workouts - Log a workout
// This endpoint allows authenticated users to log a new workout. 
app.post("/workouts", authenticateToken, async (req, res) => {
  const { duration, distance, workoutType, sets, reps, weight_used } = req.body;

  try {
    // Insert the workout into the database, ensuring it is linked to the logged-in user.
    await pool.query(
      "INSERT INTO workouts (user_id, workout_type, duration, distance, sets, reps, weight_used) VALUES ((SELECT user_id FROM users WHERE username = $1), $2, $3, $4, $5, $6, $7)",
      [req.user.username, workoutType, duration, distance, sets, reps, weight_used]
    );
    res.status(201).send("Workout logged successfully.");
  } catch (error) {
    // Log any errors and return a 500 response if so
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE /workouts/:id - Delete a workout
// This endpoint allows authenticated users to delete a workout by its ID.
// It ensures that only the owner of the workout can delete it since it is linked to the user when they logged it
app.delete("/workouts/:id", authenticateToken, async (req, res) => {
  const workoutId = req.params.id;

  try {
    // Attempt to delete the workout while ensuring the user is authorized to do so.
    const result = await pool.query(
      "DELETE FROM workouts WHERE workout_id = $1 AND user_id = (SELECT user_id FROM users WHERE username = $2)",
      [workoutId, req.user.username]
    );

    // If no rows were affected, the workout was not found or the user was not found from before
    if (result.rowCount === 0) {
      return res.status(404).send("Workout not found or unauthorized to delete.");
    }

    res.status(200).send("Workout deleted successfully.");
  } catch (error) {
    // Log any errors and return a 500 response if so
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
