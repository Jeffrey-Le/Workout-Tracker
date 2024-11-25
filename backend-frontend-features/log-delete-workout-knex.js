/**
 * Feature: Logging and Deleting Workouts (Knex.js version)
 * Description:
 *  - Provides backend API endpoints for logging and deleting workout entries.
 *  - Uses Knex.js for database interaction.
 * Instructions:
 * 1. Use the `/workouts` endpoint for logging workouts.
 * 2. Use the `/workouts/:id` endpoint for deleting specific workouts.
 */

const express = require("express");
const knex = require("../knex"); // Ensure this points to our Knex instance

/**
 * POST /workouts - Log a workout
 * Description:
 *  - Allows authenticated users to log a new workout.
 *  - Inserts the workout into the `workouts` table and links it to the logged-in user.
 * 
 * Expected Request Body:
 *  {
 *    "duration": 45,
 *    "distance": 5.2,
 *    "workoutType": "Run",
 *    "sets": 3,
 *    "reps": 12,
 *    "weight_used": 50
 *  }
 */
app.post("/workouts", authenticateToken, async (req, res) => {
  const { duration, distance, workoutType, sets, reps, weight_used } = req.body;

  try {
    // Find the user ID associated with the authenticated username
    const userId = await knex("users")
      .select("user_id")
      .where("username", req.user.username)
      .first();

    if (!userId) {
      return res.status(404).send("User not found.");
    }

    // Insert the new workout into the database
    await knex("workouts").insert({
      user_id: userId.user_id,
      workout_type: workoutType,
      duration: duration,
      distance: distance,
      sets: sets,
      reps: reps,
      weight_used: weight_used,
    });

    res.status(201).send("Workout logged successfully.");
  } catch (error) {
    console.error("Error logging workout:", error);

    res.status(500).send("Internal Server Error");
  }
});

/**
 * DELETE /workouts/:id - Delete a workout
 * Description:
 *  - Allows authenticated users to delete a workout by its ID.
 *  - Ensures only the owner of the workout can delete it.
 * 
 * URL Parameter:
 *  - `:id` (integer): The ID of the workout to delete.
 */
app.delete("/workouts/:id", authenticateToken, async (req, res) => {
  const workoutId = req.params.id;

  try {
    // Attempt to delete the workout, ensuring it belongs to the authenticated user
    const rowsAffected = await knex("workouts")
      .where("workout_id", workoutId)
      .andWhere("user_id", function () {
        this.select("user_id")
          .from("users")
          .where("username", req.user.username);
      })
      .del();

    // If no rows were affected, the workout was not found or unauthorized to delete
    if (rowsAffected === 0) {
      return res
        .status(404)
        .send("Workout not found or unauthorized to delete.");
    }

    res.status(200).send("Workout deleted successfully.");
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).send("Internal Server Error");
  }
});
